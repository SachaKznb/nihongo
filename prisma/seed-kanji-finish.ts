import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// FINISH LINE - the final 18 kanji to exceed 2000!

const kanjiData = [
  {
    character: "倉",
    meaningsFr: ["entrepôt", "magasin"],
    readingsOn: ["ソウ"],
    readingsKun: ["くら"],
    meaningMnemonicFr: "Le toit 人 sur la bouche 口 cache l'ENTREPÔT.",
    readingMnemonicFr: "SŌ - L'entrepôt de stockage.",
    levelId: 44,
  },
  {
    character: "倒",
    meaningsFr: ["tomber", "renverser"],
    readingsOn: ["トウ"],
    readingsKun: ["たお.れる", "たお.す"],
    meaningMnemonicFr: "La personne 亻 avec le couteau 到 TOMBE.",
    readingMnemonicFr: "TŌ - La chute renversante.",
    levelId: 43,
  },
  {
    character: "倣",
    meaningsFr: ["imiter", "copier"],
    readingsOn: ["ホウ"],
    readingsKun: ["なら.う"],
    meaningMnemonicFr: "La personne 亻 avec la direction 放 IMITE.",
    readingMnemonicFr: "HŌ - L'imitation fidèle.",
    levelId: 48,
  },
  {
    character: "倫",
    meaningsFr: ["éthique", "morale"],
    readingsOn: ["リン"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 avec l'ordre 侖 respecte l'ÉTHIQUE.",
    readingMnemonicFr: "RIN - La morale respectée.",
    levelId: 47,
  },
  {
    character: "偉",
    meaningsFr: ["grand", "remarquable"],
    readingsOn: ["イ"],
    readingsKun: ["えら.い"],
    meaningMnemonicFr: "La personne 亻 avec le différent 韋 est GRANDE.",
    readingMnemonicFr: "I - La grandeur remarquable.",
    levelId: 45,
  },
  {
    character: "偏",
    meaningsFr: ["partial", "biaisé"],
    readingsOn: ["ヘン"],
    readingsKun: ["かたよ.る"],
    meaningMnemonicFr: "La personne 亻 avec le plat 扁 est PARTIALE.",
    readingMnemonicFr: "HEN - Le biais évident.",
    levelId: 47,
  },
  {
    character: "偶",
    meaningsFr: ["paire", "par hasard"],
    readingsOn: ["グウ"],
    readingsKun: ["たま"],
    meaningMnemonicFr: "La personne 亻 avec l'angle 禺 forme une PAIRE.",
    readingMnemonicFr: "GŪ - Le hasard heureux.",
    levelId: 46,
  },
  {
    character: "傑",
    meaningsFr: ["héros", "excellent"],
    readingsOn: ["ケツ"],
    readingsKun: ["すぐ.れる"],
    meaningMnemonicFr: "La personne 亻 avec l'arbre 桀 est un HÉROS.",
    readingMnemonicFr: "KETSU - L'excellence héroïque.",
    levelId: 48,
  },
  {
    character: "傘",
    meaningsFr: ["parapluie"],
    readingsOn: ["サン"],
    readingsKun: ["かさ"],
    meaningMnemonicFr: "Le toit 人 avec les personnes 仌 sous la pluie forme un PARAPLUIE.",
    readingMnemonicFr: "SAN - Le parapluie protecteur.",
    levelId: 46,
  },
  {
    character: "傍",
    meaningsFr: ["côté", "à côté"],
    readingsOn: ["ボウ"],
    readingsKun: ["かたわ.ら"],
    meaningMnemonicFr: "La personne 亻 avec le pays 旁 est À CÔTÉ.",
    readingMnemonicFr: "BŌ - Le côté adjacent.",
    levelId: 47,
  },
  {
    character: "債",
    meaningsFr: ["dette", "obligation"],
    readingsOn: ["サイ"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 avec la responsabilité 責 a une DETTE.",
    readingMnemonicFr: "SAI - La dette contractée.",
    levelId: 46,
  },
  {
    character: "傾",
    meaningsFr: ["pencher", "incliner"],
    readingsOn: ["ケイ"],
    readingsKun: ["かたむ.く", "かたむ.ける"],
    meaningMnemonicFr: "La personne 亻 avec la tête 頃 PENCHE.",
    readingMnemonicFr: "KEI - L'inclinaison visible.",
    levelId: 45,
  },
  {
    character: "僧",
    meaningsFr: ["moine", "prêtre"],
    readingsOn: ["ソウ"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 qui augmente 曾 est un MOINE.",
    readingMnemonicFr: "SŌ - Le moine bouddhiste.",
    levelId: 46,
  },
  {
    character: "像",
    meaningsFr: ["statue", "image"],
    readingsOn: ["ゾウ"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 avec l'éléphant 象 forme une STATUE.",
    readingMnemonicFr: "ZŌ - L'image sculptée.",
    levelId: 44,
  },
  {
    character: "僚",
    meaningsFr: ["collègue", "fonctionnaire"],
    readingsOn: ["リョウ"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 avec les amis 尞 est un COLLÈGUE.",
    readingMnemonicFr: "RYŌ - Le collègue de bureau.",
    levelId: 47,
  },
  {
    character: "徳",
    meaningsFr: ["vertu", "moralité"],
    readingsOn: ["トク"],
    readingsKun: [],
    meaningMnemonicFr: "Le chemin 彳 avec le cœur 心 droit 直 montre la VERTU.",
    readingMnemonicFr: "TOKU - La vertu morale.",
    levelId: 45,
  },
  {
    character: "微",
    meaningsFr: ["petit", "minuscule"],
    readingsOn: ["ビ"],
    readingsKun: ["かす.か"],
    meaningMnemonicFr: "Le chemin 彳 avec la montagne 山 et l'attaque 攵 est MINUSCULE.",
    readingMnemonicFr: "BI - Le détail infime.",
    levelId: 46,
  },
  {
    character: "徹",
    meaningsFr: ["pénétrer", "complet"],
    readingsOn: ["テツ"],
    readingsKun: [],
    meaningMnemonicFr: "Le chemin 彳 avec la nourrice 育 et l'attaque 攵 PÉNÈTRE.",
    readingMnemonicFr: "TETSU - La pénétration complète.",
    levelId: 47,
  },
];

async function main() {
  console.log("Seeding FINISH LINE kanji batch to exceed 2000...");

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
