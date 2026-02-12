import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    // Get all user data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        currentLevel: true,
        lessonsPerDay: true,
        reviewBatchSize: true,
        autoplayAudio: true,
        currentStreak: true,
        longestStreak: true,
        lastStudyDate: true,
        totalXp: true,
        weeklyXp: true,
        totalReviewsDone: true,
        totalLessonsDone: true,
        perfectDays: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Get progress data
    const [radicalProgress, kanjiProgress, vocabularyProgress, reviews] =
      await Promise.all([
        prisma.userRadicalProgress.findMany({
          where: { userId: session.user.id },
          select: {
            radicalId: true,
            srsStage: true,
            unlockedAt: true,
            nextReviewAt: true,
            meaningCorrect: true,
            meaningIncorrect: true,
          },
        }),
        prisma.userKanjiProgress.findMany({
          where: { userId: session.user.id },
          select: {
            kanjiId: true,
            srsStage: true,
            unlockedAt: true,
            nextReviewAt: true,
            meaningCorrect: true,
            meaningIncorrect: true,
            readingCorrect: true,
            readingIncorrect: true,
          },
        }),
        prisma.userVocabularyProgress.findMany({
          where: { userId: session.user.id },
          select: {
            vocabularyId: true,
            srsStage: true,
            unlockedAt: true,
            nextReviewAt: true,
            meaningCorrect: true,
            meaningIncorrect: true,
            readingCorrect: true,
            readingIncorrect: true,
          },
        }),
        prisma.review.findMany({
          where: { userId: session.user.id },
          select: {
            id: true,
            itemType: true,
            itemId: true,
            reviewType: true,
            correct: true,
            srsStageFrom: true,
            srsStageTo: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 1000, // Limit to last 1000 reviews
        }),
      ]);

    const exportData = {
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        currentLevel: user.currentLevel,
        settings: {
          lessonsPerDay: user.lessonsPerDay,
          reviewBatchSize: user.reviewBatchSize,
          autoplayAudio: user.autoplayAudio,
        },
        gamification: {
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
          lastStudyDate: user.lastStudyDate,
          totalXp: user.totalXp,
          weeklyXp: user.weeklyXp,
          totalReviewsDone: user.totalReviewsDone,
          totalLessonsDone: user.totalLessonsDone,
          perfectDays: user.perfectDays,
        },
      },
      progress: {
        radicals: radicalProgress,
        kanji: kanjiProgress,
        vocabulary: vocabularyProgress,
      },
      recentReviews: reviews,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="nihongo-data-${user.username}-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  } catch (error) {
    console.error("Export data error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
