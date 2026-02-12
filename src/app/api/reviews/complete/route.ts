import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateNewStage, calculateNextReview, SRS_STAGES } from "@/lib/srs";
import { unlockAvailableItems, levelUpUser } from "@/lib/unlocks";
import {
  getMistakeCountSinceAnalysis,
  analyzeUserPatterns,
} from "@/lib/pattern-analyzer";
import type { ItemType } from "@/types";

// Update gamification stats
async function updateGamification(userId: string, correct: boolean) {
  const now = new Date();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  // Calculate XP earned (5 for correct, 1 for incorrect but trying)
  const xpEarned = correct ? 5 : 1;

  // Check if this is a new day for streak
  const lastStudy = user.lastStudyDate;
  const isNewDay = !lastStudy || lastStudy < todayStart;

  let newStreak = user.currentStreak;

  if (isNewDay) {
    // Check if continuing streak (studied yesterday)
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);

    if (lastStudy && lastStudy >= yesterdayStart) {
      // Continuing streak
      newStreak = user.currentStreak + 1;
    } else if (!lastStudy || lastStudy < yesterdayStart) {
      // Streak broken or first time
      newStreak = 1;
    }
  }

  // Check if weekly XP needs reset (every Monday)
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
  const needsWeeklyReset = user.weeklyXpResetAt < weekStart;

  await prisma.user.update({
    where: { id: userId },
    data: {
      totalXp: { increment: xpEarned },
      weeklyXp: needsWeeklyReset ? xpEarned : { increment: xpEarned },
      weeklyXpResetAt: needsWeeklyReset ? weekStart : undefined,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, user.longestStreak),
      lastStudyDate: now,
      totalReviewsDone: { increment: 1 },
    },
  });
}

// POST /api/reviews/complete - Update SRS after both parts answered
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();
  const { type, id, allCorrect } = body as {
    type: ItemType;
    id: number;
    allCorrect: boolean;
  };

  if (!type || !id || allCorrect === undefined) {
    return NextResponse.json(
      { error: "Paramètres manquants" },
      { status: 400 }
    );
  }

  try {
    let currentStage = 0;
    let newStage = 0;

    if (type === "radical") {
      const progress = await prisma.userRadicalProgress.findUnique({
        where: { userId_radicalId: { userId, radicalId: id } },
      });

      if (!progress) {
        return NextResponse.json({ error: "Progression non trouvée" }, { status: 404 });
      }

      currentStage = progress.srsStage;
      newStage = calculateNewStage(currentStage, allCorrect);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      await prisma.userRadicalProgress.update({
        where: { userId_radicalId: { userId, radicalId: id } },
        data: {
          srsStage: newStage,
          nextReviewAt,
          meaningCorrect: { increment: allCorrect ? 1 : 0 },
          meaningIncorrect: { increment: allCorrect ? 0 : 1 },
        },
      });

      // Record review
      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType: "meaning",
          correct: allCorrect,
          srsStageFrom: currentStage,
          srsStageTo: newStage,
        },
      });
    }

    if (type === "kanji") {
      const progress = await prisma.userKanjiProgress.findUnique({
        where: { userId_kanjiId: { userId, kanjiId: id } },
      });

      if (!progress) {
        return NextResponse.json({ error: "Progression non trouvée" }, { status: 404 });
      }

      currentStage = progress.srsStage;
      newStage = calculateNewStage(currentStage, allCorrect);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      await prisma.userKanjiProgress.update({
        where: { userId_kanjiId: { userId, kanjiId: id } },
        data: {
          srsStage: newStage,
          nextReviewAt,
          meaningCorrect: { increment: allCorrect ? 1 : 0 },
          meaningIncorrect: { increment: allCorrect ? 0 : 1 },
          readingCorrect: { increment: allCorrect ? 1 : 0 },
          readingIncorrect: { increment: allCorrect ? 0 : 1 },
        },
      });

      // Record review
      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType: "meaning", // Combined result
          correct: allCorrect,
          srsStageFrom: currentStage,
          srsStageTo: newStage,
        },
      });
    }

    if (type === "vocabulary") {
      const progress = await prisma.userVocabularyProgress.findUnique({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
      });

      if (!progress) {
        return NextResponse.json({ error: "Progression non trouvée" }, { status: 404 });
      }

      currentStage = progress.srsStage;
      newStage = calculateNewStage(currentStage, allCorrect);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      await prisma.userVocabularyProgress.update({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
        data: {
          srsStage: newStage,
          nextReviewAt,
          meaningCorrect: { increment: allCorrect ? 1 : 0 },
          meaningIncorrect: { increment: allCorrect ? 0 : 1 },
          readingCorrect: { increment: allCorrect ? 1 : 0 },
          readingIncorrect: { increment: allCorrect ? 0 : 1 },
        },
      });

      // Record review
      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType: "meaning", // Combined result
          correct: allCorrect,
          srsStageFrom: currentStage,
          srsStageTo: newStage,
        },
      });
    }

    // Update gamification stats
    await updateGamification(userId, allCorrect);

    // Check for unlocks and level up
    await unlockAvailableItems(userId);
    await levelUpUser(userId);

    // Trigger pattern analysis after enough mistakes (fire and forget)
    if (!allCorrect) {
      getMistakeCountSinceAnalysis(userId)
        .then((count) => {
          if (count >= 20) {
            return analyzeUserPatterns(userId);
          }
        })
        .catch((err) => console.error("Pattern analysis trigger failed:", err));
    }

    return NextResponse.json({
      success: true,
      previousStage: currentStage,
      newStage,
    });
  } catch (error) {
    console.error("Review complete error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour" },
      { status: 500 }
    );
  }
}
