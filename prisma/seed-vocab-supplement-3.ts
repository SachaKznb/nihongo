import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary for levels 46-60
const vocabData = [
  // Level 46 - Technology
  { word: "技術", meaningsFr: ["Technologie"], readings: ["ぎじゅつ"], mnemonicFr: "Technique + art = TECHNOLOGIE.", levelId: 46 },
  { word: "科学", meaningsFr: ["Science"], readings: ["かがく"], mnemonicFr: "Section + étude = SCIENCE.", levelId: 46 },
  { word: "実験", meaningsFr: ["Expérience"], readings: ["じっけん"], mnemonicFr: "Réalité + vérifier = EXPÉRIENCE.", levelId: 46 },
  { word: "研究", meaningsFr: ["Recherche"], readings: ["けんきゅう"], mnemonicFr: "Polir + étudier = RECHERCHE.", levelId: 46 },
  { word: "発明", meaningsFr: ["Invention"], readings: ["はつめい"], mnemonicFr: "Émettre + lumière = INVENTION.", levelId: 46 },
  { word: "機械", meaningsFr: ["Machine"], readings: ["きかい"], mnemonicFr: "Mécanisme + appareil = MACHINE.", levelId: 46 },
  { word: "電気", meaningsFr: ["Électricité"], readings: ["でんき"], mnemonicFr: "Éclair + énergie = ÉLECTRICITÉ.", levelId: 46 },
  { word: "通信", meaningsFr: ["Communication"], readings: ["つうしん"], mnemonicFr: "Passer + croire = COMMUNICATION.", levelId: 46 },

  // Level 47 - Internet
  { word: "情報", meaningsFr: ["Information"], readings: ["じょうほう"], mnemonicFr: "Sentiment + rapport = INFORMATION.", levelId: 47 },
  { word: "データ", meaningsFr: ["Données"], readings: ["データ"], mnemonicFr: "Les DONNÉES numériques.", levelId: 47 },
  { word: "検索", meaningsFr: ["Recherche"], readings: ["けんさく"], mnemonicFr: "Vérifier + corde = RECHERCHE.", levelId: 47 },
  { word: "接続", meaningsFr: ["Connexion"], readings: ["せつぞく"], mnemonicFr: "Toucher + continuer = CONNEXION.", levelId: 47 },
  { word: "送信", meaningsFr: ["Envoi"], readings: ["そうしん"], mnemonicFr: "Envoyer + croire = ENVOI.", levelId: 47 },
  { word: "受信", meaningsFr: ["Réception"], readings: ["じゅしん"], mnemonicFr: "Recevoir + croire = RÉCEPTION.", levelId: 47 },
  { word: "設定", meaningsFr: ["Paramètres"], readings: ["せってい"], mnemonicFr: "Établir + fixer = PARAMÈTRES.", levelId: 47 },
  { word: "画面", meaningsFr: ["Écran"], readings: ["がめん"], mnemonicFr: "Image + surface = ÉCRAN.", levelId: 47 },

  // Level 48 - Education
  { word: "教育", meaningsFr: ["Éducation"], readings: ["きょういく"], mnemonicFr: "Enseigner + élever = ÉDUCATION.", levelId: 48 },
  { word: "学校", meaningsFr: ["École"], readings: ["がっこう"], mnemonicFr: "Étude + bâtiment = ÉCOLE.", levelId: 48 },
  { word: "授業", meaningsFr: ["Cours"], readings: ["じゅぎょう"], mnemonicFr: "Donner + travail = COURS.", levelId: 48 },
  { word: "試験", meaningsFr: ["Examen"], readings: ["しけん"], mnemonicFr: "Essayer + vérifier = EXAMEN.", levelId: 48 },
  { word: "成績", meaningsFr: ["Notes"], readings: ["せいせき"], mnemonicFr: "Devenir + traces = NOTES.", levelId: 48 },
  { word: "卒業", meaningsFr: ["Diplôme"], readings: ["そつぎょう"], mnemonicFr: "Finir + travail = DIPLÔME.", levelId: 48 },
  { word: "入学", meaningsFr: ["Admission"], readings: ["にゅうがく"], mnemonicFr: "Entrer + étude = ADMISSION.", levelId: 48 },
  { word: "留学", meaningsFr: ["Études à l'étranger"], readings: ["りゅうがく"], mnemonicFr: "Rester + étude = ÉTUDES À L'ÉTRANGER.", levelId: 48 },

  // Level 49 - Career
  { word: "就職", meaningsFr: ["Emploi"], readings: ["しゅうしょく"], mnemonicFr: "Prendre + poste = EMPLOI.", levelId: 49 },
  { word: "転職", meaningsFr: ["Changement d'emploi"], readings: ["てんしょく"], mnemonicFr: "Tourner + poste = CHANGEMENT D'EMPLOI.", levelId: 49 },
  { word: "退職", meaningsFr: ["Démission"], readings: ["たいしょく"], mnemonicFr: "Se retirer + poste = DÉMISSION.", levelId: 49 },
  { word: "面接", meaningsFr: ["Entretien"], readings: ["めんせつ"], mnemonicFr: "Face + contact = ENTRETIEN.", levelId: 49 },
  { word: "履歴書", meaningsFr: ["CV"], readings: ["りれきしょ"], mnemonicFr: "Parcours + document = CV.", levelId: 49 },
  { word: "給料", meaningsFr: ["Salaire"], readings: ["きゅうりょう"], mnemonicFr: "Donner + mesure = SALAIRE.", levelId: 49 },
  { word: "昇進", meaningsFr: ["Promotion"], readings: ["しょうしん"], mnemonicFr: "Monter + avancer = PROMOTION.", levelId: 49 },
  { word: "解雇", meaningsFr: ["Licenciement"], readings: ["かいこ"], mnemonicFr: "Défaire + employer = LICENCIEMENT.", levelId: 49 },

  // Level 50 - Society
  { word: "社会", meaningsFr: ["Société"], readings: ["しゃかい"], mnemonicFr: "Organisation + rassemblement = SOCIÉTÉ.", levelId: 50 },
  { word: "文化", meaningsFr: ["Culture"], readings: ["ぶんか"], mnemonicFr: "Écriture + changement = CULTURE.", levelId: 50 },
  { word: "伝統", meaningsFr: ["Tradition"], readings: ["でんとう"], mnemonicFr: "Transmettre + unifier = TRADITION.", levelId: 50 },
  { word: "習慣", meaningsFr: ["Habitude"], readings: ["しゅうかん"], mnemonicFr: "Apprendre + habituel = HABITUDE.", levelId: 50 },
  { word: "宗教", meaningsFr: ["Religion"], readings: ["しゅうきょう"], mnemonicFr: "Ancêtre + enseignement = RELIGION.", levelId: 50 },
  { word: "歴史", meaningsFr: ["Histoire"], readings: ["れきし"], mnemonicFr: "Parcours + chronique = HISTOIRE.", levelId: 50 },
  { word: "政治", meaningsFr: ["Politique"], readings: ["せいじ"], mnemonicFr: "Gouverner + guérir = POLITIQUE.", levelId: 50 },
  { word: "経済", meaningsFr: ["Économie"], readings: ["けいざい"], mnemonicFr: "Passer + sauver = ÉCONOMIE.", levelId: 50 },

  // Level 51 - Law
  { word: "法律", meaningsFr: ["Loi"], readings: ["ほうりつ"], mnemonicFr: "Méthode + règle = LOI.", levelId: 51 },
  { word: "裁判", meaningsFr: ["Procès"], readings: ["さいばん"], mnemonicFr: "Couper + juger = PROCÈS.", levelId: 51 },
  { word: "弁護士", meaningsFr: ["Avocat"], readings: ["べんごし"], mnemonicFr: "Parler + protéger + maître = AVOCAT.", levelId: 51 },
  { word: "被告", meaningsFr: ["Accusé"], readings: ["ひこく"], mnemonicFr: "Recevoir + déclarer = ACCUSÉ.", levelId: 51 },
  { word: "原告", meaningsFr: ["Plaignant"], readings: ["げんこく"], mnemonicFr: "Origine + déclarer = PLAIGNANT.", levelId: 51 },
  { word: "証拠", meaningsFr: ["Preuve"], readings: ["しょうこ"], mnemonicFr: "Prouver + base = PREUVE.", levelId: 51 },
  { word: "判決", meaningsFr: ["Verdict"], readings: ["はんけつ"], mnemonicFr: "Juger + décider = VERDICT.", levelId: 51 },
  { word: "刑罰", meaningsFr: ["Punition"], readings: ["けいばつ"], mnemonicFr: "Peine + châtiment = PUNITION.", levelId: 51 },

  // Level 52 - Environment
  { word: "環境", meaningsFr: ["Environnement"], readings: ["かんきょう"], mnemonicFr: "Anneau + limite = ENVIRONNEMENT.", levelId: 52 },
  { word: "自然", meaningsFr: ["Nature"], readings: ["しぜん"], mnemonicFr: "Soi + ainsi = NATURE.", levelId: 52 },
  { word: "汚染", meaningsFr: ["Pollution"], readings: ["おせん"], mnemonicFr: "Sale + teindre = POLLUTION.", levelId: 52 },
  { word: "温暖化", meaningsFr: ["Réchauffement"], readings: ["おんだんか"], mnemonicFr: "Tiède + chaud + changement = RÉCHAUFFEMENT.", levelId: 52 },
  { word: "資源", meaningsFr: ["Ressources"], readings: ["しげん"], mnemonicFr: "Capital + source = RESSOURCES.", levelId: 52 },
  { word: "再生", meaningsFr: ["Recyclage"], readings: ["さいせい"], mnemonicFr: "Encore + vie = RECYCLAGE.", levelId: 52 },
  { word: "保護", meaningsFr: ["Protection"], readings: ["ほご"], mnemonicFr: "Garder + protéger = PROTECTION.", levelId: 52 },
  { word: "絶滅", meaningsFr: ["Extinction"], readings: ["ぜつめつ"], mnemonicFr: "Couper + détruire = EXTINCTION.", levelId: 52 },

  // Level 53 - Health
  { word: "健康診断", meaningsFr: ["Bilan de santé"], readings: ["けんこうしんだん"], mnemonicFr: "Santé + examiner = BILAN DE SANTÉ.", levelId: 53 },
  { word: "予防", meaningsFr: ["Prévention"], readings: ["よぼう"], mnemonicFr: "Avant + défendre = PRÉVENTION.", levelId: 53 },
  { word: "感染", meaningsFr: ["Infection"], readings: ["かんせん"], mnemonicFr: "Sentir + teindre = INFECTION.", levelId: 53 },
  { word: "免疫", meaningsFr: ["Immunité"], readings: ["めんえき"], mnemonicFr: "Échapper + épidémie = IMMUNITÉ.", levelId: 53 },
  { word: "副作用", meaningsFr: ["Effet secondaire"], readings: ["ふくさよう"], mnemonicFr: "Côté + effet = EFFET SECONDAIRE.", levelId: 53 },
  { word: "回復", meaningsFr: ["Rétablissement"], readings: ["かいふく"], mnemonicFr: "Tourner + revenir = RÉTABLISSEMENT.", levelId: 53 },
  { word: "慢性", meaningsFr: ["Chronique"], readings: ["まんせい"], mnemonicFr: "Lent + nature = CHRONIQUE.", levelId: 53 },
  { word: "急性", meaningsFr: ["Aigu"], readings: ["きゅうせい"], mnemonicFr: "Urgent + nature = AIGU.", levelId: 53 },

  // Level 54 - Travel
  { word: "旅行", meaningsFr: ["Voyage"], readings: ["りょこう"], mnemonicFr: "Voyager + aller = VOYAGE.", levelId: 54 },
  { word: "出発", meaningsFr: ["Départ"], readings: ["しゅっぱつ"], mnemonicFr: "Sortir + émettre = DÉPART.", levelId: 54 },
  { word: "到着", meaningsFr: ["Arrivée"], readings: ["とうちゃく"], mnemonicFr: "Atteindre + arriver = ARRIVÉE.", levelId: 54 },
  { word: "予約", meaningsFr: ["Réservation"], readings: ["よやく"], mnemonicFr: "Avant + promettre = RÉSERVATION.", levelId: 54 },
  { word: "観光", meaningsFr: ["Tourisme"], readings: ["かんこう"], mnemonicFr: "Regarder + lumière = TOURISME.", levelId: 54 },
  { word: "名所", meaningsFr: ["Site célèbre"], readings: ["めいしょ"], mnemonicFr: "Nom + lieu = SITE CÉLÈBRE.", levelId: 54 },
  { word: "土産", meaningsFr: ["Souvenir"], readings: ["みやげ"], mnemonicFr: "Terre + produit = SOUVENIR.", levelId: 54 },
  { word: "案内", meaningsFr: ["Guide"], readings: ["あんない"], mnemonicFr: "Plan + intérieur = GUIDE.", levelId: 54 },

  // Level 55 - Emotions
  { word: "感情", meaningsFr: ["Émotion"], readings: ["かんじょう"], mnemonicFr: "Sentir + sentiment = ÉMOTION.", levelId: 55 },
  { word: "喜び", meaningsFr: ["Joie"], readings: ["よろこび"], mnemonicFr: "Se réjouir = JOIE.", levelId: 55 },
  { word: "悲しみ", meaningsFr: ["Tristesse"], readings: ["かなしみ"], mnemonicFr: "Être triste = TRISTESSE.", levelId: 55 },
  { word: "怒り", meaningsFr: ["Colère"], readings: ["いかり"], mnemonicFr: "Se fâcher = COLÈRE.", levelId: 55 },
  { word: "恐怖", meaningsFr: ["Peur"], readings: ["きょうふ"], mnemonicFr: "Craindre + effrayer = PEUR.", levelId: 55 },
  { word: "驚き", meaningsFr: ["Surprise"], readings: ["おどろき"], mnemonicFr: "Être surpris = SURPRISE.", levelId: 55 },
  { word: "安心", meaningsFr: ["Soulagement"], readings: ["あんしん"], mnemonicFr: "Paix + cœur = SOULAGEMENT.", levelId: 55 },
  { word: "不安", meaningsFr: ["Anxiété"], readings: ["ふあん"], mnemonicFr: "Pas + paix = ANXIÉTÉ.", levelId: 55 },

  // Level 56 - Relationships
  { word: "関係", meaningsFr: ["Relation"], readings: ["かんけい"], mnemonicFr: "Barrière + lien = RELATION.", levelId: 56 },
  { word: "友情", meaningsFr: ["Amitié"], readings: ["ゆうじょう"], mnemonicFr: "Ami + sentiment = AMITIÉ.", levelId: 56 },
  { word: "愛情", meaningsFr: ["Amour"], readings: ["あいじょう"], mnemonicFr: "Amour + sentiment = AMOUR.", levelId: 56 },
  { word: "信頼", meaningsFr: ["Confiance"], readings: ["しんらい"], mnemonicFr: "Croire + compter sur = CONFIANCE.", levelId: 56 },
  { word: "尊敬", meaningsFr: ["Respect"], readings: ["そんけい"], mnemonicFr: "Honorer + respecter = RESPECT.", levelId: 56 },
  { word: "嫉妬", meaningsFr: ["Jalousie"], readings: ["しっと"], mnemonicFr: "Femme + envie = JALOUSIE.", levelId: 56 },
  { word: "別れ", meaningsFr: ["Séparation"], readings: ["わかれ"], mnemonicFr: "Se séparer = SÉPARATION.", levelId: 56 },
  { word: "和解", meaningsFr: ["Réconciliation"], readings: ["わかい"], mnemonicFr: "Harmonie + défaire = RÉCONCILIATION.", levelId: 56 },

  // Level 57 - Abstract
  { word: "可能性", meaningsFr: ["Possibilité"], readings: ["かのうせい"], mnemonicFr: "Pouvoir + nature = POSSIBILITÉ.", levelId: 57 },
  { word: "必要性", meaningsFr: ["Nécessité"], readings: ["ひつようせい"], mnemonicFr: "Nécessaire + nature = NÉCESSITÉ.", levelId: 57 },
  { word: "重要性", meaningsFr: ["Importance"], readings: ["じゅうようせい"], mnemonicFr: "Important + nature = IMPORTANCE.", levelId: 57 },
  { word: "危険性", meaningsFr: ["Dangerosité"], readings: ["きけんせい"], mnemonicFr: "Danger + nature = DANGEROSITÉ.", levelId: 57 },
  { word: "安全性", meaningsFr: ["Sécurité"], readings: ["あんぜんせい"], mnemonicFr: "Sûr + nature = SÉCURITÉ.", levelId: 57 },
  { word: "有効性", meaningsFr: ["Efficacité"], readings: ["ゆうこうせい"], mnemonicFr: "Avoir + effet + nature = EFFICACITÉ.", levelId: 57 },
  { word: "信頼性", meaningsFr: ["Fiabilité"], readings: ["しんらいせい"], mnemonicFr: "Confiance + nature = FIABILITÉ.", levelId: 57 },
  { word: "多様性", meaningsFr: ["Diversité"], readings: ["たようせい"], mnemonicFr: "Beaucoup + varié + nature = DIVERSITÉ.", levelId: 57 },

  // Level 58 - Philosophy
  { word: "哲学", meaningsFr: ["Philosophie"], readings: ["てつがく"], mnemonicFr: "Sage + étude = PHILOSOPHIE.", levelId: 58 },
  { word: "倫理", meaningsFr: ["Éthique"], readings: ["りんり"], mnemonicFr: "Ordre + raison = ÉTHIQUE.", levelId: 58 },
  { word: "価値", meaningsFr: ["Valeur"], readings: ["かち"], mnemonicFr: "Prix + valeur = VALEUR.", levelId: 58 },
  { word: "意味", meaningsFr: ["Sens"], readings: ["いみ"], mnemonicFr: "Intention + goût = SENS.", levelId: 58 },
  { word: "目的", meaningsFr: ["But"], readings: ["もくてき"], mnemonicFr: "Œil + cible = BUT.", levelId: 58 },
  { word: "原因", meaningsFr: ["Cause"], readings: ["げんいん"], mnemonicFr: "Origine + raison = CAUSE.", levelId: 58 },
  { word: "結果", meaningsFr: ["Résultat"], readings: ["けっか"], mnemonicFr: "Lier + fruit = RÉSULTAT.", levelId: 58 },
  { word: "理由", meaningsFr: ["Raison"], readings: ["りゆう"], mnemonicFr: "Raison + depuis = RAISON.", levelId: 58 },

  // Level 59 - Advanced
  { word: "概念", meaningsFr: ["Concept"], readings: ["がいねん"], mnemonicFr: "Approximation + idée = CONCEPT.", levelId: 59 },
  { word: "定義", meaningsFr: ["Définition"], readings: ["ていぎ"], mnemonicFr: "Fixer + justice = DÉFINITION.", levelId: 59 },
  { word: "仮説", meaningsFr: ["Hypothèse"], readings: ["かせつ"], mnemonicFr: "Temporaire + explication = HYPOTHÈSE.", levelId: 59 },
  { word: "矛盾", meaningsFr: ["Contradiction"], readings: ["むじゅん"], mnemonicFr: "Lance + bouclier = CONTRADICTION.", levelId: 59 },
  { word: "論理", meaningsFr: ["Logique"], readings: ["ろんり"], mnemonicFr: "Débat + raison = LOGIQUE.", levelId: 59 },
  { word: "分析", meaningsFr: ["Analyse"], readings: ["ぶんせき"], mnemonicFr: "Diviser + séparer = ANALYSE.", levelId: 59 },
  { word: "評価", meaningsFr: ["Évaluation"], readings: ["ひょうか"], mnemonicFr: "Critiquer + prix = ÉVALUATION.", levelId: 59 },
  { word: "比較", meaningsFr: ["Comparaison"], readings: ["ひかく"], mnemonicFr: "Comparer + comparer = COMPARAISON.", levelId: 59 },

  // Level 60 - Final
  { word: "達成", meaningsFr: ["Accomplissement"], readings: ["たっせい"], mnemonicFr: "Atteindre + devenir = ACCOMPLISSEMENT.", levelId: 60 },
  { word: "成功", meaningsFr: ["Succès"], readings: ["せいこう"], mnemonicFr: "Devenir + mérite = SUCCÈS.", levelId: 60 },
  { word: "失敗", meaningsFr: ["Échec"], readings: ["しっぱい"], mnemonicFr: "Perdre + défaite = ÉCHEC.", levelId: 60 },
  { word: "挑戦", meaningsFr: ["Défi"], readings: ["ちょうせん"], mnemonicFr: "Provoquer + combat = DÉFI.", levelId: 60 },
  { word: "努力", meaningsFr: ["Effort"], readings: ["どりょく"], mnemonicFr: "S'efforcer + force = EFFORT.", levelId: 60 },
  { word: "忍耐", meaningsFr: ["Patience"], readings: ["にんたい"], mnemonicFr: "Endurer + supporter = PATIENCE.", levelId: 60 },
  { word: "決意", meaningsFr: ["Détermination"], readings: ["けつい"], mnemonicFr: "Décider + intention = DÉTERMINATION.", levelId: 60 },
  { word: "覚悟", meaningsFr: ["Résolution"], readings: ["かくご"], mnemonicFr: "Réaliser + comprendre = RÉSOLUTION.", levelId: 60 },
];

async function main() {
  console.log("Seeding vocabulary supplement 3 (levels 46-60)...");

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
