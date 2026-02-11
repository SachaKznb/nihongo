import { prisma } from "./db";
import { SRS_STAGES } from "./srs";

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

// Unlock all available items for a user
export async function unlockAvailableItems(userId: string): Promise<{
  radicals: number;
  kanji: number;
  vocabulary: number;
}> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { radicals: 0, kanji: 0, vocabulary: 0 };

  let unlockedRadicals = 0;
  let unlockedKanji = 0;
  let unlockedVocabulary = 0;

  // Unlock radicals for current level
  const levelRadicals = await prisma.radical.findMany({
    where: { levelId: user.currentLevel },
  });

  for (const radical of levelRadicals) {
    const existing = await prisma.userRadicalProgress.findUnique({
      where: { userId_radicalId: { userId, radicalId: radical.id } },
    });

    if (!existing) {
      await prisma.userRadicalProgress.create({
        data: {
          userId,
          radicalId: radical.id,
          srsStage: SRS_STAGES.LOCKED,
          unlockedAt: new Date(),
        },
      });
      unlockedRadicals++;
    }
  }

  // Unlock kanji where all radicals are at Guru+
  const levelKanji = await prisma.kanji.findMany({
    where: { levelId: user.currentLevel },
  });

  for (const kanji of levelKanji) {
    const existing = await prisma.userKanjiProgress.findUnique({
      where: { userId_kanjiId: { userId, kanjiId: kanji.id } },
    });

    if (!existing && (await checkKanjiUnlock(userId, kanji.id))) {
      await prisma.userKanjiProgress.create({
        data: {
          userId,
          kanjiId: kanji.id,
          srsStage: SRS_STAGES.LOCKED,
          unlockedAt: new Date(),
        },
      });
      unlockedKanji++;
    }
  }

  // Unlock vocabulary where all kanji are at Guru+
  const levelVocabulary = await prisma.vocabulary.findMany({
    where: { levelId: user.currentLevel },
  });

  for (const vocab of levelVocabulary) {
    const existing = await prisma.userVocabularyProgress.findUnique({
      where: { userId_vocabularyId: { userId, vocabularyId: vocab.id } },
    });

    if (!existing && (await checkVocabularyUnlock(userId, vocab.id))) {
      await prisma.userVocabularyProgress.create({
        data: {
          userId,
          vocabularyId: vocab.id,
          srsStage: SRS_STAGES.LOCKED,
          unlockedAt: new Date(),
        },
      });
      unlockedVocabulary++;
    }
  }

  return {
    radicals: unlockedRadicals,
    kanji: unlockedKanji,
    vocabulary: unlockedVocabulary,
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

    return true;
  }

  return false;
}
