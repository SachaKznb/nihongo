import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final batch to reach 2000+ kanji - need ~200 more
const kanjiData = [
  // Common kanji that might be missing
  { character: "欧", meaningsFr: ["Europe"], readingsOn: ["オウ"], readingsKun: [], meaningMnemonicFr: "L'eau qui manque = EUROPE.", readingMnemonicFr: "OU - Europe.", levelId: 41 },
  { character: "豪", meaningsFr: ["Magnifique"], readingsOn: ["ゴウ"], readingsKun: [], meaningMnemonicFr: "Le haut + le cochon = MAGNIFIQUE.", readingMnemonicFr: "GOU - magnifique.", levelId: 42 },
  { character: "奇", meaningsFr: ["Étrange"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le grand + le peut = ÉTRANGE.", readingMnemonicFr: "KI - étrange.", levelId: 43 },
  { character: "妙", meaningsFr: ["Mystérieux"], readingsOn: ["ミョウ"], readingsKun: [], meaningMnemonicFr: "La femme + le peu = MYSTÉRIEUX.", readingMnemonicFr: "MYOU - mystérieux.", levelId: 44 },
  { character: "怪", meaningsFr: ["Mystère"], readingsOn: ["カイ"], readingsKun: ["あや-しい"], meaningMnemonicFr: "Le cœur + le sol = MYSTÈRE.", readingMnemonicFr: "AYASHII - mystérieux.", levelId: 45 },
  { character: "魔", meaningsFr: ["Magie"], readingsOn: ["マ"], readingsKun: [], meaningMnemonicFr: "Le démon + le chanvre = MAGIE.", readingMnemonicFr: "MA - magie.", levelId: 46 },
  { character: "幽", meaningsFr: ["Obscur"], readingsOn: ["ユウ"], readingsKun: [], meaningMnemonicFr: "La montagne + le petit = OBSCUR.", readingMnemonicFr: "YUU - obscur.", levelId: 47 },
  { character: "妖", meaningsFr: ["Enchantement"], readingsOn: ["ヨウ"], readingsKun: [], meaningMnemonicFr: "La femme + le grand = ENCHANTEMENT.", readingMnemonicFr: "YOU - enchantement.", levelId: 48 },
  { character: "艶", meaningsFr: ["Charme"], readingsOn: ["エン"], readingsKun: ["つや"], meaningMnemonicFr: "Le riche + le couleur = CHARME.", readingMnemonicFr: "EN - charme.", levelId: 49 },
  { character: "麗", meaningsFr: ["Beau"], readingsOn: ["レイ"], readingsKun: ["うるわ-しい"], meaningMnemonicFr: "Le cerf + le double = BEAU.", readingMnemonicFr: "REI - beau.", levelId: 50 },

  // More common verbs
  { character: "頼", meaningsFr: ["Compter sur"], readingsOn: ["ライ"], readingsKun: ["たの-む"], meaningMnemonicFr: "La page + le paquet = COMPTER SUR.", readingMnemonicFr: "TANOMU - demander.", levelId: 51 },
  { character: "賴", meaningsFr: ["Demander"], readingsOn: ["ライ"], readingsKun: ["たの-む"], meaningMnemonicFr: "La coquille + le paquet = DEMANDER.", readingMnemonicFr: "TANOMU - demander.", levelId: 52 },
  { character: "頑", meaningsFr: ["Obstiné"], readingsOn: ["ガン"], readingsKun: [], meaningMnemonicFr: "L'origine + la page = OBSTINÉ.", readingMnemonicFr: "GAN - obstiné.", levelId: 53 },
  { character: "堪", meaningsFr: ["Endurer"], readingsOn: ["カン"], readingsKun: ["た-える"], meaningMnemonicFr: "La terre + le très = ENDURER.", readingMnemonicFr: "TAERU - endurer.", levelId: 54 },
  { character: "耐", meaningsFr: ["Résister"], readingsOn: ["タイ"], readingsKun: ["た-える"], meaningMnemonicFr: "L'oreille + le pouce = RÉSISTER.", readingMnemonicFr: "TAERU - résister.", levelId: 55 },
  { character: "忍", meaningsFr: ["Endurer"], readingsOn: ["ニン"], readingsKun: ["しの-ぶ"], meaningMnemonicFr: "La lame + le cœur = ENDURER.", readingMnemonicFr: "SHINOBU - endurer.", levelId: 56 },
  { character: "耕", meaningsFr: ["Cultiver"], readingsOn: ["コウ"], readingsKun: ["たがや-す"], meaningMnemonicFr: "La charrue + le puits = CULTIVER.", readingMnemonicFr: "TAGAYASU - cultiver.", levelId: 57 },
  { character: "稼", meaningsFr: ["Gagner"], readingsOn: ["カ"], readingsKun: ["かせ-ぐ"], meaningMnemonicFr: "Le riz + la maison = GAGNER.", readingMnemonicFr: "KASEGU - gagner.", levelId: 58 },
  { character: "儲", meaningsFr: ["Profit"], readingsOn: ["チョ"], readingsKun: ["もう-ける"], meaningMnemonicFr: "La personne + le remarquable = PROFIT.", readingMnemonicFr: "MOUKERU - profiter.", levelId: 59 },
  { character: "蓄", meaningsFr: ["Accumuler"], readingsOn: ["チク"], readingsKun: ["たくわ-える"], meaningMnemonicFr: "La plante + le bétail = ACCUMULER.", readingMnemonicFr: "TAKUWAERU - accumuler.", levelId: 60 },

  // Emotions and states
  { character: "惨", meaningsFr: ["Misérable"], readingsOn: ["サン"], readingsKun: ["みじ-め"], meaningMnemonicFr: "Le cœur + le participer = MISÉRABLE.", readingMnemonicFr: "MIJIME - misérable.", levelId: 41 },
  { character: "悼", meaningsFr: ["Pleurer"], readingsOn: ["トウ"], readingsKun: ["いた-む"], meaningMnemonicFr: "Le cœur + le frapper = PLEURER.", readingMnemonicFr: "ITAMU - pleurer.", levelId: 42 },
  { character: "慰", meaningsFr: ["Consoler"], readingsOn: ["イ"], readingsKun: ["なぐさ-める"], meaningMnemonicFr: "Le cœur + le terminer = CONSOLER.", readingMnemonicFr: "NAGUSAME - consoler.", levelId: 43 },
  { character: "励", meaningsFr: ["Encourager"], readingsOn: ["レイ"], readingsKun: ["はげ-ます"], meaningMnemonicFr: "La force + le strict = ENCOURAGER.", readingMnemonicFr: "HAGEMASU - encourager.", levelId: 44 },
  { character: "奮", meaningsFr: ["S'efforcer"], readingsOn: ["フン"], readingsKun: ["ふる-う"], meaningMnemonicFr: "Le grand + l'oiseau + le champ = S'EFFORCER.", readingMnemonicFr: "FURUU - s'efforcer.", levelId: 45 },
  { character: "闘", meaningsFr: ["Lutter"], readingsOn: ["トウ"], readingsKun: ["たたか-う"], meaningMnemonicFr: "La porte + le haricot = LUTTER.", readingMnemonicFr: "TATAKAU - lutter.", levelId: 46 },
  { character: "挑", meaningsFr: ["Défier"], readingsOn: ["チョウ"], readingsKun: ["いど-む"], meaningMnemonicFr: "La main + le signe = DÉFIER.", readingMnemonicFr: "IDOMU - défier.", levelId: 47 },
  { character: "克", meaningsFr: ["Surmonter"], readingsOn: ["コク"], readingsKun: [], meaningMnemonicFr: "Le dix + les mains = SURMONTER.", readingMnemonicFr: "KOKU - surmonter.", levelId: 48 },
  { character: "征", meaningsFr: ["Conquérir"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "La marche + le correct = CONQUÉRIR.", readingMnemonicFr: "SEI - conquérir.", levelId: 49 },
  { character: "討", meaningsFr: ["Attaquer"], readingsOn: ["トウ"], readingsKun: ["う-つ"], meaningMnemonicFr: "Les mots + le pouce = ATTAQUER.", readingMnemonicFr: "UTSU - attaquer.", levelId: 50 },

  // More unique kanji
  { character: "栄", meaningsFr: ["Gloire"], readingsOn: ["エイ"], readingsKun: ["さか-える"], meaningMnemonicFr: "Le bois + le feu = GLOIRE.", readingMnemonicFr: "SAKAERU - prospérer.", levelId: 51 },
  { character: "誇", meaningsFr: ["Se vanter"], readingsOn: ["コ"], readingsKun: ["ほこ-る"], meaningMnemonicFr: "Les mots + le grand = SE VANTER.", readingMnemonicFr: "HOKORU - se vanter.", levelId: 52 },
  { character: "威", meaningsFr: ["Dignité"], readingsOn: ["イ"], readingsKun: [], meaningMnemonicFr: "La femme + le lance = DIGNITÉ.", readingMnemonicFr: "I - dignité.", levelId: 53 },
  { character: "厳", meaningsFr: ["Sévère"], readingsOn: ["ゲン"], readingsKun: ["きび-しい"], meaningMnemonicFr: "La falaise + les oreilles = SÉVÈRE.", readingMnemonicFr: "KIBISHII - sévère.", levelId: 54 },
  { character: "粛", meaningsFr: ["Solennel"], readingsOn: ["シュク"], readingsKun: [], meaningMnemonicFr: "Le riz + les mains = SOLENNEL.", readingMnemonicFr: "SHUKU - solennel.", levelId: 55 },
  { character: "慎", meaningsFr: ["Prudent"], readingsOn: ["シン"], readingsKun: ["つつし-む"], meaningMnemonicFr: "Le cœur + le vrai = PRUDENT.", readingMnemonicFr: "TSUTSUSHIMU - être prudent.", levelId: 56 },
  { character: "謹", meaningsFr: ["Respectueux"], readingsOn: ["キン"], readingsKun: ["つつし-む"], meaningMnemonicFr: "Les mots + le difficile = RESPECTUEUX.", readingMnemonicFr: "KIN - respectueux.", levelId: 57 },
  { character: "敬", meaningsFr: ["Respecter"], readingsOn: ["ケイ"], readingsKun: ["うやま-う"], meaningMnemonicFr: "Le mouton + le frapper = RESPECTER.", readingMnemonicFr: "UYAMAU - respecter.", levelId: 58 },
  { character: "尊", meaningsFr: ["Honorer"], readingsOn: ["ソン"], readingsKun: ["とうと-い"], meaningMnemonicFr: "Le jarre + le pouce = HONORER.", readingMnemonicFr: "TOUTOI - honorable.", levelId: 59 },
  { character: "崇", meaningsFr: ["Vénérer"], readingsOn: ["スウ"], readingsKun: [], meaningMnemonicFr: "La montagne + le culte = VÉNÉRER.", readingMnemonicFr: "SUU - vénérer.", levelId: 60 },

  // Common abstract concepts
  { character: "諸", meaningsFr: ["Divers"], readingsOn: ["ショ"], readingsKun: ["もろ"], meaningMnemonicFr: "Les mots + le chef = DIVERS.", readingMnemonicFr: "MORO - divers.", levelId: 41 },
  { character: "般", meaningsFr: ["Général"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "Le bateau + le frapper = GÉNÉRAL.", readingMnemonicFr: "HAN - général.", levelId: 42 },
  { character: "該", meaningsFr: ["Concerné"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "Les mots + le sanglier = CONCERNÉ.", readingMnemonicFr: "GAI - concerné.", levelId: 43 },
  { character: "款", meaningsFr: ["Article"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le bois + le manque = ARTICLE.", readingMnemonicFr: "KAN - article.", levelId: 44 },
  { character: "項", meaningsFr: ["Article"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "Le travail + la page = ARTICLE.", readingMnemonicFr: "KOU - article.", levelId: 45 },
  { character: "条", meaningsFr: ["Article"], readingsOn: ["ジョウ"], readingsKun: [], meaningMnemonicFr: "Le bois + le frapper = ARTICLE.", readingMnemonicFr: "JOU - article.", levelId: 46 },
  { character: "綱", meaningsFr: ["Corde"], readingsOn: ["コウ"], readingsKun: ["つな"], meaningMnemonicFr: "Le fil + le colline = CORDE.", readingMnemonicFr: "TSUNA - corde.", levelId: 47 },
  { character: "領", meaningsFr: ["Territoire"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "L'ordre + la page = TERRITOIRE.", readingMnemonicFr: "RYOU - territoire.", levelId: 48 },
  { character: "域", meaningsFr: ["Domaine"], readingsOn: ["イキ"], readingsKun: [], meaningMnemonicFr: "La terre + le ou = DOMAINE.", readingMnemonicFr: "IKI - domaine.", levelId: 49 },
  { character: "範", meaningsFr: ["Modèle"], readingsOn: ["ハン"], readingsKun: [], meaningMnemonicFr: "Le bambou + le voiture = MODÈLE.", readingMnemonicFr: "HAN - modèle.", levelId: 50 },

  // More kanji
  { character: "疾", meaningsFr: ["Maladie"], readingsOn: ["シツ"], readingsKun: [], meaningMnemonicFr: "Le lit + la flèche = MALADIE.", readingMnemonicFr: "SHITSU - maladie.", levelId: 51 },
  { character: "患", meaningsFr: ["Souffrir"], readingsOn: ["カン"], readingsKun: ["わずら-う"], meaningMnemonicFr: "La lance + le cœur = SOUFFRIR.", readingMnemonicFr: "WAZURAU - souffrir.", levelId: 52 },
  { character: "癒", meaningsFr: ["Guérir"], readingsOn: ["ユ"], readingsKun: ["い-える"], meaningMnemonicFr: "Le lit + le surplus = GUÉRIR.", readingMnemonicFr: "IERU - guérir.", levelId: 53 },
  { character: "療", meaningsFr: ["Traiter"], readingsOn: ["リョウ"], readingsKun: [], meaningMnemonicFr: "Le lit + le bon = TRAITER.", readingMnemonicFr: "RYOU - traiter.", levelId: 54 },
  { character: "瘍", meaningsFr: ["Ulcère"], readingsOn: ["ヨウ"], readingsKun: [], meaningMnemonicFr: "Le lit + le soleil = ULCÈRE.", readingMnemonicFr: "YOU - ulcère.", levelId: 55 },
  { character: "痘", meaningsFr: ["Variole"], readingsOn: ["トウ"], readingsKun: [], meaningMnemonicFr: "Le lit + le haricot = VARIOLE.", readingMnemonicFr: "TOU - variole.", levelId: 56 },
  { character: "痢", meaningsFr: ["Diarrhée"], readingsOn: ["リ"], readingsKun: [], meaningMnemonicFr: "Le lit + le profit = DIARRHÉE.", readingMnemonicFr: "RI - diarrhée.", levelId: 57 },
  { character: "痴", meaningsFr: ["Stupide"], readingsOn: ["チ"], readingsKun: [], meaningMnemonicFr: "Le lit + le savoir = STUPIDE.", readingMnemonicFr: "CHI - stupide.", levelId: 58 },
  { character: "痺", meaningsFr: ["Engourdissement"], readingsOn: ["ヒ"], readingsKun: ["しび-れる"], meaningMnemonicFr: "Le lit + la peau = ENGOURDISSEMENT.", readingMnemonicFr: "SHIBIRERU - s'engourdir.", levelId: 59 },
  { character: "痩", meaningsFr: ["Maigrir"], readingsOn: ["ソウ"], readingsKun: ["や-せる"], meaningMnemonicFr: "Le lit + le rare = MAIGRIR.", readingMnemonicFr: "YASERU - maigrir.", levelId: 60 },

  // Additional unique kanji
  { character: "鎮", meaningsFr: ["Calmer"], readingsOn: ["チン"], readingsKun: ["しず-める"], meaningMnemonicFr: "Le métal + le vrai = CALMER.", readingMnemonicFr: "SHIZUMERU - calmer.", levelId: 41 },
  { character: "鍵", meaningsFr: ["Clé"], readingsOn: ["ケン"], readingsKun: ["かぎ"], meaningMnemonicFr: "Le métal + le construire = CLÉ.", readingMnemonicFr: "KAGI - clé.", levelId: 42 },
  { character: "銃", meaningsFr: ["Fusil"], readingsOn: ["ジュウ"], readingsKun: [], meaningMnemonicFr: "Le métal + le plein = FUSIL.", readingMnemonicFr: "JUU - fusil.", levelId: 43 },
  { character: "砲", meaningsFr: ["Canon"], readingsOn: ["ホウ"], readingsKun: [], meaningMnemonicFr: "La pierre + l'enveloppe = CANON.", readingMnemonicFr: "HOU - canon.", levelId: 44 },
  { character: "弾", meaningsFr: ["Balle"], readingsOn: ["ダン"], readingsKun: ["たま"], meaningMnemonicFr: "L'arc + l'unique = BALLE.", readingMnemonicFr: "TAMA - balle.", levelId: 45 },
  { character: "爆", meaningsFr: ["Exploser"], readingsOn: ["バク"], readingsKun: [], meaningMnemonicFr: "Le feu + le violent = EXPLOSER.", readingMnemonicFr: "BAKU - exploser.", levelId: 46 },
  { character: "炸", meaningsFr: ["Éclater"], readingsOn: ["サク"], readingsKun: [], meaningMnemonicFr: "Le feu + le hier = ÉCLATER.", readingMnemonicFr: "SAKU - éclater.", levelId: 47 },
  { character: "燃", meaningsFr: ["Brûler"], readingsOn: ["ネン"], readingsKun: ["も-える"], meaningMnemonicFr: "Le feu + le ainsi = BRÛLER.", readingMnemonicFr: "MOERU - brûler.", levelId: 48 },
  { character: "焔", meaningsFr: ["Flamme"], readingsOn: ["エン"], readingsKun: ["ほのお"], meaningMnemonicFr: "Le feu + la bouche = FLAMME.", readingMnemonicFr: "HONOO - flamme.", levelId: 49 },
  { character: "熾", meaningsFr: ["Ardent"], readingsOn: ["シ"], readingsKun: ["さか-ん"], meaningMnemonicFr: "Le feu + le cérémonie = ARDENT.", readingMnemonicFr: "SAKAN - ardent.", levelId: 50 },

  // Final stretch
  { character: "灯", meaningsFr: ["Lampe"], readingsOn: ["トウ"], readingsKun: ["ひ"], meaningMnemonicFr: "Le feu + le pas = LAMPE.", readingMnemonicFr: "HI - lampe.", levelId: 51 },
  { character: "炉", meaningsFr: ["Fourneau"], readingsOn: ["ロ"], readingsKun: [], meaningMnemonicFr: "Le feu + le maison = FOURNEAU.", readingMnemonicFr: "RO - fourneau.", levelId: 52 },
  { character: "烹", meaningsFr: ["Bouillir"], readingsOn: ["ホウ"], readingsKun: ["に-る"], meaningMnemonicFr: "Le feu + le agréable = BOUILLIR.", readingMnemonicFr: "NIU - bouillir.", levelId: 53 },
  { character: "煎", meaningsFr: ["Griller"], readingsOn: ["セン"], readingsKun: ["い-る"], meaningMnemonicFr: "Le feu + le devant = GRILLER.", readingMnemonicFr: "IRU - griller.", levelId: 54 },
  { character: "煮", meaningsFr: ["Mijoter"], readingsOn: ["シャ"], readingsKun: ["に-る"], meaningMnemonicFr: "Le feu + le chef = MIJOTER.", readingMnemonicFr: "NIRU - mijoter.", levelId: 55 },
  { character: "蒸", meaningsFr: ["Vapeur"], readingsOn: ["ジョウ"], readingsKun: ["む-す"], meaningMnemonicFr: "La plante + le château = VAPEUR.", readingMnemonicFr: "MUSU - cuire vapeur.", levelId: 56 },
  { character: "焼", meaningsFr: ["Rôtir"], readingsOn: ["ショウ"], readingsKun: ["や-く"], meaningMnemonicFr: "Le feu + le soir = RÔTIR.", readingMnemonicFr: "YAKU - rôtir.", levelId: 57 },
  { character: "炒", meaningsFr: ["Faire sauter"], readingsOn: ["ソウ"], readingsKun: ["いた-める"], meaningMnemonicFr: "Le feu + le peu = FAIRE SAUTER.", readingMnemonicFr: "ITAMERU - sauter.", levelId: 58 },
  { character: "揚", meaningsFr: ["Frire"], readingsOn: ["ヨウ"], readingsKun: ["あ-げる"], meaningMnemonicFr: "La main + le soleil = FRIRE.", readingMnemonicFr: "AGERU - frire.", levelId: 59 },
  { character: "漬", meaningsFr: ["Mariner"], readingsOn: ["シ"], readingsKun: ["つ-ける"], meaningMnemonicFr: "L'eau + le responsable = MARINER.", readingMnemonicFr: "TSUKERU - mariner.", levelId: 60 },

  // Additional common kanji
  { character: "碁", meaningsFr: ["Go"], readingsOn: ["ゴ"], readingsKun: [], meaningMnemonicFr: "La pierre + le un + la base = GO.", readingMnemonicFr: "GO - go.", levelId: 41 },
  { character: "棋", meaningsFr: ["Échecs"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le bois + le un + base = ÉCHECS.", readingMnemonicFr: "KI - échecs.", levelId: 42 },
  { character: "將", meaningsFr: ["Général"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Le toit + le pouce = GÉNÉRAL.", readingMnemonicFr: "SHOU - général.", levelId: 43 },
  { character: "駒", meaningsFr: ["Pion"], readingsOn: ["ク"], readingsKun: ["こま"], meaningMnemonicFr: "Le cheval + le phrase = PION.", readingMnemonicFr: "KOMA - pion.", levelId: 44 },
  { character: "盤", meaningsFr: ["Plateau"], readingsOn: ["バン"], readingsKun: [], meaningMnemonicFr: "Le général + le récipient = PLATEAU.", readingMnemonicFr: "BAN - plateau.", levelId: 45 },
  { character: "拳", meaningsFr: ["Poing"], readingsOn: ["ケン"], readingsKun: ["こぶし"], meaningMnemonicFr: "Les mains + la main = POING.", readingMnemonicFr: "KOBUSHI - poing.", levelId: 46 },
  { character: "柔", meaningsFr: ["Souple"], readingsOn: ["ジュウ"], readingsKun: ["やわ-らかい"], meaningMnemonicFr: "Le lance + le bois = SOUPLE.", readingMnemonicFr: "YAWARAKAI - souple.", levelId: 47 },
  { character: "剛", meaningsFr: ["Robuste"], readingsOn: ["ゴウ"], readingsKun: [], meaningMnemonicFr: "Le colline + le couteau = ROBUSTE.", readingMnemonicFr: "GOU - robuste.", levelId: 48 },
  { character: "軟", meaningsFr: ["Mou"], readingsOn: ["ナン"], readingsKun: ["やわ-らかい"], meaningMnemonicFr: "La voiture + le manque = MOU.", readingMnemonicFr: "YAWARAKAI - mou.", levelId: 49 },
  { character: "硬", meaningsFr: ["Dur"], readingsOn: ["コウ"], readingsKun: ["かた-い"], meaningMnemonicFr: "La pierre + le changer = DUR.", readingMnemonicFr: "KATAI - dur.", levelId: 50 },
];

async function main() {
  console.log("Seeding final kanji batch 5 to exceed 2000...");

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
