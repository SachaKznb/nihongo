import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateNewStage, calculateNextReview, SRS_STAGES } from "@/lib/srs";
import { unlockAvailableItems, levelUpUser } from "@/lib/unlocks";
import { generalRateLimit, checkRateLimit, invalidateUserCache } from "@/lib/upstash";
import { getTodayStart, getYesterdayStart, getWeekStart } from "@/lib/timezone";
import type { ItemType, ReviewType, AnswerResult } from "@/types";

// Update gamification stats
async function updateGamification(userId: string, correct: boolean, isLesson: boolean = false) {
  const now = new Date();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  // Use user's timezone for day calculations (default to UTC if not set)
  const userTimezone = user.timezone || "UTC";
  const todayStart = getTodayStart(userTimezone);
  const yesterdayStart = getYesterdayStart(userTimezone);
  const weekStart = getWeekStart(userTimezone);

  // Calculate XP earned
  const xpEarned = isLesson ? 10 : (correct ? 5 : 1);

  // Check if this is a new day for streak (in user's timezone)
  const lastStudy = user.lastStudyDate;
  const studiedToday = lastStudy && lastStudy >= todayStart;

  let newStreak = user.currentStreak;

  if (!studiedToday) {
    // First activity of the day in user's timezone
    if (lastStudy && lastStudy >= yesterdayStart) {
      // Studied yesterday (in user's timezone), continuing streak
      newStreak = user.currentStreak + 1;
    } else if (!lastStudy || lastStudy < yesterdayStart) {
      // Streak broken or first time studying
      newStreak = 1;
    }
  }

  // Check if weekly XP needs reset (every Monday in user's timezone)
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

function checkGrammarAnswer(
  userAnswer: string,
  expectedAnswers: string[],
  formation: string
): boolean {
  const normalizedAnswer = userAnswer.trim().toLowerCase();
  const normalizedAnswerHiragana = romajiToHiragana(normalizedAnswer);

  // Check against the main expected answers (titleJp)
  for (const expected of expectedAnswers) {
    const normalizedExpected = expected.toLowerCase().trim();
    if (normalizedAnswer === normalizedExpected) return true;
    if (normalizedAnswerHiragana === normalizedExpected) return true;
    // Remove tilde (~) and check again for grammar patterns like ~て
    const cleanExpected = normalizedExpected.replace(/[~～]/g, "").trim();
    if (normalizedAnswer === cleanExpected) return true;
    if (normalizedAnswerHiragana === cleanExpected) return true;
  }

  // Also extract key grammar forms from the formation field
  // Look for patterns in Japanese (hiragana/katakana/kanji)
  const japanesePattern = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+/g;
  const formationForms = formation.match(japanesePattern) || [];

  for (const form of formationForms) {
    const cleanForm = form.replace(/[~～]/g, "").trim().toLowerCase();
    if (normalizedAnswer === cleanForm) return true;
    if (normalizedAnswerHiragana === cleanForm) return true;
  }

  // Allow small typos for longer answers
  for (const expected of expectedAnswers) {
    const cleanExpected = expected.replace(/[~～]/g, "").trim().toLowerCase();
    if (cleanExpected.length > 3) {
      const maxDistance = cleanExpected.length > 6 ? 2 : 1;
      if (levenshteinDistance(normalizedAnswer, cleanExpected) <= maxDistance) {
        return true;
      }
      if (levenshteinDistance(normalizedAnswerHiragana, cleanExpected) <= maxDistance) {
        return true;
      }
    }
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
  // Comprehensive romaji to hiragana mapping
  // Using actual hiragana characters for better readability
  const map: Record<string, string> = {
    // Basic vowels
    a: "あ", i: "い", u: "う", e: "え", o: "お",

    // K-row
    ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",

    // S-row (including alternative romanizations)
    sa: "さ", shi: "し", si: "し", su: "す", se: "せ", so: "そ",

    // T-row (including alternative romanizations)
    ta: "た", chi: "ち", ti: "ち", tsu: "つ", tu: "つ", te: "て", to: "と",

    // N-row
    na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",

    // H-row (including hu → ふ alternative)
    ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ",

    // M-row
    ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",

    // Y-row
    ya: "や", yu: "ゆ", yo: "よ",

    // R-row
    ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",

    // W-row and n
    wa: "わ", wi: "ゐ", we: "ゑ", wo: "を",
    nn: "ん", // Double n always becomes ん

    // G-row (voiced K)
    ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",

    // Z-row (voiced S, including alternatives)
    za: "ざ", ji: "じ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",

    // D-row (voiced T, including alternatives)
    da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",

    // B-row (voiced H)
    ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",

    // P-row (semi-voiced H)
    pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",

    // K-row combinations (きゃ, きゅ, きょ)
    kya: "きゃ", kyu: "きゅ", kyo: "きょ",

    // S-row combinations (しゃ, しゅ, しょ) - multiple romanizations
    sha: "しゃ", shu: "しゅ", sho: "しょ",
    sya: "しゃ", syu: "しゅ", syo: "しょ",

    // C-row combinations (ちゃ, ちゅ, ちょ) - multiple romanizations
    cha: "ちゃ", chu: "ちゅ", cho: "ちょ",
    tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
    cya: "ちゃ", cyu: "ちゅ", cyo: "ちょ",

    // N-row combinations
    nya: "にゃ", nyu: "にゅ", nyo: "にょ",

    // H-row combinations
    hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",

    // M-row combinations
    mya: "みゃ", myu: "みゅ", myo: "みょ",

    // R-row combinations
    rya: "りゃ", ryu: "りゅ", ryo: "りょ",

    // G-row combinations
    gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",

    // J-row combinations (じゃ, じゅ, じょ) - multiple romanizations
    ja: "じゃ", ju: "じゅ", jo: "じょ",
    jya: "じゃ", jyu: "じゅ", jyo: "じょ",
    zya: "じゃ", zyu: "じゅ", zyo: "じょ",

    // D-row combinations (ぢゃ, ぢゅ, ぢょ)
    dya: "ぢゃ", dyu: "ぢゅ", dyo: "ぢょ",

    // B-row combinations
    bya: "びゃ", byu: "びゅ", byo: "びょ",

    // P-row combinations
    pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",

    // F-row combinations (for modern words)
    fa: "ふぁ", fi: "ふぃ", fe: "ふぇ", fo: "ふぉ",

    // T-row extended combinations
    tsa: "つぁ", tsi: "つぃ", tse: "つぇ", tso: "つぉ",

    // Small kana (for special cases)
    xa: "ぁ", xi: "ぃ", xu: "ぅ", xe: "ぇ", xo: "ぉ",
    xya: "ゃ", xyu: "ゅ", xyo: "ょ",
    xtu: "っ", xtsu: "っ", ltu: "っ", ltsu: "っ",
    xwa: "ゎ",
    la: "ぁ", li: "ぃ", lu: "ぅ", le: "ぇ", lo: "ぉ",
    lya: "ゃ", lyu: "ゅ", lyo: "ょ",
    lwa: "ゎ",
  };

  // Consonants that can be doubled to produce っ (small tsu)
  const doubleConsonants = new Set([
    'k', 'g', 's', 'z', 't', 'd', 'n', 'h', 'f', 'b', 'p', 'm', 'r', 'w', 'j', 'c'
  ]);

  // Special handling for "tch" -> っち (e.g., "matchi" → まっち)
  // and "cch" -> っち (e.g., "kocchi" → こっち)
  let processed = romaji.toLowerCase();
  processed = processed.replace(/tch/g, "っch");
  processed = processed.replace(/cch/g, "っch");
  processed = processed.replace(/tts/g, "っts"); // e.g., "mittsu" → みっつ

  let result = "";
  let i = 0;

  while (i < processed.length) {
    // Handle double consonants (gemination) -> っ
    // Check if current char equals next char and is a consonant
    if (
      i + 1 < processed.length &&
      processed[i] === processed[i + 1] &&
      doubleConsonants.has(processed[i]) &&
      processed[i] !== 'n' // 'nn' is handled separately as ん
    ) {
      result += "っ";
      i += 1; // Skip one consonant, let the next iteration handle the syllable
      continue;
    }

    // Handle standalone 'n' - needs special logic
    // 'n' becomes ん when:
    // - followed by a consonant (except y)
    // - at the end of the string
    // - followed by another 'n' (nn -> ん)
    // - followed by punctuation/space
    if (processed[i] === 'n') {
      // Check for 'nn' -> ん
      if (i + 1 < processed.length && processed[i + 1] === 'n') {
        result += "ん";
        i += 2;
        continue;
      }

      // Check if 'n' should become ん (before consonant that's not y, or at end)
      const nextChar = i + 1 < processed.length ? processed[i + 1] : '';
      const isBeforeConsonant = nextChar && !/[aiueoy]/.test(nextChar);
      const isAtEnd = i + 1 >= processed.length;
      const isBeforeNonRomaji = nextChar && !/[a-z]/.test(nextChar);

      if ((isBeforeConsonant || isAtEnd || isBeforeNonRomaji) && !map['n' + nextChar]) {
        // Check it's not part of a valid syllable like "na", "ni", etc.
        let foundSyllable = false;
        for (let len = 3; len >= 2; len--) {
          const slice = processed.slice(i, i + len);
          if (map[slice]) {
            foundSyllable = true;
            break;
          }
        }
        if (!foundSyllable) {
          result += "ん";
          i += 1;
          continue;
        }
      }
    }

    // Try 4-char combinations first (for xtsu, ltsu, etc.)
    if (i + 4 <= processed.length && map[processed.slice(i, i + 4)]) {
      result += map[processed.slice(i, i + 4)];
      i += 4;
      continue;
    }

    // Try 3-char combinations
    if (i + 3 <= processed.length && map[processed.slice(i, i + 3)]) {
      result += map[processed.slice(i, i + 3)];
      i += 3;
      continue;
    }

    // Try 2-char combinations
    if (i + 2 <= processed.length && map[processed.slice(i, i + 2)]) {
      result += map[processed.slice(i, i + 2)];
      i += 2;
      continue;
    }

    // Try single char
    if (map[processed[i]]) {
      result += map[processed[i]];
      i += 1;
      continue;
    }

    // Keep character as-is if not in map (handles っ already inserted, punctuation, etc.)
    result += processed[i];
    i += 1;
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

    if (type === "grammar") {
      const grammar = await prisma.grammarPoint.findUnique({ where: { id } });
      const progress = await prisma.userGrammarProgress.findUnique({
        where: { userId_grammarId: { userId, grammarId: id } },
      });

      if (!grammar || !progress) {
        return NextResponse.json({ error: "Item non trouvé" }, { status: 404 });
      }

      currentStage = progress.srsStage;

      // Grammar reviews use fill-in-the-blank style
      // The expected answer is typically a grammar form that completes a sentence
      // We accept the grammar title (titleJp) or common forms from the formation field
      expectedAnswers = [grammar.titleJp];

      // For grammar, we check if the user's answer matches the expected grammar pattern
      // This is more lenient than kanji/vocab since grammar patterns can vary
      correct = checkGrammarAnswer(answer, expectedAnswers, grammar.formation);

      const newStage = calculateNewStage(currentStage, correct);
      const nextReviewAt =
        newStage === SRS_STAGES.BURNED ? null : calculateNextReview(newStage);

      await prisma.userGrammarProgress.update({
        where: { userId_grammarId: { userId, grammarId: id } },
        data: {
          srsStage: newStage,
          nextReviewAt,
          correctCount: { increment: correct ? 1 : 0 },
          incorrectCount: { increment: correct ? 0 : 1 },
          burnedAt: newStage === SRS_STAGES.BURNED ? new Date() : undefined,
        },
      });

      await prisma.review.create({
        data: {
          userId,
          itemType: type,
          itemId: id,
          reviewType: "grammar",
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
