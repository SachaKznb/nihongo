import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// THE 2000 batch - the final 25 kanji to exceed 2000!

const kanjiData = [
  {
    character: "駐",
    meaningsFr: ["stationner", "garer"],
    readingsOn: ["チュウ"],
    readingsKun: [],
    meaningMnemonicFr: "Le cheval 馬 qui s'arrête 主 STATIONNE.",
    readingMnemonicFr: "CHŪ - Le stationnement prolongé.",
    levelId: 45,
  },
  {
    character: "騎",
    meaningsFr: ["monter à cheval", "cavalier"],
    readingsOn: ["キ"],
    readingsKun: [],
    meaningMnemonicFr: "Le cheval 馬 avec l'étrange 奇 forme le CAVALIER.",
    readingMnemonicFr: "KI - Le cavalier monté.",
    levelId: 47,
  },
  {
    character: "験",
    meaningsFr: ["expérience", "tester"],
    readingsOn: ["ケン", "ゲン"],
    readingsKun: [],
    meaningMnemonicFr: "Le cheval 馬 avec le vide 僉 TESTE.",
    readingMnemonicFr: "KEN - L'expérience vécue.",
    levelId: 43,
  },
  {
    character: "騒",
    meaningsFr: ["bruit", "agitation"],
    readingsOn: ["ソウ"],
    readingsKun: ["さわ.ぐ"],
    meaningMnemonicFr: "Le cheval 馬 avec les insectes 蚤 fait du BRUIT.",
    readingMnemonicFr: "SŌ - L'agitation bruyante.",
    levelId: 46,
  },
  {
    character: "骨",
    meaningsFr: ["os", "squelette"],
    readingsOn: ["コツ"],
    readingsKun: ["ほね"],
    meaningMnemonicFr: "Le corps 冎 avec la chair 月 montre l'OS.",
    readingMnemonicFr: "KOTSU - L'os solide.",
    levelId: 44,
  },
  {
    character: "髪",
    meaningsFr: ["cheveux"],
    readingsOn: ["ハツ"],
    readingsKun: ["かみ"],
    meaningMnemonicFr: "Les longs 長 poils 彡 avec l'ami 友 sont les CHEVEUX.",
    readingMnemonicFr: "HATSU - Les cheveux longs.",
    levelId: 46,
  },
  {
    character: "鳴",
    meaningsFr: ["crier", "sonner"],
    readingsOn: ["メイ"],
    readingsKun: ["な.く", "な.る"],
    meaningMnemonicFr: "La bouche 口 de l'oiseau 鳥 CRIE.",
    readingMnemonicFr: "MEI - Le cri de l'oiseau.",
    levelId: 42,
  },
  {
    character: "麗",
    meaningsFr: ["beau", "élégant"],
    readingsOn: ["レイ"],
    readingsKun: ["うるわ.しい"],
    meaningMnemonicFr: "Le cerf 鹿 avec les cornes est BEAU.",
    readingMnemonicFr: "REI - La beauté élégante.",
    levelId: 48,
  },
  {
    character: "黙",
    meaningsFr: ["silence", "se taire"],
    readingsOn: ["モク"],
    readingsKun: ["だま.る"],
    meaningMnemonicFr: "Le noir 黒 avec le chien 犬 garde le SILENCE.",
    readingMnemonicFr: "MOKU - Le silence observé.",
    levelId: 47,
  },
  {
    character: "鼓",
    meaningsFr: ["tambour"],
    readingsOn: ["コ"],
    readingsKun: ["つづみ"],
    meaningMnemonicFr: "Le tambour 壴 avec la main 支 bat le TAMBOUR.",
    readingMnemonicFr: "KO - Le tambour qui résonne.",
    levelId: 49,
  },
  {
    character: "齢",
    meaningsFr: ["âge"],
    readingsOn: ["レイ"],
    readingsKun: ["よわい"],
    meaningMnemonicFr: "Les dents 歯 avec l'ordre 令 montrent l'ÂGE.",
    readingMnemonicFr: "REI - L'âge avancé.",
    levelId: 46,
  },
  {
    character: "龍",
    meaningsFr: ["dragon"],
    readingsOn: ["リュウ", "リョウ"],
    readingsKun: ["たつ"],
    meaningMnemonicFr: "La créature mythique est le DRAGON.",
    readingMnemonicFr: "RYŪ - Le dragon majestueux.",
    levelId: 50,
  },
  {
    character: "互",
    meaningsFr: ["mutuel", "réciproque"],
    readingsOn: ["ゴ"],
    readingsKun: ["たが.い"],
    meaningMnemonicFr: "Les deux parties qui s'échangent sont MUTUELLES.",
    readingMnemonicFr: "GO - La réciprocité.",
    levelId: 43,
  },
  {
    character: "亡",
    meaningsFr: ["mort", "disparu"],
    readingsOn: ["ボウ", "モウ"],
    readingsKun: ["な.い"],
    meaningMnemonicFr: "Le signe qui manque représente la MORT.",
    readingMnemonicFr: "BŌ - La disparition totale.",
    levelId: 41,
  },
  {
    character: "介",
    meaningsFr: ["intermédiaire", "présenter"],
    readingsOn: ["カイ"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 人 entre deux forme l'INTERMÉDIAIRE.",
    readingMnemonicFr: "KAI - La présentation formelle.",
    levelId: 42,
  },
  {
    character: "仰",
    meaningsFr: ["lever les yeux", "respecter"],
    readingsOn: ["ギョウ", "コウ"],
    readingsKun: ["あお.ぐ", "おお.せ"],
    meaningMnemonicFr: "La personne 亻 qui se courbe 卬 LÈVE LES YEUX.",
    readingMnemonicFr: "GYŌ - Le respect montré.",
    levelId: 46,
  },
  {
    character: "伏",
    meaningsFr: ["s'incliner", "cacher"],
    readingsOn: ["フク"],
    readingsKun: ["ふ.せる"],
    meaningMnemonicFr: "La personne 亻 avec le chien 犬 S'INCLINE.",
    readingMnemonicFr: "FUKU - L'inclinaison respectueuse.",
    levelId: 45,
  },
  {
    character: "伯",
    meaningsFr: ["comte", "aîné"],
    readingsOn: ["ハク"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 blanche 白 est un COMTE.",
    readingMnemonicFr: "HAKU - Le titre de comte.",
    levelId: 47,
  },
  {
    character: "伴",
    meaningsFr: ["accompagner"],
    readingsOn: ["ハン", "バン"],
    readingsKun: ["ともな.う"],
    meaningMnemonicFr: "La personne 亻 avec la moitié 半 ACCOMPAGNE.",
    readingMnemonicFr: "HAN - L'accompagnement fidèle.",
    levelId: 44,
  },
  {
    character: "佳",
    meaningsFr: ["excellent", "beau"],
    readingsOn: ["カ"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 qui prend la terre 圭 est EXCELLENTE.",
    readingMnemonicFr: "KA - L'excellence reconnue.",
    levelId: 46,
  },
  {
    character: "侍",
    meaningsFr: ["samouraï", "servir"],
    readingsOn: ["ジ"],
    readingsKun: ["さむらい"],
    meaningMnemonicFr: "La personne 亻 au temple 寺 est un SAMOURAÏ.",
    readingMnemonicFr: "JI - Le samouraï servant.",
    levelId: 45,
  },
  {
    character: "侵",
    meaningsFr: ["envahir", "violer"],
    readingsOn: ["シン"],
    readingsKun: ["おか.す"],
    meaningMnemonicFr: "La personne 亻 qui entre 侵 ENVAHIT.",
    readingMnemonicFr: "SHIN - L'invasion territoriale.",
    levelId: 46,
  },
  {
    character: "侮",
    meaningsFr: ["mépriser", "insulter"],
    readingsOn: ["ブ"],
    readingsKun: ["あなど.る"],
    meaningMnemonicFr: "La personne 亻 chaque 毎 jour MÉPRISE.",
    readingMnemonicFr: "BU - Le mépris affiché.",
    levelId: 48,
  },
  {
    character: "俊",
    meaningsFr: ["talent", "génie"],
    readingsOn: ["シュン"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 qui surpasse 夋 a du TALENT.",
    readingMnemonicFr: "SHUN - Le génie reconnu.",
    levelId: 47,
  },
  {
    character: "俗",
    meaningsFr: ["coutume", "vulgaire"],
    readingsOn: ["ゾク"],
    readingsKun: [],
    meaningMnemonicFr: "La personne 亻 de la vallée 谷 suit la COUTUME.",
    readingMnemonicFr: "ZOKU - La coutume populaire.",
    levelId: 45,
  },
];

async function main() {
  console.log("Seeding THE 2000 kanji batch...");

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
