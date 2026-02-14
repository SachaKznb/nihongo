import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  // Get all kanji in system
  const allKanji = await prisma.kanji.findMany({ select: { character: true } });
  const kanjiChars = new Set(allKanji.map(k => k.character));

  console.log(`Kanji in our system: ${kanjiChars.size}`);

  // Check all seed files for vocabulary using missing kanji
  const files = fs.readdirSync("/Users/sachabouhamidi/nihongo/prisma")
    .filter(f => f.includes("seed-vocab") || f.includes("seed-levels"));

  const missingKanjiCount = new Map<string, number>();
  let totalWords = 0;
  let wordsWithMissingKanji = 0;

  for (const file of files) {
    const content = fs.readFileSync(`/Users/sachabouhamidi/nihongo/prisma/${file}`, "utf-8");

    // Extract words
    const wordRegex = /word:\s*"([^"]+)"/g;
    let match;

    while ((match = wordRegex.exec(content)) !== null) {
      const word = match[1];
      totalWords++;

      const kanjiInWord = word.split("").filter(c => /[\u4e00-\u9faf]/.test(c));
      const missing = kanjiInWord.filter(k => !kanjiChars.has(k));

      if (missing.length > 0) {
        wordsWithMissingKanji++;
        for (const k of missing) {
          missingKanjiCount.set(k, (missingKanjiCount.get(k) || 0) + 1);
        }
      }
    }
  }

  console.log(`\nTotal words in seed files: ${totalWords}`);
  console.log(`Words using kanji NOT in our 2000: ${wordsWithMissingKanji} (${(wordsWithMissingKanji/totalWords*100).toFixed(1)}%)`);

  // Sort by frequency
  const sorted = [...missingKanjiCount.entries()].sort((a, b) => b[1] - a[1]);
  console.log(`\nMost common missing kanji (top 50):`);
  sorted.slice(0, 50).forEach(([k, count]) => {
    console.log(`  ${k}: used in ${count} vocabulary words`);
  });

  console.log(`\nTotal unique missing kanji: ${sorted.length}`);

  // These are kanji we should consider adding
  console.log(`\n=== RECOMMENDATION ===`);
  console.log(`Consider adding these high-frequency kanji to enable more vocabulary:`);
  sorted.slice(0, 20).forEach(([k, count]) => {
    console.log(`  ${k} (${count} words)`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
