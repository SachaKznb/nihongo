import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const radicals = await prisma.radical.count();
  const kanji = await prisma.kanji.count();
  const vocab = await prisma.vocabulary.count();
  const levels = await prisma.level.count();
  
  console.log("=== ACTUAL CONTENT COUNTS ===");
  console.log("Radicals:", radicals);
  console.log("Kanji:", kanji);
  console.log("Vocabulary:", vocab);
  console.log("Levels:", levels);
  
  // Check mnemonic coverage
  const kanjiWithMnemonics = await prisma.kanji.count({
    where: { 
      AND: [
        { meaningMnemonicFr: { not: "" } },
        { readingMnemonicFr: { not: "" } }
      ]
    }
  });
  
  const vocabWithMnemonics = await prisma.vocabulary.count({
    where: { mnemonicFr: { not: "" } }
  });
  
  const radicalsWithMnemonics = await prisma.radical.count({
    where: { mnemonic: { not: "" } }
  });
  
  console.log("\n=== MNEMONIC COVERAGE ===");
  console.log("Kanji with both mnemonics:", kanjiWithMnemonics, "/", kanji);
  console.log("Vocab with mnemonics:", vocabWithMnemonics, "/", vocab);
  console.log("Radicals with mnemonics:", radicalsWithMnemonics, "/", radicals);
  
  // Sample distribution
  console.log("\n=== LEVEL DISTRIBUTION (sample) ===");
  for (let level = 1; level <= 10; level++) {
    const r = await prisma.radical.count({ where: { levelId: level } });
    const k = await prisma.kanji.count({ where: { levelId: level } });
    const v = await prisma.vocabulary.count({ where: { levelId: level } });
    console.log("Level", level + ":", r, "R,", k, "K,", v, "V");
  }
}

main().finally(() => prisma.$disconnect());
