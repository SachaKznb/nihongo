import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// More kanji for various levels
const kanjiData = [
  // Basic kanji for levels 1-5
  { character: "足", meaningsFr: ["Pied", "Jambe"], readingsOn: ["ソク"], readingsKun: ["あし"], meaningMnemonicFr: "Le PIED qui marche.", readingMnemonicFr: "ASHI - pied.", levelId: 1 },
  { character: "指", meaningsFr: ["Doigt"], readingsOn: ["シ"], readingsKun: ["ゆび"], meaningMnemonicFr: "La main qui pointe - DOIGT.", readingMnemonicFr: "YUBI - doigt.", levelId: 2 },
  { character: "歯", meaningsFr: ["Dent"], readingsOn: ["シ"], readingsKun: ["は"], meaningMnemonicFr: "La DENT qui mord.", readingMnemonicFr: "HA - dent.", levelId: 3 },
  { character: "舌", meaningsFr: ["Langue"], readingsOn: ["ゼツ"], readingsKun: ["した"], meaningMnemonicFr: "La LANGUE qui goûte.", readingMnemonicFr: "SHITA - langue.", levelId: 4 },
  { character: "爪", meaningsFr: ["Ongle"], readingsOn: ["ソウ"], readingsKun: ["つめ"], meaningMnemonicFr: "L'ONGLE qui griffe.", readingMnemonicFr: "TSUME - ongle.", levelId: 5 },

  // Levels 6-10
  { character: "肌", meaningsFr: ["Peau"], readingsOn: ["キ"], readingsKun: ["はだ"], meaningMnemonicFr: "La chair + quelques = PEAU.", readingMnemonicFr: "HADA - peau.", levelId: 6 },
  { character: "髪", meaningsFr: ["Cheveux"], readingsOn: ["ハツ"], readingsKun: ["かみ"], meaningMnemonicFr: "Les CHEVEUX longs.", readingMnemonicFr: "KAMI - cheveux.", levelId: 7 },
  { character: "眉", meaningsFr: ["Sourcil"], readingsOn: ["ビ"], readingsKun: ["まゆ"], meaningMnemonicFr: "Au-dessus de l'œil - SOURCIL.", readingMnemonicFr: "MAYU - sourcil.", levelId: 8 },
  { character: "顎", meaningsFr: ["Menton"], readingsOn: ["ガク"], readingsKun: ["あご"], meaningMnemonicFr: "La page avec l'accent - MENTON.", readingMnemonicFr: "AGO - menton.", levelId: 9 },
  { character: "腕", meaningsFr: ["Bras"], readingsOn: ["ワン"], readingsKun: ["うで"], meaningMnemonicFr: "La chair + le soir = BRAS.", readingMnemonicFr: "UDE - bras.", levelId: 10 },

  // Levels 11-15 - More nature
  { character: "滝", meaningsFr: ["Cascade"], readingsOn: ["ロウ"], readingsKun: ["たき"], meaningMnemonicFr: "L'eau qui tombe - CASCADE.", readingMnemonicFr: "TAKI - cascade.", levelId: 11 },
  { character: "沼", meaningsFr: ["Marécage"], readingsOn: ["ショウ"], readingsKun: ["ぬま"], meaningMnemonicFr: "L'eau + le petit = MARÉCAGE.", readingMnemonicFr: "NUMA - marécage.", levelId: 12 },
  { character: "崖", meaningsFr: ["Falaise"], readingsOn: ["ガイ"], readingsKun: ["がけ"], meaningMnemonicFr: "La montagne + le sol = FALAISE.", readingMnemonicFr: "GAKE - falaise.", levelId: 13 },
  { character: "洞", meaningsFr: ["Grotte"], readingsOn: ["ドウ"], readingsKun: ["ほら"], meaningMnemonicFr: "L'eau + ensemble = GROTTE.", readingMnemonicFr: "HORA - grotte.", levelId: 14 },
  { character: "峠", meaningsFr: ["Col de montagne"], readingsOn: [], readingsKun: ["とうげ"], meaningMnemonicFr: "La montagne + haut + bas = COL.", readingMnemonicFr: "TOUGE - col.", levelId: 15 },

  // Levels 16-20 - Animals
  { character: "鶴", meaningsFr: ["Grue"], readingsOn: ["カク"], readingsKun: ["つる"], meaningMnemonicFr: "L'oiseau qui danse - GRUE.", readingMnemonicFr: "TSURU - grue.", levelId: 16 },
  { character: "鷹", meaningsFr: ["Faucon"], readingsOn: ["ヨウ"], readingsKun: ["たか"], meaningMnemonicFr: "L'oiseau rapide - FAUCON.", readingMnemonicFr: "TAKA - faucon.", levelId: 17 },
  { character: "鴨", meaningsFr: ["Canard"], readingsOn: ["オウ"], readingsKun: ["かも"], meaningMnemonicFr: "L'oiseau de l'enclos - CANARD.", readingMnemonicFr: "KAMO - canard.", levelId: 18 },
  { character: "雀", meaningsFr: ["Moineau"], readingsOn: ["ジャク"], readingsKun: ["すずめ"], meaningMnemonicFr: "Le petit oiseau - MOINEAU.", readingMnemonicFr: "SUZUME - moineau.", levelId: 19 },
  { character: "烏", meaningsFr: ["Corbeau"], readingsOn: ["ウ"], readingsKun: ["からす"], meaningMnemonicFr: "L'oiseau noir - CORBEAU.", readingMnemonicFr: "KARASU - corbeau.", levelId: 20 },

  // Levels 21-25 - Food
  { character: "餅", meaningsFr: ["Mochi"], readingsOn: ["ヘイ"], readingsKun: ["もち"], meaningMnemonicFr: "La nourriture qui colle - MOCHI.", readingMnemonicFr: "MOCHI - mochi.", levelId: 21 },
  { character: "麺", meaningsFr: ["Nouilles"], readingsOn: ["メン"], readingsKun: [], meaningMnemonicFr: "Le blé + le visage = NOUILLES.", readingMnemonicFr: "MEN - nouilles.", levelId: 22 },
  { character: "醤", meaningsFr: ["Sauce soja"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "L'alcool + le général = SAUCE SOJA.", readingMnemonicFr: "SHOU - sauce.", levelId: 23 },
  { character: "酢", meaningsFr: ["Vinaigre"], readingsOn: ["サク"], readingsKun: ["す"], meaningMnemonicFr: "L'alcool + faire = VINAIGRE.", readingMnemonicFr: "SU - vinaigre.", levelId: 24 },
  { character: "漬", meaningsFr: ["Mariner"], readingsOn: ["シ"], readingsKun: ["つ-ける"], meaningMnemonicFr: "L'eau + le responsable = MARINER.", readingMnemonicFr: "TSUKERU - mariner.", levelId: 25 },

  // Levels 26-30 - Actions
  { character: "抱", meaningsFr: ["Serrer"], readingsOn: ["ホウ"], readingsKun: ["だ-く"], meaningMnemonicFr: "La main qui enveloppe - SERRER.", readingMnemonicFr: "DAKU - serrer.", levelId: 26 },
  { character: "撮", meaningsFr: ["Photographier"], readingsOn: ["サツ"], readingsKun: ["と-る"], meaningMnemonicFr: "La main qui saisit l'oreille - PHOTOGRAPHIER.", readingMnemonicFr: "TORU - photographier.", levelId: 27 },
  { character: "掃", meaningsFr: ["Balayer"], readingsOn: ["ソウ"], readingsKun: ["は-く"], meaningMnemonicFr: "La main qui balaye - BALAYER.", readingMnemonicFr: "HAKU - balayer.", levelId: 28 },
  { character: "拭", meaningsFr: ["Essuyer"], readingsOn: ["ショク"], readingsKun: ["ふ-く"], meaningMnemonicFr: "La main + le style = ESSUYER.", readingMnemonicFr: "FUKU - essuyer.", levelId: 29 },
  { character: "縮", meaningsFr: ["Rétrécir"], readingsOn: ["シュク"], readingsKun: ["ちぢ-む"], meaningMnemonicFr: "Le fil + l'oncle = RÉTRÉCIR.", readingMnemonicFr: "CHIJIMU - rétrécir.", levelId: 30 },

  // Levels 31-35 - More actions
  { character: "伸", meaningsFr: ["Étendre"], readingsOn: ["シン"], readingsKun: ["の-びる"], meaningMnemonicFr: "La personne + la ceinture = ÉTENDRE.", readingMnemonicFr: "NOBIRU - s'étendre.", levelId: 31 },
  { character: "膨", meaningsFr: ["Gonfler"], readingsOn: ["ボウ"], readingsKun: ["ふく-らむ"], meaningMnemonicFr: "La chair + riche = GONFLER.", readingMnemonicFr: "FUKURAMU - gonfler.", levelId: 32 },
  { character: "揺", meaningsFr: ["Secouer"], readingsOn: ["ヨウ"], readingsKun: ["ゆ-れる"], meaningMnemonicFr: "La main + le toit = SECOUER.", readingMnemonicFr: "YURERU - secouer.", levelId: 33 },
  { character: "震", meaningsFr: ["Trembler"], readingsOn: ["シン"], readingsKun: ["ふる-える"], meaningMnemonicFr: "La pluie + le matin = TREMBLER.", readingMnemonicFr: "FURUERU - trembler.", levelId: 34 },
  { character: "沸", meaningsFr: ["Bouillir"], readingsOn: ["フツ"], readingsKun: ["わ-く"], meaningMnemonicFr: "L'eau + l'arc = BOUILLIR.", readingMnemonicFr: "WAKU - bouillir.", levelId: 35 },

  // Levels 36-40 - States
  { character: "凍", meaningsFr: ["Geler"], readingsOn: ["トウ"], readingsKun: ["こお-る"], meaningMnemonicFr: "La glace + l'est = GELER.", readingMnemonicFr: "KOORU - geler.", levelId: 36 },
  { character: "溶", meaningsFr: ["Fondre"], readingsOn: ["ヨウ"], readingsKun: ["と-ける"], meaningMnemonicFr: "L'eau + la vallée = FONDRE.", readingMnemonicFr: "TOKERU - fondre.", levelId: 37 },
  { character: "腐", meaningsFr: ["Pourrir"], readingsOn: ["フ"], readingsKun: ["くさ-る"], meaningMnemonicFr: "La viande dans l'enclos = POURRIR.", readingMnemonicFr: "KUSARU - pourrir.", levelId: 38 },
  { character: "枯", meaningsFr: ["Se faner"], readingsOn: ["コ"], readingsKun: ["か-れる"], meaningMnemonicFr: "L'arbre + ancien = SE FANER.", readingMnemonicFr: "KARERU - se faner.", levelId: 39 },
  { character: "萎", meaningsFr: ["Se flétrir"], readingsOn: ["イ"], readingsKun: ["しぼ-む"], meaningMnemonicFr: "La plante + la femme = SE FLÉTRIR.", readingMnemonicFr: "SHIBOMU - se flétrir.", levelId: 40 },

  // Levels 41-45 - Mind
  { character: "眠", meaningsFr: ["Dormir"], readingsOn: ["ミン"], readingsKun: ["ねむ-る"], meaningMnemonicFr: "L'œil + le peuple = DORMIR.", readingMnemonicFr: "NEMURU - dormir.", levelId: 41 },
  { character: "覚", meaningsFr: ["Se souvenir"], readingsOn: ["カク"], readingsKun: ["おぼ-える"], meaningMnemonicFr: "L'apprentissage + voir = SE SOUVENIR.", readingMnemonicFr: "OBOERU - se souvenir.", levelId: 42 },
  { character: "悟", meaningsFr: ["Réaliser"], readingsOn: ["ゴ"], readingsKun: ["さと-る"], meaningMnemonicFr: "Le cœur + le moi = RÉALISER.", readingMnemonicFr: "SATORU - réaliser.", levelId: 43 },
  { character: "惑", meaningsFr: ["Confondre"], readingsOn: ["ワク"], readingsKun: ["まど-う"], meaningMnemonicFr: "Le cœur + le pays = CONFONDRE.", readingMnemonicFr: "MADOU - se confondre.", levelId: 44 },
  { character: "疑", meaningsFr: ["Douter"], readingsOn: ["ギ"], readingsKun: ["うたが-う"], meaningMnemonicFr: "Le hibou + la flèche = DOUTER.", readingMnemonicFr: "UTAGAU - douter.", levelId: 45 },

  // Levels 46-50 - Communication
  { character: "叫", meaningsFr: ["Crier"], readingsOn: ["キョウ"], readingsKun: ["さけ-ぶ"], meaningMnemonicFr: "La bouche + la règle = CRIER.", readingMnemonicFr: "SAKEBU - crier.", levelId: 46 },
  { character: "囁", meaningsFr: ["Chuchoter"], readingsOn: ["ショウ"], readingsKun: ["ささや-く"], meaningMnemonicFr: "La bouche + les oreilles = CHUCHOTER.", readingMnemonicFr: "SASAYAKU - chuchoter.", levelId: 47 },
  { character: "嘆", meaningsFr: ["Soupirer"], readingsOn: ["タン"], readingsKun: ["なげ-く"], meaningMnemonicFr: "La bouche + difficile = SOUPIRER.", readingMnemonicFr: "NAGEKU - soupirer.", levelId: 48 },
  { character: "呟", meaningsFr: ["Murmurer"], readingsOn: ["ゲン"], readingsKun: ["つぶや-く"], meaningMnemonicFr: "La bouche + le sombre = MURMURER.", readingMnemonicFr: "TSUBUYAKU - murmurer.", levelId: 49 },
  { character: "詠", meaningsFr: ["Réciter"], readingsOn: ["エイ"], readingsKun: ["よ-む"], meaningMnemonicFr: "Les mots + éternel = RÉCITER.", readingMnemonicFr: "YOMU - réciter.", levelId: 50 },

  // Levels 51-55 - Advanced
  { character: "誓", meaningsFr: ["Jurer"], readingsOn: ["セイ"], readingsKun: ["ちか-う"], meaningMnemonicFr: "Les mots + la cassure = JURER.", readingMnemonicFr: "CHIKAU - jurer.", levelId: 51 },
  { character: "祈", meaningsFr: ["Prier"], readingsOn: ["キ"], readingsKun: ["いの-る"], meaningMnemonicFr: "Le dieu + la hache = PRIER.", readingMnemonicFr: "INORU - prier.", levelId: 52 },
  { character: "祝", meaningsFr: ["Célébrer"], readingsOn: ["シュク"], readingsKun: ["いわ-う"], meaningMnemonicFr: "Le dieu + le frère = CÉLÉBRER.", readingMnemonicFr: "IWAU - célébrer.", levelId: 53 },
  { character: "呪", meaningsFr: ["Maudire"], readingsOn: ["ジュ"], readingsKun: ["のろ-う"], meaningMnemonicFr: "La bouche + le frère = MAUDIRE.", readingMnemonicFr: "NOROU - maudire.", levelId: 54 },
  { character: "悔", meaningsFr: ["Regretter"], readingsOn: ["カイ"], readingsKun: ["く-いる"], meaningMnemonicFr: "Le cœur + chaque = REGRETTER.", readingMnemonicFr: "KUIRU - regretter.", levelId: 55 },

  // Levels 56-60 - Final
  { character: "償", meaningsFr: ["Compenser"], readingsOn: ["ショウ"], readingsKun: ["つぐな-う"], meaningMnemonicFr: "La personne + le prix = COMPENSER.", readingMnemonicFr: "TSUGUNAU - compenser.", levelId: 56 },
  { character: "赦", meaningsFr: ["Pardonner"], readingsOn: ["シャ"], readingsKun: [], meaningMnemonicFr: "Pardonner celui qui court = PARDONNER.", readingMnemonicFr: "SHA - pardonner.", levelId: 57 },
  { character: "諭", meaningsFr: ["Conseiller"], readingsOn: ["ユ"], readingsKun: ["さと-す"], meaningMnemonicFr: "Les mots + le surplus = CONSEILLER.", readingMnemonicFr: "SATOSU - conseiller.", levelId: 58 },
  { character: "戒", meaningsFr: ["Avertir"], readingsOn: ["カイ"], readingsKun: ["いまし-める"], meaningMnemonicFr: "Deux lances = AVERTIR.", readingMnemonicFr: "IMASHIMERU - avertir.", levelId: 59 },
  { character: "誉", meaningsFr: ["Gloire"], readingsOn: ["ヨ"], readingsKun: ["ほま-れ"], meaningMnemonicFr: "Les mots qui brillent = GLOIRE.", readingMnemonicFr: "HOMARE - gloire.", levelId: 60 },
];

async function main() {
  console.log("Seeding kanji supplement 11...");

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
