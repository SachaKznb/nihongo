import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES, getSrsCategory } from "@/lib/srs";
import type { UserProgress, SrsBreakdown, GamificationStats } from "@/types";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouve" },
      { status: 404 }
    );
  }

  // Get totals for current level
  const totalRadicals = await prisma.radical.count({
    where: { levelId: user.currentLevel },
  });
  const totalKanji = await prisma.kanji.count({
    where: { levelId: user.currentLevel },
  });
  const totalVocabulary = await prisma.vocabulary.count({
    where: { levelId: user.currentLevel },
  });

  // Get learned counts (stage >= 1)
  const radicalProgress = await prisma.userRadicalProgress.findMany({
    where: { userId },
  });
  const kanjiProgress = await prisma.userKanjiProgress.findMany({
    where: { userId },
  });
  const vocabProgress = await prisma.userVocabularyProgress.findMany({
    where: { userId },
  });

  const learnedRadicals = radicalProgress.filter(
    (rp) => rp.srsStage >= 1
  ).length;
  const learnedKanji = kanjiProgress.filter((kp) => kp.srsStage >= 1).length;
  const learnedVocabulary = vocabProgress.filter(
    (vp) => vp.srsStage >= 1
  ).length;

  // Calculate SRS breakdown
  const allProgress = [
    ...radicalProgress.map((p) => p.srsStage),
    ...kanjiProgress.map((p) => p.srsStage),
    ...vocabProgress.map((p) => p.srsStage),
  ];

  const srsBreakdown: SrsBreakdown = {
    apprentice: 0,
    guru: 0,
    master: 0,
    enlightened: 0,
    burned: 0,
  };

  for (const stage of allProgress) {
    const category = getSrsCategory(stage);
    if (category !== "locked") {
      srsBreakdown[category]++;
    }
  }

  // Count pending lessons (stage 0)
  const pendingLessons =
    radicalProgress.filter((rp) => rp.srsStage === SRS_STAGES.LOCKED).length +
    kanjiProgress.filter((kp) => kp.srsStage === SRS_STAGES.LOCKED).length +
    vocabProgress.filter((vp) => vp.srsStage === SRS_STAGES.LOCKED).length;

  // Count pending reviews (nextReviewAt <= now and not burned)
  const now = new Date();
  const pendingReviews =
    radicalProgress.filter(
      (rp) =>
        rp.srsStage >= 1 &&
        rp.srsStage < 9 &&
        rp.nextReviewAt &&
        rp.nextReviewAt <= now
    ).length +
    kanjiProgress.filter(
      (kp) =>
        kp.srsStage >= 1 &&
        kp.srsStage < 9 &&
        kp.nextReviewAt &&
        kp.nextReviewAt <= now
    ).length +
    vocabProgress.filter(
      (vp) =>
        vp.srsStage >= 1 &&
        vp.srsStage < 9 &&
        vp.nextReviewAt &&
        vp.nextReviewAt <= now
    ).length;

  // Calculate upcoming reviews for next 24 hours
  const upcomingReviews: { time: Date; count: number }[] = [];
  const intervals = [1, 2, 4, 8, 12, 24]; // hours

  for (const hours of intervals) {
    const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    const count =
      radicalProgress.filter(
        (rp) =>
          rp.srsStage >= 1 &&
          rp.srsStage < 9 &&
          rp.nextReviewAt &&
          rp.nextReviewAt <= futureTime &&
          rp.nextReviewAt > now
      ).length +
      kanjiProgress.filter(
        (kp) =>
          kp.srsStage >= 1 &&
          kp.srsStage < 9 &&
          kp.nextReviewAt &&
          kp.nextReviewAt <= futureTime &&
          kp.nextReviewAt > now
      ).length +
      vocabProgress.filter(
        (vp) =>
          vp.srsStage >= 1 &&
          vp.srsStage < 9 &&
          vp.nextReviewAt &&
          vp.nextReviewAt <= futureTime &&
          vp.nextReviewAt > now
      ).length;

    upcomingReviews.push({ time: futureTime, count });
  }

  // Calculate today's stats from reviews
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayReviews = await prisma.review.findMany({
    where: {
      userId,
      createdAt: { gte: todayStart },
    },
  });

  const todayReviewCount = todayReviews.length;
  const todayCorrect = todayReviews.filter((r) => r.correct).length;
  const todayAccuracy = todayReviewCount > 0 ? Math.round((todayCorrect / todayReviewCount) * 100) : 100;

  // Count today's lessons (items that were unlocked today)
  const todayLessons = await prisma.review.count({
    where: {
      userId,
      createdAt: { gte: todayStart },
      srsStageFrom: 0,
    },
  });

  // Calculate level progress (% of kanji at Guru+)
  const levelKanjiProgress = await prisma.userKanjiProgress.findMany({
    where: { userId },
    include: { kanji: true },
  });

  const currentLevelKanji = levelKanjiProgress.filter(
    (kp) => kp.kanji.levelId === user.currentLevel
  );
  const guruPlusKanji = currentLevelKanji.filter((kp) => kp.srsStage >= 5).length;
  const levelProgress = currentLevelKanji.length > 0
    ? Math.round((guruPlusKanji / currentLevelKanji.length) * 100)
    : 0;

  // Social proof: Generate a realistic number based on time of day
  const hour = now.getHours();
  const baseActiveLearners = 847;
  const timeMultiplier = hour >= 8 && hour <= 22 ? 1 + (Math.sin((hour - 8) * Math.PI / 14) * 0.5) : 0.3;
  const activeLearners = Math.floor(baseActiveLearners * timeMultiplier + Math.random() * 100);

  const gamification: GamificationStats = {
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,
    totalXp: user.totalXp,
    weeklyXp: user.weeklyXp,
    totalReviewsDone: user.totalReviewsDone,
    totalLessonsDone: user.totalLessonsDone,
    perfectDays: user.perfectDays,
    todayAccuracy,
    todayReviews: todayReviewCount,
    todayLessons,
    levelProgress,
    activeLearners,
  };

  const progress: UserProgress = {
    currentLevel: user.currentLevel,
    totalRadicals,
    totalKanji,
    totalVocabulary,
    learnedRadicals,
    learnedKanji,
    learnedVocabulary,
    srsBreakdown,
    pendingLessons,
    pendingReviews,
    upcomingReviews,
    gamification,
  };

  return NextResponse.json(progress);
}
