import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== RESTORING VOCABULARY ===\n");

  // Get all kanji in our system
  const allKanji = await prisma.kanji.findMany({
    select: { id: true, character: true, levelId: true }
  });
  const kanjiChars = new Set(allKanji.map(k => k.character));
  const kanjiMap = new Map(allKanji.map(k => [k.character, k]));

  console.log(`Kanji in system: ${kanjiChars.size}`);

  // Get current vocabulary
  const currentVocab = await prisma.vocabulary.findMany();
  const currentWords = new Set(currentVocab.map(v => v.word));
  console.log(`Current vocabulary: ${currentVocab.length}`);

  // Re-run all vocabulary supplement files and collect valid vocabulary
  // We'll do this by scanning the files

  const fs = await import("fs");
  const path = await import("path");

  const prismaDir = "/Users/sachabouhamidi/nihongo/prisma";
  const files = fs.readdirSync(prismaDir).filter(f => f.includes("seed-vocab") || f.includes("seed-levels"));

  console.log(`\nScanning ${files.length} seed files for vocabulary...`);

  // Helper to check if a word only uses kanji from our system
  function isValidWord(word: string): boolean {
    const kanjiInWord = word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
    return kanjiInWord.every(k => kanjiChars.has(k));
  }

  // Collect all vocabulary from seed files
  const allVocabData: Array<{
    word: string;
    meaningsFr: string[];
    readings: string[];
    mnemonicFr: string;
    levelId: number;
  }> = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(prismaDir, file), "utf-8");

    // Extract vocabulary objects using regex
    const vocabRegex = /\{\s*word:\s*"([^"]+)"\s*,\s*meaningsFr:\s*\[([^\]]+)\]\s*,\s*readings:\s*\[([^\]]+)\]\s*,\s*mnemonicFr:\s*"([^"]+)"\s*,\s*levelId:\s*(\d+)/g;

    let match;
    while ((match = vocabRegex.exec(content)) !== null) {
      const [, word, meaningsFrStr, readingsStr, mnemonicFr, levelIdStr] = match;

      // Parse arrays
      const meaningsFr = meaningsFrStr.split(",").map(s => s.trim().replace(/"/g, "")).filter(s => s);
      const readings = readingsStr.split(",").map(s => s.trim().replace(/"/g, "")).filter(s => s);
      const levelId = parseInt(levelIdStr);

      if (word && meaningsFr.length > 0 && readings.length > 0) {
        allVocabData.push({ word, meaningsFr, readings, mnemonicFr, levelId });
      }
    }
  }

  console.log(`Found ${allVocabData.length} vocabulary entries in seed files`);

  // Filter and deduplicate
  const wordsSeen = new Set<string>();
  const validVocab: typeof allVocabData = [];

  for (const vocab of allVocabData) {
    // Skip if already seen (duplicate)
    if (wordsSeen.has(vocab.word)) continue;
    wordsSeen.add(vocab.word);

    // Skip if uses kanji not in our system
    if (!isValidWord(vocab.word)) continue;

    // Skip if already in database
    if (currentWords.has(vocab.word)) continue;

    validVocab.push(vocab);
  }

  console.log(`Valid new vocabulary to add: ${validVocab.length}`);

  // Add valid vocabulary
  let added = 0;
  let errors = 0;

  for (const vocab of validVocab) {
    try {
      // Find the kanji in this word
      const kanjiInWord = vocab.word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
      const uniqueKanji = [...new Set(kanjiInWord)];

      // Determine the correct level (max of component kanji levels)
      let maxKanjiLevel = 1;
      for (const char of uniqueKanji) {
        const kanji = kanjiMap.get(char);
        if (kanji && kanji.levelId > maxKanjiLevel) {
          maxKanjiLevel = kanji.levelId;
        }
      }

      // Create vocabulary
      const created = await prisma.vocabulary.create({
        data: {
          word: vocab.word,
          meaningsFr: vocab.meaningsFr,
          readings: vocab.readings,
          mnemonicFr: vocab.mnemonicFr,
          levelId: maxKanjiLevel,
        }
      });

      // Create kanji links
      for (const char of uniqueKanji) {
        const kanji = kanjiMap.get(char);
        if (kanji) {
          await prisma.vocabularyKanji.create({
            data: { vocabularyId: created.id, kanjiId: kanji.id }
          }).catch(() => {});
        }
      }

      added++;
    } catch (e: any) {
      errors++;
    }
  }

  console.log(`\nAdded ${added} vocabulary items`);
  console.log(`Errors: ${errors}`);

  // Final count
  const finalCount = await prisma.vocabulary.count();
  const kanjiCount = await prisma.kanji.count();
  console.log(`\nFinal vocabulary: ${finalCount}`);
  console.log(`Ratio: ${(finalCount/kanjiCount).toFixed(2)} vocab per kanji`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
