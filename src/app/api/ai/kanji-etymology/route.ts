import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { aiGenerationRateLimit, checkRateLimit } from "@/lib/upstash";
import { withAIRetry } from "@/lib/ai-utils";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const requestSchema = z.object({
  kanjiId: z.number().int().positive(),
});

type EtymologyOrigin = "pictographic" | "ideographic" | "compound";

interface EtymologyResponse {
  kanjiId: number;
  character: string;
  etymology: string;
  origin: EtymologyOrigin;
  cached: boolean;
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check subscription status - premium feature
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { subscriptionStatus: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
    }

    const isPremium = ["active", "lifetime"].includes(user.subscriptionStatus);
    if (!isPremium) {
      return NextResponse.json(
        { error: "Cette fonctionnalite est reservee aux membres Premium." },
        { status: 403 }
      );
    }

    // Rate limiting for AI generation
    const rateLimit = await checkRateLimit(aiGenerationRateLimit, userId);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Trop de requetes. Veuillez patienter avant de reessayer.",
          retryAfter: rateLimit.reset,
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { kanjiId } = validation.data;

    // Check cache first
    const cachedEtymology = await prisma.kanjiEtymologyCache.findUnique({
      where: { kanjiId },
    });

    if (cachedEtymology) {
      const response: EtymologyResponse = {
        kanjiId: cachedEtymology.kanjiId,
        character: cachedEtymology.character,
        etymology: cachedEtymology.etymology,
        origin: cachedEtymology.origin as EtymologyOrigin,
        cached: true,
      };
      return NextResponse.json(response);
    }

    // Fetch kanji with radicals
    const kanji = await prisma.kanji.findUnique({
      where: { id: kanjiId },
      select: {
        id: true,
        character: true,
        meaningsFr: true,
        radicals: {
          select: {
            radical: {
              select: {
                character: true,
                meaningFr: true,
              },
            },
          },
        },
      },
    });

    if (!kanji) {
      return NextResponse.json({ error: "Kanji non trouve" }, { status: 404 });
    }

    // Build prompt for Claude
    const radicalsList = kanji.radicals
      .map((r) => `${r.radical.character || "[image]"} (${r.radical.meaningFr})`)
      .join(", ");

    const prompt = `Tu es un expert en etymologie des kanji japonais. Explique l'origine et l'evolution historique de ce kanji en francais.

KANJI: ${kanji.character}
SIGNIFICATIONS: ${kanji.meaningsFr.join(", ")}
COMPOSANTS (radicaux): ${radicalsList || "aucun"}

Fournis une explication etymologique detaillee qui inclut:
1. L'origine du kanji (pictographique = representation d'un objet reel, ideographique = representation d'une idee abstraite, ou compose = combinaison de plusieurs elements)
2. Son evolution depuis les formes anciennes (inscriptions sur os oraculaires, bronze, sceau, etc.)
3. Comment les composants/radicaux contribuent au sens
4. Le contexte culturel si pertinent

IMPORTANT: Reponds UNIQUEMENT avec un objet JSON valide dans ce format exact:
{
  "origin": "pictographic" | "ideographic" | "compound",
  "etymology": "Explication detaillee en francais (200-400 caracteres)"
}

Ne mets PAS de texte avant ou apres le JSON. Pas de guillemets de code, pas de markdown.`;

    // Generate etymology with Claude
    const response = await withAIRetry(() =>
      anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      })
    );

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Format de reponse inattendu");
    }

    // Parse Claude's JSON response
    let parsedResponse: { origin: string; etymology: string };
    try {
      // Clean the response - remove potential markdown code blocks
      let jsonText = content.text.trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith("```")) {
        jsonText = jsonText.slice(0, -3);
      }
      jsonText = jsonText.trim();

      parsedResponse = JSON.parse(jsonText);
    } catch {
      console.error("Failed to parse Claude response:", content.text);
      throw new Error("Erreur lors de l'analyse de la reponse");
    }

    // Validate origin type
    const validOrigins: EtymologyOrigin[] = ["pictographic", "ideographic", "compound"];
    const origin: EtymologyOrigin = validOrigins.includes(parsedResponse.origin as EtymologyOrigin)
      ? (parsedResponse.origin as EtymologyOrigin)
      : "compound";

    // Cache the result
    await prisma.kanjiEtymologyCache.create({
      data: {
        kanjiId: kanji.id,
        character: kanji.character,
        etymology: parsedResponse.etymology,
        origin,
      },
    });

    const etymologyResponse: EtymologyResponse = {
      kanjiId: kanji.id,
      character: kanji.character,
      etymology: parsedResponse.etymology,
      origin,
      cached: false,
    };

    return NextResponse.json(etymologyResponse);
  } catch (error) {
    console.error("Error generating kanji etymology:", error);

    if (error instanceof Error) {
      if (error.message.includes("ANTHROPIC_API_KEY")) {
        return NextResponse.json(
          { error: "Service de generation non configure" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la generation de l'etymologie" },
      { status: 500 }
    );
  }
}
