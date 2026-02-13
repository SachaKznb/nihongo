import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Large final batch of unique kanji
const kanjiData = [
  // Emotions and mind - unique characters
  { character: "鬱", meaningsFr: ["Dépression"], readingsOn: ["ウツ"], readingsKun: [], meaningMnemonicFr: "Les arbres denses = DÉPRESSION.", readingMnemonicFr: "UTSU - dépression.", levelId: 56 },
  { character: "憂", meaningsFr: ["Inquiétude"], readingsOn: ["ユウ"], readingsKun: ["うれ-い"], meaningMnemonicFr: "Le cœur qui s'inquiète = INQUIÉTUDE.", readingMnemonicFr: "UREI - inquiétude.", levelId: 57 },
  { character: "焦", meaningsFr: ["Anxiété"], readingsOn: ["ショウ"], readingsKun: ["あせ-る"], meaningMnemonicFr: "Le feu sur l'oiseau = ANXIÉTÉ.", readingMnemonicFr: "ASERU - s'angoisser.", levelId: 58 },
  { character: "懸", meaningsFr: ["Suspendre"], readingsOn: ["ケン"], readingsKun: ["か-かる"], meaningMnemonicFr: "Le cœur suspendu = SUSPENDRE.", readingMnemonicFr: "KAKARU - être suspendu.", levelId: 59 },
  { character: "慄", meaningsFr: ["Frissonner"], readingsOn: ["リツ"], readingsKun: ["おのの-く"], meaningMnemonicFr: "Le cœur + le châtaignier = FRISSONNER.", readingMnemonicFr: "ONONOKU - frissonner.", levelId: 60 },

  // Food and cooking
  { character: "炊", meaningsFr: ["Cuire le riz"], readingsOn: ["スイ"], readingsKun: ["た-く"], meaningMnemonicFr: "Le feu + le manque = CUIRE LE RIZ.", readingMnemonicFr: "TAKU - cuire.", levelId: 41 },
  { character: "菓", meaningsFr: ["Confiserie"], readingsOn: ["カ"], readingsKun: [], meaningMnemonicFr: "La plante + le fruit = CONFISERIE.", readingMnemonicFr: "KA - confiserie.", levelId: 42 },
  { character: "餌", meaningsFr: ["Appât"], readingsOn: ["ジ"], readingsKun: ["えさ"], meaningMnemonicFr: "La nourriture + les oreilles = APPÂT.", readingMnemonicFr: "ESA - appât.", levelId: 43 },
  { character: "飢", meaningsFr: ["Famine"], readingsOn: ["キ"], readingsKun: ["う-える"], meaningMnemonicFr: "La nourriture + quelques = FAMINE.", readingMnemonicFr: "UERU - avoir faim.", levelId: 44 },
  { character: "飽", meaningsFr: ["Rassasié"], readingsOn: ["ホウ"], readingsKun: ["あ-きる"], meaningMnemonicFr: "La nourriture + l'enveloppe = RASSASIÉ.", readingMnemonicFr: "AKIRU - en avoir assez.", levelId: 45 },

  // Nature
  { character: "渓", meaningsFr: ["Ruisseau"], readingsOn: ["ケイ"], readingsKun: [], meaningMnemonicFr: "L'eau + le bâton = RUISSEAU.", readingMnemonicFr: "KEI - ruisseau.", levelId: 46 },
  { character: "瀬", meaningsFr: ["Rapide"], readingsOn: ["ライ"], readingsKun: ["せ"], meaningMnemonicFr: "L'eau + le bonheur = RAPIDE.", readingMnemonicFr: "SE - rapide.", levelId: 47 },
  { character: "澄", meaningsFr: ["Limpide"], readingsOn: ["チョウ"], readingsKun: ["す-む"], meaningMnemonicFr: "L'eau + le monter = LIMPIDE.", readingMnemonicFr: "SUMU - devenir limpide.", levelId: 48 },
  { character: "濁", meaningsFr: ["Trouble"], readingsOn: ["ダク"], readingsKun: ["にご-る"], meaningMnemonicFr: "L'eau + l'insecte = TROUBLE.", readingMnemonicFr: "NIGORU - devenir trouble.", levelId: 49 },
  { character: "湧", meaningsFr: ["Jaillir"], readingsOn: ["ユウ"], readingsKun: ["わ-く"], meaningMnemonicFr: "L'eau + la force = JAILLIR.", readingMnemonicFr: "WAKU - jaillir.", levelId: 50 },

  // More nature
  { character: "峰", meaningsFr: ["Sommet"], readingsOn: ["ホウ"], readingsKun: ["みね"], meaningMnemonicFr: "La montagne + l'abeille = SOMMET.", readingMnemonicFr: "MINE - sommet.", levelId: 51 },
  { character: "嶺", meaningsFr: ["Crête"], readingsOn: ["レイ"], readingsKun: [], meaningMnemonicFr: "La montagne + l'ordre = CRÊTE.", readingMnemonicFr: "REI - crête.", levelId: 52 },
  { character: "崩", meaningsFr: ["S'effondrer"], readingsOn: ["ホウ"], readingsKun: ["くず-れる"], meaningMnemonicFr: "La montagne + l'ami = S'EFFONDRER.", readingMnemonicFr: "KUZURERU - s'effondrer.", levelId: 53 },
  { character: "崇", meaningsFr: ["Vénérer"], readingsOn: ["スウ"], readingsKun: ["あが-める"], meaningMnemonicFr: "La montagne + le culte = VÉNÉRER.", readingMnemonicFr: "AGAMERU - vénérer.", levelId: 54 },
  { character: "巌", meaningsFr: ["Rocher"], readingsOn: ["ガン"], readingsKun: ["いわお"], meaningMnemonicFr: "La montagne + la stricte = ROCHER.", readingMnemonicFr: "IWAO - rocher.", levelId: 55 },

  // Animals
  { character: "獣", meaningsFr: ["Bête"], readingsOn: ["ジュウ"], readingsKun: ["けもの"], meaningMnemonicFr: "Le chien + la bouche = BÊTE.", readingMnemonicFr: "KEMONO - bête.", levelId: 56 },
  { character: "狩", meaningsFr: ["Chasser"], readingsOn: ["シュ"], readingsKun: ["か-る"], meaningMnemonicFr: "Le chien + le garder = CHASSER.", readingMnemonicFr: "KARU - chasser.", levelId: 57 },
  { character: "獲", meaningsFr: ["Capturer"], readingsOn: ["カク"], readingsKun: ["え-る"], meaningMnemonicFr: "Le chien + le protéger = CAPTURER.", readingMnemonicFr: "ERU - capturer.", levelId: 58 },
  { character: "猟", meaningsFr: ["Chasse"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le chien + le trésor = CHASSE.", readingMnemonicFr: "RYOU - chasse.", levelId: 59 },
  { character: "駆", meaningsFr: ["Galoper"], readingsOn: ["ク"], readingsKun: ["か-ける"], meaningMnemonicFr: "Le cheval + la zone = GALOPER.", readingMnemonicFr: "KAKERU - galoper.", levelId: 60 },

  // More actions
  { character: "踏", meaningsFr: ["Marcher sur"], readingsOn: ["トウ"], readingsKun: ["ふ-む"], meaningMnemonicFr: "Le pied + l'eau = MARCHER SUR.", readingMnemonicFr: "FUMU - marcher sur.", levelId: 41 },
  { character: "蹴", meaningsFr: ["Donner un coup de pied"], readingsOn: ["シュウ"], readingsKun: ["け-る"], meaningMnemonicFr: "Le pied + l'emploi = DONNER UN COUP.", readingMnemonicFr: "KERU - donner un coup.", levelId: 42 },
  { character: "跪", meaningsFr: ["S'agenouiller"], readingsOn: ["キ"], readingsKun: ["ひざまず-く"], meaningMnemonicFr: "Le pied + le danger = S'AGENOUILLER.", readingMnemonicFr: "HIZAMAZUKU - s'agenouiller.", levelId: 43 },
  { character: "跨", meaningsFr: ["Enjamber"], readingsOn: ["コ"], readingsKun: ["また-がる"], meaningMnemonicFr: "Le pied + le grand = ENJAMBER.", readingMnemonicFr: "MATAGARU - enjamber.", levelId: 44 },
  { character: "躍", meaningsFr: ["Bondir"], readingsOn: ["ヤク"], readingsKun: ["おど-る"], meaningMnemonicFr: "Le pied + le plume = BONDIR.", readingMnemonicFr: "ODORU - bondir.", levelId: 45 },

  // Communication
  { character: "訴", meaningsFr: ["Accuser"], readingsOn: ["ソ"], readingsKun: ["うった-える"], meaningMnemonicFr: "Les mots + l'arrêt = ACCUSER.", readingMnemonicFr: "UTTAERU - accuser.", levelId: 46 },
  { character: "詫", meaningsFr: ["S'excuser"], readingsOn: ["タ"], readingsKun: ["わ-びる"], meaningMnemonicFr: "Les mots + le domicile = S'EXCUSER.", readingMnemonicFr: "WABIRU - s'excuser.", levelId: 47 },
  { character: "詮", meaningsFr: ["Expliquer"], readingsOn: ["セン"], readingsKun: [], meaningMnemonicFr: "Les mots + la totalité = EXPLIQUER.", readingMnemonicFr: "SEN - expliquer.", levelId: 48 },
  { character: "諫", meaningsFr: ["Remontrer"], readingsOn: ["カン"], readingsKun: ["いさ-める"], meaningMnemonicFr: "Les mots + l'est = REMONTRER.", readingMnemonicFr: "ISAMERU - remontrer.", levelId: 49 },
  { character: "諭", meaningsFr: ["Conseiller"], readingsOn: ["ユ"], readingsKun: ["さと-す"], meaningMnemonicFr: "Les mots + le surplus = CONSEILLER.", readingMnemonicFr: "SATOSU - conseiller.", levelId: 50 },

  // Materials
  { character: "錬", meaningsFr: ["Raffiner"], readingsOn: ["レン"], readingsKun: ["ね-る"], meaningMnemonicFr: "Le métal + l'est = RAFFINER.", readingMnemonicFr: "NERU - raffiner.", levelId: 51 },
  { character: "鍛", meaningsFr: ["Forger"], readingsOn: ["タン"], readingsKun: ["きた-える"], meaningMnemonicFr: "Le métal + la section = FORGER.", readingMnemonicFr: "KITAERU - forger.", levelId: 52 },
  { character: "鋳", meaningsFr: ["Couler"], readingsOn: ["チュウ"], readingsKun: ["い-る"], meaningMnemonicFr: "Le métal + la longévité = COULER.", readingMnemonicFr: "IRU - couler.", levelId: 53 },
  { character: "彫", meaningsFr: ["Sculpter"], readingsOn: ["チョウ"], readingsKun: ["ほ-る"], meaningMnemonicFr: "La lame + le tour = SCULPTER.", readingMnemonicFr: "HORU - sculpter.", levelId: 54 },
  { character: "塑", meaningsFr: ["Modeler"], readingsOn: ["ソ"], readingsKun: [], meaningMnemonicFr: "La terre + le mois = MODELER.", readingMnemonicFr: "SO - modeler.", levelId: 55 },

  // Buildings
  { character: "堅", meaningsFr: ["Solide"], readingsOn: ["ケン"], readingsKun: ["かた-い"], meaningMnemonicFr: "La terre + la main = SOLIDE.", readingMnemonicFr: "KATAI - solide.", levelId: 56 },
  { character: "塀", meaningsFr: ["Clôture"], readingsOn: ["ヘイ"], readingsKun: [], meaningMnemonicFr: "La terre + la combinaison = CLÔTURE.", readingMnemonicFr: "HEI - clôture.", levelId: 57 },
  { character: "塔", meaningsFr: ["Tour"], readingsOn: ["トウ"], readingsKun: [], meaningMnemonicFr: "La terre + les plantes = TOUR.", readingMnemonicFr: "TOU - tour.", levelId: 58 },
  { character: "塚", meaningsFr: ["Tumulus"], readingsOn: ["チョウ"], readingsKun: ["つか"], meaningMnemonicFr: "La terre + le cochon = TUMULUS.", readingMnemonicFr: "TSUKA - tumulus.", levelId: 59 },
  { character: "墓", meaningsFr: ["Tombe"], readingsOn: ["ボ"], readingsKun: ["はか"], meaningMnemonicFr: "La plante + le soleil + la terre = TOMBE.", readingMnemonicFr: "HAKA - tombe.", levelId: 60 },

  // Time concepts
  { character: "暁", meaningsFr: ["Aube"], readingsOn: ["ギョウ"], readingsKun: ["あかつき"], meaningMnemonicFr: "Le soleil + le résumé = AUBE.", readingMnemonicFr: "AKATSUKI - aube.", levelId: 41 },
  { character: "昏", meaningsFr: ["Crépuscule"], readingsOn: ["コン"], readingsKun: [], meaningMnemonicFr: "Le soleil + le mariage = CRÉPUSCULE.", readingMnemonicFr: "KON - crépuscule.", levelId: 42 },
  { character: "宵", meaningsFr: ["Soir"], readingsOn: ["ショウ"], readingsKun: ["よい"], meaningMnemonicFr: "Le toit + le petit = SOIR.", readingMnemonicFr: "YOI - soir.", levelId: 43 },
  { character: "暮", meaningsFr: ["Fin du jour"], readingsOn: ["ボ"], readingsKun: ["く-れる"], meaningMnemonicFr: "La plante + le soleil + le soleil = FIN DU JOUR.", readingMnemonicFr: "KURERU - finir le jour.", levelId: 44 },
  { character: "昔", meaningsFr: ["Autrefois"], readingsOn: ["セキ"], readingsKun: ["むかし"], meaningMnemonicFr: "Le jour + le jour + le jour = AUTREFOIS.", readingMnemonicFr: "MUKASHI - autrefois.", levelId: 45 },

  // Society
  { character: "冠", meaningsFr: ["Couronne"], readingsOn: ["カン"], readingsKun: ["かんむり"], meaningMnemonicFr: "Le toit + l'origine + le pouce = COURONNE.", readingMnemonicFr: "KANMURI - couronne.", levelId: 46 },
  { character: "衣", meaningsFr: ["Vêtement"], readingsOn: ["イ"], readingsKun: ["ころも"], meaningMnemonicFr: "Le VÊTEMENT qui enveloppe.", readingMnemonicFr: "KOROMO - vêtement.", levelId: 47 },
  { character: "裳", meaningsFr: ["Jupe"], readingsOn: ["ショウ"], readingsKun: ["も"], meaningMnemonicFr: "Le vêtement + le constant = JUPE.", readingMnemonicFr: "MO - jupe.", levelId: 48 },
  { character: "袴", meaningsFr: ["Hakama"], readingsOn: ["コ"], readingsKun: ["はかま"], meaningMnemonicFr: "Le vêtement + le grand = HAKAMA.", readingMnemonicFr: "HAKAMA - hakama.", levelId: 49 },
  { character: "襟", meaningsFr: ["Col"], readingsOn: ["キン"], readingsKun: ["えり"], meaningMnemonicFr: "Le vêtement + l'interdiction = COL.", readingMnemonicFr: "ERI - col.", levelId: 50 },

  // More useful kanji
  { character: "雅", meaningsFr: ["Élégant"], readingsOn: ["ガ"], readingsKun: ["みやび"], meaningMnemonicFr: "La dent + l'oiseau = ÉLÉGANT.", readingMnemonicFr: "MIYABI - élégant.", levelId: 51 },
  { character: "粋", meaningsFr: ["Raffiné"], readingsOn: ["スイ"], readingsKun: ["いき"], meaningMnemonicFr: "Le riz + les dix = RAFFINÉ.", readingMnemonicFr: "IKI - raffiné.", levelId: 52 },
  { character: "趣", meaningsFr: ["Goût"], readingsOn: ["シュ"], readingsKun: ["おもむき"], meaningMnemonicFr: "Courir + le prendre = GOÛT.", readingMnemonicFr: "OMOMUKI - goût.", levelId: 53 },
  { character: "艶", meaningsFr: ["Charme"], readingsOn: ["エン"], readingsKun: ["つや"], meaningMnemonicFr: "Le riche + le couleur = CHARME.", readingMnemonicFr: "TSUYA - charme.", levelId: 54 },
  { character: "麗", meaningsFr: ["Beau"], readingsOn: ["レイ"], readingsKun: ["うるわ-しい"], meaningMnemonicFr: "Le cerf + le double = BEAU.", readingMnemonicFr: "URUWASHII - beau.", levelId: 55 },

  // Final batch
  { character: "奏", meaningsFr: ["Jouer (musique)"], readingsOn: ["ソウ"], readingsKun: ["かな-でる"], meaningMnemonicFr: "Le grand + le ciel = JOUER.", readingMnemonicFr: "KANADERU - jouer.", levelId: 56 },
  { character: "舞", meaningsFr: ["Danser"], readingsOn: ["ブ"], readingsKun: ["まい"], meaningMnemonicFr: "Le pas + le rien = DANSER.", readingMnemonicFr: "MAI - danse.", levelId: 57 },
  { character: "踊", meaningsFr: ["Danser"], readingsOn: ["ヨウ"], readingsKun: ["おど-る"], meaningMnemonicFr: "Le pied + le courageux = DANSER.", readingMnemonicFr: "ODORU - danser.", levelId: 58 },
  { character: "歌", meaningsFr: ["Chanson"], readingsOn: ["カ"], readingsKun: ["うた"], meaningMnemonicFr: "Le manque + le peut = CHANSON.", readingMnemonicFr: "UTA - chanson.", levelId: 59 },
  { character: "謡", meaningsFr: ["Chant"], readingsOn: ["ヨウ"], readingsKun: ["うたい"], meaningMnemonicFr: "Les mots + le secouer = CHANT.", readingMnemonicFr: "UTAI - chant.", levelId: 60 },
];

async function main() {
  console.log("Seeding final kanji batch 2...");

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
