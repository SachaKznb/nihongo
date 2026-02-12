import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { aiGenerationRateLimit, checkRateLimit } from "@/lib/upstash";
import {
  fetchMasteredContext,
  getCachedSentences,
  cacheSentences,
  fetchVocabularyDetails,
  generateSentences,
  generateFallbackSentences,
  checkAndDeductCredit,
  getUserCredits,
} from "@/lib/sentence-generator";

const generateSchema = z.object({
  vocabularyId: z.number(),
  forceRegenerate: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  // Rate limiting for AI generation
  const rateLimit = await checkRateLimit(aiGenerationRateLimit, userId);
  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Trop de requêtes. Veuillez patienter avant de réessayer.",
        retryAfter: rateLimit.reset,
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const validation = generateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { vocabularyId, forceRegenerate } = validation.data;

    // Check if user has the feature enabled
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { levelAwareSentencesEnabled: true, currentLevel: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    if (!user.levelAwareSentencesEnabled) {
      return NextResponse.json(
        { error: "Les phrases personnalisées sont désactivées dans vos paramètres" },
        { status: 403 }
      );
    }

    // Fetch vocabulary details
    const vocabulary = await fetchVocabularyDetails(vocabularyId);
    if (!vocabulary) {
      return NextResponse.json({ error: "Vocabulaire non trouvé" }, { status: 404 });
    }

    // Check cache unless forcing regeneration
    if (!forceRegenerate) {
      const cached = await getCachedSentences(userId, vocabularyId);
      if (cached && !cached.isStale) {
        const context = await fetchMasteredContext(userId);
        return NextResponse.json({
          sentences: cached.sentences,
          fromCache: true,
          masteredKanjiCount: context.kanji.length,
        });
      }
    }

    // If regenerating, check and deduct credit
    if (forceRegenerate) {
      // Check if there's an existing cache (meaning this is a true regeneration)
      const existingCache = await prisma.userSentenceCache.findUnique({
        where: { userId_vocabularyId: { userId, vocabularyId } },
      });

      if (existingCache) {
        const hasCredits = await checkAndDeductCredit(userId);
        if (!hasCredits) {
          const credits = await getUserCredits(userId);
          return NextResponse.json(
            {
              error: "Crédits IA insuffisants pour régénérer les phrases",
              creditsRemaining: credits,
              requiresCredits: true,
            },
            { status: 402 }
          );
        }
      }
    }

    // Fetch mastered context
    const context = await fetchMasteredContext(userId);

    // If user has very few mastered items, use fallback
    if (context.kanji.length < 5 && context.vocabulary.length < 5) {
      const fallbackSentences = generateFallbackSentences(vocabulary);

      // Cache even fallback sentences
      await cacheSentences(userId, vocabularyId, fallbackSentences, context);

      return NextResponse.json({
        sentences: fallbackSentences,
        fromCache: false,
        masteredKanjiCount: context.kanji.length,
        isFallback: true,
      });
    }

    // Generate new sentences using AI
    const sentences = await generateSentences(vocabulary, context, user.currentLevel);

    // Cache the generated sentences
    await cacheSentences(userId, vocabularyId, sentences, context);

    const creditsRemaining = forceRegenerate ? await getUserCredits(userId) : undefined;

    return NextResponse.json({
      sentences,
      fromCache: false,
      masteredKanjiCount: context.kanji.length,
      creditsRemaining,
    });
  } catch (error) {
    console.error("Sentence generation error:", error);

    if (error instanceof Error) {
      if (error.message.includes("ANTHROPIC_API_KEY")) {
        return NextResponse.json(
          { error: "Service de génération non configuré" },
          { status: 503 }
        );
      }

      if (error.message.includes("Failed to parse")) {
        return NextResponse.json(
          { error: "Erreur de format dans la réponse IA" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la génération des phrases" },
      { status: 500 }
    );
  }
}
