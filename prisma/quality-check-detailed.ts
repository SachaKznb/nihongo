import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("========================================");
  console.log("DETAILED QUALITY ANALYSIS");
  console.log("========================================\n");

  // ============================================
  // DETAILED BREAKDOWN OF ISSUES
  // ============================================

  // 1. Check for duplicate kanji across levels
  console.log("1. CHECKING FOR DUPLICATE KANJI");
  console.log("----------------------------------------");

  const allKanji = await prisma.kanji.findMany({
    orderBy: { levelId: "asc" },
  });

  const kanjiCharacterCount = new Map<string, { levels: number[]; count: number }>();
  for (const k of allKanji) {
    const existing = kanjiCharacterCount.get(k.character);
    if (existing) {
      existing.levels.push(k.levelId);
      existing.count++;
    } else {
      kanjiCharacterCount.set(k.character, { levels: [k.levelId], count: 1 });
    }
  }

  const duplicateKanji = [...kanjiCharacterCount.entries()].filter(([, data]) => data.count > 1);
  if (duplicateKanji.length > 0) {
    console.log(`Found ${duplicateKanji.length} kanji that appear in multiple levels:`);
    for (const [char, data] of duplicateKanji.slice(0, 30)) {
      console.log(`  - "${char}" appears in levels: ${data.levels.join(", ")}`);
    }
    if (duplicateKanji.length > 30) {
      console.log(`  ... and ${duplicateKanji.length - 30} more`);
    }
  } else {
    console.log("No duplicate kanji found across levels. Good!");
  }

  // 2. Check for duplicate vocabulary across levels
  console.log("\n\n2. CHECKING FOR DUPLICATE VOCABULARY");
  console.log("----------------------------------------");

  const allVocab = await prisma.vocabulary.findMany({
    orderBy: { levelId: "asc" },
  });

  const vocabWordCount = new Map<string, { levels: number[]; count: number }>();
  for (const v of allVocab) {
    const existing = vocabWordCount.get(v.word);
    if (existing) {
      existing.levels.push(v.levelId);
      existing.count++;
    } else {
      vocabWordCount.set(v.word, { levels: [v.levelId], count: 1 });
    }
  }

  const duplicateVocab = [...vocabWordCount.entries()].filter(([, data]) => data.count > 1);
  if (duplicateVocab.length > 0) {
    console.log(`Found ${duplicateVocab.length} vocabulary words that appear in multiple levels:`);
    for (const [word, data] of duplicateVocab.slice(0, 30)) {
      console.log(`  - "${word}" appears in levels: ${data.levels.join(", ")}`);
    }
    if (duplicateVocab.length > 30) {
      console.log(`  ... and ${duplicateVocab.length - 30} more`);
    }
  } else {
    console.log("No duplicate vocabulary found across levels. Good!");
  }

  // 3. Check for radicals without character (image-only)
  console.log("\n\n3. IMAGE-ONLY RADICALS");
  console.log("----------------------------------------");

  const imageOnlyRadicals = await prisma.radical.findMany({
    where: { character: null },
    orderBy: { levelId: "asc" },
  });

  console.log(`Found ${imageOnlyRadicals.length} image-only radicals (no character):`);
  for (const r of imageOnlyRadicals.slice(0, 20)) {
    console.log(`  - "${r.meaningFr}" (Level ${r.levelId}) - Image: ${r.imageUrl || "NO IMAGE URL"}`);
  }
  if (imageOnlyRadicals.length > 20) {
    console.log(`  ... and ${imageOnlyRadicals.length - 20} more`);
  }

  // Check for image radicals without imageUrl
  const imageRadicalsWithoutUrl = imageOnlyRadicals.filter(r => !r.imageUrl);
  if (imageRadicalsWithoutUrl.length > 0) {
    console.log(`\nWARNING: ${imageRadicalsWithoutUrl.length} image-only radicals are missing imageUrl!`);
  }

  // 4. Check for empty meanings/readings
  console.log("\n\n4. CHECKING FOR EMPTY CONTENT");
  console.log("----------------------------------------");

  const kanjiWithEmptyMeanings = allKanji.filter(k => k.meaningsFr.length === 0);
  const kanjiWithEmptyReadings = allKanji.filter(k => k.readingsOn.length === 0 && k.readingsKun.length === 0);
  const vocabWithEmptyMeanings = allVocab.filter(v => v.meaningsFr.length === 0);
  const vocabWithEmptyReadings = allVocab.filter(v => v.readings.length === 0);

  console.log(`Kanji with empty meanings: ${kanjiWithEmptyMeanings.length}`);
  if (kanjiWithEmptyMeanings.length > 0) {
    for (const k of kanjiWithEmptyMeanings.slice(0, 10)) {
      console.log(`  - "${k.character}" (Level ${k.levelId})`);
    }
  }

  console.log(`\nKanji with no readings (on or kun): ${kanjiWithEmptyReadings.length}`);
  if (kanjiWithEmptyReadings.length > 0) {
    for (const k of kanjiWithEmptyReadings.slice(0, 10)) {
      console.log(`  - "${k.character}" (Level ${k.levelId})`);
    }
  }

  console.log(`\nVocabulary with empty meanings: ${vocabWithEmptyMeanings.length}`);
  if (vocabWithEmptyMeanings.length > 0) {
    for (const v of vocabWithEmptyMeanings.slice(0, 10)) {
      console.log(`  - "${v.word}" (Level ${v.levelId})`);
    }
  }

  console.log(`\nVocabulary with empty readings: ${vocabWithEmptyReadings.length}`);
  if (vocabWithEmptyReadings.length > 0) {
    for (const v of vocabWithEmptyReadings.slice(0, 10)) {
      console.log(`  - "${v.word}" (Level ${v.levelId})`);
    }
  }

  // 5. Check mnemonic quality
  console.log("\n\n5. MNEMONIC QUALITY CHECK");
  console.log("----------------------------------------");

  const allRadicals = await prisma.radical.findMany();

  const radicalsWithShortMnemonic = allRadicals.filter(r => r.mnemonic.length < 20);
  const kanjiWithShortMeaningMnemonic = allKanji.filter(k => k.meaningMnemonicFr.length < 20);
  const kanjiWithShortReadingMnemonic = allKanji.filter(k => k.readingMnemonicFr.length < 20);

  console.log(`Radicals with very short mnemonics (<20 chars): ${radicalsWithShortMnemonic.length}`);
  if (radicalsWithShortMnemonic.length > 0) {
    for (const r of radicalsWithShortMnemonic.slice(0, 10)) {
      console.log(`  - "${r.character || r.meaningFr}" (L${r.levelId}): "${r.mnemonic}"`);
    }
  }

  console.log(`\nKanji with very short meaning mnemonics (<20 chars): ${kanjiWithShortMeaningMnemonic.length}`);
  if (kanjiWithShortMeaningMnemonic.length > 0) {
    for (const k of kanjiWithShortMeaningMnemonic.slice(0, 10)) {
      console.log(`  - "${k.character}" (L${k.levelId}): "${k.meaningMnemonicFr}"`);
    }
  }

  console.log(`\nKanji with very short reading mnemonics (<20 chars): ${kanjiWithShortReadingMnemonic.length}`);
  if (kanjiWithShortReadingMnemonic.length > 0) {
    for (const k of kanjiWithShortReadingMnemonic.slice(0, 10)) {
      console.log(`  - "${k.character}" (L${k.levelId}): "${k.readingMnemonicFr}"`);
    }
  }

  // 6. Content per level detailed breakdown
  console.log("\n\n6. DETAILED LEVEL CONTENT ANALYSIS");
  console.log("----------------------------------------");

  // Check which levels have sparse content
  const levelStats = [];
  for (let level = 1; level <= 60; level++) {
    const radicalCount = await prisma.radical.count({ where: { levelId: level } });
    const kanjiCount = await prisma.kanji.count({ where: { levelId: level } });
    const vocabCount = await prisma.vocabulary.count({ where: { levelId: level } });

    levelStats.push({
      level,
      radicals: radicalCount,
      kanji: kanjiCount,
      vocabulary: vocabCount,
      total: radicalCount + kanjiCount + vocabCount,
    });
  }

  // Find levels with unusual content distribution
  const avgKanji = levelStats.reduce((sum, l) => sum + l.kanji, 0) / 60;
  const avgVocab = levelStats.reduce((sum, l) => sum + l.vocabulary, 0) / 60;

  console.log(`Average kanji per level: ${avgKanji.toFixed(1)}`);
  console.log(`Average vocabulary per level: ${avgVocab.toFixed(1)}`);

  console.log("\nLevels with unusually high kanji count (>50):");
  for (const l of levelStats.filter(l => l.kanji > 50)) {
    console.log(`  Level ${l.level}: ${l.kanji} kanji`);
  }

  console.log("\nLevels with unusually low kanji count (<10 except early levels):");
  for (const l of levelStats.filter(l => l.kanji < 10 && l.level > 5)) {
    console.log(`  Level ${l.level}: ${l.kanji} kanji`);
  }

  // 7. Check vocabulary-kanji relationships
  console.log("\n\n7. VOCABULARY-KANJI RELATIONSHIP ANALYSIS");
  console.log("----------------------------------------");

  const vocabWithKanjiLinks = await prisma.vocabulary.findMany({
    include: {
      kanji: {
        include: { kanji: true }
      }
    },
    orderBy: { levelId: "asc" }
  });

  const vocabWithLinks = vocabWithKanjiLinks.filter(v => v.kanji.length > 0);
  const vocabWithoutLinks = vocabWithKanjiLinks.filter(v => v.kanji.length === 0);

  console.log(`Vocabulary with kanji links: ${vocabWithLinks.length} (${(vocabWithLinks.length / vocabWithKanjiLinks.length * 100).toFixed(1)}%)`);
  console.log(`Vocabulary without kanji links: ${vocabWithoutLinks.length} (${(vocabWithoutLinks.length / vocabWithKanjiLinks.length * 100).toFixed(1)}%)`);

  // Check how many have kanji characters but no links
  const kanjiRegex = /[\u4e00-\u9faf]/g;
  const vocabWithKanjiCharsNoLinks = vocabWithoutLinks.filter(v => kanjiRegex.test(v.word));
  console.log(`\nVocabulary with kanji characters but no links: ${vocabWithKanjiCharsNoLinks.length}`);

  // 8. Example sentences coverage
  console.log("\n\n8. EXAMPLE SENTENCES COVERAGE");
  console.log("----------------------------------------");

  const vocabWithSentences = allVocab.filter(v => v.sentenceJp && v.sentenceJp.length > 0);
  const vocabWithoutSentences = allVocab.filter(v => !v.sentenceJp || v.sentenceJp.length === 0);

  console.log(`Vocabulary with example sentences: ${vocabWithSentences.length} (${(vocabWithSentences.length / allVocab.length * 100).toFixed(1)}%)`);
  console.log(`Vocabulary without example sentences: ${vocabWithoutSentences.length} (${(vocabWithoutSentences.length / allVocab.length * 100).toFixed(1)}%)`);

  // Show sentence coverage by level
  console.log("\nSentence coverage by level:");
  for (let level = 1; level <= 10; level++) {
    const vocabInLevel = allVocab.filter(v => v.levelId === level);
    const withSentence = vocabInLevel.filter(v => v.sentenceJp && v.sentenceJp.length > 0);
    console.log(`  Level ${level}: ${withSentence.length}/${vocabInLevel.length} (${(withSentence.length / vocabInLevel.length * 100).toFixed(1)}%)`);
  }

  console.log("\n========================================");
  console.log("Detailed analysis complete!");
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
