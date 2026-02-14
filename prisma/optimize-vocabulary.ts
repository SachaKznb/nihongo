import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Target: 3-4 vocab per kanji = ~6000-8000 vocab for 2000 kanji
// But we'll cap at 5 per kanji and prioritize quality

async function main() {
  console.log("=== VOCABULARY OPTIMIZATION ===\n");
  console.log("Goal: Create the most effective learning experience\n");

  // Step 1: Get all kanji characters in our system
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiChars = new Set(allKanji.map(k => k.character));
  const kanjiMap = new Map(allKanji.map(k => [k.character, k]));

  console.log(`Kanji in system: ${kanjiChars.size}`);

  // Step 2: Get all vocabulary
  const allVocab = await prisma.vocabulary.findMany({
    include: { kanji: true }
  });
  console.log(`Starting vocabulary: ${allVocab.length}`);

  // Step 3: Analyze each vocabulary word
  interface VocabAnalysis {
    id: number;
    word: string;
    levelId: number;
    meaningsFr: string[];
    readings: string[];
    mnemonicFr: string;
    kanjiInWord: string[];
    missingKanji: string[];
    isKanaOnly: boolean;
    isDuplicate: boolean;
    quality: number; // 0-100
  }

  const analyses: VocabAnalysis[] = [];
  const wordsSeen = new Map<string, number>(); // word -> first vocab id

  for (const vocab of allVocab) {
    // Extract kanji from the word
    const kanjiInWord = vocab.word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
    const uniqueKanjiInWord = [...new Set(kanjiInWord)];
    const missingKanji = uniqueKanjiInWord.filter(k => !kanjiChars.has(k));
    const isKanaOnly = uniqueKanjiInWord.length === 0;

    // Check for duplicates
    const isDuplicate = wordsSeen.has(vocab.word);
    if (!isDuplicate) {
      wordsSeen.set(vocab.word, vocab.id);
    }

    // Calculate quality score
    let quality = 100;

    // Penalize missing kanji heavily
    if (missingKanji.length > 0) {
      quality -= missingKanji.length * 30;
    }

    // Penalize duplicates
    if (isDuplicate) {
      quality -= 50;
    }

    // Slight penalty for kana-only (still useful but less for kanji learning)
    if (isKanaOnly) {
      quality -= 10;
    }

    // Bonus for having good mnemonic
    if (vocab.mnemonicFr && vocab.mnemonicFr.length > 20) {
      quality += 5;
    }

    // Bonus for having multiple meanings (more useful word)
    if (vocab.meaningsFr.length > 1) {
      quality += 5;
    }

    analyses.push({
      id: vocab.id,
      word: vocab.word,
      levelId: vocab.levelId,
      meaningsFr: vocab.meaningsFr,
      readings: vocab.readings,
      mnemonicFr: vocab.mnemonicFr,
      kanjiInWord: uniqueKanjiInWord,
      missingKanji,
      isKanaOnly,
      isDuplicate,
      quality: Math.max(0, Math.min(100, quality)),
    });
  }

  // Step 4: Categorize vocabulary
  const toDelete: number[] = [];
  const toKeep: VocabAnalysis[] = [];

  for (const analysis of analyses) {
    // Delete if:
    // 1. Uses kanji not in our system (can't learn it properly)
    // 2. Is a duplicate (keep the first one seen)
    if (analysis.missingKanji.length > 0) {
      toDelete.push(analysis.id);
    } else if (analysis.isDuplicate) {
      toDelete.push(analysis.id);
    } else {
      toKeep.push(analysis);
    }
  }

  console.log(`\nVocabulary to delete: ${toDelete.length}`);
  console.log(`  - Using missing kanji: ${analyses.filter(a => a.missingKanji.length > 0).length}`);
  console.log(`  - Duplicates: ${analyses.filter(a => a.isDuplicate).length}`);
  console.log(`Vocabulary to keep: ${toKeep.length}`);

  // Step 5: Delete bad vocabulary
  console.log(`\nStep 5: Deleting low-quality vocabulary...`);

  // First delete kanji links
  await prisma.vocabularyKanji.deleteMany({
    where: { vocabularyId: { in: toDelete } }
  });

  // Then delete user progress for these vocab
  await prisma.userVocabularyProgress.deleteMany({
    where: { vocabularyId: { in: toDelete } }
  });

  // Then delete the vocabulary
  await prisma.vocabulary.deleteMany({
    where: { id: { in: toDelete } }
  });

  console.log(`  Deleted ${toDelete.length} vocabulary items`);

  // Step 6: Rebuild kanji-vocabulary links for remaining vocab
  console.log(`\nStep 6: Rebuilding kanji-vocabulary links...`);

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
        }).catch(() => {}); // Ignore duplicates
        linksCreated++;
      }
    }
  }
  console.log(`  Created ${linksCreated} kanji-vocabulary links`);

  // Step 7: Cap vocabulary per kanji (keep best quality)
  console.log(`\nStep 7: Capping vocabulary per kanji...`);

  const MAX_VOCAB_PER_KANJI = 5;

  const kanjiWithVocab = await prisma.kanji.findMany({
    include: {
      vocabulary: {
        include: { vocabulary: true }
      }
    }
  });

  let excessDeleted = 0;
  for (const kanji of kanjiWithVocab) {
    if (kanji.vocabulary.length > MAX_VOCAB_PER_KANJI) {
      // Sort by:
      // 1. Has good mnemonic (longer)
      // 2. Word length (shorter words are more common)
      // 3. Level (earlier levels first)
      const sorted = kanji.vocabulary.sort((a, b) => {
        const aScore = (a.vocabulary.mnemonicFr?.length || 0) - a.vocabulary.word.length * 5;
        const bScore = (b.vocabulary.mnemonicFr?.length || 0) - b.vocabulary.word.length * 5;
        if (bScore !== aScore) return bScore - aScore;
        return a.vocabulary.levelId - b.vocabulary.levelId;
      });

      // Keep top N, delete the rest
      const toRemove = sorted.slice(MAX_VOCAB_PER_KANJI);
      for (const vk of toRemove) {
        // Delete link
        await prisma.vocabularyKanji.delete({
          where: { vocabularyId_kanjiId: { vocabularyId: vk.vocabularyId, kanjiId: kanji.id } }
        }).catch(() => {});

        // Check if this vocab has other kanji links
        const otherLinks = await prisma.vocabularyKanji.count({
          where: { vocabularyId: vk.vocabularyId }
        });

        // If no other links and word only uses this kanji, delete the vocab
        if (otherLinks === 0) {
          await prisma.userVocabularyProgress.deleteMany({
            where: { vocabularyId: vk.vocabularyId }
          });
          await prisma.vocabulary.delete({
            where: { id: vk.vocabularyId }
          }).catch(() => {});
          excessDeleted++;
        }
      }
    }
  }
  console.log(`  Removed ${excessDeleted} excess vocabulary items`);

  // Step 8: Final count and verification
  console.log(`\n=== FINAL RESULTS ===\n`);

  const finalVocab = await prisma.vocabulary.count();
  const finalKanjiWithVocab = await prisma.kanji.findMany({
    include: { vocabulary: true }
  });

  const vocabCounts = finalKanjiWithVocab.map(k => k.vocabulary.length);
  const avgVocab = vocabCounts.reduce((a, b) => a + b, 0) / vocabCounts.length;
  const zeroVocab = vocabCounts.filter(v => v === 0).length;

  console.log(`Final vocabulary count: ${finalVocab}`);
  console.log(`Average vocab per kanji: ${avgVocab.toFixed(1)}`);
  console.log(`Kanji with 0 vocab: ${zeroVocab}`);
  console.log(`\nDistribution:`);
  console.log(`  0 vocab: ${vocabCounts.filter(v => v === 0).length}`);
  console.log(`  1 vocab: ${vocabCounts.filter(v => v === 1).length}`);
  console.log(`  2-3 vocab: ${vocabCounts.filter(v => v >= 2 && v <= 3).length}`);
  console.log(`  4-5 vocab: ${vocabCounts.filter(v => v >= 4 && v <= 5).length}`);
  console.log(`  6+ vocab: ${vocabCounts.filter(v => v > 5).length}`);

  // Show kanji still missing vocab
  const missingVocabKanji = finalKanjiWithVocab.filter(k => k.vocabulary.length === 0);
  if (missingVocabKanji.length > 0) {
    console.log(`\nKanji still needing vocabulary (${missingVocabKanji.length}):`);
    console.log(missingVocabKanji.slice(0, 50).map(k => k.character).join(""));
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
