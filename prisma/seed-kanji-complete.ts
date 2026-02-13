import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// COMPLETE - the absolute last 6 kanji to exceed 2000!

const kanjiData = [
  {
    character: "狂",
    meaningsFr: ["fou", "délirant"],
    readingsOn: ["キョウ"],
    readingsKun: ["くる.う"],
    meaningMnemonicFr: "Le chien 犭 avec le roi 王 devient FOU.",
    readingMnemonicFr: "KYŌ - La folie délirante.",
    levelId: 44,
  },
  {
    character: "狩",
    meaningsFr: ["chasse", "chasser"],
    readingsOn: ["シュ"],
    readingsKun: ["か.る", "か.り"],
    meaningMnemonicFr: "Le chien 犭 qui garde 守 CHASSE.",
    readingMnemonicFr: "SHU - La chasse sauvage.",
    levelId: 45,
  },
  {
    character: "独",
    meaningsFr: ["seul", "unique"],
    readingsOn: ["ドク"],
    readingsKun: ["ひと.り"],
    meaningMnemonicFr: "Le chien 犭 avec l'insecte 蜀 est SEUL.",
    readingMnemonicFr: "DOKU - La solitude unique.",
    levelId: 43,
  },
  {
    character: "狭",
    meaningsFr: ["étroit", "serré"],
    readingsOn: ["キョウ"],
    readingsKun: ["せま.い"],
    meaningMnemonicFr: "Le chien 犭 dans l'espace 夹 est ÉTROIT.",
    readingMnemonicFr: "KYŌ - L'espace serré.",
    levelId: 45,
  },
  {
    character: "猛",
    meaningsFr: ["féroce", "violent"],
    readingsOn: ["モウ"],
    readingsKun: [],
    meaningMnemonicFr: "Le chien 犭 avec le fils aîné 孟 est FÉROCE.",
    readingMnemonicFr: "MŌ - La férocité animale.",
    levelId: 46,
  },
  {
    character: "猟",
    meaningsFr: ["chasse", "chasseur"],
    readingsOn: ["リョウ"],
    readingsKun: ["かり"],
    meaningMnemonicFr: "Le chien 犭 avec le lièvre 鑞 fait la CHASSE.",
    readingMnemonicFr: "RYŌ - Le chasseur expert.",
    levelId: 47,
  },
];

async function main() {
  console.log("Seeding THE COMPLETE kanji batch to exceed 2000...");

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
