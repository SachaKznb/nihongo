import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// OVER 2000 - 5 unique kanji to finally exceed 2000!

const kanjiData = [
  {
    character: "疾",
    meaningsFr: ["maladie", "rapide"],
    readingsOn: ["シツ"],
    readingsKun: [],
    meaningMnemonicFr: "La maladie 疒 avec la flèche 矢 est RAPIDE.",
    readingMnemonicFr: "SHITSU - La maladie soudaine.",
    levelId: 46,
  },
  {
    character: "痕",
    meaningsFr: ["trace", "cicatrice"],
    readingsOn: ["コン"],
    readingsKun: ["あと"],
    meaningMnemonicFr: "La maladie 疒 avec la marque 艮 laisse une TRACE.",
    readingMnemonicFr: "KON - La cicatrice visible.",
    levelId: 48,
  },
  {
    character: "痢",
    meaningsFr: ["diarrhée"],
    readingsOn: ["リ"],
    readingsKun: [],
    meaningMnemonicFr: "La maladie 疒 avec le profit 利 cause la DIARRHÉE.",
    readingMnemonicFr: "RI - Le mal de ventre.",
    levelId: 50,
  },
  {
    character: "痴",
    meaningsFr: ["idiot", "fou"],
    readingsOn: ["チ"],
    readingsKun: [],
    meaningMnemonicFr: "La maladie 疒 qui connaît 知 rend IDIOT.",
    readingMnemonicFr: "CHI - La folie passagère.",
    levelId: 49,
  },
  {
    character: "瘍",
    meaningsFr: ["ulcère", "plaie"],
    readingsOn: ["ヨウ"],
    readingsKun: [],
    meaningMnemonicFr: "La maladie 疒 qui s'élève 昜 forme un ULCÈRE.",
    readingMnemonicFr: "YŌ - L'ulcère douloureux.",
    levelId: 52,
  },
];

async function main() {
  console.log("Seeding OVER 2000 kanji batch...");

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
