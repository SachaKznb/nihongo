import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding supplementary vocabulary to levels 4-10...");

  // ============================================
  // LEVEL 4 - Supplementary Vocabulary
  // Base kanji: 食 飲 見 聞 言 話 読 書 買 売
  // ============================================

  const level4Vocab = [
    // 食 - Manger
    { word: "食べる", meaningsFr: ["Manger"], readings: ["たべる"], mnemonicFr: "MANGER quelque chose.", levelId: 4 },
    { word: "食事", meaningsFr: ["Repas"], readings: ["しょくじ"], mnemonicFr: "Le REPAS.", levelId: 4 },
    { word: "食堂", meaningsFr: ["Cantine", "Réfectoire"], readings: ["しょくどう"], mnemonicFr: "La CANTINE.", levelId: 4 },
    { word: "食品", meaningsFr: ["Aliment", "Denrée alimentaire"], readings: ["しょくひん"], mnemonicFr: "Les ALIMENTS.", levelId: 4 },
    { word: "食料", meaningsFr: ["Nourriture", "Provisions"], readings: ["しょくりょう"], mnemonicFr: "La NOURRITURE.", levelId: 4 },
    { word: "朝食", meaningsFr: ["Petit-déjeuner"], readings: ["ちょうしょく"], mnemonicFr: "Le PETIT-DÉJEUNER.", levelId: 4 },
    { word: "昼食", meaningsFr: ["Déjeuner"], readings: ["ちゅうしょく"], mnemonicFr: "Le DÉJEUNER.", levelId: 4 },
    { word: "夕食", meaningsFr: ["Dîner"], readings: ["ゆうしょく"], mnemonicFr: "Le DÎNER.", levelId: 4 },
    { word: "和食", meaningsFr: ["Cuisine japonaise"], readings: ["わしょく"], mnemonicFr: "La CUISINE JAPONAISE.", levelId: 4 },
    { word: "洋食", meaningsFr: ["Cuisine occidentale"], readings: ["ようしょく"], mnemonicFr: "La CUISINE OCCIDENTALE.", levelId: 4 },
    // 飲 - Boire
    { word: "飲む", meaningsFr: ["Boire"], readings: ["のむ"], mnemonicFr: "BOIRE.", levelId: 4 },
    { word: "飲み物", meaningsFr: ["Boisson"], readings: ["のみもの"], mnemonicFr: "Une BOISSON.", levelId: 4 },
    { word: "飲料", meaningsFr: ["Boisson"], readings: ["いんりょう"], mnemonicFr: "Une BOISSON (formel).", levelId: 4 },
    { word: "飲食", meaningsFr: ["Manger et boire"], readings: ["いんしょく"], mnemonicFr: "MANGER ET BOIRE.", levelId: 4 },
    { word: "飲み会", meaningsFr: ["Soirée alcoolisée"], readings: ["のみかい"], mnemonicFr: "Une SOIRÉE où l'on boit.", levelId: 4 },
    // 見 - Voir
    { word: "見る", meaningsFr: ["Voir", "Regarder"], readings: ["みる"], mnemonicFr: "VOIR, REGARDER.", levelId: 4 },
    { word: "見える", meaningsFr: ["Être visible"], readings: ["みえる"], mnemonicFr: "ÊTRE VISIBLE.", levelId: 4 },
    { word: "見せる", meaningsFr: ["Montrer"], readings: ["みせる"], mnemonicFr: "MONTRER quelque chose.", levelId: 4 },
    { word: "見物", meaningsFr: ["Visite touristique"], readings: ["けんぶつ"], mnemonicFr: "VISITER un lieu.", levelId: 4 },
    { word: "見学", meaningsFr: ["Visite d'étude"], readings: ["けんがく"], mnemonicFr: "VISITE ÉDUCATIVE.", levelId: 4 },
    { word: "見方", meaningsFr: ["Point de vue"], readings: ["みかた"], mnemonicFr: "Le POINT DE VUE.", levelId: 4 },
    { word: "意見", meaningsFr: ["Opinion"], readings: ["いけん"], mnemonicFr: "Une OPINION.", levelId: 4 },
    { word: "発見", meaningsFr: ["Découverte"], readings: ["はっけん"], mnemonicFr: "Une DÉCOUVERTE.", levelId: 4 },
    { word: "花見", meaningsFr: ["Contemplation des cerisiers"], readings: ["はなみ"], mnemonicFr: "ADMIRER LES CERISIERS.", levelId: 4 },
    // 聞 - Entendre
    { word: "聞く", meaningsFr: ["Écouter", "Entendre"], readings: ["きく"], mnemonicFr: "ÉCOUTER, ENTENDRE.", levelId: 4 },
    { word: "聞こえる", meaningsFr: ["Être audible"], readings: ["きこえる"], mnemonicFr: "ÊTRE AUDIBLE.", levelId: 4 },
    { word: "新聞", meaningsFr: ["Journal"], readings: ["しんぶん"], mnemonicFr: "Le JOURNAL.", levelId: 4 },
    { word: "見聞", meaningsFr: ["Connaissance", "Expérience"], readings: ["けんぶん"], mnemonicFr: "L'EXPÉRIENCE acquise.", levelId: 4 },
    // 言 - Dire
    { word: "言う", meaningsFr: ["Dire"], readings: ["いう"], mnemonicFr: "DIRE quelque chose.", levelId: 4 },
    { word: "言葉", meaningsFr: ["Mot", "Parole"], readings: ["ことば"], mnemonicFr: "Un MOT, une PAROLE.", levelId: 4 },
    { word: "言語", meaningsFr: ["Langue", "Langage"], readings: ["げんご"], mnemonicFr: "La LANGUE.", levelId: 4 },
    { word: "発言", meaningsFr: ["Déclaration"], readings: ["はつげん"], mnemonicFr: "Une DÉCLARATION.", levelId: 4 },
    { word: "伝言", meaningsFr: ["Message"], readings: ["でんごん"], mnemonicFr: "Un MESSAGE.", levelId: 4 },
    { word: "方言", meaningsFr: ["Dialecte"], readings: ["ほうげん"], mnemonicFr: "Un DIALECTE.", levelId: 4 },
    // 話 - Parler
    { word: "話す", meaningsFr: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER.", levelId: 4 },
    { word: "話", meaningsFr: ["Histoire", "Conversation"], readings: ["はなし"], mnemonicFr: "Une HISTOIRE.", levelId: 4 },
    { word: "会話", meaningsFr: ["Conversation"], readings: ["かいわ"], mnemonicFr: "Une CONVERSATION.", levelId: 4 },
    { word: "電話", meaningsFr: ["Téléphone"], readings: ["でんわ"], mnemonicFr: "Le TÉLÉPHONE.", levelId: 4 },
    { word: "話題", meaningsFr: ["Sujet de conversation"], readings: ["わだい"], mnemonicFr: "Le SUJET de conversation.", levelId: 4 },
    { word: "神話", meaningsFr: ["Mythe"], readings: ["しんわ"], mnemonicFr: "Un MYTHE.", levelId: 4 },
    // 読 - Lire
    { word: "読む", meaningsFr: ["Lire"], readings: ["よむ"], mnemonicFr: "LIRE.", levelId: 4 },
    { word: "読書", meaningsFr: ["Lecture"], readings: ["どくしょ"], mnemonicFr: "La LECTURE.", levelId: 4 },
    { word: "読者", meaningsFr: ["Lecteur"], readings: ["どくしゃ"], mnemonicFr: "Le LECTEUR.", levelId: 4 },
    { word: "読み方", meaningsFr: ["Façon de lire"], readings: ["よみかた"], mnemonicFr: "La FAÇON DE LIRE.", levelId: 4 },
    { word: "音読", meaningsFr: ["Lecture à voix haute"], readings: ["おんどく"], mnemonicFr: "LIRE À VOIX HAUTE.", levelId: 4 },
    // 書 - Écrire
    { word: "書く", meaningsFr: ["Écrire"], readings: ["かく"], mnemonicFr: "ÉCRIRE.", levelId: 4 },
    { word: "書類", meaningsFr: ["Document"], readings: ["しょるい"], mnemonicFr: "Un DOCUMENT.", levelId: 4 },
    { word: "教科書", meaningsFr: ["Manuel scolaire"], readings: ["きょうかしょ"], mnemonicFr: "Un MANUEL SCOLAIRE.", levelId: 4 },
    { word: "辞書", meaningsFr: ["Dictionnaire"], readings: ["じしょ"], mnemonicFr: "Un DICTIONNAIRE.", levelId: 4 },
    { word: "図書館", meaningsFr: ["Bibliothèque"], readings: ["としょかん"], mnemonicFr: "La BIBLIOTHÈQUE.", levelId: 4 },
    { word: "書道", meaningsFr: ["Calligraphie"], readings: ["しょどう"], mnemonicFr: "La CALLIGRAPHIE.", levelId: 4 },
    { word: "手書き", meaningsFr: ["Manuscrit"], readings: ["てがき"], mnemonicFr: "Écrit À LA MAIN.", levelId: 4 },
    // 買 - Acheter
    { word: "買う", meaningsFr: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER.", levelId: 4 },
    { word: "買い物", meaningsFr: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "Faire les COURSES.", levelId: 4 },
    { word: "買い手", meaningsFr: ["Acheteur"], readings: ["かいて"], mnemonicFr: "L'ACHETEUR.", levelId: 4 },
    { word: "購買", meaningsFr: ["Achat"], readings: ["こうばい"], mnemonicFr: "L'ACHAT.", levelId: 4 },
    // 売 - Vendre
    { word: "売る", meaningsFr: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE.", levelId: 4 },
    { word: "売れる", meaningsFr: ["Se vendre"], readings: ["うれる"], mnemonicFr: "SE VENDRE.", levelId: 4 },
    { word: "売り場", meaningsFr: ["Rayon", "Point de vente"], readings: ["うりば"], mnemonicFr: "Le RAYON de vente.", levelId: 4 },
    { word: "売り手", meaningsFr: ["Vendeur"], readings: ["うりて"], mnemonicFr: "Le VENDEUR.", levelId: 4 },
    { word: "販売", meaningsFr: ["Vente"], readings: ["はんばい"], mnemonicFr: "La VENTE.", levelId: 4 },
    { word: "売買", meaningsFr: ["Commerce"], readings: ["ばいばい"], mnemonicFr: "Le COMMERCE.", levelId: 4 },
    // Expressions quotidiennes
    { word: "食べ物", meaningsFr: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "La NOURRITURE.", levelId: 4 },
    { word: "飲み水", meaningsFr: ["Eau potable"], readings: ["のみみず"], mnemonicFr: "L'EAU POTABLE.", levelId: 4 },
    { word: "見本", meaningsFr: ["Échantillon"], readings: ["みほん"], mnemonicFr: "Un ÉCHANTILLON.", levelId: 4 },
    { word: "読み物", meaningsFr: ["Lecture", "Matériel à lire"], readings: ["よみもの"], mnemonicFr: "De la LECTURE.", levelId: 4 },
    { word: "売店", meaningsFr: ["Kiosque"], readings: ["ばいてん"], mnemonicFr: "Un KIOSQUE.", levelId: 4 },
    { word: "立ち読み", meaningsFr: ["Feuilleter en librairie"], readings: ["たちよみ"], mnemonicFr: "FEUILLETER debout en librairie.", levelId: 4 },
    { word: "聞き手", meaningsFr: ["Auditeur"], readings: ["ききて"], mnemonicFr: "L'AUDITEUR.", levelId: 4 },
    { word: "話し手", meaningsFr: ["Locuteur"], readings: ["はなして"], mnemonicFr: "Le LOCUTEUR.", levelId: 4 },
  ];

  for (const vocab of level4Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 4 supplementary vocab complete! Added", level4Vocab.length, "words");

  // ============================================
  // LEVEL 5 - Supplementary Vocabulary
  // Base kanji: 作 使 待 持 行 来 帰 会 知 思
  // ============================================

  const level5Vocab = [
    // 作 - Faire, créer
    { word: "作る", meaningsFr: ["Faire", "Créer"], readings: ["つくる"], mnemonicFr: "FAIRE, CRÉER.", levelId: 5 },
    { word: "作品", meaningsFr: ["Œuvre"], readings: ["さくひん"], mnemonicFr: "Une ŒUVRE.", levelId: 5 },
    { word: "作家", meaningsFr: ["Écrivain"], readings: ["さっか"], mnemonicFr: "Un ÉCRIVAIN.", levelId: 5 },
    { word: "作業", meaningsFr: ["Travail", "Opération"], readings: ["さぎょう"], mnemonicFr: "Le TRAVAIL.", levelId: 5 },
    { word: "作文", meaningsFr: ["Rédaction"], readings: ["さくぶん"], mnemonicFr: "Une RÉDACTION.", levelId: 5 },
    { word: "作成", meaningsFr: ["Création"], readings: ["さくせい"], mnemonicFr: "La CRÉATION.", levelId: 5 },
    { word: "工作", meaningsFr: ["Bricolage"], readings: ["こうさく"], mnemonicFr: "Le BRICOLAGE.", levelId: 5 },
    { word: "製作", meaningsFr: ["Production"], readings: ["せいさく"], mnemonicFr: "La PRODUCTION.", levelId: 5 },
    { word: "動作", meaningsFr: ["Mouvement", "Geste"], readings: ["どうさ"], mnemonicFr: "Un MOUVEMENT.", levelId: 5 },
    // 使 - Utiliser
    { word: "使う", meaningsFr: ["Utiliser"], readings: ["つかう"], mnemonicFr: "UTILISER.", levelId: 5 },
    { word: "使い方", meaningsFr: ["Mode d'emploi"], readings: ["つかいかた"], mnemonicFr: "Le MODE D'EMPLOI.", levelId: 5 },
    { word: "使用", meaningsFr: ["Utilisation"], readings: ["しよう"], mnemonicFr: "L'UTILISATION.", levelId: 5 },
    { word: "使命", meaningsFr: ["Mission"], readings: ["しめい"], mnemonicFr: "La MISSION.", levelId: 5 },
    { word: "大使", meaningsFr: ["Ambassadeur"], readings: ["たいし"], mnemonicFr: "L'AMBASSADEUR.", levelId: 5 },
    { word: "大使館", meaningsFr: ["Ambassade"], readings: ["たいしかん"], mnemonicFr: "L'AMBASSADE.", levelId: 5 },
    // 待 - Attendre
    { word: "待つ", meaningsFr: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE.", levelId: 5 },
    { word: "待ち合わせ", meaningsFr: ["Rendez-vous"], readings: ["まちあわせ"], mnemonicFr: "Un RENDEZ-VOUS.", levelId: 5 },
    { word: "待合室", meaningsFr: ["Salle d'attente"], readings: ["まちあいしつ"], mnemonicFr: "La SALLE D'ATTENTE.", levelId: 5 },
    { word: "期待", meaningsFr: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "L'ESPOIR.", levelId: 5 },
    { word: "招待", meaningsFr: ["Invitation"], readings: ["しょうたい"], mnemonicFr: "Une INVITATION.", levelId: 5 },
    // 持 - Tenir, posséder
    { word: "持つ", meaningsFr: ["Tenir", "Posséder"], readings: ["もつ"], mnemonicFr: "TENIR, POSSÉDER.", levelId: 5 },
    { word: "持ち物", meaningsFr: ["Effets personnels"], readings: ["もちもの"], mnemonicFr: "Les EFFETS PERSONNELS.", levelId: 5 },
    { word: "気持ち", meaningsFr: ["Sentiment"], readings: ["きもち"], mnemonicFr: "Un SENTIMENT.", levelId: 5 },
    { word: "持続", meaningsFr: ["Durée", "Continuation"], readings: ["じぞく"], mnemonicFr: "La DURÉE.", levelId: 5 },
    { word: "支持", meaningsFr: ["Soutien"], readings: ["しじ"], mnemonicFr: "Le SOUTIEN.", levelId: 5 },
    { word: "維持", meaningsFr: ["Maintien"], readings: ["いじ"], mnemonicFr: "Le MAINTIEN.", levelId: 5 },
    // 行 - Aller
    { word: "行く", meaningsFr: ["Aller"], readings: ["いく"], mnemonicFr: "ALLER.", levelId: 5 },
    { word: "行う", meaningsFr: ["Effectuer"], readings: ["おこなう"], mnemonicFr: "EFFECTUER.", levelId: 5 },
    { word: "行き", meaningsFr: ["Direction vers"], readings: ["いき", "ゆき"], mnemonicFr: "En DIRECTION DE.", levelId: 5 },
    { word: "旅行", meaningsFr: ["Voyage"], readings: ["りょこう"], mnemonicFr: "Un VOYAGE.", levelId: 5 },
    { word: "銀行", meaningsFr: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "La BANQUE.", levelId: 5 },
    { word: "行動", meaningsFr: ["Action", "Comportement"], readings: ["こうどう"], mnemonicFr: "L'ACTION.", levelId: 5 },
    { word: "行事", meaningsFr: ["Événement"], readings: ["ぎょうじ"], mnemonicFr: "Un ÉVÉNEMENT.", levelId: 5 },
    { word: "行列", meaningsFr: ["File d'attente"], readings: ["ぎょうれつ"], mnemonicFr: "La FILE D'ATTENTE.", levelId: 5 },
    { word: "流行", meaningsFr: ["Mode", "Tendance"], readings: ["りゅうこう"], mnemonicFr: "La MODE.", levelId: 5 },
    // 来 - Venir
    { word: "来る", meaningsFr: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR.", levelId: 5 },
    { word: "来週", meaningsFr: ["La semaine prochaine"], readings: ["らいしゅう"], mnemonicFr: "LA SEMAINE PROCHAINE.", levelId: 5 },
    { word: "来月", meaningsFr: ["Le mois prochain"], readings: ["らいげつ"], mnemonicFr: "LE MOIS PROCHAIN.", levelId: 5 },
    { word: "来年", meaningsFr: ["L'année prochaine"], readings: ["らいねん"], mnemonicFr: "L'ANNÉE PROCHAINE.", levelId: 5 },
    { word: "未来", meaningsFr: ["Avenir"], readings: ["みらい"], mnemonicFr: "L'AVENIR.", levelId: 5 },
    { word: "将来", meaningsFr: ["Futur"], readings: ["しょうらい"], mnemonicFr: "Le FUTUR.", levelId: 5 },
    { word: "本来", meaningsFr: ["À l'origine"], readings: ["ほんらい"], mnemonicFr: "À L'ORIGINE.", levelId: 5 },
    { word: "以来", meaningsFr: ["Depuis"], readings: ["いらい"], mnemonicFr: "DEPUIS.", levelId: 5 },
    // 帰 - Rentrer
    { word: "帰る", meaningsFr: ["Rentrer"], readings: ["かえる"], mnemonicFr: "RENTRER chez soi.", levelId: 5 },
    { word: "帰り", meaningsFr: ["Retour"], readings: ["かえり"], mnemonicFr: "Le RETOUR.", levelId: 5 },
    { word: "帰国", meaningsFr: ["Retour au pays"], readings: ["きこく"], mnemonicFr: "RETOUR AU PAYS.", levelId: 5 },
    { word: "帰宅", meaningsFr: ["Rentrer chez soi"], readings: ["きたく"], mnemonicFr: "RENTRER CHEZ SOI.", levelId: 5 },
    { word: "日帰り", meaningsFr: ["Aller-retour dans la journée"], readings: ["ひがえり"], mnemonicFr: "ALLER-RETOUR dans la journée.", levelId: 5 },
    // 会 - Rencontrer
    { word: "会う", meaningsFr: ["Rencontrer"], readings: ["あう"], mnemonicFr: "RENCONTRER quelqu'un.", levelId: 5 },
    { word: "会社", meaningsFr: ["Entreprise"], readings: ["かいしゃ"], mnemonicFr: "L'ENTREPRISE.", levelId: 5 },
    { word: "会議", meaningsFr: ["Réunion"], readings: ["かいぎ"], mnemonicFr: "La RÉUNION.", levelId: 5 },
    { word: "会員", meaningsFr: ["Membre"], readings: ["かいいん"], mnemonicFr: "Un MEMBRE.", levelId: 5 },
    { word: "会場", meaningsFr: ["Lieu de réunion"], readings: ["かいじょう"], mnemonicFr: "Le LIEU DE RÉUNION.", levelId: 5 },
    { word: "機会", meaningsFr: ["Occasion"], readings: ["きかい"], mnemonicFr: "Une OCCASION.", levelId: 5 },
    { word: "社会", meaningsFr: ["Société"], readings: ["しゃかい"], mnemonicFr: "La SOCIÉTÉ.", levelId: 5 },
    // 知 - Savoir
    { word: "知る", meaningsFr: ["Savoir"], readings: ["しる"], mnemonicFr: "SAVOIR.", levelId: 5 },
    { word: "知らせ", meaningsFr: ["Nouvelle", "Information"], readings: ["しらせ"], mnemonicFr: "Une NOUVELLE.", levelId: 5 },
    { word: "知識", meaningsFr: ["Connaissance"], readings: ["ちしき"], mnemonicFr: "La CONNAISSANCE.", levelId: 5 },
    { word: "知人", meaningsFr: ["Connaissance"], readings: ["ちじん"], mnemonicFr: "Une CONNAISSANCE.", levelId: 5 },
    { word: "知事", meaningsFr: ["Gouverneur"], readings: ["ちじ"], mnemonicFr: "Le GOUVERNEUR.", levelId: 5 },
    { word: "通知", meaningsFr: ["Notification"], readings: ["つうち"], mnemonicFr: "Une NOTIFICATION.", levelId: 5 },
    // 思 - Penser
    { word: "思う", meaningsFr: ["Penser"], readings: ["おもう"], mnemonicFr: "PENSER.", levelId: 5 },
    { word: "思い出", meaningsFr: ["Souvenir"], readings: ["おもいで"], mnemonicFr: "Un SOUVENIR.", levelId: 5 },
    { word: "思い", meaningsFr: ["Pensée", "Sentiment"], readings: ["おもい"], mnemonicFr: "Une PENSÉE.", levelId: 5 },
    { word: "思想", meaningsFr: ["Pensée", "Idéologie"], readings: ["しそう"], mnemonicFr: "L'IDÉOLOGIE.", levelId: 5 },
    { word: "意思", meaningsFr: ["Intention"], readings: ["いし"], mnemonicFr: "L'INTENTION.", levelId: 5 },
    { word: "不思議", meaningsFr: ["Mystère", "Étrange"], readings: ["ふしぎ"], mnemonicFr: "C'est MYSTÉRIEUX.", levelId: 5 },
    // Expressions composées
    { word: "行き先", meaningsFr: ["Destination"], readings: ["いきさき"], mnemonicFr: "La DESTINATION.", levelId: 5 },
    { word: "作り方", meaningsFr: ["Façon de faire"], readings: ["つくりかた"], mnemonicFr: "La FAÇON DE FAIRE.", levelId: 5 },
    { word: "待ち時間", meaningsFr: ["Temps d'attente"], readings: ["まちじかん"], mnemonicFr: "Le TEMPS D'ATTENTE.", levelId: 5 },
    { word: "持ち主", meaningsFr: ["Propriétaire"], readings: ["もちぬし"], mnemonicFr: "Le PROPRIÉTAIRE.", levelId: 5 },
  ];

  for (const vocab of level5Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 5 supplementary vocab complete! Added", level5Vocab.length, "words");

  // ============================================
  // LEVEL 6 - Supplementary Vocabulary
  // Base kanji: 考 教 習 勉 強 仕 事 働 休 遊
  // ============================================

  const level6Vocab = [
    // 考 - Penser, réfléchir
    { word: "考える", meaningsFr: ["Penser", "Réfléchir"], readings: ["かんがえる"], mnemonicFr: "RÉFLÉCHIR.", levelId: 6 },
    { word: "考え", meaningsFr: ["Pensée", "Idée"], readings: ["かんがえ"], mnemonicFr: "Une IDÉE.", levelId: 6 },
    { word: "考え方", meaningsFr: ["Façon de penser"], readings: ["かんがえかた"], mnemonicFr: "La FAÇON DE PENSER.", levelId: 6 },
    { word: "参考", meaningsFr: ["Référence"], readings: ["さんこう"], mnemonicFr: "Une RÉFÉRENCE.", levelId: 6 },
    { word: "思考", meaningsFr: ["Réflexion"], readings: ["しこう"], mnemonicFr: "La RÉFLEXION.", levelId: 6 },
    { word: "考古学", meaningsFr: ["Archéologie"], readings: ["こうこがく"], mnemonicFr: "L'ARCHÉOLOGIE.", levelId: 6 },
    // 教 - Enseigner
    { word: "教える", meaningsFr: ["Enseigner"], readings: ["おしえる"], mnemonicFr: "ENSEIGNER.", levelId: 6 },
    { word: "教わる", meaningsFr: ["Apprendre de quelqu'un"], readings: ["おそわる"], mnemonicFr: "APPRENDRE DE quelqu'un.", levelId: 6 },
    { word: "教室", meaningsFr: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "La SALLE DE CLASSE.", levelId: 6 },
    { word: "教育", meaningsFr: ["Éducation"], readings: ["きょういく"], mnemonicFr: "L'ÉDUCATION.", levelId: 6 },
    { word: "教師", meaningsFr: ["Enseignant"], readings: ["きょうし"], mnemonicFr: "L'ENSEIGNANT.", levelId: 6 },
    { word: "教会", meaningsFr: ["Église"], readings: ["きょうかい"], mnemonicFr: "L'ÉGLISE.", levelId: 6 },
    { word: "宗教", meaningsFr: ["Religion"], readings: ["しゅうきょう"], mnemonicFr: "La RELIGION.", levelId: 6 },
    { word: "教授", meaningsFr: ["Professeur d'université"], readings: ["きょうじゅ"], mnemonicFr: "Le PROFESSEUR D'UNIVERSITÉ.", levelId: 6 },
    // 習 - Apprendre
    { word: "習う", meaningsFr: ["Apprendre"], readings: ["ならう"], mnemonicFr: "APPRENDRE.", levelId: 6 },
    { word: "習慣", meaningsFr: ["Habitude"], readings: ["しゅうかん"], mnemonicFr: "Une HABITUDE.", levelId: 6 },
    { word: "学習", meaningsFr: ["Apprentissage"], readings: ["がくしゅう"], mnemonicFr: "L'APPRENTISSAGE.", levelId: 6 },
    { word: "練習", meaningsFr: ["Entraînement"], readings: ["れんしゅう"], mnemonicFr: "L'ENTRAÎNEMENT.", levelId: 6 },
    { word: "復習", meaningsFr: ["Révision"], readings: ["ふくしゅう"], mnemonicFr: "La RÉVISION.", levelId: 6 },
    { word: "予習", meaningsFr: ["Préparation"], readings: ["よしゅう"], mnemonicFr: "La PRÉPARATION.", levelId: 6 },
    // 勉 - Étudier
    { word: "勉強", meaningsFr: ["Étude"], readings: ["べんきょう"], mnemonicFr: "L'ÉTUDE.", levelId: 6 },
    { word: "勉強する", meaningsFr: ["Étudier"], readings: ["べんきょうする"], mnemonicFr: "ÉTUDIER.", levelId: 6 },
    { word: "勤勉", meaningsFr: ["Diligent"], readings: ["きんべん"], mnemonicFr: "DILIGENT.", levelId: 6 },
    // 強 - Fort
    { word: "強い", meaningsFr: ["Fort"], readings: ["つよい"], mnemonicFr: "C'est FORT.", levelId: 6 },
    { word: "強さ", meaningsFr: ["Force"], readings: ["つよさ"], mnemonicFr: "La FORCE.", levelId: 6 },
    { word: "強化", meaningsFr: ["Renforcement"], readings: ["きょうか"], mnemonicFr: "Le RENFORCEMENT.", levelId: 6 },
    { word: "強調", meaningsFr: ["Emphase"], readings: ["きょうちょう"], mnemonicFr: "L'EMPHASE.", levelId: 6 },
    { word: "強制", meaningsFr: ["Obligation"], readings: ["きょうせい"], mnemonicFr: "L'OBLIGATION.", levelId: 6 },
    { word: "強力", meaningsFr: ["Puissant"], readings: ["きょうりょく"], mnemonicFr: "PUISSANT.", levelId: 6 },
    // 仕 - Servir
    { word: "仕事", meaningsFr: ["Travail"], readings: ["しごと"], mnemonicFr: "Le TRAVAIL.", levelId: 6 },
    { word: "仕方", meaningsFr: ["Méthode", "Façon"], readings: ["しかた"], mnemonicFr: "La MÉTHODE.", levelId: 6 },
    { word: "仕組み", meaningsFr: ["Mécanisme"], readings: ["しくみ"], mnemonicFr: "Le MÉCANISME.", levelId: 6 },
    { word: "仕上げる", meaningsFr: ["Terminer"], readings: ["しあげる"], mnemonicFr: "TERMINER.", levelId: 6 },
    // 事 - Chose, affaire
    { word: "事", meaningsFr: ["Chose", "Affaire"], readings: ["こと"], mnemonicFr: "Une CHOSE.", levelId: 6 },
    { word: "事件", meaningsFr: ["Incident"], readings: ["じけん"], mnemonicFr: "Un INCIDENT.", levelId: 6 },
    { word: "事故", meaningsFr: ["Accident"], readings: ["じこ"], mnemonicFr: "Un ACCIDENT.", levelId: 6 },
    { word: "事実", meaningsFr: ["Fait"], readings: ["じじつ"], mnemonicFr: "Un FAIT.", levelId: 6 },
    { word: "事情", meaningsFr: ["Circonstance"], readings: ["じじょう"], mnemonicFr: "La CIRCONSTANCE.", levelId: 6 },
    { word: "事務所", meaningsFr: ["Bureau"], readings: ["じむしょ"], mnemonicFr: "Le BUREAU.", levelId: 6 },
    { word: "大事", meaningsFr: ["Important"], readings: ["だいじ"], mnemonicFr: "C'est IMPORTANT.", levelId: 6 },
    { word: "返事", meaningsFr: ["Réponse"], readings: ["へんじ"], mnemonicFr: "La RÉPONSE.", levelId: 6 },
    { word: "食事", meaningsFr: ["Repas"], readings: ["しょくじ"], mnemonicFr: "Le REPAS.", levelId: 6 },
    // 働 - Travailler
    { word: "働く", meaningsFr: ["Travailler"], readings: ["はたらく"], mnemonicFr: "TRAVAILLER.", levelId: 6 },
    { word: "働き", meaningsFr: ["Fonction", "Travail"], readings: ["はたらき"], mnemonicFr: "La FONCTION.", levelId: 6 },
    { word: "労働", meaningsFr: ["Travail"], readings: ["ろうどう"], mnemonicFr: "Le TRAVAIL.", levelId: 6 },
    { word: "働き者", meaningsFr: ["Travailleur acharné"], readings: ["はたらきもの"], mnemonicFr: "Un TRAVAILLEUR ACHARNÉ.", levelId: 6 },
    // 休 - Se reposer
    { word: "休む", meaningsFr: ["Se reposer"], readings: ["やすむ"], mnemonicFr: "SE REPOSER.", levelId: 6 },
    { word: "休み", meaningsFr: ["Repos", "Vacances"], readings: ["やすみ"], mnemonicFr: "Le REPOS.", levelId: 6 },
    { word: "休日", meaningsFr: ["Jour de repos"], readings: ["きゅうじつ"], mnemonicFr: "JOUR DE REPOS.", levelId: 6 },
    { word: "休憩", meaningsFr: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "Une PAUSE.", levelId: 6 },
    { word: "休暇", meaningsFr: ["Congé"], readings: ["きゅうか"], mnemonicFr: "Un CONGÉ.", levelId: 6 },
    { word: "定休日", meaningsFr: ["Jour de fermeture"], readings: ["ていきゅうび"], mnemonicFr: "JOUR DE FERMETURE.", levelId: 6 },
    // 遊 - Jouer
    { word: "遊ぶ", meaningsFr: ["Jouer"], readings: ["あそぶ"], mnemonicFr: "JOUER.", levelId: 6 },
    { word: "遊び", meaningsFr: ["Jeu"], readings: ["あそび"], mnemonicFr: "Un JEU.", levelId: 6 },
    { word: "遊園地", meaningsFr: ["Parc d'attractions"], readings: ["ゆうえんち"], mnemonicFr: "Le PARC D'ATTRACTIONS.", levelId: 6 },
    { word: "遊覧", meaningsFr: ["Excursion"], readings: ["ゆうらん"], mnemonicFr: "Une EXCURSION.", levelId: 6 },
    // Expressions composées
    { word: "仕事場", meaningsFr: ["Lieu de travail"], readings: ["しごとば"], mnemonicFr: "Le LIEU DE TRAVAIL.", levelId: 6 },
    { word: "教え子", meaningsFr: ["Élève"], readings: ["おしえご"], mnemonicFr: "L'ÉLÈVE.", levelId: 6 },
    { word: "強気", meaningsFr: ["Confiant"], readings: ["つよき"], mnemonicFr: "CONFIANT.", levelId: 6 },
    { word: "弱気", meaningsFr: ["Faible", "Timide"], readings: ["よわき"], mnemonicFr: "TIMIDE.", levelId: 6 },
    { word: "休み時間", meaningsFr: ["Pause", "Récréation"], readings: ["やすみじかん"], mnemonicFr: "La RÉCRÉATION.", levelId: 6 },
    { word: "遊び場", meaningsFr: ["Aire de jeux"], readings: ["あそびば"], mnemonicFr: "L'AIRE DE JEUX.", levelId: 6 },
  ];

  for (const vocab of level6Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 6 supplementary vocab complete! Added", level6Vocab.length, "words");

  // ============================================
  // LEVEL 7 - Supplementary Vocabulary
  // Base kanji: 時 間 分 秒 朝 昼 夜 午 前 後
  // ============================================

  const level7Vocab = [
    // 時 - Temps, heure
    { word: "時", meaningsFr: ["Heure", "Temps"], readings: ["とき"], mnemonicFr: "Le TEMPS.", levelId: 7 },
    { word: "時間", meaningsFr: ["Temps", "Heure"], readings: ["じかん"], mnemonicFr: "Le TEMPS.", levelId: 7 },
    { word: "時計", meaningsFr: ["Montre", "Horloge"], readings: ["とけい"], mnemonicFr: "Une MONTRE.", levelId: 7 },
    { word: "時代", meaningsFr: ["Époque"], readings: ["じだい"], mnemonicFr: "Une ÉPOQUE.", levelId: 7 },
    { word: "時期", meaningsFr: ["Période"], readings: ["じき"], mnemonicFr: "Une PÉRIODE.", levelId: 7 },
    { word: "時々", meaningsFr: ["Parfois"], readings: ["ときどき"], mnemonicFr: "PARFOIS.", levelId: 7 },
    { word: "同時", meaningsFr: ["En même temps"], readings: ["どうじ"], mnemonicFr: "EN MÊME TEMPS.", levelId: 7 },
    { word: "一時", meaningsFr: ["Une heure", "Temporaire"], readings: ["いちじ"], mnemonicFr: "UNE HEURE, TEMPORAIRE.", levelId: 7 },
    { word: "当時", meaningsFr: ["À l'époque"], readings: ["とうじ"], mnemonicFr: "À L'ÉPOQUE.", levelId: 7 },
    // 間 - Entre, intervalle
    { word: "間", meaningsFr: ["Entre", "Intervalle"], readings: ["あいだ", "ま"], mnemonicFr: "L'INTERVALLE.", levelId: 7 },
    { word: "間違い", meaningsFr: ["Erreur"], readings: ["まちがい"], mnemonicFr: "Une ERREUR.", levelId: 7 },
    { word: "間違える", meaningsFr: ["Se tromper"], readings: ["まちがえる"], mnemonicFr: "SE TROMPER.", levelId: 7 },
    { word: "人間", meaningsFr: ["Être humain"], readings: ["にんげん"], mnemonicFr: "L'ÊTRE HUMAIN.", levelId: 7 },
    { word: "空間", meaningsFr: ["Espace"], readings: ["くうかん"], mnemonicFr: "L'ESPACE.", levelId: 7 },
    { word: "期間", meaningsFr: ["Durée"], readings: ["きかん"], mnemonicFr: "La DURÉE.", levelId: 7 },
    { word: "週間", meaningsFr: ["Semaine"], readings: ["しゅうかん"], mnemonicFr: "Une SEMAINE.", levelId: 7 },
    { word: "瞬間", meaningsFr: ["Instant"], readings: ["しゅんかん"], mnemonicFr: "Un INSTANT.", levelId: 7 },
    // 分 - Minute, partie
    { word: "分", meaningsFr: ["Minute", "Partie"], readings: ["ふん", "ぷん"], mnemonicFr: "Une MINUTE.", levelId: 7 },
    { word: "分かる", meaningsFr: ["Comprendre"], readings: ["わかる"], mnemonicFr: "COMPRENDRE.", levelId: 7 },
    { word: "分ける", meaningsFr: ["Diviser"], readings: ["わける"], mnemonicFr: "DIVISER.", levelId: 7 },
    { word: "部分", meaningsFr: ["Partie"], readings: ["ぶぶん"], mnemonicFr: "Une PARTIE.", levelId: 7 },
    { word: "気分", meaningsFr: ["Humeur"], readings: ["きぶん"], mnemonicFr: "L'HUMEUR.", levelId: 7 },
    { word: "自分", meaningsFr: ["Soi-même"], readings: ["じぶん"], mnemonicFr: "SOI-MÊME.", levelId: 7 },
    { word: "十分", meaningsFr: ["Suffisant"], readings: ["じゅうぶん"], mnemonicFr: "SUFFISANT.", levelId: 7 },
    { word: "半分", meaningsFr: ["Moitié"], readings: ["はんぶん"], mnemonicFr: "La MOITIÉ.", levelId: 7 },
    { word: "多分", meaningsFr: ["Probablement"], readings: ["たぶん"], mnemonicFr: "PROBABLEMENT.", levelId: 7 },
    // 秒 - Seconde
    { word: "秒", meaningsFr: ["Seconde"], readings: ["びょう"], mnemonicFr: "Une SECONDE.", levelId: 7 },
    { word: "秒速", meaningsFr: ["Mètres par seconde"], readings: ["びょうそく"], mnemonicFr: "MÈTRES PAR SECONDE.", levelId: 7 },
    // 朝 - Matin
    { word: "朝", meaningsFr: ["Matin"], readings: ["あさ"], mnemonicFr: "Le MATIN.", levelId: 7 },
    { word: "朝食", meaningsFr: ["Petit-déjeuner"], readings: ["ちょうしょく"], mnemonicFr: "Le PETIT-DÉJEUNER.", levelId: 7 },
    { word: "朝日", meaningsFr: ["Soleil levant"], readings: ["あさひ"], mnemonicFr: "Le SOLEIL LEVANT.", levelId: 7 },
    { word: "今朝", meaningsFr: ["Ce matin"], readings: ["けさ"], mnemonicFr: "CE MATIN.", levelId: 7 },
    { word: "毎朝", meaningsFr: ["Chaque matin"], readings: ["まいあさ"], mnemonicFr: "CHAQUE MATIN.", levelId: 7 },
    { word: "朝起き", meaningsFr: ["Se lever tôt"], readings: ["あさおき"], mnemonicFr: "SE LEVER TÔT.", levelId: 7 },
    // 昼 - Midi
    { word: "昼", meaningsFr: ["Midi", "Jour"], readings: ["ひる"], mnemonicFr: "MIDI.", levelId: 7 },
    { word: "昼食", meaningsFr: ["Déjeuner"], readings: ["ちゅうしょく"], mnemonicFr: "Le DÉJEUNER.", levelId: 7 },
    { word: "昼間", meaningsFr: ["La journée"], readings: ["ひるま"], mnemonicFr: "LA JOURNÉE.", levelId: 7 },
    { word: "昼休み", meaningsFr: ["Pause déjeuner"], readings: ["ひるやすみ"], mnemonicFr: "La PAUSE DÉJEUNER.", levelId: 7 },
    { word: "昼寝", meaningsFr: ["Sieste"], readings: ["ひるね"], mnemonicFr: "La SIESTE.", levelId: 7 },
    // 夜 - Nuit
    { word: "夜", meaningsFr: ["Nuit"], readings: ["よる"], mnemonicFr: "La NUIT.", levelId: 7 },
    { word: "夜中", meaningsFr: ["Milieu de la nuit"], readings: ["よなか"], mnemonicFr: "MILIEU DE LA NUIT.", levelId: 7 },
    { word: "今夜", meaningsFr: ["Ce soir"], readings: ["こんや"], mnemonicFr: "CE SOIR.", levelId: 7 },
    { word: "毎夜", meaningsFr: ["Chaque nuit"], readings: ["まいよ"], mnemonicFr: "CHAQUE NUIT.", levelId: 7 },
    { word: "夜景", meaningsFr: ["Vue nocturne"], readings: ["やけい"], mnemonicFr: "La VUE NOCTURNE.", levelId: 7 },
    { word: "夜行", meaningsFr: ["De nuit"], readings: ["やこう"], mnemonicFr: "DE NUIT.", levelId: 7 },
    // 午 - Midi (formel)
    { word: "午前", meaningsFr: ["Matin", "AM"], readings: ["ごぜん"], mnemonicFr: "Le MATIN (AM).", levelId: 7 },
    { word: "午後", meaningsFr: ["Après-midi", "PM"], readings: ["ごご"], mnemonicFr: "L'APRÈS-MIDI (PM).", levelId: 7 },
    { word: "正午", meaningsFr: ["Midi pile"], readings: ["しょうご"], mnemonicFr: "MIDI PILE.", levelId: 7 },
    // 前 - Avant, devant
    { word: "前", meaningsFr: ["Avant", "Devant"], readings: ["まえ"], mnemonicFr: "DEVANT.", levelId: 7 },
    { word: "前回", meaningsFr: ["La dernière fois"], readings: ["ぜんかい"], mnemonicFr: "LA DERNIÈRE FOIS.", levelId: 7 },
    { word: "以前", meaningsFr: ["Avant", "Autrefois"], readings: ["いぜん"], mnemonicFr: "AUTREFOIS.", levelId: 7 },
    { word: "名前", meaningsFr: ["Nom"], readings: ["なまえ"], mnemonicFr: "Le NOM.", levelId: 7 },
    { word: "前半", meaningsFr: ["Première moitié"], readings: ["ぜんはん"], mnemonicFr: "La PREMIÈRE MOITIÉ.", levelId: 7 },
    { word: "前進", meaningsFr: ["Avancer"], readings: ["ぜんしん"], mnemonicFr: "AVANCER.", levelId: 7 },
    // 後 - Après, derrière
    { word: "後", meaningsFr: ["Après", "Derrière"], readings: ["あと", "うしろ"], mnemonicFr: "APRÈS, DERRIÈRE.", levelId: 7 },
    { word: "後半", meaningsFr: ["Deuxième moitié"], readings: ["こうはん"], mnemonicFr: "La DEUXIÈME MOITIÉ.", levelId: 7 },
    { word: "最後", meaningsFr: ["Dernier"], readings: ["さいご"], mnemonicFr: "Le DERNIER.", levelId: 7 },
    { word: "後悔", meaningsFr: ["Regret"], readings: ["こうかい"], mnemonicFr: "Le REGRET.", levelId: 7 },
    { word: "後輩", meaningsFr: ["Cadet"], readings: ["こうはい"], mnemonicFr: "Le CADET.", levelId: 7 },
    { word: "今後", meaningsFr: ["À l'avenir"], readings: ["こんご"], mnemonicFr: "À L'AVENIR.", levelId: 7 },
    // Expressions temporelles
    { word: "時間割", meaningsFr: ["Emploi du temps"], readings: ["じかんわり"], mnemonicFr: "L'EMPLOI DU TEMPS.", levelId: 7 },
    { word: "昼夜", meaningsFr: ["Jour et nuit"], readings: ["ちゅうや"], mnemonicFr: "JOUR ET NUIT.", levelId: 7 },
    { word: "前後", meaningsFr: ["Environ", "Avant et après"], readings: ["ぜんご"], mnemonicFr: "AVANT ET APRÈS.", levelId: 7 },
    { word: "夜明け", meaningsFr: ["Aube"], readings: ["よあけ"], mnemonicFr: "L'AUBE.", levelId: 7 },
  ];

  for (const vocab of level7Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 7 supplementary vocab complete! Added", level7Vocab.length, "words");

  // ============================================
  // LEVEL 8 - Supplementary Vocabulary
  // Base kanji: 東 西 南 北 外 内 町 村 駅 道
  // ============================================

  const level8Vocab = [
    // 東 - Est
    { word: "東", meaningsFr: ["Est"], readings: ["ひがし"], mnemonicFr: "L'EST.", levelId: 8 },
    { word: "東京", meaningsFr: ["Tokyo"], readings: ["とうきょう"], mnemonicFr: "TOKYO.", levelId: 8 },
    { word: "東北", meaningsFr: ["Tohoku", "Nord-est"], readings: ["とうほく"], mnemonicFr: "Le NORD-EST.", levelId: 8 },
    { word: "東西", meaningsFr: ["Est et ouest"], readings: ["とうざい"], mnemonicFr: "EST ET OUEST.", levelId: 8 },
    { word: "東側", meaningsFr: ["Côté est"], readings: ["ひがしがわ"], mnemonicFr: "Le CÔTÉ EST.", levelId: 8 },
    { word: "東洋", meaningsFr: ["Orient"], readings: ["とうよう"], mnemonicFr: "L'ORIENT.", levelId: 8 },
    // 西 - Ouest
    { word: "西", meaningsFr: ["Ouest"], readings: ["にし"], mnemonicFr: "L'OUEST.", levelId: 8 },
    { word: "西洋", meaningsFr: ["Occident"], readings: ["せいよう"], mnemonicFr: "L'OCCIDENT.", levelId: 8 },
    { word: "西側", meaningsFr: ["Côté ouest"], readings: ["にしがわ"], mnemonicFr: "Le CÔTÉ OUEST.", levelId: 8 },
    { word: "関西", meaningsFr: ["Kansai"], readings: ["かんさい"], mnemonicFr: "Le KANSAI.", levelId: 8 },
    { word: "西暦", meaningsFr: ["Ère chrétienne"], readings: ["せいれき"], mnemonicFr: "L'ÈRE CHRÉTIENNE.", levelId: 8 },
    // 南 - Sud
    { word: "南", meaningsFr: ["Sud"], readings: ["みなみ"], mnemonicFr: "Le SUD.", levelId: 8 },
    { word: "南北", meaningsFr: ["Nord et sud"], readings: ["なんぼく"], mnemonicFr: "NORD ET SUD.", levelId: 8 },
    { word: "南側", meaningsFr: ["Côté sud"], readings: ["みなみがわ"], mnemonicFr: "Le CÔTÉ SUD.", levelId: 8 },
    { word: "南極", meaningsFr: ["Antarctique"], readings: ["なんきょく"], mnemonicFr: "L'ANTARCTIQUE.", levelId: 8 },
    { word: "東南", meaningsFr: ["Sud-est"], readings: ["とうなん"], mnemonicFr: "Le SUD-EST.", levelId: 8 },
    // 北 - Nord
    { word: "北", meaningsFr: ["Nord"], readings: ["きた"], mnemonicFr: "Le NORD.", levelId: 8 },
    { word: "北海道", meaningsFr: ["Hokkaido"], readings: ["ほっかいどう"], mnemonicFr: "HOKKAIDO.", levelId: 8 },
    { word: "北側", meaningsFr: ["Côté nord"], readings: ["きたがわ"], mnemonicFr: "Le CÔTÉ NORD.", levelId: 8 },
    { word: "北極", meaningsFr: ["Arctique"], readings: ["ほっきょく"], mnemonicFr: "L'ARCTIQUE.", levelId: 8 },
    { word: "東北", meaningsFr: ["Nord-est"], readings: ["とうほく"], mnemonicFr: "Le NORD-EST.", levelId: 8 },
    // 外 - Extérieur
    { word: "外", meaningsFr: ["Extérieur"], readings: ["そと"], mnemonicFr: "L'EXTÉRIEUR.", levelId: 8 },
    { word: "外国", meaningsFr: ["Pays étranger"], readings: ["がいこく"], mnemonicFr: "Un PAYS ÉTRANGER.", levelId: 8 },
    { word: "外国人", meaningsFr: ["Étranger"], readings: ["がいこくじん"], mnemonicFr: "Un ÉTRANGER.", levelId: 8 },
    { word: "外出", meaningsFr: ["Sortie"], readings: ["がいしゅつ"], mnemonicFr: "SORTIR.", levelId: 8 },
    { word: "海外", meaningsFr: ["À l'étranger"], readings: ["かいがい"], mnemonicFr: "À L'ÉTRANGER.", levelId: 8 },
    { word: "外見", meaningsFr: ["Apparence"], readings: ["がいけん"], mnemonicFr: "L'APPARENCE.", levelId: 8 },
    { word: "以外", meaningsFr: ["Sauf", "Excepté"], readings: ["いがい"], mnemonicFr: "SAUF.", levelId: 8 },
    { word: "意外", meaningsFr: ["Inattendu"], readings: ["いがい"], mnemonicFr: "INATTENDU.", levelId: 8 },
    // 内 - Intérieur
    { word: "内", meaningsFr: ["Intérieur"], readings: ["うち"], mnemonicFr: "L'INTÉRIEUR.", levelId: 8 },
    { word: "国内", meaningsFr: ["National"], readings: ["こくない"], mnemonicFr: "NATIONAL.", levelId: 8 },
    { word: "内容", meaningsFr: ["Contenu"], readings: ["ないよう"], mnemonicFr: "Le CONTENU.", levelId: 8 },
    { word: "案内", meaningsFr: ["Guide"], readings: ["あんない"], mnemonicFr: "Le GUIDE.", levelId: 8 },
    { word: "市内", meaningsFr: ["Dans la ville"], readings: ["しない"], mnemonicFr: "DANS LA VILLE.", levelId: 8 },
    { word: "室内", meaningsFr: ["Intérieur"], readings: ["しつない"], mnemonicFr: "À L'INTÉRIEUR.", levelId: 8 },
    // 町 - Ville, quartier
    { word: "町", meaningsFr: ["Ville", "Quartier"], readings: ["まち"], mnemonicFr: "La VILLE.", levelId: 8 },
    { word: "町中", meaningsFr: ["Dans la ville"], readings: ["まちなか"], mnemonicFr: "EN VILLE.", levelId: 8 },
    { word: "町並み", meaningsFr: ["Paysage urbain"], readings: ["まちなみ"], mnemonicFr: "Le PAYSAGE URBAIN.", levelId: 8 },
    { word: "下町", meaningsFr: ["Quartier populaire"], readings: ["したまち"], mnemonicFr: "Le QUARTIER POPULAIRE.", levelId: 8 },
    // 村 - Village
    { word: "村", meaningsFr: ["Village"], readings: ["むら"], mnemonicFr: "Le VILLAGE.", levelId: 8 },
    { word: "村長", meaningsFr: ["Chef de village"], readings: ["そんちょう"], mnemonicFr: "Le CHEF DE VILLAGE.", levelId: 8 },
    { word: "村人", meaningsFr: ["Villageois"], readings: ["むらびと"], mnemonicFr: "Le VILLAGEOIS.", levelId: 8 },
    { word: "農村", meaningsFr: ["Village agricole"], readings: ["のうそん"], mnemonicFr: "Le VILLAGE AGRICOLE.", levelId: 8 },
    // 駅 - Gare
    { word: "駅", meaningsFr: ["Gare"], readings: ["えき"], mnemonicFr: "La GARE.", levelId: 8 },
    { word: "駅前", meaningsFr: ["Devant la gare"], readings: ["えきまえ"], mnemonicFr: "DEVANT LA GARE.", levelId: 8 },
    { word: "駅員", meaningsFr: ["Employé de gare"], readings: ["えきいん"], mnemonicFr: "L'EMPLOYÉ DE GARE.", levelId: 8 },
    { word: "駅長", meaningsFr: ["Chef de gare"], readings: ["えきちょう"], mnemonicFr: "Le CHEF DE GARE.", levelId: 8 },
    { word: "終点", meaningsFr: ["Terminus"], readings: ["しゅうてん"], mnemonicFr: "Le TERMINUS.", levelId: 8 },
    // 道 - Chemin, voie
    { word: "道", meaningsFr: ["Chemin", "Route"], readings: ["みち"], mnemonicFr: "Le CHEMIN.", levelId: 8 },
    { word: "道路", meaningsFr: ["Route"], readings: ["どうろ"], mnemonicFr: "La ROUTE.", levelId: 8 },
    { word: "道具", meaningsFr: ["Outil"], readings: ["どうぐ"], mnemonicFr: "Un OUTIL.", levelId: 8 },
    { word: "歩道", meaningsFr: ["Trottoir"], readings: ["ほどう"], mnemonicFr: "Le TROTTOIR.", levelId: 8 },
    { word: "水道", meaningsFr: ["Eau courante"], readings: ["すいどう"], mnemonicFr: "L'EAU COURANTE.", levelId: 8 },
    { word: "鉄道", meaningsFr: ["Chemin de fer"], readings: ["てつどう"], mnemonicFr: "Le CHEMIN DE FER.", levelId: 8 },
    { word: "報道", meaningsFr: ["Information"], readings: ["ほうどう"], mnemonicFr: "L'INFORMATION.", levelId: 8 },
    { word: "柔道", meaningsFr: ["Judo"], readings: ["じゅうどう"], mnemonicFr: "Le JUDO.", levelId: 8 },
    { word: "茶道", meaningsFr: ["Cérémonie du thé"], readings: ["さどう"], mnemonicFr: "La CÉRÉMONIE DU THÉ.", levelId: 8 },
    // Expressions géographiques
    { word: "方向", meaningsFr: ["Direction"], readings: ["ほうこう"], mnemonicFr: "La DIRECTION.", levelId: 8 },
    { word: "南向き", meaningsFr: ["Orienté sud"], readings: ["みなみむき"], mnemonicFr: "ORIENTÉ SUD.", levelId: 8 },
    { word: "北向き", meaningsFr: ["Orienté nord"], readings: ["きたむき"], mnemonicFr: "ORIENTÉ NORD.", levelId: 8 },
    { word: "道案内", meaningsFr: ["Indications"], readings: ["みちあんない"], mnemonicFr: "Les INDICATIONS.", levelId: 8 },
    { word: "近道", meaningsFr: ["Raccourci"], readings: ["ちかみち"], mnemonicFr: "Un RACCOURCI.", levelId: 8 },
    { word: "迷い道", meaningsFr: ["Se perdre"], readings: ["まよいみち"], mnemonicFr: "SE PERDRE.", levelId: 8 },
  ];

  for (const vocab of level8Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 8 supplementary vocab complete! Added", level8Vocab.length, "words");

  // ============================================
  // LEVEL 9 - Supplementary Vocabulary
  // Base kanji: 体 心 頭 顔 声 音 色 形 長 短
  // ============================================

  const level9Vocab = [
    // 体 - Corps
    { word: "体", meaningsFr: ["Corps"], readings: ["からだ"], mnemonicFr: "Le CORPS.", levelId: 9 },
    { word: "体重", meaningsFr: ["Poids corporel"], readings: ["たいじゅう"], mnemonicFr: "Le POIDS.", levelId: 9 },
    { word: "体力", meaningsFr: ["Endurance"], readings: ["たいりょく"], mnemonicFr: "L'ENDURANCE.", levelId: 9 },
    { word: "体育", meaningsFr: ["Éducation physique"], readings: ["たいいく"], mnemonicFr: "L'ÉDUCATION PHYSIQUE.", levelId: 9 },
    { word: "体験", meaningsFr: ["Expérience"], readings: ["たいけん"], mnemonicFr: "L'EXPÉRIENCE.", levelId: 9 },
    { word: "体温", meaningsFr: ["Température corporelle"], readings: ["たいおん"], mnemonicFr: "La TEMPÉRATURE CORPORELLE.", levelId: 9 },
    { word: "全体", meaningsFr: ["Totalité"], readings: ["ぜんたい"], mnemonicFr: "La TOTALITÉ.", levelId: 9 },
    { word: "具体的", meaningsFr: ["Concret"], readings: ["ぐたいてき"], mnemonicFr: "CONCRET.", levelId: 9 },
    // 心 - Cœur, esprit
    { word: "心", meaningsFr: ["Cœur", "Esprit"], readings: ["こころ"], mnemonicFr: "Le CŒUR.", levelId: 9 },
    { word: "心配", meaningsFr: ["Inquiétude"], readings: ["しんぱい"], mnemonicFr: "L'INQUIÉTUDE.", levelId: 9 },
    { word: "安心", meaningsFr: ["Tranquillité"], readings: ["あんしん"], mnemonicFr: "La TRANQUILLITÉ.", levelId: 9 },
    { word: "中心", meaningsFr: ["Centre"], readings: ["ちゅうしん"], mnemonicFr: "Le CENTRE.", levelId: 9 },
    { word: "関心", meaningsFr: ["Intérêt"], readings: ["かんしん"], mnemonicFr: "L'INTÉRÊT.", levelId: 9 },
    { word: "熱心", meaningsFr: ["Enthousiaste"], readings: ["ねっしん"], mnemonicFr: "ENTHOUSIASTE.", levelId: 9 },
    { word: "決心", meaningsFr: ["Résolution"], readings: ["けっしん"], mnemonicFr: "La RÉSOLUTION.", levelId: 9 },
    { word: "心理", meaningsFr: ["Psychologie"], readings: ["しんり"], mnemonicFr: "La PSYCHOLOGIE.", levelId: 9 },
    // 頭 - Tête
    { word: "頭", meaningsFr: ["Tête"], readings: ["あたま"], mnemonicFr: "La TÊTE.", levelId: 9 },
    { word: "頭痛", meaningsFr: ["Mal de tête"], readings: ["ずつう"], mnemonicFr: "Le MAL DE TÊTE.", levelId: 9 },
    { word: "頭脳", meaningsFr: ["Cerveau"], readings: ["ずのう"], mnemonicFr: "Le CERVEAU.", levelId: 9 },
    { word: "先頭", meaningsFr: ["Tête de file"], readings: ["せんとう"], mnemonicFr: "La TÊTE DE FILE.", levelId: 9 },
    { word: "冒頭", meaningsFr: ["Introduction"], readings: ["ぼうとう"], mnemonicFr: "L'INTRODUCTION.", levelId: 9 },
    // 顔 - Visage
    { word: "顔", meaningsFr: ["Visage"], readings: ["かお"], mnemonicFr: "Le VISAGE.", levelId: 9 },
    { word: "顔色", meaningsFr: ["Teint"], readings: ["かおいろ"], mnemonicFr: "Le TEINT.", levelId: 9 },
    { word: "笑顔", meaningsFr: ["Sourire"], readings: ["えがお"], mnemonicFr: "Le SOURIRE.", levelId: 9 },
    { word: "顔つき", meaningsFr: ["Expression du visage"], readings: ["かおつき"], mnemonicFr: "L'EXPRESSION DU VISAGE.", levelId: 9 },
    { word: "知らん顔", meaningsFr: ["Faire semblant de ne pas savoir"], readings: ["しらんかお"], mnemonicFr: "FAIRE L'IGNORANT.", levelId: 9 },
    // 声 - Voix
    { word: "声", meaningsFr: ["Voix"], readings: ["こえ"], mnemonicFr: "La VOIX.", levelId: 9 },
    { word: "声援", meaningsFr: ["Encouragement"], readings: ["せいえん"], mnemonicFr: "L'ENCOURAGEMENT.", levelId: 9 },
    { word: "大声", meaningsFr: ["Voix forte"], readings: ["おおごえ"], mnemonicFr: "Une VOIX FORTE.", levelId: 9 },
    { word: "小声", meaningsFr: ["Voix basse"], readings: ["こごえ"], mnemonicFr: "Une VOIX BASSE.", levelId: 9 },
    { word: "声明", meaningsFr: ["Déclaration"], readings: ["せいめい"], mnemonicFr: "La DÉCLARATION.", levelId: 9 },
    // 音 - Son
    { word: "音", meaningsFr: ["Son"], readings: ["おと"], mnemonicFr: "Le SON.", levelId: 9 },
    { word: "音楽", meaningsFr: ["Musique"], readings: ["おんがく"], mnemonicFr: "La MUSIQUE.", levelId: 9 },
    { word: "音声", meaningsFr: ["Voix", "Audio"], readings: ["おんせい"], mnemonicFr: "L'AUDIO.", levelId: 9 },
    { word: "発音", meaningsFr: ["Prononciation"], readings: ["はつおん"], mnemonicFr: "La PRONONCIATION.", levelId: 9 },
    { word: "騒音", meaningsFr: ["Bruit"], readings: ["そうおん"], mnemonicFr: "Le BRUIT.", levelId: 9 },
    { word: "録音", meaningsFr: ["Enregistrement"], readings: ["ろくおん"], mnemonicFr: "L'ENREGISTREMENT.", levelId: 9 },
    // 色 - Couleur
    { word: "色", meaningsFr: ["Couleur"], readings: ["いろ"], mnemonicFr: "La COULEUR.", levelId: 9 },
    { word: "色々", meaningsFr: ["Divers"], readings: ["いろいろ"], mnemonicFr: "DIVERS.", levelId: 9 },
    { word: "景色", meaningsFr: ["Paysage"], readings: ["けしき"], mnemonicFr: "Le PAYSAGE.", levelId: 9 },
    { word: "特色", meaningsFr: ["Caractéristique"], readings: ["とくしょく"], mnemonicFr: "La CARACTÉRISTIQUE.", levelId: 9 },
    { word: "茶色", meaningsFr: ["Marron"], readings: ["ちゃいろ"], mnemonicFr: "MARRON.", levelId: 9 },
    { word: "黄色", meaningsFr: ["Jaune"], readings: ["きいろ"], mnemonicFr: "JAUNE.", levelId: 9 },
    // 形 - Forme
    { word: "形", meaningsFr: ["Forme"], readings: ["かたち"], mnemonicFr: "La FORME.", levelId: 9 },
    { word: "形式", meaningsFr: ["Format"], readings: ["けいしき"], mnemonicFr: "Le FORMAT.", levelId: 9 },
    { word: "人形", meaningsFr: ["Poupée"], readings: ["にんぎょう"], mnemonicFr: "La POUPÉE.", levelId: 9 },
    { word: "形容詞", meaningsFr: ["Adjectif"], readings: ["けいようし"], mnemonicFr: "L'ADJECTIF.", levelId: 9 },
    { word: "形成", meaningsFr: ["Formation"], readings: ["けいせい"], mnemonicFr: "La FORMATION.", levelId: 9 },
    // 長 - Long
    { word: "長い", meaningsFr: ["Long"], readings: ["ながい"], mnemonicFr: "C'est LONG.", levelId: 9 },
    { word: "長さ", meaningsFr: ["Longueur"], readings: ["ながさ"], mnemonicFr: "La LONGUEUR.", levelId: 9 },
    { word: "社長", meaningsFr: ["PDG"], readings: ["しゃちょう"], mnemonicFr: "Le PDG.", levelId: 9 },
    { word: "部長", meaningsFr: ["Chef de département"], readings: ["ぶちょう"], mnemonicFr: "Le CHEF DE DÉPARTEMENT.", levelId: 9 },
    { word: "課長", meaningsFr: ["Chef de section"], readings: ["かちょう"], mnemonicFr: "Le CHEF DE SECTION.", levelId: 9 },
    { word: "成長", meaningsFr: ["Croissance"], readings: ["せいちょう"], mnemonicFr: "La CROISSANCE.", levelId: 9 },
    { word: "長期", meaningsFr: ["Long terme"], readings: ["ちょうき"], mnemonicFr: "LONG TERME.", levelId: 9 },
    // 短 - Court
    { word: "短い", meaningsFr: ["Court"], readings: ["みじかい"], mnemonicFr: "C'est COURT.", levelId: 9 },
    { word: "短所", meaningsFr: ["Point faible"], readings: ["たんしょ"], mnemonicFr: "Le POINT FAIBLE.", levelId: 9 },
    { word: "長所", meaningsFr: ["Point fort"], readings: ["ちょうしょ"], mnemonicFr: "Le POINT FORT.", levelId: 9 },
    { word: "短期", meaningsFr: ["Court terme"], readings: ["たんき"], mnemonicFr: "COURT TERME.", levelId: 9 },
    { word: "短縮", meaningsFr: ["Raccourcir"], readings: ["たんしゅく"], mnemonicFr: "RACCOURCIR.", levelId: 9 },
    // Expressions corporelles
    { word: "身体", meaningsFr: ["Corps"], readings: ["しんたい", "からだ"], mnemonicFr: "Le CORPS.", levelId: 9 },
    { word: "体調", meaningsFr: ["État de santé"], readings: ["たいちょう"], mnemonicFr: "L'ÉTAT DE SANTÉ.", levelId: 9 },
    { word: "気心", meaningsFr: ["Disposition"], readings: ["きごころ"], mnemonicFr: "La DISPOSITION.", levelId: 9 },
    { word: "音色", meaningsFr: ["Timbre"], readings: ["ねいろ"], mnemonicFr: "Le TIMBRE.", levelId: 9 },
  ];

  for (const vocab of level9Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 9 supplementary vocab complete! Added", level9Vocab.length, "words");

  // ============================================
  // LEVEL 10 - Supplementary Vocabulary
  // Base kanji: 高 低 新 古 多 少 早 遅 近 遠
  // ============================================

  const level10Vocab = [
    // 高 - Haut, cher
    { word: "高い", meaningsFr: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "C'est HAUT, c'est CHER.", levelId: 10 },
    { word: "高さ", meaningsFr: ["Hauteur"], readings: ["たかさ"], mnemonicFr: "La HAUTEUR.", levelId: 10 },
    { word: "高校", meaningsFr: ["Lycée"], readings: ["こうこう"], mnemonicFr: "Le LYCÉE.", levelId: 10 },
    { word: "高校生", meaningsFr: ["Lycéen"], readings: ["こうこうせい"], mnemonicFr: "Le LYCÉEN.", levelId: 10 },
    { word: "高速", meaningsFr: ["Grande vitesse"], readings: ["こうそく"], mnemonicFr: "GRANDE VITESSE.", levelId: 10 },
    { word: "高級", meaningsFr: ["Haut de gamme"], readings: ["こうきゅう"], mnemonicFr: "HAUT DE GAMME.", levelId: 10 },
    { word: "最高", meaningsFr: ["Le meilleur"], readings: ["さいこう"], mnemonicFr: "Le MEILLEUR.", levelId: 10 },
    { word: "高齢", meaningsFr: ["Âge avancé"], readings: ["こうれい"], mnemonicFr: "ÂGE AVANCÉ.", levelId: 10 },
    { word: "高温", meaningsFr: ["Haute température"], readings: ["こうおん"], mnemonicFr: "HAUTE TEMPÉRATURE.", levelId: 10 },
    // 低 - Bas
    { word: "低い", meaningsFr: ["Bas"], readings: ["ひくい"], mnemonicFr: "C'est BAS.", levelId: 10 },
    { word: "低下", meaningsFr: ["Baisse"], readings: ["ていか"], mnemonicFr: "La BAISSE.", levelId: 10 },
    { word: "最低", meaningsFr: ["Le pire", "Minimum"], readings: ["さいてい"], mnemonicFr: "Le MINIMUM.", levelId: 10 },
    { word: "低温", meaningsFr: ["Basse température"], readings: ["ていおん"], mnemonicFr: "BASSE TEMPÉRATURE.", levelId: 10 },
    { word: "低価格", meaningsFr: ["Bas prix"], readings: ["ていかかく"], mnemonicFr: "BAS PRIX.", levelId: 10 },
    // 新 - Nouveau
    { word: "新しい", meaningsFr: ["Nouveau"], readings: ["あたらしい"], mnemonicFr: "C'est NOUVEAU.", levelId: 10 },
    { word: "新聞", meaningsFr: ["Journal"], readings: ["しんぶん"], mnemonicFr: "Le JOURNAL.", levelId: 10 },
    { word: "新年", meaningsFr: ["Nouvel an"], readings: ["しんねん"], mnemonicFr: "Le NOUVEL AN.", levelId: 10 },
    { word: "新人", meaningsFr: ["Nouveau"], readings: ["しんじん"], mnemonicFr: "Le NOUVEAU.", levelId: 10 },
    { word: "新鮮", meaningsFr: ["Frais"], readings: ["しんせん"], mnemonicFr: "C'est FRAIS.", levelId: 10 },
    { word: "革新", meaningsFr: ["Innovation"], readings: ["かくしん"], mnemonicFr: "L'INNOVATION.", levelId: 10 },
    { word: "新幹線", meaningsFr: ["Shinkansen"], readings: ["しんかんせん"], mnemonicFr: "Le SHINKANSEN.", levelId: 10 },
    { word: "新婚", meaningsFr: ["Jeune marié"], readings: ["しんこん"], mnemonicFr: "JEUNES MARIÉS.", levelId: 10 },
    // 古 - Vieux, ancien
    { word: "古い", meaningsFr: ["Vieux", "Ancien"], readings: ["ふるい"], mnemonicFr: "C'est VIEUX.", levelId: 10 },
    { word: "古代", meaningsFr: ["Antiquité"], readings: ["こだい"], mnemonicFr: "L'ANTIQUITÉ.", levelId: 10 },
    { word: "中古", meaningsFr: ["D'occasion"], readings: ["ちゅうこ"], mnemonicFr: "D'OCCASION.", levelId: 10 },
    { word: "古典", meaningsFr: ["Classique"], readings: ["こてん"], mnemonicFr: "Un CLASSIQUE.", levelId: 10 },
    { word: "古本", meaningsFr: ["Livre d'occasion"], readings: ["ふるほん"], mnemonicFr: "Un LIVRE D'OCCASION.", levelId: 10 },
    { word: "古来", meaningsFr: ["Depuis toujours"], readings: ["こらい"], mnemonicFr: "DEPUIS TOUJOURS.", levelId: 10 },
    // 多 - Beaucoup
    { word: "多い", meaningsFr: ["Nombreux"], readings: ["おおい"], mnemonicFr: "C'est NOMBREUX.", levelId: 10 },
    { word: "多く", meaningsFr: ["Beaucoup"], readings: ["おおく"], mnemonicFr: "BEAUCOUP.", levelId: 10 },
    { word: "多分", meaningsFr: ["Probablement"], readings: ["たぶん"], mnemonicFr: "PROBABLEMENT.", levelId: 10 },
    { word: "多数", meaningsFr: ["Majorité"], readings: ["たすう"], mnemonicFr: "La MAJORITÉ.", levelId: 10 },
    { word: "多様", meaningsFr: ["Divers"], readings: ["たよう"], mnemonicFr: "DIVERS.", levelId: 10 },
    { word: "多少", meaningsFr: ["Plus ou moins"], readings: ["たしょう"], mnemonicFr: "PLUS OU MOINS.", levelId: 10 },
    // 少 - Peu
    { word: "少ない", meaningsFr: ["Peu nombreux"], readings: ["すくない"], mnemonicFr: "C'est PEU.", levelId: 10 },
    { word: "少し", meaningsFr: ["Un peu"], readings: ["すこし"], mnemonicFr: "UN PEU.", levelId: 10 },
    { word: "少年", meaningsFr: ["Garçon"], readings: ["しょうねん"], mnemonicFr: "Le GARÇON.", levelId: 10 },
    { word: "少女", meaningsFr: ["Fille"], readings: ["しょうじょ"], mnemonicFr: "La FILLE.", levelId: 10 },
    { word: "減少", meaningsFr: ["Diminution"], readings: ["げんしょう"], mnemonicFr: "La DIMINUTION.", levelId: 10 },
    { word: "少数", meaningsFr: ["Minorité"], readings: ["しょうすう"], mnemonicFr: "La MINORITÉ.", levelId: 10 },
    // 早 - Tôt, rapide
    { word: "早い", meaningsFr: ["Tôt", "Rapide"], readings: ["はやい"], mnemonicFr: "C'est TÔT.", levelId: 10 },
    { word: "早く", meaningsFr: ["Vite"], readings: ["はやく"], mnemonicFr: "VITE.", levelId: 10 },
    { word: "早朝", meaningsFr: ["Tôt le matin"], readings: ["そうちょう"], mnemonicFr: "TÔT LE MATIN.", levelId: 10 },
    { word: "早起き", meaningsFr: ["Se lever tôt"], readings: ["はやおき"], mnemonicFr: "SE LEVER TÔT.", levelId: 10 },
    { word: "早速", meaningsFr: ["Immédiatement"], readings: ["さっそく"], mnemonicFr: "IMMÉDIATEMENT.", levelId: 10 },
    { word: "素早い", meaningsFr: ["Rapide"], readings: ["すばやい"], mnemonicFr: "C'est RAPIDE.", levelId: 10 },
    // 遅 - Tard, lent
    { word: "遅い", meaningsFr: ["Tard", "Lent"], readings: ["おそい"], mnemonicFr: "C'est TARD.", levelId: 10 },
    { word: "遅れる", meaningsFr: ["Être en retard"], readings: ["おくれる"], mnemonicFr: "ÊTRE EN RETARD.", levelId: 10 },
    { word: "遅刻", meaningsFr: ["Retard"], readings: ["ちこく"], mnemonicFr: "Le RETARD.", levelId: 10 },
    { word: "遅延", meaningsFr: ["Retard", "Délai"], readings: ["ちえん"], mnemonicFr: "Le DÉLAI.", levelId: 10 },
    // 近 - Proche
    { word: "近い", meaningsFr: ["Proche"], readings: ["ちかい"], mnemonicFr: "C'est PROCHE.", levelId: 10 },
    { word: "近く", meaningsFr: ["Près"], readings: ["ちかく"], mnemonicFr: "PRÈS.", levelId: 10 },
    { word: "近所", meaningsFr: ["Voisinage"], readings: ["きんじょ"], mnemonicFr: "Le VOISINAGE.", levelId: 10 },
    { word: "最近", meaningsFr: ["Récemment"], readings: ["さいきん"], mnemonicFr: "RÉCEMMENT.", levelId: 10 },
    { word: "近代", meaningsFr: ["Moderne"], readings: ["きんだい"], mnemonicFr: "MODERNE.", levelId: 10 },
    { word: "近道", meaningsFr: ["Raccourci"], readings: ["ちかみち"], mnemonicFr: "Un RACCOURCI.", levelId: 10 },
    { word: "付近", meaningsFr: ["Environs"], readings: ["ふきん"], mnemonicFr: "Les ENVIRONS.", levelId: 10 },
    { word: "近畿", meaningsFr: ["Kinki"], readings: ["きんき"], mnemonicFr: "La région de KINKI.", levelId: 10 },
    // 遠 - Loin
    { word: "遠い", meaningsFr: ["Loin"], readings: ["とおい"], mnemonicFr: "C'est LOIN.", levelId: 10 },
    { word: "遠く", meaningsFr: ["Au loin"], readings: ["とおく"], mnemonicFr: "AU LOIN.", levelId: 10 },
    { word: "遠足", meaningsFr: ["Excursion"], readings: ["えんそく"], mnemonicFr: "Une EXCURSION.", levelId: 10 },
    { word: "遠慮", meaningsFr: ["Réserve"], readings: ["えんりょ"], mnemonicFr: "La RÉSERVE.", levelId: 10 },
    { word: "永遠", meaningsFr: ["Éternité"], readings: ["えいえん"], mnemonicFr: "L'ÉTERNITÉ.", levelId: 10 },
    { word: "遠方", meaningsFr: ["Endroit éloigné"], readings: ["えんぽう"], mnemonicFr: "Un ENDROIT ÉLOIGNÉ.", levelId: 10 },
    // Expressions comparatives
    { word: "高低", meaningsFr: ["Hauteur"], readings: ["こうてい"], mnemonicFr: "La HAUTEUR.", levelId: 10 },
    { word: "新旧", meaningsFr: ["Nouveau et ancien"], readings: ["しんきゅう"], mnemonicFr: "NOUVEAU ET ANCIEN.", levelId: 10 },
    { word: "多少", meaningsFr: ["Plus ou moins"], readings: ["たしょう"], mnemonicFr: "PLUS OU MOINS.", levelId: 10 },
    { word: "遠近", meaningsFr: ["Distance"], readings: ["えんきん"], mnemonicFr: "La DISTANCE.", levelId: 10 },
    { word: "遠近法", meaningsFr: ["Perspective"], readings: ["えんきんほう"], mnemonicFr: "La PERSPECTIVE.", levelId: 10 },
  ];

  for (const vocab of level10Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 10 supplementary vocab complete! Added", level10Vocab.length, "words");

  // Final summary
  const totalWords = level4Vocab.length + level5Vocab.length + level6Vocab.length +
                     level7Vocab.length + level8Vocab.length + level9Vocab.length +
                     level10Vocab.length;

  console.log("\n========================================");
  console.log("Supplementary vocabulary seeding complete!");
  console.log("========================================");
  console.log("Level 4:", level4Vocab.length, "words");
  console.log("Level 5:", level5Vocab.length, "words");
  console.log("Level 6:", level6Vocab.length, "words");
  console.log("Level 7:", level7Vocab.length, "words");
  console.log("Level 8:", level8Vocab.length, "words");
  console.log("Level 9:", level9Vocab.length, "words");
  console.log("Level 10:", level10Vocab.length, "words");
  console.log("----------------------------------------");
  console.log("TOTAL:", totalWords, "words added to levels 4-10");
  console.log("========================================");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
