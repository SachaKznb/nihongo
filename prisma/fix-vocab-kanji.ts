import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Unicode ranges for kanji characters
// CJK Unified Ideographs: 4E00-9FFF
// CJK Unified Ideographs Extension A: 3400-4DBF
// CJK Unified Ideographs Extension B: 20000-2A6DF (rare, but included for completeness)
function isKanji(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 0x4e00 && code <= 0x9fff) || // CJK Unified Ideographs
    (code >= 0x3400 && code <= 0x4dbf) // CJK Unified Ideographs Extension A
  );
}

// Extract kanji characters from a string with their positions
function extractKanjiWithPositions(word: string): { char: string; position: number }[] {
  const result: { char: string; position: number }[] = [];
  let kanjiPosition = 0;

  for (const char of word) {
    if (isKanji(char)) {
      result.push({ char, position: kanjiPosition });
      kanjiPosition++;
    }
  }

  return result;
}

async function main() {
  console.log("Starting vocabulary-kanji relationship fix...\n");

  // Step 1: Get all vocabulary items
  const allVocabulary = await prisma.vocabulary.findMany({
    select: {
      id: true,
      word: true,
      kanji: {
        select: {
          kanjiId: true,
        },
      },
    },
  });

  console.log(`Total vocabulary items: ${allVocabulary.length}`);

  // Step 2: Get all kanji in the database and create a lookup map
  const allKanji = await prisma.kanji.findMany({
    select: {
      id: true,
      character: true,
    },
  });

  const kanjiMap = new Map<string, number>();
  for (const kanji of allKanji) {
    kanjiMap.set(kanji.character, kanji.id);
  }

  console.log(`Total kanji in database: ${allKanji.length}`);

  // Step 3: Analyze vocabulary and create missing links
  let vocabWithKanji = 0;
  let vocabWithLinks = 0;
  let vocabWithoutLinks = 0;
  let totalLinksCreated = 0;
  let totalLinksAlreadyExist = 0;
  let kanjiNotInDb = 0;

  const linksToCreate: { vocabularyId: number; kanjiId: number }[] = [];

  for (const vocab of allVocabulary) {
    const kanjiInWord = extractKanjiWithPositions(vocab.word);

    if (kanjiInWord.length > 0) {
      vocabWithKanji++;

      const existingKanjiIds = new Set(vocab.kanji.map((k) => k.kanjiId));

      if (existingKanjiIds.size > 0) {
        vocabWithLinks++;
      } else {
        vocabWithoutLinks++;
      }

      for (const { char } of kanjiInWord) {
        const kanjiId = kanjiMap.get(char);

        if (kanjiId) {
          if (!existingKanjiIds.has(kanjiId)) {
            linksToCreate.push({ vocabularyId: vocab.id, kanjiId });
          } else {
            totalLinksAlreadyExist++;
          }
        } else {
          kanjiNotInDb++;
        }
      }
    }
  }

  console.log(`\nAnalysis complete:`);
  console.log(`  Vocabulary containing kanji: ${vocabWithKanji}`);
  console.log(`  Already have kanji links: ${vocabWithLinks}`);
  console.log(`  Missing kanji links: ${vocabWithoutLinks}`);
  console.log(`  Links that already exist: ${totalLinksAlreadyExist}`);
  console.log(`  Kanji characters not in database: ${kanjiNotInDb}`);
  console.log(`  Links to create: ${linksToCreate.length}`);

  if (linksToCreate.length === 0) {
    console.log("\nNo new links to create. Database is up to date!");
    return;
  }

  // Step 4: Create the missing links in batches
  console.log(`\nCreating ${linksToCreate.length} vocabulary-kanji links...`);

  const batchSize = 100;
  let createdCount = 0;

  for (let i = 0; i < linksToCreate.length; i += batchSize) {
    const batch = linksToCreate.slice(i, i + batchSize);

    // Use createMany with skipDuplicates to handle any race conditions
    const result = await prisma.vocabularyKanji.createMany({
      data: batch,
      skipDuplicates: true,
    });

    createdCount += result.count;

    if ((i + batchSize) % 1000 === 0 || i + batchSize >= linksToCreate.length) {
      console.log(`  Progress: ${Math.min(i + batchSize, linksToCreate.length)}/${linksToCreate.length} processed`);
    }
  }

  totalLinksCreated = createdCount;

  console.log(`\nComplete! Created ${totalLinksCreated} new vocabulary-kanji links.`);

  // Step 5: Verify the fix
  const verifyVocab = await prisma.vocabulary.findMany({
    select: {
      id: true,
      word: true,
      kanji: {
        select: {
          kanjiId: true,
        },
      },
    },
  });

  let newVocabWithLinks = 0;
  let newVocabWithoutLinks = 0;

  for (const vocab of verifyVocab) {
    const kanjiInWord = extractKanjiWithPositions(vocab.word);
    if (kanjiInWord.length > 0) {
      if (vocab.kanji.length > 0) {
        newVocabWithLinks++;
      } else {
        newVocabWithoutLinks++;
      }
    }
  }

  console.log(`\nVerification:`);
  console.log(`  Vocabulary with kanji links: ${newVocabWithLinks}`);
  console.log(`  Vocabulary still missing links: ${newVocabWithoutLinks}`);

  if (newVocabWithoutLinks > 0) {
    console.log(`\n  Note: ${newVocabWithoutLinks} vocabulary items still have no links.`);
    console.log(`  This is likely because their kanji are not in the database.`);

    // Show some examples of missing kanji
    const missingExamples: { word: string; missingKanji: string[] }[] = [];

    for (const vocab of verifyVocab) {
      if (vocab.kanji.length === 0) {
        const kanjiInWord = extractKanjiWithPositions(vocab.word);
        if (kanjiInWord.length > 0) {
          const missingKanji = kanjiInWord
            .map((k) => k.char)
            .filter((char) => !kanjiMap.has(char));

          if (missingKanji.length > 0 && missingExamples.length < 10) {
            missingExamples.push({ word: vocab.word, missingKanji });
          }
        }
      }
    }

    if (missingExamples.length > 0) {
      console.log(`\n  Examples of vocabulary with kanji not in database:`);
      for (const ex of missingExamples) {
        console.log(`    "${ex.word}" - missing: ${ex.missingKanji.join(", ")}`);
      }
    }
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
