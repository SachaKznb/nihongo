import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generalRateLimit, checkRateLimit } from "@/lib/upstash";
import { getUserSubscription, getLevelFilter } from "@/lib/subscription";
import type { ReviewItem } from "@/types";

// GET /api/reviews - Returns items due for review
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    // Rate limiting
    const rateLimit = await checkRateLimit(generalRateLimit, userId);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Trop de requetes." },
        { status: 429 }
      );
    }

    const now = new Date();

    // Check subscription and get level filter
    const subscription = await getUserSubscription(userId);
    const levelFilter = getLevelFilter(subscription.hasFullAccess);

    const reviews: ReviewItem[] = [];

  // Get radicals due for review
  // Filter by level based on subscription status
  const radicalReviews = await prisma.userRadicalProgress.findMany({
    where: {
      userId,
      srsStage: { gte: 1, lt: 9 }, // Not locked, not burned
      nextReviewAt: { lte: now },
      radical: levelFilter,
    },
    include: { radical: true },
  });

  for (const rp of radicalReviews) {
    reviews.push({
      type: "radical",
      id: rp.radical.id,
      character: rp.radical.character,
      meaningsFr: [rp.radical.meaningFr],
      currentStage: rp.srsStage,
      imageUrl: rp.radical.imageUrl,
      mnemonic: rp.radical.mnemonic,
    });
  }

  // Get kanji due for review
  // Filter by level based on subscription status
  const kanjiReviews = await prisma.userKanjiProgress.findMany({
    where: {
      userId,
      srsStage: { gte: 1, lt: 9 },
      nextReviewAt: { lte: now },
      kanji: levelFilter,
    },
    include: { kanji: true },
  });

  for (const kp of kanjiReviews) {
    reviews.push({
      type: "kanji",
      id: kp.kanji.id,
      character: kp.kanji.character,
      meaningsFr: kp.kanji.meaningsFr,
      readings: [...kp.kanji.readingsOn, ...kp.kanji.readingsKun],
      currentStage: kp.srsStage,
      mnemonic: kp.kanji.meaningMnemonicFr,
      readingMnemonic: kp.kanji.readingMnemonicFr || undefined,
    });
  }

  // Get vocabulary due for review
  // Filter by level based on subscription status
  const vocabReviews = await prisma.userVocabularyProgress.findMany({
    where: {
      userId,
      srsStage: { gte: 1, lt: 9 },
      nextReviewAt: { lte: now },
      vocabulary: levelFilter,
    },
    include: { vocabulary: true },
  });

  for (const vp of vocabReviews) {
    reviews.push({
      type: "vocabulary",
      id: vp.vocabulary.id,
      character: vp.vocabulary.word,
      meaningsFr: vp.vocabulary.meaningsFr,
      readings: vp.vocabulary.readings,
      currentStage: vp.srsStage,
      mnemonic: vp.vocabulary.mnemonicFr,
    });
  }

    // Fisher-Yates shuffle for better randomization
    for (let i = reviews.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
    }

    return NextResponse.json(
      { reviews, total: reviews.length },
      {
        headers: {
          "Cache-Control": "private, max-age=15, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des révisions" },
      { status: 500 }
    );
  }
}
