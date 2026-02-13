import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Final vocabulary to reach 6000 target
const vocabData = [
  // Technology vocabulary for higher levels
  { word: "インターネット", meaningsFr: ["Internet"], readings: ["インターネット"], mnemonicFr: "De l'anglais Internet.", levelId: 46 },
  { word: "ウェブサイト", meaningsFr: ["Site web"], readings: ["ウェブサイト"], mnemonicFr: "De l'anglais website.", levelId: 46 },
  { word: "ダウンロード", meaningsFr: ["Téléchargement"], readings: ["ダウンロード"], mnemonicFr: "De l'anglais download.", levelId: 46 },
  { word: "アップロード", meaningsFr: ["Téléverser"], readings: ["アップロード"], mnemonicFr: "De l'anglais upload.", levelId: 46 },
  { word: "パスワード", meaningsFr: ["Mot de passe"], readings: ["パスワード"], mnemonicFr: "De l'anglais password.", levelId: 47 },
  { word: "ログイン", meaningsFr: ["Connexion"], readings: ["ログイン"], mnemonicFr: "De l'anglais login.", levelId: 47 },
  { word: "ログアウト", meaningsFr: ["Déconnexion"], readings: ["ログアウト"], mnemonicFr: "De l'anglais logout.", levelId: 47 },
  { word: "メール", meaningsFr: ["E-mail"], readings: ["メール"], mnemonicFr: "De l'anglais mail.", levelId: 47 },

  // Business vocabulary
  { word: "ビジネス", meaningsFr: ["Business"], readings: ["ビジネス"], mnemonicFr: "De l'anglais business.", levelId: 48 },
  { word: "プロジェクト", meaningsFr: ["Projet"], readings: ["プロジェクト"], mnemonicFr: "De l'anglais project.", levelId: 48 },
  { word: "ミーティング", meaningsFr: ["Réunion"], readings: ["ミーティング"], mnemonicFr: "De l'anglais meeting.", levelId: 48 },
  { word: "プレゼン", meaningsFr: ["Présentation"], readings: ["プレゼン"], mnemonicFr: "Abréviation de presentation.", levelId: 48 },
  { word: "スケジュール", meaningsFr: ["Emploi du temps"], readings: ["スケジュール"], mnemonicFr: "De l'anglais schedule.", levelId: 49 },
  { word: "デッドライン", meaningsFr: ["Date limite"], readings: ["デッドライン"], mnemonicFr: "De l'anglais deadline.", levelId: 49 },
  { word: "コスト", meaningsFr: ["Coût"], readings: ["コスト"], mnemonicFr: "De l'anglais cost.", levelId: 49 },
  { word: "クライアント", meaningsFr: ["Client"], readings: ["クライアント"], mnemonicFr: "De l'anglais client.", levelId: 49 },

  // Academic vocabulary
  { word: "論文", meaningsFr: ["Thèse"], readings: ["ろんぶん"], mnemonicFr: "Texte de théorie = THÈSE.", levelId: 50 },
  { word: "研究室", meaningsFr: ["Laboratoire"], readings: ["けんきゅうしつ"], mnemonicFr: "Pièce de recherche = LABORATOIRE.", levelId: 50 },
  { word: "教授", meaningsFr: ["Professeur"], readings: ["きょうじゅ"], mnemonicFr: "Qui enseigne et donne = PROFESSEUR.", levelId: 50 },
  { word: "学生", meaningsFr: ["Étudiant"], readings: ["がくせい"], mnemonicFr: "Qui naît de l'étude = ÉTUDIANT.", levelId: 50 },
  { word: "奨学金", meaningsFr: ["Bourse"], readings: ["しょうがくきん"], mnemonicFr: "Argent pour encourager l'étude = BOURSE.", levelId: 51 },
  { word: "修士", meaningsFr: ["Master"], readings: ["しゅうし"], mnemonicFr: "Maître qui étudie = MASTER.", levelId: 51 },
  { word: "博士", meaningsFr: ["Doctorat"], readings: ["はくし"], mnemonicFr: "Maître érudit = DOCTORAT.", levelId: 51 },
  { word: "単位", meaningsFr: ["Crédit"], readings: ["たんい"], mnemonicFr: "Unité simple = CRÉDIT.", levelId: 51 },

  // Legal vocabulary
  { word: "法律", meaningsFr: ["Loi"], readings: ["ほうりつ"], mnemonicFr: "Méthode + règle = LOI.", levelId: 52 },
  { word: "憲法", meaningsFr: ["Constitution"], readings: ["けんぽう"], mnemonicFr: "Loi fondamentale = CONSTITUTION.", levelId: 52 },
  { word: "条約", meaningsFr: ["Traité"], readings: ["じょうやく"], mnemonicFr: "Article + promesse = TRAITÉ.", levelId: 52 },
  { word: "権利", meaningsFr: ["Droit"], readings: ["けんり"], mnemonicFr: "Autorité + profit = DROIT.", levelId: 52 },
  { word: "義務", meaningsFr: ["Devoir"], readings: ["ぎむ"], mnemonicFr: "Justice + travail = DEVOIR.", levelId: 53 },
  { word: "責任", meaningsFr: ["Responsabilité"], readings: ["せきにん"], mnemonicFr: "Blâme + confier = RESPONSABILITÉ.", levelId: 53 },
  { word: "許可", meaningsFr: ["Permission"], readings: ["きょか"], mnemonicFr: "Permettre + accepter = PERMISSION.", levelId: 53 },
  { word: "禁止", meaningsFr: ["Interdiction"], readings: ["きんし"], mnemonicFr: "Interdire + arrêter = INTERDICTION.", levelId: 53 },

  // Medical vocabulary
  { word: "医者", meaningsFr: ["Médecin"], readings: ["いしゃ"], mnemonicFr: "Personne de la médecine = MÉDECIN.", levelId: 54 },
  { word: "看護師", meaningsFr: ["Infirmier"], readings: ["かんごし"], mnemonicFr: "Maître qui surveille = INFIRMIER.", levelId: 54 },
  { word: "患者", meaningsFr: ["Patient"], readings: ["かんじゃ"], mnemonicFr: "Personne inquiète = PATIENT.", levelId: 54 },
  { word: "診察", meaningsFr: ["Examen médical"], readings: ["しんさつ"], mnemonicFr: "Examiner + inspecter = EXAMEN.", levelId: 54 },
  { word: "処方", meaningsFr: ["Prescription"], readings: ["しょほう"], mnemonicFr: "Traiter + méthode = PRESCRIPTION.", levelId: 55 },
  { word: "副作用", meaningsFr: ["Effet secondaire"], readings: ["ふくさよう"], mnemonicFr: "Côté + effet = EFFET SECONDAIRE.", levelId: 55 },
  { word: "検査", meaningsFr: ["Test médical"], readings: ["けんさ"], mnemonicFr: "Vérifier + examiner = TEST.", levelId: 55 },
  { word: "手当て", meaningsFr: ["Traitement"], readings: ["てあて"], mnemonicFr: "Main + appliquer = TRAITEMENT.", levelId: 55 },

  // Environmental vocabulary
  { word: "環境", meaningsFr: ["Environnement"], readings: ["かんきょう"], mnemonicFr: "Anneau + limite = ENVIRONNEMENT.", levelId: 56 },
  { word: "汚染", meaningsFr: ["Pollution"], readings: ["おせん"], mnemonicFr: "Sale + teindre = POLLUTION.", levelId: 56 },
  { word: "温暖化", meaningsFr: ["Réchauffement"], readings: ["おんだんか"], mnemonicFr: "Tiède + chaud = RÉCHAUFFEMENT.", levelId: 56 },
  { word: "資源", meaningsFr: ["Ressources"], readings: ["しげん"], mnemonicFr: "Capital + source = RESSOURCES.", levelId: 56 },
  { word: "再利用", meaningsFr: ["Recyclage"], readings: ["さいりよう"], mnemonicFr: "Encore + utiliser = RECYCLAGE.", levelId: 57 },
  { word: "節約", meaningsFr: ["Économie"], readings: ["せつやく"], mnemonicFr: "Section + promettre = ÉCONOMIE.", levelId: 57 },
  { word: "持続可能", meaningsFr: ["Durable"], readings: ["じぞくかのう"], mnemonicFr: "Continuer + possible = DURABLE.", levelId: 57 },
  { word: "絶滅", meaningsFr: ["Extinction"], readings: ["ぜつめつ"], mnemonicFr: "Couper + détruire = EXTINCTION.", levelId: 57 },

  // Cultural vocabulary
  { word: "伝統", meaningsFr: ["Tradition"], readings: ["でんとう"], mnemonicFr: "Transmettre + unifier = TRADITION.", levelId: 58 },
  { word: "文化", meaningsFr: ["Culture"], readings: ["ぶんか"], mnemonicFr: "Écriture + changement = CULTURE.", levelId: 58 },
  { word: "芸術", meaningsFr: ["Art"], readings: ["げいじゅつ"], mnemonicFr: "Talent + technique = ART.", levelId: 58 },
  { word: "遺産", meaningsFr: ["Patrimoine"], readings: ["いさん"], mnemonicFr: "Laisser + produit = PATRIMOINE.", levelId: 58 },
  { word: "儀式", meaningsFr: ["Cérémonie"], readings: ["ぎしき"], mnemonicFr: "Rite + style = CÉRÉMONIE.", levelId: 59 },
  { word: "祭り", meaningsFr: ["Festival"], readings: ["まつり"], mnemonicFr: "Le rassemblement sacré = FESTIVAL.", levelId: 59 },
  { word: "神社", meaningsFr: ["Sanctuaire"], readings: ["じんじゃ"], mnemonicFr: "Dieu + organisation = SANCTUAIRE.", levelId: 59 },
  { word: "寺", meaningsFr: ["Temple"], readings: ["てら"], mnemonicFr: "Le lieu sacré = TEMPLE.", levelId: 59 },

  // Philosophy vocabulary
  { word: "哲学", meaningsFr: ["Philosophie"], readings: ["てつがく"], mnemonicFr: "Sage + étude = PHILOSOPHIE.", levelId: 60 },
  { word: "倫理", meaningsFr: ["Éthique"], readings: ["りんり"], mnemonicFr: "Ordre + raison = ÉTHIQUE.", levelId: 60 },
  { word: "価値観", meaningsFr: ["Valeurs"], readings: ["かちかん"], mnemonicFr: "Valeur + vision = VALEURS.", levelId: 60 },
  { word: "信念", meaningsFr: ["Conviction"], readings: ["しんねん"], mnemonicFr: "Croire + idée = CONVICTION.", levelId: 60 },
  { word: "原則", meaningsFr: ["Principe"], readings: ["げんそく"], mnemonicFr: "Origine + règle = PRINCIPE.", levelId: 60 },
  { word: "道徳", meaningsFr: ["Morale"], readings: ["どうとく"], mnemonicFr: "Voie + vertu = MORALE.", levelId: 60 },
  { word: "思想", meaningsFr: ["Pensée"], readings: ["しそう"], mnemonicFr: "Penser + idée = PENSÉE.", levelId: 60 },
  { word: "概念", meaningsFr: ["Concept"], readings: ["がいねん"], mnemonicFr: "Approximation + idée = CONCEPT.", levelId: 60 },

  // Additional everyday vocabulary
  { word: "約束", meaningsFr: ["Promesse"], readings: ["やくそく"], mnemonicFr: "Lier + paquet = PROMESSE.", levelId: 31 },
  { word: "予定", meaningsFr: ["Programme"], readings: ["よてい"], mnemonicFr: "Avant + fixer = PROGRAMME.", levelId: 31 },
  { word: "準備", meaningsFr: ["Préparation"], readings: ["じゅんび"], mnemonicFr: "Niveau + préparer = PRÉPARATION.", levelId: 32 },
  { word: "計画", meaningsFr: ["Plan"], readings: ["けいかく"], mnemonicFr: "Calculer + tracer = PLAN.", levelId: 32 },
  { word: "目標", meaningsFr: ["Objectif"], readings: ["もくひょう"], mnemonicFr: "Œil + marque = OBJECTIF.", levelId: 33 },
  { word: "目的", meaningsFr: ["But"], readings: ["もくてき"], mnemonicFr: "Œil + cible = BUT.", levelId: 33 },
  { word: "結果", meaningsFr: ["Résultat"], readings: ["けっか"], mnemonicFr: "Lier + fruit = RÉSULTAT.", levelId: 34 },
  { word: "原因", meaningsFr: ["Cause"], readings: ["げんいん"], mnemonicFr: "Origine + raison = CAUSE.", levelId: 34 },

  // More daily life
  { word: "機会", meaningsFr: ["Occasion"], readings: ["きかい"], mnemonicFr: "Machine + rassemblement = OCCASION.", levelId: 35 },
  { word: "機会", meaningsFr: ["Opportunité"], readings: ["きかい"], mnemonicFr: "Machine + rassemblement = OPPORTUNITÉ.", levelId: 35 },
  { word: "経験", meaningsFr: ["Expérience"], readings: ["けいけん"], mnemonicFr: "Passer + vérifier = EXPÉRIENCE.", levelId: 36 },
  { word: "思い出", meaningsFr: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "Penser + sortir = SOUVENIR.", levelId: 36 },
  { word: "将来", meaningsFr: ["Avenir"], readings: ["しょうらい"], mnemonicFr: "Général + venir = AVENIR.", levelId: 37 },
  { word: "過去", meaningsFr: ["Passé"], readings: ["かこ"], mnemonicFr: "Passer + ancien = PASSÉ.", levelId: 37 },
  { word: "現在", meaningsFr: ["Présent"], readings: ["げんざい"], mnemonicFr: "Apparaître + exister = PRÉSENT.", levelId: 38 },
  { word: "未来", meaningsFr: ["Futur"], readings: ["みらい"], mnemonicFr: "Pas encore + venir = FUTUR.", levelId: 38 },

  // Final words
  { word: "努力", meaningsFr: ["Effort"], readings: ["どりょく"], mnemonicFr: "S'efforcer + force = EFFORT.", levelId: 39 },
  { word: "成功", meaningsFr: ["Succès"], readings: ["せいこう"], mnemonicFr: "Devenir + mérite = SUCCÈS.", levelId: 39 },
  { word: "失敗", meaningsFr: ["Échec"], readings: ["しっぱい"], mnemonicFr: "Perdre + défaite = ÉCHEC.", levelId: 40 },
  { word: "挑戦", meaningsFr: ["Défi"], readings: ["ちょうせん"], mnemonicFr: "Provoquer + combat = DÉFI.", levelId: 40 },
  { word: "達成", meaningsFr: ["Accomplissement"], readings: ["たっせい"], mnemonicFr: "Atteindre + devenir = ACCOMPLISSEMENT.", levelId: 40 },
  { word: "実現", meaningsFr: ["Réalisation"], readings: ["じつげん"], mnemonicFr: "Réalité + apparaître = RÉALISATION.", levelId: 40 },
  { word: "夢", meaningsFr: ["Rêve"], readings: ["ゆめ"], mnemonicFr: "L'aspiration nocturne = RÊVE.", levelId: 40 },
  { word: "希望", meaningsFr: ["Espoir"], readings: ["きぼう"], mnemonicFr: "Rare + désirer = ESPOIR.", levelId: 40 },
];

async function main() {
  console.log("Seeding final vocabulary supplement...");

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
