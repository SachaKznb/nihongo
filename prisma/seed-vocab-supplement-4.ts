import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary for levels 1-20 to ensure early levels are well-covered
const vocabData = [
  // Level 1 - Basic greetings
  { word: "こんにちは", meaningsFr: ["Bonjour"], readings: ["こんにちは"], mnemonicFr: "La salutation de la journée - BONJOUR.", levelId: 1 },
  { word: "さようなら", meaningsFr: ["Au revoir"], readings: ["さようなら"], mnemonicFr: "Si c'est ainsi - AU REVOIR.", levelId: 1 },
  { word: "ありがとう", meaningsFr: ["Merci"], readings: ["ありがとう"], mnemonicFr: "C'est rare - MERCI.", levelId: 1 },
  { word: "すみません", meaningsFr: ["Excusez-moi"], readings: ["すみません"], mnemonicFr: "Ce n'est pas fini - EXCUSEZ-MOI.", levelId: 1 },
  { word: "はい", meaningsFr: ["Oui"], readings: ["はい"], mnemonicFr: "Affirmatif - OUI.", levelId: 1 },
  { word: "いいえ", meaningsFr: ["Non"], readings: ["いいえ"], mnemonicFr: "Négatif - NON.", levelId: 1 },
  { word: "おはよう", meaningsFr: ["Bonjour (matin)"], readings: ["おはよう"], mnemonicFr: "C'est tôt - BONJOUR du matin.", levelId: 1 },
  { word: "こんばんは", meaningsFr: ["Bonsoir"], readings: ["こんばんは"], mnemonicFr: "Ce soir - BONSOIR.", levelId: 1 },

  // Level 2 - Numbers
  { word: "一つ", meaningsFr: ["Un (objet)"], readings: ["ひとつ"], mnemonicFr: "Une chose - UN objet.", levelId: 2 },
  { word: "二つ", meaningsFr: ["Deux (objets)"], readings: ["ふたつ"], mnemonicFr: "Deux choses - DEUX objets.", levelId: 2 },
  { word: "三つ", meaningsFr: ["Trois (objets)"], readings: ["みっつ"], mnemonicFr: "Trois choses - TROIS objets.", levelId: 2 },
  { word: "四つ", meaningsFr: ["Quatre (objets)"], readings: ["よっつ"], mnemonicFr: "Quatre choses - QUATRE objets.", levelId: 2 },
  { word: "五つ", meaningsFr: ["Cinq (objets)"], readings: ["いつつ"], mnemonicFr: "Cinq choses - CINQ objets.", levelId: 2 },
  { word: "十", meaningsFr: ["Dix"], readings: ["じゅう"], mnemonicFr: "Le chiffre parfait - DIX.", levelId: 2 },
  { word: "百", meaningsFr: ["Cent"], readings: ["ひゃく"], mnemonicFr: "Un blanc - CENT.", levelId: 2 },
  { word: "千", meaningsFr: ["Mille"], readings: ["せん"], mnemonicFr: "Une personne + dix = MILLE.", levelId: 2 },

  // Level 3 - Time
  { word: "今日", meaningsFr: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "Ce jour - AUJOURD'HUI.", levelId: 3 },
  { word: "明日", meaningsFr: ["Demain"], readings: ["あした"], mnemonicFr: "Le jour qui vient - DEMAIN.", levelId: 3 },
  { word: "昨日", meaningsFr: ["Hier"], readings: ["きのう"], mnemonicFr: "Le jour passé - HIER.", levelId: 3 },
  { word: "毎日", meaningsFr: ["Chaque jour"], readings: ["まいにち"], mnemonicFr: "Chaque jour - QUOTIDIEN.", levelId: 3 },
  { word: "今週", meaningsFr: ["Cette semaine"], readings: ["こんしゅう"], mnemonicFr: "Cette semaine - CETTE SEMAINE.", levelId: 3 },
  { word: "来週", meaningsFr: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonicFr: "La semaine qui vient - SEMAINE PROCHAINE.", levelId: 3 },
  { word: "先週", meaningsFr: ["La semaine dernière"], readings: ["せんしゅう"], mnemonicFr: "La semaine avant - SEMAINE DERNIÈRE.", levelId: 3 },
  { word: "今月", meaningsFr: ["Ce mois"], readings: ["こんげつ"], mnemonicFr: "Ce mois - CE MOIS.", levelId: 3 },

  // Level 4 - Places
  { word: "家", meaningsFr: ["Maison"], readings: ["いえ"], mnemonicFr: "L'endroit où on vit - MAISON.", levelId: 4 },
  { word: "学校", meaningsFr: ["École"], readings: ["がっこう"], mnemonicFr: "Le bâtiment d'étude - ÉCOLE.", levelId: 4 },
  { word: "会社", meaningsFr: ["Entreprise"], readings: ["かいしゃ"], mnemonicFr: "La société où on se réunit - ENTREPRISE.", levelId: 4 },
  { word: "病院", meaningsFr: ["Hôpital"], readings: ["びょういん"], mnemonicFr: "L'établissement des malades - HÔPITAL.", levelId: 4 },
  { word: "銀行", meaningsFr: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "L'établissement de l'argent - BANQUE.", levelId: 4 },
  { word: "郵便局", meaningsFr: ["Bureau de poste"], readings: ["ゆうびんきょく"], mnemonicFr: "Le bureau du courrier - POSTE.", levelId: 4 },
  { word: "図書館", meaningsFr: ["Bibliothèque"], readings: ["としょかん"], mnemonicFr: "Le bâtiment des livres - BIBLIOTHÈQUE.", levelId: 4 },
  { word: "駅", meaningsFr: ["Gare"], readings: ["えき"], mnemonicFr: "L'endroit des chevaux - GARE.", levelId: 4 },

  // Level 5 - Family
  { word: "家族", meaningsFr: ["Famille"], readings: ["かぞく"], mnemonicFr: "Le groupe de la maison - FAMILLE.", levelId: 5 },
  { word: "両親", meaningsFr: ["Parents"], readings: ["りょうしん"], mnemonicFr: "Les deux proches - PARENTS.", levelId: 5 },
  { word: "兄弟", meaningsFr: ["Frères et sœurs"], readings: ["きょうだい"], mnemonicFr: "Frère aîné et cadet - FRÈRES ET SŒURS.", levelId: 5 },
  { word: "子供", meaningsFr: ["Enfant"], readings: ["こども"], mnemonicFr: "L'accompagnateur - ENFANT.", levelId: 5 },
  { word: "赤ちゃん", meaningsFr: ["Bébé"], readings: ["あかちゃん"], mnemonicFr: "Le petit rouge - BÉBÉ.", levelId: 5 },
  { word: "祖父", meaningsFr: ["Grand-père"], readings: ["そふ"], mnemonicFr: "L'ancêtre père - GRAND-PÈRE.", levelId: 5 },
  { word: "祖母", meaningsFr: ["Grand-mère"], readings: ["そぼ"], mnemonicFr: "L'ancêtre mère - GRAND-MÈRE.", levelId: 5 },
  { word: "親戚", meaningsFr: ["Parents (famille élargie)"], readings: ["しんせき"], mnemonicFr: "Les proches qui touchent - PARENTS.", levelId: 5 },

  // Level 6 - Body
  { word: "体", meaningsFr: ["Corps"], readings: ["からだ"], mnemonicFr: "Le support de la personne - CORPS.", levelId: 6 },
  { word: "頭", meaningsFr: ["Tête"], readings: ["あたま"], mnemonicFr: "La page du haricot - TÊTE.", levelId: 6 },
  { word: "顔", meaningsFr: ["Visage"], readings: ["かお"], mnemonicFr: "La page de l'origine - VISAGE.", levelId: 6 },
  { word: "目", meaningsFr: ["Œil"], readings: ["め"], mnemonicFr: "L'organe qui voit - ŒIL.", levelId: 6 },
  { word: "耳", meaningsFr: ["Oreille"], readings: ["みみ"], mnemonicFr: "L'organe qui entend - OREILLE.", levelId: 6 },
  { word: "鼻", meaningsFr: ["Nez"], readings: ["はな"], mnemonicFr: "L'organe qui sent - NEZ.", levelId: 6 },
  { word: "口", meaningsFr: ["Bouche"], readings: ["くち"], mnemonicFr: "L'organe qui parle - BOUCHE.", levelId: 6 },
  { word: "手", meaningsFr: ["Main"], readings: ["て"], mnemonicFr: "Le membre qui saisit - MAIN.", levelId: 6 },

  // Level 7 - Food
  { word: "食べ物", meaningsFr: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "La chose à manger - NOURRITURE.", levelId: 7 },
  { word: "飲み物", meaningsFr: ["Boisson"], readings: ["のみもの"], mnemonicFr: "La chose à boire - BOISSON.", levelId: 7 },
  { word: "ご飯", meaningsFr: ["Riz (repas)"], readings: ["ごはん"], mnemonicFr: "Le repas principal - RIZ.", levelId: 7 },
  { word: "パン", meaningsFr: ["Pain"], readings: ["パン"], mnemonicFr: "Du portugais - PAIN.", levelId: 7 },
  { word: "肉", meaningsFr: ["Viande"], readings: ["にく"], mnemonicFr: "La chair - VIANDE.", levelId: 7 },
  { word: "魚", meaningsFr: ["Poisson"], readings: ["さかな"], mnemonicFr: "L'animal de l'eau - POISSON.", levelId: 7 },
  { word: "野菜", meaningsFr: ["Légumes"], readings: ["やさい"], mnemonicFr: "Les herbes des champs - LÉGUMES.", levelId: 7 },
  { word: "果物", meaningsFr: ["Fruits"], readings: ["くだもの"], mnemonicFr: "Les résultats des arbres - FRUITS.", levelId: 7 },

  // Level 8 - Drinks
  { word: "水", meaningsFr: ["Eau"], readings: ["みず"], mnemonicFr: "Le liquide de vie - EAU.", levelId: 8 },
  { word: "お茶", meaningsFr: ["Thé"], readings: ["おちゃ"], mnemonicFr: "La boisson respectée - THÉ.", levelId: 8 },
  { word: "コーヒー", meaningsFr: ["Café"], readings: ["コーヒー"], mnemonicFr: "De l'anglais coffee - CAFÉ.", levelId: 8 },
  { word: "牛乳", meaningsFr: ["Lait"], readings: ["ぎゅうにゅう"], mnemonicFr: "Le liquide de vache - LAIT.", levelId: 8 },
  { word: "ジュース", meaningsFr: ["Jus"], readings: ["ジュース"], mnemonicFr: "De l'anglais juice - JUS.", levelId: 8 },
  { word: "ビール", meaningsFr: ["Bière"], readings: ["ビール"], mnemonicFr: "De l'anglais beer - BIÈRE.", levelId: 8 },
  { word: "お酒", meaningsFr: ["Alcool"], readings: ["おさけ"], mnemonicFr: "La boisson respectée - ALCOOL.", levelId: 8 },
  { word: "紅茶", meaningsFr: ["Thé noir"], readings: ["こうちゃ"], mnemonicFr: "Le thé rouge - THÉ NOIR.", levelId: 8 },

  // Level 9 - Colors
  { word: "色", meaningsFr: ["Couleur"], readings: ["いろ"], mnemonicFr: "La propriété visuelle - COULEUR.", levelId: 9 },
  { word: "赤い", meaningsFr: ["Rouge"], readings: ["あかい"], mnemonicFr: "Comme le feu - ROUGE.", levelId: 9 },
  { word: "青い", meaningsFr: ["Bleu"], readings: ["あおい"], mnemonicFr: "Comme le ciel - BLEU.", levelId: 9 },
  { word: "黄色い", meaningsFr: ["Jaune"], readings: ["きいろい"], mnemonicFr: "Comme le soleil - JAUNE.", levelId: 9 },
  { word: "白い", meaningsFr: ["Blanc"], readings: ["しろい"], mnemonicFr: "Comme la neige - BLANC.", levelId: 9 },
  { word: "黒い", meaningsFr: ["Noir"], readings: ["くろい"], mnemonicFr: "Comme la nuit - NOIR.", levelId: 9 },
  { word: "緑", meaningsFr: ["Vert"], readings: ["みどり"], mnemonicFr: "Comme les feuilles - VERT.", levelId: 9 },
  { word: "茶色", meaningsFr: ["Marron"], readings: ["ちゃいろ"], mnemonicFr: "Couleur du thé - MARRON.", levelId: 9 },

  // Level 10 - Adjectives
  { word: "大きい", meaningsFr: ["Grand"], readings: ["おおきい"], mnemonicFr: "De grande taille - GRAND.", levelId: 10 },
  { word: "小さい", meaningsFr: ["Petit"], readings: ["ちいさい"], mnemonicFr: "De petite taille - PETIT.", levelId: 10 },
  { word: "新しい", meaningsFr: ["Nouveau"], readings: ["あたらしい"], mnemonicFr: "Récemment créé - NOUVEAU.", levelId: 10 },
  { word: "古い", meaningsFr: ["Vieux"], readings: ["ふるい"], mnemonicFr: "Depuis longtemps - VIEUX.", levelId: 10 },
  { word: "高い", meaningsFr: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "Élevé - HAUT ou CHER.", levelId: 10 },
  { word: "安い", meaningsFr: ["Bon marché"], readings: ["やすい"], mnemonicFr: "Paisible - BON MARCHÉ.", levelId: 10 },
  { word: "長い", meaningsFr: ["Long"], readings: ["ながい"], mnemonicFr: "Étendu - LONG.", levelId: 10 },
  { word: "短い", meaningsFr: ["Court"], readings: ["みじかい"], mnemonicFr: "Pas long - COURT.", levelId: 10 },

  // Level 11-15 - Verbs
  { word: "食べる", meaningsFr: ["Manger"], readings: ["たべる"], mnemonicFr: "L'action de manger - MANGER.", levelId: 11 },
  { word: "飲む", meaningsFr: ["Boire"], readings: ["のむ"], mnemonicFr: "L'action de boire - BOIRE.", levelId: 11 },
  { word: "見る", meaningsFr: ["Voir"], readings: ["みる"], mnemonicFr: "L'action de voir - VOIR.", levelId: 11 },
  { word: "聞く", meaningsFr: ["Entendre"], readings: ["きく"], mnemonicFr: "L'action d'entendre - ENTENDRE.", levelId: 11 },
  { word: "話す", meaningsFr: ["Parler"], readings: ["はなす"], mnemonicFr: "L'action de parler - PARLER.", levelId: 11 },
  { word: "読む", meaningsFr: ["Lire"], readings: ["よむ"], mnemonicFr: "L'action de lire - LIRE.", levelId: 11 },
  { word: "書く", meaningsFr: ["Écrire"], readings: ["かく"], mnemonicFr: "L'action d'écrire - ÉCRIRE.", levelId: 11 },
  { word: "行く", meaningsFr: ["Aller"], readings: ["いく"], mnemonicFr: "L'action d'aller - ALLER.", levelId: 11 },

  { word: "来る", meaningsFr: ["Venir"], readings: ["くる"], mnemonicFr: "L'action de venir - VENIR.", levelId: 12 },
  { word: "帰る", meaningsFr: ["Rentrer"], readings: ["かえる"], mnemonicFr: "L'action de rentrer - RENTRER.", levelId: 12 },
  { word: "買う", meaningsFr: ["Acheter"], readings: ["かう"], mnemonicFr: "L'action d'acheter - ACHETER.", levelId: 12 },
  { word: "売る", meaningsFr: ["Vendre"], readings: ["うる"], mnemonicFr: "L'action de vendre - VENDRE.", levelId: 12 },
  { word: "作る", meaningsFr: ["Faire"], readings: ["つくる"], mnemonicFr: "L'action de créer - FAIRE.", levelId: 12 },
  { word: "使う", meaningsFr: ["Utiliser"], readings: ["つかう"], mnemonicFr: "L'action d'utiliser - UTILISER.", levelId: 12 },
  { word: "待つ", meaningsFr: ["Attendre"], readings: ["まつ"], mnemonicFr: "L'action d'attendre - ATTENDRE.", levelId: 12 },
  { word: "持つ", meaningsFr: ["Tenir"], readings: ["もつ"], mnemonicFr: "L'action de tenir - TENIR.", levelId: 12 },

  { word: "歩く", meaningsFr: ["Marcher"], readings: ["あるく"], mnemonicFr: "L'action de marcher - MARCHER.", levelId: 13 },
  { word: "走る", meaningsFr: ["Courir"], readings: ["はしる"], mnemonicFr: "L'action de courir - COURIR.", levelId: 13 },
  { word: "泳ぐ", meaningsFr: ["Nager"], readings: ["およぐ"], mnemonicFr: "L'action de nager - NAGER.", levelId: 13 },
  { word: "飛ぶ", meaningsFr: ["Voler"], readings: ["とぶ"], mnemonicFr: "L'action de voler - VOLER.", levelId: 13 },
  { word: "乗る", meaningsFr: ["Monter"], readings: ["のる"], mnemonicFr: "L'action de monter - MONTER.", levelId: 13 },
  { word: "降りる", meaningsFr: ["Descendre"], readings: ["おりる"], mnemonicFr: "L'action de descendre - DESCENDRE.", levelId: 13 },
  { word: "入る", meaningsFr: ["Entrer"], readings: ["はいる"], mnemonicFr: "L'action d'entrer - ENTRER.", levelId: 13 },
  { word: "出る", meaningsFr: ["Sortir"], readings: ["でる"], mnemonicFr: "L'action de sortir - SORTIR.", levelId: 13 },

  { word: "開ける", meaningsFr: ["Ouvrir"], readings: ["あける"], mnemonicFr: "L'action d'ouvrir - OUVRIR.", levelId: 14 },
  { word: "閉める", meaningsFr: ["Fermer"], readings: ["しめる"], mnemonicFr: "L'action de fermer - FERMER.", levelId: 14 },
  { word: "始める", meaningsFr: ["Commencer"], readings: ["はじめる"], mnemonicFr: "L'action de commencer - COMMENCER.", levelId: 14 },
  { word: "終わる", meaningsFr: ["Finir"], readings: ["おわる"], mnemonicFr: "L'action de finir - FINIR.", levelId: 14 },
  { word: "教える", meaningsFr: ["Enseigner"], readings: ["おしえる"], mnemonicFr: "L'action d'enseigner - ENSEIGNER.", levelId: 14 },
  { word: "習う", meaningsFr: ["Apprendre"], readings: ["ならう"], mnemonicFr: "L'action d'apprendre - APPRENDRE.", levelId: 14 },
  { word: "覚える", meaningsFr: ["Mémoriser"], readings: ["おぼえる"], mnemonicFr: "L'action de mémoriser - MÉMORISER.", levelId: 14 },
  { word: "忘れる", meaningsFr: ["Oublier"], readings: ["わすれる"], mnemonicFr: "L'action d'oublier - OUBLIER.", levelId: 14 },

  { word: "考える", meaningsFr: ["Réfléchir"], readings: ["かんがえる"], mnemonicFr: "L'action de penser - RÉFLÉCHIR.", levelId: 15 },
  { word: "分かる", meaningsFr: ["Comprendre"], readings: ["わかる"], mnemonicFr: "L'action de comprendre - COMPRENDRE.", levelId: 15 },
  { word: "知る", meaningsFr: ["Savoir"], readings: ["しる"], mnemonicFr: "L'action de savoir - SAVOIR.", levelId: 15 },
  { word: "信じる", meaningsFr: ["Croire"], readings: ["しんじる"], mnemonicFr: "L'action de croire - CROIRE.", levelId: 15 },
  { word: "思う", meaningsFr: ["Penser"], readings: ["おもう"], mnemonicFr: "L'action de penser - PENSER.", levelId: 15 },
  { word: "感じる", meaningsFr: ["Ressentir"], readings: ["かんじる"], mnemonicFr: "L'action de ressentir - RESSENTIR.", levelId: 15 },
  { word: "決める", meaningsFr: ["Décider"], readings: ["きめる"], mnemonicFr: "L'action de décider - DÉCIDER.", levelId: 15 },
  { word: "選ぶ", meaningsFr: ["Choisir"], readings: ["えらぶ"], mnemonicFr: "L'action de choisir - CHOISIR.", levelId: 15 },
];

async function main() {
  console.log("Seeding vocabulary supplement 4 (levels 1-15)...");

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
