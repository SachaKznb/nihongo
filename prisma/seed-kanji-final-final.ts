import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// FINAL FINAL - the last 12 kanji to exceed 2000!

const kanjiData = [
  {
    character: "悲",
    meaningsFr: ["triste", "chagrin"],
    readingsOn: ["ヒ"],
    readingsKun: ["かな.しい"],
    meaningMnemonicFr: "Le non 非 avec le cœur 心 ressent la TRISTESSE.",
    readingMnemonicFr: "HI - Le chagrin profond.",
    levelId: 43,
  },
  {
    character: "惑",
    meaningsFr: ["doute", "confusion"],
    readingsOn: ["ワク"],
    readingsKun: ["まど.う"],
    meaningMnemonicFr: "Quelqu'un 或 avec le cœur 心 a des DOUTES.",
    readingMnemonicFr: "WAKU - La confusion mentale.",
    levelId: 45,
  },
  {
    character: "愚",
    meaningsFr: ["stupide", "fou"],
    readingsOn: ["グ"],
    readingsKun: ["おろ.か"],
    meaningMnemonicFr: "L'angle 禺 avec le cœur 心 est STUPIDE.",
    readingMnemonicFr: "GU - La folie humaine.",
    levelId: 46,
  },
  {
    character: "慎",
    meaningsFr: ["prudent", "attentif"],
    readingsOn: ["シン"],
    readingsKun: ["つつし.む"],
    meaningMnemonicFr: "Le cœur 忄 avec le vrai 真 est PRUDENT.",
    readingMnemonicFr: "SHIN - La prudence nécessaire.",
    levelId: 45,
  },
  {
    character: "慕",
    meaningsFr: ["admirer", "désirer"],
    readingsOn: ["ボ"],
    readingsKun: ["した.う"],
    meaningMnemonicFr: "Le soir 莫 avec le cœur 心 ADMIRE.",
    readingMnemonicFr: "BO - L'admiration profonde.",
    levelId: 47,
  },
  {
    character: "慢",
    meaningsFr: ["arrogant", "lent"],
    readingsOn: ["マン"],
    readingsKun: [],
    meaningMnemonicFr: "Le cœur 忄 avec le long 曼 devient ARROGANT.",
    readingMnemonicFr: "MAN - L'arrogance affichée.",
    levelId: 46,
  },
  {
    character: "憩",
    meaningsFr: ["repos", "pause"],
    readingsOn: ["ケイ"],
    readingsKun: ["いこ.い", "いこ.う"],
    meaningMnemonicFr: "Soi 自 avec le cœur 心 et le souffle 息 prend du REPOS.",
    readingMnemonicFr: "KEI - La pause méritée.",
    levelId: 48,
  },
  {
    character: "憲",
    meaningsFr: ["constitution", "loi"],
    readingsOn: ["ケン"],
    readingsKun: [],
    meaningMnemonicFr: "Le toit 宀 avec le cœur 心 et les yeux 目 forment la CONSTITUTION.",
    readingMnemonicFr: "KEN - La loi fondamentale.",
    levelId: 46,
  },
  {
    character: "憶",
    meaningsFr: ["souvenir", "mémoire"],
    readingsOn: ["オク"],
    readingsKun: [],
    meaningMnemonicFr: "Le cœur 忄 avec la pensée 意 garde le SOUVENIR.",
    readingMnemonicFr: "OKU - La mémoire vivante.",
    levelId: 45,
  },
  {
    character: "懇",
    meaningsFr: ["cordial", "sincère"],
    readingsOn: ["コン"],
    readingsKun: ["ねんご.ろ"],
    meaningMnemonicFr: "Le difficile 艮 avec le cœur 心 est CORDIAL.",
    readingMnemonicFr: "KON - La sincérité cordiale.",
    levelId: 48,
  },
  {
    character: "懲",
    meaningsFr: ["punir", "discipliner"],
    readingsOn: ["チョウ"],
    readingsKun: ["こ.りる", "こ.らす"],
    meaningMnemonicFr: "Le signe 徴 avec le cœur 心 PUNIT.",
    readingMnemonicFr: "CHŌ - La discipline sévère.",
    levelId: 49,
  },
  {
    character: "懸",
    meaningsFr: ["suspendre", "inquiet"],
    readingsOn: ["ケン", "ケ"],
    readingsKun: ["か.ける", "か.かる"],
    meaningMnemonicFr: "Le district 県 avec le cœur 心 est SUSPENDU.",
    readingMnemonicFr: "KEN - L'inquiétude suspendue.",
    levelId: 47,
  },
];

async function main() {
  console.log("Seeding THE FINAL FINAL kanji batch to exceed 2000...");

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
