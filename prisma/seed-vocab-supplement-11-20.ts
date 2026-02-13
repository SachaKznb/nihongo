import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding supplementary vocabulary to levels 11-20...");

  // ============================================
  // LEVEL 11 - Supplementary Vocabulary
  // Kanji: 争仲伝共好成老位低初別利努労命岸放昔波注育拾指洋神秒級追戦競良功特便働令意味
  // ============================================

  const level11Vocab = [
    // 争 vocabulary
    { word: "競争力", meaningsFr: ["Compétitivité"], readings: ["きょうそうりょく"], mnemonicFr: "La COMPÉTITIVITÉ sur le marché.", levelId: 11 },
    { word: "争点", meaningsFr: ["Point de litige"], readings: ["そうてん"], mnemonicFr: "Le POINT DE LITIGE dans un débat.", levelId: 11 },
    // 仲 vocabulary
    { word: "仲良し", meaningsFr: ["Bon ami", "Intime"], readings: ["なかよし"], mnemonicFr: "Un BON AMI, quelqu'un de proche.", levelId: 11 },
    { word: "仲直り", meaningsFr: ["Réconciliation"], readings: ["なかなおり"], mnemonicFr: "La RÉCONCILIATION après une dispute.", levelId: 11 },
    { word: "仲介", meaningsFr: ["Médiation"], readings: ["ちゅうかい"], mnemonicFr: "La MÉDIATION entre deux parties.", levelId: 11 },
    // 伝 vocabulary
    { word: "伝説", meaningsFr: ["Légende"], readings: ["でんせつ"], mnemonicFr: "Une LÉGENDE transmise.", levelId: 11 },
    { word: "伝言", meaningsFr: ["Message"], readings: ["でんごん"], mnemonicFr: "Un MESSAGE à transmettre.", levelId: 11 },
    { word: "手伝い", meaningsFr: ["Aide", "Assistant"], readings: ["てつだい"], mnemonicFr: "L'AIDE qu'on apporte.", levelId: 11 },
    { word: "宣伝", meaningsFr: ["Publicité"], readings: ["せんでん"], mnemonicFr: "La PUBLICITÉ, la promotion.", levelId: 11 },
    // 共 vocabulary
    { word: "共通", meaningsFr: ["Commun"], readings: ["きょうつう"], mnemonicFr: "En COMMUN, partagé.", levelId: 11 },
    { word: "共同", meaningsFr: ["Collaboration"], readings: ["きょうどう"], mnemonicFr: "La COLLABORATION, le travail ensemble.", levelId: 11 },
    { word: "共感", meaningsFr: ["Empathie"], readings: ["きょうかん"], mnemonicFr: "L'EMPATHIE, comprendre les sentiments.", levelId: 11 },
    // 好 vocabulary
    { word: "好み", meaningsFr: ["Préférence", "Goût"], readings: ["このみ"], mnemonicFr: "La PRÉFÉRENCE personnelle.", levelId: 11 },
    { word: "好物", meaningsFr: ["Mets préféré"], readings: ["こうぶつ"], mnemonicFr: "Son PLAT PRÉFÉRÉ.", levelId: 11 },
    { word: "好調", meaningsFr: ["Bonne forme"], readings: ["こうちょう"], mnemonicFr: "En BONNE FORME.", levelId: 11 },
    { word: "大好き", meaningsFr: ["Adorer"], readings: ["だいすき"], mnemonicFr: "ADORER quelque chose.", levelId: 11 },
    // 成 vocabulary
    { word: "成長", meaningsFr: ["Croissance"], readings: ["せいちょう"], mnemonicFr: "La CROISSANCE, le développement.", levelId: 11 },
    { word: "成績", meaningsFr: ["Résultats scolaires"], readings: ["せいせき"], mnemonicFr: "Les RÉSULTATS scolaires.", levelId: 11 },
    { word: "成人", meaningsFr: ["Adulte"], readings: ["せいじん"], mnemonicFr: "Un ADULTE, une personne majeure.", levelId: 11 },
    { word: "完成", meaningsFr: ["Achèvement"], readings: ["かんせい"], mnemonicFr: "L'ACHÈVEMENT d'un projet.", levelId: 11 },
    { word: "作成", meaningsFr: ["Création", "Rédaction"], readings: ["さくせい"], mnemonicFr: "La CRÉATION d'un document.", levelId: 11 },
    // 老 vocabulary
    { word: "老化", meaningsFr: ["Vieillissement"], readings: ["ろうか"], mnemonicFr: "Le VIEILLISSEMENT du corps.", levelId: 11 },
    { word: "老後", meaningsFr: ["Vieillesse"], readings: ["ろうご"], mnemonicFr: "La VIEILLESSE, après la retraite.", levelId: 11 },
    { word: "老若男女", meaningsFr: ["Tout le monde"], readings: ["ろうにゃくなんにょ"], mnemonicFr: "TOUT LE MONDE, jeunes et vieux.", levelId: 11 },
    // 位 vocabulary
    { word: "順位", meaningsFr: ["Classement"], readings: ["じゅんい"], mnemonicFr: "Le CLASSEMENT, l'ordre.", levelId: 11 },
    { word: "単位", meaningsFr: ["Unité", "Crédit"], readings: ["たんい"], mnemonicFr: "L'UNITÉ de mesure ou crédit.", levelId: 11 },
    { word: "地位", meaningsFr: ["Statut social"], readings: ["ちい"], mnemonicFr: "Le STATUT SOCIAL.", levelId: 11 },
    // 低 vocabulary
    { word: "低下", meaningsFr: ["Baisse", "Déclin"], readings: ["ていか"], mnemonicFr: "La BAISSE, le déclin.", levelId: 11 },
    { word: "低温", meaningsFr: ["Basse température"], readings: ["ていおん"], mnemonicFr: "BASSE TEMPÉRATURE.", levelId: 11 },
    { word: "高低", meaningsFr: ["Hauteur et profondeur"], readings: ["こうてい"], mnemonicFr: "HAUT ET BAS.", levelId: 11 },
    // 初 vocabulary
    { word: "初心者", meaningsFr: ["Débutant"], readings: ["しょしんしゃ"], mnemonicFr: "Un DÉBUTANT.", levelId: 11 },
    { word: "初日", meaningsFr: ["Premier jour"], readings: ["しょにち"], mnemonicFr: "Le PREMIER JOUR.", levelId: 11 },
    { word: "初恋", meaningsFr: ["Premier amour"], readings: ["はつこい"], mnemonicFr: "Le PREMIER AMOUR.", levelId: 11 },
    { word: "初夏", meaningsFr: ["Début de l'été"], readings: ["しょか"], mnemonicFr: "Le DÉBUT DE L'ÉTÉ.", levelId: 11 },
    // 別 vocabulary
    { word: "特別", meaningsFr: ["Spécial"], readings: ["とくべつ"], mnemonicFr: "SPÉCIAL, particulier.", levelId: 11 },
    { word: "別々", meaningsFr: ["Séparément"], readings: ["べつべつ"], mnemonicFr: "SÉPARÉMENT, chacun de son côté.", levelId: 11 },
    { word: "差別", meaningsFr: ["Discrimination"], readings: ["さべつ"], mnemonicFr: "La DISCRIMINATION.", levelId: 11 },
    { word: "別荘", meaningsFr: ["Maison de vacances"], readings: ["べっそう"], mnemonicFr: "Une MAISON DE VACANCES.", levelId: 11 },
    // 利 vocabulary
    { word: "利益", meaningsFr: ["Bénéfice", "Profit"], readings: ["りえき"], mnemonicFr: "Le BÉNÉFICE, le profit.", levelId: 11 },
    { word: "利点", meaningsFr: ["Avantage"], readings: ["りてん"], mnemonicFr: "L'AVANTAGE.", levelId: 11 },
    { word: "有利", meaningsFr: ["Avantageux"], readings: ["ゆうり"], mnemonicFr: "AVANTAGEUX.", levelId: 11 },
    { word: "不利", meaningsFr: ["Désavantageux"], readings: ["ふり"], mnemonicFr: "DÉSAVANTAGEUX.", levelId: 11 },
    // 努 vocabulary
    { word: "努める", meaningsFr: ["S'efforcer"], readings: ["つとめる"], mnemonicFr: "S'EFFORCER de faire.", levelId: 11 },
    // 労 vocabulary
    { word: "疲労", meaningsFr: ["Fatigue"], readings: ["ひろう"], mnemonicFr: "La FATIGUE du travail.", levelId: 11 },
    { word: "労働者", meaningsFr: ["Travailleur"], readings: ["ろうどうしゃ"], mnemonicFr: "Un TRAVAILLEUR.", levelId: 11 },
    { word: "苦労", meaningsFr: ["Peine", "Difficulté"], readings: ["くろう"], mnemonicFr: "La PEINE, les difficultés.", levelId: 11 },
    // 命 vocabulary
    { word: "命じる", meaningsFr: ["Ordonner"], readings: ["めいじる"], mnemonicFr: "ORDONNER quelque chose.", levelId: 11 },
    { word: "運命", meaningsFr: ["Destin"], readings: ["うんめい"], mnemonicFr: "Le DESTIN.", levelId: 11 },
    { word: "寿命", meaningsFr: ["Durée de vie"], readings: ["じゅみょう"], mnemonicFr: "La DURÉE DE VIE.", levelId: 11 },
    { word: "使命", meaningsFr: ["Mission"], readings: ["しめい"], mnemonicFr: "La MISSION à accomplir.", levelId: 11 },
    // 放 vocabulary
    { word: "解放", meaningsFr: ["Libération"], readings: ["かいほう"], mnemonicFr: "La LIBÉRATION.", levelId: 11 },
    { word: "開放", meaningsFr: ["Ouverture"], readings: ["かいほう"], mnemonicFr: "L'OUVERTURE au public.", levelId: 11 },
    { word: "放置", meaningsFr: ["Laisser tel quel"], readings: ["ほうち"], mnemonicFr: "LAISSER TEL QUEL.", levelId: 11 },
    // 波 vocabulary
    { word: "電波", meaningsFr: ["Ondes radio"], readings: ["でんぱ"], mnemonicFr: "Les ONDES RADIO.", levelId: 11 },
    { word: "波長", meaningsFr: ["Longueur d'onde"], readings: ["はちょう"], mnemonicFr: "La LONGUEUR D'ONDE.", levelId: 11 },
    // 注 vocabulary
    { word: "注目", meaningsFr: ["Attention"], readings: ["ちゅうもく"], mnemonicFr: "L'ATTENTION, regarder.", levelId: 11 },
    { word: "注射", meaningsFr: ["Injection"], readings: ["ちゅうしゃ"], mnemonicFr: "Une INJECTION.", levelId: 11 },
    // 育 vocabulary
    { word: "体育", meaningsFr: ["Éducation physique"], readings: ["たいいく"], mnemonicFr: "L'ÉDUCATION PHYSIQUE.", levelId: 11 },
    { word: "育児", meaningsFr: ["Soin des enfants"], readings: ["いくじ"], mnemonicFr: "Le SOIN DES ENFANTS.", levelId: 11 },
    { word: "成育", meaningsFr: ["Croissance"], readings: ["せいいく"], mnemonicFr: "La CROISSANCE d'un enfant.", levelId: 11 },
    // 指 vocabulary
    { word: "指導", meaningsFr: ["Direction", "Guidance"], readings: ["しどう"], mnemonicFr: "La DIRECTION, la guidance.", levelId: 11 },
    { word: "指定", meaningsFr: ["Désignation"], readings: ["してい"], mnemonicFr: "La DÉSIGNATION.", levelId: 11 },
    { word: "指示", meaningsFr: ["Instructions"], readings: ["しじ"], mnemonicFr: "Les INSTRUCTIONS.", levelId: 11 },
    { word: "指輪", meaningsFr: ["Bague"], readings: ["ゆびわ"], mnemonicFr: "Une BAGUE au doigt.", levelId: 11 },
    // 洋 vocabulary
    { word: "東洋", meaningsFr: ["Orient"], readings: ["とうよう"], mnemonicFr: "L'ORIENT.", levelId: 11 },
    { word: "西洋", meaningsFr: ["Occident"], readings: ["せいよう"], mnemonicFr: "L'OCCIDENT.", levelId: 11 },
    { word: "洋食", meaningsFr: ["Cuisine occidentale"], readings: ["ようしょく"], mnemonicFr: "La CUISINE OCCIDENTALE.", levelId: 11 },
    // 神 vocabulary
    { word: "神様", meaningsFr: ["Dieu"], readings: ["かみさま"], mnemonicFr: "DIEU (forme polie).", levelId: 11 },
    { word: "神話", meaningsFr: ["Mythologie"], readings: ["しんわ"], mnemonicFr: "La MYTHOLOGIE.", levelId: 11 },
    { word: "精神", meaningsFr: ["Esprit", "Mental"], readings: ["せいしん"], mnemonicFr: "L'ESPRIT, le mental.", levelId: 11 },
    { word: "神経", meaningsFr: ["Nerf"], readings: ["しんけい"], mnemonicFr: "Le NERF.", levelId: 11 },
    // 級 vocabulary
    { word: "上級", meaningsFr: ["Niveau avancé"], readings: ["じょうきゅう"], mnemonicFr: "NIVEAU AVANCÉ.", levelId: 11 },
    { word: "初級", meaningsFr: ["Niveau débutant"], readings: ["しょきゅう"], mnemonicFr: "NIVEAU DÉBUTANT.", levelId: 11 },
    { word: "中級", meaningsFr: ["Niveau intermédiaire"], readings: ["ちゅうきゅう"], mnemonicFr: "NIVEAU INTERMÉDIAIRE.", levelId: 11 },
    { word: "同級生", meaningsFr: ["Camarade de classe"], readings: ["どうきゅうせい"], mnemonicFr: "Un CAMARADE DE CLASSE.", levelId: 11 },
    // 良 vocabulary
    { word: "良好", meaningsFr: ["Favorable", "Bon"], readings: ["りょうこう"], mnemonicFr: "FAVORABLE, bon état.", levelId: 11 },
    { word: "改良", meaningsFr: ["Amélioration"], readings: ["かいりょう"], mnemonicFr: "L'AMÉLIORATION.", levelId: 11 },
    { word: "不良", meaningsFr: ["Défectueux", "Voyou"], readings: ["ふりょう"], mnemonicFr: "DÉFECTUEUX ou VOYOU.", levelId: 11 },
    // 特 vocabulary
    { word: "特徴", meaningsFr: ["Caractéristique"], readings: ["とくちょう"], mnemonicFr: "La CARACTÉRISTIQUE.", levelId: 11 },
    { word: "特定", meaningsFr: ["Spécifique"], readings: ["とくてい"], mnemonicFr: "SPÉCIFIQUE.", levelId: 11 },
    { word: "独特", meaningsFr: ["Unique"], readings: ["どくとく"], mnemonicFr: "UNIQUE, original.", levelId: 11 },
    // 意 vocabulary
    { word: "意志", meaningsFr: ["Volonté"], readings: ["いし"], mnemonicFr: "La VOLONTÉ.", levelId: 11 },
    { word: "意識", meaningsFr: ["Conscience"], readings: ["いしき"], mnemonicFr: "La CONSCIENCE.", levelId: 11 },
    { word: "注意深い", meaningsFr: ["Prudent"], readings: ["ちゅういぶかい"], mnemonicFr: "PRUDENT, attentif.", levelId: 11 },
    { word: "用意", meaningsFr: ["Préparation"], readings: ["ようい"], mnemonicFr: "La PRÉPARATION.", levelId: 11 },
    // 味 vocabulary
    { word: "興味", meaningsFr: ["Intérêt"], readings: ["きょうみ"], mnemonicFr: "L'INTÉRÊT pour quelque chose.", levelId: 11 },
    { word: "趣味", meaningsFr: ["Hobby"], readings: ["しゅみ"], mnemonicFr: "Un HOBBY, un passe-temps.", levelId: 11 },
    { word: "無味", meaningsFr: ["Sans goût"], readings: ["むみ"], mnemonicFr: "SANS GOÛT.", levelId: 11 },
  ];

  for (const vocab of level11Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 11 supplementary vocab complete! Added", level11Vocab.length, "words");

  // ============================================
  // LEVEL 12 - Supplementary Vocabulary
  // Kanji: 待勉庭息旅根流消倍員島祭章第都動商悪族深球童陽階寒暑期植歯温港湯登着短野泉合僕
  // ============================================

  const level12Vocab = [
    // 待 vocabulary
    { word: "待ち合わせ", meaningsFr: ["Rendez-vous"], readings: ["まちあわせ"], mnemonicFr: "Un RENDEZ-VOUS, se retrouver.", levelId: 12 },
    { word: "期待", meaningsFr: ["Attente", "Espoir"], readings: ["きたい"], mnemonicFr: "L'ATTENTE, l'espoir.", levelId: 12 },
    { word: "待合室", meaningsFr: ["Salle d'attente"], readings: ["まちあいしつ"], mnemonicFr: "La SALLE D'ATTENTE.", levelId: 12 },
    { word: "招待", meaningsFr: ["Invitation"], readings: ["しょうたい"], mnemonicFr: "Une INVITATION.", levelId: 12 },
    // 勉 vocabulary
    { word: "勉強家", meaningsFr: ["Travailleur acharné"], readings: ["べんきょうか"], mnemonicFr: "Un TRAVAILLEUR ACHARNÉ.", levelId: 12 },
    // 庭 vocabulary
    { word: "庭園", meaningsFr: ["Jardin"], readings: ["ていえん"], mnemonicFr: "Un JARDIN japonais.", levelId: 12 },
    { word: "中庭", meaningsFr: ["Cour intérieure"], readings: ["なかにわ"], mnemonicFr: "La COUR INTÉRIEURE.", levelId: 12 },
    { word: "家庭", meaningsFr: ["Foyer", "Famille"], readings: ["かてい"], mnemonicFr: "Le FOYER, la famille.", levelId: 12 },
    // 息 vocabulary
    { word: "息子", meaningsFr: ["Fils"], readings: ["むすこ"], mnemonicFr: "Le FILS.", levelId: 12 },
    { word: "休息", meaningsFr: ["Repos"], readings: ["きゅうそく"], mnemonicFr: "Le REPOS.", levelId: 12 },
    { word: "息抜き", meaningsFr: ["Pause détente"], readings: ["いきぬき"], mnemonicFr: "Une PAUSE DÉTENTE.", levelId: 12 },
    { word: "ため息", meaningsFr: ["Soupir"], readings: ["ためいき"], mnemonicFr: "Un SOUPIR.", levelId: 12 },
    // 旅 vocabulary
    { word: "旅行", meaningsFr: ["Voyage"], readings: ["りょこう"], mnemonicFr: "Un VOYAGE.", levelId: 12 },
    { word: "旅館", meaningsFr: ["Auberge japonaise"], readings: ["りょかん"], mnemonicFr: "Une AUBERGE japonaise.", levelId: 12 },
    { word: "旅人", meaningsFr: ["Voyageur"], readings: ["たびびと"], mnemonicFr: "Un VOYAGEUR.", levelId: 12 },
    { word: "旅立ち", meaningsFr: ["Départ en voyage"], readings: ["たびだち"], mnemonicFr: "Le DÉPART EN VOYAGE.", levelId: 12 },
    // 根 vocabulary
    { word: "根本", meaningsFr: ["Fondement"], readings: ["こんぽん"], mnemonicFr: "Le FONDEMENT.", levelId: 12 },
    { word: "根気", meaningsFr: ["Persévérance"], readings: ["こんき"], mnemonicFr: "La PERSÉVÉRANCE.", levelId: 12 },
    { word: "屋根", meaningsFr: ["Toit"], readings: ["やね"], mnemonicFr: "Le TOIT.", levelId: 12 },
    // 流 vocabulary
    { word: "流行", meaningsFr: ["Mode", "Tendance"], readings: ["りゅうこう"], mnemonicFr: "La MODE, la tendance.", levelId: 12 },
    { word: "流れる", meaningsFr: ["Couler"], readings: ["ながれる"], mnemonicFr: "COULER comme l'eau.", levelId: 12 },
    { word: "交流", meaningsFr: ["Échange"], readings: ["こうりゅう"], mnemonicFr: "L'ÉCHANGE culturel.", levelId: 12 },
    { word: "一流", meaningsFr: ["De première classe"], readings: ["いちりゅう"], mnemonicFr: "DE PREMIÈRE CLASSE.", levelId: 12 },
    // 消 vocabulary
    { word: "消える", meaningsFr: ["Disparaître"], readings: ["きえる"], mnemonicFr: "DISPARAÎTRE.", levelId: 12 },
    { word: "消す", meaningsFr: ["Éteindre"], readings: ["けす"], mnemonicFr: "ÉTEINDRE la lumière.", levelId: 12 },
    { word: "消費", meaningsFr: ["Consommation"], readings: ["しょうひ"], mnemonicFr: "La CONSOMMATION.", levelId: 12 },
    { word: "消化", meaningsFr: ["Digestion"], readings: ["しょうか"], mnemonicFr: "La DIGESTION.", levelId: 12 },
    { word: "消防", meaningsFr: ["Pompiers"], readings: ["しょうぼう"], mnemonicFr: "Les POMPIERS.", levelId: 12 },
    // 倍 vocabulary
    { word: "倍増", meaningsFr: ["Doublement"], readings: ["ばいぞう"], mnemonicFr: "Le DOUBLEMENT.", levelId: 12 },
    { word: "二倍", meaningsFr: ["Deux fois"], readings: ["にばい"], mnemonicFr: "DEUX FOIS plus.", levelId: 12 },
    { word: "何倍", meaningsFr: ["Combien de fois"], readings: ["なんばい"], mnemonicFr: "COMBIEN DE FOIS.", levelId: 12 },
    // 員 vocabulary
    { word: "会員", meaningsFr: ["Membre"], readings: ["かいいん"], mnemonicFr: "Un MEMBRE.", levelId: 12 },
    { word: "社員", meaningsFr: ["Employé"], readings: ["しゃいん"], mnemonicFr: "Un EMPLOYÉ.", levelId: 12 },
    { word: "店員", meaningsFr: ["Vendeur"], readings: ["てんいん"], mnemonicFr: "Un VENDEUR.", levelId: 12 },
    { word: "駅員", meaningsFr: ["Agent de gare"], readings: ["えきいん"], mnemonicFr: "Un AGENT DE GARE.", levelId: 12 },
    { word: "全員", meaningsFr: ["Tout le monde"], readings: ["ぜんいん"], mnemonicFr: "TOUT LE MONDE.", levelId: 12 },
    // 島 vocabulary
    { word: "島国", meaningsFr: ["Pays insulaire"], readings: ["しまぐに"], mnemonicFr: "Un PAYS INSULAIRE.", levelId: 12 },
    { word: "半島", meaningsFr: ["Péninsule"], readings: ["はんとう"], mnemonicFr: "Une PÉNINSULE.", levelId: 12 },
    { word: "離島", meaningsFr: ["Île isolée"], readings: ["りとう"], mnemonicFr: "Une ÎLE ISOLÉE.", levelId: 12 },
    // 祭 vocabulary
    { word: "祭り", meaningsFr: ["Festival"], readings: ["まつり"], mnemonicFr: "Un FESTIVAL.", levelId: 12 },
    { word: "文化祭", meaningsFr: ["Festival culturel"], readings: ["ぶんかさい"], mnemonicFr: "Un FESTIVAL CULTUREL.", levelId: 12 },
    // 章 vocabulary
    { word: "文章", meaningsFr: ["Texte", "Phrase"], readings: ["ぶんしょう"], mnemonicFr: "Un TEXTE.", levelId: 12 },
    { word: "勲章", meaningsFr: ["Médaille"], readings: ["くんしょう"], mnemonicFr: "Une MÉDAILLE.", levelId: 12 },
    // 第 vocabulary
    { word: "第一", meaningsFr: ["Premier"], readings: ["だいいち"], mnemonicFr: "PREMIER.", levelId: 12 },
    { word: "次第", meaningsFr: ["Selon", "Dépendre de"], readings: ["しだい"], mnemonicFr: "SELON, dépendre de.", levelId: 12 },
    // 都 vocabulary
    { word: "都会", meaningsFr: ["Grande ville"], readings: ["とかい"], mnemonicFr: "La GRANDE VILLE.", levelId: 12 },
    { word: "都市", meaningsFr: ["Ville", "Cité"], readings: ["とし"], mnemonicFr: "La VILLE.", levelId: 12 },
    { word: "首都", meaningsFr: ["Capitale"], readings: ["しゅと"], mnemonicFr: "La CAPITALE.", levelId: 12 },
    { word: "都合", meaningsFr: ["Convenance"], readings: ["つごう"], mnemonicFr: "La CONVENANCE.", levelId: 12 },
    // 動 vocabulary
    { word: "動物", meaningsFr: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "Un ANIMAL.", levelId: 12 },
    { word: "運動", meaningsFr: ["Exercice", "Sport"], readings: ["うんどう"], mnemonicFr: "L'EXERCICE physique.", levelId: 12 },
    { word: "活動", meaningsFr: ["Activité"], readings: ["かつどう"], mnemonicFr: "Une ACTIVITÉ.", levelId: 12 },
    { word: "動く", meaningsFr: ["Bouger"], readings: ["うごく"], mnemonicFr: "BOUGER.", levelId: 12 },
    { word: "動かす", meaningsFr: ["Déplacer"], readings: ["うごかす"], mnemonicFr: "DÉPLACER quelque chose.", levelId: 12 },
    { word: "感動", meaningsFr: ["Émotion"], readings: ["かんどう"], mnemonicFr: "L'ÉMOTION.", levelId: 12 },
    // 商 vocabulary
    { word: "商品", meaningsFr: ["Produit"], readings: ["しょうひん"], mnemonicFr: "Un PRODUIT.", levelId: 12 },
    { word: "商売", meaningsFr: ["Commerce"], readings: ["しょうばい"], mnemonicFr: "Le COMMERCE.", levelId: 12 },
    { word: "商店", meaningsFr: ["Magasin"], readings: ["しょうてん"], mnemonicFr: "Un MAGASIN.", levelId: 12 },
    // 悪 vocabulary
    { word: "悪い", meaningsFr: ["Mauvais"], readings: ["わるい"], mnemonicFr: "MAUVAIS.", levelId: 12 },
    { word: "悪化", meaningsFr: ["Détérioration"], readings: ["あっか"], mnemonicFr: "La DÉTÉRIORATION.", levelId: 12 },
    { word: "悪口", meaningsFr: ["Médisance"], readings: ["わるくち"], mnemonicFr: "La MÉDISANCE.", levelId: 12 },
    // 族 vocabulary
    { word: "家族", meaningsFr: ["Famille"], readings: ["かぞく"], mnemonicFr: "La FAMILLE.", levelId: 12 },
    { word: "民族", meaningsFr: ["Ethnie"], readings: ["みんぞく"], mnemonicFr: "L'ETHNIE.", levelId: 12 },
    { word: "親族", meaningsFr: ["Parenté"], readings: ["しんぞく"], mnemonicFr: "La PARENTÉ.", levelId: 12 },
    // 深 vocabulary
    { word: "深い", meaningsFr: ["Profond"], readings: ["ふかい"], mnemonicFr: "PROFOND.", levelId: 12 },
    { word: "深夜", meaningsFr: ["Tard dans la nuit"], readings: ["しんや"], mnemonicFr: "TARD DANS LA NUIT.", levelId: 12 },
    { word: "深刻", meaningsFr: ["Grave", "Sérieux"], readings: ["しんこく"], mnemonicFr: "GRAVE, sérieux.", levelId: 12 },
    // 球 vocabulary
    { word: "野球", meaningsFr: ["Baseball"], readings: ["やきゅう"], mnemonicFr: "Le BASEBALL.", levelId: 12 },
    { word: "地球", meaningsFr: ["Terre"], readings: ["ちきゅう"], mnemonicFr: "La TERRE (planète).", levelId: 12 },
    { word: "電球", meaningsFr: ["Ampoule"], readings: ["でんきゅう"], mnemonicFr: "Une AMPOULE.", levelId: 12 },
    // 陽 vocabulary
    { word: "太陽", meaningsFr: ["Soleil"], readings: ["たいよう"], mnemonicFr: "Le SOLEIL.", levelId: 12 },
    { word: "陽気", meaningsFr: ["Joyeux"], readings: ["ようき"], mnemonicFr: "JOYEUX.", levelId: 12 },
    // 階 vocabulary
    { word: "階段", meaningsFr: ["Escalier"], readings: ["かいだん"], mnemonicFr: "L'ESCALIER.", levelId: 12 },
    { word: "二階", meaningsFr: ["Deuxième étage"], readings: ["にかい"], mnemonicFr: "Le DEUXIÈME ÉTAGE.", levelId: 12 },
    { word: "地階", meaningsFr: ["Sous-sol"], readings: ["ちかい"], mnemonicFr: "Le SOUS-SOL.", levelId: 12 },
    // 寒 vocabulary
    { word: "寒い", meaningsFr: ["Froid"], readings: ["さむい"], mnemonicFr: "Il fait FROID.", levelId: 12 },
    { word: "寒気", meaningsFr: ["Frissons"], readings: ["さむけ"], mnemonicFr: "Les FRISSONS.", levelId: 12 },
    // 暑 vocabulary
    { word: "暑い", meaningsFr: ["Chaud"], readings: ["あつい"], mnemonicFr: "Il fait CHAUD.", levelId: 12 },
    { word: "蒸し暑い", meaningsFr: ["Chaud et humide"], readings: ["むしあつい"], mnemonicFr: "CHAUD ET HUMIDE.", levelId: 12 },
    // 期 vocabulary
    { word: "期間", meaningsFr: ["Période"], readings: ["きかん"], mnemonicFr: "La PÉRIODE.", levelId: 12 },
    { word: "時期", meaningsFr: ["Moment", "Saison"], readings: ["じき"], mnemonicFr: "Le MOMENT.", levelId: 12 },
    { word: "学期", meaningsFr: ["Semestre"], readings: ["がっき"], mnemonicFr: "Le SEMESTRE.", levelId: 12 },
    // 植 vocabulary
    { word: "植物", meaningsFr: ["Plante"], readings: ["しょくぶつ"], mnemonicFr: "Une PLANTE.", levelId: 12 },
    { word: "植える", meaningsFr: ["Planter"], readings: ["うえる"], mnemonicFr: "PLANTER.", levelId: 12 },
    // 温 vocabulary
    { word: "温かい", meaningsFr: ["Tiède", "Chaleureux"], readings: ["あたたかい"], mnemonicFr: "TIÈDE, chaleureux.", levelId: 12 },
    { word: "温度", meaningsFr: ["Température"], readings: ["おんど"], mnemonicFr: "La TEMPÉRATURE.", levelId: 12 },
    { word: "気温", meaningsFr: ["Température atmosphérique"], readings: ["きおん"], mnemonicFr: "La TEMPÉRATURE de l'air.", levelId: 12 },
    // 港 vocabulary
    { word: "空港", meaningsFr: ["Aéroport"], readings: ["くうこう"], mnemonicFr: "L'AÉROPORT.", levelId: 12 },
    { word: "港町", meaningsFr: ["Ville portuaire"], readings: ["みなとまち"], mnemonicFr: "Une VILLE PORTUAIRE.", levelId: 12 },
    // 湯 vocabulary
    { word: "お湯", meaningsFr: ["Eau chaude"], readings: ["おゆ"], mnemonicFr: "L'EAU CHAUDE.", levelId: 12 },
    { word: "銭湯", meaningsFr: ["Bain public"], readings: ["せんとう"], mnemonicFr: "Le BAIN PUBLIC.", levelId: 12 },
    // 登 vocabulary
    { word: "登る", meaningsFr: ["Grimper"], readings: ["のぼる"], mnemonicFr: "GRIMPER.", levelId: 12 },
    { word: "登山", meaningsFr: ["Alpinisme"], readings: ["とざん"], mnemonicFr: "L'ALPINISME.", levelId: 12 },
    { word: "登録", meaningsFr: ["Inscription"], readings: ["とうろく"], mnemonicFr: "L'INSCRIPTION.", levelId: 12 },
    // 着 vocabulary
    { word: "着く", meaningsFr: ["Arriver"], readings: ["つく"], mnemonicFr: "ARRIVER.", levelId: 12 },
    { word: "着る", meaningsFr: ["Porter (vêtement)"], readings: ["きる"], mnemonicFr: "PORTER un vêtement.", levelId: 12 },
    { word: "到着", meaningsFr: ["Arrivée"], readings: ["とうちゃく"], mnemonicFr: "L'ARRIVÉE.", levelId: 12 },
    // 短 vocabulary
    { word: "短い", meaningsFr: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT.", levelId: 12 },
    { word: "短期", meaningsFr: ["Court terme"], readings: ["たんき"], mnemonicFr: "COURT TERME.", levelId: 12 },
    // 野 vocabulary
    { word: "野菜", meaningsFr: ["Légumes"], readings: ["やさい"], mnemonicFr: "Les LÉGUMES.", levelId: 12 },
    { word: "野原", meaningsFr: ["Prairie"], readings: ["のはら"], mnemonicFr: "La PRAIRIE.", levelId: 12 },
    { word: "分野", meaningsFr: ["Domaine"], readings: ["ぶんや"], mnemonicFr: "Le DOMAINE.", levelId: 12 },
  ];

  for (const vocab of level12Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 12 supplementary vocab complete! Added", level12Vocab.length, "words");

  // ============================================
  // LEVEL 13 - Supplementary Vocabulary
  // Kanji: 問宿想感整暗様橋福緑練詩銀題館駅億器士料標殺然熱課賞輪選鏡願養像情謝映疑皆
  // ============================================

  const level13Vocab = [
    // 問 vocabulary
    { word: "問題", meaningsFr: ["Problème", "Question"], readings: ["もんだい"], mnemonicFr: "Un PROBLÈME.", levelId: 13 },
    { word: "質問", meaningsFr: ["Question"], readings: ["しつもん"], mnemonicFr: "Une QUESTION.", levelId: 13 },
    { word: "問い合わせ", meaningsFr: ["Demande de renseignements"], readings: ["といあわせ"], mnemonicFr: "Une DEMANDE DE RENSEIGNEMENTS.", levelId: 13 },
    { word: "訪問", meaningsFr: ["Visite"], readings: ["ほうもん"], mnemonicFr: "Une VISITE.", levelId: 13 },
    // 宿 vocabulary
    { word: "宿題", meaningsFr: ["Devoirs"], readings: ["しゅくだい"], mnemonicFr: "Les DEVOIRS scolaires.", levelId: 13 },
    { word: "宿泊", meaningsFr: ["Hébergement"], readings: ["しゅくはく"], mnemonicFr: "L'HÉBERGEMENT.", levelId: 13 },
    { word: "民宿", meaningsFr: ["Pension de famille"], readings: ["みんしゅく"], mnemonicFr: "Une PENSION DE FAMILLE.", levelId: 13 },
    // 想 vocabulary
    { word: "想像", meaningsFr: ["Imagination"], readings: ["そうぞう"], mnemonicFr: "L'IMAGINATION.", levelId: 13 },
    { word: "理想", meaningsFr: ["Idéal"], readings: ["りそう"], mnemonicFr: "L'IDÉAL.", levelId: 13 },
    { word: "感想", meaningsFr: ["Impression"], readings: ["かんそう"], mnemonicFr: "L'IMPRESSION.", levelId: 13 },
    { word: "予想", meaningsFr: ["Prévision"], readings: ["よそう"], mnemonicFr: "La PRÉVISION.", levelId: 13 },
    // 感 vocabulary
    { word: "感じる", meaningsFr: ["Ressentir"], readings: ["かんじる"], mnemonicFr: "RESSENTIR.", levelId: 13 },
    { word: "感謝", meaningsFr: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "La GRATITUDE.", levelId: 13 },
    { word: "感情", meaningsFr: ["Sentiment"], readings: ["かんじょう"], mnemonicFr: "Le SENTIMENT.", levelId: 13 },
    { word: "感覚", meaningsFr: ["Sensation"], readings: ["かんかく"], mnemonicFr: "La SENSATION.", levelId: 13 },
    // 整 vocabulary
    { word: "整理", meaningsFr: ["Organisation"], readings: ["せいり"], mnemonicFr: "L'ORGANISATION.", levelId: 13 },
    { word: "調整", meaningsFr: ["Ajustement"], readings: ["ちょうせい"], mnemonicFr: "L'AJUSTEMENT.", levelId: 13 },
    { word: "整える", meaningsFr: ["Arranger"], readings: ["ととのえる"], mnemonicFr: "ARRANGER.", levelId: 13 },
    // 暗 vocabulary
    { word: "暗い", meaningsFr: ["Sombre"], readings: ["くらい"], mnemonicFr: "SOMBRE.", levelId: 13 },
    { word: "暗記", meaningsFr: ["Mémorisation"], readings: ["あんき"], mnemonicFr: "La MÉMORISATION.", levelId: 13 },
    { word: "暗号", meaningsFr: ["Code secret"], readings: ["あんごう"], mnemonicFr: "Un CODE SECRET.", levelId: 13 },
    // 様 vocabulary
    { word: "様子", meaningsFr: ["État", "Apparence"], readings: ["ようす"], mnemonicFr: "L'ÉTAT, l'apparence.", levelId: 13 },
    { word: "皆様", meaningsFr: ["Tout le monde (poli)"], readings: ["みなさま"], mnemonicFr: "TOUT LE MONDE (poli).", levelId: 13 },
    { word: "同様", meaningsFr: ["De même"], readings: ["どうよう"], mnemonicFr: "DE MÊME.", levelId: 13 },
    // 橋 vocabulary
    { word: "歩道橋", meaningsFr: ["Passerelle piétonne"], readings: ["ほどうきょう"], mnemonicFr: "Une PASSERELLE PIÉTONNE.", levelId: 13 },
    { word: "鉄橋", meaningsFr: ["Pont de fer"], readings: ["てっきょう"], mnemonicFr: "Un PONT DE FER.", levelId: 13 },
    // 福 vocabulary
    { word: "幸福", meaningsFr: ["Bonheur"], readings: ["こうふく"], mnemonicFr: "Le BONHEUR.", levelId: 13 },
    { word: "福祉", meaningsFr: ["Aide sociale"], readings: ["ふくし"], mnemonicFr: "L'AIDE SOCIALE.", levelId: 13 },
    // 緑 vocabulary
    { word: "緑色", meaningsFr: ["Couleur verte"], readings: ["みどりいろ"], mnemonicFr: "La COULEUR VERTE.", levelId: 13 },
    { word: "新緑", meaningsFr: ["Verdure printanière"], readings: ["しんりょく"], mnemonicFr: "La VERDURE PRINTANIÈRE.", levelId: 13 },
    // 練 vocabulary
    { word: "練習", meaningsFr: ["Entraînement"], readings: ["れんしゅう"], mnemonicFr: "L'ENTRAÎNEMENT.", levelId: 13 },
    { word: "訓練", meaningsFr: ["Formation"], readings: ["くんれん"], mnemonicFr: "La FORMATION.", levelId: 13 },
    { word: "練る", meaningsFr: ["Pétrir", "Élaborer"], readings: ["ねる"], mnemonicFr: "PÉTRIR, élaborer.", levelId: 13 },
    // 詩 vocabulary
    { word: "詩人", meaningsFr: ["Poète"], readings: ["しじん"], mnemonicFr: "Un POÈTE.", levelId: 13 },
    // 銀 vocabulary
    { word: "銀行", meaningsFr: ["Banque"], readings: ["ぎんこう"], mnemonicFr: "La BANQUE.", levelId: 13 },
    { word: "銀色", meaningsFr: ["Couleur argentée"], readings: ["ぎんいろ"], mnemonicFr: "La COULEUR ARGENTÉE.", levelId: 13 },
    // 題 vocabulary
    { word: "話題", meaningsFr: ["Sujet de conversation"], readings: ["わだい"], mnemonicFr: "Un SUJET DE CONVERSATION.", levelId: 13 },
    { word: "課題", meaningsFr: ["Devoir", "Tâche"], readings: ["かだい"], mnemonicFr: "Un DEVOIR, une tâche.", levelId: 13 },
    // 館 vocabulary
    { word: "図書館", meaningsFr: ["Bibliothèque"], readings: ["としょかん"], mnemonicFr: "La BIBLIOTHÈQUE.", levelId: 13 },
    { word: "映画館", meaningsFr: ["Cinéma"], readings: ["えいがかん"], mnemonicFr: "Le CINÉMA.", levelId: 13 },
    { word: "美術館", meaningsFr: ["Musée d'art"], readings: ["びじゅつかん"], mnemonicFr: "Le MUSÉE D'ART.", levelId: 13 },
    { word: "博物館", meaningsFr: ["Musée"], readings: ["はくぶつかん"], mnemonicFr: "Le MUSÉE.", levelId: 13 },
    // 駅 vocabulary
    { word: "駅前", meaningsFr: ["Devant la gare"], readings: ["えきまえ"], mnemonicFr: "DEVANT LA GARE.", levelId: 13 },
    { word: "駅弁", meaningsFr: ["Bento de gare"], readings: ["えきべん"], mnemonicFr: "Un BENTO DE GARE.", levelId: 13 },
    // 億 vocabulary
    { word: "一億", meaningsFr: ["Cent millions"], readings: ["いちおく"], mnemonicFr: "CENT MILLIONS.", levelId: 13 },
    // 器 vocabulary
    { word: "器用", meaningsFr: ["Habile"], readings: ["きよう"], mnemonicFr: "HABILE de ses mains.", levelId: 13 },
    { word: "楽器", meaningsFr: ["Instrument de musique"], readings: ["がっき"], mnemonicFr: "Un INSTRUMENT DE MUSIQUE.", levelId: 13 },
    { word: "食器", meaningsFr: ["Vaisselle"], readings: ["しょっき"], mnemonicFr: "La VAISSELLE.", levelId: 13 },
    // 士 vocabulary
    { word: "弁護士", meaningsFr: ["Avocat"], readings: ["べんごし"], mnemonicFr: "Un AVOCAT.", levelId: 13 },
    { word: "博士", meaningsFr: ["Docteur"], readings: ["はかせ"], mnemonicFr: "Un DOCTEUR.", levelId: 13 },
    // 料 vocabulary
    { word: "料理", meaningsFr: ["Cuisine"], readings: ["りょうり"], mnemonicFr: "La CUISINE.", levelId: 13 },
    { word: "材料", meaningsFr: ["Matériau"], readings: ["ざいりょう"], mnemonicFr: "Le MATÉRIAU.", levelId: 13 },
    { word: "無料", meaningsFr: ["Gratuit"], readings: ["むりょう"], mnemonicFr: "GRATUIT.", levelId: 13 },
    { word: "有料", meaningsFr: ["Payant"], readings: ["ゆうりょう"], mnemonicFr: "PAYANT.", levelId: 13 },
    // 熱 vocabulary
    { word: "熱い", meaningsFr: ["Chaud (objet)"], readings: ["あつい"], mnemonicFr: "CHAUD (objet).", levelId: 13 },
    { word: "熱心", meaningsFr: ["Enthousiaste"], readings: ["ねっしん"], mnemonicFr: "ENTHOUSIASTE.", levelId: 13 },
    { word: "発熱", meaningsFr: ["Fièvre"], readings: ["はつねつ"], mnemonicFr: "La FIÈVRE.", levelId: 13 },
    // 課 vocabulary
    { word: "課長", meaningsFr: ["Chef de section"], readings: ["かちょう"], mnemonicFr: "Le CHEF DE SECTION.", levelId: 13 },
    // 賞 vocabulary
    { word: "賞品", meaningsFr: ["Prix"], readings: ["しょうひん"], mnemonicFr: "Un PRIX.", levelId: 13 },
    { word: "賞金", meaningsFr: ["Prime"], readings: ["しょうきん"], mnemonicFr: "Une PRIME.", levelId: 13 },
    // 輪 vocabulary
    { word: "車輪", meaningsFr: ["Roue"], readings: ["しゃりん"], mnemonicFr: "La ROUE.", levelId: 13 },
    { word: "指輪", meaningsFr: ["Bague"], readings: ["ゆびわ"], mnemonicFr: "Une BAGUE.", levelId: 13 },
    // 選 vocabulary
    { word: "選ぶ", meaningsFr: ["Choisir"], readings: ["えらぶ"], mnemonicFr: "CHOISIR.", levelId: 13 },
    { word: "選手", meaningsFr: ["Joueur", "Athlète"], readings: ["せんしゅ"], mnemonicFr: "Un JOUEUR.", levelId: 13 },
    { word: "選挙", meaningsFr: ["Élection"], readings: ["せんきょ"], mnemonicFr: "Une ÉLECTION.", levelId: 13 },
    // 鏡 vocabulary
    { word: "眼鏡", meaningsFr: ["Lunettes"], readings: ["めがね"], mnemonicFr: "Les LUNETTES.", levelId: 13 },
    // 願 vocabulary
    { word: "願う", meaningsFr: ["Souhaiter"], readings: ["ねがう"], mnemonicFr: "SOUHAITER.", levelId: 13 },
    { word: "願い", meaningsFr: ["Souhait"], readings: ["ねがい"], mnemonicFr: "Un SOUHAIT.", levelId: 13 },
    { word: "出願", meaningsFr: ["Candidature"], readings: ["しゅつがん"], mnemonicFr: "Une CANDIDATURE.", levelId: 13 },
    // 養 vocabulary
    { word: "栄養", meaningsFr: ["Nutrition"], readings: ["えいよう"], mnemonicFr: "La NUTRITION.", levelId: 13 },
    { word: "養う", meaningsFr: ["Nourrir"], readings: ["やしなう"], mnemonicFr: "NOURRIR.", levelId: 13 },
    // 像 vocabulary
    { word: "想像力", meaningsFr: ["Imagination"], readings: ["そうぞうりょく"], mnemonicFr: "L'IMAGINATION.", levelId: 13 },
    { word: "映像", meaningsFr: ["Image", "Vidéo"], readings: ["えいぞう"], mnemonicFr: "L'IMAGE, la vidéo.", levelId: 13 },
    // 情 vocabulary
    { word: "情報", meaningsFr: ["Information"], readings: ["じょうほう"], mnemonicFr: "L'INFORMATION.", levelId: 13 },
    { word: "事情", meaningsFr: ["Circonstances"], readings: ["じじょう"], mnemonicFr: "Les CIRCONSTANCES.", levelId: 13 },
    { word: "表情", meaningsFr: ["Expression"], readings: ["ひょうじょう"], mnemonicFr: "L'EXPRESSION du visage.", levelId: 13 },
    // 謝 vocabulary
    { word: "感謝", meaningsFr: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "La GRATITUDE.", levelId: 13 },
    { word: "謝る", meaningsFr: ["S'excuser"], readings: ["あやまる"], mnemonicFr: "S'EXCUSER.", levelId: 13 },
    // 映 vocabulary
    { word: "映る", meaningsFr: ["Se refléter"], readings: ["うつる"], mnemonicFr: "SE REFLÉTER.", levelId: 13 },
    { word: "映画", meaningsFr: ["Film"], readings: ["えいが"], mnemonicFr: "Un FILM.", levelId: 13 },
    { word: "反映", meaningsFr: ["Reflet"], readings: ["はんえい"], mnemonicFr: "Le REFLET.", levelId: 13 },
    // 疑 vocabulary
    { word: "疑う", meaningsFr: ["Douter"], readings: ["うたがう"], mnemonicFr: "DOUTER.", levelId: 13 },
    { word: "疑問", meaningsFr: ["Doute", "Question"], readings: ["ぎもん"], mnemonicFr: "Un DOUTE.", levelId: 13 },
    // 皆 vocabulary
    { word: "皆さん", meaningsFr: ["Tout le monde"], readings: ["みなさん"], mnemonicFr: "TOUT LE MONDE.", levelId: 13 },
  ];

  for (const vocab of level13Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 13 supplementary vocab complete! Added", level13Vocab.length, "words");

  // ============================================
  // LEVEL 14 - Supplementary Vocabulary
  // Kanji: 例卒協参周囲固季完希念折望材束松残的約芸基性格能骨妥雰頑
  // ============================================

  const level14Vocab = [
    // 例 vocabulary
    { word: "例えば", meaningsFr: ["Par exemple"], readings: ["たとえば"], mnemonicFr: "PAR EXEMPLE.", levelId: 14 },
    { word: "例外", meaningsFr: ["Exception"], readings: ["れいがい"], mnemonicFr: "Une EXCEPTION.", levelId: 14 },
    { word: "実例", meaningsFr: ["Exemple concret"], readings: ["じつれい"], mnemonicFr: "Un EXEMPLE CONCRET.", levelId: 14 },
    // 卒 vocabulary
    { word: "卒業", meaningsFr: ["Diplôme"], readings: ["そつぎょう"], mnemonicFr: "Le DIPLÔME.", levelId: 14 },
    { word: "卒業式", meaningsFr: ["Cérémonie de remise des diplômes"], readings: ["そつぎょうしき"], mnemonicFr: "La CÉRÉMONIE DE REMISE DES DIPLÔMES.", levelId: 14 },
    // 協 vocabulary
    { word: "協力", meaningsFr: ["Coopération"], readings: ["きょうりょく"], mnemonicFr: "La COOPÉRATION.", levelId: 14 },
    { word: "協会", meaningsFr: ["Association"], readings: ["きょうかい"], mnemonicFr: "Une ASSOCIATION.", levelId: 14 },
    // 参 vocabulary
    { word: "参加", meaningsFr: ["Participation"], readings: ["さんか"], mnemonicFr: "La PARTICIPATION.", levelId: 14 },
    { word: "参考", meaningsFr: ["Référence"], readings: ["さんこう"], mnemonicFr: "La RÉFÉRENCE.", levelId: 14 },
    { word: "参る", meaningsFr: ["Aller (humble)"], readings: ["まいる"], mnemonicFr: "ALLER (humble).", levelId: 14 },
    // 周 vocabulary
    { word: "周り", meaningsFr: ["Alentours"], readings: ["まわり"], mnemonicFr: "Les ALENTOURS.", levelId: 14 },
    { word: "周辺", meaningsFr: ["Environs"], readings: ["しゅうへん"], mnemonicFr: "Les ENVIRONS.", levelId: 14 },
    { word: "一周", meaningsFr: ["Un tour"], readings: ["いっしゅう"], mnemonicFr: "UN TOUR.", levelId: 14 },
    // 囲 vocabulary
    { word: "囲む", meaningsFr: ["Entourer"], readings: ["かこむ"], mnemonicFr: "ENTOURER.", levelId: 14 },
    { word: "範囲", meaningsFr: ["Étendue"], readings: ["はんい"], mnemonicFr: "L'ÉTENDUE.", levelId: 14 },
    // 固 vocabulary
    { word: "固い", meaningsFr: ["Dur"], readings: ["かたい"], mnemonicFr: "DUR.", levelId: 14 },
    { word: "固定", meaningsFr: ["Fixe"], readings: ["こてい"], mnemonicFr: "FIXE.", levelId: 14 },
    { word: "頑固", meaningsFr: ["Têtu"], readings: ["がんこ"], mnemonicFr: "TÊTU.", levelId: 14 },
    // 季 vocabulary
    { word: "季節", meaningsFr: ["Saison"], readings: ["きせつ"], mnemonicFr: "La SAISON.", levelId: 14 },
    { word: "四季", meaningsFr: ["Quatre saisons"], readings: ["しき"], mnemonicFr: "Les QUATRE SAISONS.", levelId: 14 },
    // 完 vocabulary
    { word: "完全", meaningsFr: ["Parfait", "Complet"], readings: ["かんぜん"], mnemonicFr: "PARFAIT.", levelId: 14 },
    { word: "完了", meaningsFr: ["Achèvement"], readings: ["かんりょう"], mnemonicFr: "L'ACHÈVEMENT.", levelId: 14 },
    { word: "完璧", meaningsFr: ["Parfait"], readings: ["かんぺき"], mnemonicFr: "PARFAIT.", levelId: 14 },
    // 希 vocabulary
    { word: "希望", meaningsFr: ["Espoir"], readings: ["きぼう"], mnemonicFr: "L'ESPOIR.", levelId: 14 },
    // 念 vocabulary
    { word: "記念", meaningsFr: ["Commémoration"], readings: ["きねん"], mnemonicFr: "La COMMÉMORATION.", levelId: 14 },
    { word: "残念", meaningsFr: ["Regrettable"], readings: ["ざんねん"], mnemonicFr: "REGRETTABLE.", levelId: 14 },
    { word: "念のため", meaningsFr: ["Par précaution"], readings: ["ねんのため"], mnemonicFr: "PAR PRÉCAUTION.", levelId: 14 },
    // 折 vocabulary
    { word: "折る", meaningsFr: ["Plier"], readings: ["おる"], mnemonicFr: "PLIER.", levelId: 14 },
    { word: "折り紙", meaningsFr: ["Origami"], readings: ["おりがみ"], mnemonicFr: "L'ORIGAMI.", levelId: 14 },
    // 望 vocabulary
    { word: "希望", meaningsFr: ["Espoir"], readings: ["きぼう"], mnemonicFr: "L'ESPOIR.", levelId: 14 },
    { word: "望む", meaningsFr: ["Souhaiter"], readings: ["のぞむ"], mnemonicFr: "SOUHAITER.", levelId: 14 },
    { word: "絶望", meaningsFr: ["Désespoir"], readings: ["ぜつぼう"], mnemonicFr: "Le DÉSESPOIR.", levelId: 14 },
    // 材 vocabulary
    { word: "材料", meaningsFr: ["Ingrédient", "Matériau"], readings: ["ざいりょう"], mnemonicFr: "L'INGRÉDIENT.", levelId: 14 },
    { word: "木材", meaningsFr: ["Bois de construction"], readings: ["もくざい"], mnemonicFr: "Le BOIS DE CONSTRUCTION.", levelId: 14 },
    { word: "人材", meaningsFr: ["Personnel qualifié"], readings: ["じんざい"], mnemonicFr: "Le PERSONNEL QUALIFIÉ.", levelId: 14 },
    // 束 vocabulary
    { word: "約束", meaningsFr: ["Promesse"], readings: ["やくそく"], mnemonicFr: "Une PROMESSE.", levelId: 14 },
    { word: "束縛", meaningsFr: ["Contrainte"], readings: ["そくばく"], mnemonicFr: "La CONTRAINTE.", levelId: 14 },
    // 松 vocabulary
    { word: "松", meaningsFr: ["Pin"], readings: ["まつ"], mnemonicFr: "Un PIN.", levelId: 14 },
    // 残 vocabulary
    { word: "残る", meaningsFr: ["Rester"], readings: ["のこる"], mnemonicFr: "RESTER.", levelId: 14 },
    { word: "残す", meaningsFr: ["Laisser"], readings: ["のこす"], mnemonicFr: "LAISSER.", levelId: 14 },
    { word: "残業", meaningsFr: ["Heures supplémentaires"], readings: ["ざんぎょう"], mnemonicFr: "Les HEURES SUPPLÉMENTAIRES.", levelId: 14 },
    { word: "残り", meaningsFr: ["Reste"], readings: ["のこり"], mnemonicFr: "Le RESTE.", levelId: 14 },
    // 的 vocabulary
    { word: "目的", meaningsFr: ["But"], readings: ["もくてき"], mnemonicFr: "Le BUT.", levelId: 14 },
    { word: "具体的", meaningsFr: ["Concret"], readings: ["ぐたいてき"], mnemonicFr: "CONCRET.", levelId: 14 },
    { word: "一般的", meaningsFr: ["Général"], readings: ["いっぱんてき"], mnemonicFr: "GÉNÉRAL.", levelId: 14 },
    { word: "積極的", meaningsFr: ["Positif", "Actif"], readings: ["せっきょくてき"], mnemonicFr: "POSITIF.", levelId: 14 },
    // 約 vocabulary
    { word: "約", meaningsFr: ["Environ"], readings: ["やく"], mnemonicFr: "ENVIRON.", levelId: 14 },
    { word: "契約", meaningsFr: ["Contrat"], readings: ["けいやく"], mnemonicFr: "Un CONTRAT.", levelId: 14 },
    { word: "予約", meaningsFr: ["Réservation"], readings: ["よやく"], mnemonicFr: "Une RÉSERVATION.", levelId: 14 },
    // 芸 vocabulary
    { word: "芸術", meaningsFr: ["Art"], readings: ["げいじゅつ"], mnemonicFr: "L'ART.", levelId: 14 },
    { word: "芸能", meaningsFr: ["Divertissement"], readings: ["げいのう"], mnemonicFr: "Le DIVERTISSEMENT.", levelId: 14 },
    // 基 vocabulary
    { word: "基本", meaningsFr: ["Base"], readings: ["きほん"], mnemonicFr: "La BASE.", levelId: 14 },
    { word: "基礎", meaningsFr: ["Fondation"], readings: ["きそ"], mnemonicFr: "La FONDATION.", levelId: 14 },
    { word: "基準", meaningsFr: ["Norme"], readings: ["きじゅん"], mnemonicFr: "La NORME.", levelId: 14 },
    // 性 vocabulary
    { word: "性格", meaningsFr: ["Caractère"], readings: ["せいかく"], mnemonicFr: "Le CARACTÈRE.", levelId: 14 },
    { word: "女性", meaningsFr: ["Femme"], readings: ["じょせい"], mnemonicFr: "Une FEMME.", levelId: 14 },
    { word: "男性", meaningsFr: ["Homme"], readings: ["だんせい"], mnemonicFr: "Un HOMME.", levelId: 14 },
    { word: "可能性", meaningsFr: ["Possibilité"], readings: ["かのうせい"], mnemonicFr: "La POSSIBILITÉ.", levelId: 14 },
    { word: "個性", meaningsFr: ["Personnalité"], readings: ["こせい"], mnemonicFr: "La PERSONNALITÉ.", levelId: 14 },
    // 格 vocabulary
    { word: "価格", meaningsFr: ["Prix"], readings: ["かかく"], mnemonicFr: "Le PRIX.", levelId: 14 },
    { word: "資格", meaningsFr: ["Qualification"], readings: ["しかく"], mnemonicFr: "La QUALIFICATION.", levelId: 14 },
    { word: "合格", meaningsFr: ["Réussite"], readings: ["ごうかく"], mnemonicFr: "La RÉUSSITE.", levelId: 14 },
    // 能 vocabulary
    { word: "能力", meaningsFr: ["Capacité"], readings: ["のうりょく"], mnemonicFr: "La CAPACITÉ.", levelId: 14 },
    { word: "可能", meaningsFr: ["Possible"], readings: ["かのう"], mnemonicFr: "POSSIBLE.", levelId: 14 },
    { word: "不可能", meaningsFr: ["Impossible"], readings: ["ふかのう"], mnemonicFr: "IMPOSSIBLE.", levelId: 14 },
    { word: "機能", meaningsFr: ["Fonction"], readings: ["きのう"], mnemonicFr: "La FONCTION.", levelId: 14 },
    // 骨 vocabulary
    { word: "骨", meaningsFr: ["Os"], readings: ["ほね"], mnemonicFr: "L'OS.", levelId: 14 },
    { word: "骨折", meaningsFr: ["Fracture"], readings: ["こっせつ"], mnemonicFr: "Une FRACTURE.", levelId: 14 },
    // 頑 vocabulary
    { word: "頑張る", meaningsFr: ["Faire de son mieux"], readings: ["がんばる"], mnemonicFr: "FAIRE DE SON MIEUX.", levelId: 14 },
    { word: "頑丈", meaningsFr: ["Robuste"], readings: ["がんじょう"], mnemonicFr: "ROBUSTE.", levelId: 14 },
  ];

  for (const vocab of level14Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 14 supplementary vocab complete! Added", level14Vocab.length, "words");

  // ============================================
  // LEVEL 15 - Supplementary Vocabulary
  // Kanji: 技術寺岩帰春昼晴秋計列区坂式信勇単司変夫建昨毒法泣浅紀英軍飯仏築晩猫
  // ============================================

  const level15Vocab = [
    // 技 vocabulary
    { word: "技術", meaningsFr: ["Technique"], readings: ["ぎじゅつ"], mnemonicFr: "La TECHNIQUE.", levelId: 15 },
    { word: "技", meaningsFr: ["Technique", "Art"], readings: ["わざ"], mnemonicFr: "L'ART, la technique.", levelId: 15 },
    { word: "演技", meaningsFr: ["Jeu d'acteur"], readings: ["えんぎ"], mnemonicFr: "Le JEU D'ACTEUR.", levelId: 15 },
    // 術 vocabulary
    { word: "美術", meaningsFr: ["Beaux-arts"], readings: ["びじゅつ"], mnemonicFr: "Les BEAUX-ARTS.", levelId: 15 },
    { word: "手術", meaningsFr: ["Opération chirurgicale"], readings: ["しゅじゅつ"], mnemonicFr: "L'OPÉRATION CHIRURGICALE.", levelId: 15 },
    // 寺 vocabulary
    { word: "お寺", meaningsFr: ["Temple bouddhiste"], readings: ["おてら"], mnemonicFr: "Le TEMPLE BOUDDHISTE.", levelId: 15 },
    // 岩 vocabulary
    { word: "岩", meaningsFr: ["Rocher"], readings: ["いわ"], mnemonicFr: "Un ROCHER.", levelId: 15 },
    // 帰 vocabulary
    { word: "帰る", meaningsFr: ["Rentrer"], readings: ["かえる"], mnemonicFr: "RENTRER chez soi.", levelId: 15 },
    { word: "帰り", meaningsFr: ["Retour"], readings: ["かえり"], mnemonicFr: "Le RETOUR.", levelId: 15 },
    { word: "帰国", meaningsFr: ["Retour au pays"], readings: ["きこく"], mnemonicFr: "Le RETOUR AU PAYS.", levelId: 15 },
    { word: "帰宅", meaningsFr: ["Rentrer chez soi"], readings: ["きたく"], mnemonicFr: "RENTRER CHEZ SOI.", levelId: 15 },
    // 春 vocabulary
    { word: "春", meaningsFr: ["Printemps"], readings: ["はる"], mnemonicFr: "Le PRINTEMPS.", levelId: 15 },
    { word: "春休み", meaningsFr: ["Vacances de printemps"], readings: ["はるやすみ"], mnemonicFr: "Les VACANCES DE PRINTEMPS.", levelId: 15 },
    // 昼 vocabulary
    { word: "昼", meaningsFr: ["Midi"], readings: ["ひる"], mnemonicFr: "MIDI.", levelId: 15 },
    { word: "昼食", meaningsFr: ["Déjeuner"], readings: ["ちゅうしょく"], mnemonicFr: "Le DÉJEUNER.", levelId: 15 },
    { word: "昼間", meaningsFr: ["La journée"], readings: ["ひるま"], mnemonicFr: "La JOURNÉE.", levelId: 15 },
    { word: "昼寝", meaningsFr: ["Sieste"], readings: ["ひるね"], mnemonicFr: "La SIESTE.", levelId: 15 },
    // 晴 vocabulary
    { word: "晴れる", meaningsFr: ["S'éclaircir"], readings: ["はれる"], mnemonicFr: "S'ÉCLAIRCIR.", levelId: 15 },
    { word: "晴れ", meaningsFr: ["Beau temps"], readings: ["はれ"], mnemonicFr: "BEAU TEMPS.", levelId: 15 },
    { word: "快晴", meaningsFr: ["Temps clair"], readings: ["かいせい"], mnemonicFr: "TEMPS CLAIR.", levelId: 15 },
    // 秋 vocabulary
    { word: "秋", meaningsFr: ["Automne"], readings: ["あき"], mnemonicFr: "L'AUTOMNE.", levelId: 15 },
    // 計 vocabulary
    { word: "計画", meaningsFr: ["Plan"], readings: ["けいかく"], mnemonicFr: "Un PLAN.", levelId: 15 },
    { word: "時計", meaningsFr: ["Montre", "Horloge"], readings: ["とけい"], mnemonicFr: "Une MONTRE.", levelId: 15 },
    { word: "合計", meaningsFr: ["Total"], readings: ["ごうけい"], mnemonicFr: "Le TOTAL.", levelId: 15 },
    { word: "設計", meaningsFr: ["Conception"], readings: ["せっけい"], mnemonicFr: "La CONCEPTION.", levelId: 15 },
    // 列 vocabulary
    { word: "列", meaningsFr: ["File"], readings: ["れつ"], mnemonicFr: "Une FILE.", levelId: 15 },
    { word: "行列", meaningsFr: ["Queue"], readings: ["ぎょうれつ"], mnemonicFr: "Une QUEUE.", levelId: 15 },
    { word: "列車", meaningsFr: ["Train"], readings: ["れっしゃ"], mnemonicFr: "Un TRAIN.", levelId: 15 },
    // 区 vocabulary
    { word: "地区", meaningsFr: ["District"], readings: ["ちく"], mnemonicFr: "Le DISTRICT.", levelId: 15 },
    { word: "区別", meaningsFr: ["Distinction"], readings: ["くべつ"], mnemonicFr: "La DISTINCTION.", levelId: 15 },
    // 坂 vocabulary
    { word: "坂", meaningsFr: ["Pente"], readings: ["さか"], mnemonicFr: "Une PENTE.", levelId: 15 },
    { word: "坂道", meaningsFr: ["Route en pente"], readings: ["さかみち"], mnemonicFr: "Une ROUTE EN PENTE.", levelId: 15 },
    // 式 vocabulary
    { word: "形式", meaningsFr: ["Format"], readings: ["けいしき"], mnemonicFr: "Le FORMAT.", levelId: 15 },
    { word: "公式", meaningsFr: ["Officiel"], readings: ["こうしき"], mnemonicFr: "OFFICIEL.", levelId: 15 },
    { word: "結婚式", meaningsFr: ["Mariage"], readings: ["けっこんしき"], mnemonicFr: "Le MARIAGE.", levelId: 15 },
    // 信 vocabulary
    { word: "信じる", meaningsFr: ["Croire"], readings: ["しんじる"], mnemonicFr: "CROIRE.", levelId: 15 },
    { word: "信用", meaningsFr: ["Confiance"], readings: ["しんよう"], mnemonicFr: "La CONFIANCE.", levelId: 15 },
    { word: "信号", meaningsFr: ["Feu de signalisation"], readings: ["しんごう"], mnemonicFr: "Le FEU DE SIGNALISATION.", levelId: 15 },
    { word: "自信", meaningsFr: ["Confiance en soi"], readings: ["じしん"], mnemonicFr: "La CONFIANCE EN SOI.", levelId: 15 },
    // 勇 vocabulary
    { word: "勇気", meaningsFr: ["Courage"], readings: ["ゆうき"], mnemonicFr: "Le COURAGE.", levelId: 15 },
    { word: "勇敢", meaningsFr: ["Brave"], readings: ["ゆうかん"], mnemonicFr: "BRAVE.", levelId: 15 },
    // 単 vocabulary
    { word: "単語", meaningsFr: ["Vocabulaire"], readings: ["たんご"], mnemonicFr: "Le VOCABULAIRE.", levelId: 15 },
    { word: "単純", meaningsFr: ["Simple"], readings: ["たんじゅん"], mnemonicFr: "SIMPLE.", levelId: 15 },
    { word: "簡単", meaningsFr: ["Facile"], readings: ["かんたん"], mnemonicFr: "FACILE.", levelId: 15 },
    // 司 vocabulary
    { word: "司会", meaningsFr: ["Animateur"], readings: ["しかい"], mnemonicFr: "L'ANIMATEUR.", levelId: 15 },
    // 変 vocabulary
    { word: "変わる", meaningsFr: ["Changer"], readings: ["かわる"], mnemonicFr: "CHANGER.", levelId: 15 },
    { word: "変える", meaningsFr: ["Modifier"], readings: ["かえる"], mnemonicFr: "MODIFIER.", levelId: 15 },
    { word: "変化", meaningsFr: ["Changement"], readings: ["へんか"], mnemonicFr: "Le CHANGEMENT.", levelId: 15 },
    { word: "大変", meaningsFr: ["Très", "Difficile"], readings: ["たいへん"], mnemonicFr: "TRÈS difficile.", levelId: 15 },
    // 夫 vocabulary
    { word: "夫", meaningsFr: ["Mari"], readings: ["おっと"], mnemonicFr: "Le MARI.", levelId: 15 },
    { word: "夫婦", meaningsFr: ["Couple marié"], readings: ["ふうふ"], mnemonicFr: "Le COUPLE MARIÉ.", levelId: 15 },
    // 建 vocabulary
    { word: "建物", meaningsFr: ["Bâtiment"], readings: ["たてもの"], mnemonicFr: "Un BÂTIMENT.", levelId: 15 },
    { word: "建てる", meaningsFr: ["Construire"], readings: ["たてる"], mnemonicFr: "CONSTRUIRE.", levelId: 15 },
    { word: "建設", meaningsFr: ["Construction"], readings: ["けんせつ"], mnemonicFr: "La CONSTRUCTION.", levelId: 15 },
    // 昨 vocabulary
    { word: "昨日", meaningsFr: ["Hier"], readings: ["きのう"], mnemonicFr: "HIER.", levelId: 15 },
    { word: "昨年", meaningsFr: ["L'année dernière"], readings: ["さくねん"], mnemonicFr: "L'ANNÉE DERNIÈRE.", levelId: 15 },
    // 毒 vocabulary
    { word: "毒", meaningsFr: ["Poison"], readings: ["どく"], mnemonicFr: "Le POISON.", levelId: 15 },
    // 法 vocabulary
    { word: "方法", meaningsFr: ["Méthode"], readings: ["ほうほう"], mnemonicFr: "La MÉTHODE.", levelId: 15 },
    { word: "法律", meaningsFr: ["Loi"], readings: ["ほうりつ"], mnemonicFr: "La LOI.", levelId: 15 },
    { word: "文法", meaningsFr: ["Grammaire"], readings: ["ぶんぽう"], mnemonicFr: "La GRAMMAIRE.", levelId: 15 },
    // 泣 vocabulary
    { word: "泣く", meaningsFr: ["Pleurer"], readings: ["なく"], mnemonicFr: "PLEURER.", levelId: 15 },
    // 浅 vocabulary
    { word: "浅い", meaningsFr: ["Peu profond"], readings: ["あさい"], mnemonicFr: "PEU PROFOND.", levelId: 15 },
    // 紀 vocabulary
    { word: "世紀", meaningsFr: ["Siècle"], readings: ["せいき"], mnemonicFr: "Le SIÈCLE.", levelId: 15 },
    // 英 vocabulary
    { word: "英語", meaningsFr: ["Anglais"], readings: ["えいご"], mnemonicFr: "L'ANGLAIS.", levelId: 15 },
    // 軍 vocabulary
    { word: "軍", meaningsFr: ["Armée"], readings: ["ぐん"], mnemonicFr: "L'ARMÉE.", levelId: 15 },
    { word: "軍人", meaningsFr: ["Militaire"], readings: ["ぐんじん"], mnemonicFr: "Un MILITAIRE.", levelId: 15 },
    // 飯 vocabulary
    { word: "ご飯", meaningsFr: ["Riz", "Repas"], readings: ["ごはん"], mnemonicFr: "Le RIZ, le repas.", levelId: 15 },
    { word: "朝ご飯", meaningsFr: ["Petit-déjeuner"], readings: ["あさごはん"], mnemonicFr: "Le PETIT-DÉJEUNER.", levelId: 15 },
    { word: "晩ご飯", meaningsFr: ["Dîner"], readings: ["ばんごはん"], mnemonicFr: "Le DÎNER.", levelId: 15 },
    // 仏 vocabulary
    { word: "仏教", meaningsFr: ["Bouddhisme"], readings: ["ぶっきょう"], mnemonicFr: "Le BOUDDHISME.", levelId: 15 },
    // 築 vocabulary
    { word: "建築", meaningsFr: ["Architecture"], readings: ["けんちく"], mnemonicFr: "L'ARCHITECTURE.", levelId: 15 },
    { word: "新築", meaningsFr: ["Nouvelle construction"], readings: ["しんちく"], mnemonicFr: "NOUVELLE CONSTRUCTION.", levelId: 15 },
    // 晩 vocabulary
    { word: "晩", meaningsFr: ["Soir"], readings: ["ばん"], mnemonicFr: "Le SOIR.", levelId: 15 },
    { word: "今晩", meaningsFr: ["Ce soir"], readings: ["こんばん"], mnemonicFr: "CE SOIR.", levelId: 15 },
    { word: "毎晩", meaningsFr: ["Chaque soir"], readings: ["まいばん"], mnemonicFr: "CHAQUE SOIR.", levelId: 15 },
    // 猫 vocabulary
    { word: "猫", meaningsFr: ["Chat"], readings: ["ねこ"], mnemonicFr: "Un CHAT.", levelId: 15 },
    { word: "子猫", meaningsFr: ["Chaton"], readings: ["こねこ"], mnemonicFr: "Un CHATON.", levelId: 15 },
  ];

  for (const vocab of level15Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 15 supplementary vocab complete! Added", level15Vocab.length, "words");

  // ============================================
  // LEVEL 16 - Supplementary Vocabulary
  // Kanji: 園曜書遠門係取品守幸急真箱荷面典府治浴笑辞関弁政留証険危存専冒冗阪
  // ============================================

  const level16Vocab = [
    // 園 vocabulary
    { word: "公園", meaningsFr: ["Parc"], readings: ["こうえん"], mnemonicFr: "Un PARC.", levelId: 16 },
    { word: "動物園", meaningsFr: ["Zoo"], readings: ["どうぶつえん"], mnemonicFr: "Le ZOO.", levelId: 16 },
    { word: "幼稚園", meaningsFr: ["Maternelle"], readings: ["ようちえん"], mnemonicFr: "La MATERNELLE.", levelId: 16 },
    // 曜 vocabulary
    { word: "曜日", meaningsFr: ["Jour de la semaine"], readings: ["ようび"], mnemonicFr: "Le JOUR DE LA SEMAINE.", levelId: 16 },
    { word: "何曜日", meaningsFr: ["Quel jour"], readings: ["なんようび"], mnemonicFr: "QUEL JOUR ?", levelId: 16 },
    // 書 vocabulary
    { word: "書く", meaningsFr: ["Écrire"], readings: ["かく"], mnemonicFr: "ÉCRIRE.", levelId: 16 },
    { word: "書類", meaningsFr: ["Documents"], readings: ["しょるい"], mnemonicFr: "Les DOCUMENTS.", levelId: 16 },
    { word: "辞書", meaningsFr: ["Dictionnaire"], readings: ["じしょ"], mnemonicFr: "Le DICTIONNAIRE.", levelId: 16 },
    { word: "読書", meaningsFr: ["Lecture"], readings: ["どくしょ"], mnemonicFr: "La LECTURE.", levelId: 16 },
    // 遠 vocabulary
    { word: "遠い", meaningsFr: ["Loin"], readings: ["とおい"], mnemonicFr: "LOIN.", levelId: 16 },
    { word: "遠足", meaningsFr: ["Excursion"], readings: ["えんそく"], mnemonicFr: "Une EXCURSION.", levelId: 16 },
    { word: "永遠", meaningsFr: ["Éternité"], readings: ["えいえん"], mnemonicFr: "L'ÉTERNITÉ.", levelId: 16 },
    // 門 vocabulary
    { word: "門", meaningsFr: ["Porte"], readings: ["もん"], mnemonicFr: "Une PORTE.", levelId: 16 },
    { word: "専門", meaningsFr: ["Spécialité"], readings: ["せんもん"], mnemonicFr: "La SPÉCIALITÉ.", levelId: 16 },
    { word: "入門", meaningsFr: ["Introduction"], readings: ["にゅうもん"], mnemonicFr: "L'INTRODUCTION.", levelId: 16 },
    // 係 vocabulary
    { word: "関係", meaningsFr: ["Relation"], readings: ["かんけい"], mnemonicFr: "La RELATION.", levelId: 16 },
    { word: "係員", meaningsFr: ["Employé"], readings: ["かかりいん"], mnemonicFr: "Un EMPLOYÉ.", levelId: 16 },
    // 取 vocabulary
    { word: "取る", meaningsFr: ["Prendre"], readings: ["とる"], mnemonicFr: "PRENDRE.", levelId: 16 },
    { word: "取り消す", meaningsFr: ["Annuler"], readings: ["とりけす"], mnemonicFr: "ANNULER.", levelId: 16 },
    { word: "取り出す", meaningsFr: ["Sortir"], readings: ["とりだす"], mnemonicFr: "SORTIR.", levelId: 16 },
    // 品 vocabulary
    { word: "品物", meaningsFr: ["Article"], readings: ["しなもの"], mnemonicFr: "Un ARTICLE.", levelId: 16 },
    { word: "作品", meaningsFr: ["Œuvre"], readings: ["さくひん"], mnemonicFr: "Une ŒUVRE.", levelId: 16 },
    { word: "食品", meaningsFr: ["Aliments"], readings: ["しょくひん"], mnemonicFr: "Les ALIMENTS.", levelId: 16 },
    // 守 vocabulary
    { word: "守る", meaningsFr: ["Protéger"], readings: ["まもる"], mnemonicFr: "PROTÉGER.", levelId: 16 },
    { word: "留守", meaningsFr: ["Absence"], readings: ["るす"], mnemonicFr: "L'ABSENCE.", levelId: 16 },
    // 幸 vocabulary
    { word: "幸せ", meaningsFr: ["Bonheur"], readings: ["しあわせ"], mnemonicFr: "Le BONHEUR.", levelId: 16 },
    { word: "不幸", meaningsFr: ["Malheur"], readings: ["ふこう"], mnemonicFr: "Le MALHEUR.", levelId: 16 },
    { word: "幸運", meaningsFr: ["Chance"], readings: ["こううん"], mnemonicFr: "La CHANCE.", levelId: 16 },
    // 急 vocabulary
    { word: "急ぐ", meaningsFr: ["Se dépêcher"], readings: ["いそぐ"], mnemonicFr: "SE DÉPÊCHER.", levelId: 16 },
    { word: "急に", meaningsFr: ["Soudainement"], readings: ["きゅうに"], mnemonicFr: "SOUDAINEMENT.", levelId: 16 },
    { word: "急行", meaningsFr: ["Express"], readings: ["きゅうこう"], mnemonicFr: "EXPRESS.", levelId: 16 },
    { word: "救急車", meaningsFr: ["Ambulance"], readings: ["きゅうきゅうしゃ"], mnemonicFr: "L'AMBULANCE.", levelId: 16 },
    // 真 vocabulary
    { word: "真ん中", meaningsFr: ["Centre"], readings: ["まんなか"], mnemonicFr: "Le CENTRE.", levelId: 16 },
    { word: "写真", meaningsFr: ["Photo"], readings: ["しゃしん"], mnemonicFr: "Une PHOTO.", levelId: 16 },
    { word: "真実", meaningsFr: ["Vérité"], readings: ["しんじつ"], mnemonicFr: "La VÉRITÉ.", levelId: 16 },
    { word: "真剣", meaningsFr: ["Sérieux"], readings: ["しんけん"], mnemonicFr: "SÉRIEUX.", levelId: 16 },
    // 箱 vocabulary
    { word: "箱", meaningsFr: ["Boîte"], readings: ["はこ"], mnemonicFr: "Une BOÎTE.", levelId: 16 },
    { word: "ゴミ箱", meaningsFr: ["Poubelle"], readings: ["ごみばこ"], mnemonicFr: "La POUBELLE.", levelId: 16 },
    // 荷 vocabulary
    { word: "荷物", meaningsFr: ["Bagages"], readings: ["にもつ"], mnemonicFr: "Les BAGAGES.", levelId: 16 },
    // 面 vocabulary
    { word: "面白い", meaningsFr: ["Intéressant"], readings: ["おもしろい"], mnemonicFr: "INTÉRESSANT.", levelId: 16 },
    { word: "表面", meaningsFr: ["Surface"], readings: ["ひょうめん"], mnemonicFr: "La SURFACE.", levelId: 16 },
    { word: "場面", meaningsFr: ["Scène"], readings: ["ばめん"], mnemonicFr: "La SCÈNE.", levelId: 16 },
    // 典 vocabulary
    { word: "辞典", meaningsFr: ["Dictionnaire"], readings: ["じてん"], mnemonicFr: "Le DICTIONNAIRE.", levelId: 16 },
    { word: "古典", meaningsFr: ["Classique"], readings: ["こてん"], mnemonicFr: "CLASSIQUE.", levelId: 16 },
    // 府 vocabulary
    { word: "政府", meaningsFr: ["Gouvernement"], readings: ["せいふ"], mnemonicFr: "Le GOUVERNEMENT.", levelId: 16 },
    // 治 vocabulary
    { word: "治る", meaningsFr: ["Guérir"], readings: ["なおる"], mnemonicFr: "GUÉRIR.", levelId: 16 },
    { word: "治す", meaningsFr: ["Soigner"], readings: ["なおす"], mnemonicFr: "SOIGNER.", levelId: 16 },
    { word: "政治", meaningsFr: ["Politique"], readings: ["せいじ"], mnemonicFr: "La POLITIQUE.", levelId: 16 },
    // 浴 vocabulary
    { word: "浴びる", meaningsFr: ["Prendre une douche"], readings: ["あびる"], mnemonicFr: "PRENDRE UNE DOUCHE.", levelId: 16 },
    { word: "入浴", meaningsFr: ["Bain"], readings: ["にゅうよく"], mnemonicFr: "Le BAIN.", levelId: 16 },
    // 笑 vocabulary
    { word: "笑う", meaningsFr: ["Rire"], readings: ["わらう"], mnemonicFr: "RIRE.", levelId: 16 },
    { word: "笑顔", meaningsFr: ["Sourire"], readings: ["えがお"], mnemonicFr: "Le SOURIRE.", levelId: 16 },
    { word: "微笑む", meaningsFr: ["Sourire"], readings: ["ほほえむ"], mnemonicFr: "SOURIRE.", levelId: 16 },
    // 辞 vocabulary
    { word: "辞める", meaningsFr: ["Démissionner"], readings: ["やめる"], mnemonicFr: "DÉMISSIONNER.", levelId: 16 },
    // 関 vocabulary
    { word: "関する", meaningsFr: ["Concerner"], readings: ["かんする"], mnemonicFr: "CONCERNER.", levelId: 16 },
    { word: "関心", meaningsFr: ["Intérêt"], readings: ["かんしん"], mnemonicFr: "L'INTÉRÊT.", levelId: 16 },
    { word: "玄関", meaningsFr: ["Entrée"], readings: ["げんかん"], mnemonicFr: "L'ENTRÉE.", levelId: 16 },
    // 弁 vocabulary
    { word: "弁当", meaningsFr: ["Bento"], readings: ["べんとう"], mnemonicFr: "Un BENTO.", levelId: 16 },
    // 政 vocabulary
    { word: "政治家", meaningsFr: ["Politicien"], readings: ["せいじか"], mnemonicFr: "Un POLITICIEN.", levelId: 16 },
    // 留 vocabulary
    { word: "留学", meaningsFr: ["Études à l'étranger"], readings: ["りゅうがく"], mnemonicFr: "Les ÉTUDES À L'ÉTRANGER.", levelId: 16 },
    { word: "留学生", meaningsFr: ["Étudiant étranger"], readings: ["りゅうがくせい"], mnemonicFr: "Un ÉTUDIANT ÉTRANGER.", levelId: 16 },
    // 証 vocabulary
    { word: "証明", meaningsFr: ["Preuve"], readings: ["しょうめい"], mnemonicFr: "La PREUVE.", levelId: 16 },
    { word: "保証", meaningsFr: ["Garantie"], readings: ["ほしょう"], mnemonicFr: "La GARANTIE.", levelId: 16 },
    // 険 vocabulary
    { word: "危険", meaningsFr: ["Danger"], readings: ["きけん"], mnemonicFr: "Le DANGER.", levelId: 16 },
    { word: "保険", meaningsFr: ["Assurance"], readings: ["ほけん"], mnemonicFr: "L'ASSURANCE.", levelId: 16 },
    { word: "冒険", meaningsFr: ["Aventure"], readings: ["ぼうけん"], mnemonicFr: "L'AVENTURE.", levelId: 16 },
    // 危 vocabulary
    { word: "危ない", meaningsFr: ["Dangereux"], readings: ["あぶない"], mnemonicFr: "DANGEREUX.", levelId: 16 },
    // 存 vocabulary
    { word: "存在", meaningsFr: ["Existence"], readings: ["そんざい"], mnemonicFr: "L'EXISTENCE.", levelId: 16 },
    { word: "保存", meaningsFr: ["Conservation"], readings: ["ほぞん"], mnemonicFr: "La CONSERVATION.", levelId: 16 },
    // 専 vocabulary
    { word: "専門家", meaningsFr: ["Expert"], readings: ["せんもんか"], mnemonicFr: "Un EXPERT.", levelId: 16 },
  ];

  for (const vocab of level16Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 16 supplementary vocab complete! Added", level16Vocab.length, "words");

  // ============================================
  // LEVEL 17 - Supplementary Vocabulary
  // Kanji: 原細薬鼻側兵堂塩席敗果栄梅無結因常識非干是渉虚官察底愛署警恋覚説幻喜悲詳
  // ============================================

  const level17Vocab = [
    // 原 vocabulary
    { word: "原因", meaningsFr: ["Cause"], readings: ["げんいん"], mnemonicFr: "La CAUSE.", levelId: 17 },
    { word: "原則", meaningsFr: ["Principe"], readings: ["げんそく"], mnemonicFr: "Le PRINCIPE.", levelId: 17 },
    { word: "草原", meaningsFr: ["Prairie"], readings: ["そうげん"], mnemonicFr: "La PRAIRIE.", levelId: 17 },
    // 細 vocabulary
    { word: "細い", meaningsFr: ["Mince"], readings: ["ほそい"], mnemonicFr: "MINCE.", levelId: 17 },
    { word: "細かい", meaningsFr: ["Détaillé"], readings: ["こまかい"], mnemonicFr: "DÉTAILLÉ.", levelId: 17 },
    { word: "詳細", meaningsFr: ["Détails"], readings: ["しょうさい"], mnemonicFr: "Les DÉTAILS.", levelId: 17 },
    // 薬 vocabulary
    { word: "薬", meaningsFr: ["Médicament"], readings: ["くすり"], mnemonicFr: "Un MÉDICAMENT.", levelId: 17 },
    { word: "薬局", meaningsFr: ["Pharmacie"], readings: ["やっきょく"], mnemonicFr: "La PHARMACIE.", levelId: 17 },
    // 鼻 vocabulary
    { word: "鼻", meaningsFr: ["Nez"], readings: ["はな"], mnemonicFr: "Le NEZ.", levelId: 17 },
    // 側 vocabulary
    { word: "側", meaningsFr: ["Côté"], readings: ["がわ"], mnemonicFr: "Le CÔTÉ.", levelId: 17 },
    { word: "両側", meaningsFr: ["Les deux côtés"], readings: ["りょうがわ"], mnemonicFr: "LES DEUX CÔTÉS.", levelId: 17 },
    { word: "内側", meaningsFr: ["Intérieur"], readings: ["うちがわ"], mnemonicFr: "L'INTÉRIEUR.", levelId: 17 },
    { word: "外側", meaningsFr: ["Extérieur"], readings: ["そとがわ"], mnemonicFr: "L'EXTÉRIEUR.", levelId: 17 },
    // 兵 vocabulary
    { word: "兵士", meaningsFr: ["Soldat"], readings: ["へいし"], mnemonicFr: "Un SOLDAT.", levelId: 17 },
    // 堂 vocabulary
    { word: "食堂", meaningsFr: ["Cantine"], readings: ["しょくどう"], mnemonicFr: "La CANTINE.", levelId: 17 },
    // 塩 vocabulary
    { word: "塩", meaningsFr: ["Sel"], readings: ["しお"], mnemonicFr: "Le SEL.", levelId: 17 },
    { word: "塩辛い", meaningsFr: ["Salé"], readings: ["しおからい"], mnemonicFr: "SALÉ.", levelId: 17 },
    // 席 vocabulary
    { word: "席", meaningsFr: ["Siège", "Place"], readings: ["せき"], mnemonicFr: "Une PLACE.", levelId: 17 },
    { word: "座席", meaningsFr: ["Siège"], readings: ["ざせき"], mnemonicFr: "Un SIÈGE.", levelId: 17 },
    // 敗 vocabulary
    { word: "失敗", meaningsFr: ["Échec"], readings: ["しっぱい"], mnemonicFr: "L'ÉCHEC.", levelId: 17 },
    { word: "勝敗", meaningsFr: ["Victoire ou défaite"], readings: ["しょうはい"], mnemonicFr: "VICTOIRE OU DÉFAITE.", levelId: 17 },
    // 果 vocabulary
    { word: "結果", meaningsFr: ["Résultat"], readings: ["けっか"], mnemonicFr: "Le RÉSULTAT.", levelId: 17 },
    { word: "果物", meaningsFr: ["Fruit"], readings: ["くだもの"], mnemonicFr: "Un FRUIT.", levelId: 17 },
    { word: "効果", meaningsFr: ["Effet"], readings: ["こうか"], mnemonicFr: "L'EFFET.", levelId: 17 },
    // 栄 vocabulary
    { word: "栄養", meaningsFr: ["Nutrition"], readings: ["えいよう"], mnemonicFr: "La NUTRITION.", levelId: 17 },
    // 梅 vocabulary
    { word: "梅", meaningsFr: ["Prune"], readings: ["うめ"], mnemonicFr: "La PRUNE.", levelId: 17 },
    { word: "梅雨", meaningsFr: ["Saison des pluies"], readings: ["つゆ"], mnemonicFr: "La SAISON DES PLUIES.", levelId: 17 },
    // 無 vocabulary
    { word: "無い", meaningsFr: ["Ne pas avoir"], readings: ["ない"], mnemonicFr: "NE PAS AVOIR.", levelId: 17 },
    { word: "無理", meaningsFr: ["Impossible"], readings: ["むり"], mnemonicFr: "IMPOSSIBLE.", levelId: 17 },
    { word: "無料", meaningsFr: ["Gratuit"], readings: ["むりょう"], mnemonicFr: "GRATUIT.", levelId: 17 },
    { word: "無視", meaningsFr: ["Ignorer"], readings: ["むし"], mnemonicFr: "IGNORER.", levelId: 17 },
    // 結 vocabulary
    { word: "結婚", meaningsFr: ["Mariage"], readings: ["けっこん"], mnemonicFr: "Le MARIAGE.", levelId: 17 },
    { word: "結ぶ", meaningsFr: ["Attacher"], readings: ["むすぶ"], mnemonicFr: "ATTACHER.", levelId: 17 },
    { word: "結局", meaningsFr: ["Finalement"], readings: ["けっきょく"], mnemonicFr: "FINALEMENT.", levelId: 17 },
    // 因 vocabulary
    { word: "原因", meaningsFr: ["Cause"], readings: ["げんいん"], mnemonicFr: "La CAUSE.", levelId: 17 },
    // 常 vocabulary
    { word: "普通", meaningsFr: ["Normal"], readings: ["ふつう"], mnemonicFr: "NORMAL.", levelId: 17 },
    { word: "非常に", meaningsFr: ["Extrêmement"], readings: ["ひじょうに"], mnemonicFr: "EXTRÊMEMENT.", levelId: 17 },
    { word: "日常", meaningsFr: ["Quotidien"], readings: ["にちじょう"], mnemonicFr: "Le QUOTIDIEN.", levelId: 17 },
    // 識 vocabulary
    { word: "知識", meaningsFr: ["Connaissance"], readings: ["ちしき"], mnemonicFr: "La CONNAISSANCE.", levelId: 17 },
    { word: "意識", meaningsFr: ["Conscience"], readings: ["いしき"], mnemonicFr: "La CONSCIENCE.", levelId: 17 },
    // 非 vocabulary
    { word: "非常", meaningsFr: ["Urgence"], readings: ["ひじょう"], mnemonicFr: "L'URGENCE.", levelId: 17 },
    // 官 vocabulary
    { word: "警官", meaningsFr: ["Policier"], readings: ["けいかん"], mnemonicFr: "Un POLICIER.", levelId: 17 },
    // 察 vocabulary
    { word: "警察", meaningsFr: ["Police"], readings: ["けいさつ"], mnemonicFr: "La POLICE.", levelId: 17 },
    { word: "観察", meaningsFr: ["Observation"], readings: ["かんさつ"], mnemonicFr: "L'OBSERVATION.", levelId: 17 },
    // 底 vocabulary
    { word: "底", meaningsFr: ["Fond"], readings: ["そこ"], mnemonicFr: "Le FOND.", levelId: 17 },
    // 愛 vocabulary
    { word: "愛", meaningsFr: ["Amour"], readings: ["あい"], mnemonicFr: "L'AMOUR.", levelId: 17 },
    { word: "愛する", meaningsFr: ["Aimer"], readings: ["あいする"], mnemonicFr: "AIMER.", levelId: 17 },
    { word: "愛情", meaningsFr: ["Affection"], readings: ["あいじょう"], mnemonicFr: "L'AFFECTION.", levelId: 17 },
    // 恋 vocabulary
    { word: "恋", meaningsFr: ["Amour romantique"], readings: ["こい"], mnemonicFr: "L'AMOUR ROMANTIQUE.", levelId: 17 },
    { word: "恋人", meaningsFr: ["Amoureux"], readings: ["こいびと"], mnemonicFr: "L'AMOUREUX.", levelId: 17 },
    { word: "恋愛", meaningsFr: ["Romance"], readings: ["れんあい"], mnemonicFr: "La ROMANCE.", levelId: 17 },
    // 覚 vocabulary
    { word: "覚える", meaningsFr: ["Mémoriser"], readings: ["おぼえる"], mnemonicFr: "MÉMORISER.", levelId: 17 },
    { word: "目覚まし", meaningsFr: ["Réveil"], readings: ["めざまし"], mnemonicFr: "Le RÉVEIL.", levelId: 17 },
    { word: "感覚", meaningsFr: ["Sensation"], readings: ["かんかく"], mnemonicFr: "La SENSATION.", levelId: 17 },
    // 説 vocabulary
    { word: "説明", meaningsFr: ["Explication"], readings: ["せつめい"], mnemonicFr: "L'EXPLICATION.", levelId: 17 },
    { word: "小説", meaningsFr: ["Roman"], readings: ["しょうせつ"], mnemonicFr: "Un ROMAN.", levelId: 17 },
    // 喜 vocabulary
    { word: "喜ぶ", meaningsFr: ["Se réjouir"], readings: ["よろこぶ"], mnemonicFr: "SE RÉJOUIR.", levelId: 17 },
    { word: "喜び", meaningsFr: ["Joie"], readings: ["よろこび"], mnemonicFr: "La JOIE.", levelId: 17 },
    // 悲 vocabulary
    { word: "悲しい", meaningsFr: ["Triste"], readings: ["かなしい"], mnemonicFr: "TRISTE.", levelId: 17 },
    { word: "悲しむ", meaningsFr: ["Être triste"], readings: ["かなしむ"], mnemonicFr: "ÊTRE TRISTE.", levelId: 17 },
    { word: "悲劇", meaningsFr: ["Tragédie"], readings: ["ひげき"], mnemonicFr: "La TRAGÉDIE.", levelId: 17 },
    // 詳 vocabulary
    { word: "詳しい", meaningsFr: ["Détaillé"], readings: ["くわしい"], mnemonicFr: "DÉTAILLÉ.", levelId: 17 },
  ];

  for (const vocab of level17Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 17 supplementary vocab complete! Added", level17Vocab.length, "words");

  // ============================================
  // LEVEL 18 - Supplementary Vocabulary
  // Kanji: 訓弓告種達類報祈等汽借焼座忘洗胸脳僧禅可許枚静句禁喫煙
  // ============================================

  const level18Vocab = [
    // 訓 vocabulary
    { word: "訓練", meaningsFr: ["Entraînement"], readings: ["くんれん"], mnemonicFr: "L'ENTRAÎNEMENT.", levelId: 18 },
    { word: "教訓", meaningsFr: ["Leçon morale"], readings: ["きょうくん"], mnemonicFr: "La LEÇON MORALE.", levelId: 18 },
    // 弓 vocabulary
    { word: "弓", meaningsFr: ["Arc"], readings: ["ゆみ"], mnemonicFr: "Un ARC.", levelId: 18 },
    { word: "弓道", meaningsFr: ["Tir à l'arc"], readings: ["きゅうどう"], mnemonicFr: "Le TIR À L'ARC.", levelId: 18 },
    // 告 vocabulary
    { word: "報告", meaningsFr: ["Rapport"], readings: ["ほうこく"], mnemonicFr: "Un RAPPORT.", levelId: 18 },
    { word: "広告", meaningsFr: ["Publicité"], readings: ["こうこく"], mnemonicFr: "La PUBLICITÉ.", levelId: 18 },
    // 種 vocabulary
    { word: "種類", meaningsFr: ["Type"], readings: ["しゅるい"], mnemonicFr: "Le TYPE.", levelId: 18 },
    { word: "種", meaningsFr: ["Graine"], readings: ["たね"], mnemonicFr: "Une GRAINE.", levelId: 18 },
    // 達 vocabulary
    { word: "友達", meaningsFr: ["Ami"], readings: ["ともだち"], mnemonicFr: "Un AMI.", levelId: 18 },
    { word: "発達", meaningsFr: ["Développement"], readings: ["はったつ"], mnemonicFr: "Le DÉVELOPPEMENT.", levelId: 18 },
    { word: "配達", meaningsFr: ["Livraison"], readings: ["はいたつ"], mnemonicFr: "La LIVRAISON.", levelId: 18 },
    // 類 vocabulary
    { word: "人類", meaningsFr: ["Humanité"], readings: ["じんるい"], mnemonicFr: "L'HUMANITÉ.", levelId: 18 },
    { word: "書類", meaningsFr: ["Documents"], readings: ["しょるい"], mnemonicFr: "Les DOCUMENTS.", levelId: 18 },
    // 報 vocabulary
    { word: "情報", meaningsFr: ["Information"], readings: ["じょうほう"], mnemonicFr: "L'INFORMATION.", levelId: 18 },
    { word: "天気予報", meaningsFr: ["Météo"], readings: ["てんきよほう"], mnemonicFr: "La MÉTÉO.", levelId: 18 },
    { word: "報道", meaningsFr: ["Reportage"], readings: ["ほうどう"], mnemonicFr: "Le REPORTAGE.", levelId: 18 },
    // 祈 vocabulary
    { word: "祈る", meaningsFr: ["Prier"], readings: ["いのる"], mnemonicFr: "PRIER.", levelId: 18 },
    { word: "祈り", meaningsFr: ["Prière"], readings: ["いのり"], mnemonicFr: "La PRIÈRE.", levelId: 18 },
    // 等 vocabulary
    { word: "等しい", meaningsFr: ["Égal"], readings: ["ひとしい"], mnemonicFr: "ÉGAL.", levelId: 18 },
    { word: "平等", meaningsFr: ["Égalité"], readings: ["びょうどう"], mnemonicFr: "L'ÉGALITÉ.", levelId: 18 },
    // 汽 vocabulary
    { word: "汽車", meaningsFr: ["Train à vapeur"], readings: ["きしゃ"], mnemonicFr: "Le TRAIN À VAPEUR.", levelId: 18 },
    // 借 vocabulary
    { word: "借りる", meaningsFr: ["Emprunter"], readings: ["かりる"], mnemonicFr: "EMPRUNTER.", levelId: 18 },
    { word: "借金", meaningsFr: ["Dette"], readings: ["しゃっきん"], mnemonicFr: "La DETTE.", levelId: 18 },
    // 焼 vocabulary
    { word: "焼く", meaningsFr: ["Griller"], readings: ["やく"], mnemonicFr: "GRILLER.", levelId: 18 },
    { word: "焼ける", meaningsFr: ["Brûler"], readings: ["やける"], mnemonicFr: "BRÛLER.", levelId: 18 },
    { word: "お好み焼き", meaningsFr: ["Okonomiyaki"], readings: ["おこのみやき"], mnemonicFr: "L'OKONOMIYAKI.", levelId: 18 },
    // 座 vocabulary
    { word: "座る", meaningsFr: ["S'asseoir"], readings: ["すわる"], mnemonicFr: "S'ASSEOIR.", levelId: 18 },
    { word: "銀座", meaningsFr: ["Ginza"], readings: ["ぎんざ"], mnemonicFr: "GINZA.", levelId: 18 },
    // 忘 vocabulary
    { word: "忘れる", meaningsFr: ["Oublier"], readings: ["わすれる"], mnemonicFr: "OUBLIER.", levelId: 18 },
    { word: "忘れ物", meaningsFr: ["Objet oublié"], readings: ["わすれもの"], mnemonicFr: "L'OBJET OUBLIÉ.", levelId: 18 },
    // 洗 vocabulary
    { word: "洗う", meaningsFr: ["Laver"], readings: ["あらう"], mnemonicFr: "LAVER.", levelId: 18 },
    { word: "洗濯", meaningsFr: ["Lessive"], readings: ["せんたく"], mnemonicFr: "La LESSIVE.", levelId: 18 },
    { word: "洗面所", meaningsFr: ["Salle de bain"], readings: ["せんめんじょ"], mnemonicFr: "La SALLE DE BAIN.", levelId: 18 },
    // 胸 vocabulary
    { word: "胸", meaningsFr: ["Poitrine"], readings: ["むね"], mnemonicFr: "La POITRINE.", levelId: 18 },
    // 脳 vocabulary
    { word: "脳", meaningsFr: ["Cerveau"], readings: ["のう"], mnemonicFr: "Le CERVEAU.", levelId: 18 },
    { word: "頭脳", meaningsFr: ["Intelligence"], readings: ["ずのう"], mnemonicFr: "L'INTELLIGENCE.", levelId: 18 },
    // 可 vocabulary
    { word: "可能", meaningsFr: ["Possible"], readings: ["かのう"], mnemonicFr: "POSSIBLE.", levelId: 18 },
    { word: "不可", meaningsFr: ["Impossible"], readings: ["ふか"], mnemonicFr: "IMPOSSIBLE.", levelId: 18 },
    // 許 vocabulary
    { word: "許す", meaningsFr: ["Pardonner"], readings: ["ゆるす"], mnemonicFr: "PARDONNER.", levelId: 18 },
    { word: "免許", meaningsFr: ["Permis"], readings: ["めんきょ"], mnemonicFr: "Le PERMIS.", levelId: 18 },
    { word: "許可", meaningsFr: ["Permission"], readings: ["きょか"], mnemonicFr: "La PERMISSION.", levelId: 18 },
    // 枚 vocabulary
    { word: "一枚", meaningsFr: ["Une feuille"], readings: ["いちまい"], mnemonicFr: "UNE FEUILLE.", levelId: 18 },
    // 静 vocabulary
    { word: "静か", meaningsFr: ["Calme"], readings: ["しずか"], mnemonicFr: "CALME.", levelId: 18 },
    { word: "静まる", meaningsFr: ["Se calmer"], readings: ["しずまる"], mnemonicFr: "SE CALMER.", levelId: 18 },
    // 句 vocabulary
    { word: "文句", meaningsFr: ["Plainte"], readings: ["もんく"], mnemonicFr: "Une PLAINTE.", levelId: 18 },
    { word: "俳句", meaningsFr: ["Haïku"], readings: ["はいく"], mnemonicFr: "Un HAÏKU.", levelId: 18 },
    // 禁 vocabulary
    { word: "禁止", meaningsFr: ["Interdit"], readings: ["きんし"], mnemonicFr: "INTERDIT.", levelId: 18 },
    { word: "禁煙", meaningsFr: ["Non-fumeur"], readings: ["きんえん"], mnemonicFr: "NON-FUMEUR.", levelId: 18 },
    // 喫 vocabulary
    { word: "喫茶店", meaningsFr: ["Café"], readings: ["きっさてん"], mnemonicFr: "Un CAFÉ.", levelId: 18 },
    // 煙 vocabulary
    { word: "煙", meaningsFr: ["Fumée"], readings: ["けむり"], mnemonicFr: "La FUMÉE.", levelId: 18 },
    { word: "喫煙", meaningsFr: ["Fumeur"], readings: ["きつえん"], mnemonicFr: "FUMEUR.", levelId: 18 },
    // Additional common words
    { word: "伝達", meaningsFr: ["Communication"], readings: ["でんたつ"], mnemonicFr: "La COMMUNICATION.", levelId: 18 },
    { word: "到達", meaningsFr: ["Atteindre"], readings: ["とうたつ"], mnemonicFr: "ATTEINDRE.", levelId: 18 },
    { word: "上達", meaningsFr: ["Progrès"], readings: ["じょうたつ"], mnemonicFr: "Le PROGRÈS.", levelId: 18 },
    { word: "分類", meaningsFr: ["Classification"], readings: ["ぶんるい"], mnemonicFr: "La CLASSIFICATION.", levelId: 18 },
    { word: "親類", meaningsFr: ["Parenté"], readings: ["しんるい"], mnemonicFr: "La PARENTÉ.", levelId: 18 },
    { word: "衣類", meaningsFr: ["Vêtements"], readings: ["いるい"], mnemonicFr: "Les VÊTEMENTS.", levelId: 18 },
    { word: "報酬", meaningsFr: ["Rémunération"], readings: ["ほうしゅう"], mnemonicFr: "La RÉMUNÉRATION.", levelId: 18 },
    { word: "一等", meaningsFr: ["Première classe"], readings: ["いっとう"], mnemonicFr: "PREMIÈRE CLASSE.", levelId: 18 },
    { word: "二等", meaningsFr: ["Deuxième classe"], readings: ["にとう"], mnemonicFr: "DEUXIÈME CLASSE.", levelId: 18 },
    { word: "高等", meaningsFr: ["Supérieur"], readings: ["こうとう"], mnemonicFr: "SUPÉRIEUR.", levelId: 18 },
  ];

  for (const vocab of level18Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 18 supplementary vocab complete! Added", level18Vocab.length, "words");

  // ============================================
  // LEVEL 19 - Supplementary Vocabulary
  // Kanji: 加節減順容布易財若詞昆閥歴舌冊宇宙忙履団暴混乱徒得改続連善絡比笛史
  // ============================================

  const level19Vocab = [
    // 加 vocabulary
    { word: "参加", meaningsFr: ["Participation"], readings: ["さんか"], mnemonicFr: "La PARTICIPATION.", levelId: 19 },
    { word: "追加", meaningsFr: ["Ajout"], readings: ["ついか"], mnemonicFr: "L'AJOUT.", levelId: 19 },
    { word: "加える", meaningsFr: ["Ajouter"], readings: ["くわえる"], mnemonicFr: "AJOUTER.", levelId: 19 },
    { word: "増加", meaningsFr: ["Augmentation"], readings: ["ぞうか"], mnemonicFr: "L'AUGMENTATION.", levelId: 19 },
    // 節 vocabulary
    { word: "季節", meaningsFr: ["Saison"], readings: ["きせつ"], mnemonicFr: "La SAISON.", levelId: 19 },
    { word: "節約", meaningsFr: ["Économie"], readings: ["せつやく"], mnemonicFr: "L'ÉCONOMIE.", levelId: 19 },
    // 減 vocabulary
    { word: "減る", meaningsFr: ["Diminuer"], readings: ["へる"], mnemonicFr: "DIMINUER.", levelId: 19 },
    { word: "減らす", meaningsFr: ["Réduire"], readings: ["へらす"], mnemonicFr: "RÉDUIRE.", levelId: 19 },
    { word: "減少", meaningsFr: ["Diminution"], readings: ["げんしょう"], mnemonicFr: "La DIMINUTION.", levelId: 19 },
    // 順 vocabulary
    { word: "順番", meaningsFr: ["Tour", "Ordre"], readings: ["じゅんばん"], mnemonicFr: "L'ORDRE.", levelId: 19 },
    { word: "順序", meaningsFr: ["Séquence"], readings: ["じゅんじょ"], mnemonicFr: "La SÉQUENCE.", levelId: 19 },
    { word: "順調", meaningsFr: ["Sans problème"], readings: ["じゅんちょう"], mnemonicFr: "SANS PROBLÈME.", levelId: 19 },
    // 容 vocabulary
    { word: "内容", meaningsFr: ["Contenu"], readings: ["ないよう"], mnemonicFr: "Le CONTENU.", levelId: 19 },
    { word: "容易", meaningsFr: ["Facile"], readings: ["ようい"], mnemonicFr: "FACILE.", levelId: 19 },
    // 布 vocabulary
    { word: "布", meaningsFr: ["Tissu"], readings: ["ぬの"], mnemonicFr: "Le TISSU.", levelId: 19 },
    { word: "布団", meaningsFr: ["Futon"], readings: ["ふとん"], mnemonicFr: "Le FUTON.", levelId: 19 },
    { word: "毛布", meaningsFr: ["Couverture"], readings: ["もうふ"], mnemonicFr: "La COUVERTURE.", levelId: 19 },
    // 易 vocabulary
    { word: "簡易", meaningsFr: ["Simple"], readings: ["かんい"], mnemonicFr: "SIMPLE.", levelId: 19 },
    { word: "安易", meaningsFr: ["Facile"], readings: ["あんい"], mnemonicFr: "FACILE.", levelId: 19 },
    { word: "貿易", meaningsFr: ["Commerce"], readings: ["ぼうえき"], mnemonicFr: "Le COMMERCE.", levelId: 19 },
    // 財 vocabulary
    { word: "財布", meaningsFr: ["Portefeuille"], readings: ["さいふ"], mnemonicFr: "Le PORTEFEUILLE.", levelId: 19 },
    { word: "財産", meaningsFr: ["Fortune"], readings: ["ざいさん"], mnemonicFr: "La FORTUNE.", levelId: 19 },
    // 若 vocabulary
    { word: "若い", meaningsFr: ["Jeune"], readings: ["わかい"], mnemonicFr: "JEUNE.", levelId: 19 },
    { word: "若者", meaningsFr: ["Jeune personne"], readings: ["わかもの"], mnemonicFr: "La JEUNE PERSONNE.", levelId: 19 },
    // 詞 vocabulary
    { word: "歌詞", meaningsFr: ["Paroles"], readings: ["かし"], mnemonicFr: "Les PAROLES.", levelId: 19 },
    { word: "名詞", meaningsFr: ["Nom"], readings: ["めいし"], mnemonicFr: "Le NOM.", levelId: 19 },
    { word: "動詞", meaningsFr: ["Verbe"], readings: ["どうし"], mnemonicFr: "Le VERBE.", levelId: 19 },
    // 歴 vocabulary
    { word: "歴史", meaningsFr: ["Histoire"], readings: ["れきし"], mnemonicFr: "L'HISTOIRE.", levelId: 19 },
    { word: "履歴", meaningsFr: ["Parcours"], readings: ["りれき"], mnemonicFr: "Le PARCOURS.", levelId: 19 },
    // 舌 vocabulary
    { word: "舌", meaningsFr: ["Langue"], readings: ["した"], mnemonicFr: "La LANGUE.", levelId: 19 },
    // 冊 vocabulary
    { word: "一冊", meaningsFr: ["Un livre"], readings: ["いっさつ"], mnemonicFr: "UN LIVRE.", levelId: 19 },
    // 宇 vocabulary
    { word: "宇宙", meaningsFr: ["Espace"], readings: ["うちゅう"], mnemonicFr: "L'ESPACE.", levelId: 19 },
    // 宙 vocabulary
    { word: "宇宙人", meaningsFr: ["Extraterrestre"], readings: ["うちゅうじん"], mnemonicFr: "L'EXTRATERRESTRE.", levelId: 19 },
    // 忙 vocabulary
    { word: "忙しい", meaningsFr: ["Occupé"], readings: ["いそがしい"], mnemonicFr: "OCCUPÉ.", levelId: 19 },
    // 履 vocabulary
    { word: "履く", meaningsFr: ["Mettre (chaussures)"], readings: ["はく"], mnemonicFr: "METTRE des chaussures.", levelId: 19 },
    { word: "履歴書", meaningsFr: ["CV"], readings: ["りれきしょ"], mnemonicFr: "Le CV.", levelId: 19 },
    // 団 vocabulary
    { word: "団体", meaningsFr: ["Groupe"], readings: ["だんたい"], mnemonicFr: "Le GROUPE.", levelId: 19 },
    { word: "集団", meaningsFr: ["Collectif"], readings: ["しゅうだん"], mnemonicFr: "Le COLLECTIF.", levelId: 19 },
    // 暴 vocabulary
    { word: "暴力", meaningsFr: ["Violence"], readings: ["ぼうりょく"], mnemonicFr: "La VIOLENCE.", levelId: 19 },
    // 混 vocabulary
    { word: "混ぜる", meaningsFr: ["Mélanger"], readings: ["まぜる"], mnemonicFr: "MÉLANGER.", levelId: 19 },
    { word: "混雑", meaningsFr: ["Encombrement"], readings: ["こんざつ"], mnemonicFr: "L'ENCOMBREMENT.", levelId: 19 },
    // 乱 vocabulary
    { word: "乱れる", meaningsFr: ["Se désorganiser"], readings: ["みだれる"], mnemonicFr: "SE DÉSORGANISER.", levelId: 19 },
    { word: "混乱", meaningsFr: ["Confusion"], readings: ["こんらん"], mnemonicFr: "La CONFUSION.", levelId: 19 },
    // 徒 vocabulary
    { word: "生徒", meaningsFr: ["Élève"], readings: ["せいと"], mnemonicFr: "Un ÉLÈVE.", levelId: 19 },
    { word: "徒歩", meaningsFr: ["À pied"], readings: ["とほ"], mnemonicFr: "À PIED.", levelId: 19 },
    // 得 vocabulary
    { word: "得る", meaningsFr: ["Obtenir"], readings: ["える"], mnemonicFr: "OBTENIR.", levelId: 19 },
    { word: "得意", meaningsFr: ["Fort en"], readings: ["とくい"], mnemonicFr: "FORT EN.", levelId: 19 },
    { word: "納得", meaningsFr: ["Compréhension"], readings: ["なっとく"], mnemonicFr: "La COMPRÉHENSION.", levelId: 19 },
    // 改 vocabulary
    { word: "改める", meaningsFr: ["Corriger"], readings: ["あらためる"], mnemonicFr: "CORRIGER.", levelId: 19 },
    { word: "改善", meaningsFr: ["Amélioration"], readings: ["かいぜん"], mnemonicFr: "L'AMÉLIORATION.", levelId: 19 },
    { word: "改札", meaningsFr: ["Portillon"], readings: ["かいさつ"], mnemonicFr: "Le PORTILLON.", levelId: 19 },
    // 続 vocabulary
    { word: "続く", meaningsFr: ["Continuer"], readings: ["つづく"], mnemonicFr: "CONTINUER.", levelId: 19 },
    { word: "続ける", meaningsFr: ["Poursuivre"], readings: ["つづける"], mnemonicFr: "POURSUIVRE.", levelId: 19 },
    { word: "継続", meaningsFr: ["Continuation"], readings: ["けいぞく"], mnemonicFr: "La CONTINUATION.", levelId: 19 },
    // 連 vocabulary
    { word: "連絡", meaningsFr: ["Contact"], readings: ["れんらく"], mnemonicFr: "Le CONTACT.", levelId: 19 },
    { word: "連休", meaningsFr: ["Jours de congé consécutifs"], readings: ["れんきゅう"], mnemonicFr: "Les JOURS DE CONGÉ CONSÉCUTIFS.", levelId: 19 },
    // 善 vocabulary
    { word: "善い", meaningsFr: ["Bon"], readings: ["よい"], mnemonicFr: "BON.", levelId: 19 },
    { word: "改善", meaningsFr: ["Amélioration"], readings: ["かいぜん"], mnemonicFr: "L'AMÉLIORATION.", levelId: 19 },
    // 絡 vocabulary
    { word: "連絡先", meaningsFr: ["Coordonnées"], readings: ["れんらくさき"], mnemonicFr: "Les COORDONNÉES.", levelId: 19 },
    // 比 vocabulary
    { word: "比べる", meaningsFr: ["Comparer"], readings: ["くらべる"], mnemonicFr: "COMPARER.", levelId: 19 },
    { word: "比較", meaningsFr: ["Comparaison"], readings: ["ひかく"], mnemonicFr: "La COMPARAISON.", levelId: 19 },
    // 笛 vocabulary
    { word: "笛", meaningsFr: ["Flûte"], readings: ["ふえ"], mnemonicFr: "La FLÛTE.", levelId: 19 },
    // 史 vocabulary
    { word: "歴史", meaningsFr: ["Histoire"], readings: ["れきし"], mnemonicFr: "L'HISTOIRE.", levelId: 19 },
    { word: "史上", meaningsFr: ["Dans l'histoire"], readings: ["しじょう"], mnemonicFr: "DANS L'HISTOIRE.", levelId: 19 },
  ];

  for (const vocab of level19Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 19 supplementary vocab complete! Added", level19Vocab.length, "words");

  // ============================================
  // LEVEL 20 - Supplementary Vocabulary
  // Kanji: 困災機率飛害余難妨被裕震尻尾械確嫌個圧在夢産倒臭厚妻議犯罪防穴論経
  // ============================================

  const level20Vocab = [
    // 困 vocabulary
    { word: "困る", meaningsFr: ["Être embarrassé"], readings: ["こまる"], mnemonicFr: "ÊTRE EMBARRASSÉ.", levelId: 20 },
    { word: "困難", meaningsFr: ["Difficulté"], readings: ["こんなん"], mnemonicFr: "La DIFFICULTÉ.", levelId: 20 },
    // 災 vocabulary
    { word: "災害", meaningsFr: ["Catastrophe"], readings: ["さいがい"], mnemonicFr: "La CATASTROPHE.", levelId: 20 },
    { word: "天災", meaningsFr: ["Catastrophe naturelle"], readings: ["てんさい"], mnemonicFr: "La CATASTROPHE NATURELLE.", levelId: 20 },
    { word: "火災", meaningsFr: ["Incendie"], readings: ["かさい"], mnemonicFr: "L'INCENDIE.", levelId: 20 },
    // 機 vocabulary
    { word: "機会", meaningsFr: ["Occasion"], readings: ["きかい"], mnemonicFr: "L'OCCASION.", levelId: 20 },
    { word: "機械", meaningsFr: ["Machine"], readings: ["きかい"], mnemonicFr: "La MACHINE.", levelId: 20 },
    { word: "飛行機", meaningsFr: ["Avion"], readings: ["ひこうき"], mnemonicFr: "L'AVION.", levelId: 20 },
    { word: "携帯機", meaningsFr: ["Appareil portable"], readings: ["けいたいき"], mnemonicFr: "L'APPAREIL PORTABLE.", levelId: 20 },
    // 率 vocabulary
    { word: "確率", meaningsFr: ["Probabilité"], readings: ["かくりつ"], mnemonicFr: "La PROBABILITÉ.", levelId: 20 },
    { word: "効率", meaningsFr: ["Efficacité"], readings: ["こうりつ"], mnemonicFr: "L'EFFICACITÉ.", levelId: 20 },
    // 飛 vocabulary
    { word: "飛ぶ", meaningsFr: ["Voler"], readings: ["とぶ"], mnemonicFr: "VOLER.", levelId: 20 },
    { word: "飛行", meaningsFr: ["Vol"], readings: ["ひこう"], mnemonicFr: "Le VOL.", levelId: 20 },
    // 害 vocabulary
    { word: "被害", meaningsFr: ["Dégâts"], readings: ["ひがい"], mnemonicFr: "Les DÉGÂTS.", levelId: 20 },
    { word: "害", meaningsFr: ["Mal"], readings: ["がい"], mnemonicFr: "Le MAL.", levelId: 20 },
    // 余 vocabulary
    { word: "余る", meaningsFr: ["Rester"], readings: ["あまる"], mnemonicFr: "RESTER.", levelId: 20 },
    { word: "余裕", meaningsFr: ["Marge"], readings: ["よゆう"], mnemonicFr: "La MARGE.", levelId: 20 },
    // 難 vocabulary
    { word: "難しい", meaningsFr: ["Difficile"], readings: ["むずかしい"], mnemonicFr: "DIFFICILE.", levelId: 20 },
    { word: "困難", meaningsFr: ["Difficulté"], readings: ["こんなん"], mnemonicFr: "La DIFFICULTÉ.", levelId: 20 },
    { word: "避難", meaningsFr: ["Évacuation"], readings: ["ひなん"], mnemonicFr: "L'ÉVACUATION.", levelId: 20 },
    // 被 vocabulary
    { word: "被る", meaningsFr: ["Porter (chapeau)"], readings: ["かぶる"], mnemonicFr: "PORTER un chapeau.", levelId: 20 },
    { word: "被害者", meaningsFr: ["Victime"], readings: ["ひがいしゃ"], mnemonicFr: "La VICTIME.", levelId: 20 },
    // 震 vocabulary
    { word: "地震", meaningsFr: ["Tremblement de terre"], readings: ["じしん"], mnemonicFr: "Le TREMBLEMENT DE TERRE.", levelId: 20 },
    { word: "震える", meaningsFr: ["Trembler"], readings: ["ふるえる"], mnemonicFr: "TREMBLER.", levelId: 20 },
    // 尻 vocabulary
    { word: "尻", meaningsFr: ["Fesses"], readings: ["しり"], mnemonicFr: "Les FESSES.", levelId: 20 },
    // 尾 vocabulary
    { word: "尾", meaningsFr: ["Queue"], readings: ["お"], mnemonicFr: "La QUEUE.", levelId: 20 },
    // 械 vocabulary
    { word: "機械", meaningsFr: ["Machine"], readings: ["きかい"], mnemonicFr: "La MACHINE.", levelId: 20 },
    // 確 vocabulary
    { word: "確かめる", meaningsFr: ["Vérifier"], readings: ["たしかめる"], mnemonicFr: "VÉRIFIER.", levelId: 20 },
    { word: "確認", meaningsFr: ["Confirmation"], readings: ["かくにん"], mnemonicFr: "La CONFIRMATION.", levelId: 20 },
    { word: "確実", meaningsFr: ["Certain"], readings: ["かくじつ"], mnemonicFr: "CERTAIN.", levelId: 20 },
    // 嫌 vocabulary
    { word: "嫌い", meaningsFr: ["Détester"], readings: ["きらい"], mnemonicFr: "DÉTESTER.", levelId: 20 },
    { word: "嫌な", meaningsFr: ["Désagréable"], readings: ["いやな"], mnemonicFr: "DÉSAGRÉABLE.", levelId: 20 },
    // 個 vocabulary
    { word: "個人", meaningsFr: ["Individu"], readings: ["こじん"], mnemonicFr: "L'INDIVIDU.", levelId: 20 },
    { word: "一個", meaningsFr: ["Un (compteur)"], readings: ["いっこ"], mnemonicFr: "UN (compteur).", levelId: 20 },
    // 圧 vocabulary
    { word: "圧力", meaningsFr: ["Pression"], readings: ["あつりょく"], mnemonicFr: "La PRESSION.", levelId: 20 },
    { word: "血圧", meaningsFr: ["Tension artérielle"], readings: ["けつあつ"], mnemonicFr: "La TENSION ARTÉRIELLE.", levelId: 20 },
    // 在 vocabulary
    { word: "存在", meaningsFr: ["Existence"], readings: ["そんざい"], mnemonicFr: "L'EXISTENCE.", levelId: 20 },
    { word: "現在", meaningsFr: ["Présent"], readings: ["げんざい"], mnemonicFr: "Le PRÉSENT.", levelId: 20 },
    // 夢 vocabulary
    { word: "夢", meaningsFr: ["Rêve"], readings: ["ゆめ"], mnemonicFr: "Le RÊVE.", levelId: 20 },
    { word: "夢中", meaningsFr: ["Absorbé"], readings: ["むちゅう"], mnemonicFr: "ABSORBÉ.", levelId: 20 },
    // 産 vocabulary
    { word: "生産", meaningsFr: ["Production"], readings: ["せいさん"], mnemonicFr: "La PRODUCTION.", levelId: 20 },
    { word: "産業", meaningsFr: ["Industrie"], readings: ["さんぎょう"], mnemonicFr: "L'INDUSTRIE.", levelId: 20 },
    { word: "出産", meaningsFr: ["Accouchement"], readings: ["しゅっさん"], mnemonicFr: "L'ACCOUCHEMENT.", levelId: 20 },
    // 倒 vocabulary
    { word: "倒れる", meaningsFr: ["Tomber"], readings: ["たおれる"], mnemonicFr: "TOMBER.", levelId: 20 },
    { word: "倒す", meaningsFr: ["Renverser"], readings: ["たおす"], mnemonicFr: "RENVERSER.", levelId: 20 },
    // 臭 vocabulary
    { word: "臭い", meaningsFr: ["Puant"], readings: ["くさい"], mnemonicFr: "PUANT.", levelId: 20 },
    // 厚 vocabulary
    { word: "厚い", meaningsFr: ["Épais"], readings: ["あつい"], mnemonicFr: "ÉPAIS.", levelId: 20 },
    // 妻 vocabulary
    { word: "妻", meaningsFr: ["Épouse"], readings: ["つま"], mnemonicFr: "L'ÉPOUSE.", levelId: 20 },
    { word: "夫妻", meaningsFr: ["Couple"], readings: ["ふさい"], mnemonicFr: "Le COUPLE.", levelId: 20 },
    // 議 vocabulary
    { word: "会議", meaningsFr: ["Réunion"], readings: ["かいぎ"], mnemonicFr: "La RÉUNION.", levelId: 20 },
    { word: "議論", meaningsFr: ["Discussion"], readings: ["ぎろん"], mnemonicFr: "La DISCUSSION.", levelId: 20 },
    // 犯 vocabulary
    { word: "犯人", meaningsFr: ["Criminel"], readings: ["はんにん"], mnemonicFr: "Le CRIMINEL.", levelId: 20 },
    { word: "犯罪", meaningsFr: ["Crime"], readings: ["はんざい"], mnemonicFr: "Le CRIME.", levelId: 20 },
    // 罪 vocabulary
    { word: "罪", meaningsFr: ["Péché"], readings: ["つみ"], mnemonicFr: "Le PÉCHÉ.", levelId: 20 },
    // 防 vocabulary
    { word: "予防", meaningsFr: ["Prévention"], readings: ["よぼう"], mnemonicFr: "La PRÉVENTION.", levelId: 20 },
    { word: "防ぐ", meaningsFr: ["Protéger"], readings: ["ふせぐ"], mnemonicFr: "PROTÉGER.", levelId: 20 },
    // 穴 vocabulary
    { word: "穴", meaningsFr: ["Trou"], readings: ["あな"], mnemonicFr: "Le TROU.", levelId: 20 },
    // 論 vocabulary
    { word: "論文", meaningsFr: ["Thèse"], readings: ["ろんぶん"], mnemonicFr: "La THÈSE.", levelId: 20 },
    { word: "理論", meaningsFr: ["Théorie"], readings: ["りろん"], mnemonicFr: "La THÉORIE.", levelId: 20 },
    { word: "結論", meaningsFr: ["Conclusion"], readings: ["けつろん"], mnemonicFr: "La CONCLUSION.", levelId: 20 },
    // 経 vocabulary
    { word: "経験", meaningsFr: ["Expérience"], readings: ["けいけん"], mnemonicFr: "L'EXPÉRIENCE.", levelId: 20 },
    { word: "経済", meaningsFr: ["Économie"], readings: ["けいざい"], mnemonicFr: "L'ÉCONOMIE.", levelId: 20 },
    { word: "経営", meaningsFr: ["Gestion"], readings: ["けいえい"], mnemonicFr: "La GESTION.", levelId: 20 },
    { word: "経由", meaningsFr: ["Via"], readings: ["けいゆ"], mnemonicFr: "VIA.", levelId: 20 },
    // Additional common words for level 20
    { word: "正確", meaningsFr: ["Exact"], readings: ["せいかく"], mnemonicFr: "EXACT.", levelId: 20 },
    { word: "的確", meaningsFr: ["Précis"], readings: ["てきかく"], mnemonicFr: "PRÉCIS.", levelId: 20 },
    { word: "明確", meaningsFr: ["Clair"], readings: ["めいかく"], mnemonicFr: "CLAIR.", levelId: 20 },
    { word: "個々", meaningsFr: ["Chacun"], readings: ["ここ"], mnemonicFr: "CHACUN.", levelId: 20 },
    { word: "悪夢", meaningsFr: ["Cauchemar"], readings: ["あくむ"], mnemonicFr: "Le CAUCHEMAR.", levelId: 20 },
  ];

  for (const vocab of level20Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  console.log("Level 20 supplementary vocab complete! Added", level20Vocab.length, "words");

  console.log("All supplementary vocabulary for levels 11-20 complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
