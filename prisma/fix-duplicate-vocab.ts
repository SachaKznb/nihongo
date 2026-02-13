import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DuplicateGroup {
  word: string;
  entries: {
    id: number;
    word: string;
    levelId: number;
    meaningsFr: string[];
    readings: string[];
  }[];
}

async function main() {
  console.log("=".repeat(60));
  console.log("FIXING DUPLICATE VOCABULARY ENTRIES");
  console.log("=".repeat(60));
  console.log("");

  // Step 1: Find all duplicate vocabulary (same word appearing multiple times)
  console.log("Step 1: Finding duplicate vocabulary entries...");

  const allVocab = await prisma.vocabulary.findMany({
    select: {
      id: true,
      word: true,
      levelId: true,
      meaningsFr: true,
      readings: true,
    },
    orderBy: [
      { word: "asc" },
      { levelId: "asc" },
    ],
  });

  // Group by word
  const vocabByWord = new Map<string, typeof allVocab>();
  for (const vocab of allVocab) {
    const existing = vocabByWord.get(vocab.word) || [];
    existing.push(vocab);
    vocabByWord.set(vocab.word, existing);
  }

  // Find duplicates (words that appear more than once)
  const duplicates: DuplicateGroup[] = [];
  for (const [word, entries] of vocabByWord) {
    if (entries.length > 1) {
      duplicates.push({ word, entries });
    }
  }

  console.log(`Found ${duplicates.length} vocabulary words with duplicates`);
  console.log("");

  if (duplicates.length === 0) {
    console.log("No duplicates found. Exiting.");
    return;
  }

  // Show some examples
  console.log("Examples of duplicates:");
  for (const dup of duplicates.slice(0, 10)) {
    const levels = dup.entries.map(e => e.levelId).join(", ");
    console.log(`  - ${dup.word}: levels [${levels}]`);
  }
  if (duplicates.length > 10) {
    console.log(`  ... and ${duplicates.length - 10} more`);
  }
  console.log("");

  // Step 2: Process each duplicate group
  console.log("Step 2: Processing duplicates (keeping lowest level entry)...");
  console.log("");

  let totalDeleted = 0;
  let totalProgressMerged = 0;
  let totalKanjiLinksDeleted = 0;
  let totalSentenceCacheDeleted = 0;

  for (const dup of duplicates) {
    // Sort by levelId to get the entry to keep (lowest level)
    const sorted = [...dup.entries].sort((a, b) => a.levelId - b.levelId);
    const keepEntry = sorted[0];
    const deleteEntries = sorted.slice(1);

    console.log(`Processing "${dup.word}":`);
    console.log(`  Keeping: id=${keepEntry.id}, level=${keepEntry.levelId}`);
    console.log(`  Deleting: ${deleteEntries.map(e => `id=${e.id} (level ${e.levelId})`).join(", ")}`);

    for (const deleteEntry of deleteEntries) {
      // Step 2a: Handle UserVocabularyProgress records
      // Find all progress records for the entry being deleted
      const progressToDelete = await prisma.userVocabularyProgress.findMany({
        where: { vocabularyId: deleteEntry.id },
      });

      if (progressToDelete.length > 0) {
        console.log(`  Found ${progressToDelete.length} progress records for id=${deleteEntry.id}`);

        for (const progress of progressToDelete) {
          // Check if user already has progress for the kept entry
          const existingProgress = await prisma.userVocabularyProgress.findUnique({
            where: {
              userId_vocabularyId: {
                userId: progress.userId,
                vocabularyId: keepEntry.id,
              },
            },
          });

          if (existingProgress) {
            // User has progress on both - keep the one with higher SRS stage
            // or merge stats if same stage
            if (progress.srsStage > existingProgress.srsStage) {
              // Update the kept entry with the higher progress
              await prisma.userVocabularyProgress.update({
                where: {
                  userId_vocabularyId: {
                    userId: progress.userId,
                    vocabularyId: keepEntry.id,
                  },
                },
                data: {
                  srsStage: progress.srsStage,
                  unlockedAt: progress.unlockedAt && existingProgress.unlockedAt
                    ? (progress.unlockedAt < existingProgress.unlockedAt ? progress.unlockedAt : existingProgress.unlockedAt)
                    : progress.unlockedAt || existingProgress.unlockedAt,
                  nextReviewAt: progress.nextReviewAt,
                  meaningCorrect: existingProgress.meaningCorrect + progress.meaningCorrect,
                  meaningIncorrect: existingProgress.meaningIncorrect + progress.meaningIncorrect,
                  readingCorrect: existingProgress.readingCorrect + progress.readingCorrect,
                  readingIncorrect: existingProgress.readingIncorrect + progress.readingIncorrect,
                  customMnemonic: progress.customMnemonic || existingProgress.customMnemonic,
                },
              });
              console.log(`    Merged progress for user ${progress.userId} (kept higher SRS stage ${progress.srsStage})`);
            } else {
              // Keep existing, just merge stats
              await prisma.userVocabularyProgress.update({
                where: {
                  userId_vocabularyId: {
                    userId: progress.userId,
                    vocabularyId: keepEntry.id,
                  },
                },
                data: {
                  meaningCorrect: existingProgress.meaningCorrect + progress.meaningCorrect,
                  meaningIncorrect: existingProgress.meaningIncorrect + progress.meaningIncorrect,
                  readingCorrect: existingProgress.readingCorrect + progress.readingCorrect,
                  readingIncorrect: existingProgress.readingIncorrect + progress.readingIncorrect,
                },
              });
              console.log(`    Merged stats for user ${progress.userId} (kept existing SRS stage ${existingProgress.srsStage})`);
            }
            // Delete the duplicate progress record
            await prisma.userVocabularyProgress.delete({
              where: {
                userId_vocabularyId: {
                  userId: progress.userId,
                  vocabularyId: deleteEntry.id,
                },
              },
            });
          } else {
            // User doesn't have progress on kept entry - transfer this progress
            await prisma.userVocabularyProgress.update({
              where: {
                userId_vocabularyId: {
                  userId: progress.userId,
                  vocabularyId: deleteEntry.id,
                },
              },
              data: {
                vocabularyId: keepEntry.id,
              },
            });
            console.log(`    Transferred progress for user ${progress.userId} to kept entry`);
          }
          totalProgressMerged++;
        }
      }

      // Step 2b: Handle UserSentenceCache records
      const sentenceCaches = await prisma.userSentenceCache.findMany({
        where: { vocabularyId: deleteEntry.id },
      });

      if (sentenceCaches.length > 0) {
        console.log(`  Deleting ${sentenceCaches.length} sentence cache records for id=${deleteEntry.id}`);
        await prisma.userSentenceCache.deleteMany({
          where: { vocabularyId: deleteEntry.id },
        });
        totalSentenceCacheDeleted += sentenceCaches.length;
      }

      // Step 2c: Delete VocabularyKanji links for the entry being deleted
      const kanjiLinks = await prisma.vocabularyKanji.findMany({
        where: { vocabularyId: deleteEntry.id },
      });

      if (kanjiLinks.length > 0) {
        console.log(`  Deleting ${kanjiLinks.length} kanji links for id=${deleteEntry.id}`);
        await prisma.vocabularyKanji.deleteMany({
          where: { vocabularyId: deleteEntry.id },
        });
        totalKanjiLinksDeleted += kanjiLinks.length;
      }

      // Step 2d: Delete the duplicate vocabulary entry
      await prisma.vocabulary.delete({
        where: { id: deleteEntry.id },
      });
      console.log(`  Deleted vocabulary id=${deleteEntry.id}`);
      totalDeleted++;
    }
    console.log("");
  }

  // Summary
  console.log("=".repeat(60));
  console.log("SUMMARY");
  console.log("=".repeat(60));
  console.log(`Duplicate words found: ${duplicates.length}`);
  console.log(`Vocabulary entries deleted: ${totalDeleted}`);
  console.log(`Progress records merged/transferred: ${totalProgressMerged}`);
  console.log(`Sentence cache records deleted: ${totalSentenceCacheDeleted}`);
  console.log(`Kanji links deleted: ${totalKanjiLinksDeleted}`);
  console.log("");

  // Verify no more duplicates
  const remainingDuplicates = await prisma.$queryRaw<{word: string; count: bigint}[]>`
    SELECT word, COUNT(*) as count
    FROM "Vocabulary"
    GROUP BY word
    HAVING COUNT(*) > 1
  `;

  if (remainingDuplicates.length === 0) {
    console.log("SUCCESS: No more duplicate vocabulary entries!");
  } else {
    console.log(`WARNING: Still have ${remainingDuplicates.length} words with duplicates`);
  }
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
