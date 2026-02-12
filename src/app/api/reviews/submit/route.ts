import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateNewStage, calculateNextReview, SRS_STAGES } from "@/lib/srs";
import { unlockAvailableItems, levelUpUser } from "@/lib/unlocks";
import { generalRateLimit, checkRateLimit, invalidateUserCache } from "@/lib/upstash";
import type { ItemType, ReviewType, AnswerResult } from "@/types";

// Update gamification stats
async function updateGamification(userId: string, correct: boolean, isLesson: boolean = false) {
  const now = new Date();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  // Calculate XP earned
  const xpEarned = isLesson ? 10 : (correct ? 5 : 1);

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

  // Check for perfect day (100% accuracy for today)
  const todayReviews = await prisma.review.findMany({
    where: {
      userId,
      createdAt: { gte: todayStart },
    },
  });

  const todayCorrect = todayReviews.filter(r => r.correct).length;
  const todayTotal = todayReviews.length;
  const wasPerfectBefore = todayTotal > 1 && todayCorrect === todayTotal - 1;
  const isPerfectNow = todayTotal > 0 && correct && todayCorrect + 1 === todayTotal + 1;
  const lostPerfect = todayTotal > 0 && !correct && todayCorrect === todayTotal;

  let perfectDaysAdjust = 0;
  if (isPerfectNow && !wasPerfectBefore && todayTotal >= 5) {
    // Just achieved perfect day (minimum 5 reviews)
    perfectDaysAdjust = 1;
  } else if (lostPerfect && todayTotal >= 5) {
    // Lost perfect day status (but don't go below 0)
    perfectDaysAdjust = user.perfectDays > 0 ? -1 : 0;
  }

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
      totalLessonsDone: isLesson ? { increment: 1 } : undefined,
      perfectDays: { increment: perfectDaysAdjust },
    },
  });

  // Invalidate user's cached data
  await invalidateUserCache(userId);
}

function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s]/g, ""); // Remove special chars
}

function checkMeaningAnswer(
  userAnswer: string,
  acceptedMeanings: string[]
): boolean {
  const normalizedAnswer = normalizeAnswer(userAnswer);

  for (const meaning of acceptedMeanings) {
    const normalizedMeaning = normalizeAnswer(meaning);

    // Exact match
    if (normalizedAnswer === normalizedMeaning) return true;

    // Allow small typos (Levenshtein distance <= 1 for short words, <= 2 for longer)
    const maxDistance = normalizedMeaning.length > 5 ? 2 : 1;
    if (levenshteinDistance(normalizedAnswer, normalizedMeaning) <= maxDistance) {
      return true;
    }
  }

  return false;
}

function checkReadingAnswer(userAnswer: string, acceptedReadings: string[]): boolean {
  const normalizedAnswer = userAnswer.trim().toLowerCase();

  for (const reading of acceptedReadings) {
    if (normalizedAnswer === reading.toLowerCase()) return true;
    // Convert romaji to hiragana for comparison
    if (romajiToHiragana(normalizedAnswer) === reading) return true;
  }

  return false;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function romajiToHiragana(romaji: string): string {
  const map: Record<string, string> = {
    a: "\u3042", i: "\u3044", u: "\u3046", e: "\u3048", o: "\u304a",
    ka: "\u304b", ki: "\u304d", ku: "\u304f", ke: "\u3051", ko: "\u3053",
    sa: "\u3055", shi: "\u3057", su: "\u3059", se: "\u305b", so: "\u305d",
    ta: "\u305f", chi: "\u3061", tsu: "\u3064", te: "\u3066", to: "\u3068",
    na: "\u306a", ni: "\u306b", nu: "\u306c", ne: "\u306d", no: "\u306e",
    ha: "\u306f", hi: "\u3072", fu: "\u3075", he: "\u3078", ho: "\u307b",
    ma: "\u307e", mi: "\u307f", mu: "\u3080", me: "\u3081", mo: "\u3082",
    ya: "\u3084", yu: "\u3086", yo: "\u3088",
    ra: "\u3089", ri: "\u308a", ru: "\u308b", re: "\u308c", ro: "\u308d",
    wa: "\u308f", wo: "\u3092", n: "\u3093",
    ga: "\u304c", gi: "\u304e", gu: "\u3050", ge: "\u3052", go: "\u3054",
    za: "\u3056", ji: "\u3058", zu: "\u305a", ze: "\u305c", zo: "\u305e",
    da: "\u3060", di: "\u3062", du: "\u3065", de: "\u3067", do: "\u3069",
    ba: "\u3070", bi: "\u3073", bu: "\u3076", be: "\u3079", bo: "\u307c",
    pa: "\u3071", pi: "\u3074", pu: "\u3077", pe: "\u307a", po: "\u307d",
    kya: "\u304d\u3083", kyu: "\u304d\u3085", kyo: "\u304d\u3087",
    sha: "\u3057\u3083", shu: "\u3057\u3085", sho: "\u3057\u3087",
    cha: "\u3061\u3083", chu: "\u3061\u3085", cho: "\u3061\u3087",
    nya: "\u306b\u3083", nyu: "\u306b\u3085", nyo: "\u306b\u3087",
    hya: "\u3072\u3083", hyu: "\u3072\u3085", hyo: "\u3072\u3087",
    mya: "\u307f\u3083", myu: "\u307f\u3085", myo: "\u307f\u3087",
    rya: "\u308a\u3083", ryu: "\u308a\u3085", ryo: "\u308a\u3087",
    gya: "\u304e\u3083", gyu: "\u304e\u3085", gyo: "\u304e\u3087",
    ja: "\u3058\u3083", ju: "\u3058\u3085", jo: "\u3058\u3087",
    bya: "\u3073\u3083", byu: "\u3073\u3085", byo: "\u3073\u3087",
    pya: "\u3074\u3083", pyu: "\u3074\u3085", pyo: "\u3074\u3087",
  };

  let result = "";
  let i = 0;

  while (i < romaji.length) {
    // Try 3-char combinations first
    if (i + 3 <= romaji.length && map[romaji.slice(i, i + 3)]) {
      result += map[romaji.slice(i, i + 3)];
      i += 3;
    } else if (i + 2 <= romaji.length && map[romaji.slice(i, i + 2)]) {
      result += map[romaji.slice(i, i + 2)];
      i += 2;
    } else if (map[romaji[i]]) {
      result += map[romaji[i]];
      i += 1;
    } else {
      result += romaji[i];
      i += 1;
    }
  }

  return result;
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  // Rate limiting
  const rateLimit = await checkRateLimit(generalRateLimit, userId);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Trop de requetes. Veuillez patienter." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { type, id, reviewType, answer } = body as {
    type: ItemType;
    id: number;
    reviewType: ReviewType;
    answer: string;
  };

  if (!type || !id || !reviewType || answer === undefined) {
    return NextResponse.json(
      { error: "Parametres manquants" },
      { status: 400 }
    );
  }

  try {
    let correct = false;
    let expectedAnswers: string[] = [];
    let currentStage = 0;

    // Get the item and check the answer
    if (type === "radical") {
      const radical = await prisma.radical.findUnique({ where: { id } });
      const progress = await prisma.userRadicalProgress.findUnique({
        where: { userId_radicalId: { userId, radicalId: id } },
      });

      if (!radical || !progress) {
        return NextResponse.json({ error: "Item non trouvé" }, { status: 404 });
      }

      expectedAnswers = [radical.meaningFr];
      currentStage = progress.srsStage;
      correct = checkMeaningAnswer(answer, expectedAnswers);

      // Update progress
      const newStage = calculateNewStage(currentStage, correct);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      await prisma.userRadicalProgress.update({
        where: { userId_radicalId: { userId, radicalId: id } },
        data: {
          srsStage: newStage,
          nextReviewAt,
          meaningCorrect: { increment: correct ? 1 : 0 },
          meaningIncorrect: { increment: correct ? 0 : 1 },
        },
      });

      // Record review
      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType,
          correct,
          srsStageFrom: currentStage,
          srsStageTo: newStage,
        },
      });

      // Update gamification stats
      await updateGamification(userId, correct, currentStage === 0);

      // Check for unlocks and level up
      await unlockAvailableItems(userId);
      await levelUpUser(userId);

      const result: AnswerResult = {
        correct,
        expectedAnswers,
        srsStageFrom: currentStage,
        srsStageTo: newStage,
      };

      return NextResponse.json(result);
    }

    if (type === "kanji") {
      const kanji = await prisma.kanji.findUnique({ where: { id } });
      const progress = await prisma.userKanjiProgress.findUnique({
        where: { userId_kanjiId: { userId, kanjiId: id } },
      });

      if (!kanji || !progress) {
        return NextResponse.json({ error: "Item non trouvé" }, { status: 404 });
      }

      currentStage = progress.srsStage;

      if (reviewType === "meaning") {
        expectedAnswers = kanji.meaningsFr;
        correct = checkMeaningAnswer(answer, expectedAnswers);
      } else {
        expectedAnswers = [...kanji.readingsOn, ...kanji.readingsKun];
        correct = checkReadingAnswer(answer, expectedAnswers);
      }

      const newStage = calculateNewStage(currentStage, correct);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      const updateData: Record<string, unknown> = {
        srsStage: newStage,
        nextReviewAt,
      };

      if (reviewType === "meaning") {
        updateData.meaningCorrect = { increment: correct ? 1 : 0 };
        updateData.meaningIncorrect = { increment: correct ? 0 : 1 };
      } else {
        updateData.readingCorrect = { increment: correct ? 1 : 0 };
        updateData.readingIncorrect = { increment: correct ? 0 : 1 };
      }

      await prisma.userKanjiProgress.update({
        where: { userId_kanjiId: { userId, kanjiId: id } },
        data: updateData,
      });

      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType,
          correct,
          srsStageFrom: currentStage,
          srsStageTo: newStage,
        },
      });

      // Update gamification stats
      await updateGamification(userId, correct, currentStage === 0);

      await unlockAvailableItems(userId);
      await levelUpUser(userId);

      const result: AnswerResult = {
        correct,
        expectedAnswers,
        srsStageFrom: currentStage,
        srsStageTo: newStage,
      };

      return NextResponse.json(result);
    }

    if (type === "vocabulary") {
      const vocabulary = await prisma.vocabulary.findUnique({ where: { id } });
      const progress = await prisma.userVocabularyProgress.findUnique({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
      });

      if (!vocabulary || !progress) {
        return NextResponse.json({ error: "Item non trouvé" }, { status: 404 });
      }

      currentStage = progress.srsStage;

      if (reviewType === "meaning") {
        expectedAnswers = vocabulary.meaningsFr;
        correct = checkMeaningAnswer(answer, expectedAnswers);
      } else {
        expectedAnswers = vocabulary.readings;
        correct = checkReadingAnswer(answer, expectedAnswers);
      }

      const newStage = calculateNewStage(currentStage, correct);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      const updateData: Record<string, unknown> = {
        srsStage: newStage,
        nextReviewAt,
      };

      if (reviewType === "meaning") {
        updateData.meaningCorrect = { increment: correct ? 1 : 0 };
        updateData.meaningIncorrect = { increment: correct ? 0 : 1 };
      } else {
        updateData.readingCorrect = { increment: correct ? 1 : 0 };
        updateData.readingIncorrect = { increment: correct ? 0 : 1 };
      }

      await prisma.userVocabularyProgress.update({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
        data: updateData,
      });

      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType,
          correct,
          srsStageFrom: currentStage,
          srsStageTo: newStage,
        },
      });

      // Update gamification stats
      await updateGamification(userId, correct, currentStage === 0);

      await unlockAvailableItems(userId);
      await levelUpUser(userId);

      const result: AnswerResult = {
        correct,
        expectedAnswers,
        srsStageFrom: currentStage,
        srsStageTo: newStage,
      };

      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Type invalide" }, { status: 400 });
  } catch (error) {
    console.error("Review submit error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la soumission de la revision" },
      { status: 500 }
    );
  }
}
