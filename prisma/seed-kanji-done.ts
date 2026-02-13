import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DONE - the last 10 kanji to exceed 2000!

const kanjiData = [
  {
    character: "戴",
    meaningsFr: ["recevoir", "porter sur la tête"],
    readingsOn: ["タイ"],
    readingsKun: ["いただ.く"],
    meaningMnemonicFr: "L'arme 戈 avec la différence 異 REÇOIT sur la tête.",
    readingMnemonicFr: "TAI - Le réception respectueuse.",
    levelId: 49,
  },
  {
    character: "房",
    meaningsFr: ["chambre", "touffe"],
    readingsOn: ["ボウ"],
    readingsKun: ["ふさ"],
    meaningMnemonicFr: "La porte 戸 avec la direction 方 forme une CHAMBRE.",
    readingMnemonicFr: "BŌ - La chambre privée.",
    levelId: 47,
  },
  {
    character: "扶",
    meaningsFr: ["aider", "soutenir"],
    readingsOn: ["フ"],
    readingsKun: ["たす.ける"],
    meaningMnemonicFr: "La main 扌 avec le mari 夫 AIDE.",
    readingMnemonicFr: "FU - Le soutien offert.",
    levelId: 48,
  },
  {
    character: "批",
    meaningsFr: ["critiquer", "commenter"],
    readingsOn: ["ヒ"],
    readingsKun: [],
    meaningMnemonicFr: "La main 扌 qui compare 比 CRITIQUE.",
    readingMnemonicFr: "HI - La critique constructive.",
    levelId: 44,
  },
  {
    character: "承",
    meaningsFr: ["accepter", "recevoir"],
    readingsOn: ["ショウ", "ジョウ"],
    readingsKun: ["うけたまわ.る"],
    meaningMnemonicFr: "Les mains qui tiennent ACCEPTENT.",
    readingMnemonicFr: "SHŌ - L'acceptation formelle.",
    levelId: 45,
  },
  {
    character: "抵",
    meaningsFr: ["résister", "équivalent"],
    readingsOn: ["テイ"],
    readingsKun: [],
    meaningMnemonicFr: "La main 扌 avec le bas 氐 RÉSISTE.",
    readingMnemonicFr: "TEI - La résistance opposée.",
    levelId: 46,
  },
  {
    character: "抽",
    meaningsFr: ["extraire", "tirer"],
    readingsOn: ["チュウ"],
    readingsKun: ["ぬ.く"],
    meaningMnemonicFr: "La main 扌 avec le centre 由 EXTRAIT.",
    readingMnemonicFr: "CHŪ - L'extraction précise.",
    levelId: 45,
  },
  {
    character: "押",
    meaningsFr: ["pousser", "appuyer"],
    readingsOn: ["オウ"],
    readingsKun: ["お.す"],
    meaningMnemonicFr: "La main 扌 avec le chapeau 甲 POUSSE.",
    readingMnemonicFr: "Ō - La pression exercée.",
    levelId: 43,
  },
  {
    character: "拍",
    meaningsFr: ["battre", "rythme"],
    readingsOn: ["ハク", "ヒョウ"],
    readingsKun: [],
    meaningMnemonicFr: "La main 扌 blanche 白 BAT le rythme.",
    readingMnemonicFr: "HAKU - Le battement régulier.",
    levelId: 46,
  },
  {
    character: "拓",
    meaningsFr: ["défricher", "développer"],
    readingsOn: ["タク"],
    readingsKun: ["ひら.く"],
    meaningMnemonicFr: "La main 扌 avec la pierre 石 DÉFRICHE.",
    readingMnemonicFr: "TAKU - Le développement pionnier.",
    levelId: 47,
  },
];

async function main() {
  console.log("Seeding THE DONE kanji batch to exceed 2000...");

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
