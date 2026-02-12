import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export interface InboxNotification {
  id: string;
  type: "reviews_waiting" | "targeted_study" | "streak_at_risk" | "level_up" | "new_items";
  title: string;
  message: string;
  actionUrl?: string;
  actionLabel?: string;
  priority: "high" | "medium" | "low";
  icon: string;
  color: string;
  count?: number;
  createdAt: Date;
}

// GET /api/notifications/inbox - Get in-app notifications
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;
  const now = new Date();
  const notifications: InboxNotification[] = [];

  try {
    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentLevel: true,
        currentStreak: true,
        lastStudyDate: true,
        lastPatternAnalysis: true,
      },
    });

    if (!user) {
      return NextResponse.json({ notifications: [] });
    }

    // 1. Check for pending reviews
    const [radicalReviews, kanjiReviews, vocabReviews] = await Promise.all([
      prisma.userRadicalProgress.count({
        where: {
          userId,
          srsStage: { gt: 0, lt: 9 },
          nextReviewAt: { lte: now },
        },
      }),
      prisma.userKanjiProgress.count({
        where: {
          userId,
          srsStage: { gt: 0, lt: 9 },
          nextReviewAt: { lte: now },
        },
      }),
      prisma.userVocabularyProgress.count({
        where: {
          userId,
          srsStage: { gt: 0, lt: 9 },
          nextReviewAt: { lte: now },
        },
      }),
    ]);

    const totalReviews = radicalReviews + kanjiReviews + vocabReviews;

    if (totalReviews > 0) {
      notifications.push({
        id: "reviews-waiting",
        type: "reviews_waiting",
        title: "Revisions en attente",
        message: totalReviews === 1
          ? "1 element est pret a reviser"
          : `${totalReviews} elements sont prets a reviser`,
        actionUrl: "/reviews",
        actionLabel: "Reviser",
        priority: totalReviews > 50 ? "high" : totalReviews > 20 ? "medium" : "low",
        icon: "🔄",
        color: "orange",
        count: totalReviews,
        createdAt: now,
      });
    }

    // 2. Check for pending lessons
    const [radicalLessons, kanjiLessons, vocabLessons] = await Promise.all([
      prisma.userRadicalProgress.count({
        where: { userId, srsStage: 0, unlockedAt: { not: null } },
      }),
      prisma.userKanjiProgress.count({
        where: { userId, srsStage: 0, unlockedAt: { not: null } },
      }),
      prisma.userVocabularyProgress.count({
        where: { userId, srsStage: 0, unlockedAt: { not: null } },
      }),
    ]);

    const totalLessons = radicalLessons + kanjiLessons + vocabLessons;

    if (totalLessons > 0) {
      notifications.push({
        id: "lessons-available",
        type: "new_items",
        title: "Nouvelles lecons",
        message: totalLessons === 1
          ? "1 nouvel element a apprendre"
          : `${totalLessons} nouveaux elements a apprendre`,
        actionUrl: "/lessons",
        actionLabel: "Apprendre",
        priority: "medium",
        icon: "📚",
        color: "blue",
        count: totalLessons,
        createdAt: now,
      });
    }

    // 3. Check for weakness patterns (targeted study)
    // Only show if user hasn't done targeted study today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const didTargetedStudyToday = user.lastPatternAnalysis &&
      new Date(user.lastPatternAnalysis) >= todayStart;

    if (!didTargetedStudyToday) {
      const patterns = await prisma.userWeaknessPattern.findMany({
        where: { userId },
        select: { id: true, patternType: true, mistakeCount: true },
      });

      if (patterns.length > 0) {
        const totalMistakes = patterns.reduce((sum, p) => sum + p.mistakeCount, 0);
        notifications.push({
          id: "targeted-study",
          type: "targeted_study",
          title: "Etude ciblee disponible",
          message: patterns.length === 1
            ? "1 point faible detecte a travailler"
            : `${patterns.length} points faibles detectes a travailler`,
          actionUrl: "/study",
          actionLabel: "Etudier",
          priority: totalMistakes > 20 ? "high" : "medium",
          icon: "🎯",
          color: "purple",
          count: patterns.length,
          createdAt: now,
        });
      }
    }

    // 4. Check streak at risk
    if (user.currentStreak > 0 && user.lastStudyDate) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const lastStudyDay = new Date(user.lastStudyDate);
      lastStudyDay.setHours(0, 0, 0, 0);

      // If last study was yesterday or before, and no reviews done today
      if (lastStudyDay < todayStart && totalReviews === 0) {
        notifications.push({
          id: "streak-at-risk",
          type: "streak_at_risk",
          title: "Serie en danger !",
          message: `Ta serie de ${user.currentStreak} jour${user.currentStreak > 1 ? "s" : ""} est en danger. Fais au moins une revision aujourd'hui !`,
          actionUrl: "/reviews",
          actionLabel: "Sauver ma serie",
          priority: "high",
          icon: "🔥",
          color: "red",
          createdAt: now,
        });
      }
    }

    // Sort by priority (high first) then by type
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    notifications.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return NextResponse.json({
      notifications,
      unreadCount: notifications.filter(n => n.priority === "high" || n.priority === "medium").length,
    });
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recuperation des notifications" },
      { status: 500 }
    );
  }
}
