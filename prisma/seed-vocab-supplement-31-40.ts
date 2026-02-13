import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding supplementary vocabulary to levels 31-40...");

  // ============================================
  // LEVEL 31 - Supplementary Vocabulary
  // JLPT N2/N1 - Advanced compound words, formal/business vocabulary
  // ============================================

  const level31Vocab = [
    // Politics & Government
    { word: "政治", meaningsFr: ["Politique"], readings: ["せいじ"], mnemonicFr: "La POLITIQUE gouvernementale.", levelId: 31 },
    { word: "政府", meaningsFr: ["Gouvernement"], readings: ["せいふ"], mnemonicFr: "Le GOUVERNEMENT central.", levelId: 31 },
    { word: "政策", meaningsFr: ["Politique (mesures)"], readings: ["せいさく"], mnemonicFr: "Les MESURES POLITIQUES.", levelId: 31 },
    { word: "政党", meaningsFr: ["Parti politique"], readings: ["せいとう"], mnemonicFr: "Un PARTI POLITIQUE.", levelId: 31 },
    { word: "行政", meaningsFr: ["Administration"], readings: ["ぎょうせい"], mnemonicFr: "L'ADMINISTRATION publique.", levelId: 31 },
    { word: "財政", meaningsFr: ["Finances publiques"], readings: ["ざいせい"], mnemonicFr: "Les FINANCES PUBLIQUES.", levelId: 31 },
    // Separation & Distance
    { word: "離婚", meaningsFr: ["Divorce"], readings: ["りこん"], mnemonicFr: "Le DIVORCE, la séparation.", levelId: 31 },
    { word: "離れる", meaningsFr: ["S'éloigner", "Se séparer"], readings: ["はなれる"], mnemonicFr: "S'ÉLOIGNER, SE SÉPARER.", levelId: 31 },
    { word: "分離", meaningsFr: ["Séparation"], readings: ["ぶんり"], mnemonicFr: "La SÉPARATION physique.", levelId: 31 },
    { word: "隔離", meaningsFr: ["Isolement", "Quarantaine"], readings: ["かくり"], mnemonicFr: "L'ISOLEMENT, la QUARANTAINE.", levelId: 31 },
    { word: "距離", meaningsFr: ["Distance"], readings: ["きょり"], mnemonicFr: "La DISTANCE entre deux points.", levelId: 31 },
    // Fusion & Harmony
    { word: "融合", meaningsFr: ["Fusion"], readings: ["ゆうごう"], mnemonicFr: "La FUSION de deux elements.", levelId: 31 },
    { word: "金融", meaningsFr: ["Finance"], readings: ["きんゆう"], mnemonicFr: "La FINANCE, le secteur financier.", levelId: 31 },
    { word: "融資", meaningsFr: ["Financement", "Pret"], readings: ["ゆうし"], mnemonicFr: "Le FINANCEMENT, le PRET.", levelId: 31 },
    { word: "融通", meaningsFr: ["Flexibilite", "Accommodation"], readings: ["ゆうずう"], mnemonicFr: "La FLEXIBILITE, s'accommoder.", levelId: 31 },
    // Editing & Publishing
    { word: "編集", meaningsFr: ["Edition", "Compilation"], readings: ["へんしゅう"], mnemonicFr: "L'EDITION d'un texte.", levelId: 31 },
    { word: "編成", meaningsFr: ["Organisation", "Formation"], readings: ["へんせい"], mnemonicFr: "L'ORGANISATION, la FORMATION.", levelId: 31 },
    { word: "編む", meaningsFr: ["Tricoter", "Tresser"], readings: ["あむ"], mnemonicFr: "TRICOTER, TRESSER.", levelId: 31 },
    { word: "長編", meaningsFr: ["Long metrage", "Roman"], readings: ["ちょうへん"], mnemonicFr: "Un LONG METRAGE, un roman.", levelId: 31 },
    { word: "短編", meaningsFr: ["Court metrage", "Nouvelle"], readings: ["たんぺん"], mnemonicFr: "Un COURT METRAGE, une nouvelle.", levelId: 31 },
    // Splendor & Beauty
    { word: "華やか", meaningsFr: ["Brillant", "Splendide"], readings: ["はなやか"], mnemonicFr: "BRILLANT et SPLENDIDE.", levelId: 31 },
    { word: "豪華", meaningsFr: ["Luxueux", "Somptueux"], readings: ["ごうか"], mnemonicFr: "LUXUEUX et SOMPTUEUX.", levelId: 31 },
    { word: "中華", meaningsFr: ["Chinois (cuisine)"], readings: ["ちゅうか"], mnemonicFr: "La cuisine CHINOISE.", levelId: 31 },
    { word: "文化", meaningsFr: ["Culture"], readings: ["ぶんか"], mnemonicFr: "La CULTURE.", levelId: 31 },
    // Already & Accomplished
    { word: "既に", meaningsFr: ["Deja"], readings: ["すでに"], mnemonicFr: "C'est DEJA fait.", levelId: 31 },
    { word: "既存", meaningsFr: ["Existant", "Preexistant"], readings: ["きそん"], mnemonicFr: "EXISTANT, PREEXISTANT.", levelId: 31 },
    { word: "既婚", meaningsFr: ["Marie"], readings: ["きこん"], mnemonicFr: "MARIE (etat civil).", levelId: 31 },
    { word: "既成", meaningsFr: ["Etabli", "Conventionnel"], readings: ["きせい"], mnemonicFr: "ETABLI, CONVENTIONNEL.", levelId: 31 },
    // Universal & General
    { word: "普通", meaningsFr: ["Normal", "Ordinaire"], readings: ["ふつう"], mnemonicFr: "NORMAL, ORDINAIRE.", levelId: 31 },
    { word: "普及", meaningsFr: ["Diffusion", "Propagation"], readings: ["ふきゅう"], mnemonicFr: "La DIFFUSION, la PROPAGATION.", levelId: 31 },
    { word: "普段", meaningsFr: ["Habituellement"], readings: ["ふだん"], mnemonicFr: "HABITUELLEMENT, d'ordinaire.", levelId: 31 },
    { word: "普遍", meaningsFr: ["Universel"], readings: ["ふへん"], mnemonicFr: "UNIVERSEL, partout.", levelId: 31 },
    // Power & Magnificence
    { word: "豪邸", meaningsFr: ["Manoir", "Grande maison"], readings: ["ごうてい"], mnemonicFr: "Un MANOIR luxueux.", levelId: 31 },
    { word: "豪雨", meaningsFr: ["Pluie torrentielle"], readings: ["ごうう"], mnemonicFr: "Une PLUIE TORRENTIELLE.", levelId: 31 },
    { word: "豪快", meaningsFr: ["Magnifique", "Grandiose"], readings: ["ごうかい"], mnemonicFr: "MAGNIFIQUE et GRANDIOSE.", levelId: 31 },
    // Mirror & Model
    { word: "鑑賞", meaningsFr: ["Appreciation", "Contemplation"], readings: ["かんしょう"], mnemonicFr: "L'APPRECIATION artistique.", levelId: 31 },
    { word: "鑑定", meaningsFr: ["Expertise", "Evaluation"], readings: ["かんてい"], mnemonicFr: "L'EXPERTISE, l'EVALUATION.", levelId: 31 },
    { word: "年鑑", meaningsFr: ["Annuaire"], readings: ["ねんかん"], mnemonicFr: "L'ANNUAIRE annuel.", levelId: 31 },
    // Removal & Exclusion
    { word: "除く", meaningsFr: ["Enlever", "Exclure"], readings: ["のぞく"], mnemonicFr: "ENLEVER, EXCLURE.", levelId: 31 },
    { word: "除外", meaningsFr: ["Exclusion"], readings: ["じょがい"], mnemonicFr: "L'EXCLUSION.", levelId: 31 },
    { word: "削除", meaningsFr: ["Suppression"], readings: ["さくじょ"], mnemonicFr: "La SUPPRESSION.", levelId: 31 },
    { word: "解除", meaningsFr: ["Levee", "Annulation"], readings: ["かいじょ"], mnemonicFr: "La LEVEE, l'ANNULATION.", levelId: 31 },
    { word: "免除", meaningsFr: ["Exemption"], readings: ["めんじょ"], mnemonicFr: "L'EXEMPTION.", levelId: 31 },
    // Search & Inquiry
    { word: "尋ねる", meaningsFr: ["Demander", "Chercher"], readings: ["たずねる"], mnemonicFr: "DEMANDER, CHERCHER.", levelId: 31 },
    { word: "尋常", meaningsFr: ["Ordinaire", "Normal"], readings: ["じんじょう"], mnemonicFr: "ORDINAIRE, NORMAL.", levelId: 31 },
    // Quantity & Some
    { word: "幾つ", meaningsFr: ["Combien"], readings: ["いくつ"], mnemonicFr: "COMBIEN y en a-t-il?", levelId: 31 },
    { word: "幾ら", meaningsFr: ["Combien (prix)"], readings: ["いくら"], mnemonicFr: "COMBIEN ca coute?", levelId: 31 },
    { word: "幾何学", meaningsFr: ["Geometrie"], readings: ["きかがく"], mnemonicFr: "La GEOMETRIE.", levelId: 31 },
    { word: "幾度", meaningsFr: ["Combien de fois"], readings: ["いくど"], mnemonicFr: "COMBIEN DE FOIS.", levelId: 31 },
    // Corridor & Path
    { word: "廊下", meaningsFr: ["Couloir"], readings: ["ろうか"], mnemonicFr: "Le COULOIR.", levelId: 31 },
    { word: "回廊", meaningsFr: ["Galerie", "Cloitre"], readings: ["かいろう"], mnemonicFr: "La GALERIE, le CLOITRE.", levelId: 31 },
    // Cleaning
    { word: "掃除", meaningsFr: ["Nettoyage"], readings: ["そうじ"], mnemonicFr: "Le NETTOYAGE.", levelId: 31 },
    { word: "清掃", meaningsFr: ["Nettoyage (formel)"], readings: ["せいそう"], mnemonicFr: "Le NETTOYAGE (formel).", levelId: 31 },
    { word: "掃く", meaningsFr: ["Balayer"], readings: ["はく"], mnemonicFr: "BALAYER le sol.", levelId: 31 },
    // Mud & Earth
    { word: "泥棒", meaningsFr: ["Voleur", "Cambrioleur"], readings: ["どろぼう"], mnemonicFr: "Un VOLEUR, un CAMBRIOLEUR.", levelId: 31 },
    { word: "泥沼", meaningsFr: ["Bourbier"], readings: ["どろぬま"], mnemonicFr: "Un BOURBIER.", levelId: 31 },
    // Stick & Bar
    { word: "棒グラフ", meaningsFr: ["Diagramme en barres"], readings: ["ぼうグラフ"], mnemonicFr: "Un DIAGRAMME EN BARRES.", levelId: 31 },
    { word: "鉄棒", meaningsFr: ["Barre de fer"], readings: ["てつぼう"], mnemonicFr: "Une BARRE DE FER.", levelId: 31 },
    // Surprise
    { word: "驚く", meaningsFr: ["Etre surpris"], readings: ["おどろく"], mnemonicFr: "Etre SURPRIS.", levelId: 31 },
    { word: "驚異", meaningsFr: ["Merveille", "Prodige"], readings: ["きょうい"], mnemonicFr: "Une MERVEILLE, un PRODIGE.", levelId: 31 },
    { word: "驚嘆", meaningsFr: ["Emerveillement"], readings: ["きょうたん"], mnemonicFr: "L'EMERVEILLEMENT.", levelId: 31 },
    // Sigh & Lament
    { word: "嘆く", meaningsFr: ["Se lamenter", "Deplorer"], readings: ["なげく"], mnemonicFr: "SE LAMENTER, DEPLORER.", levelId: 31 },
    { word: "感嘆", meaningsFr: ["Admiration"], readings: ["かんたん"], mnemonicFr: "L'ADMIRATION.", levelId: 31 },
    { word: "嘆願", meaningsFr: ["Supplication"], readings: ["たんがん"], mnemonicFr: "La SUPPLICATION.", levelId: 31 },
    // Warehouse
    { word: "倉庫", meaningsFr: ["Entrepot"], readings: ["そうこ"], mnemonicFr: "L'ENTREPOT.", levelId: 31 },
    // Grandchild
    { word: "子孫", meaningsFr: ["Descendant"], readings: ["しそん"], mnemonicFr: "Le DESCENDANT.", levelId: 31 },
    // Nest
    { word: "巣穴", meaningsFr: ["Terrier"], readings: ["すあな"], mnemonicFr: "Le TERRIER.", levelId: 31 },
    // Belt & Zone
    { word: "地帯", meaningsFr: ["Zone", "Region"], readings: ["ちたい"], mnemonicFr: "Une ZONE, une REGION.", levelId: 31 },
    { word: "熱帯", meaningsFr: ["Tropiques"], readings: ["ねったい"], mnemonicFr: "Les TROPIQUES.", levelId: 31 },
    { word: "携帯", meaningsFr: ["Portable"], readings: ["けいたい"], mnemonicFr: "Un PORTABLE.", levelId: 31 },
    { word: "連帯", meaningsFr: ["Solidarite"], readings: ["れんたい"], mnemonicFr: "La SOLIDARITE.", levelId: 31 },
  ];

  for (const vocab of level31Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 31 complete!", level31Vocab.length, "words");

  // ============================================
  // LEVEL 32 - Supplementary Vocabulary
  // JLPT N2/N1 - Business, abstract concepts
  // ============================================

  const level32Vocab = [
    // Path & Diameter
    { word: "直径", meaningsFr: ["Diametre"], readings: ["ちょっけい"], mnemonicFr: "Le DIAMETRE d'un cercle.", levelId: 32 },
    { word: "経由", meaningsFr: ["Via", "Par l'intermediaire"], readings: ["けいゆ"], mnemonicFr: "VIA, PAR L'INTERMEDIAIRE de.", levelId: 32 },
    { word: "半径", meaningsFr: ["Rayon"], readings: ["はんけい"], mnemonicFr: "Le RAYON d'un cercle.", levelId: 32 },
    // Rescue & Help
    { word: "救助", meaningsFr: ["Secours", "Sauvetage"], readings: ["きゅうじょ"], mnemonicFr: "Le SECOURS, le SAUVETAGE.", levelId: 32 },
    { word: "救急", meaningsFr: ["Urgences"], readings: ["きゅうきゅう"], mnemonicFr: "Les URGENCES medicales.", levelId: 32 },
    { word: "救出", meaningsFr: ["Sauvetage"], readings: ["きゅうしゅつ"], mnemonicFr: "Le SAUVETAGE.", levelId: 32 },
    { word: "救済", meaningsFr: ["Aide", "Secours"], readings: ["きゅうさい"], mnemonicFr: "L'AIDE, le SECOURS.", levelId: 32 },
    { word: "救命", meaningsFr: ["Sauvetage (vie)"], readings: ["きゅうめい"], mnemonicFr: "SAUVER UNE VIE.", levelId: 32 },
    // Scatter & Disperse
    { word: "散歩", meaningsFr: ["Promenade"], readings: ["さんぽ"], mnemonicFr: "Une PROMENADE.", levelId: 32 },
    { word: "散る", meaningsFr: ["Se disperser", "Tomber"], readings: ["ちる"], mnemonicFr: "SE DISPERSER, TOMBER.", levelId: 32 },
    { word: "散らす", meaningsFr: ["Disperser", "Eparpiller"], readings: ["ちらす"], mnemonicFr: "DISPERSER, EPARPILLER.", levelId: 32 },
    { word: "解散", meaningsFr: ["Dissolution"], readings: ["かいさん"], mnemonicFr: "La DISSOLUTION.", levelId: 32 },
    { word: "分散", meaningsFr: ["Dispersion"], readings: ["ぶんさん"], mnemonicFr: "La DISPERSION.", levelId: 32 },
    // Powder
    { word: "粉末", meaningsFr: ["Poudre"], readings: ["ふんまつ"], mnemonicFr: "La POUDRE.", levelId: 32 },
    { word: "花粉", meaningsFr: ["Pollen"], readings: ["かふん"], mnemonicFr: "Le POLLEN.", levelId: 32 },
    { word: "小麦粉", meaningsFr: ["Farine"], readings: ["こむぎこ"], mnemonicFr: "La FARINE de ble.", levelId: 32 },
    // Pulse & Vein
    { word: "脈拍", meaningsFr: ["Pouls"], readings: ["みゃくはく"], mnemonicFr: "Le POULS.", levelId: 32 },
    { word: "動脈", meaningsFr: ["Artere"], readings: ["どうみゃく"], mnemonicFr: "L'ARTERE.", levelId: 32 },
    { word: "静脈", meaningsFr: ["Veine"], readings: ["じょうみゃく"], mnemonicFr: "La VEINE.", levelId: 32 },
    { word: "山脈", meaningsFr: ["Chaine de montagnes"], readings: ["さんみゃく"], mnemonicFr: "Une CHAINE DE MONTAGNES.", levelId: 32 },
    { word: "文脈", meaningsFr: ["Contexte"], readings: ["ぶんみゃく"], mnemonicFr: "Le CONTEXTE.", levelId: 32 },
    // Vegetables
    { word: "野菜", meaningsFr: ["Legumes"], readings: ["やさい"], mnemonicFr: "Les LEGUMES.", levelId: 32 },
    { word: "菜食", meaningsFr: ["Vegetarisme"], readings: ["さいしょく"], mnemonicFr: "Le VEGETARISME.", levelId: 32 },
    // Goods & Currency
    { word: "貨物", meaningsFr: ["Marchandises", "Fret"], readings: ["かもつ"], mnemonicFr: "Les MARCHANDISES, le FRET.", levelId: 32 },
    { word: "通貨", meaningsFr: ["Monnaie", "Devise"], readings: ["つうか"], mnemonicFr: "La MONNAIE, la DEVISE.", levelId: 32 },
    { word: "硬貨", meaningsFr: ["Piece de monnaie"], readings: ["こうか"], mnemonicFr: "Une PIECE DE MONNAIE.", levelId: 32 },
    { word: "貨幣", meaningsFr: ["Monnaie"], readings: ["かへい"], mnemonicFr: "La MONNAIE.", levelId: 32 },
    // Land & Continent
    { word: "大陸", meaningsFr: ["Continent"], readings: ["たいりく"], mnemonicFr: "Un CONTINENT.", levelId: 32 },
    { word: "陸地", meaningsFr: ["Terre ferme"], readings: ["りくち"], mnemonicFr: "La TERRE FERME.", levelId: 32 },
    { word: "上陸", meaningsFr: ["Debarquement"], readings: ["じょうりく"], mnemonicFr: "Le DEBARQUEMENT.", levelId: 32 },
    { word: "着陸", meaningsFr: ["Atterrissage"], readings: ["ちゃくりく"], mnemonicFr: "L'ATTERRISSAGE.", levelId: 32 },
    // Similar
    { word: "類似", meaningsFr: ["Similarite"], readings: ["るいじ"], mnemonicFr: "La SIMILARITE.", levelId: 32 },
    { word: "似る", meaningsFr: ["Ressembler"], readings: ["にる"], mnemonicFr: "RESSEMBLER a.", levelId: 32 },
    { word: "似顔絵", meaningsFr: ["Portrait"], readings: ["にがおえ"], mnemonicFr: "Un PORTRAIT.", levelId: 32 },
    // Equal & Average
    { word: "均等", meaningsFr: ["Egal", "Uniforme"], readings: ["きんとう"], mnemonicFr: "EGAL, UNIFORME.", levelId: 32 },
    { word: "平均", meaningsFr: ["Moyenne"], readings: ["へいきん"], mnemonicFr: "La MOYENNE.", levelId: 32 },
    { word: "均衡", meaningsFr: ["Equilibre"], readings: ["きんこう"], mnemonicFr: "L'EQUILIBRE.", levelId: 32 },
    // Tomb & Grave
    { word: "墓地", meaningsFr: ["Cimetiere"], readings: ["ぼち"], mnemonicFr: "Le CIMETIERE.", levelId: 32 },
    { word: "墓参り", meaningsFr: ["Visite au cimetiere"], readings: ["はかまいり"], mnemonicFr: "VISITE AU CIMETIERE.", levelId: 32 },
    // Wealth & Rich
    { word: "豊富", meaningsFr: ["Abondant", "Riche"], readings: ["ほうふ"], mnemonicFr: "ABONDANT, RICHE.", levelId: 32 },
    { word: "富む", meaningsFr: ["Etre riche"], readings: ["とむ"], mnemonicFr: "Etre RICHE.", levelId: 32 },
    { word: "富裕", meaningsFr: ["Aise", "Fortune"], readings: ["ふゆう"], mnemonicFr: "AISE, FORTUNE.", levelId: 32 },
    // Virtue & Morality
    { word: "道徳", meaningsFr: ["Morale", "Ethique"], readings: ["どうとく"], mnemonicFr: "La MORALE, l'ETHIQUE.", levelId: 32 },
    { word: "美徳", meaningsFr: ["Vertu"], readings: ["びとく"], mnemonicFr: "La VERTU.", levelId: 32 },
    { word: "徳用", meaningsFr: ["Economique (format)"], readings: ["とくよう"], mnemonicFr: "FORMAT ECONOMIQUE.", levelId: 32 },
    // Search & Explore
    { word: "探す", meaningsFr: ["Chercher"], readings: ["さがす"], mnemonicFr: "CHERCHER quelque chose.", levelId: 32 },
    { word: "探る", meaningsFr: ["Sonder", "Explorer"], readings: ["さぐる"], mnemonicFr: "SONDER, EXPLORER.", levelId: 32 },
    { word: "探検", meaningsFr: ["Exploration"], readings: ["たんけん"], mnemonicFr: "L'EXPLORATION.", levelId: 32 },
    { word: "探偵", meaningsFr: ["Detective"], readings: ["たんてい"], mnemonicFr: "Un DETECTIVE.", levelId: 32 },
    { word: "探求", meaningsFr: ["Recherche", "Quete"], readings: ["たんきゅう"], mnemonicFr: "La RECHERCHE, la QUETE.", levelId: 32 },
    // Detective & Spy
    { word: "偵察", meaningsFr: ["Reconnaissance"], readings: ["ていさつ"], mnemonicFr: "La RECONNAISSANCE militaire.", levelId: 32 },
    // Business vocabulary
    { word: "経営", meaningsFr: ["Gestion", "Direction"], readings: ["けいえい"], mnemonicFr: "La GESTION d'entreprise.", levelId: 32 },
    { word: "経済", meaningsFr: ["Economie"], readings: ["けいざい"], mnemonicFr: "L'ECONOMIE.", levelId: 32 },
    { word: "経験", meaningsFr: ["Experience"], readings: ["けいけん"], mnemonicFr: "L'EXPERIENCE.", levelId: 32 },
    { word: "経過", meaningsFr: ["Ecoulement", "Progression"], readings: ["けいか"], mnemonicFr: "L'ECOULEMENT du temps.", levelId: 32 },
    { word: "経路", meaningsFr: ["Itineraire"], readings: ["けいろ"], mnemonicFr: "L'ITINERAIRE.", levelId: 32 },
    // Abstract concepts
    { word: "概念", meaningsFr: ["Concept", "Notion"], readings: ["がいねん"], mnemonicFr: "Le CONCEPT, la NOTION.", levelId: 32 },
    { word: "観念", meaningsFr: ["Idee", "Conception"], readings: ["かんねん"], mnemonicFr: "L'IDEE, la CONCEPTION.", levelId: 32 },
    { word: "信念", meaningsFr: ["Conviction"], readings: ["しんねん"], mnemonicFr: "La CONVICTION.", levelId: 32 },
    { word: "理念", meaningsFr: ["Ideal", "Philosophie"], readings: ["りねん"], mnemonicFr: "L'IDEAL, la PHILOSOPHIE.", levelId: 32 },
    // Formal expressions
    { word: "従って", meaningsFr: ["Par consequent"], readings: ["したがって"], mnemonicFr: "PAR CONSEQUENT.", levelId: 32 },
    { word: "即ち", meaningsFr: ["C'est-a-dire"], readings: ["すなわち"], mnemonicFr: "C'EST-A-DIRE.", levelId: 32 },
    { word: "尚", meaningsFr: ["De plus", "En outre"], readings: ["なお"], mnemonicFr: "DE PLUS, EN OUTRE.", levelId: 32 },
  ];

  for (const vocab of level32Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 32 complete!", level32Vocab.length, "words");

  // ============================================
  // LEVEL 33 - Supplementary Vocabulary
  // JLPT N2/N1 - Legal, medical, technical terms
  // ============================================

  const level33Vocab = [
    // Legal terminology
    { word: "法律", meaningsFr: ["Loi", "Droit"], readings: ["ほうりつ"], mnemonicFr: "La LOI, le DROIT.", levelId: 33 },
    { word: "法案", meaningsFr: ["Projet de loi"], readings: ["ほうあん"], mnemonicFr: "Un PROJET DE LOI.", levelId: 33 },
    { word: "違法", meaningsFr: ["Illegal"], readings: ["いほう"], mnemonicFr: "ILLEGAL.", levelId: 33 },
    { word: "合法", meaningsFr: ["Legal"], readings: ["ごうほう"], mnemonicFr: "LEGAL.", levelId: 33 },
    { word: "憲法", meaningsFr: ["Constitution"], readings: ["けんぽう"], mnemonicFr: "La CONSTITUTION.", levelId: 33 },
    { word: "刑法", meaningsFr: ["Code penal"], readings: ["けいほう"], mnemonicFr: "Le CODE PENAL.", levelId: 33 },
    { word: "民法", meaningsFr: ["Code civil"], readings: ["みんぽう"], mnemonicFr: "Le CODE CIVIL.", levelId: 33 },
    { word: "司法", meaningsFr: ["Justice"], readings: ["しほう"], mnemonicFr: "La JUSTICE.", levelId: 33 },
    { word: "裁判", meaningsFr: ["Proces", "Jugement"], readings: ["さいばん"], mnemonicFr: "Le PROCES, le JUGEMENT.", levelId: 33 },
    { word: "裁判所", meaningsFr: ["Tribunal"], readings: ["さいばんしょ"], mnemonicFr: "Le TRIBUNAL.", levelId: 33 },
    { word: "弁護士", meaningsFr: ["Avocat"], readings: ["べんごし"], mnemonicFr: "Un AVOCAT.", levelId: 33 },
    { word: "検察", meaningsFr: ["Parquet", "Ministere public"], readings: ["けんさつ"], mnemonicFr: "Le PARQUET.", levelId: 33 },
    { word: "被告", meaningsFr: ["Accuse"], readings: ["ひこく"], mnemonicFr: "L'ACCUSE.", levelId: 33 },
    { word: "原告", meaningsFr: ["Plaignant"], readings: ["げんこく"], mnemonicFr: "Le PLAIGNANT.", levelId: 33 },
    { word: "証拠", meaningsFr: ["Preuve"], readings: ["しょうこ"], mnemonicFr: "La PREUVE.", levelId: 33 },
    { word: "証人", meaningsFr: ["Temoin"], readings: ["しょうにん"], mnemonicFr: "Un TEMOIN.", levelId: 33 },
    { word: "判決", meaningsFr: ["Verdict", "Jugement"], readings: ["はんけつ"], mnemonicFr: "Le VERDICT.", levelId: 33 },
    { word: "有罪", meaningsFr: ["Coupable"], readings: ["ゆうざい"], mnemonicFr: "COUPABLE.", levelId: 33 },
    { word: "無罪", meaningsFr: ["Innocent"], readings: ["むざい"], mnemonicFr: "INNOCENT.", levelId: 33 },
    // Medical terms
    { word: "診断", meaningsFr: ["Diagnostic"], readings: ["しんだん"], mnemonicFr: "Le DIAGNOSTIC.", levelId: 33 },
    { word: "診察", meaningsFr: ["Consultation medicale"], readings: ["しんさつ"], mnemonicFr: "La CONSULTATION MEDICALE.", levelId: 33 },
    { word: "治療", meaningsFr: ["Traitement"], readings: ["ちりょう"], mnemonicFr: "Le TRAITEMENT.", levelId: 33 },
    { word: "手術", meaningsFr: ["Operation chirurgicale"], readings: ["しゅじゅつ"], mnemonicFr: "L'OPERATION CHIRURGICALE.", levelId: 33 },
    { word: "症状", meaningsFr: ["Symptome"], readings: ["しょうじょう"], mnemonicFr: "Le SYMPTOME.", levelId: 33 },
    { word: "病状", meaningsFr: ["Etat de sante"], readings: ["びょうじょう"], mnemonicFr: "L'ETAT DE SANTE.", levelId: 33 },
    { word: "患者", meaningsFr: ["Patient"], readings: ["かんじゃ"], mnemonicFr: "Le PATIENT.", levelId: 33 },
    { word: "医師", meaningsFr: ["Medecin"], readings: ["いし"], mnemonicFr: "Le MEDECIN.", levelId: 33 },
    { word: "看護師", meaningsFr: ["Infirmier/Infirmiere"], readings: ["かんごし"], mnemonicFr: "L'INFIRMIER/INFIRMIERE.", levelId: 33 },
    { word: "処方箋", meaningsFr: ["Ordonnance"], readings: ["しょほうせん"], mnemonicFr: "L'ORDONNANCE medicale.", levelId: 33 },
    { word: "副作用", meaningsFr: ["Effet secondaire"], readings: ["ふくさよう"], mnemonicFr: "L'EFFET SECONDAIRE.", levelId: 33 },
    { word: "免疫", meaningsFr: ["Immunite"], readings: ["めんえき"], mnemonicFr: "L'IMMUNITE.", levelId: 33 },
    { word: "感染", meaningsFr: ["Infection"], readings: ["かんせん"], mnemonicFr: "L'INFECTION.", levelId: 33 },
    { word: "伝染", meaningsFr: ["Contagion"], readings: ["でんせん"], mnemonicFr: "La CONTAGION.", levelId: 33 },
    // Technical vocabulary
    { word: "技術", meaningsFr: ["Technique", "Technologie"], readings: ["ぎじゅつ"], mnemonicFr: "La TECHNIQUE, la TECHNOLOGIE.", levelId: 33 },
    { word: "工学", meaningsFr: ["Ingenierie"], readings: ["こうがく"], mnemonicFr: "L'INGENIERIE.", levelId: 33 },
    { word: "設計", meaningsFr: ["Conception", "Design"], readings: ["せっけい"], mnemonicFr: "La CONCEPTION, le DESIGN.", levelId: 33 },
    { word: "開発", meaningsFr: ["Developpement"], readings: ["かいはつ"], mnemonicFr: "Le DEVELOPPEMENT.", levelId: 33 },
    { word: "研究", meaningsFr: ["Recherche"], readings: ["けんきゅう"], mnemonicFr: "La RECHERCHE.", levelId: 33 },
    { word: "実験", meaningsFr: ["Experience", "Experimentation"], readings: ["じっけん"], mnemonicFr: "L'EXPERIENCE scientifique.", levelId: 33 },
    { word: "分析", meaningsFr: ["Analyse"], readings: ["ぶんせき"], mnemonicFr: "L'ANALYSE.", levelId: 33 },
    { word: "測定", meaningsFr: ["Mesure"], readings: ["そくてい"], mnemonicFr: "La MESURE.", levelId: 33 },
    { word: "観測", meaningsFr: ["Observation"], readings: ["かんそく"], mnemonicFr: "L'OBSERVATION.", levelId: 33 },
    { word: "精密", meaningsFr: ["Precision"], readings: ["せいみつ"], mnemonicFr: "La PRECISION.", levelId: 33 },
    { word: "効率", meaningsFr: ["Efficacite"], readings: ["こうりつ"], mnemonicFr: "L'EFFICACITE.", levelId: 33 },
    { word: "性能", meaningsFr: ["Performance"], readings: ["せいのう"], mnemonicFr: "La PERFORMANCE.", levelId: 33 },
    // Abstract nouns
    { word: "傾向", meaningsFr: ["Tendance"], readings: ["けいこう"], mnemonicFr: "La TENDANCE.", levelId: 33 },
    { word: "現象", meaningsFr: ["Phenomene"], readings: ["げんしょう"], mnemonicFr: "Le PHENOMENE.", levelId: 33 },
    { word: "要因", meaningsFr: ["Facteur", "Cause"], readings: ["よういん"], mnemonicFr: "Le FACTEUR, la CAUSE.", levelId: 33 },
    { word: "要素", meaningsFr: ["Element"], readings: ["ようそ"], mnemonicFr: "L'ELEMENT.", levelId: 33 },
    { word: "構造", meaningsFr: ["Structure"], readings: ["こうぞう"], mnemonicFr: "La STRUCTURE.", levelId: 33 },
    { word: "機能", meaningsFr: ["Fonction"], readings: ["きのう"], mnemonicFr: "La FONCTION.", levelId: 33 },
    { word: "役割", meaningsFr: ["Role"], readings: ["やくわり"], mnemonicFr: "Le ROLE.", levelId: 33 },
    { word: "影響", meaningsFr: ["Influence"], readings: ["えいきょう"], mnemonicFr: "L'INFLUENCE.", levelId: 33 },
    { word: "効果", meaningsFr: ["Effet"], readings: ["こうか"], mnemonicFr: "L'EFFET.", levelId: 33 },
    { word: "結果", meaningsFr: ["Resultat"], readings: ["けっか"], mnemonicFr: "Le RESULTAT.", levelId: 33 },
    { word: "原因", meaningsFr: ["Cause"], readings: ["げんいん"], mnemonicFr: "La CAUSE.", levelId: 33 },
    { word: "理由", meaningsFr: ["Raison"], readings: ["りゆう"], mnemonicFr: "La RAISON.", levelId: 33 },
    { word: "根拠", meaningsFr: ["Fondement", "Base"], readings: ["こんきょ"], mnemonicFr: "Le FONDEMENT, la BASE.", levelId: 33 },
    { word: "前提", meaningsFr: ["Premisse", "Presuppose"], readings: ["ぜんてい"], mnemonicFr: "La PREMISSE.", levelId: 33 },
    { word: "仮説", meaningsFr: ["Hypothese"], readings: ["かせつ"], mnemonicFr: "L'HYPOTHESE.", levelId: 33 },
  ];

  for (const vocab of level33Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 33 complete!", level33Vocab.length, "words");

  // ============================================
  // LEVEL 34 - Supplementary Vocabulary
  // JLPT N2/N1 - Society, environment, philosophy
  // ============================================

  const level34Vocab = [
    // Society & Social issues
    { word: "社会", meaningsFr: ["Societe"], readings: ["しゃかい"], mnemonicFr: "La SOCIETE.", levelId: 34 },
    { word: "社会的", meaningsFr: ["Social"], readings: ["しゃかいてき"], mnemonicFr: "SOCIAL.", levelId: 34 },
    { word: "福祉", meaningsFr: ["Protection sociale"], readings: ["ふくし"], mnemonicFr: "La PROTECTION SOCIALE.", levelId: 34 },
    { word: "年金", meaningsFr: ["Pension", "Retraite"], readings: ["ねんきん"], mnemonicFr: "La PENSION de retraite.", levelId: 34 },
    { word: "保険", meaningsFr: ["Assurance"], readings: ["ほけん"], mnemonicFr: "L'ASSURANCE.", levelId: 34 },
    { word: "保障", meaningsFr: ["Garantie", "Securite"], readings: ["ほしょう"], mnemonicFr: "La GARANTIE, la SECURITE.", levelId: 34 },
    { word: "格差", meaningsFr: ["Ecart", "Inegalite"], readings: ["かくさ"], mnemonicFr: "L'ECART, l'INEGALITE.", levelId: 34 },
    { word: "差別", meaningsFr: ["Discrimination"], readings: ["さべつ"], mnemonicFr: "La DISCRIMINATION.", levelId: 34 },
    { word: "偏見", meaningsFr: ["Prejuge"], readings: ["へんけん"], mnemonicFr: "Le PREJUGE.", levelId: 34 },
    { word: "貧困", meaningsFr: ["Pauvrete"], readings: ["ひんこん"], mnemonicFr: "La PAUVRETE.", levelId: 34 },
    { word: "失業", meaningsFr: ["Chomage"], readings: ["しつぎょう"], mnemonicFr: "Le CHOMAGE.", levelId: 34 },
    { word: "雇用", meaningsFr: ["Emploi"], readings: ["こよう"], mnemonicFr: "L'EMPLOI.", levelId: 34 },
    { word: "労働", meaningsFr: ["Travail"], readings: ["ろうどう"], mnemonicFr: "Le TRAVAIL.", levelId: 34 },
    { word: "賃金", meaningsFr: ["Salaire"], readings: ["ちんぎん"], mnemonicFr: "Le SALAIRE.", levelId: 34 },
    // Environment
    { word: "環境", meaningsFr: ["Environnement"], readings: ["かんきょう"], mnemonicFr: "L'ENVIRONNEMENT.", levelId: 34 },
    { word: "自然", meaningsFr: ["Nature"], readings: ["しぜん"], mnemonicFr: "La NATURE.", levelId: 34 },
    { word: "生態", meaningsFr: ["Ecologie"], readings: ["せいたい"], mnemonicFr: "L'ECOLOGIE.", levelId: 34 },
    { word: "生態系", meaningsFr: ["Ecosysteme"], readings: ["せいたいけい"], mnemonicFr: "L'ECOSYSTEME.", levelId: 34 },
    { word: "温暖化", meaningsFr: ["Rechauffement"], readings: ["おんだんか"], mnemonicFr: "Le RECHAUFFEMENT climatique.", levelId: 34 },
    { word: "汚染", meaningsFr: ["Pollution"], readings: ["おせん"], mnemonicFr: "La POLLUTION.", levelId: 34 },
    { word: "廃棄物", meaningsFr: ["Dechets"], readings: ["はいきぶつ"], mnemonicFr: "Les DECHETS.", levelId: 34 },
    { word: "再生", meaningsFr: ["Regeneration", "Recyclage"], readings: ["さいせい"], mnemonicFr: "La REGENERATION, le RECYCLAGE.", levelId: 34 },
    { word: "持続可能", meaningsFr: ["Durable"], readings: ["じぞくかのう"], mnemonicFr: "DURABLE.", levelId: 34 },
    { word: "保全", meaningsFr: ["Conservation"], readings: ["ほぜん"], mnemonicFr: "La CONSERVATION.", levelId: 34 },
    { word: "絶滅", meaningsFr: ["Extinction"], readings: ["ぜつめつ"], mnemonicFr: "L'EXTINCTION.", levelId: 34 },
    { word: "資源", meaningsFr: ["Ressources"], readings: ["しげん"], mnemonicFr: "Les RESSOURCES.", levelId: 34 },
    { word: "エネルギー", meaningsFr: ["Energie"], readings: ["エネルギー"], mnemonicFr: "L'ENERGIE.", levelId: 34 },
    // Philosophy & Ethics
    { word: "哲学", meaningsFr: ["Philosophie"], readings: ["てつがく"], mnemonicFr: "La PHILOSOPHIE.", levelId: 34 },
    { word: "倫理", meaningsFr: ["Ethique"], readings: ["りんり"], mnemonicFr: "L'ETHIQUE.", levelId: 34 },
    { word: "道徳", meaningsFr: ["Morale"], readings: ["どうとく"], mnemonicFr: "La MORALE.", levelId: 34 },
    { word: "価値", meaningsFr: ["Valeur"], readings: ["かち"], mnemonicFr: "La VALEUR.", levelId: 34 },
    { word: "価値観", meaningsFr: ["Systeme de valeurs"], readings: ["かちかん"], mnemonicFr: "Le SYSTEME DE VALEURS.", levelId: 34 },
    { word: "正義", meaningsFr: ["Justice"], readings: ["せいぎ"], mnemonicFr: "La JUSTICE.", levelId: 34 },
    { word: "公正", meaningsFr: ["Equite"], readings: ["こうせい"], mnemonicFr: "L'EQUITE.", levelId: 34 },
    { word: "平等", meaningsFr: ["Egalite"], readings: ["びょうどう"], mnemonicFr: "L'EGALITE.", levelId: 34 },
    { word: "自由", meaningsFr: ["Liberte"], readings: ["じゆう"], mnemonicFr: "La LIBERTE.", levelId: 34 },
    { word: "権利", meaningsFr: ["Droit"], readings: ["けんり"], mnemonicFr: "Le DROIT.", levelId: 34 },
    { word: "義務", meaningsFr: ["Devoir", "Obligation"], readings: ["ぎむ"], mnemonicFr: "Le DEVOIR, l'OBLIGATION.", levelId: 34 },
    { word: "責任", meaningsFr: ["Responsabilite"], readings: ["せきにん"], mnemonicFr: "La RESPONSABILITE.", levelId: 34 },
    // Human nature
    { word: "意識", meaningsFr: ["Conscience"], readings: ["いしき"], mnemonicFr: "La CONSCIENCE.", levelId: 34 },
    { word: "無意識", meaningsFr: ["Inconscient"], readings: ["むいしき"], mnemonicFr: "L'INCONSCIENT.", levelId: 34 },
    { word: "心理", meaningsFr: ["Psychologie"], readings: ["しんり"], mnemonicFr: "La PSYCHOLOGIE.", levelId: 34 },
    { word: "感情", meaningsFr: ["Emotion"], readings: ["かんじょう"], mnemonicFr: "L'EMOTION.", levelId: 34 },
    { word: "理性", meaningsFr: ["Raison"], readings: ["りせい"], mnemonicFr: "La RAISON.", levelId: 34 },
    { word: "本能", meaningsFr: ["Instinct"], readings: ["ほんのう"], mnemonicFr: "L'INSTINCT.", levelId: 34 },
    { word: "欲望", meaningsFr: ["Desir"], readings: ["よくぼう"], mnemonicFr: "Le DESIR.", levelId: 34 },
    { word: "動機", meaningsFr: ["Motivation"], readings: ["どうき"], mnemonicFr: "La MOTIVATION.", levelId: 34 },
    { word: "意図", meaningsFr: ["Intention"], readings: ["いと"], mnemonicFr: "L'INTENTION.", levelId: 34 },
    { word: "目的", meaningsFr: ["But", "Objectif"], readings: ["もくてき"], mnemonicFr: "Le BUT, l'OBJECTIF.", levelId: 34 },
    // Existence & Reality
    { word: "存在", meaningsFr: ["Existence"], readings: ["そんざい"], mnemonicFr: "L'EXISTENCE.", levelId: 34 },
    { word: "現実", meaningsFr: ["Realite"], readings: ["げんじつ"], mnemonicFr: "La REALITE.", levelId: 34 },
    { word: "事実", meaningsFr: ["Fait"], readings: ["じじつ"], mnemonicFr: "Le FAIT.", levelId: 34 },
    { word: "真実", meaningsFr: ["Verite"], readings: ["しんじつ"], mnemonicFr: "La VERITE.", levelId: 34 },
    { word: "虚偽", meaningsFr: ["Mensonge", "Faussete"], readings: ["きょぎ"], mnemonicFr: "Le MENSONGE.", levelId: 34 },
    { word: "本質", meaningsFr: ["Essence"], readings: ["ほんしつ"], mnemonicFr: "L'ESSENCE.", levelId: 34 },
    { word: "現象", meaningsFr: ["Phenomene"], readings: ["げんしょう"], mnemonicFr: "Le PHENOMENE.", levelId: 34 },
    { word: "抽象", meaningsFr: ["Abstraction"], readings: ["ちゅうしょう"], mnemonicFr: "L'ABSTRACTION.", levelId: 34 },
    { word: "具体", meaningsFr: ["Concret"], readings: ["ぐたい"], mnemonicFr: "Le CONCRET.", levelId: 34 },
  ];

  for (const vocab of level34Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 34 complete!", level34Vocab.length, "words");

  // ============================================
  // LEVEL 35 - Supplementary Vocabulary
  // JLPT N2/N1 - Politics, international relations
  // ============================================

  const level35Vocab = [
    // Politics & Government
    { word: "政権", meaningsFr: ["Regime", "Pouvoir"], readings: ["せいけん"], mnemonicFr: "Le REGIME, le POUVOIR.", levelId: 35 },
    { word: "内閣", meaningsFr: ["Cabinet"], readings: ["ないかく"], mnemonicFr: "Le CABINET ministeriel.", levelId: 35 },
    { word: "首相", meaningsFr: ["Premier ministre"], readings: ["しゅしょう"], mnemonicFr: "Le PREMIER MINISTRE.", levelId: 35 },
    { word: "大臣", meaningsFr: ["Ministre"], readings: ["だいじん"], mnemonicFr: "Un MINISTRE.", levelId: 35 },
    { word: "議員", meaningsFr: ["Depute"], readings: ["ぎいん"], mnemonicFr: "Un DEPUTE.", levelId: 35 },
    { word: "議会", meaningsFr: ["Parlement"], readings: ["ぎかい"], mnemonicFr: "Le PARLEMENT.", levelId: 35 },
    { word: "国会", meaningsFr: ["Assemblee nationale"], readings: ["こっかい"], mnemonicFr: "L'ASSEMBLEE NATIONALE.", levelId: 35 },
    { word: "選挙", meaningsFr: ["Election"], readings: ["せんきょ"], mnemonicFr: "L'ELECTION.", levelId: 35 },
    { word: "投票", meaningsFr: ["Vote"], readings: ["とうひょう"], mnemonicFr: "Le VOTE.", levelId: 35 },
    { word: "候補", meaningsFr: ["Candidat"], readings: ["こうほ"], mnemonicFr: "Un CANDIDAT.", levelId: 35 },
    { word: "当選", meaningsFr: ["Election (etre elu)"], readings: ["とうせん"], mnemonicFr: "Etre ELU.", levelId: 35 },
    { word: "落選", meaningsFr: ["Defaite electorale"], readings: ["らくせん"], mnemonicFr: "DEFAITE ELECTORALE.", levelId: 35 },
    { word: "野党", meaningsFr: ["Opposition"], readings: ["やとう"], mnemonicFr: "L'OPPOSITION.", levelId: 35 },
    { word: "与党", meaningsFr: ["Parti au pouvoir"], readings: ["よとう"], mnemonicFr: "Le PARTI AU POUVOIR.", levelId: 35 },
    // International relations
    { word: "外交", meaningsFr: ["Diplomatie"], readings: ["がいこう"], mnemonicFr: "La DIPLOMATIE.", levelId: 35 },
    { word: "外務省", meaningsFr: ["Ministere des affaires etrangeres"], readings: ["がいむしょう"], mnemonicFr: "Le MINISTERE DES AFFAIRES ETRANGERES.", levelId: 35 },
    { word: "大使", meaningsFr: ["Ambassadeur"], readings: ["たいし"], mnemonicFr: "Un AMBASSADEUR.", levelId: 35 },
    { word: "大使館", meaningsFr: ["Ambassade"], readings: ["たいしかん"], mnemonicFr: "L'AMBASSADE.", levelId: 35 },
    { word: "条約", meaningsFr: ["Traite"], readings: ["じょうやく"], mnemonicFr: "Un TRAITE international.", levelId: 35 },
    { word: "協定", meaningsFr: ["Accord"], readings: ["きょうてい"], mnemonicFr: "Un ACCORD.", levelId: 35 },
    { word: "同盟", meaningsFr: ["Alliance"], readings: ["どうめい"], mnemonicFr: "Une ALLIANCE.", levelId: 35 },
    { word: "国連", meaningsFr: ["ONU"], readings: ["こくれん"], mnemonicFr: "L'ONU.", levelId: 35 },
    { word: "紛争", meaningsFr: ["Conflit"], readings: ["ふんそう"], mnemonicFr: "Un CONFLIT.", levelId: 35 },
    { word: "戦争", meaningsFr: ["Guerre"], readings: ["せんそう"], mnemonicFr: "La GUERRE.", levelId: 35 },
    { word: "平和", meaningsFr: ["Paix"], readings: ["へいわ"], mnemonicFr: "La PAIX.", levelId: 35 },
    { word: "停戦", meaningsFr: ["Cessez-le-feu"], readings: ["ていせん"], mnemonicFr: "Le CESSEZ-LE-FEU.", levelId: 35 },
    { word: "制裁", meaningsFr: ["Sanction"], readings: ["せいさい"], mnemonicFr: "La SANCTION.", levelId: 35 },
    // Military
    { word: "軍隊", meaningsFr: ["Armee"], readings: ["ぐんたい"], mnemonicFr: "L'ARMEE.", levelId: 35 },
    { word: "軍事", meaningsFr: ["Militaire"], readings: ["ぐんじ"], mnemonicFr: "MILITAIRE.", levelId: 35 },
    { word: "自衛隊", meaningsFr: ["Forces d'autodefense"], readings: ["じえいたい"], mnemonicFr: "Les FORCES D'AUTODEFENSE.", levelId: 35 },
    { word: "兵士", meaningsFr: ["Soldat"], readings: ["へいし"], mnemonicFr: "Un SOLDAT.", levelId: 35 },
    { word: "武器", meaningsFr: ["Arme"], readings: ["ぶき"], mnemonicFr: "Une ARME.", levelId: 35 },
    { word: "核兵器", meaningsFr: ["Arme nucleaire"], readings: ["かくへいき"], mnemonicFr: "Une ARME NUCLEAIRE.", levelId: 35 },
    // Economics
    { word: "景気", meaningsFr: ["Conjoncture economique"], readings: ["けいき"], mnemonicFr: "La CONJONCTURE ECONOMIQUE.", levelId: 35 },
    { word: "不況", meaningsFr: ["Recession"], readings: ["ふきょう"], mnemonicFr: "La RECESSION.", levelId: 35 },
    { word: "好況", meaningsFr: ["Prosperite"], readings: ["こうきょう"], mnemonicFr: "La PROSPERITE.", levelId: 35 },
    { word: "成長", meaningsFr: ["Croissance"], readings: ["せいちょう"], mnemonicFr: "La CROISSANCE.", levelId: 35 },
    { word: "衰退", meaningsFr: ["Declin"], readings: ["すいたい"], mnemonicFr: "Le DECLIN.", levelId: 35 },
    { word: "破綻", meaningsFr: ["Faillite"], readings: ["はたん"], mnemonicFr: "La FAILLITE.", levelId: 35 },
    { word: "赤字", meaningsFr: ["Deficit"], readings: ["あかじ"], mnemonicFr: "Le DEFICIT.", levelId: 35 },
    { word: "黒字", meaningsFr: ["Excedent"], readings: ["くろじ"], mnemonicFr: "L'EXCEDENT.", levelId: 35 },
    { word: "物価", meaningsFr: ["Prix"], readings: ["ぶっか"], mnemonicFr: "Les PRIX.", levelId: 35 },
    { word: "インフレ", meaningsFr: ["Inflation"], readings: ["インフレ"], mnemonicFr: "L'INFLATION.", levelId: 35 },
    { word: "デフレ", meaningsFr: ["Deflation"], readings: ["デフレ"], mnemonicFr: "La DEFLATION.", levelId: 35 },
    { word: "為替", meaningsFr: ["Change"], readings: ["かわせ"], mnemonicFr: "Le CHANGE.", levelId: 35 },
    { word: "円高", meaningsFr: ["Appreciation du yen"], readings: ["えんだか"], mnemonicFr: "L'APPRECIATION DU YEN.", levelId: 35 },
    { word: "円安", meaningsFr: ["Depreciation du yen"], readings: ["えんやす"], mnemonicFr: "La DEPRECIATION DU YEN.", levelId: 35 },
    { word: "株式", meaningsFr: ["Actions"], readings: ["かぶしき"], mnemonicFr: "Les ACTIONS boursieres.", levelId: 35 },
    { word: "株価", meaningsFr: ["Cours de bourse"], readings: ["かぶか"], mnemonicFr: "Le COURS DE BOURSE.", levelId: 35 },
    { word: "債券", meaningsFr: ["Obligation"], readings: ["さいけん"], mnemonicFr: "Une OBLIGATION financiere.", levelId: 35 },
    { word: "投資", meaningsFr: ["Investissement"], readings: ["とうし"], mnemonicFr: "L'INVESTISSEMENT.", levelId: 35 },
    { word: "融資", meaningsFr: ["Pret", "Financement"], readings: ["ゆうし"], mnemonicFr: "Le PRET, le FINANCEMENT.", levelId: 35 },
    { word: "利益", meaningsFr: ["Benefice", "Profit"], readings: ["りえき"], mnemonicFr: "Le BENEFICE, le PROFIT.", levelId: 35 },
    { word: "損失", meaningsFr: ["Perte"], readings: ["そんしつ"], mnemonicFr: "La PERTE.", levelId: 35 },
    { word: "収支", meaningsFr: ["Balance"], readings: ["しゅうし"], mnemonicFr: "La BALANCE.", levelId: 35 },
  ];

  for (const vocab of level35Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 35 complete!", level35Vocab.length, "words");

  // ============================================
  // LEVEL 36 - Supplementary Vocabulary
  // JLPT N2/N1 - Academic, research, literary
  // ============================================

  const level36Vocab = [
    // Academic terms
    { word: "学術", meaningsFr: ["Academique"], readings: ["がくじゅつ"], mnemonicFr: "ACADEMIQUE.", levelId: 36 },
    { word: "学問", meaningsFr: ["Etudes", "Savoir"], readings: ["がくもん"], mnemonicFr: "Les ETUDES, le SAVOIR.", levelId: 36 },
    { word: "学説", meaningsFr: ["Theorie"], readings: ["がくせつ"], mnemonicFr: "La THEORIE.", levelId: 36 },
    { word: "論文", meaningsFr: ["These", "Memoire"], readings: ["ろんぶん"], mnemonicFr: "La THESE, le MEMOIRE.", levelId: 36 },
    { word: "論理", meaningsFr: ["Logique"], readings: ["ろんり"], mnemonicFr: "La LOGIQUE.", levelId: 36 },
    { word: "論証", meaningsFr: ["Demonstration"], readings: ["ろんしょう"], mnemonicFr: "La DEMONSTRATION.", levelId: 36 },
    { word: "議論", meaningsFr: ["Discussion", "Debat"], readings: ["ぎろん"], mnemonicFr: "La DISCUSSION, le DEBAT.", levelId: 36 },
    { word: "結論", meaningsFr: ["Conclusion"], readings: ["けつろん"], mnemonicFr: "La CONCLUSION.", levelId: 36 },
    { word: "序論", meaningsFr: ["Introduction"], readings: ["じょろん"], mnemonicFr: "L'INTRODUCTION.", levelId: 36 },
    { word: "本論", meaningsFr: ["Corps du texte"], readings: ["ほんろん"], mnemonicFr: "Le CORPS DU TEXTE.", levelId: 36 },
    { word: "仮定", meaningsFr: ["Hypothese", "Supposition"], readings: ["かてい"], mnemonicFr: "L'HYPOTHESE.", levelId: 36 },
    { word: "推論", meaningsFr: ["Raisonnement"], readings: ["すいろん"], mnemonicFr: "Le RAISONNEMENT.", levelId: 36 },
    { word: "帰納", meaningsFr: ["Induction"], readings: ["きのう"], mnemonicFr: "L'INDUCTION.", levelId: 36 },
    { word: "演繹", meaningsFr: ["Deduction"], readings: ["えんえき"], mnemonicFr: "La DEDUCTION.", levelId: 36 },
    { word: "検証", meaningsFr: ["Verification"], readings: ["けんしょう"], mnemonicFr: "La VERIFICATION.", levelId: 36 },
    { word: "実証", meaningsFr: ["Preuve empirique"], readings: ["じっしょう"], mnemonicFr: "La PREUVE EMPIRIQUE.", levelId: 36 },
    { word: "批判", meaningsFr: ["Critique"], readings: ["ひはん"], mnemonicFr: "La CRITIQUE.", levelId: 36 },
    { word: "反論", meaningsFr: ["Refutation"], readings: ["はんろん"], mnemonicFr: "La REFUTATION.", levelId: 36 },
    // Research vocabulary
    { word: "調査", meaningsFr: ["Enquete", "Recherche"], readings: ["ちょうさ"], mnemonicFr: "L'ENQUETE, la RECHERCHE.", levelId: 36 },
    { word: "統計", meaningsFr: ["Statistiques"], readings: ["とうけい"], mnemonicFr: "Les STATISTIQUES.", levelId: 36 },
    { word: "データ", meaningsFr: ["Donnees"], readings: ["データ"], mnemonicFr: "Les DONNEES.", levelId: 36 },
    { word: "資料", meaningsFr: ["Documents", "Materiaux"], readings: ["しりょう"], mnemonicFr: "Les DOCUMENTS.", levelId: 36 },
    { word: "文献", meaningsFr: ["Bibliographie"], readings: ["ぶんけん"], mnemonicFr: "La BIBLIOGRAPHIE.", levelId: 36 },
    { word: "出典", meaningsFr: ["Source"], readings: ["しゅってん"], mnemonicFr: "La SOURCE.", levelId: 36 },
    { word: "引用", meaningsFr: ["Citation"], readings: ["いんよう"], mnemonicFr: "La CITATION.", levelId: 36 },
    { word: "参照", meaningsFr: ["Reference"], readings: ["さんしょう"], mnemonicFr: "La REFERENCE.", levelId: 36 },
    { word: "注釈", meaningsFr: ["Annotation"], readings: ["ちゅうしゃく"], mnemonicFr: "L'ANNOTATION.", levelId: 36 },
    { word: "脚注", meaningsFr: ["Note de bas de page"], readings: ["きゃくちゅう"], mnemonicFr: "La NOTE DE BAS DE PAGE.", levelId: 36 },
    // Literary terms
    { word: "文学", meaningsFr: ["Litterature"], readings: ["ぶんがく"], mnemonicFr: "La LITTERATURE.", levelId: 36 },
    { word: "作品", meaningsFr: ["Oeuvre"], readings: ["さくひん"], mnemonicFr: "L'OEUVRE.", levelId: 36 },
    { word: "作家", meaningsFr: ["Ecrivain"], readings: ["さっか"], mnemonicFr: "L'ECRIVAIN.", levelId: 36 },
    { word: "詩人", meaningsFr: ["Poete"], readings: ["しじん"], mnemonicFr: "Le POETE.", levelId: 36 },
    { word: "詩", meaningsFr: ["Poeme"], readings: ["し"], mnemonicFr: "Le POEME.", levelId: 36 },
    { word: "散文", meaningsFr: ["Prose"], readings: ["さんぶん"], mnemonicFr: "La PROSE.", levelId: 36 },
    { word: "韻文", meaningsFr: ["Vers"], readings: ["いんぶん"], mnemonicFr: "Les VERS.", levelId: 36 },
    { word: "小説", meaningsFr: ["Roman"], readings: ["しょうせつ"], mnemonicFr: "Le ROMAN.", levelId: 36 },
    { word: "随筆", meaningsFr: ["Essai"], readings: ["ずいひつ"], mnemonicFr: "L'ESSAI litteraire.", levelId: 36 },
    { word: "戯曲", meaningsFr: ["Piece de theatre"], readings: ["ぎきょく"], mnemonicFr: "La PIECE DE THEATRE.", levelId: 36 },
    { word: "物語", meaningsFr: ["Recit", "Conte"], readings: ["ものがたり"], mnemonicFr: "Le RECIT, le CONTE.", levelId: 36 },
    { word: "主人公", meaningsFr: ["Protagoniste"], readings: ["しゅじんこう"], mnemonicFr: "Le PROTAGONISTE.", levelId: 36 },
    { word: "登場人物", meaningsFr: ["Personnage"], readings: ["とうじょうじんぶつ"], mnemonicFr: "Le PERSONNAGE.", levelId: 36 },
    { word: "筋", meaningsFr: ["Intrigue"], readings: ["すじ"], mnemonicFr: "L'INTRIGUE.", levelId: 36 },
    { word: "展開", meaningsFr: ["Developpement"], readings: ["てんかい"], mnemonicFr: "Le DEVELOPPEMENT.", levelId: 36 },
    { word: "結末", meaningsFr: ["Denouement"], readings: ["けつまつ"], mnemonicFr: "Le DENOUEMENT.", levelId: 36 },
    { word: "比喩", meaningsFr: ["Metaphore"], readings: ["ひゆ"], mnemonicFr: "La METAPHORE.", levelId: 36 },
    { word: "象徴", meaningsFr: ["Symbole"], readings: ["しょうちょう"], mnemonicFr: "Le SYMBOLE.", levelId: 36 },
    { word: "暗示", meaningsFr: ["Allusion"], readings: ["あんじ"], mnemonicFr: "L'ALLUSION.", levelId: 36 },
    { word: "風刺", meaningsFr: ["Satire"], readings: ["ふうし"], mnemonicFr: "La SATIRE.", levelId: 36 },
    { word: "皮肉", meaningsFr: ["Ironie"], readings: ["ひにく"], mnemonicFr: "L'IRONIE.", levelId: 36 },
    // Writing style
    { word: "文体", meaningsFr: ["Style"], readings: ["ぶんたい"], mnemonicFr: "Le STYLE.", levelId: 36 },
    { word: "語調", meaningsFr: ["Ton"], readings: ["ごちょう"], mnemonicFr: "Le TON.", levelId: 36 },
    { word: "表現", meaningsFr: ["Expression"], readings: ["ひょうげん"], mnemonicFr: "L'EXPRESSION.", levelId: 36 },
    { word: "描写", meaningsFr: ["Description"], readings: ["びょうしゃ"], mnemonicFr: "La DESCRIPTION.", levelId: 36 },
    { word: "叙述", meaningsFr: ["Narration"], readings: ["じょじゅつ"], mnemonicFr: "La NARRATION.", levelId: 36 },
    { word: "修辞", meaningsFr: ["Rhetorique"], readings: ["しゅうじ"], mnemonicFr: "La RHETORIQUE.", levelId: 36 },
  ];

  for (const vocab of level36Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 36 complete!", level36Vocab.length, "words");

  // ============================================
  // LEVEL 37 - Supplementary Vocabulary
  // JLPT N2/N1 - Arts, culture, traditions
  // ============================================

  const level37Vocab = [
    // Visual arts
    { word: "芸術", meaningsFr: ["Art"], readings: ["げいじゅつ"], mnemonicFr: "L'ART.", levelId: 37 },
    { word: "美術", meaningsFr: ["Beaux-arts"], readings: ["びじゅつ"], mnemonicFr: "Les BEAUX-ARTS.", levelId: 37 },
    { word: "美術館", meaningsFr: ["Musee d'art"], readings: ["びじゅつかん"], mnemonicFr: "Le MUSEE D'ART.", levelId: 37 },
    { word: "絵画", meaningsFr: ["Peinture"], readings: ["かいが"], mnemonicFr: "La PEINTURE.", levelId: 37 },
    { word: "彫刻", meaningsFr: ["Sculpture"], readings: ["ちょうこく"], mnemonicFr: "La SCULPTURE.", levelId: 37 },
    { word: "版画", meaningsFr: ["Gravure"], readings: ["はんが"], mnemonicFr: "La GRAVURE.", levelId: 37 },
    { word: "陶芸", meaningsFr: ["Ceramique"], readings: ["とうげい"], mnemonicFr: "La CERAMIQUE.", levelId: 37 },
    { word: "工芸", meaningsFr: ["Artisanat"], readings: ["こうげい"], mnemonicFr: "L'ARTISANAT.", levelId: 37 },
    { word: "書道", meaningsFr: ["Calligraphie"], readings: ["しょどう"], mnemonicFr: "La CALLIGRAPHIE.", levelId: 37 },
    { word: "華道", meaningsFr: ["Ikebana"], readings: ["かどう"], mnemonicFr: "L'IKEBANA.", levelId: 37 },
    { word: "茶道", meaningsFr: ["Ceremonie du the"], readings: ["さどう"], mnemonicFr: "La CEREMONIE DU THE.", levelId: 37 },
    // Performing arts
    { word: "演劇", meaningsFr: ["Theatre"], readings: ["えんげき"], mnemonicFr: "Le THEATRE.", levelId: 37 },
    { word: "歌舞伎", meaningsFr: ["Kabuki"], readings: ["かぶき"], mnemonicFr: "Le KABUKI.", levelId: 37 },
    { word: "能", meaningsFr: ["No"], readings: ["のう"], mnemonicFr: "Le theatre NO.", levelId: 37 },
    { word: "狂言", meaningsFr: ["Kyogen"], readings: ["きょうげん"], mnemonicFr: "Le KYOGEN.", levelId: 37 },
    { word: "文楽", meaningsFr: ["Bunraku"], readings: ["ぶんらく"], mnemonicFr: "Le BUNRAKU.", levelId: 37 },
    { word: "舞踊", meaningsFr: ["Danse"], readings: ["ぶよう"], mnemonicFr: "La DANSE.", levelId: 37 },
    { word: "バレエ", meaningsFr: ["Ballet"], readings: ["バレエ"], mnemonicFr: "Le BALLET.", levelId: 37 },
    { word: "オペラ", meaningsFr: ["Opera"], readings: ["オペラ"], mnemonicFr: "L'OPERA.", levelId: 37 },
    // Music
    { word: "音楽", meaningsFr: ["Musique"], readings: ["おんがく"], mnemonicFr: "La MUSIQUE.", levelId: 37 },
    { word: "楽器", meaningsFr: ["Instrument"], readings: ["がっき"], mnemonicFr: "L'INSTRUMENT de musique.", levelId: 37 },
    { word: "作曲", meaningsFr: ["Composition"], readings: ["さっきょく"], mnemonicFr: "La COMPOSITION.", levelId: 37 },
    { word: "演奏", meaningsFr: ["Interpretation"], readings: ["えんそう"], mnemonicFr: "L'INTERPRETATION musicale.", levelId: 37 },
    { word: "交響曲", meaningsFr: ["Symphonie"], readings: ["こうきょうきょく"], mnemonicFr: "La SYMPHONIE.", levelId: 37 },
    { word: "協奏曲", meaningsFr: ["Concerto"], readings: ["きょうそうきょく"], mnemonicFr: "Le CONCERTO.", levelId: 37 },
    { word: "旋律", meaningsFr: ["Melodie"], readings: ["せんりつ"], mnemonicFr: "La MELODIE.", levelId: 37 },
    { word: "和音", meaningsFr: ["Accord"], readings: ["わおん"], mnemonicFr: "L'ACCORD.", levelId: 37 },
    { word: "拍子", meaningsFr: ["Rythme"], readings: ["ひょうし"], mnemonicFr: "Le RYTHME.", levelId: 37 },
    // Japanese traditions
    { word: "伝統", meaningsFr: ["Tradition"], readings: ["でんとう"], mnemonicFr: "La TRADITION.", levelId: 37 },
    { word: "慣習", meaningsFr: ["Coutume"], readings: ["かんしゅう"], mnemonicFr: "La COUTUME.", levelId: 37 },
    { word: "風習", meaningsFr: ["Usage"], readings: ["ふうしゅう"], mnemonicFr: "L'USAGE.", levelId: 37 },
    { word: "儀式", meaningsFr: ["Ceremonie"], readings: ["ぎしき"], mnemonicFr: "La CEREMONIE.", levelId: 37 },
    { word: "祭り", meaningsFr: ["Festival"], readings: ["まつり"], mnemonicFr: "Le FESTIVAL.", levelId: 37 },
    { word: "祝日", meaningsFr: ["Jour ferie"], readings: ["しゅくじつ"], mnemonicFr: "Le JOUR FERIE.", levelId: 37 },
    { word: "正月", meaningsFr: ["Nouvel an"], readings: ["しょうがつ"], mnemonicFr: "Le NOUVEL AN.", levelId: 37 },
    { word: "盆", meaningsFr: ["Obon"], readings: ["ぼん"], mnemonicFr: "La fete d'OBON.", levelId: 37 },
    { word: "七五三", meaningsFr: ["Shichi-go-san"], readings: ["しちごさん"], mnemonicFr: "Le SHICHI-GO-SAN.", levelId: 37 },
    { word: "成人式", meaningsFr: ["Ceremonie de majorite"], readings: ["せいじんしき"], mnemonicFr: "La CEREMONIE DE MAJORITE.", levelId: 37 },
    { word: "結婚式", meaningsFr: ["Mariage"], readings: ["けっこんしき"], mnemonicFr: "Le MARIAGE.", levelId: 37 },
    { word: "葬式", meaningsFr: ["Funerailles"], readings: ["そうしき"], mnemonicFr: "Les FUNERAILLES.", levelId: 37 },
    // Religion
    { word: "宗教", meaningsFr: ["Religion"], readings: ["しゅうきょう"], mnemonicFr: "La RELIGION.", levelId: 37 },
    { word: "神道", meaningsFr: ["Shinto"], readings: ["しんとう"], mnemonicFr: "Le SHINTO.", levelId: 37 },
    { word: "仏教", meaningsFr: ["Bouddhisme"], readings: ["ぶっきょう"], mnemonicFr: "Le BOUDDHISME.", levelId: 37 },
    { word: "神社", meaningsFr: ["Sanctuaire shinto"], readings: ["じんじゃ"], mnemonicFr: "Le SANCTUAIRE SHINTO.", levelId: 37 },
    { word: "寺", meaningsFr: ["Temple bouddhiste"], readings: ["てら"], mnemonicFr: "Le TEMPLE BOUDDHISTE.", levelId: 37 },
    { word: "神", meaningsFr: ["Dieu"], readings: ["かみ"], mnemonicFr: "Le DIEU.", levelId: 37 },
    { word: "仏", meaningsFr: ["Bouddha"], readings: ["ほとけ"], mnemonicFr: "Le BOUDDHA.", levelId: 37 },
    { word: "祈り", meaningsFr: ["Priere"], readings: ["いのり"], mnemonicFr: "La PRIERE.", levelId: 37 },
    { word: "参拝", meaningsFr: ["Visite au temple"], readings: ["さんぱい"], mnemonicFr: "La VISITE AU TEMPLE.", levelId: 37 },
    { word: "お守り", meaningsFr: ["Amulette"], readings: ["おまもり"], mnemonicFr: "L'AMULETTE.", levelId: 37 },
    { word: "御籤", meaningsFr: ["Oracle"], readings: ["おみくじ"], mnemonicFr: "L'ORACLE.", levelId: 37 },
    // Architecture
    { word: "建築", meaningsFr: ["Architecture"], readings: ["けんちく"], mnemonicFr: "L'ARCHITECTURE.", levelId: 37 },
    { word: "設計", meaningsFr: ["Conception"], readings: ["せっけい"], mnemonicFr: "La CONCEPTION.", levelId: 37 },
    { word: "構造", meaningsFr: ["Structure"], readings: ["こうぞう"], mnemonicFr: "La STRUCTURE.", levelId: 37 },
    { word: "様式", meaningsFr: ["Style"], readings: ["ようしき"], mnemonicFr: "Le STYLE.", levelId: 37 },
  ];

  for (const vocab of level37Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 37 complete!", level37Vocab.length, "words");

  // ============================================
  // LEVEL 38 - Supplementary Vocabulary
  // JLPT N2/N1 - Media, communication, technology
  // ============================================

  const level38Vocab = [
    // Media
    { word: "報道", meaningsFr: ["Reportage", "Information"], readings: ["ほうどう"], mnemonicFr: "Le REPORTAGE.", levelId: 38 },
    { word: "記事", meaningsFr: ["Article"], readings: ["きじ"], mnemonicFr: "L'ARTICLE.", levelId: 38 },
    { word: "見出し", meaningsFr: ["Titre"], readings: ["みだし"], mnemonicFr: "Le TITRE.", levelId: 38 },
    { word: "社説", meaningsFr: ["Editorial"], readings: ["しゃせつ"], mnemonicFr: "L'EDITORIAL.", levelId: 38 },
    { word: "取材", meaningsFr: ["Interview", "Reportage"], readings: ["しゅざい"], mnemonicFr: "L'INTERVIEW.", levelId: 38 },
    { word: "記者", meaningsFr: ["Journaliste"], readings: ["きしゃ"], mnemonicFr: "Le JOURNALISTE.", levelId: 38 },
    { word: "編集", meaningsFr: ["Edition"], readings: ["へんしゅう"], mnemonicFr: "L'EDITION.", levelId: 38 },
    { word: "出版", meaningsFr: ["Publication"], readings: ["しゅっぱん"], mnemonicFr: "La PUBLICATION.", levelId: 38 },
    { word: "発行", meaningsFr: ["Publication", "Emission"], readings: ["はっこう"], mnemonicFr: "La PUBLICATION.", levelId: 38 },
    { word: "放送", meaningsFr: ["Diffusion"], readings: ["ほうそう"], mnemonicFr: "La DIFFUSION.", levelId: 38 },
    { word: "生放送", meaningsFr: ["Direct"], readings: ["なまほうそう"], mnemonicFr: "Le DIRECT.", levelId: 38 },
    { word: "視聴率", meaningsFr: ["Audience"], readings: ["しちょうりつ"], mnemonicFr: "L'AUDIENCE.", levelId: 38 },
    { word: "番組", meaningsFr: ["Programme", "Emission"], readings: ["ばんぐみ"], mnemonicFr: "Le PROGRAMME.", levelId: 38 },
    { word: "ドキュメンタリー", meaningsFr: ["Documentaire"], readings: ["ドキュメンタリー"], mnemonicFr: "Le DOCUMENTAIRE.", levelId: 38 },
    { word: "広告", meaningsFr: ["Publicite"], readings: ["こうこく"], mnemonicFr: "La PUBLICITE.", levelId: 38 },
    { word: "宣伝", meaningsFr: ["Promotion"], readings: ["せんでん"], mnemonicFr: "La PROMOTION.", levelId: 38 },
    // Communication
    { word: "通信", meaningsFr: ["Communication"], readings: ["つうしん"], mnemonicFr: "La COMMUNICATION.", levelId: 38 },
    { word: "情報", meaningsFr: ["Information"], readings: ["じょうほう"], mnemonicFr: "L'INFORMATION.", levelId: 38 },
    { word: "伝達", meaningsFr: ["Transmission"], readings: ["でんたつ"], mnemonicFr: "La TRANSMISSION.", levelId: 38 },
    { word: "発信", meaningsFr: ["Emission"], readings: ["はっしん"], mnemonicFr: "L'EMISSION.", levelId: 38 },
    { word: "受信", meaningsFr: ["Reception"], readings: ["じゅしん"], mnemonicFr: "La RECEPTION.", levelId: 38 },
    { word: "交渉", meaningsFr: ["Negociation"], readings: ["こうしょう"], mnemonicFr: "La NEGOCIATION.", levelId: 38 },
    { word: "対話", meaningsFr: ["Dialogue"], readings: ["たいわ"], mnemonicFr: "Le DIALOGUE.", levelId: 38 },
    { word: "討論", meaningsFr: ["Debat"], readings: ["とうろん"], mnemonicFr: "Le DEBAT.", levelId: 38 },
    { word: "発言", meaningsFr: ["Declaration"], readings: ["はつげん"], mnemonicFr: "La DECLARATION.", levelId: 38 },
    { word: "声明", meaningsFr: ["Declaration officielle"], readings: ["せいめい"], mnemonicFr: "La DECLARATION OFFICIELLE.", levelId: 38 },
    { word: "公表", meaningsFr: ["Annonce publique"], readings: ["こうひょう"], mnemonicFr: "L'ANNONCE PUBLIQUE.", levelId: 38 },
    // Technology
    { word: "技術", meaningsFr: ["Technologie"], readings: ["ぎじゅつ"], mnemonicFr: "La TECHNOLOGIE.", levelId: 38 },
    { word: "先端", meaningsFr: ["Pointe", "Avant-garde"], readings: ["せんたん"], mnemonicFr: "La POINTE.", levelId: 38 },
    { word: "革新", meaningsFr: ["Innovation"], readings: ["かくしん"], mnemonicFr: "L'INNOVATION.", levelId: 38 },
    { word: "発明", meaningsFr: ["Invention"], readings: ["はつめい"], mnemonicFr: "L'INVENTION.", levelId: 38 },
    { word: "特許", meaningsFr: ["Brevet"], readings: ["とっきょ"], mnemonicFr: "Le BREVET.", levelId: 38 },
    { word: "人工知能", meaningsFr: ["Intelligence artificielle"], readings: ["じんこうちのう"], mnemonicFr: "L'INTELLIGENCE ARTIFICIELLE.", levelId: 38 },
    { word: "ロボット", meaningsFr: ["Robot"], readings: ["ロボット"], mnemonicFr: "Le ROBOT.", levelId: 38 },
    { word: "自動化", meaningsFr: ["Automatisation"], readings: ["じどうか"], mnemonicFr: "L'AUTOMATISATION.", levelId: 38 },
    { word: "デジタル", meaningsFr: ["Numerique"], readings: ["デジタル"], mnemonicFr: "Le NUMERIQUE.", levelId: 38 },
    { word: "アナログ", meaningsFr: ["Analogique"], readings: ["アナログ"], mnemonicFr: "L'ANALOGIQUE.", levelId: 38 },
    { word: "ネットワーク", meaningsFr: ["Reseau"], readings: ["ネットワーク"], mnemonicFr: "Le RESEAU.", levelId: 38 },
    { word: "データベース", meaningsFr: ["Base de donnees"], readings: ["データベース"], mnemonicFr: "La BASE DE DONNEES.", levelId: 38 },
    { word: "ソフトウェア", meaningsFr: ["Logiciel"], readings: ["ソフトウェア"], mnemonicFr: "Le LOGICIEL.", levelId: 38 },
    { word: "ハードウェア", meaningsFr: ["Materiel"], readings: ["ハードウェア"], mnemonicFr: "Le MATERIEL.", levelId: 38 },
    { word: "アプリ", meaningsFr: ["Application"], readings: ["アプリ"], mnemonicFr: "L'APPLICATION.", levelId: 38 },
    { word: "ダウンロード", meaningsFr: ["Telechargement"], readings: ["ダウンロード"], mnemonicFr: "Le TELECHARGEMENT.", levelId: 38 },
    { word: "アップロード", meaningsFr: ["Telechargement (upload)"], readings: ["アップロード"], mnemonicFr: "Le TELECHARGEMENT (upload).", levelId: 38 },
    { word: "暗号", meaningsFr: ["Cryptage"], readings: ["あんごう"], mnemonicFr: "Le CRYPTAGE.", levelId: 38 },
    { word: "セキュリティ", meaningsFr: ["Securite"], readings: ["セキュリティ"], mnemonicFr: "La SECURITE informatique.", levelId: 38 },
    // Internet & Social media
    { word: "検索", meaningsFr: ["Recherche"], readings: ["けんさく"], mnemonicFr: "La RECHERCHE.", levelId: 38 },
    { word: "閲覧", meaningsFr: ["Consultation"], readings: ["えつらん"], mnemonicFr: "La CONSULTATION.", levelId: 38 },
    { word: "投稿", meaningsFr: ["Publication (post)"], readings: ["とうこう"], mnemonicFr: "La PUBLICATION (post).", levelId: 38 },
    { word: "共有", meaningsFr: ["Partage"], readings: ["きょうゆう"], mnemonicFr: "Le PARTAGE.", levelId: 38 },
    { word: "拡散", meaningsFr: ["Diffusion virale"], readings: ["かくさん"], mnemonicFr: "La DIFFUSION VIRALE.", levelId: 38 },
    { word: "炎上", meaningsFr: ["Polemique en ligne"], readings: ["えんじょう"], mnemonicFr: "La POLEMIQUE EN LIGNE.", levelId: 38 },
    { word: "フォロワー", meaningsFr: ["Abonne"], readings: ["フォロワー"], mnemonicFr: "L'ABONNE.", levelId: 38 },
    { word: "インフルエンサー", meaningsFr: ["Influenceur"], readings: ["インフルエンサー"], mnemonicFr: "L'INFLUENCEUR.", levelId: 38 },
  ];

  for (const vocab of level38Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 38 complete!", level38Vocab.length, "words");

  // ============================================
  // LEVEL 39 - Supplementary Vocabulary
  // JLPT N2/N1 - Emotions, psychology, relationships
  // ============================================

  const level39Vocab = [
    // Emotions
    { word: "感動", meaningsFr: ["Emotion", "Etre emu"], readings: ["かんどう"], mnemonicFr: "L'EMOTION.", levelId: 39 },
    { word: "感激", meaningsFr: ["Emotion intense"], readings: ["かんげき"], mnemonicFr: "L'EMOTION INTENSE.", levelId: 39 },
    { word: "感謝", meaningsFr: ["Gratitude"], readings: ["かんしゃ"], mnemonicFr: "La GRATITUDE.", levelId: 39 },
    { word: "感心", meaningsFr: ["Admiration"], readings: ["かんしん"], mnemonicFr: "L'ADMIRATION.", levelId: 39 },
    { word: "同情", meaningsFr: ["Sympathie"], readings: ["どうじょう"], mnemonicFr: "La SYMPATHIE.", levelId: 39 },
    { word: "共感", meaningsFr: ["Empathie"], readings: ["きょうかん"], mnemonicFr: "L'EMPATHIE.", levelId: 39 },
    { word: "喜び", meaningsFr: ["Joie"], readings: ["よろこび"], mnemonicFr: "La JOIE.", levelId: 39 },
    { word: "悲しみ", meaningsFr: ["Tristesse"], readings: ["かなしみ"], mnemonicFr: "La TRISTESSE.", levelId: 39 },
    { word: "怒り", meaningsFr: ["Colere"], readings: ["いかり"], mnemonicFr: "La COLERE.", levelId: 39 },
    { word: "恐れ", meaningsFr: ["Peur"], readings: ["おそれ"], mnemonicFr: "La PEUR.", levelId: 39 },
    { word: "不安", meaningsFr: ["Anxiete"], readings: ["ふあん"], mnemonicFr: "L'ANXIETE.", levelId: 39 },
    { word: "焦り", meaningsFr: ["Impatience"], readings: ["あせり"], mnemonicFr: "L'IMPATIENCE.", levelId: 39 },
    { word: "後悔", meaningsFr: ["Regret"], readings: ["こうかい"], mnemonicFr: "Le REGRET.", levelId: 39 },
    { word: "罪悪感", meaningsFr: ["Culpabilite"], readings: ["ざいあくかん"], mnemonicFr: "La CULPABILITE.", levelId: 39 },
    { word: "恥ずかしさ", meaningsFr: ["Honte"], readings: ["はずかしさ"], mnemonicFr: "La HONTE.", levelId: 39 },
    { word: "嫉妬", meaningsFr: ["Jalousie"], readings: ["しっと"], mnemonicFr: "La JALOUSIE.", levelId: 39 },
    { word: "羨望", meaningsFr: ["Envie"], readings: ["せんぼう"], mnemonicFr: "L'ENVIE.", levelId: 39 },
    { word: "憧れ", meaningsFr: ["Aspiration"], readings: ["あこがれ"], mnemonicFr: "L'ASPIRATION.", levelId: 39 },
    { word: "寂しさ", meaningsFr: ["Solitude"], readings: ["さびしさ"], mnemonicFr: "La SOLITUDE.", levelId: 39 },
    { word: "懐かしさ", meaningsFr: ["Nostalgie"], readings: ["なつかしさ"], mnemonicFr: "La NOSTALGIE.", levelId: 39 },
    // Psychology
    { word: "心理学", meaningsFr: ["Psychologie"], readings: ["しんりがく"], mnemonicFr: "La PSYCHOLOGIE.", levelId: 39 },
    { word: "精神", meaningsFr: ["Esprit"], readings: ["せいしん"], mnemonicFr: "L'ESPRIT.", levelId: 39 },
    { word: "精神的", meaningsFr: ["Mental"], readings: ["せいしんてき"], mnemonicFr: "MENTAL.", levelId: 39 },
    { word: "心情", meaningsFr: ["Etat d'esprit"], readings: ["しんじょう"], mnemonicFr: "L'ETAT D'ESPRIT.", levelId: 39 },
    { word: "心境", meaningsFr: ["Disposition"], readings: ["しんきょう"], mnemonicFr: "La DISPOSITION mentale.", levelId: 39 },
    { word: "性格", meaningsFr: ["Caractere"], readings: ["せいかく"], mnemonicFr: "Le CARACTERE.", levelId: 39 },
    { word: "人格", meaningsFr: ["Personnalite"], readings: ["じんかく"], mnemonicFr: "La PERSONNALITE.", levelId: 39 },
    { word: "気質", meaningsFr: ["Temperament"], readings: ["きしつ"], mnemonicFr: "Le TEMPERAMENT.", levelId: 39 },
    { word: "傾向", meaningsFr: ["Tendance"], readings: ["けいこう"], mnemonicFr: "La TENDANCE.", levelId: 39 },
    { word: "トラウマ", meaningsFr: ["Traumatisme"], readings: ["トラウマ"], mnemonicFr: "Le TRAUMATISME.", levelId: 39 },
    { word: "ストレス", meaningsFr: ["Stress"], readings: ["ストレス"], mnemonicFr: "Le STRESS.", levelId: 39 },
    { word: "鬱", meaningsFr: ["Depression"], readings: ["うつ"], mnemonicFr: "La DEPRESSION.", levelId: 39 },
    { word: "依存", meaningsFr: ["Dependance"], readings: ["いぞん"], mnemonicFr: "La DEPENDANCE.", levelId: 39 },
    // Relationships
    { word: "人間関係", meaningsFr: ["Relations humaines"], readings: ["にんげんかんけい"], mnemonicFr: "Les RELATIONS HUMAINES.", levelId: 39 },
    { word: "交際", meaningsFr: ["Frequentation"], readings: ["こうさい"], mnemonicFr: "La FREQUENTATION.", levelId: 39 },
    { word: "恋愛", meaningsFr: ["Amour"], readings: ["れんあい"], mnemonicFr: "L'AMOUR.", levelId: 39 },
    { word: "結婚", meaningsFr: ["Mariage"], readings: ["けっこん"], mnemonicFr: "Le MARIAGE.", levelId: 39 },
    { word: "夫婦", meaningsFr: ["Couple marie"], readings: ["ふうふ"], mnemonicFr: "Le COUPLE MARIE.", levelId: 39 },
    { word: "親子", meaningsFr: ["Parent et enfant"], readings: ["おやこ"], mnemonicFr: "PARENT ET ENFANT.", levelId: 39 },
    { word: "兄弟", meaningsFr: ["Freres et soeurs"], readings: ["きょうだい"], mnemonicFr: "FRERES ET SOEURS.", levelId: 39 },
    { word: "親戚", meaningsFr: ["Famille"], readings: ["しんせき"], mnemonicFr: "La FAMILLE.", levelId: 39 },
    { word: "絆", meaningsFr: ["Lien"], readings: ["きずな"], mnemonicFr: "Le LIEN.", levelId: 39 },
    { word: "信頼", meaningsFr: ["Confiance"], readings: ["しんらい"], mnemonicFr: "La CONFIANCE.", levelId: 39 },
    { word: "尊敬", meaningsFr: ["Respect"], readings: ["そんけい"], mnemonicFr: "Le RESPECT.", levelId: 39 },
    { word: "愛情", meaningsFr: ["Affection"], readings: ["あいじょう"], mnemonicFr: "L'AFFECTION.", levelId: 39 },
    { word: "友情", meaningsFr: ["Amitie"], readings: ["ゆうじょう"], mnemonicFr: "L'AMITIE.", levelId: 39 },
    { word: "対立", meaningsFr: ["Conflit"], readings: ["たいりつ"], mnemonicFr: "Le CONFLIT.", levelId: 39 },
    { word: "和解", meaningsFr: ["Reconciliation"], readings: ["わかい"], mnemonicFr: "La RECONCILIATION.", levelId: 39 },
    { word: "別れ", meaningsFr: ["Separation"], readings: ["わかれ"], mnemonicFr: "La SEPARATION.", levelId: 39 },
    { word: "出会い", meaningsFr: ["Rencontre"], readings: ["であい"], mnemonicFr: "La RENCONTRE.", levelId: 39 },
    { word: "再会", meaningsFr: ["Retrouvailles"], readings: ["さいかい"], mnemonicFr: "Les RETROUVAILLES.", levelId: 39 },
    // Character traits
    { word: "誠実", meaningsFr: ["Sincerite"], readings: ["せいじつ"], mnemonicFr: "La SINCERITE.", levelId: 39 },
    { word: "正直", meaningsFr: ["Honnetete"], readings: ["しょうじき"], mnemonicFr: "L'HONNETETE.", levelId: 39 },
    { word: "謙虚", meaningsFr: ["Modestie"], readings: ["けんきょ"], mnemonicFr: "La MODESTIE.", levelId: 39 },
    { word: "寛容", meaningsFr: ["Tolerance"], readings: ["かんよう"], mnemonicFr: "La TOLERANCE.", levelId: 39 },
    { word: "忍耐", meaningsFr: ["Patience"], readings: ["にんたい"], mnemonicFr: "La PATIENCE.", levelId: 39 },
    { word: "勇気", meaningsFr: ["Courage"], readings: ["ゆうき"], mnemonicFr: "Le COURAGE.", levelId: 39 },
    { word: "思いやり", meaningsFr: ["Bienveillance"], readings: ["おもいやり"], mnemonicFr: "La BIENVEILLANCE.", levelId: 39 },
  ];

  for (const vocab of level39Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 39 complete!", level39Vocab.length, "words");

  // ============================================
  // LEVEL 40 - Supplementary Vocabulary
  // JLPT N2/N1 - Advanced expressions, formal language
  // ============================================

  const level40Vocab = [
    // Formal conjunctions & expressions
    { word: "従って", meaningsFr: ["Par consequent"], readings: ["したがって"], mnemonicFr: "PAR CONSEQUENT.", levelId: 40 },
    { word: "故に", meaningsFr: ["C'est pourquoi"], readings: ["ゆえに"], mnemonicFr: "C'EST POURQUOI.", levelId: 40 },
    { word: "尤も", meaningsFr: ["Certes", "Toutefois"], readings: ["もっとも"], mnemonicFr: "CERTES, TOUTEFOIS.", levelId: 40 },
    { word: "却って", meaningsFr: ["Au contraire"], readings: ["かえって"], mnemonicFr: "AU CONTRAIRE.", levelId: 40 },
    { word: "寧ろ", meaningsFr: ["Plutot"], readings: ["むしろ"], mnemonicFr: "PLUTOT.", levelId: 40 },
    { word: "敢えて", meaningsFr: ["Oser"], readings: ["あえて"], mnemonicFr: "OSER.", levelId: 40 },
    { word: "辛うじて", meaningsFr: ["A peine", "De justesse"], readings: ["かろうじて"], mnemonicFr: "A PEINE, DE JUSTESSE.", levelId: 40 },
    { word: "概して", meaningsFr: ["En general"], readings: ["がいして"], mnemonicFr: "EN GENERAL.", levelId: 40 },
    { word: "一概に", meaningsFr: ["Sans distinction"], readings: ["いちがいに"], mnemonicFr: "SANS DISTINCTION.", levelId: 40 },
    { word: "漸く", meaningsFr: ["Enfin", "Finalement"], readings: ["ようやく"], mnemonicFr: "ENFIN, FINALEMENT.", levelId: 40 },
    { word: "遂に", meaningsFr: ["Finalement"], readings: ["ついに"], mnemonicFr: "FINALEMENT.", levelId: 40 },
    { word: "果たして", meaningsFr: ["En effet", "Vraiment"], readings: ["はたして"], mnemonicFr: "EN EFFET.", levelId: 40 },
    { word: "恐らく", meaningsFr: ["Probablement"], readings: ["おそらく"], mnemonicFr: "PROBABLEMENT.", levelId: 40 },
    { word: "万一", meaningsFr: ["Au cas ou"], readings: ["まんいち"], mnemonicFr: "AU CAS OU.", levelId: 40 },
    { word: "仮に", meaningsFr: ["Supposons que"], readings: ["かりに"], mnemonicFr: "SUPPOSONS QUE.", levelId: 40 },
    // Formal verbs
    { word: "申す", meaningsFr: ["Dire (humble)"], readings: ["もうす"], mnemonicFr: "DIRE (humble).", levelId: 40 },
    { word: "参る", meaningsFr: ["Aller/Venir (humble)"], readings: ["まいる"], mnemonicFr: "ALLER/VENIR (humble).", levelId: 40 },
    { word: "存じる", meaningsFr: ["Savoir (humble)"], readings: ["ぞんじる"], mnemonicFr: "SAVOIR (humble).", levelId: 40 },
    { word: "頂く", meaningsFr: ["Recevoir (humble)"], readings: ["いただく"], mnemonicFr: "RECEVOIR (humble).", levelId: 40 },
    { word: "差し上げる", meaningsFr: ["Donner (humble)"], readings: ["さしあげる"], mnemonicFr: "DONNER (humble).", levelId: 40 },
    { word: "召し上がる", meaningsFr: ["Manger (honorifique)"], readings: ["めしあがる"], mnemonicFr: "MANGER (honorifique).", levelId: 40 },
    { word: "いらっしゃる", meaningsFr: ["Etre (honorifique)"], readings: ["いらっしゃる"], mnemonicFr: "ETRE (honorifique).", levelId: 40 },
    { word: "おっしゃる", meaningsFr: ["Dire (honorifique)"], readings: ["おっしゃる"], mnemonicFr: "DIRE (honorifique).", levelId: 40 },
    { word: "ご覧になる", meaningsFr: ["Voir (honorifique)"], readings: ["ごらんになる"], mnemonicFr: "VOIR (honorifique).", levelId: 40 },
    { word: "お越しになる", meaningsFr: ["Venir (honorifique)"], readings: ["おこしになる"], mnemonicFr: "VENIR (honorifique).", levelId: 40 },
    // Business expressions
    { word: "恐れ入りますが", meaningsFr: ["Excusez-moi de vous deranger"], readings: ["おそれいりますが"], mnemonicFr: "EXCUSEZ-MOI DE VOUS DERANGER.", levelId: 40 },
    { word: "失礼いたします", meaningsFr: ["Veuillez m'excuser"], readings: ["しつれいいたします"], mnemonicFr: "VEUILLEZ M'EXCUSER.", levelId: 40 },
    { word: "お手数ですが", meaningsFr: ["Desolee de vous importuner"], readings: ["おてすうですが"], mnemonicFr: "DESOLEE DE VOUS IMPORTUNER.", levelId: 40 },
    { word: "ご検討ください", meaningsFr: ["Veuillez examiner"], readings: ["ごけんとうください"], mnemonicFr: "VEUILLEZ EXAMINER.", levelId: 40 },
    { word: "ご確認ください", meaningsFr: ["Veuillez confirmer"], readings: ["ごかくにんください"], mnemonicFr: "VEUILLEZ CONFIRMER.", levelId: 40 },
    { word: "お待ちしております", meaningsFr: ["Nous vous attendons"], readings: ["おまちしております"], mnemonicFr: "NOUS VOUS ATTENDONS.", levelId: 40 },
    { word: "承知いたしました", meaningsFr: ["Bien compris"], readings: ["しょうちいたしました"], mnemonicFr: "BIEN COMPRIS.", levelId: 40 },
    { word: "かしこまりました", meaningsFr: ["Bien entendu"], readings: ["かしこまりました"], mnemonicFr: "BIEN ENTENDU.", levelId: 40 },
    // Abstract concepts (advanced)
    { word: "本質的", meaningsFr: ["Essentiel"], readings: ["ほんしつてき"], mnemonicFr: "ESSENTIEL.", levelId: 40 },
    { word: "根本的", meaningsFr: ["Fondamental"], readings: ["こんぽんてき"], mnemonicFr: "FONDAMENTAL.", levelId: 40 },
    { word: "普遍的", meaningsFr: ["Universel"], readings: ["ふへんてき"], mnemonicFr: "UNIVERSEL.", levelId: 40 },
    { word: "相対的", meaningsFr: ["Relatif"], readings: ["そうたいてき"], mnemonicFr: "RELATIF.", levelId: 40 },
    { word: "絶対的", meaningsFr: ["Absolu"], readings: ["ぜったいてき"], mnemonicFr: "ABSOLU.", levelId: 40 },
    { word: "客観的", meaningsFr: ["Objectif"], readings: ["きゃっかんてき"], mnemonicFr: "OBJECTIF.", levelId: 40 },
    { word: "主観的", meaningsFr: ["Subjectif"], readings: ["しゅかんてき"], mnemonicFr: "SUBJECTIF.", levelId: 40 },
    { word: "抽象的", meaningsFr: ["Abstrait"], readings: ["ちゅうしょうてき"], mnemonicFr: "ABSTRAIT.", levelId: 40 },
    { word: "具体的", meaningsFr: ["Concret"], readings: ["ぐたいてき"], mnemonicFr: "CONCRET.", levelId: 40 },
    { word: "論理的", meaningsFr: ["Logique"], readings: ["ろんりてき"], mnemonicFr: "LOGIQUE.", levelId: 40 },
    { word: "感情的", meaningsFr: ["Emotionnel"], readings: ["かんじょうてき"], mnemonicFr: "EMOTIONNEL.", levelId: 40 },
    { word: "合理的", meaningsFr: ["Rationnel"], readings: ["ごうりてき"], mnemonicFr: "RATIONNEL.", levelId: 40 },
    { word: "非合理的", meaningsFr: ["Irrationnel"], readings: ["ひごうりてき"], mnemonicFr: "IRRATIONNEL.", levelId: 40 },
    // Literary vocabulary
    { word: "趣", meaningsFr: ["Charme", "Elegance"], readings: ["おもむき"], mnemonicFr: "Le CHARME, l'ELEGANCE.", levelId: 40 },
    { word: "風情", meaningsFr: ["Atmosphere"], readings: ["ふぜい"], mnemonicFr: "L'ATMOSPHERE.", levelId: 40 },
    { word: "情緒", meaningsFr: ["Sentimentalite"], readings: ["じょうちょ"], mnemonicFr: "La SENTIMENTALITE.", levelId: 40 },
    { word: "哀愁", meaningsFr: ["Melancolie"], readings: ["あいしゅう"], mnemonicFr: "La MELANCOLIE.", levelId: 40 },
    { word: "郷愁", meaningsFr: ["Nostalgie du pays"], readings: ["きょうしゅう"], mnemonicFr: "La NOSTALGIE DU PAYS.", levelId: 40 },
    { word: "切なさ", meaningsFr: ["Douleur emotionnelle"], readings: ["せつなさ"], mnemonicFr: "La DOULEUR EMOTIONNELLE.", levelId: 40 },
    { word: "儚さ", meaningsFr: ["Ephemere"], readings: ["はかなさ"], mnemonicFr: "L'EPHEMERE.", levelId: 40 },
    { word: "侘び寂び", meaningsFr: ["Wabi-sabi"], readings: ["わびさび"], mnemonicFr: "Le WABI-SABI.", levelId: 40 },
    { word: "無常", meaningsFr: ["Impermanence"], readings: ["むじょう"], mnemonicFr: "L'IMPERMANENCE.", levelId: 40 },
    { word: "悟り", meaningsFr: ["Illumination"], readings: ["さとり"], mnemonicFr: "L'ILLUMINATION.", levelId: 40 },
  ];

  for (const vocab of level40Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }
  console.log("Level 40 complete!", level40Vocab.length, "words");

  console.log("All levels 31-40 supplementary vocabulary complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
