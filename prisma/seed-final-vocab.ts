import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final 25 vocabulary words to exceed 6000 target
const vocabData = [
  { word: "感謝", meaningsFr: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "Sentir + remercier = GRATITUDE.", levelId: 41 },
  { word: "感動", meaningsFr: ["Émotion"], readings: ["かんどう"], mnemonicFr: "Sentir + mouvoir = ÉMOTION.", levelId: 42 },
  { word: "感激", meaningsFr: ["Être touché"], readings: ["かんげき"], mnemonicFr: "Sentir + intense = ÊTRE TOUCHÉ.", levelId: 43 },
  { word: "感心", meaningsFr: ["Admiration"], readings: ["かんしん"], mnemonicFr: "Sentir + cœur = ADMIRATION.", levelId: 44 },
  { word: "関心", meaningsFr: ["Intérêt"], readings: ["かんしん"], mnemonicFr: "Barrière + cœur = INTÉRÊT.", levelId: 45 },
  { word: "注目", meaningsFr: ["Attention"], readings: ["ちゅうもく"], mnemonicFr: "Verser + œil = ATTENTION.", levelId: 46 },
  { word: "集中", meaningsFr: ["Concentration"], readings: ["しゅうちゅう"], mnemonicFr: "Rassembler + centre = CONCENTRATION.", levelId: 47 },
  { word: "専念", meaningsFr: ["Dévouement"], readings: ["せんねん"], mnemonicFr: "Spécial + pensée = DÉVOUEMENT.", levelId: 48 },
  { word: "熱心", meaningsFr: ["Enthousiasme"], readings: ["ねっしん"], mnemonicFr: "Chaleur + cœur = ENTHOUSIASME.", levelId: 49 },
  { word: "情熱", meaningsFr: ["Passion"], readings: ["じょうねつ"], mnemonicFr: "Sentiment + chaleur = PASSION.", levelId: 50 },
  { word: "野心", meaningsFr: ["Ambition"], readings: ["やしん"], mnemonicFr: "Champ + cœur = AMBITION.", levelId: 51 },
  { word: "向上心", meaningsFr: ["Aspiration"], readings: ["こうじょうしん"], mnemonicFr: "Vers + haut + cœur = ASPIRATION.", levelId: 52 },
  { word: "冒険", meaningsFr: ["Aventure"], readings: ["ぼうけん"], mnemonicFr: "Risquer + danger = AVENTURE.", levelId: 53 },
  { word: "探検", meaningsFr: ["Exploration"], readings: ["たんけん"], mnemonicFr: "Chercher + vérifier = EXPLORATION.", levelId: 54 },
  { word: "発見", meaningsFr: ["Découverte"], readings: ["はっけん"], mnemonicFr: "Émettre + voir = DÉCOUVERTE.", levelId: 55 },
  { word: "発明", meaningsFr: ["Invention"], readings: ["はつめい"], mnemonicFr: "Émettre + lumière = INVENTION.", levelId: 56 },
  { word: "創造", meaningsFr: ["Création"], readings: ["そうぞう"], mnemonicFr: "Créer + fabriquer = CRÉATION.", levelId: 57 },
  { word: "想像", meaningsFr: ["Imagination"], readings: ["そうぞう"], mnemonicFr: "Penser + forme = IMAGINATION.", levelId: 58 },
  { word: "空想", meaningsFr: ["Rêverie"], readings: ["くうそう"], mnemonicFr: "Vide + penser = RÊVERIE.", levelId: 59 },
  { word: "理想", meaningsFr: ["Idéal"], readings: ["りそう"], mnemonicFr: "Raison + penser = IDÉAL.", levelId: 60 },
  { word: "現実", meaningsFr: ["Réalité"], readings: ["げんじつ"], mnemonicFr: "Apparaître + réalité = RÉALITÉ.", levelId: 60 },
  { word: "事実", meaningsFr: ["Fait"], readings: ["じじつ"], mnemonicFr: "Chose + réalité = FAIT.", levelId: 59 },
  { word: "真実", meaningsFr: ["Vérité"], readings: ["しんじつ"], mnemonicFr: "Vrai + réalité = VÉRITÉ.", levelId: 58 },
  { word: "確実", meaningsFr: ["Certitude"], readings: ["かくじつ"], mnemonicFr: "Certain + réalité = CERTITUDE.", levelId: 57 },
  { word: "堅実", meaningsFr: ["Solidité"], readings: ["けんじつ"], mnemonicFr: "Solide + réalité = SOLIDITÉ.", levelId: 56 },
];

async function main() {
  console.log("Seeding final vocabulary to exceed 6000...");

  for (const vocab of vocabData) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: {
        meaningsFr: vocab.meaningsFr,
        readings: vocab.readings,
        mnemonicFr: vocab.mnemonicFr,
      },
      create: vocab,
    });
  }

  console.log(`Seeded ${vocabData.length} vocabulary words.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
