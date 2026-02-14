import { prisma } from "./db";
import { SRS_STAGES } from "./srs";
import { sendLevelUpEmail } from "./email";
import crypto from "crypto";

export const GURU_THRESHOLD = SRS_STAGES.GURU_1; // Stage 5 = Guru 1
export const LEVEL_UP_PERCENTAGE = 0.9; // 90% of kanji at guru

// Check if a kanji should be unlocked (all radicals at Guru+)
export async function checkKanjiUnlock(
  userId: string,
  kanjiId: number
): Promise<boolean> {
  const kanji = await prisma.kanji.findUnique({
    where: { id: kanjiId },
    include: { radicals: true },
  });

  if (!kanji || kanji.radicals.length === 0) return true;

  const radicalIds = kanji.radicals.map((kr) => kr.radicalId);

  const radicalProgress = await prisma.userRadicalProgress.findMany({
    where: {
      userId,
      radicalId: { in: radicalIds },
    },
  });

  // All radicals must be at Guru or higher
  return radicalProgress.every((rp) => rp.srsStage >= GURU_THRESHOLD);
}

// Check if vocabulary should be unlocked (all kanji at Guru+)
export async function checkVocabularyUnlock(
  userId: string,
  vocabularyId: number
): Promise<boolean> {
  const vocabulary = await prisma.vocabulary.findUnique({
    where: { id: vocabularyId },
    include: { kanji: true },
  });

  if (!vocabulary || vocabulary.kanji.length === 0) return true;

  const kanjiIds = vocabulary.kanji.map((vk) => vk.kanjiId);

  const kanjiProgress = await prisma.userKanjiProgress.findMany({
    where: {
      userId,
      kanjiId: { in: kanjiIds },
    },
  });

  // All kanji must be at Guru or higher
  return kanjiProgress.every((kp) => kp.srsStage >= GURU_THRESHOLD);
}

// Check if user should level up (90% of current level kanji at Guru+)
export async function checkLevelUp(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return false;

  const levelKanji = await prisma.kanji.findMany({
    where: { levelId: user.currentLevel },
  });

  if (levelKanji.length === 0) return false;

  const kanjiProgress = await prisma.userKanjiProgress.findMany({
    where: {
      userId,
      kanjiId: { in: levelKanji.map((k) => k.id) },
    },
  });

  const guruCount = kanjiProgress.filter(
    (kp) => kp.srsStage >= GURU_THRESHOLD
  ).length;
  const percentage = guruCount / levelKanji.length;

  return percentage >= LEVEL_UP_PERCENTAGE;
}

// Unlock all available items for a user (optimized with batch operations)
export async function unlockAvailableItems(userId: string): Promise<{
  radicals: number;
  kanji: number;
  vocabulary: number;
  grammar: number;
}> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { radicals: 0, kanji: 0, vocabulary: 0, grammar: 0 };

  const now = new Date();

  // Fetch all data in parallel
  const [levelRadicals, levelKanji, levelVocabulary, levelGrammar, existingRadicalProgress, existingKanjiProgress, existingVocabProgress, existingGrammarProgress, allRadicalProgress] = await Promise.all([
    prisma.radical.findMany({ where: { levelId: user.currentLevel } }),
    prisma.kanji.findMany({ where: { levelId: user.currentLevel }, include: { radicals: true } }),
    prisma.vocabulary.findMany({ where: { levelId: user.currentLevel }, include: { kanji: true } }),
    prisma.grammarPoint.findMany({ where: { levelId: user.currentLevel } }),
    prisma.userRadicalProgress.findMany({ where: { userId } }),
    prisma.userKanjiProgress.findMany({ where: { userId } }),
    prisma.userVocabularyProgress.findMany({ where: { userId } }),
    prisma.userGrammarProgress.findMany({ where: { userId } }),
    prisma.userRadicalProgress.findMany({ where: { userId } }), // For checking guru status
  ]);

  // Create sets for fast lookup
  const existingRadicalIds = new Set(existingRadicalProgress.map(p => p.radicalId));
  const existingKanjiIds = new Set(existingKanjiProgress.map(p => p.kanjiId));
  const existingVocabIds = new Set(existingVocabProgress.map(p => p.vocabularyId));
  const existingGrammarIds = new Set(existingGrammarProgress.map(p => p.grammarId));

  // Map for radical progress lookup
  const radicalProgressMap = new Map<number, number>(allRadicalProgress.map(p => [p.radicalId, p.srsStage]));
  const kanjiProgressMap = new Map<number, number>(existingKanjiProgress.map(p => [p.kanjiId, p.srsStage]));

  // Find radicals to unlock
  const radicalsToUnlock = levelRadicals
    .filter(r => !existingRadicalIds.has(r.id))
    .map(r => ({
      userId,
      radicalId: r.id,
      srsStage: SRS_STAGES.LOCKED,
      unlockedAt: now,
    }));

  // Find kanji to unlock (all radicals at Guru+)
  const kanjiToUnlock = levelKanji
    .filter(k => {
      if (existingKanjiIds.has(k.id)) return false;
      if (k.radicals.length === 0) return true;
      return k.radicals.every(kr => (radicalProgressMap.get(kr.radicalId) ?? 0) >= GURU_THRESHOLD);
    })
    .map(k => ({
      userId,
      kanjiId: k.id,
      srsStage: SRS_STAGES.LOCKED,
      unlockedAt: now,
    }));

  // Find vocabulary to unlock (all kanji at Guru+)
  const vocabToUnlock = levelVocabulary
    .filter(v => {
      if (existingVocabIds.has(v.id)) return false;
      if (v.kanji.length === 0) return true;
      return v.kanji.every(vk => (kanjiProgressMap.get(vk.kanjiId) ?? 0) >= GURU_THRESHOLD);
    })
    .map(v => ({
      userId,
      vocabularyId: v.id,
      srsStage: SRS_STAGES.LOCKED,
      unlockedAt: now,
    }));

  // Find grammar to unlock (unlocks immediately when user reaches the level, same as radicals)
  const grammarToUnlock = levelGrammar
    .filter(g => !existingGrammarIds.has(g.id))
    .map(g => ({
      userId,
      grammarId: g.id,
      srsStage: SRS_STAGES.LOCKED,
      unlockedAt: now,
    }));

  // Batch create all unlocks
  await Promise.all([
    radicalsToUnlock.length > 0 ? prisma.userRadicalProgress.createMany({ data: radicalsToUnlock, skipDuplicates: true }) : Promise.resolve(),
    kanjiToUnlock.length > 0 ? prisma.userKanjiProgress.createMany({ data: kanjiToUnlock, skipDuplicates: true }) : Promise.resolve(),
    vocabToUnlock.length > 0 ? prisma.userVocabularyProgress.createMany({ data: vocabToUnlock, skipDuplicates: true }) : Promise.resolve(),
    grammarToUnlock.length > 0 ? prisma.userGrammarProgress.createMany({ data: grammarToUnlock, skipDuplicates: true }) : Promise.resolve(),
  ]);

  return {
    radicals: radicalsToUnlock.length,
    kanji: kanjiToUnlock.length,
    vocabulary: vocabToUnlock.length,
    grammar: grammarToUnlock.length,
  };
}

// Level up user if eligible
export async function levelUpUser(userId: string): Promise<boolean> {
  const shouldLevelUp = await checkLevelUp(userId);

  if (shouldLevelUp) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { currentLevel: { increment: 1 } },
    });

    // Unlock items for new level
    await unlockAvailableItems(userId);

    // Send level-up email (fire and forget)
    sendLevelUpNotification(user.id, user.currentLevel).catch((err) =>
      console.error("Level up email error:", err)
    );

    return true;
  }

  return false;
}

// Send level-up email notification
async function sendLevelUpNotification(
  userId: string,
  newLevel: number
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      username: true,
      emailNotificationsEnabled: true,
      notifyLevelUp: true,
      unsubscribeToken: true,
    },
  });

  if (!user) return;
  if (!user.emailNotificationsEnabled || !user.notifyLevelUp) return;

  // Generate unsubscribe token if not exists
  let unsubscribeToken = user.unsubscribeToken;
  if (!unsubscribeToken) {
    unsubscribeToken = crypto.randomBytes(32).toString("hex");
    await prisma.user.update({
      where: { id: userId },
      data: { unsubscribeToken },
    });
  }

  const result = await sendLevelUpEmail(
    user.email,
    user.username,
    newLevel,
    unsubscribeToken
  );

  // Log the notification
  await prisma.notificationLog.create({
    data: {
      userId,
      type: "level_up",
      success: result.success,
      error: result.error,
      metadata: { newLevel },
    },
  });
}
