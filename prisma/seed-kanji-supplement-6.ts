import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Kanji for levels 1-10 and 56-60 to balance distribution
const kanjiData = [
  // Level 1 - Basic
  { character: "口", meaningsFr: ["Bouche"], readingsOn: ["コウ"], readingsKun: ["くち"], meaningMnemonicFr: "Un carré ouvert - la BOUCHE qui parle.", readingMnemonicFr: "KUCHI - bouche.", levelId: 1 },
  { character: "目", meaningsFr: ["Œil"], readingsOn: ["モク"], readingsKun: ["め"], meaningMnemonicFr: "Un œil sur le côté - l'ŒIL qui observe.", readingMnemonicFr: "ME - œil.", levelId: 1 },
  { character: "耳", meaningsFr: ["Oreille"], readingsOn: ["ジ"], readingsKun: ["みみ"], meaningMnemonicFr: "La forme de l'OREILLE qui écoute.", readingMnemonicFr: "MIMI - oreille.", levelId: 1 },
  { character: "手", meaningsFr: ["Main"], readingsOn: ["シュ"], readingsKun: ["て"], meaningMnemonicFr: "Les doigts de la MAIN qui saisissent.", readingMnemonicFr: "TE - main.", levelId: 1 },

  // Level 2 - Nature
  { character: "木", meaningsFr: ["Arbre"], readingsOn: ["モク"], readingsKun: ["き"], meaningMnemonicFr: "Un ARBRE avec ses branches et racines.", readingMnemonicFr: "KI - arbre.", levelId: 2 },
  { character: "水", meaningsFr: ["Eau"], readingsOn: ["スイ"], readingsKun: ["みず"], meaningMnemonicFr: "L'EAU qui coule en gouttelettes.", readingMnemonicFr: "MIZU - eau.", levelId: 2 },
  { character: "金", meaningsFr: ["Or", "Argent"], readingsOn: ["キン"], readingsKun: ["かね"], meaningMnemonicFr: "Le métal précieux - OR et ARGENT.", readingMnemonicFr: "KANE - argent.", levelId: 2 },
  { character: "土", meaningsFr: ["Terre"], readingsOn: ["ド"], readingsKun: ["つち"], meaningMnemonicFr: "La TERRE sous nos pieds.", readingMnemonicFr: "TSUCHI - terre.", levelId: 2 },

  // Level 3 - Numbers & Time
  { character: "年", meaningsFr: ["Année"], readingsOn: ["ネン"], readingsKun: ["とし"], meaningMnemonicFr: "L'ANNÉE qui passe comme la moisson.", readingMnemonicFr: "TOSHI - année.", levelId: 3 },
  { character: "週", meaningsFr: ["Semaine"], readingsOn: ["シュウ"], readingsKun: [], meaningMnemonicFr: "Le chemin qui fait le tour - SEMAINE.", readingMnemonicFr: "SHUU - semaine.", levelId: 3 },
  { character: "今", meaningsFr: ["Maintenant"], readingsOn: ["コン"], readingsKun: ["いま"], meaningMnemonicFr: "Le toit qui couvre ce moment - MAINTENANT.", readingMnemonicFr: "IMA - maintenant.", levelId: 3 },
  { character: "前", meaningsFr: ["Avant", "Devant"], readingsOn: ["ゼン"], readingsKun: ["まえ"], meaningMnemonicFr: "La lune devant le couteau - AVANT.", readingMnemonicFr: "MAE - devant.", levelId: 3 },

  // Level 4 - Actions
  { character: "見", meaningsFr: ["Voir"], readingsOn: ["ケン"], readingsKun: ["み-る"], meaningMnemonicFr: "L'œil sur les jambes - VOIR en marchant.", readingMnemonicFr: "MIRU - voir.", levelId: 4 },
  { character: "聞", meaningsFr: ["Entendre"], readingsOn: ["ブン"], readingsKun: ["き-く"], meaningMnemonicFr: "L'oreille à la porte - ENTENDRE.", readingMnemonicFr: "KIKU - entendre.", levelId: 4 },
  { character: "話", meaningsFr: ["Parler"], readingsOn: ["ワ"], readingsKun: ["はな-す"], meaningMnemonicFr: "La langue qui bouge - PARLER.", readingMnemonicFr: "HANASU - parler.", levelId: 4 },
  { character: "読", meaningsFr: ["Lire"], readingsOn: ["ドク"], readingsKun: ["よ-む"], meaningMnemonicFr: "Les mots qui passent par l'œil - LIRE.", readingMnemonicFr: "YOMU - lire.", levelId: 4 },

  // Level 5 - Places
  { character: "駅", meaningsFr: ["Gare"], readingsOn: ["エキ"], readingsKun: [], meaningMnemonicFr: "Le cheval qui s'arrête - GARE.", readingMnemonicFr: "EKI - gare.", levelId: 5 },
  { character: "店", meaningsFr: ["Magasin"], readingsOn: ["テン"], readingsKun: ["みせ"], meaningMnemonicFr: "Le toit avec la divination - MAGASIN.", readingMnemonicFr: "MISE - magasin.", levelId: 5 },
  { character: "館", meaningsFr: ["Bâtiment"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "La nourriture sous le toit - BÂTIMENT public.", readingMnemonicFr: "KAN - bâtiment.", levelId: 5 },
  { character: "園", meaningsFr: ["Jardin"], readingsOn: ["エン"], readingsKun: ["その"], meaningMnemonicFr: "L'enclos avec les vêtements - JARDIN.", readingMnemonicFr: "SONO - jardin.", levelId: 5 },

  // Level 6 - Family
  { character: "父", meaningsFr: ["Père"], readingsOn: ["フ"], readingsKun: ["ちち"], meaningMnemonicFr: "Les deux mains qui protègent - PÈRE.", readingMnemonicFr: "CHICHI - père.", levelId: 6 },
  { character: "母", meaningsFr: ["Mère"], readingsOn: ["ボ"], readingsKun: ["はは"], meaningMnemonicFr: "Les seins qui nourrissent - MÈRE.", readingMnemonicFr: "HAHA - mère.", levelId: 6 },
  { character: "兄", meaningsFr: ["Frère aîné"], readingsOn: ["ケイ"], readingsKun: ["あに"], meaningMnemonicFr: "La bouche sur les jambes - FRÈRE AÎNÉ qui parle.", readingMnemonicFr: "ANI - frère aîné.", levelId: 6 },
  { character: "姉", meaningsFr: ["Sœur aînée"], readingsOn: ["シ"], readingsKun: ["あね"], meaningMnemonicFr: "La femme au marché - SŒUR AÎNÉE.", readingMnemonicFr: "ANE - sœur aînée.", levelId: 6 },

  // Level 7 - More family
  { character: "弟", meaningsFr: ["Frère cadet"], readingsOn: ["テイ"], readingsKun: ["おとうと"], meaningMnemonicFr: "L'arc avec les flèches - FRÈRE CADET qui apprend.", readingMnemonicFr: "OTOUTO - frère cadet.", levelId: 7 },
  { character: "妹", meaningsFr: ["Sœur cadette"], readingsOn: ["マイ"], readingsKun: ["いもうと"], meaningMnemonicFr: "La femme pas encore grande - SŒUR CADETTE.", readingMnemonicFr: "IMOUTO - sœur cadette.", levelId: 7 },
  { character: "夫", meaningsFr: ["Mari"], readingsOn: ["フ"], readingsKun: ["おっと"], meaningMnemonicFr: "Le grand homme - MARI.", readingMnemonicFr: "OTTO - mari.", levelId: 7 },
  { character: "妻", meaningsFr: ["Épouse"], readingsOn: ["サイ"], readingsKun: ["つま"], meaningMnemonicFr: "La femme avec le balai - ÉPOUSE.", readingMnemonicFr: "TSUMA - épouse.", levelId: 7 },

  // Level 8 - School
  { character: "教", meaningsFr: ["Enseigner"], readingsOn: ["キョウ"], readingsKun: ["おし-える"], meaningMnemonicFr: "L'enfant qui apprend avec le bâton - ENSEIGNER.", readingMnemonicFr: "OSHIERU - enseigner.", levelId: 8 },
  { character: "習", meaningsFr: ["Apprendre"], readingsOn: ["シュウ"], readingsKun: ["なら-う"], meaningMnemonicFr: "Les plumes sur le soleil blanc - APPRENDRE.", readingMnemonicFr: "NARAU - apprendre.", levelId: 8 },
  { character: "勉", meaningsFr: ["Effort"], readingsOn: ["ベン"], readingsKun: [], meaningMnemonicFr: "La force de l'immunité - EFFORT.", readingMnemonicFr: "BEN - effort.", levelId: 8 },
  { character: "強", meaningsFr: ["Fort"], readingsOn: ["キョウ"], readingsKun: ["つよ-い"], meaningMnemonicFr: "L'arc avec l'insecte - FORT.", readingMnemonicFr: "TSUYOI - fort.", levelId: 8 },

  // Level 9 - Weather
  { character: "晴", meaningsFr: ["Beau temps"], readingsOn: ["セイ"], readingsKun: ["は-れる"], meaningMnemonicFr: "Le soleil bleu - BEAU TEMPS.", readingMnemonicFr: "HARERU - faire beau.", levelId: 9 },
  { character: "曇", meaningsFr: ["Nuageux"], readingsOn: ["ドン"], readingsKun: ["くも-る"], meaningMnemonicFr: "Le soleil caché par les nuages - NUAGEUX.", readingMnemonicFr: "KUMORU - se couvrir.", levelId: 9 },
  { character: "暑", meaningsFr: ["Chaud"], readingsOn: ["ショ"], readingsKun: ["あつ-い"], meaningMnemonicFr: "Le soleil qui brûle le sol - CHAUD.", readingMnemonicFr: "ATSUI - chaud.", levelId: 9 },
  { character: "寒", meaningsFr: ["Froid"], readingsOn: ["カン"], readingsKun: ["さむ-い"], meaningMnemonicFr: "Le toit avec la glace - FROID.", readingMnemonicFr: "SAMUI - froid.", levelId: 9 },

  // Level 10 - Transport
  { character: "車", meaningsFr: ["Voiture"], readingsOn: ["シャ"], readingsKun: ["くるま"], meaningMnemonicFr: "La roue vue de dessus - VOITURE.", readingMnemonicFr: "KURUMA - voiture.", levelId: 10 },
  { character: "船", meaningsFr: ["Bateau"], readingsOn: ["セン"], readingsKun: ["ふね"], meaningMnemonicFr: "Le navire avec les bouches - BATEAU.", readingMnemonicFr: "FUNE - bateau.", levelId: 10 },
  { character: "飛", meaningsFr: ["Voler"], readingsOn: ["ヒ"], readingsKun: ["と-ぶ"], meaningMnemonicFr: "Les ailes qui montent - VOLER.", readingMnemonicFr: "TOBU - voler.", levelId: 10 },
  { character: "乗", meaningsFr: ["Monter"], readingsOn: ["ジョウ"], readingsKun: ["の-る"], meaningMnemonicFr: "L'arbre sur lequel on grimpe - MONTER.", readingMnemonicFr: "NORU - monter.", levelId: 10 },

  // Level 56 - Abstract
  { character: "論", meaningsFr: ["Théorie"], readingsOn: ["ロン"], readingsKun: [], meaningMnemonicFr: "Les mots ordonnés - THÉORIE.", readingMnemonicFr: "RON - théorie.", levelId: 56 },
  { character: "説", meaningsFr: ["Explication"], readingsOn: ["セツ"], readingsKun: ["と-く"], meaningMnemonicFr: "Les mots qui échangent - EXPLICATION.", readingMnemonicFr: "SETSUMEI - explication.", levelId: 56 },
  { character: "証", meaningsFr: ["Preuve"], readingsOn: ["ショウ"], readingsKun: [], meaningMnemonicFr: "Les mots corrects - PREUVE.", readingMnemonicFr: "SHOU - preuve.", levelId: 56 },
  { character: "験", meaningsFr: ["Expérience"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "Le cheval testé - EXPÉRIENCE.", readingMnemonicFr: "KEN - expérience.", levelId: 56 },
  { character: "察", meaningsFr: ["Inspection"], readingsOn: ["サツ"], readingsKun: [], meaningMnemonicFr: "Le toit qui voit le sacrifice - INSPECTION.", readingMnemonicFr: "SATSU - inspection.", levelId: 56 },

  // Level 57 - Society
  { character: "政", meaningsFr: ["Politique"], readingsOn: ["セイ"], readingsKun: ["まつりごと"], meaningMnemonicFr: "Corriger le texte - POLITIQUE.", readingMnemonicFr: "SEI - politique.", levelId: 57 },
  { character: "府", meaningsFr: ["Gouvernement"], readingsOn: ["フ"], readingsKun: [], meaningMnemonicFr: "Le bâtiment qui s'incline - GOUVERNEMENT.", readingMnemonicFr: "FU - gouvernement.", levelId: 57 },
  { character: "省", meaningsFr: ["Ministère"], readingsOn: ["ショウ"], readingsKun: ["はぶ-く"], meaningMnemonicFr: "L'œil qui regarde peu - MINISTÈRE.", readingMnemonicFr: "SHOU - ministère.", levelId: 57 },
  { character: "県", meaningsFr: ["Préfecture"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "L'œil suspendu - PRÉFECTURE.", readingMnemonicFr: "KEN - préfecture.", levelId: 57 },
  { character: "市", meaningsFr: ["Ville", "Marché"], readingsOn: ["シ"], readingsKun: ["いち"], meaningMnemonicFr: "Le tissu au marché - VILLE.", readingMnemonicFr: "ICHI - marché.", levelId: 57 },
  { character: "区", meaningsFr: ["Quartier"], readingsOn: ["ク"], readingsKun: [], meaningMnemonicFr: "L'enclos divisé - QUARTIER.", readingMnemonicFr: "KU - quartier.", levelId: 57 },
  { character: "町", meaningsFr: ["Ville", "Quartier"], readingsOn: ["チョウ"], readingsKun: ["まち"], meaningMnemonicFr: "Le champ de riz en ville - QUARTIER.", readingMnemonicFr: "MACHI - ville.", levelId: 57 },
  { character: "村", meaningsFr: ["Village"], readingsOn: ["ソン"], readingsKun: ["むら"], meaningMnemonicFr: "L'arbre et la mesure - VILLAGE.", readingMnemonicFr: "MURA - village.", levelId: 57 },
  { character: "民", meaningsFr: ["Peuple"], readingsOn: ["ミン"], readingsKun: ["たみ"], meaningMnemonicFr: "L'œil qui ne voit pas - PEUPLE.", readingMnemonicFr: "TAMI - peuple.", levelId: 57 },
  { character: "族", meaningsFr: ["Tribu", "Famille"], readingsOn: ["ゾク"], readingsKun: [], meaningMnemonicFr: "La bannière avec la flèche - TRIBU.", readingMnemonicFr: "ZOKU - tribu.", levelId: 57 },

  // Level 58 - Economy
  { character: "経", meaningsFr: ["Économie", "Passer"], readingsOn: ["ケイ"], readingsKun: ["へ-る"], meaningMnemonicFr: "Le fil qui traverse - ÉCONOMIE.", readingMnemonicFr: "KEI - économie.", levelId: 58 },
  { character: "済", meaningsFr: ["Finir", "Sauver"], readingsOn: ["サイ"], readingsKun: ["す-む"], meaningMnemonicFr: "L'eau régulière - FINIR.", readingMnemonicFr: "SAI - finir.", levelId: 58 },
  { character: "産", meaningsFr: ["Production"], readingsOn: ["サン"], readingsKun: ["う-む"], meaningMnemonicFr: "La naissance sur la falaise - PRODUCTION.", readingMnemonicFr: "SAN - production.", levelId: 58 },
  { character: "業", meaningsFr: ["Industrie"], readingsOn: ["ギョウ"], readingsKun: ["わざ"], meaningMnemonicFr: "L'arbre travaillé - INDUSTRIE.", readingMnemonicFr: "GYOU - industrie.", levelId: 58 },
  { character: "農", meaningsFr: ["Agriculture"], readingsOn: ["ノウ"], readingsKun: [], meaningMnemonicFr: "La chanson du matin - AGRICULTURE.", readingMnemonicFr: "NOU - agriculture.", levelId: 58 },
  { character: "工", meaningsFr: ["Artisan", "Travail"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "L'équerre du constructeur - ARTISAN.", readingMnemonicFr: "KOU - artisan.", levelId: 58 },
  { character: "商", meaningsFr: ["Commerce"], readingsOn: ["ショウ"], readingsKun: ["あきな-う"], meaningMnemonicFr: "Le chapeau du marchand - COMMERCE.", readingMnemonicFr: "SHOU - commerce.", levelId: 58 },
  { character: "品", meaningsFr: ["Produit"], readingsOn: ["ヒン"], readingsKun: ["しな"], meaningMnemonicFr: "Trois bouches qui parlent de PRODUITS.", readingMnemonicFr: "SHINA - article.", levelId: 58 },
  { character: "値", meaningsFr: ["Valeur", "Prix"], readingsOn: ["チ"], readingsKun: ["ね"], meaningMnemonicFr: "La personne qui fixe - VALEUR.", readingMnemonicFr: "NE - prix.", levelId: 58 },
  { character: "賃", meaningsFr: ["Loyer", "Salaire"], readingsOn: ["チン"], readingsKun: [], meaningMnemonicFr: "L'or qui porte - SALAIRE.", readingMnemonicFr: "CHIN - loyer.", levelId: 58 },

  // Level 59 - Law
  { character: "法", meaningsFr: ["Loi"], readingsOn: ["ホウ"], readingsKun: [], meaningMnemonicFr: "L'eau qui part - LOI.", readingMnemonicFr: "HOU - loi.", levelId: 59 },
  { character: "律", meaningsFr: ["Règle"], readingsOn: ["リツ"], readingsKun: [], meaningMnemonicFr: "Le pas qui suit le pinceau - RÈGLE.", readingMnemonicFr: "RITSU - règle.", levelId: 59 },
  { character: "規", meaningsFr: ["Règlement"], readingsOn: ["キ"], readingsKun: [], meaningMnemonicFr: "Le mari qui voit - RÈGLEMENT.", readingMnemonicFr: "KI - règlement.", levelId: 59 },
  { character: "則", meaningsFr: ["Principe"], readingsOn: ["ソク"], readingsKun: [], meaningMnemonicFr: "La coquille avec le couteau - PRINCIPE.", readingMnemonicFr: "SOKU - principe.", levelId: 59 },
  { character: "制", meaningsFr: ["Système"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "La vache sous le couteau - SYSTÈME.", readingMnemonicFr: "SEI - système.", levelId: 59 },

  // Level 60 - Final concepts
  { character: "権", meaningsFr: ["Droit", "Autorité"], readingsOn: ["ケン"], readingsKun: [], meaningMnemonicFr: "L'arbre et l'oiseau - DROIT.", readingMnemonicFr: "KEN - droit.", levelId: 60 },
  { character: "利", meaningsFr: ["Profit", "Avantage"], readingsOn: ["リ"], readingsKun: ["き-く"], meaningMnemonicFr: "Le riz coupé - PROFIT.", readingMnemonicFr: "RI - profit.", levelId: 60 },
  { character: "益", meaningsFr: ["Bénéfice"], readingsOn: ["エキ"], readingsKun: [], meaningMnemonicFr: "L'eau dans le plat - BÉNÉFICE.", readingMnemonicFr: "EKI - bénéfice.", levelId: 60 },
  { character: "害", meaningsFr: ["Dommage"], readingsOn: ["ガイ"], readingsKun: [], meaningMnemonicFr: "Le toit sur la bouche - DOMMAGE.", readingMnemonicFr: "GAI - dommage.", levelId: 60 },
  { character: "防", meaningsFr: ["Défense"], readingsOn: ["ボウ"], readingsKun: ["ふせ-ぐ"], meaningMnemonicFr: "La colline carrée - DÉFENSE.", readingMnemonicFr: "FUSEGU - défendre.", levelId: 60 },
];

async function main() {
  console.log("Seeding kanji supplement 6 (levels 1-10, 56-60)...");

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
