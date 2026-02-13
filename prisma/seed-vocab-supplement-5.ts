import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Vocabulary for levels 16-30
const vocabData = [
  // Level 16 - Nature
  { word: "自然", meaningsFr: ["Nature"], readings: ["しぜん"], mnemonicFr: "Soi + ainsi = NATURE.", levelId: 16 },
  { word: "天気", meaningsFr: ["Météo"], readings: ["てんき"], mnemonicFr: "Ciel + énergie = MÉTÉO.", levelId: 16 },
  { word: "空気", meaningsFr: ["Air"], readings: ["くうき"], mnemonicFr: "Vide + énergie = AIR.", levelId: 16 },
  { word: "風", meaningsFr: ["Vent"], readings: ["かぜ"], mnemonicFr: "Le souffle de la nature - VENT.", levelId: 16 },
  { word: "雨", meaningsFr: ["Pluie"], readings: ["あめ"], mnemonicFr: "L'eau du ciel - PLUIE.", levelId: 16 },
  { word: "雪", meaningsFr: ["Neige"], readings: ["ゆき"], mnemonicFr: "L'eau blanche - NEIGE.", levelId: 16 },
  { word: "山", meaningsFr: ["Montagne"], readings: ["やま"], mnemonicFr: "L'élévation de terre - MONTAGNE.", levelId: 16 },
  { word: "海", meaningsFr: ["Mer"], readings: ["うみ"], mnemonicFr: "L'immensité bleue - MER.", levelId: 16 },

  // Level 17 - Animals
  { word: "動物", meaningsFr: ["Animal"], readings: ["どうぶつ"], mnemonicFr: "Chose qui bouge = ANIMAL.", levelId: 17 },
  { word: "犬", meaningsFr: ["Chien"], readings: ["いぬ"], mnemonicFr: "L'ami fidèle - CHIEN.", levelId: 17 },
  { word: "猫", meaningsFr: ["Chat"], readings: ["ねこ"], mnemonicFr: "L'animal indépendant - CHAT.", levelId: 17 },
  { word: "鳥", meaningsFr: ["Oiseau"], readings: ["とり"], mnemonicFr: "L'animal qui vole - OISEAU.", levelId: 17 },
  { word: "馬", meaningsFr: ["Cheval"], readings: ["うま"], mnemonicFr: "L'animal rapide - CHEVAL.", levelId: 17 },
  { word: "牛", meaningsFr: ["Vache"], readings: ["うし"], mnemonicFr: "L'animal de la ferme - VACHE.", levelId: 17 },
  { word: "魚", meaningsFr: ["Poisson"], readings: ["さかな"], mnemonicFr: "L'animal de l'eau - POISSON.", levelId: 17 },
  { word: "虫", meaningsFr: ["Insecte"], readings: ["むし"], mnemonicFr: "La petite bête - INSECTE.", levelId: 17 },

  // Level 18 - Plants
  { word: "植物", meaningsFr: ["Plante"], readings: ["しょくぶつ"], mnemonicFr: "Chose plantée = PLANTE.", levelId: 18 },
  { word: "花", meaningsFr: ["Fleur"], readings: ["はな"], mnemonicFr: "La beauté naturelle - FLEUR.", levelId: 18 },
  { word: "木", meaningsFr: ["Arbre"], readings: ["き"], mnemonicFr: "Le géant de la forêt - ARBRE.", levelId: 18 },
  { word: "草", meaningsFr: ["Herbe"], readings: ["くさ"], mnemonicFr: "La verdure du sol - HERBE.", levelId: 18 },
  { word: "葉", meaningsFr: ["Feuille"], readings: ["は"], mnemonicFr: "La partie verte - FEUILLE.", levelId: 18 },
  { word: "根", meaningsFr: ["Racine"], readings: ["ね"], mnemonicFr: "La partie cachée - RACINE.", levelId: 18 },
  { word: "種", meaningsFr: ["Graine"], readings: ["たね"], mnemonicFr: "Le début de la vie - GRAINE.", levelId: 18 },
  { word: "森", meaningsFr: ["Forêt"], readings: ["もり"], mnemonicFr: "Beaucoup d'arbres = FORÊT.", levelId: 18 },

  // Level 19 - Weather
  { word: "晴れ", meaningsFr: ["Beau temps"], readings: ["はれ"], mnemonicFr: "Le ciel dégagé - BEAU TEMPS.", levelId: 19 },
  { word: "曇り", meaningsFr: ["Nuageux"], readings: ["くもり"], mnemonicFr: "Le ciel couvert - NUAGEUX.", levelId: 19 },
  { word: "雷", meaningsFr: ["Tonnerre"], readings: ["かみなり"], mnemonicFr: "Le bruit du ciel - TONNERRE.", levelId: 19 },
  { word: "霧", meaningsFr: ["Brouillard"], readings: ["きり"], mnemonicFr: "Le voile de l'air - BROUILLARD.", levelId: 19 },
  { word: "台風", meaningsFr: ["Typhon"], readings: ["たいふう"], mnemonicFr: "Le grand vent - TYPHON.", levelId: 19 },
  { word: "地震", meaningsFr: ["Tremblement de terre"], readings: ["じしん"], mnemonicFr: "La terre qui tremble - SÉISME.", levelId: 19 },
  { word: "津波", meaningsFr: ["Tsunami"], readings: ["つなみ"], mnemonicFr: "La vague du port - TSUNAMI.", levelId: 19 },
  { word: "洪水", meaningsFr: ["Inondation"], readings: ["こうずい"], mnemonicFr: "L'eau qui déborde - INONDATION.", levelId: 19 },

  // Level 20 - Seasons
  { word: "季節", meaningsFr: ["Saison"], readings: ["きせつ"], mnemonicFr: "Le moment de l'année - SAISON.", levelId: 20 },
  { word: "春", meaningsFr: ["Printemps"], readings: ["はる"], mnemonicFr: "La saison du renouveau - PRINTEMPS.", levelId: 20 },
  { word: "夏", meaningsFr: ["Été"], readings: ["なつ"], mnemonicFr: "La saison chaude - ÉTÉ.", levelId: 20 },
  { word: "秋", meaningsFr: ["Automne"], readings: ["あき"], mnemonicFr: "La saison des feuilles - AUTOMNE.", levelId: 20 },
  { word: "冬", meaningsFr: ["Hiver"], readings: ["ふゆ"], mnemonicFr: "La saison froide - HIVER.", levelId: 20 },
  { word: "梅雨", meaningsFr: ["Saison des pluies"], readings: ["つゆ"], mnemonicFr: "La pluie de la prune - SAISON DES PLUIES.", levelId: 20 },
  { word: "紅葉", meaningsFr: ["Feuilles d'automne"], readings: ["もみじ"], mnemonicFr: "Les feuilles rouges - FEUILLES D'AUTOMNE.", levelId: 20 },
  { word: "桜", meaningsFr: ["Cerisier"], readings: ["さくら"], mnemonicFr: "L'arbre du printemps - CERISIER.", levelId: 20 },

  // Level 21 - School subjects
  { word: "科目", meaningsFr: ["Matière"], readings: ["かもく"], mnemonicFr: "Section + œil = MATIÈRE.", levelId: 21 },
  { word: "国語", meaningsFr: ["Japonais"], readings: ["こくご"], mnemonicFr: "Langue du pays = JAPONAIS.", levelId: 21 },
  { word: "算数", meaningsFr: ["Mathématiques"], readings: ["さんすう"], mnemonicFr: "Calculer les nombres = MATHÉMATIQUES.", levelId: 21 },
  { word: "理科", meaningsFr: ["Sciences"], readings: ["りか"], mnemonicFr: "Section de la raison = SCIENCES.", levelId: 21 },
  { word: "社会", meaningsFr: ["Sciences sociales"], readings: ["しゃかい"], mnemonicFr: "La société = SCIENCES SOCIALES.", levelId: 21 },
  { word: "英語", meaningsFr: ["Anglais"], readings: ["えいご"], mnemonicFr: "Langue de l'Angleterre = ANGLAIS.", levelId: 21 },
  { word: "歴史", meaningsFr: ["Histoire"], readings: ["れきし"], mnemonicFr: "Les événements passés = HISTOIRE.", levelId: 21 },
  { word: "地理", meaningsFr: ["Géographie"], readings: ["ちり"], mnemonicFr: "La raison de la terre = GÉOGRAPHIE.", levelId: 21 },

  // Level 22 - Classroom
  { word: "教室", meaningsFr: ["Salle de classe"], readings: ["きょうしつ"], mnemonicFr: "Pièce pour enseigner = SALLE DE CLASSE.", levelId: 22 },
  { word: "黒板", meaningsFr: ["Tableau noir"], readings: ["こくばん"], mnemonicFr: "Planche noire = TABLEAU.", levelId: 22 },
  { word: "机", meaningsFr: ["Bureau"], readings: ["つくえ"], mnemonicFr: "Le meuble pour écrire = BUREAU.", levelId: 22 },
  { word: "椅子", meaningsFr: ["Chaise"], readings: ["いす"], mnemonicFr: "Le siège = CHAISE.", levelId: 22 },
  { word: "教科書", meaningsFr: ["Manuel"], readings: ["きょうかしょ"], mnemonicFr: "Livre pour enseigner = MANUEL.", levelId: 22 },
  { word: "ノート", meaningsFr: ["Cahier"], readings: ["ノート"], mnemonicFr: "De l'anglais note = CAHIER.", levelId: 22 },
  { word: "鉛筆", meaningsFr: ["Crayon"], readings: ["えんぴつ"], mnemonicFr: "Pinceau de plomb = CRAYON.", levelId: 22 },
  { word: "消しゴム", meaningsFr: ["Gomme"], readings: ["けしゴム"], mnemonicFr: "Caoutchouc pour effacer = GOMME.", levelId: 22 },

  // Level 23 - Transportation
  { word: "交通", meaningsFr: ["Transport"], readings: ["こうつう"], mnemonicFr: "Croiser + passer = TRANSPORT.", levelId: 23 },
  { word: "電車", meaningsFr: ["Train"], readings: ["でんしゃ"], mnemonicFr: "Voiture électrique = TRAIN.", levelId: 23 },
  { word: "地下鉄", meaningsFr: ["Métro"], readings: ["ちかてつ"], mnemonicFr: "Fer souterrain = MÉTRO.", levelId: 23 },
  { word: "バス", meaningsFr: ["Bus"], readings: ["バス"], mnemonicFr: "De l'anglais bus = BUS.", levelId: 23 },
  { word: "タクシー", meaningsFr: ["Taxi"], readings: ["タクシー"], mnemonicFr: "De l'anglais taxi = TAXI.", levelId: 23 },
  { word: "自転車", meaningsFr: ["Vélo"], readings: ["じてんしゃ"], mnemonicFr: "Voiture qui tourne soi = VÉLO.", levelId: 23 },
  { word: "飛行機", meaningsFr: ["Avion"], readings: ["ひこうき"], mnemonicFr: "Machine qui vole = AVION.", levelId: 23 },
  { word: "船", meaningsFr: ["Bateau"], readings: ["ふね"], mnemonicFr: "Le véhicule de l'eau = BATEAU.", levelId: 23 },

  // Level 24 - Directions
  { word: "方向", meaningsFr: ["Direction"], readings: ["ほうこう"], mnemonicFr: "Côté + direction = DIRECTION.", levelId: 24 },
  { word: "右", meaningsFr: ["Droite"], readings: ["みぎ"], mnemonicFr: "Le côté droit = DROITE.", levelId: 24 },
  { word: "左", meaningsFr: ["Gauche"], readings: ["ひだり"], mnemonicFr: "Le côté gauche = GAUCHE.", levelId: 24 },
  { word: "真っ直ぐ", meaningsFr: ["Tout droit"], readings: ["まっすぐ"], mnemonicFr: "Parfaitement direct = TOUT DROIT.", levelId: 24 },
  { word: "曲がる", meaningsFr: ["Tourner"], readings: ["まがる"], mnemonicFr: "Changer de direction = TOURNER.", levelId: 24 },
  { word: "角", meaningsFr: ["Coin"], readings: ["かど"], mnemonicFr: "Le point de rencontre = COIN.", levelId: 24 },
  { word: "交差点", meaningsFr: ["Carrefour"], readings: ["こうさてん"], mnemonicFr: "Point de croisement = CARREFOUR.", levelId: 24 },
  { word: "信号", meaningsFr: ["Feu de circulation"], readings: ["しんごう"], mnemonicFr: "Signal de confiance = FEU.", levelId: 24 },

  // Level 25 - Position
  { word: "位置", meaningsFr: ["Position"], readings: ["いち"], mnemonicFr: "Rang + placement = POSITION.", levelId: 25 },
  { word: "前", meaningsFr: ["Devant"], readings: ["まえ"], mnemonicFr: "Ce qui est devant = DEVANT.", levelId: 25 },
  { word: "後ろ", meaningsFr: ["Derrière"], readings: ["うしろ"], mnemonicFr: "Ce qui est derrière = DERRIÈRE.", levelId: 25 },
  { word: "隣", meaningsFr: ["À côté"], readings: ["となり"], mnemonicFr: "Ce qui est proche = À CÔTÉ.", levelId: 25 },
  { word: "近く", meaningsFr: ["Près"], readings: ["ちかく"], mnemonicFr: "Ce qui est proche = PRÈS.", levelId: 25 },
  { word: "遠く", meaningsFr: ["Loin"], readings: ["とおく"], mnemonicFr: "Ce qui est distant = LOIN.", levelId: 25 },
  { word: "間", meaningsFr: ["Entre"], readings: ["あいだ"], mnemonicFr: "L'espace entre = ENTRE.", levelId: 25 },
  { word: "周り", meaningsFr: ["Autour"], readings: ["まわり"], mnemonicFr: "Ce qui entoure = AUTOUR.", levelId: 25 },

  // Level 26 - Communication
  { word: "話", meaningsFr: ["Conversation"], readings: ["はなし"], mnemonicFr: "L'échange de paroles = CONVERSATION.", levelId: 26 },
  { word: "質問", meaningsFr: ["Question"], readings: ["しつもん"], mnemonicFr: "Demande de qualité = QUESTION.", levelId: 26 },
  { word: "答え", meaningsFr: ["Réponse"], readings: ["こたえ"], mnemonicFr: "Ce qui répond = RÉPONSE.", levelId: 26 },
  { word: "説明", meaningsFr: ["Explication"], readings: ["せつめい"], mnemonicFr: "Éclaircir + lumière = EXPLICATION.", levelId: 26 },
  { word: "意見", meaningsFr: ["Opinion"], readings: ["いけん"], mnemonicFr: "Intention + voir = OPINION.", levelId: 26 },
  { word: "相談", meaningsFr: ["Consultation"], readings: ["そうだん"], mnemonicFr: "Mutuel + discussion = CONSULTATION.", levelId: 26 },
  { word: "約束", meaningsFr: ["Promesse"], readings: ["やくそく"], mnemonicFr: "Lier + paquet = PROMESSE.", levelId: 26 },
  { word: "連絡", meaningsFr: ["Contact"], readings: ["れんらく"], mnemonicFr: "Lier + tomber = CONTACT.", levelId: 26 },

  // Level 27 - Emotions
  { word: "気持ち", meaningsFr: ["Sentiment"], readings: ["きもち"], mnemonicFr: "Énergie + tenir = SENTIMENT.", levelId: 27 },
  { word: "嬉しい", meaningsFr: ["Content"], readings: ["うれしい"], mnemonicFr: "Ce qui réjouit = CONTENT.", levelId: 27 },
  { word: "悲しい", meaningsFr: ["Triste"], readings: ["かなしい"], mnemonicFr: "Ce qui attriste = TRISTE.", levelId: 27 },
  { word: "怖い", meaningsFr: ["Effrayant"], readings: ["こわい"], mnemonicFr: "Ce qui fait peur = EFFRAYANT.", levelId: 27 },
  { word: "楽しい", meaningsFr: ["Amusant"], readings: ["たのしい"], mnemonicFr: "Ce qui amuse = AMUSANT.", levelId: 27 },
  { word: "寂しい", meaningsFr: ["Solitaire"], readings: ["さびしい"], mnemonicFr: "Ce qui isole = SOLITAIRE.", levelId: 27 },
  { word: "恥ずかしい", meaningsFr: ["Embarrassant"], readings: ["はずかしい"], mnemonicFr: "Ce qui gêne = EMBARRASSANT.", levelId: 27 },
  { word: "懐かしい", meaningsFr: ["Nostalgique"], readings: ["なつかしい"], mnemonicFr: "Ce qui rappelle = NOSTALGIQUE.", levelId: 27 },

  // Level 28 - Character
  { word: "性格", meaningsFr: ["Personnalité"], readings: ["せいかく"], mnemonicFr: "Nature + cadre = PERSONNALITÉ.", levelId: 28 },
  { word: "優しい", meaningsFr: ["Gentil"], readings: ["やさしい"], mnemonicFr: "Ce qui est doux = GENTIL.", levelId: 28 },
  { word: "厳しい", meaningsFr: ["Strict"], readings: ["きびしい"], mnemonicFr: "Ce qui est sévère = STRICT.", levelId: 28 },
  { word: "真面目", meaningsFr: ["Sérieux"], readings: ["まじめ"], mnemonicFr: "Vrai + visage = SÉRIEUX.", levelId: 28 },
  { word: "正直", meaningsFr: ["Honnête"], readings: ["しょうじき"], mnemonicFr: "Correct + direct = HONNÊTE.", levelId: 28 },
  { word: "親切", meaningsFr: ["Aimable"], readings: ["しんせつ"], mnemonicFr: "Proche + couper = AIMABLE.", levelId: 28 },
  { word: "勇敢", meaningsFr: ["Courageux"], readings: ["ゆうかん"], mnemonicFr: "Brave + oser = COURAGEUX.", levelId: 28 },
  { word: "謙虚", meaningsFr: ["Modeste"], readings: ["けんきょ"], mnemonicFr: "Humble + vide = MODESTE.", levelId: 28 },

  // Level 29 - Health
  { word: "元気", meaningsFr: ["En forme"], readings: ["げんき"], mnemonicFr: "Origine + énergie = EN FORME.", levelId: 29 },
  { word: "病気", meaningsFr: ["Maladie"], readings: ["びょうき"], mnemonicFr: "Malade + énergie = MALADIE.", levelId: 29 },
  { word: "風邪", meaningsFr: ["Rhume"], readings: ["かぜ"], mnemonicFr: "Le mal du vent = RHUME.", levelId: 29 },
  { word: "熱", meaningsFr: ["Fièvre"], readings: ["ねつ"], mnemonicFr: "La chaleur du corps = FIÈVRE.", levelId: 29 },
  { word: "怪我", meaningsFr: ["Blessure"], readings: ["けが"], mnemonicFr: "Étrange + je = BLESSURE.", levelId: 29 },
  { word: "薬", meaningsFr: ["Médicament"], readings: ["くすり"], mnemonicFr: "La plante qui soigne = MÉDICAMENT.", levelId: 29 },
  { word: "注射", meaningsFr: ["Injection"], readings: ["ちゅうしゃ"], mnemonicFr: "Verser + tirer = INJECTION.", levelId: 29 },
  { word: "手術", meaningsFr: ["Opération"], readings: ["しゅじゅつ"], mnemonicFr: "Main + technique = OPÉRATION.", levelId: 29 },

  // Level 30 - Daily life
  { word: "生活", meaningsFr: ["Vie quotidienne"], readings: ["せいかつ"], mnemonicFr: "Vie + activité = VIE QUOTIDIENNE.", levelId: 30 },
  { word: "朝食", meaningsFr: ["Petit-déjeuner"], readings: ["ちょうしょく"], mnemonicFr: "Repas du matin = PETIT-DÉJEUNER.", levelId: 30 },
  { word: "昼食", meaningsFr: ["Déjeuner"], readings: ["ちゅうしょく"], mnemonicFr: "Repas de midi = DÉJEUNER.", levelId: 30 },
  { word: "夕食", meaningsFr: ["Dîner"], readings: ["ゆうしょく"], mnemonicFr: "Repas du soir = DÎNER.", levelId: 30 },
  { word: "睡眠", meaningsFr: ["Sommeil"], readings: ["すいみん"], mnemonicFr: "Dormir + œil = SOMMEIL.", levelId: 30 },
  { word: "休憩", meaningsFr: ["Pause"], readings: ["きゅうけい"], mnemonicFr: "Repos + se calmer = PAUSE.", levelId: 30 },
  { word: "趣味", meaningsFr: ["Loisir"], readings: ["しゅみ"], mnemonicFr: "Courir + goût = LOISIR.", levelId: 30 },
  { word: "習慣", meaningsFr: ["Habitude"], readings: ["しゅうかん"], mnemonicFr: "Apprendre + habituel = HABITUDE.", levelId: 30 },
];

async function main() {
  console.log("Seeding vocabulary supplement 5 (levels 16-30)...");

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
