import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// HIT 2000 - 8 unique kanji!

const kanjiData = [
  {
    character: "瑞",
    meaningsFr: ["bon augure", "félicité"],
    readingsOn: ["ズイ"],
    readingsKun: ["みず"],
    meaningMnemonicFr: "Le jade 王 qui monte 耑 est de BON AUGURE.",
    readingMnemonicFr: "ZUI - La félicité promise.",
    levelId: 50,
  },
  {
    character: "璧",
    meaningsFr: ["disque de jade"],
    readingsOn: ["ヘキ"],
    readingsKun: [],
    meaningMnemonicFr: "Le mur 辟 avec le jade 玉 est un DISQUE DE JADE.",
    readingMnemonicFr: "HEKI - Le jade parfait.",
    levelId: 52,
  },
  {
    character: "環",
    meaningsFr: ["anneau", "environnement"],
    readingsOn: ["カン"],
    readingsKun: ["わ"],
    meaningMnemonicFr: "Le jade 王 qui revient 睘 forme un ANNEAU.",
    readingMnemonicFr: "KAN - L'environnement circulaire.",
    levelId: 46,
  },
  {
    character: "璃",
    meaningsFr: ["verre", "cristal"],
    readingsOn: ["リ"],
    readingsKun: [],
    meaningMnemonicFr: "Le jade 王 qui se sépare 離 est du VERRE.",
    readingMnemonicFr: "RI - Le cristal brillant.",
    levelId: 51,
  },
  {
    character: "瓦",
    meaningsFr: ["tuile"],
    readingsOn: ["ガ"],
    readingsKun: ["かわら"],
    meaningMnemonicFr: "Le signe représente une TUILE de toit.",
    readingMnemonicFr: "GA - La tuile du toit.",
    levelId: 48,
  },
  {
    character: "甚",
    meaningsFr: ["très", "extrême"],
    readingsOn: ["ジン"],
    readingsKun: ["はなは.だ"],
    meaningMnemonicFr: "Le doux 甘 avec les jambes 匹 est TRÈS important.",
    readingMnemonicFr: "JIN - L'extrême importance.",
    levelId: 47,
  },
  {
    character: "畏",
    meaningsFr: ["crainte", "respect"],
    readingsOn: ["イ"],
    readingsKun: ["おそ.れる", "かしこ.い"],
    meaningMnemonicFr: "Le champ 田 avec le tigre 畏 inspire la CRAINTE.",
    readingMnemonicFr: "I - Le respect craintif.",
    levelId: 49,
  },
  {
    character: "畜",
    meaningsFr: ["bétail", "élever"],
    readingsOn: ["チク"],
    readingsKun: [],
    meaningMnemonicFr: "Le champ 田 avec la lune 玄 élève le BÉTAIL.",
    readingMnemonicFr: "CHIKU - L'élevage du bétail.",
    levelId: 45,
  },
];

async function main() {
  console.log("Seeding HIT 2000 kanji batch...");

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
