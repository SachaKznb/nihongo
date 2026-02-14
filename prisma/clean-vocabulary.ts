import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== CLEANING VOCABULARY ===\n");

  // Get all kanji
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiChars = new Set(allKanji.map(k => k.character));
  const kanjiMap = new Map(allKanji.map(k => [k.character, k]));

  // Get all vocabulary
  const allVocab = await prisma.vocabulary.findMany({
    include: { kanji: true }
  });
  console.log(`Starting vocabulary: ${allVocab.length}`);

  // Step 1: Identify vocabulary to delete
  const toDelete: number[] = [];
  const toKeep = new Map<string, number>(); // word -> vocab id to keep

  for (const vocab of allVocab) {
    // Check if this word uses any kanji NOT in our system
    const kanjiInWord = vocab.word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
    const missingKanji = kanjiInWord.filter(k => !kanjiChars.has(k));

    if (missingKanji.length > 0) {
      // Uses kanji not in system - delete
      toDelete.push(vocab.id);
      continue;
    }

    // Check for duplicates - keep the first one we see
    if (toKeep.has(vocab.word)) {
      toDelete.push(vocab.id);
    } else {
      toKeep.set(vocab.word, vocab.id);
    }
  }

  console.log(`Vocabulary to delete: ${toDelete.length}`);
  console.log(`Vocabulary to keep: ${toKeep.size}`);

  // Step 2: Delete vocabulary
  console.log("\nDeleting invalid/duplicate vocabulary...");

  // Delete in batches to avoid timeout
  const batchSize = 500;
  for (let i = 0; i < toDelete.length; i += batchSize) {
    const batch = toDelete.slice(i, i + batchSize);

    // Delete kanji links
    await prisma.vocabularyKanji.deleteMany({
      where: { vocabularyId: { in: batch } }
    });

    // Delete user progress
    await prisma.userVocabularyProgress.deleteMany({
      where: { vocabularyId: { in: batch } }
    });

    // Delete sentence cache
    await prisma.userSentenceCache.deleteMany({
      where: { vocabularyId: { in: batch } }
    });

    // Delete vocabulary
    await prisma.vocabulary.deleteMany({
      where: { id: { in: batch } }
    });

    console.log(`  Deleted batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(toDelete.length/batchSize)}`);
  }

  // Step 3: Rebuild kanji links
  console.log("\nRebuilding kanji-vocabulary links...");

  // Clear all existing links
  await prisma.vocabularyKanji.deleteMany({});

  // Get remaining vocabulary
  const remainingVocab = await prisma.vocabulary.findMany();

  let linksCreated = 0;
  for (const vocab of remainingVocab) {
    const kanjiInWord = vocab.word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
    const uniqueKanji = [...new Set(kanjiInWord)];

    for (const char of uniqueKanji) {
      const kanji = kanjiMap.get(char);
      if (kanji) {
        await prisma.vocabularyKanji.create({
          data: { vocabularyId: vocab.id, kanjiId: kanji.id }
        }).catch(() => {});
        linksCreated++;
      }
    }
  }
  console.log(`Created ${linksCreated} kanji-vocabulary links`);

  // Step 4: Final stats
  const finalVocab = await prisma.vocabulary.count();
  const kanjiWithVocab = await prisma.kanji.count({
    where: { vocabulary: { some: {} } }
  });

  console.log(`\n=== FINAL STATS ===`);
  console.log(`Vocabulary: ${finalVocab}`);
  console.log(`Kanji: ${allKanji.length}`);
  console.log(`Ratio: ${(finalVocab/allKanji.length).toFixed(2)} vocab per kanji`);
  console.log(`Kanji with vocabulary: ${kanjiWithVocab}/${allKanji.length}`);

  // Check distribution
  const kanjiVocabCounts = await prisma.kanji.findMany({
    include: { _count: { select: { vocabulary: true } } }
  });
  const counts = kanjiVocabCounts.map(k => k._count.vocabulary);
  console.log(`\nVocab per kanji distribution:`);
  console.log(`  0: ${counts.filter(c => c === 0).length}`);
  console.log(`  1: ${counts.filter(c => c === 1).length}`);
  console.log(`  2-3: ${counts.filter(c => c >= 2 && c <= 3).length}`);
  console.log(`  4-5: ${counts.filter(c => c >= 4 && c <= 5).length}`);
  console.log(`  6-10: ${counts.filter(c => c >= 6 && c <= 10).length}`);
  console.log(`  11+: ${counts.filter(c => c > 10).length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
