import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional kanji for levels 41-55 with unique characters and French mnemonics

const kanjiData = [
  // Level 41 - Health
  { character: "医", meaningsFr: ["Médecine"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "Une flèche (矢) dans un enclos - la MÉDECINE qui vise juste.", readingMnemonicFr: "I - le médecin.", levelId: 41 },
  { character: "病", meaningsFr: ["Maladie"], readingsOn: ["ビョウ"], readingsKun: ["やまい"], meaningMnemonicFr: "Le lit (疒) avec un patient - la MALADIE.", readingMnemonicFr: "BYOU - malade.", levelId: 41 },
  { character: "痛", meaningsFr: ["Douleur"], readingsOn: ["ツウ"], readingsKun: ["いた-い"], meaningMnemonicFr: "Le lit (疒) avec passage - la DOULEUR.", readingMnemonicFr: "ITAI - aïe!", levelId: 41 },
  { character: "薬", meaningsFr: ["Médicament"], readingsOn: ["ヤク"], readingsKun: ["くすり"], meaningMnemonicFr: "Plante (艹) qui réjouit (楽) - MÉDICAMENT.", readingMnemonicFr: "KUSURI - remède.", levelId: 41 },

  // Level 42 - Body
  { character: "頭", meaningsFr: ["Tête"], readingsOn: ["トウ", "ズ"], readingsKun: ["あたま"], meaningMnemonicFr: "Haricot (豆) + page (頁) - la TÊTE.", readingMnemonicFr: "ATAMA - tête.", levelId: 42 },
  { character: "首", meaningsFr: ["Cou"], readingsOn: ["シュ"], readingsKun: ["くび"], meaningMnemonicFr: "Le COU qui relie.", readingMnemonicFr: "KUBI - cou.", levelId: 42 },
  { character: "顔", meaningsFr: ["Visage"], readingsOn: ["ガン"], readingsKun: ["かお"], meaningMnemonicFr: "Origine + page - VISAGE.", readingMnemonicFr: "KAO - visage.", levelId: 42 },
  { character: "胸", meaningsFr: ["Poitrine"], readingsOn: ["キョウ"], readingsKun: ["むね"], meaningMnemonicFr: "Chair (月) + danger - POITRINE.", readingMnemonicFr: "MUNE - poitrine.", levelId: 42 },

  // Level 43 - More body
  { character: "腹", meaningsFr: ["Ventre"], readingsOn: ["フク"], readingsKun: ["はら"], meaningMnemonicFr: "Chair qui se replie - VENTRE.", readingMnemonicFr: "HARA - ventre.", levelId: 43 },
  { character: "腰", meaningsFr: ["Hanches"], readingsOn: ["ヨウ"], readingsKun: ["こし"], meaningMnemonicFr: "Chair + important - HANCHES.", readingMnemonicFr: "KOSHI - hanches.", levelId: 43 },
  { character: "背", meaningsFr: ["Dos"], readingsOn: ["ハイ"], readingsKun: ["せ"], meaningMnemonicFr: "Chair au nord - DOS.", readingMnemonicFr: "SE - dos.", levelId: 43 },
  { character: "肩", meaningsFr: ["Épaule"], readingsOn: ["ケン"], readingsKun: ["かた"], meaningMnemonicFr: "Porte sur les ÉPAULES.", readingMnemonicFr: "KATA - épaule.", levelId: 43 },

  // Level 44 - Senses
  { character: "声", meaningsFr: ["Voix"], readingsOn: ["セイ"], readingsKun: ["こえ"], meaningMnemonicFr: "Lettré + oreille - VOIX.", readingMnemonicFr: "KOE - voix.", levelId: 44 },
  { character: "音", meaningsFr: ["Son"], readingsOn: ["オン"], readingsKun: ["おと"], meaningMnemonicFr: "Jour qui se lève - SON.", readingMnemonicFr: "OTO - son.", levelId: 44 },
  { character: "味", meaningsFr: ["Goût"], readingsOn: ["ミ"], readingsKun: ["あじ"], meaningMnemonicFr: "Bouche pas encore - GOÛT.", readingMnemonicFr: "AJI - goût.", levelId: 44 },
  { character: "香", meaningsFr: ["Parfum"], readingsOn: ["コウ"], readingsKun: ["かお-り"], meaningMnemonicFr: "Riz + soleil - PARFUM.", readingMnemonicFr: "KAORI - parfum.", levelId: 44 },

  // Level 45 - Colors
  { character: "色", meaningsFr: ["Couleur"], readingsOn: ["ショク"], readingsKun: ["いろ"], meaningMnemonicFr: "Personne agenouillée - COULEUR.", readingMnemonicFr: "IRO - couleur.", levelId: 45 },
  { character: "赤", meaningsFr: ["Rouge"], readingsOn: ["セキ"], readingsKun: ["あか"], meaningMnemonicFr: "Terre + feu - ROUGE.", readingMnemonicFr: "AKA - rouge.", levelId: 45 },
  { character: "青", meaningsFr: ["Bleu"], readingsOn: ["セイ"], readingsKun: ["あお"], meaningMnemonicFr: "Vie + lune - BLEU.", readingMnemonicFr: "AO - bleu.", levelId: 45 },
  { character: "緑", meaningsFr: ["Vert"], readingsOn: ["リョク"], readingsKun: ["みどり"], meaningMnemonicFr: "Fil + forêt - VERT.", readingMnemonicFr: "MIDORI - vert.", levelId: 45 },

  // Level 46 - More colors
  { character: "白", meaningsFr: ["Blanc"], readingsOn: ["ハク"], readingsKun: ["しろ"], meaningMnemonicFr: "Soleil pur - BLANC.", readingMnemonicFr: "SHIRO - blanc.", levelId: 46 },
  { character: "黒", meaningsFr: ["Noir"], readingsOn: ["コク"], readingsKun: ["くろ"], meaningMnemonicFr: "Terre + feu éteint - NOIR.", readingMnemonicFr: "KURO - noir.", levelId: 46 },
  { character: "黄", meaningsFr: ["Jaune"], readingsOn: ["オウ"], readingsKun: ["き"], meaningMnemonicFr: "Champ mûr - JAUNE.", readingMnemonicFr: "KI - jaune.", levelId: 46 },
  { character: "茶", meaningsFr: ["Thé"], readingsOn: ["チャ"], readingsKun: [], meaningMnemonicFr: "Plante + surplus - THÉ.", readingMnemonicFr: "CHA - thé.", levelId: 46 },

  // Level 47 - Shapes
  { character: "丸", meaningsFr: ["Rond"], readingsOn: ["ガン"], readingsKun: ["まる"], meaningMnemonicFr: "Neuf + point - ROND.", readingMnemonicFr: "MARU - rond.", levelId: 47 },
  { character: "角", meaningsFr: ["Angle"], readingsOn: ["カク"], readingsKun: ["かど"], meaningMnemonicFr: "Corne avec angles - ANGLE.", readingMnemonicFr: "KADO - angle.", levelId: 47 },
  { character: "線", meaningsFr: ["Ligne"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "Fil + source - LIGNE.", readingMnemonicFr: "SEN - ligne.", levelId: 47 },
  { character: "点", meaningsFr: ["Point"], readingsOn: ["テン"], readingsKun: [], meaningMnemonicFr: "Devin + feu - POINT.", readingMnemonicFr: "TEN - point.", levelId: 47 },

  // Level 48 - Quantities
  { character: "数", meaningsFr: ["Nombre"], readingsOn: ["スウ"], readingsKun: ["かず"], meaningMnemonicFr: "Riz compté - NOMBRE.", readingMnemonicFr: "KAZU - nombre.", levelId: 48 },
  { character: "量", meaningsFr: ["Quantité"], readingsOn: ["リョウ"], readingsKun: ["はか-る"], meaningMnemonicFr: "Jour + village - QUANTITÉ.", readingMnemonicFr: "RYOU - quantité.", levelId: 48 },
  { character: "半", meaningsFr: ["Moitié"], readingsOn: ["ハン"], readingsKun: ["なか-ば"], meaningMnemonicFr: "Bœuf coupé - MOITIÉ.", readingMnemonicFr: "HAN - moitié.", levelId: 48 },
  { character: "全", meaningsFr: ["Tout"], readingsOn: ["ゼン"], readingsKun: ["まった-く"], meaningMnemonicFr: "Toit sur roi - TOUT.", readingMnemonicFr: "ZEN - tout.", levelId: 48 },

  // Level 49 - Actions
  { character: "落", meaningsFr: ["Tomber"], readingsOn: ["ラク"], readingsKun: ["お-ちる"], meaningMnemonicFr: "Plante + eau + chaque - TOMBER.", readingMnemonicFr: "OCHIRU - tomber.", levelId: 49 },
  { character: "持", meaningsFr: ["Tenir"], readingsOn: ["ジ"], readingsKun: ["も-つ"], meaningMnemonicFr: "Main + temple - TENIR.", readingMnemonicFr: "MOTSU - tenir.", levelId: 49 },
  { character: "届", meaningsFr: ["Livrer"], readingsOn: [], readingsKun: ["とど-く"], meaningMnemonicFr: "Corps + sortir - LIVRER.", readingMnemonicFr: "TODOKU - livrer.", levelId: 49 },
  { character: "届", meaningsFr: ["Atteindre"], readingsOn: [], readingsKun: ["とど-ける"], meaningMnemonicFr: "ATTEINDRE destination.", readingMnemonicFr: "TODOKERU - atteindre.", levelId: 49 },

  // Level 50 - Concepts
  { character: "終", meaningsFr: ["Fin"], readingsOn: ["シュウ"], readingsKun: ["お-わる"], meaningMnemonicFr: "Fil + hiver - FIN.", readingMnemonicFr: "OWARU - finir.", levelId: 50 },
  { character: "始", meaningsFr: ["Début"], readingsOn: ["シ"], readingsKun: ["はじ-める"], meaningMnemonicFr: "Femme + enclos - DÉBUT.", readingMnemonicFr: "HAJIMERU - commencer.", levelId: 50 },
  { character: "中", meaningsFr: ["Milieu"], readingsOn: ["チュウ"], readingsKun: ["なか"], meaningMnemonicFr: "Ligne qui traverse - MILIEU.", readingMnemonicFr: "NAKA - milieu.", levelId: 50 },
  { character: "部", meaningsFr: ["Partie"], readingsOn: ["ブ"], readingsKun: [], meaningMnemonicFr: "Ville + debout - PARTIE.", readingMnemonicFr: "BU - section.", levelId: 50 },

  // Level 51-55 - Advanced concepts
  { character: "精", meaningsFr: ["Essence"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "Riz + bleu - ESSENCE.", readingMnemonicFr: "SEI - essence.", levelId: 51 },
  { character: "形", meaningsFr: ["Forme"], readingsOn: ["ケイ"], readingsKun: ["かた"], meaningMnemonicFr: "Traits qui forment - FORME.", readingMnemonicFr: "KATA - forme.", levelId: 51 },
  { character: "性", meaningsFr: ["Nature"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "Cœur + vie - NATURE.", readingMnemonicFr: "SEI - nature.", levelId: 51 },
  { character: "理", meaningsFr: ["Raison"], readingsOn: ["リ"], readingsKun: [], meaningMnemonicFr: "Roi + village - RAISON.", readingMnemonicFr: "RI - raison.", levelId: 51 },
  { character: "真", meaningsFr: ["Vérité"], readingsOn: ["シン"], readingsKun: ["ま"], meaningMnemonicFr: "Dix + yeux - VÉRITÉ.", readingMnemonicFr: "SHIN - vérité.", levelId: 52 },
  { character: "義", meaningsFr: ["Justice"], readingsOn: ["ギ"], readingsKun: [], meaningMnemonicFr: "Mouton + je - JUSTICE.", readingMnemonicFr: "GI - justice.", levelId: 52 },
  { character: "知", meaningsFr: ["Savoir"], readingsOn: ["チ"], readingsKun: ["し-る"], meaningMnemonicFr: "Flèche + bouche - SAVOIR.", readingMnemonicFr: "SHIRU - savoir.", levelId: 53 },
  { character: "徳", meaningsFr: ["Vertu"], readingsOn: ["トク"], readingsKun: [], meaningMnemonicFr: "Marcher + dix + cœur - VERTU.", readingMnemonicFr: "TOKU - vertu.", levelId: 53 },
  { character: "勇", meaningsFr: ["Courage"], readingsOn: ["ユウ"], readingsKun: ["いさ-む"], meaningMnemonicFr: "Homme + force - COURAGE.", readingMnemonicFr: "ISAMU - courage.", levelId: 54 },
  { character: "力", meaningsFr: ["Force"], readingsOn: ["リョク"], readingsKun: ["ちから"], meaningMnemonicFr: "Le bras musclé - FORCE.", readingMnemonicFr: "CHIKARA - force.", levelId: 54 },
  { character: "平", meaningsFr: ["Paix"], readingsOn: ["ヘイ"], readingsKun: ["たい-ら"], meaningMnemonicFr: "Surface plate - PAIX.", readingMnemonicFr: "HEI - paix.", levelId: 55 },
  { character: "和", meaningsFr: ["Harmonie"], readingsOn: ["ワ"], readingsKun: ["やわ-らぐ"], meaningMnemonicFr: "Riz + bouche - HARMONIE.", readingMnemonicFr: "WA - harmonie.", levelId: 55 },
];

async function main() {
  console.log("Seeding additional kanji (part 5 - levels 41-55)...");

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

  console.log(`Seeded ${kanjiData.length} additional kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
