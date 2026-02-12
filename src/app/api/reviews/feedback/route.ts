import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  getFeedbackForMistake,
  storeMistake,
  type FeedbackContext,
} from "@/lib/feedback-generator";
import type { ItemType } from "@/types";

// POST /api/reviews/feedback - Get AI feedback for a wrong answer
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const { type, id, reviewType, userAnswer, correctAnswers } = body as {
      type: ItemType;
      id: number;
      reviewType: "meaning" | "reading";
      userAnswer: string;
      correctAnswers: string[];
    };

    if (!type || !id || !reviewType || !userAnswer || !correctAnswers) {
      return NextResponse.json(
        { error: "Parametres manquants" },
        { status: 400 }
      );
    }

    // Check if user has AI feedback enabled
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { aiFeedbackEnabled: true },
    });

    if (!user?.aiFeedbackEnabled) {
      return NextResponse.json({ skipped: true, reason: "disabled" });
    }

    // Get the item details and SRS stage
    let itemDetails: FeedbackContext | null = null;
    let srsStage = 0;

    if (type === "radical") {
      const [radical, progress] = await Promise.all([
        prisma.radical.findUnique({ where: { id } }),
        prisma.userRadicalProgress.findUnique({
          where: { userId_radicalId: { userId, radicalId: id } },
          select: { srsStage: true },
        }),
      ]);

      if (!radical) {
        return NextResponse.json({ error: "Radical non trouvé" }, { status: 404 });
      }

      srsStage = progress?.srsStage ?? 0;
      itemDetails = {
        itemType: type,
        itemId: id,
        reviewType,
        userAnswer,
        correctAnswers,
        character: radical.character || "[image]",
        meaningsFr: [radical.meaningFr],
      };
    } else if (type === "kanji") {
      const [kanji, progress] = await Promise.all([
        prisma.kanji.findUnique({
          where: { id },
          include: {
            radicals: {
              include: {
                radical: { select: { character: true, meaningFr: true } },
              },
            },
          },
        }),
        prisma.userKanjiProgress.findUnique({
          where: { userId_kanjiId: { userId, kanjiId: id } },
          select: { srsStage: true },
        }),
      ]);

      if (!kanji) {
        return NextResponse.json({ error: "Kanji non trouvé" }, { status: 404 });
      }

      srsStage = progress?.srsStage ?? 0;
      itemDetails = {
        itemType: type,
        itemId: id,
        reviewType,
        userAnswer,
        correctAnswers,
        character: kanji.character,
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        radicals: kanji.radicals.map((kr) => ({
          character: kr.radical.character,
          meaningFr: kr.radical.meaningFr,
        })),
      };
    } else if (type === "vocabulary") {
      const [vocabulary, progress] = await Promise.all([
        prisma.vocabulary.findUnique({ where: { id } }),
        prisma.userVocabularyProgress.findUnique({
          where: { userId_vocabularyId: { userId, vocabularyId: id } },
          select: { srsStage: true },
        }),
      ]);

      if (!vocabulary) {
        return NextResponse.json({ error: "Vocabulaire non trouvé" }, { status: 404 });
      }

      srsStage = progress?.srsStage ?? 0;
      itemDetails = {
        itemType: type,
        itemId: id,
        reviewType,
        userAnswer,
        correctAnswers,
        character: vocabulary.word,
        meaningsFr: vocabulary.meaningsFr,
        readings: vocabulary.readings,
      };
    }

    if (!itemDetails) {
      return NextResponse.json({ error: "Type inconnu" }, { status: 400 });
    }

    // Store the mistake for pattern analysis (fire and forget)
    storeMistake(userId, type, id, reviewType, userAnswer, correctAnswers).catch(
      (err) => console.error("Failed to store mistake:", err)
    );

    // Get or generate feedback
    const result = await getFeedbackForMistake(itemDetails, srsStage);

    if (!result) {
      return NextResponse.json({ skipped: true, reason: "not_significant" });
    }

    // Update the mistake record with feedback shown (fire and forget)
    prisma.reviewMistake
      .updateMany({
        where: {
          userId,
          itemType: type,
          itemId: id,
          reviewType,
          userAnswer,
          feedbackShown: null,
        },
        data: { feedbackShown: result.feedback },
      })
      .catch(() => {}); // Ignore errors

    return NextResponse.json({
      feedback: result.feedback,
      fromCache: result.fromCache,
    });
  } catch (error) {
    console.error("Feedback generation error:", error);

    // Don't fail the review if feedback generation fails
    return NextResponse.json({
      skipped: true,
      reason: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
