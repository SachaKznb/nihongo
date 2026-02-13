import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GOAL - 3 unique kanji to exceed 2000!

const kanjiData = [
  {
    character: "瞬",
    meaningsFr: ["clin d'œil", "instant"],
    readingsOn: ["シュン"],
    readingsKun: ["またた.く"],
    meaningMnemonicFr: "L'œil 目 qui cligne 舜 est un INSTANT.",
    readingMnemonicFr: "SHUN - Le clin d'œil rapide.",
    levelId: 47,
  },
  {
    character: "瞭",
    meaningsFr: ["clair", "évident"],
    readingsOn: ["リョウ"],
    readingsKun: [],
    meaningMnemonicFr: "L'œil 目 qui brille 尞 est CLAIR.",
    readingMnemonicFr: "RYŌ - La clarté évidente.",
    levelId: 49,
  },
  {
    character: "瞳",
    meaningsFr: ["pupille"],
    readingsOn: ["ドウ"],
    readingsKun: ["ひとみ"],
    meaningMnemonicFr: "L'œil 目 de l'enfant 童 est la PUPILLE.",
    readingMnemonicFr: "DŌ - La pupille de l'œil.",
    levelId: 48,
  },
];

async function main() {
  console.log("Seeding GOAL kanji batch...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonicFr,
        readingMnemonicFr: kanji.readingMnemonicFr,
        levelId: kanji.levelId,
      },
      create: kanji,
    });
  }

  console.log(`Seeded ${kanjiData.length} kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
