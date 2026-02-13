import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES, getSrsCategory } from "@/lib/srs";
import { cacheGet, cacheSet, cacheKeys, generalRateLimit, checkRateLimit } from "@/lib/upstash";
import { getTodayStart } from "@/lib/timezone";
import type { UserProgress, SrsBreakdown, GamificationStats } from "@/types";

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
      return NextResponse.json({ error: "Trop de requetes" }, { status: 429 });
    }

    // Try to get cached progress (30 second TTL)
    const cacheKey = cacheKeys.dashboardData(userId);
    const cached = await cacheGet<UserProgress>(cacheKey);
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
          "X-Cache": "HIT",
        },
      });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const now = new Date();
  // Use user's timezone to determine "today" for review/lesson counts
  const userTimezone = user.timezone || "UTC";
  const todayStart = getTodayStart(userTimezone);

  // Run all queries in parallel for maximum speed
  const [
    totalRadicals,
    totalKanji,
    totalVocabulary,
    radicalProgress,
    kanjiProgress,
    vocabProgress,
    todayReviews,
    todayLessonsCount,
  ] = await Promise.all([
    prisma.radical.count({ where: { levelId: user.currentLevel } }),
    prisma.kanji.count({ where: { levelId: user.currentLevel } }),
    prisma.vocabulary.count({ where: { levelId: user.currentLevel } }),
    prisma.userRadicalProgress.findMany({ where: { userId } }),
    prisma.userKanjiProgress.findMany({
      where: { userId },
      include: { kanji: { select: { levelId: true } } }
    }),
    prisma.userVocabularyProgress.findMany({ where: { userId } }),
    prisma.review.findMany({
      where: { userId, createdAt: { gte: todayStart } },
      select: { correct: true }
    }),
    prisma.review.count({
      where: { userId, createdAt: { gte: todayStart }, srsStageFrom: 0 }
    }),
  ]);

  // Calculate learned counts
  const learnedRadicals = radicalProgress.filter((rp) => rp.srsStage >= 1).length;
  const learnedKanji = kanjiProgress.filter((kp) => kp.srsStage >= 1).length;
  const learnedVocabulary = vocabProgress.filter((vp) => vp.srsStage >= 1).length;

  // Calculate SRS breakdown in one pass
  const srsBreakdown: SrsBreakdown = {
    apprentice: 0,
    guru: 0,
    master: 0,
    shodan: 0,
    satori: 0,
  };

  const allProgress = [
    ...radicalProgress.map((p) => p.srsStage),
    ...kanjiProgress.map((p) => p.srsStage),
    ...vocabProgress.map((p) => p.srsStage),
  ];

  for (const stage of allProgress) {
    const category = getSrsCategory(stage);
    if (category !== "locked") {
      srsBreakdown[category]++;
    }
  }

  // Count pending lessons and reviews
  const pendingLessons =
    radicalProgress.filter((rp) => rp.srsStage === SRS_STAGES.LOCKED).length +
    kanjiProgress.filter((kp) => kp.srsStage === SRS_STAGES.LOCKED).length +
    vocabProgress.filter((vp) => vp.srsStage === SRS_STAGES.LOCKED).length;

  const pendingReviews =
    radicalProgress.filter((rp) => rp.srsStage >= 1 && rp.srsStage < 9 && rp.nextReviewAt && rp.nextReviewAt <= now).length +
    kanjiProgress.filter((kp) => kp.srsStage >= 1 && kp.srsStage < 9 && kp.nextReviewAt && kp.nextReviewAt <= now).length +
    vocabProgress.filter((vp) => vp.srsStage >= 1 && vp.srsStage < 9 && vp.nextReviewAt && vp.nextReviewAt <= now).length;

  // Calculate upcoming reviews for next 24 hours (single pass optimization)
  const intervals = [1, 2, 4, 8, 12, 24];

  // Collect all future review times in a single pass
  const futureReviewTimes: Date[] = [];
  for (const rp of radicalProgress) {
    if (rp.srsStage >= 1 && rp.srsStage < 9 && rp.nextReviewAt && rp.nextReviewAt > now) {
      futureReviewTimes.push(rp.nextReviewAt);
    }
  }
  for (const kp of kanjiProgress) {
    if (kp.srsStage >= 1 && kp.srsStage < 9 && kp.nextReviewAt && kp.nextReviewAt > now) {
      futureReviewTimes.push(kp.nextReviewAt);
    }
  }
  for (const vp of vocabProgress) {
    if (vp.srsStage >= 1 && vp.srsStage < 9 && vp.nextReviewAt && vp.nextReviewAt > now) {
      futureReviewTimes.push(vp.nextReviewAt);
    }
  }

  // Sort once and count for each interval
  futureReviewTimes.sort((a, b) => a.getTime() - b.getTime());

  const upcomingReviews: { time: Date; count: number }[] = [];
  for (const hours of intervals) {
    const futureTime = new Date(now.getTime() + hours * 60 * 60 * 1000);
    // Binary search would be even faster, but simple filter on sorted array is good enough
    const count = futureReviewTimes.filter(t => t <= futureTime).length;
    upcomingReviews.push({ time: futureTime, count });
  }

  // Today's stats
  const todayReviewCount = todayReviews.length;
  const todayCorrect = todayReviews.filter((r) => r.correct).length;
  const todayAccuracy = todayReviewCount > 0 ? Math.round((todayCorrect / todayReviewCount) * 100) : 100;

  // Level progress (% of kanji at Guru+)
  const currentLevelKanji = kanjiProgress.filter((kp) => kp.kanji.levelId === user.currentLevel);
  const guruPlusKanji = currentLevelKanji.filter((kp) => kp.srsStage >= 5).length;
  const levelProgress = currentLevelKanji.length > 0 ? Math.round((guruPlusKanji / currentLevelKanji.length) * 100) : 0;

  // Social proof
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
    todayLessons: todayLessonsCount,
    levelProgress,
    activeLearners,
    // Tanuki pet data
    tanukiSkin: user.tanukiSkin,
    tanukiName: user.tanukiName,
    lastStudyDate: user.lastStudyDate,
    // User timezone for streak calculations
    timezone: user.timezone,
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

    // Cache for 30 seconds
    await cacheSet(cacheKey, progress, 30);

    return NextResponse.json(progress, {
      headers: {
        "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
        "X-Cache": "MISS",
      },
    });
  } catch (error) {
    console.error("Progress GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement de la progression" },
      { status: 500 }
    );
  }
}
