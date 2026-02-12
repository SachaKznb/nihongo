import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

// POST /api/admin/testing - Execute testing actions
export async function POST(request: NextRequest) {
  const { error, session } = await requireAdminApi();
  if (error || !session) {
    return error || NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const adminId = session.user.id;

  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action) {
      case "reset_progress":
        return await resetProgress(adminId, params);
      case "set_srs_stage":
        return await setSrsStage(adminId, params);
      case "schedule_reviews_now":
        return await scheduleReviewsNow(adminId, params);
      case "add_test_mistakes":
        return await addTestMistakes(adminId, params);
      case "setup_demo_mode":
        return await setupDemoMode(adminId);
      case "clear_mistakes":
        return await clearMistakes(adminId);
      case "trigger_pattern_analysis":
        return await triggerPatternAnalysis(adminId);
      default:
        return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
    }
  } catch (error) {
    console.error("Testing action error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'execution" },
      { status: 500 }
    );
  }
}

// Reset progress for admin user
async function resetProgress(
  userId: string,
  params: { scope: "all" | "level" | "type"; levelId?: number; itemType?: string }
) {
  const { scope, levelId, itemType } = params;

  if (scope === "all") {
    // Reset all progress
    await Promise.all([
      prisma.userRadicalProgress.deleteMany({ where: { userId } }),
      prisma.userKanjiProgress.deleteMany({ where: { userId } }),
      prisma.userVocabularyProgress.deleteMany({ where: { userId } }),
      prisma.review.deleteMany({ where: { userId } }),
      prisma.reviewMistake.deleteMany({ where: { userId } }),
      prisma.userWeaknessPattern.deleteMany({ where: { userId } }),
    ]);

    // Reset user level
    await prisma.user.update({
      where: { id: userId },
      data: { currentLevel: 1, lastPatternAnalysis: null },
    });

    return NextResponse.json({ success: true, message: "Toute la progression a ete reinitialise" });
  }

  if (scope === "level" && levelId) {
    // Get items for this level
    const [radicals, kanji, vocabulary] = await Promise.all([
      prisma.radical.findMany({ where: { levelId }, select: { id: true } }),
      prisma.kanji.findMany({ where: { levelId }, select: { id: true } }),
      prisma.vocabulary.findMany({ where: { levelId }, select: { id: true } }),
    ]);

    await Promise.all([
      prisma.userRadicalProgress.deleteMany({
        where: { userId, radicalId: { in: radicals.map((r) => r.id) } },
      }),
      prisma.userKanjiProgress.deleteMany({
        where: { userId, kanjiId: { in: kanji.map((k) => k.id) } },
      }),
      prisma.userVocabularyProgress.deleteMany({
        where: { userId, vocabularyId: { in: vocabulary.map((v) => v.id) } },
      }),
    ]);

    return NextResponse.json({ success: true, message: `Niveau ${levelId} reinitialise` });
  }

  if (scope === "type" && itemType) {
    if (itemType === "radical") {
      await prisma.userRadicalProgress.deleteMany({ where: { userId } });
    } else if (itemType === "kanji") {
      await prisma.userKanjiProgress.deleteMany({ where: { userId } });
    } else if (itemType === "vocabulary") {
      await prisma.userVocabularyProgress.deleteMany({ where: { userId } });
    }

    return NextResponse.json({ success: true, message: `${itemType} reinitialise` });
  }

  return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
}

// Set SRS stage for specific items
async function setSrsStage(
  userId: string,
  params: { itemType: string; itemIds: number[]; stage: number }
) {
  const { itemType, itemIds, stage } = params;
  const now = new Date();

  // Calculate next review time based on stage
  const getNextReview = (s: number) => {
    if (s === 0 || s === 9) return null;
    const intervals = [0, 4, 8, 24, 48, 168, 336, 720, 2880];
    const hours = intervals[s] || 4;
    return new Date(now.getTime() + hours * 60 * 60 * 1000);
  };

  const nextReviewAt = getNextReview(stage);

  if (itemType === "radical") {
    for (const id of itemIds) {
      await prisma.userRadicalProgress.upsert({
        where: { userId_radicalId: { userId, radicalId: id } },
        update: { srsStage: stage, nextReviewAt },
        create: {
          userId,
          radicalId: id,
          srsStage: stage,
          unlockedAt: stage > 0 ? now : null,
          nextReviewAt,
        },
      });
    }
  } else if (itemType === "kanji") {
    for (const id of itemIds) {
      await prisma.userKanjiProgress.upsert({
        where: { userId_kanjiId: { userId, kanjiId: id } },
        update: { srsStage: stage, nextReviewAt },
        create: {
          userId,
          kanjiId: id,
          srsStage: stage,
          unlockedAt: stage > 0 ? now : null,
          nextReviewAt,
        },
      });
    }
  } else if (itemType === "vocabulary") {
    for (const id of itemIds) {
      await prisma.userVocabularyProgress.upsert({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
        update: { srsStage: stage, nextReviewAt },
        create: {
          userId,
          vocabularyId: id,
          srsStage: stage,
          unlockedAt: stage > 0 ? now : null,
          nextReviewAt,
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    message: `${itemIds.length} element(s) mis au stage ${stage}`,
  });
}

// Schedule items for review immediately
async function scheduleReviewsNow(
  userId: string,
  params: { count?: number; itemType?: string }
) {
  const { count = 10, itemType } = params;
  const now = new Date();

  // Find items with stage > 0 and update their next review time
  if (!itemType || itemType === "radical") {
    await prisma.userRadicalProgress.updateMany({
      where: { userId, srsStage: { gt: 0, lt: 9 } },
      data: { nextReviewAt: now },
    });
  }

  if (!itemType || itemType === "kanji") {
    await prisma.userKanjiProgress.updateMany({
      where: { userId, srsStage: { gt: 0, lt: 9 } },
      data: { nextReviewAt: now },
    });
  }

  if (!itemType || itemType === "vocabulary") {
    await prisma.userVocabularyProgress.updateMany({
      where: { userId, srsStage: { gt: 0, lt: 9 } },
      data: { nextReviewAt: now },
    });
  }

  return NextResponse.json({
    success: true,
    message: "Revisions programmees maintenant",
  });
}

// Add test mistakes for pattern detection
async function addTestMistakes(
  userId: string,
  params: { pattern: "visual" | "reading" | "translation" }
) {
  const { pattern } = params;

  // Get some kanji to create realistic mistakes
  const kanji = await prisma.kanji.findMany({
    take: 10,
    select: { id: true, character: true, meaningsFr: true, readingsOn: true },
  });

  if (kanji.length < 4) {
    return NextResponse.json({ error: "Pas assez de kanji" }, { status: 400 });
  }

  const mistakes: {
    userId: string;
    itemType: string;
    itemId: number;
    reviewType: string;
    userAnswer: string;
    correctAnswers: string[];
  }[] = [];

  if (pattern === "visual") {
    // Create confusion between similar-looking kanji
    // User answers with meaning of kanji B when asked about kanji A
    for (let i = 0; i < kanji.length - 1; i += 2) {
      const a = kanji[i];
      const b = kanji[i + 1];

      // A answered with B's meaning
      for (let j = 0; j < 3; j++) {
        mistakes.push({
          userId,
          itemType: "kanji",
          itemId: a.id,
          reviewType: "meaning",
          userAnswer: b.meaningsFr[0],
          correctAnswers: a.meaningsFr,
        });
      }

      // B answered with A's meaning
      for (let j = 0; j < 3; j++) {
        mistakes.push({
          userId,
          itemType: "kanji",
          itemId: b.id,
          reviewType: "meaning",
          userAnswer: a.meaningsFr[0],
          correctAnswers: b.meaningsFr,
        });
      }
    }
  } else if (pattern === "reading") {
    // Create reading confusion
    for (const k of kanji.slice(0, 6)) {
      if (k.readingsOn.length > 0) {
        for (let j = 0; j < 3; j++) {
          mistakes.push({
            userId,
            itemType: "kanji",
            itemId: k.id,
            reviewType: "reading",
            userAnswer: "きょう", // Common wrong reading
            correctAnswers: k.readingsOn,
          });
        }
      }
    }
  } else if (pattern === "translation") {
    // Create translation nuance mistakes
    for (const k of kanji.slice(0, 6)) {
      for (let j = 0; j < 3; j++) {
        mistakes.push({
          userId,
          itemType: "kanji",
          itemId: k.id,
          reviewType: "meaning",
          userAnswer: "chose", // Generic wrong French word
          correctAnswers: k.meaningsFr,
        });
      }
    }
  }

  // Insert mistakes
  await prisma.reviewMistake.createMany({ data: mistakes });

  return NextResponse.json({
    success: true,
    message: `${mistakes.length} erreurs de test ajoutees (pattern: ${pattern})`,
  });
}

// Setup demo mode with realistic progress
async function setupDemoMode(userId: string) {
  const now = new Date();

  // First, reset everything
  await Promise.all([
    prisma.userRadicalProgress.deleteMany({ where: { userId } }),
    prisma.userKanjiProgress.deleteMany({ where: { userId } }),
    prisma.userVocabularyProgress.deleteMany({ where: { userId } }),
    prisma.review.deleteMany({ where: { userId } }),
    prisma.reviewMistake.deleteMany({ where: { userId } }),
    prisma.userWeaknessPattern.deleteMany({ where: { userId } }),
  ]);

  // Get level 1 and 2 items
  const [radicals1, radicals2, kanji1, kanji2, vocab1] = await Promise.all([
    prisma.radical.findMany({ where: { levelId: 1 }, select: { id: true } }),
    prisma.radical.findMany({ where: { levelId: 2 }, select: { id: true } }),
    prisma.kanji.findMany({ where: { levelId: 1 }, select: { id: true } }),
    prisma.kanji.findMany({ where: { levelId: 2 }, select: { id: true } }),
    prisma.vocabulary.findMany({ where: { levelId: 1 }, select: { id: true } }),
  ]);

  // Level 1 radicals: all at Guru (stage 5)
  for (const r of radicals1) {
    await prisma.userRadicalProgress.create({
      data: {
        userId,
        radicalId: r.id,
        srsStage: 5,
        unlockedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        nextReviewAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        meaningCorrect: 5,
      },
    });
  }

  // Level 2 radicals: mix of stages, some due for review
  for (let i = 0; i < radicals2.length; i++) {
    const stage = i < 3 ? 4 : i < 6 ? 3 : 2;
    const dueNow = i < 4;
    await prisma.userRadicalProgress.create({
      data: {
        userId,
        radicalId: radicals2[i].id,
        srsStage: stage,
        unlockedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        nextReviewAt: dueNow ? now : new Date(now.getTime() + 4 * 60 * 60 * 1000),
        meaningCorrect: stage - 1,
        meaningIncorrect: 1,
      },
    });
  }

  // Level 1 kanji: mix of stages, some due for review
  for (let i = 0; i < kanji1.length; i++) {
    const stage = i < 2 ? 5 : i < 4 ? 4 : 3;
    const dueNow = i >= 2 && i < 5;
    await prisma.userKanjiProgress.create({
      data: {
        userId,
        kanjiId: kanji1[i].id,
        srsStage: stage,
        unlockedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        nextReviewAt: dueNow ? now : new Date(now.getTime() + 24 * 60 * 60 * 1000),
        meaningCorrect: stage - 1,
        readingCorrect: stage - 1,
      },
    });
  }

  // Level 2 kanji: locked (stage 0) - will be lessons
  for (const k of kanji2.slice(0, 4)) {
    await prisma.userKanjiProgress.create({
      data: {
        userId,
        kanjiId: k.id,
        srsStage: 0,
        unlockedAt: now,
        nextReviewAt: null,
      },
    });
  }

  // Level 1 vocab: some learned, some as lessons
  for (let i = 0; i < vocab1.length; i++) {
    const stage = i < 3 ? 3 : 0;
    await prisma.userVocabularyProgress.create({
      data: {
        userId,
        vocabularyId: vocab1[i].id,
        srsStage: stage,
        unlockedAt: stage > 0 ? new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) : now,
        nextReviewAt: stage > 0 ? now : null,
        meaningCorrect: stage > 0 ? 2 : 0,
        readingCorrect: stage > 0 ? 2 : 0,
      },
    });
  }

  // Add some test mistakes for pattern detection
  const kanjiForMistakes = await prisma.kanji.findMany({
    where: { levelId: 1 },
    take: 4,
    select: { id: true, meaningsFr: true },
  });

  if (kanjiForMistakes.length >= 2) {
    const mistakes = [];
    // Create visual confusion pattern
    for (let i = 0; i < 3; i++) {
      mistakes.push({
        userId,
        itemType: "kanji",
        itemId: kanjiForMistakes[0].id,
        reviewType: "meaning",
        userAnswer: kanjiForMistakes[1].meaningsFr[0],
        correctAnswers: kanjiForMistakes[0].meaningsFr,
      });
      mistakes.push({
        userId,
        itemType: "kanji",
        itemId: kanjiForMistakes[1].id,
        reviewType: "meaning",
        userAnswer: kanjiForMistakes[0].meaningsFr[0],
        correctAnswers: kanjiForMistakes[1].meaningsFr,
      });
    }
    await prisma.reviewMistake.createMany({ data: mistakes });
  }

  // Update user level
  await prisma.user.update({
    where: { id: userId },
    data: {
      currentLevel: 2,
      currentStreak: 5,
      longestStreak: 12,
      totalXp: 450,
      weeklyXp: 180,
      totalReviewsDone: 87,
      totalLessonsDone: 24,
      perfectDays: 3,
      lastStudyDate: new Date(now.getTime() - 12 * 60 * 60 * 1000),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Mode demo configure: niveau 2, revisions en attente, lecons disponibles, erreurs pour patterns",
  });
}

// Clear all mistakes
async function clearMistakes(userId: string) {
  await Promise.all([
    prisma.reviewMistake.deleteMany({ where: { userId } }),
    prisma.userWeaknessPattern.deleteMany({ where: { userId } }),
  ]);

  await prisma.user.update({
    where: { id: userId },
    data: { lastPatternAnalysis: null },
  });

  return NextResponse.json({
    success: true,
    message: "Erreurs et patterns supprimes",
  });
}

// Trigger pattern analysis manually
async function triggerPatternAnalysis(userId: string) {
  const { analyzeUserPatterns } = await import("@/lib/pattern-analyzer");
  const patterns = await analyzeUserPatterns(userId);

  return NextResponse.json({
    success: true,
    message: `Analyse terminee: ${patterns.length} pattern(s) detecte(s)`,
    patterns,
  });
}
