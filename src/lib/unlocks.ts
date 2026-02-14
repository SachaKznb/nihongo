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

// Unlock items in batches - only unlocks enough to fill up to user's lessonsPerDay
// This prevents overwhelming users with 100+ lessons at once
export async function unlockAvailableItems(userId: string): Promise<{
  radicals: number;
  kanji: number;
  vocabulary: number;
  grammar: number;
}> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { radicals: 0, kanji: 0, vocabulary: 0, grammar: 0 };

  const now = new Date();
  const batchSize = user.lessonsPerDay; // Only unlock up to this many items

  // Fetch all data in parallel
  const [levelRadicals, levelKanji, levelVocabulary, levelGrammar, existingRadicalProgress, existingKanjiProgress, existingVocabProgress, existingGrammarProgress] = await Promise.all([
    prisma.radical.findMany({ where: { levelId: user.currentLevel }, orderBy: { id: 'asc' } }),
    prisma.kanji.findMany({ where: { levelId: user.currentLevel }, include: { radicals: true }, orderBy: { id: 'asc' } }),
    prisma.vocabulary.findMany({ where: { levelId: user.currentLevel }, include: { kanji: true }, orderBy: { id: 'asc' } }),
    prisma.grammarPoint.findMany({ where: { levelId: user.currentLevel }, orderBy: { id: 'asc' } }),
    prisma.userRadicalProgress.findMany({ where: { userId } }),
    prisma.userKanjiProgress.findMany({ where: { userId } }),
    prisma.userVocabularyProgress.findMany({ where: { userId } }),
    prisma.userGrammarProgress.findMany({ where: { userId } }),
  ]);

  // Create sets and maps for fast lookup
  const existingRadicalIds = new Set(existingRadicalProgress.map(p => p.radicalId));
  const existingKanjiIds = new Set(existingKanjiProgress.map(p => p.kanjiId));
  const existingVocabIds = new Set(existingVocabProgress.map(p => p.vocabularyId));
  const existingGrammarIds = new Set(existingGrammarProgress.map(p => p.grammarId));

  const radicalProgressMap = new Map<number, number>(existingRadicalProgress.map(p => [p.radicalId, p.srsStage]));
  const kanjiProgressMap = new Map<number, number>(existingKanjiProgress.map(p => [p.kanjiId, p.srsStage]));

  // Count currently pending lessons (stage 0 = LOCKED but unlocked)
  const currentPendingLessons =
    existingRadicalProgress.filter(p => p.srsStage === SRS_STAGES.LOCKED).length +
    existingKanjiProgress.filter(p => p.srsStage === SRS_STAGES.LOCKED).length +
    existingVocabProgress.filter(p => p.srsStage === SRS_STAGES.LOCKED).length +
    existingGrammarProgress.filter(p => p.srsStage === SRS_STAGES.LOCKED).length;

  // Calculate how many new items we can unlock
  let remainingSlots = Math.max(0, batchSize - currentPendingLessons);

  // If user already has enough pending lessons, don't unlock more
  if (remainingSlots === 0) {
    return { radicals: 0, kanji: 0, vocabulary: 0, grammar: 0 };
  }

  // Priority order: Radicals -> Kanji (if radicals guru) -> Vocab (if kanji guru) -> Grammar
  const radicalsToUnlock: { userId: string; radicalId: number; srsStage: number; unlockedAt: Date }[] = [];
  const kanjiToUnlock: { userId: string; kanjiId: number; srsStage: number; unlockedAt: Date }[] = [];
  const vocabToUnlock: { userId: string; vocabularyId: number; srsStage: number; unlockedAt: Date }[] = [];
  const grammarToUnlock: { userId: string; grammarId: number; srsStage: number; unlockedAt: Date }[] = [];

  // 1. Unlock radicals first (up to remaining slots)
  for (const r of levelRadicals) {
    if (remainingSlots <= 0) break;
    if (!existingRadicalIds.has(r.id)) {
      radicalsToUnlock.push({
        userId,
        radicalId: r.id,
        srsStage: SRS_STAGES.LOCKED,
        unlockedAt: now,
      });
      remainingSlots--;
    }
  }

  // 2. Unlock kanji (only if all their radicals are at Guru+)
  for (const k of levelKanji) {
    if (remainingSlots <= 0) break;
    if (existingKanjiIds.has(k.id)) continue;

    // Check if all radicals are at Guru+
    const canUnlock = k.radicals.length === 0 ||
      k.radicals.every(kr => (radicalProgressMap.get(kr.radicalId) ?? 0) >= GURU_THRESHOLD);

    if (canUnlock) {
      kanjiToUnlock.push({
        userId,
        kanjiId: k.id,
        srsStage: SRS_STAGES.LOCKED,
        unlockedAt: now,
      });
      remainingSlots--;
    }
  }

  // 3. Unlock vocabulary (only if all their kanji are at Guru+)
  for (const v of levelVocabulary) {
    if (remainingSlots <= 0) break;
    if (existingVocabIds.has(v.id)) continue;

    // Check if all kanji are at Guru+
    const canUnlock = v.kanji.length === 0 ||
      v.kanji.every(vk => (kanjiProgressMap.get(vk.kanjiId) ?? 0) >= GURU_THRESHOLD);

    if (canUnlock) {
      vocabToUnlock.push({
        userId,
        vocabularyId: v.id,
        srsStage: SRS_STAGES.LOCKED,
        unlockedAt: now,
      });
      remainingSlots--;
    }
  }

  // 4. Unlock grammar (unlocks like radicals, no prerequisites)
  for (const g of levelGrammar) {
    if (remainingSlots <= 0) break;
    if (!existingGrammarIds.has(g.id)) {
      grammarToUnlock.push({
        userId,
        grammarId: g.id,
        srsStage: SRS_STAGES.LOCKED,
        unlockedAt: now,
      });
      remainingSlots--;
    }
  }

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

// Clean up excess unlocked items (re-lock items that haven't been started yet)
// Use this to fix users who have too many pending lessons
export async function cleanupExcessUnlocks(userId: string, keepCount: number = 20): Promise<{
  radicals: number;
  kanji: number;
  vocabulary: number;
}> {
  // Find all LOCKED (stage 0) items - these are unlocked but not started
  const [radicals, kanji, vocab] = await Promise.all([
    prisma.userRadicalProgress.findMany({
      where: { userId, srsStage: SRS_STAGES.LOCKED },
      orderBy: { unlockedAt: 'asc' }, // Keep oldest first
    }),
    prisma.userKanjiProgress.findMany({
      where: { userId, srsStage: SRS_STAGES.LOCKED },
      orderBy: { unlockedAt: 'asc' },
    }),
    prisma.userVocabularyProgress.findMany({
      where: { userId, srsStage: SRS_STAGES.LOCKED },
      orderBy: { unlockedAt: 'asc' },
    }),
  ]);

  // Calculate how many to keep vs remove
  const totalLocked = radicals.length + kanji.length + vocab.length;
  if (totalLocked <= keepCount) {
    return { radicals: 0, kanji: 0, vocabulary: 0 };
  }

  // Keep the first `keepCount` items (oldest unlocked first)
  // Priority: radicals -> kanji -> vocab (keep radicals, remove vocab first)
  let toKeep = keepCount;

  const radicalsToKeep = radicals.slice(0, toKeep);
  toKeep = Math.max(0, toKeep - radicals.length);

  const kanjiToKeep = kanji.slice(0, toKeep);
  toKeep = Math.max(0, toKeep - kanji.length);

  const vocabToKeep = vocab.slice(0, toKeep);

  // Delete excess items
  const radicalsToDelete = radicals.slice(radicalsToKeep.length);
  const kanjiToDelete = kanji.slice(kanjiToKeep.length);
  const vocabToDelete = vocab.slice(vocabToKeep.length);

  await Promise.all([
    radicalsToDelete.length > 0 ? prisma.userRadicalProgress.deleteMany({
      where: { userId, radicalId: { in: radicalsToDelete.map(r => r.radicalId) }, srsStage: SRS_STAGES.LOCKED }
    }) : Promise.resolve(),
    kanjiToDelete.length > 0 ? prisma.userKanjiProgress.deleteMany({
      where: { userId, kanjiId: { in: kanjiToDelete.map(k => k.kanjiId) }, srsStage: SRS_STAGES.LOCKED }
    }) : Promise.resolve(),
    vocabToDelete.length > 0 ? prisma.userVocabularyProgress.deleteMany({
      where: { userId, vocabularyId: { in: vocabToDelete.map(v => v.vocabularyId) }, srsStage: SRS_STAGES.LOCKED }
    }) : Promise.resolve(),
  ]);

  return {
    radicals: radicalsToDelete.length,
    kanji: kanjiToDelete.length,
    vocabulary: vocabToDelete.length,
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
