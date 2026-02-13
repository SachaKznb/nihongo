import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TARGET - 4 obscure unique kanji to reach 2000!

const kanjiData = [
  {
    character: "盲",
    meaningsFr: ["aveugle"],
    readingsOn: ["モウ"],
    readingsKun: ["めくら"],
    meaningMnemonicFr: "L'œil 目 qui disparaît 亡 est AVEUGLE.",
    readingMnemonicFr: "MŌ - La cécité totale.",
    levelId: 47,
  },
  {
    character: "眺",
    meaningsFr: ["contempler", "observer"],
    readingsOn: ["チョウ"],
    readingsKun: ["なが.める"],
    meaningMnemonicFr: "L'œil 目 qui saute 兆 CONTEMPLE.",
    readingMnemonicFr: "CHŌ - La contemplation paisible.",
    levelId: 46,
  },
  {
    character: "眠",
    meaningsFr: ["dormir", "sommeil"],
    readingsOn: ["ミン"],
    readingsKun: ["ねむ.る"],
    meaningMnemonicFr: "L'œil 目 du peuple 民 DORT.",
    readingMnemonicFr: "MIN - Le sommeil profond.",
    levelId: 43,
  },
  {
    character: "睦",
    meaningsFr: ["harmonie", "amitié"],
    readingsOn: ["ボク"],
    readingsKun: ["むつ.まじい"],
    meaningMnemonicFr: "L'œil 目 qui atterrit 坴 trouve l'HARMONIE.",
    readingMnemonicFr: "BOKU - L'amitié harmonieuse.",
    levelId: 50,
  },
];

async function main() {
  console.log("Seeding TARGET kanji batch...");

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
