import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// More unique kanji for various levels
const kanjiData = [
  // Level 56 - Advanced concepts
  { character: "複", meaningsFr: ["Multiple"], readingsOn: ["フク"], readingsKun: [], meaningMnemonicFr: "La robe qui se répète - MULTIPLE.", readingMnemonicFr: "FUKU - multiple.", levelId: 56 },
  { character: "雑", meaningsFr: ["Mélangé"], readingsOn: ["ザツ"], readingsKun: [], meaningMnemonicFr: "Les neuf arbres - MÉLANGÉ.", readingMnemonicFr: "ZATSU - mélangé.", levelId: 56 },
  { character: "純", meaningsFr: ["Pur"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "Le fil qui tourne - PUR.", readingMnemonicFr: "JUN - pur.", levelId: 56 },
  { character: "単", meaningsFr: ["Simple"], readingsOn: ["タン"], readingsKun: [], meaningMnemonicFr: "Le champ unique - SIMPLE.", readingMnemonicFr: "TAN - simple.", levelId: 56 },
  { character: "独", meaningsFr: ["Seul"], readingsOn: ["ドク"], readingsKun: ["ひと-り"], meaningMnemonicFr: "Le chien de l'insecte - SEUL.", readingMnemonicFr: "HITORI - seul.", levelId: 56 },

  // Level 57 - Social concepts
  { character: "連", meaningsFr: ["Relier"], readingsOn: ["レン"], readingsKun: ["つら-なる"], meaningMnemonicFr: "La voiture qui avance - RELIER.", readingMnemonicFr: "REN - relier.", levelId: 57 },
  { character: "絡", meaningsFr: ["S'emmêler"], readingsOn: ["ラク"], readingsKun: ["から-む"], meaningMnemonicFr: "Le fil de chaque - S'EMMÊLER.", readingMnemonicFr: "KARAMU - s'emmêler.", levelId: 57 },
  { character: "係", meaningsFr: ["Relation"], readingsOn: ["ケイ"], readingsKun: ["かか-る"], meaningMnemonicFr: "La personne qui attache - RELATION.", readingMnemonicFr: "KAKARI - relation.", levelId: 57 },
  { character: "接", meaningsFr: ["Contacter"], readingsOn: ["セツ"], readingsKun: ["つ-ぐ"], meaningMnemonicFr: "La main qui touche - CONTACTER.", readingMnemonicFr: "SETSU - contacter.", levelId: 57 },
  { character: "触", meaningsFr: ["Toucher"], readingsOn: ["ショク"], readingsKun: ["ふ-れる"], meaningMnemonicFr: "L'angle qui touche - TOUCHER.", readingMnemonicFr: "FURERU - toucher.", levelId: 57 },

  // Level 58 - More concepts
  { character: "含", meaningsFr: ["Contenir"], readingsOn: ["ガン"], readingsKun: ["ふく-む"], meaningMnemonicFr: "Le maintenant dans la bouche - CONTENIR.", readingMnemonicFr: "FUKUMU - contenir.", levelId: 58 },
  { character: "除", meaningsFr: ["Enlever"], readingsOn: ["ジョ"], readingsKun: ["のぞ-く"], meaningMnemonicFr: "La colline avec le surplus - ENLEVER.", readingMnemonicFr: "NOZOKU - enlever.", levelId: 58 },
  { character: "避", meaningsFr: ["Éviter"], readingsOn: ["ヒ"], readingsKun: ["さ-ける"], meaningMnemonicFr: "L'avance avec le mur - ÉVITER.", readingMnemonicFr: "SAKERU - éviter.", levelId: 58 },
  { character: "防", meaningsFr: ["Prévenir"], readingsOn: ["ボウ"], readingsKun: ["ふせ-ぐ"], meaningMnemonicFr: "La colline carrée - PRÉVENIR.", readingMnemonicFr: "FUSEGU - prévenir.", levelId: 58 },
  { character: "護", meaningsFr: ["Protéger"], readingsOn: ["ゴ"], readingsKun: [], meaningMnemonicFr: "Les paroles de l'oiseau - PROTÉGER.", readingMnemonicFr: "GO - protéger.", levelId: 58 },

  // Level 59 - Final concepts
  { character: "導", meaningsFr: ["Guider"], readingsOn: ["ドウ"], readingsKun: ["みちび-く"], meaningMnemonicFr: "La route du pouce - GUIDER.", readingMnemonicFr: "MICHIBIKU - guider.", levelId: 59 },
  { character: "従", meaningsFr: ["Suivre"], readingsOn: ["ジュウ"], readingsKun: ["したが-う"], meaningMnemonicFr: "La marche du pied - SUIVRE.", readingMnemonicFr: "SHITAGAU - suivre.", levelId: 59 },
  { character: "逆", meaningsFr: ["Inverse"], readingsOn: ["ギャク"], readingsKun: ["さか"], meaningMnemonicFr: "L'avance du surplus - INVERSE.", readingMnemonicFr: "GYAKU - inverse.", levelId: 59 },
  { character: "順", meaningsFr: ["Ordre"], readingsOn: ["ジュン"], readingsKun: [], meaningMnemonicFr: "Le fleuve de la page - ORDRE.", readingMnemonicFr: "JUN - ordre.", levelId: 59 },
  { character: "配", meaningsFr: ["Distribuer"], readingsOn: ["ハイ"], readingsKun: ["くば-る"], meaningMnemonicFr: "L'alcool propre - DISTRIBUER.", readingMnemonicFr: "KUBARU - distribuer.", levelId: 59 },

  // Level 60 - Completion
  { character: "達", meaningsFr: ["Atteindre"], readingsOn: ["タツ"], readingsKun: [], meaningMnemonicFr: "Le mouton qui avance - ATTEINDRE.", readingMnemonicFr: "TATSU - atteindre.", levelId: 60 },
  { character: "成", meaningsFr: ["Devenir"], readingsOn: ["セイ"], readingsKun: ["な-る"], meaningMnemonicFr: "La lance qui frappe - DEVENIR.", readingMnemonicFr: "NARU - devenir.", levelId: 60 },
  { character: "功", meaningsFr: ["Mérite"], readingsOn: ["コウ"], readingsKun: [], meaningMnemonicFr: "Le travail de la force - MÉRITE.", readingMnemonicFr: "KOU - mérite.", levelId: 60 },
  { character: "績", meaningsFr: ["Accomplissement"], readingsOn: ["セキ"], readingsKun: [], meaningMnemonicFr: "Le fil qui s'accumule - ACCOMPLISSEMENT.", readingMnemonicFr: "SEKI - accomplissement.", levelId: 60 },
  { character: "完", meaningsFr: ["Complet"], readingsOn: ["カン"], readingsKun: [], meaningMnemonicFr: "Le toit sur l'origine - COMPLET.", readingMnemonicFr: "KAN - complet.", levelId: 60 },

  // More levels 41-50 additions
  { character: "破", meaningsFr: ["Casser"], readingsOn: ["ハ"], readingsKun: ["やぶ-る"], meaningMnemonicFr: "La pierre avec la peau - CASSER.", readingMnemonicFr: "YABURU - casser.", levelId: 41 },
  { character: "折", meaningsFr: ["Plier"], readingsOn: ["セツ"], readingsKun: ["お-る"], meaningMnemonicFr: "La main avec la hache - PLIER.", readingMnemonicFr: "ORU - plier.", levelId: 41 },
  { character: "割", meaningsFr: ["Diviser"], readingsOn: ["カツ"], readingsKun: ["わ-る"], meaningMnemonicFr: "Le couteau avec le dommage - DIVISER.", readingMnemonicFr: "WARU - diviser.", levelId: 42 },
  { character: "裂", meaningsFr: ["Déchirer"], readingsOn: ["レツ"], readingsKun: ["さ-く"], meaningMnemonicFr: "La robe avec la liste - DÉCHIRER.", readingMnemonicFr: "SAKU - déchirer.", levelId: 42 },
  { character: "縫", meaningsFr: ["Coudre"], readingsOn: ["ホウ"], readingsKun: ["ぬ-う"], meaningMnemonicFr: "Le fil qui avance - COUDRE.", readingMnemonicFr: "NUU - coudre.", levelId: 43 },

  { character: "編", meaningsFr: ["Tricoter"], readingsOn: ["ヘン"], readingsKun: ["あ-む"], meaningMnemonicFr: "Le fil qui se répète - TRICOTER.", readingMnemonicFr: "AMU - tricoter.", levelId: 43 },
  { character: "織", meaningsFr: ["Tisser"], readingsOn: ["ショク"], readingsKun: ["お-る"], meaningMnemonicFr: "Le fil de la cérémonie - TISSER.", readingMnemonicFr: "ORU - tisser.", levelId: 44 },
  { character: "染", meaningsFr: ["Teindre"], readingsOn: ["セン"], readingsKun: ["そ-める"], meaningMnemonicFr: "L'eau + le bois + neuf = TEINDRE.", readingMnemonicFr: "SOMERU - teindre.", levelId: 44 },
  { character: "描", meaningsFr: ["Dessiner"], readingsOn: ["ビョウ"], readingsKun: ["えが-く"], meaningMnemonicFr: "La main du chat - DESSINER.", readingMnemonicFr: "EGAKU - dessiner.", levelId: 45 },
  { character: "刻", meaningsFr: ["Graver"], readingsOn: ["コク"], readingsKun: ["きざ-む"], meaningMnemonicFr: "Le couteau qui porc - GRAVER.", readingMnemonicFr: "KIZAMU - graver.", levelId: 45 },

  { character: "塗", meaningsFr: ["Peindre"], readingsOn: ["ト"], readingsKun: ["ぬ-る"], meaningMnemonicFr: "La terre de la boutique - PEINDRE.", readingMnemonicFr: "NURU - peindre.", levelId: 46 },
  { character: "磨", meaningsFr: ["Polir"], readingsOn: ["マ"], readingsKun: ["みが-く"], meaningMnemonicFr: "La pierre du chanvre - POLIR.", readingMnemonicFr: "MIGAKU - polir.", levelId: 46 },
  { character: "削", meaningsFr: ["Raser"], readingsOn: ["サク"], readingsKun: ["けず-る"], meaningMnemonicFr: "Le couteau + la lune = RASER.", readingMnemonicFr: "KEZURU - raser.", levelId: 47 },
  { character: "掘", meaningsFr: ["Creuser"], readingsOn: ["クツ"], readingsKun: ["ほ-る"], meaningMnemonicFr: "La main dans l'os - CREUSER.", readingMnemonicFr: "HORU - creuser.", levelId: 47 },
  { character: "埋", meaningsFr: ["Enterrer"], readingsOn: ["マイ"], readingsKun: ["う-める"], meaningMnemonicFr: "La terre + le village = ENTERRER.", readingMnemonicFr: "UMERU - enterrer.", levelId: 48 },

  { character: "積", meaningsFr: ["Accumuler"], readingsOn: ["セキ"], readingsKun: ["つ-む"], meaningMnemonicFr: "Le riz qui s'ajoute - ACCUMULER.", readingMnemonicFr: "TSUMU - accumuler.", levelId: 48 },
  { character: "並", meaningsFr: ["Aligner"], readingsOn: ["ヘイ"], readingsKun: ["なら-べる"], meaningMnemonicFr: "Deux debout ensemble - ALIGNER.", readingMnemonicFr: "NARABERU - aligner.", levelId: 49 },
  { character: "揃", meaningsFr: ["Réunir"], readingsOn: [], readingsKun: ["そろ-える"], meaningMnemonicFr: "La main + le devant = RÉUNIR.", readingMnemonicFr: "SOROERU - réunir.", levelId: 49 },
  { character: "整", meaningsFr: ["Arranger"], readingsOn: ["セイ"], readingsKun: ["ととの-える"], meaningMnemonicFr: "L'ordre du pinceau - ARRANGER.", readingMnemonicFr: "TOTONOERU - arranger.", levelId: 50 },
  { character: "備", meaningsFr: ["Préparer"], readingsOn: ["ビ"], readingsKun: ["そな-える"], meaningMnemonicFr: "La personne qui a tout - PRÉPARER.", readingMnemonicFr: "SONAERU - préparer.", levelId: 50 },

  // Additional unique kanji
  { character: "構", meaningsFr: ["Construire"], readingsOn: ["コウ"], readingsKun: ["かま-える"], meaningMnemonicFr: "Le bois qui relie - CONSTRUIRE.", readingMnemonicFr: "KAMAERU - construire.", levelId: 51 },
  { character: "造", meaningsFr: ["Fabriquer"], readingsOn: ["ゾウ"], readingsKun: ["つく-る"], meaningMnemonicFr: "L'avance qui dit - FABRIQUER.", readingMnemonicFr: "TSUKURU - fabriquer.", levelId: 51 },
  { character: "創", meaningsFr: ["Créer"], readingsOn: ["ソウ"], readingsKun: [], meaningMnemonicFr: "Le couteau sur l'entrepôt - CRÉER.", readingMnemonicFr: "SOU - créer.", levelId: 52 },
  { character: "製", meaningsFr: ["Manufacture"], readingsOn: ["セイ"], readingsKun: [], meaningMnemonicFr: "La robe du système - MANUFACTURE.", readingMnemonicFr: "SEI - manufacture.", levelId: 52 },
  { character: "組", meaningsFr: ["Groupe"], readingsOn: ["ソ"], readingsKun: ["く-む"], meaningMnemonicFr: "Le fil et la table - GROUPE.", readingMnemonicFr: "KUMU - grouper.", levelId: 53 },

  { character: "束", meaningsFr: ["Paquet"], readingsOn: ["ソク"], readingsKun: ["たば"], meaningMnemonicFr: "L'arbre attaché - PAQUET.", readingMnemonicFr: "TABA - paquet.", levelId: 53 },
  { character: "縛", meaningsFr: ["Attacher"], readingsOn: ["バク"], readingsKun: ["しば-る"], meaningMnemonicFr: "Le fil épais - ATTACHER.", readingMnemonicFr: "SHIBARU - attacher.", levelId: 54 },
  { character: "解", meaningsFr: ["Résoudre"], readingsOn: ["カイ"], readingsKun: ["と-く"], meaningMnemonicFr: "La corne + le couteau + la vache = RÉSOUDRE.", readingMnemonicFr: "TOKU - résoudre.", levelId: 54 },
  { character: "放", meaningsFr: ["Relâcher"], readingsOn: ["ホウ"], readingsKun: ["はな-す"], meaningMnemonicFr: "La direction qui frappe - RELÂCHER.", readingMnemonicFr: "HANASU - relâcher.", levelId: 55 },
  { character: "捨", meaningsFr: ["Jeter"], readingsOn: ["シャ"], readingsKun: ["す-てる"], meaningMnemonicFr: "La main de la maison - JETER.", readingMnemonicFr: "SUTERU - jeter.", levelId: 55 },
];

async function main() {
  console.log("Seeding kanji supplement 10...");

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
