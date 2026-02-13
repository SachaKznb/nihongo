import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final vocabulary to complete the 6000 target
const vocabData = [
  // Compound words and expressions
  { word: "自己紹介", meaningsFr: ["Présentation de soi"], readings: ["じこしょうかい"], mnemonicFr: "Soi + présenter = PRÉSENTATION DE SOI.", levelId: 41 },
  { word: "誕生日", meaningsFr: ["Anniversaire"], readings: ["たんじょうび"], mnemonicFr: "Jour de naissance = ANNIVERSAIRE.", levelId: 41 },
  { word: "結婚式", meaningsFr: ["Mariage"], readings: ["けっこんしき"], mnemonicFr: "Cérémonie de mariage = MARIAGE.", levelId: 42 },
  { word: "卒業式", meaningsFr: ["Cérémonie de diplôme"], readings: ["そつぎょうしき"], mnemonicFr: "Cérémonie de fin d'études = DIPLÔME.", levelId: 42 },
  { word: "入学式", meaningsFr: ["Cérémonie d'entrée"], readings: ["にゅうがくしき"], mnemonicFr: "Cérémonie d'admission = ENTRÉE.", levelId: 43 },
  { word: "始業式", meaningsFr: ["Cérémonie de rentrée"], readings: ["しぎょうしき"], mnemonicFr: "Cérémonie de début = RENTRÉE.", levelId: 43 },
  { word: "終業式", meaningsFr: ["Cérémonie de fin"], readings: ["しゅうぎょうしき"], mnemonicFr: "Cérémonie de fin = FIN D'ANNÉE.", levelId: 44 },
  { word: "成人式", meaningsFr: ["Cérémonie de majorité"], readings: ["せいじんしき"], mnemonicFr: "Cérémonie des adultes = MAJORITÉ.", levelId: 44 },

  // More daily expressions
  { word: "お疲れ様", meaningsFr: ["Bon travail"], readings: ["おつかれさま"], mnemonicFr: "Expression de reconnaissance = BON TRAVAIL.", levelId: 45 },
  { word: "お先に", meaningsFr: ["Je pars avant"], readings: ["おさきに"], mnemonicFr: "Politesse pour partir = JE PARS AVANT.", levelId: 45 },
  { word: "失礼します", meaningsFr: ["Excusez-moi"], readings: ["しつれいします"], mnemonicFr: "Je commets une impolitesse = EXCUSEZ-MOI.", levelId: 46 },
  { word: "初めまして", meaningsFr: ["Enchanté"], readings: ["はじめまして"], mnemonicFr: "C'est la première fois = ENCHANTÉ.", levelId: 46 },
  { word: "お久しぶり", meaningsFr: ["Ça fait longtemps"], readings: ["おひさしぶり"], mnemonicFr: "Longtemps depuis = ÇA FAIT LONGTEMPS.", levelId: 47 },
  { word: "お元気で", meaningsFr: ["Prenez soin de vous"], readings: ["おげんきで"], mnemonicFr: "Restez en forme = PRENEZ SOIN.", levelId: 47 },
  { word: "お大事に", meaningsFr: ["Bon rétablissement"], readings: ["おだいじに"], mnemonicFr: "Prenez soin de vous = BON RÉTABLISSEMENT.", levelId: 48 },
  { word: "おめでとう", meaningsFr: ["Félicitations"], readings: ["おめでとう"], mnemonicFr: "C'est rare et bien = FÉLICITATIONS.", levelId: 48 },

  // Weather expressions
  { word: "快晴", meaningsFr: ["Temps clair"], readings: ["かいせい"], mnemonicFr: "Agréable + clair = TEMPS CLAIR.", levelId: 49 },
  { word: "大雨", meaningsFr: ["Forte pluie"], readings: ["おおあめ"], mnemonicFr: "Grande + pluie = FORTE PLUIE.", levelId: 49 },
  { word: "大雪", meaningsFr: ["Forte neige"], readings: ["おおゆき"], mnemonicFr: "Grande + neige = FORTE NEIGE.", levelId: 50 },
  { word: "猛暑", meaningsFr: ["Canicule"], readings: ["もうしょ"], mnemonicFr: "Féroce + chaleur = CANICULE.", levelId: 50 },
  { word: "厳寒", meaningsFr: ["Grand froid"], readings: ["げんかん"], mnemonicFr: "Sévère + froid = GRAND FROID.", levelId: 51 },
  { word: "乾燥", meaningsFr: ["Sécheresse"], readings: ["かんそう"], mnemonicFr: "Sec + sec = SÉCHERESSE.", levelId: 51 },
  { word: "湿気", meaningsFr: ["Humidité"], readings: ["しっけ"], mnemonicFr: "Humide + énergie = HUMIDITÉ.", levelId: 52 },
  { word: "気圧", meaningsFr: ["Pression atmosphérique"], readings: ["きあつ"], mnemonicFr: "Énergie + pression = PRESSION.", levelId: 52 },

  // Time expressions
  { word: "一瞬", meaningsFr: ["Un instant"], readings: ["いっしゅん"], mnemonicFr: "Un + clignement = UN INSTANT.", levelId: 53 },
  { word: "瞬間", meaningsFr: ["Moment"], readings: ["しゅんかん"], mnemonicFr: "Clignement + intervalle = MOMENT.", levelId: 53 },
  { word: "永遠", meaningsFr: ["Éternité"], readings: ["えいえん"], mnemonicFr: "Toujours + loin = ÉTERNITÉ.", levelId: 54 },
  { word: "刹那", meaningsFr: ["Instant"], readings: ["せつな"], mnemonicFr: "Le plus court moment = INSTANT.", levelId: 54 },
  { word: "世紀", meaningsFr: ["Siècle"], readings: ["せいき"], mnemonicFr: "Monde + période = SIÈCLE.", levelId: 55 },
  { word: "年代", meaningsFr: ["Décennie"], readings: ["ねんだい"], mnemonicFr: "Année + génération = DÉCENNIE.", levelId: 55 },
  { word: "時代", meaningsFr: ["Époque"], readings: ["じだい"], mnemonicFr: "Temps + génération = ÉPOQUE.", levelId: 56 },
  { word: "期間", meaningsFr: ["Période"], readings: ["きかん"], mnemonicFr: "Période + intervalle = PÉRIODE.", levelId: 56 },

  // Abstract concepts
  { word: "自由", meaningsFr: ["Liberté"], readings: ["じゆう"], mnemonicFr: "Soi + raison = LIBERTÉ.", levelId: 57 },
  { word: "平等", meaningsFr: ["Égalité"], readings: ["びょうどう"], mnemonicFr: "Plat + égal = ÉGALITÉ.", levelId: 57 },
  { word: "博愛", meaningsFr: ["Fraternité"], readings: ["はくあい"], mnemonicFr: "Large + amour = FRATERNITÉ.", levelId: 58 },
  { word: "正義", meaningsFr: ["Justice"], readings: ["せいぎ"], mnemonicFr: "Correct + justice = JUSTICE.", levelId: 58 },
  { word: "真実", meaningsFr: ["Vérité"], readings: ["しんじつ"], mnemonicFr: "Vrai + réalité = VÉRITÉ.", levelId: 59 },
  { word: "誠実", meaningsFr: ["Sincérité"], readings: ["せいじつ"], mnemonicFr: "Sincère + réalité = SINCÉRITÉ.", levelId: 59 },
  { word: "勇気", meaningsFr: ["Courage"], readings: ["ゆうき"], mnemonicFr: "Brave + énergie = COURAGE.", levelId: 60 },
  { word: "知恵", meaningsFr: ["Sagesse"], readings: ["ちえ"], mnemonicFr: "Savoir + faveur = SAGESSE.", levelId: 60 },

  // More useful words
  { word: "材料", meaningsFr: ["Matériau"], readings: ["ざいりょう"], mnemonicFr: "Matière + mesure = MATÉRIAU.", levelId: 41 },
  { word: "道具", meaningsFr: ["Outil"], readings: ["どうぐ"], mnemonicFr: "Voie + ustensile = OUTIL.", levelId: 42 },
  { word: "家電", meaningsFr: ["Électroménager"], readings: ["かでん"], mnemonicFr: "Maison + électricité = ÉLECTROMÉNAGER.", levelId: 43 },
  { word: "生地", meaningsFr: ["Tissu"], readings: ["きじ"], mnemonicFr: "Vie + terre = TISSU.", levelId: 44 },
  { word: "原料", meaningsFr: ["Matière première"], readings: ["げんりょう"], mnemonicFr: "Origine + mesure = MATIÈRE PREMIÈRE.", levelId: 45 },
  { word: "製品", meaningsFr: ["Produit fini"], readings: ["せいひん"], mnemonicFr: "Fabriquer + article = PRODUIT FINI.", levelId: 46 },
  { word: "完成品", meaningsFr: ["Produit achevé"], readings: ["かんせいひん"], mnemonicFr: "Complet + article = PRODUIT ACHEVÉ.", levelId: 47 },
  { word: "半製品", meaningsFr: ["Produit semi-fini"], readings: ["はんせいひん"], mnemonicFr: "Moitié + produit = SEMI-FINI.", levelId: 48 },

  // Final words to reach target
  { word: "印象", meaningsFr: ["Impression"], readings: ["いんしょう"], mnemonicFr: "Sceau + éléphant = IMPRESSION.", levelId: 49 },
  { word: "評判", meaningsFr: ["Réputation"], readings: ["ひょうばん"], mnemonicFr: "Critiquer + juger = RÉPUTATION.", levelId: 50 },
  { word: "名声", meaningsFr: ["Renommée"], readings: ["めいせい"], mnemonicFr: "Nom + voix = RENOMMÉE.", levelId: 51 },
  { word: "評価", meaningsFr: ["Évaluation"], readings: ["ひょうか"], mnemonicFr: "Critiquer + prix = ÉVALUATION.", levelId: 52 },
  { word: "批評", meaningsFr: ["Critique"], readings: ["ひひょう"], mnemonicFr: "Blâmer + critiquer = CRITIQUE.", levelId: 53 },
  { word: "分析", meaningsFr: ["Analyse"], readings: ["ぶんせき"], mnemonicFr: "Diviser + séparer = ANALYSE.", levelId: 54 },
  { word: "統計", meaningsFr: ["Statistiques"], readings: ["とうけい"], mnemonicFr: "Unifier + calculer = STATISTIQUES.", levelId: 55 },
  { word: "調査", meaningsFr: ["Enquête"], readings: ["ちょうさ"], mnemonicFr: "Régler + examiner = ENQUÊTE.", levelId: 56 },
  { word: "実績", meaningsFr: ["Résultats"], readings: ["じっせき"], mnemonicFr: "Réalité + traces = RÉSULTATS.", levelId: 57 },
  { word: "業績", meaningsFr: ["Performance"], readings: ["ぎょうせき"], mnemonicFr: "Travail + traces = PERFORMANCE.", levelId: 58 },
  { word: "功績", meaningsFr: ["Mérites"], readings: ["こうせき"], mnemonicFr: "Mérite + traces = MÉRITES.", levelId: 59 },
  { word: "栄誉", meaningsFr: ["Honneur"], readings: ["えいよ"], mnemonicFr: "Prospérer + gloire = HONNEUR.", levelId: 60 },
];

async function main() {
  console.log("Seeding final vocabulary to reach 6000...");

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
