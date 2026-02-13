import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 2000 REACHED - 4 unique kanji to exceed 2000!

const kanjiData = [
  {
    character: "療",
    meaningsFr: ["guérir", "traiter"],
    readingsOn: ["リョウ"],
    readingsKun: [],
    meaningMnemonicFr: "La maladie 疒 qui demande 尞 un TRAITEMENT.",
    readingMnemonicFr: "RYŌ - Le traitement médical.",
    levelId: 45,
  },
  {
    character: "皇",
    meaningsFr: ["empereur"],
    readingsOn: ["コウ", "オウ"],
    readingsKun: [],
    meaningMnemonicFr: "Le blanc 白 avec le roi 王 est l'EMPEREUR.",
    readingMnemonicFr: "KŌ - L'empereur du Japon.",
    levelId: 44,
  },
  {
    character: "皆",
    meaningsFr: ["tout le monde", "tous"],
    readingsOn: ["カイ"],
    readingsKun: ["みな", "みんな"],
    meaningMnemonicFr: "Le comparer 比 avec le blanc 白 inclut TOUS.",
    readingMnemonicFr: "KAI - Tout le monde ensemble.",
    levelId: 42,
  },
  {
    character: "盾",
    meaningsFr: ["bouclier"],
    readingsOn: ["ジュン"],
    readingsKun: ["たて"],
    meaningMnemonicFr: "Les dix 十 yeux 目 avec le plat 厂 forment un BOUCLIER.",
    readingMnemonicFr: "JUN - Le bouclier protecteur.",
    levelId: 48,
  },
];

async function main() {
  console.log("Seeding 2000 REACHED kanji batch...");

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
