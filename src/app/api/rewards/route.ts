import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { THEMES, BADGES, getThemeById, getBadgeById } from "@/lib/rewards";

// GET /api/rewards - Get user's rewards status
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalXp: true,
        mnemonicCredits: true,
        selectedTheme: true,
        unlockedThemes: true,
        unlockedBadges: true,
        currentLevel: true,
        currentStreak: true,
        longestStreak: true,
        totalReviewsDone: true,
        totalLessonsDone: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
    }

    // Check for newly earned badges
    const newBadges = await checkAndAwardBadges(userId, user);

    // Get full theme and badge info
    const unlockedThemesInfo = user.unlockedThemes.map((id) => getThemeById(id)).filter(Boolean);
    const unlockedBadgesInfo = [...user.unlockedBadges, ...newBadges].map((id) => getBadgeById(id)).filter(Boolean);

    // Get locked themes
    const lockedThemes = THEMES.filter((t) => !user.unlockedThemes.includes(t.id));

    return NextResponse.json({
      totalXp: user.totalXp,
      mnemonicCredits: user.mnemonicCredits,
      selectedTheme: user.selectedTheme,
      unlockedThemes: unlockedThemesInfo,
      lockedThemes,
      unlockedBadges: unlockedBadgesInfo,
      allBadges: BADGES,
      stats: {
        currentLevel: user.currentLevel,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalReviewsDone: user.totalReviewsDone,
        totalLessonsDone: user.totalLessonsDone,
      },
    });
  } catch (error) {
    console.error("Failed to get rewards:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recuperation des recompenses" },
      { status: 500 }
    );
  }
}

// Check and award any new badges the user has earned
async function checkAndAwardBadges(
  userId: string,
  user: {
    unlockedBadges: string[];
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalReviewsDone: number;
    totalLessonsDone: number;
  }
): Promise<string[]> {
  const currentBadges = new Set(user.unlockedBadges);
  const newBadges: string[] = [];

  // Check milestone badges
  if (!currentBadges.has("first-lesson") && user.totalLessonsDone >= 1) {
    newBadges.push("first-lesson");
  }
  if (!currentBadges.has("hundred-reviews") && user.totalReviewsDone >= 100) {
    newBadges.push("hundred-reviews");
  }
  if (!currentBadges.has("thousand-reviews") && user.totalReviewsDone >= 1000) {
    newBadges.push("thousand-reviews");
  }

  // Check streak badges (use longest streak for permanent achievement)
  const maxStreak = Math.max(user.currentStreak, user.longestStreak);
  if (!currentBadges.has("streak-7") && maxStreak >= 7) {
    newBadges.push("streak-7");
  }
  if (!currentBadges.has("streak-30") && maxStreak >= 30) {
    newBadges.push("streak-30");
  }
  if (!currentBadges.has("streak-100") && maxStreak >= 100) {
    newBadges.push("streak-100");
  }

  // Check level badges
  if (!currentBadges.has("level-5") && user.currentLevel >= 5) {
    newBadges.push("level-5");
  }
  if (!currentBadges.has("level-10") && user.currentLevel >= 10) {
    newBadges.push("level-10");
  }

  // Check mastery badges (need to query progress tables)
  if (!currentBadges.has("first-guru") || !currentBadges.has("first-master") || !currentBadges.has("first-satori")) {
    const [radicalGuru, kanjiGuru, vocabGuru] = await Promise.all([
      prisma.userRadicalProgress.findFirst({
        where: { userId, srsStage: { gte: 5 } },
      }),
      prisma.userKanjiProgress.findFirst({
        where: { userId, srsStage: { gte: 5 } },
      }),
      prisma.userVocabularyProgress.findFirst({
        where: { userId, srsStage: { gte: 5 } },
      }),
    ]);

    if (!currentBadges.has("first-guru") && (radicalGuru || kanjiGuru || vocabGuru)) {
      newBadges.push("first-guru");
    }

    const [radicalMaster, kanjiMaster, vocabMaster] = await Promise.all([
      prisma.userRadicalProgress.findFirst({
        where: { userId, srsStage: { gte: 7 } },
      }),
      prisma.userKanjiProgress.findFirst({
        where: { userId, srsStage: { gte: 7 } },
      }),
      prisma.userVocabularyProgress.findFirst({
        where: { userId, srsStage: { gte: 7 } },
      }),
    ]);

    if (!currentBadges.has("first-master") && (radicalMaster || kanjiMaster || vocabMaster)) {
      newBadges.push("first-master");
    }

    const [radicalSatori, kanjiSatori, vocabSatori] = await Promise.all([
      prisma.userRadicalProgress.findFirst({
        where: { userId, srsStage: 9 },
      }),
      prisma.userKanjiProgress.findFirst({
        where: { userId, srsStage: 9 },
      }),
      prisma.userVocabularyProgress.findFirst({
        where: { userId, srsStage: 9 },
      }),
    ]);

    if (!currentBadges.has("first-satori") && (radicalSatori || kanjiSatori || vocabSatori)) {
      newBadges.push("first-satori");
    }
  }

  // Save new badges if any
  if (newBadges.length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        unlockedBadges: {
          push: newBadges,
        },
      },
    });
  }

  return newBadges;
}
