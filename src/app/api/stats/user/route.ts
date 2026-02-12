import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generalRateLimit, checkRateLimit } from "@/lib/upstash";

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

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
    weekStart.setHours(0, 0, 0, 0);

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentLevel: true,
        currentStreak: true,
        longestStreak: true,
        totalXp: true,
        weeklyXp: true,
        totalReviewsDone: true,
        totalLessonsDone: true,
        perfectDays: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Run queries in parallel
    const [
      radicalProgress,
      kanjiProgress,
      vocabProgress,
      reviews30Days,
      levelHistory,
      dailyStats,
    ] = await Promise.all([
      prisma.userRadicalProgress.findMany({
        where: { userId },
        select: { srsStage: true, nextReviewAt: true },
      }),
      prisma.userKanjiProgress.findMany({
        where: { userId },
        select: { srsStage: true, nextReviewAt: true },
      }),
      prisma.userVocabularyProgress.findMany({
        where: { userId },
        select: { srsStage: true, nextReviewAt: true },
      }),
      prisma.review.findMany({
        where: {
          userId,
          createdAt: { gte: thirtyDaysAgo },
        },
        select: {
          correct: true,
          srsStageFrom: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" },
      }),
      prisma.userLevelHistory.findMany({
        where: { userId },
        orderBy: { reachedAt: "asc" },
        select: { level: true, reachedAt: true },
      }),
      prisma.userDailyStats.findMany({
        where: {
          userId,
          date: { gte: thirtyDaysAgo },
        },
        orderBy: { date: "asc" },
      }),
    ]);

    // Calculate total reviews and lessons from actual data
    const totalReviews = user.totalReviewsDone;
    const totalLessons = user.totalLessonsDone;

    // Calculate overall accuracy
    const allTimeReviews = reviews30Days.length > 0
      ? reviews30Days.filter(r => r.correct).length / reviews30Days.length * 100
      : 100;

    // Calculate weekly XP (from weekStart)
    const weeklyReviews = reviews30Days.filter(
      r => r.createdAt >= weekStart
    );
    const weeklyLessons = weeklyReviews.filter(r => r.srsStageFrom === 0).length;
    const weeklyReviewsOnly = weeklyReviews.length - weeklyLessons;
    const calculatedWeeklyXp = weeklyLessons * 10 + weeklyReviewsOnly * 5;

    // Overview stats
    const overview = {
      totalReviews,
      totalLessons,
      overallAccuracy: Math.round(allTimeReviews * 10) / 10,
      currentLevel: user.currentLevel,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalXp: user.totalXp,
      weeklyXp: user.weeklyXp || calculatedWeeklyXp,
      perfectDays: user.perfectDays,
      memberSince: user.createdAt,
    };

    // SRS Distribution
    const allProgress = [
      ...radicalProgress.map(p => p.srsStage),
      ...kanjiProgress.map(p => p.srsStage),
      ...vocabProgress.map(p => p.srsStage),
    ];

    const srsDistribution = {
      apprentice: allProgress.filter(s => s >= 1 && s <= 4).length,
      guru: allProgress.filter(s => s >= 5 && s <= 6).length,
      master: allProgress.filter(s => s === 7).length,
      enlightened: allProgress.filter(s => s === 8).length,
      burned: allProgress.filter(s => s === 9).length,
    };

    // Daily stats for the last 30 days (from reviews if no cached daily stats)
    const dailyStatsMap = new Map<string, {
      date: string;
      reviews: number;
      lessons: number;
      accuracy: number;
    }>();

    // If we have cached daily stats, use them
    for (const stat of dailyStats) {
      const dateKey = stat.date.toISOString().split("T")[0];
      const total = stat.correctCount + stat.incorrectCount;
      dailyStatsMap.set(dateKey, {
        date: dateKey,
        reviews: stat.reviewsCompleted,
        lessons: stat.lessonsCompleted,
        accuracy: total > 0 ? Math.round((stat.correctCount / total) * 100) : 100,
      });
    }

    // Fill in from raw reviews for recent days not yet aggregated
    const reviewsByDay = new Map<string, { total: number; correct: number; lessons: number }>();
    for (const review of reviews30Days) {
      const dateKey = review.createdAt.toISOString().split("T")[0];
      if (!reviewsByDay.has(dateKey)) {
        reviewsByDay.set(dateKey, { total: 0, correct: 0, lessons: 0 });
      }
      const day = reviewsByDay.get(dateKey)!;
      day.total++;
      if (review.correct) day.correct++;
      if (review.srsStageFrom === 0) day.lessons++;
    }

    // Merge reviews with daily stats (reviews take precedence for recent data)
    for (const [dateKey, data] of reviewsByDay) {
      if (!dailyStatsMap.has(dateKey)) {
        dailyStatsMap.set(dateKey, {
          date: dateKey,
          reviews: data.total,
          lessons: data.lessons,
          accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 100,
        });
      }
    }

    // Sort by date
    const sortedDailyStats = Array.from(dailyStatsMap.values())
      .sort((a, b) => a.date.localeCompare(b.date));

    // Review forecast for next 7 days
    const allNextReviews = [
      ...radicalProgress.filter(p => p.srsStage >= 1 && p.srsStage < 9 && p.nextReviewAt),
      ...kanjiProgress.filter(p => p.srsStage >= 1 && p.srsStage < 9 && p.nextReviewAt),
      ...vocabProgress.filter(p => p.srsStage >= 1 && p.srsStage < 9 && p.nextReviewAt),
    ];

    const forecastByHour = new Map<string, number>();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    for (const item of allNextReviews) {
      if (item.nextReviewAt && item.nextReviewAt <= sevenDaysFromNow) {
        const hourKey = new Date(item.nextReviewAt).toISOString().slice(0, 13) + ":00";
        forecastByHour.set(hourKey, (forecastByHour.get(hourKey) || 0) + 1);
      }
    }

    const reviewForecast = Array.from(forecastByHour.entries())
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => a.hour.localeCompare(b.hour));

    // Level history (add current level if not yet tracked)
    const formattedLevelHistory = levelHistory.map(l => ({
      level: l.level,
      reachedAt: l.reachedAt.toISOString(),
    }));

    // If level history is empty, add level 1 from account creation
    if (formattedLevelHistory.length === 0) {
      formattedLevelHistory.push({
        level: 1,
        reachedAt: user.createdAt.toISOString(),
      });
    }

    // Streak calendar (last 12 weeks)
    const streakCalendar: { date: string; studied: boolean; reviews: number }[] = [];

    for (let i = 83; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateKey = date.toISOString().split("T")[0];
      const cachedStats = dailyStatsMap.get(dateKey);
      const rawReviews = reviewsByDay.get(dateKey);

      let reviewCount = 0;
      if (cachedStats) {
        reviewCount = cachedStats.reviews;
      } else if (rawReviews) {
        reviewCount = rawReviews.total;
      }

      streakCalendar.push({
        date: dateKey,
        studied: reviewCount > 0,
        reviews: reviewCount,
      });
    }

    // Item breakdown by type and stage
    const itemBreakdown = {
      radicals: {
        apprentice: radicalProgress.filter(p => p.srsStage >= 1 && p.srsStage <= 4).length,
        guru: radicalProgress.filter(p => p.srsStage >= 5 && p.srsStage <= 6).length,
        master: radicalProgress.filter(p => p.srsStage === 7).length,
        enlightened: radicalProgress.filter(p => p.srsStage === 8).length,
        burned: radicalProgress.filter(p => p.srsStage === 9).length,
      },
      kanji: {
        apprentice: kanjiProgress.filter(p => p.srsStage >= 1 && p.srsStage <= 4).length,
        guru: kanjiProgress.filter(p => p.srsStage >= 5 && p.srsStage <= 6).length,
        master: kanjiProgress.filter(p => p.srsStage === 7).length,
        enlightened: kanjiProgress.filter(p => p.srsStage === 8).length,
        burned: kanjiProgress.filter(p => p.srsStage === 9).length,
      },
      vocabulary: {
        apprentice: vocabProgress.filter(p => p.srsStage >= 1 && p.srsStage <= 4).length,
        guru: vocabProgress.filter(p => p.srsStage >= 5 && p.srsStage <= 6).length,
        master: vocabProgress.filter(p => p.srsStage === 7).length,
        enlightened: vocabProgress.filter(p => p.srsStage === 8).length,
        burned: vocabProgress.filter(p => p.srsStage === 9).length,
      },
    };

    return NextResponse.json({
      overview,
      dailyStats: sortedDailyStats,
      srsDistribution,
      levelHistory: formattedLevelHistory,
      reviewForecast,
      streakCalendar,
      itemBreakdown,
    });
  } catch (error) {
    console.error("Stats GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des statistiques" },
      { status: 500 }
    );
  }
}
