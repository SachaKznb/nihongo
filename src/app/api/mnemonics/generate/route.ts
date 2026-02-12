import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { aiGenerationRateLimit, checkRateLimit } from "@/lib/upstash";
import {
  generateMnemonic,
  fetchItemWithContext,
  saveMnemonic,
  getSharedMnemonic,
  saveSharedMnemonic,
  checkAndDeductCredit,
  getUserCredits,
} from "@/lib/mnemonic-generator";
import { prisma } from "@/lib/db";

const generateSchema = z.object({
  type: z.enum(["radical", "kanji", "vocabulary"]),
  id: z.number(),
  mnemonicType: z.enum(["meaning", "reading"]).optional().default("meaning"),
  forceRegenerate: z.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

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

  try {
    const body = await request.json();
    const validation = generateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { type, id, mnemonicType, forceRegenerate } = validation.data;

    // Check if user already has a custom mnemonic
    let hasExistingCustom = false;
    if (type === "radical") {
      const progress = await prisma.userRadicalProgress.findUnique({
        where: { userId_radicalId: { userId, radicalId: id } },
        select: { customMnemonic: true },
      });
      hasExistingCustom = !!progress?.customMnemonic;
    } else if (type === "kanji") {
      const progress = await prisma.userKanjiProgress.findUnique({
        where: { userId_kanjiId: { userId, kanjiId: id } },
        select: { customMeaningMnemonic: true, customReadingMnemonic: true },
      });
      hasExistingCustom = mnemonicType === "meaning"
        ? !!progress?.customMeaningMnemonic
        : !!progress?.customReadingMnemonic;
    } else {
      const progress = await prisma.userVocabularyProgress.findUnique({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
        select: { customMnemonic: true },
      });
      hasExistingCustom = !!progress?.customMnemonic;
    }

    // If user has existing and wants to regenerate, check credits
    if (hasExistingCustom && forceRegenerate) {
      const hasCredits = await checkAndDeductCredit(userId);
      if (!hasCredits) {
        const credits = await getUserCredits(userId);
        return NextResponse.json(
          {
            error: "Credits IA insuffisants pour regenerer ce mnemonique",
            creditsRemaining: credits,
            requiresCredits: true,
          },
          { status: 402 }
        );
      }

      // Generate fresh mnemonic (paid)
      const { item, learnedContext } = await fetchItemWithContext(userId, type, id);
      if (!item) {
        return NextResponse.json({ error: "Item non trouve" }, { status: 404 });
      }

      const mnemonic = await generateMnemonic({
        item,
        type,
        mnemonicType,
        learnedContext,
      });

      // Save to user only (not shared cache for regenerations)
      await saveMnemonic(userId, type, id, mnemonic, mnemonicType);

      const creditsRemaining = await getUserCredits(userId);
      return NextResponse.json({
        mnemonic,
        fromCache: false,
        creditsRemaining,
      });
    }

    // First time generation - check shared cache first
    const cachedMnemonic = await getSharedMnemonic(type, id, mnemonicType);

    if (cachedMnemonic) {
      // Use cached mnemonic (free)
      await saveMnemonic(userId, type, id, cachedMnemonic, mnemonicType);

      return NextResponse.json({
        mnemonic: cachedMnemonic,
        fromCache: true,
      });
    }

    // No cache - generate new and save to both (free, builds cache)
    const { item, learnedContext } = await fetchItemWithContext(userId, type, id);

    if (!item) {
      return NextResponse.json({ error: "Item non trouve" }, { status: 404 });
    }

    const mnemonic = await generateMnemonic({
      item,
      type,
      mnemonicType,
      learnedContext,
    });

    // Save to shared cache and user progress
    await Promise.all([
      saveSharedMnemonic(type, id, mnemonicType, mnemonic),
      saveMnemonic(userId, type, id, mnemonic, mnemonicType),
    ]);

    return NextResponse.json({
      mnemonic,
      fromCache: false,
    });
  } catch (error) {
    console.error("Mnemonic generation error:", error);

    if (error instanceof Error) {
      if (error.message.includes("ANTHROPIC_API_KEY")) {
        return NextResponse.json(
          { error: "Service de generation non configure" },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Erreur lors de la generation du mnemonique" },
      { status: 500 }
    );
  }
}
