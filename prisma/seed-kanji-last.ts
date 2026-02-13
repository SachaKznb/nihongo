import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// LAST - 3 more obscure kanji!

const kanjiData = [
  {
    character: "矯",
    meaningsFr: ["corriger", "redresser"],
    readingsOn: ["キョウ"],
    readingsKun: ["た.める"],
    meaningMnemonicFr: "La flèche 矢 qui élève 喬 CORRIGE.",
    readingMnemonicFr: "KYŌ - La correction orthodontique.",
    levelId: 50,
  },
  {
    character: "砂",
    meaningsFr: ["sable"],
    readingsOn: ["サ", "シャ"],
    readingsKun: ["すな"],
    meaningMnemonicFr: "La pierre 石 qui devient peu 少 est du SABLE.",
    readingMnemonicFr: "SA - Le sable fin.",
    levelId: 42,
  },
  {
    character: "碑",
    meaningsFr: ["monument", "stèle"],
    readingsOn: ["ヒ"],
    readingsKun: [],
    meaningMnemonicFr: "La pierre 石 humble 卑 est un MONUMENT.",
    readingMnemonicFr: "HI - La stèle commémorative.",
    levelId: 48,
  },
];

async function main() {
  console.log("Seeding LAST kanji batch...");

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
