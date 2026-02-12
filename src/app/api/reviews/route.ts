import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import type { ReviewItem } from "@/types";

// GET /api/reviews - Returns items due for review
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    const userId = session.user.id;
    const now = new Date();

    const reviews: ReviewItem[] = [];

  // Get radicals due for review
  const radicalReviews = await prisma.userRadicalProgress.findMany({
    where: {
      userId,
      srsStage: { gte: 1, lt: 9 }, // Not locked, not burned
      nextReviewAt: { lte: now },
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
    });
  }

  // Get kanji due for review
  const kanjiReviews = await prisma.userKanjiProgress.findMany({
    where: {
      userId,
      srsStage: { gte: 1, lt: 9 },
      nextReviewAt: { lte: now },
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
    });
  }

  // Get vocabulary due for review
  const vocabReviews = await prisma.userVocabularyProgress.findMany({
    where: {
      userId,
      srsStage: { gte: 1, lt: 9 },
      nextReviewAt: { lte: now },
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
      { error: "Erreur lors du chargement des revisions" },
      { status: 500 }
    );
  }
}
