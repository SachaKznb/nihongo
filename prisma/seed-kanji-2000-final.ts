import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 2000 FINAL - 6 unique kanji to hit 2002!

const kanjiData = [
  {
    character: "猿",
    meaningsFr: ["singe"],
    readingsOn: ["エン"],
    readingsKun: ["さる"],
    meaningMnemonicFr: "Le chien 犭 avec le parc 袁 est un SINGE.",
    readingMnemonicFr: "EN - Le singe espiègle.",
    levelId: 48,
  },
  {
    character: "献",
    meaningsFr: ["offrir", "contribution"],
    readingsOn: ["ケン", "コン"],
    readingsKun: ["たてまつ.る"],
    meaningMnemonicFr: "Le sud 南 avec le chien 犬 OFFRE.",
    readingMnemonicFr: "KEN - L'offrande faite.",
    levelId: 47,
  },
  {
    character: "猶",
    meaningsFr: ["encore", "hésiter"],
    readingsOn: ["ユウ"],
    readingsKun: ["なお"],
    meaningMnemonicFr: "Le chien 犭 qui suit 酋 hésite ENCORE.",
    readingMnemonicFr: "YŪ - L'hésitation persistante.",
    levelId: 49,
  },
  {
    character: "玩",
    meaningsFr: ["jouer", "jouet"],
    readingsOn: ["ガン"],
    readingsKun: ["もてあそ.ぶ"],
    meaningMnemonicFr: "Le jade 王 avec l'origine 元 sert à JOUER.",
    readingMnemonicFr: "GAN - Le jouet précieux.",
    levelId: 50,
  },
  {
    character: "珍",
    meaningsFr: ["rare", "précieux"],
    readingsOn: ["チン"],
    readingsKun: ["めずら.しい"],
    meaningMnemonicFr: "Le jade 王 avec les cheveux 㐱 est RARE.",
    readingMnemonicFr: "CHIN - La rareté précieuse.",
    levelId: 45,
  },
  {
    character: "班",
    meaningsFr: ["groupe", "équipe"],
    readingsOn: ["ハン"],
    readingsKun: [],
    meaningMnemonicFr: "Le jade 王 divisé 王 forme un GROUPE.",
    readingMnemonicFr: "HAN - L'équipe organisée.",
    levelId: 46,
  },
];

async function main() {
  console.log("Seeding 2000 FINAL kanji batch...");

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
