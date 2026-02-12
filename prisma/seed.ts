import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create levels 1-10
  for (let i = 1; i <= 10; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // ============================================
  // LEVEL 1 - The Foundations (Visual Simplicity)
  // ============================================

  // Level 1 Radicals - Single strokes and basic shapes
  const level1Radicals = [
    {
      character: "一",
      meaningFr: "Un",
      mnemonic: "Imagine un samouraï qui trace UN seul coup d'épée parfait dans l'air. Ce trait horizontal représente ce coup unique et décisif. UN trait, UN coup, UN sens."
    },
    {
      character: "二",
      meaningFr: "Deux",
      mnemonic: "DEUX baguettes posées l'une sur l'autre, comme celles qu'on utilise pour manger des sushis. La baguette du haut est plus courte - elle a été grignotée !"
    },
    {
      character: "三",
      meaningFr: "Trois",
      mnemonic: "TROIS étagères empilées dans un konbini japonais. Sur chaque étagère, des onigiri bien alignés. Le trait du milieu est plus long car c'est l'étagère principale."
    },
    {
      character: "十",
      meaningFr: "Dix",
      mnemonic: "Une croix comme le X romain qui vaut DIX. Imagine un carrefour à Tokyo avec des gens qui traversent dans les DIX directions possibles !"
    },
    {
      character: "口",
      meaningFr: "Bouche",
      mnemonic: "Un carré ouvert, c'est une BOUCHE vue de face qui dit 'O' ! Quand tu es surpris, ta bouche forme ce carré parfait. 'Oh !' fait ta BOUCHE."
    },
    {
      character: "日",
      meaningFr: "Soleil",
      mnemonic: "Le SOLEIL du Japon, encadré dans un rectangle ! La ligne au milieu ? C'est un nuage qui passe devant. Mais le SOLEIL brille toujours, comme sur le drapeau japonais."
    },
    {
      character: "月",
      meaningFr: "Lune",
      mnemonic: "Une LUNE avec ses deux pattes ! Imagine la LUNE qui court dans le ciel de nuit, ses petites jambes la font avancer de mois en mois."
    },
    {
      character: "山",
      meaningFr: "Montagne",
      mnemonic: "Trois pics ! C'est le Mont Fuji vu de loin. La MONTAGNE sacrée du Japon avec son sommet central plus haut que les autres."
    },
    {
      character: "川",
      meaningFr: "Rivière",
      mnemonic: "Trois traits qui coulent vers le bas, comme l'eau d'une RIVIÈRE. Imagine les trois courants d'une RIVIÈRE japonaise où nagent les carpes koï."
    },
    {
      character: "木",
      meaningFr: "Arbre",
      mnemonic: "Un ARBRE avec son tronc, ses racines en bas et ses branches en haut ! C'est un cerisier japonais prêt à fleurir au printemps."
    },
  ];

  for (const radical of level1Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 1 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 1,
      },
    });
  }

  // Level 1 Kanji
  const level1Kanji = [
    {
      character: "一",
      meaningsFr: ["Un", "Premier"],
      readingsOn: ["イチ"],
      readingsKun: ["ひと-", "ひとつ"],
      meaningMnemonicFr: "UN seul trait horizontal, UN seul coup d'épée du samouraï. C'est le chiffre UN, le premier de tous.",
      readingMnemonicFr: "ICHI sonne comme 'itchy' (ça démange). Tu as UNE seule piqûre de moustique qui te démange !",
    },
    {
      character: "二",
      meaningsFr: ["Deux", "Deuxième"],
      readingsOn: ["ニ"],
      readingsKun: ["ふた-", "ふたつ"],
      meaningMnemonicFr: "DEUX traits empilés comme DEUX baguettes pour manger. Le DEUXIÈME est plus court car on l'a déjà utilisé !",
      readingMnemonicFr: "NI comme 'knee' (genou). Tu as DEUX genoux, un de chaque côté !",
    },
    {
      character: "三",
      meaningsFr: ["Trois", "Troisième"],
      readingsOn: ["サン"],
      readingsKun: ["み-", "みっつ"],
      meaningMnemonicFr: "TROIS étagères de konbini empilées. Le trait du milieu est plus long car c'est l'étagère principale avec le plus de produits.",
      readingMnemonicFr: "SAN comme le prénom 'Jean' en japonais. Un SAN-dwich a TROIS couches !",
    },
    {
      character: "十",
      meaningsFr: ["Dix"],
      readingsOn: ["ジュウ"],
      readingsKun: ["とお"],
      meaningMnemonicFr: "Une croix comme le X romain (DIX). C'est le carrefour de Shibuya où DIX mille personnes traversent !",
      readingMnemonicFr: "JUU sonne comme 'joue'. Tu as DIX doigts pour te pincer les joues !",
    },
    {
      character: "日",
      meaningsFr: ["Soleil", "Jour"],
      readingsOn: ["ニチ", "ジツ"],
      readingsKun: ["ひ"],
      meaningMnemonicFr: "Le SOLEIL du drapeau japonais encadré ! La ligne horizontale ? Un nuage qui passe. Chaque JOUR le SOLEIL se lève.",
      readingMnemonicFr: "NICHI comme 'niche'. Le SOLEIL brille sur ta niche pour chien. HI comme 'hiii' quand le SOLEIL te réveille !",
    },
    {
      character: "月",
      meaningsFr: ["Lune", "Mois"],
      readingsOn: ["ゲツ", "ガツ"],
      readingsKun: ["つき"],
      meaningMnemonicFr: "La LUNE avec ses deux pattes qui court dans le ciel ! Chaque MOIS elle fait le tour de la Terre.",
      readingMnemonicFr: "GETSU comme 'get sue'. Chaque MOIS tu 'gets you' une nouvelle facture ! TSUKI sonne comme 'ski' - on skie sous la LUNE.",
    },
  ];

  for (let i = 0; i < level1Kanji.length; i++) {
    const kanji = level1Kanji[i];
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 1,
      },
    });
  }

  // Level 1 Vocabulary
  const level1Vocab = [
    {
      word: "一",
      meaningsFr: ["Un"],
      readings: ["いち"],
      mnemonicFr: "Le kanji seul se lit ICHI. C'est le chiffre UN tout simple !",
      sentenceJp: "一から十まで数えてください。",
      sentenceFr: "Comptez de un à dix s'il vous plaît.",
    },
    {
      word: "二",
      meaningsFr: ["Deux"],
      readings: ["に"],
      mnemonicFr: "Le kanji seul se lit NI. C'est le chiffre DEUX !",
      sentenceJp: "二つのりんごがあります。",
      sentenceFr: "Il y a deux pommes.",
    },
    {
      word: "三",
      meaningsFr: ["Trois"],
      readings: ["さん"],
      mnemonicFr: "Le kanji seul se lit SAN. C'est le chiffre TROIS !",
      sentenceJp: "三人の学生がいます。",
      sentenceFr: "Il y a trois étudiants.",
    },
    {
      word: "十",
      meaningsFr: ["Dix"],
      readings: ["じゅう"],
      mnemonicFr: "Le kanji seul se lit JUU. C'est le chiffre DIX !",
      sentenceJp: "十分待ってください。",
      sentenceFr: "Attendez dix minutes s'il vous plaît.",
    },
    {
      word: "一日",
      meaningsFr: ["Premier jour", "Un jour"],
      readings: ["いちにち", "ついたち"],
      mnemonicFr: "UN + JOUR = le premier JOUR du mois ou une journée entière. TSUITACHI est la lecture spéciale pour le 1er du mois !",
      sentenceJp: "一日は日曜日です。",
      sentenceFr: "Le premier est un dimanche.",
    },
    {
      word: "二日",
      meaningsFr: ["Deuxième jour", "Deux jours"],
      readings: ["ふつか"],
      mnemonicFr: "DEUX + JOUR = le deuxième JOUR du mois. FUTSUKA est une lecture spéciale à mémoriser !",
      sentenceJp: "二日に会いましょう。",
      sentenceFr: "Retrouvons-nous le deux.",
    },
  ];

  for (const vocab of level1Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 1 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 1,
      },
    });
  }

  // ============================================
  // LEVEL 2 - Basic Elements
  // ============================================

  const level2Radicals = [
    {
      character: "火",
      meaningFr: "Feu",
      mnemonic: "Des flammes qui s'élèvent ! On voit une personne (人) au milieu avec des étincelles qui jaillissent. Le FEU danse et crépite."
    },
    {
      character: "水",
      meaningFr: "Eau",
      mnemonic: "Une cascade d'EAU ! Le trait de gauche est la chute principale, les autres sont les éclaboussures. L'EAU coule toujours vers le bas."
    },
    {
      character: "土",
      meaningFr: "Terre",
      mnemonic: "Une croix plantée dans le sol (+) sur une ligne horizontale qui représente la TERRE. C'est un samouraï enterré avec sa croix tombale."
    },
    {
      character: "金",
      meaningFr: "Or/Métal",
      mnemonic: "Un toit (人) qui protège des lingots d'OR précieux en dessous ! L'OR est gardé dans un coffre-fort avec ce toit pointu."
    },
    {
      character: "人",
      meaningFr: "Personne",
      mnemonic: "Une PERSONNE qui marche, vue de côté ! Ses deux jambes font ce 'A' renversé. C'est toi qui marches dans les rues de Tokyo !"
    },
    {
      character: "大",
      meaningFr: "Grand",
      mnemonic: "Une personne (人) qui écarte les bras pour dire 'C'est GRAAAND !' Le trait horizontal, ce sont ses bras tendus pour montrer la taille."
    },
    {
      character: "小",
      meaningFr: "Petit",
      mnemonic: "Un PETIT point avec deux PETITS traits qui tombent. C'est une goutte qui se divise en devenant de plus en plus PETITE."
    },
    {
      character: "中",
      meaningFr: "Milieu/Centre",
      mnemonic: "Une flèche qui transperce le MILIEU d'une cible carrée ! La ligne verticale passe pile au CENTRE du rectangle. Dans le mille !"
    },
  ];

  for (const radical of level2Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 2 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 2,
      },
    });
  }

  const level2Kanji = [
    {
      character: "火",
      meaningsFr: ["Feu"],
      readingsOn: ["カ"],
      readingsKun: ["ひ"],
      meaningMnemonicFr: "Les flammes dansent ! On voit presque une personne au milieu du FEU, entourée d'étincelles qui jaillissent de partout.",
      readingMnemonicFr: "KA comme 'car' - le FEU peut brûler une voiture ! HI comme 'hii' le cri quand on se brûle !",
    },
    {
      character: "水",
      meaningsFr: ["Eau"],
      readingsOn: ["スイ"],
      readingsKun: ["みず"],
      meaningMnemonicFr: "Une cascade d'EAU ! Le trait central est la chute d'eau principale, les autres sont les éclaboussures sur les côtés.",
      readingMnemonicFr: "SUI comme 'sweet' - l'EAU fraîche est douce et sucrée après une longue marche ! MIZU sonne comme 'miss you' - l'EAU te manque dans le désert.",
    },
    {
      character: "人",
      meaningsFr: ["Personne", "Homme"],
      readingsOn: ["ジン", "ニン"],
      readingsKun: ["ひと"],
      meaningMnemonicFr: "Une PERSONNE qui marche vue de côté. Ses deux jambes forment un 'A' renversé. C'est toi qui te promènes à Tokyo !",
      readingMnemonicFr: "JIN comme 'jeans' - une PERSONNE porte des jeans ! NIN comme 'ninja' - un ninja est aussi une PERSONNE ! HITO comme 'heat' - une PERSONNE dégage de la chaleur.",
    },
    {
      character: "大",
      meaningsFr: ["Grand", "Gros"],
      readingsOn: ["ダイ", "タイ"],
      readingsKun: ["おお-"],
      meaningMnemonicFr: "Une personne qui écarte les bras pour montrer 'C'est GRAAAND comme ça !' Le trait horizontal ce sont ses bras tendus.",
      readingMnemonicFr: "DAI comme 'die' - quelque chose de GRAND peut t'écraser ! TAI comme 'tie' - une GRANDE cravate. OO comme 'oh!' d'admiration devant quelque chose de GRAND !",
    },
    {
      character: "小",
      meaningsFr: ["Petit"],
      readingsOn: ["ショウ"],
      readingsKun: ["ちい-", "こ-", "お-"],
      meaningMnemonicFr: "Un PETIT point avec deux PETITS traits qui tombent comme une goutte qui se divise en devenant de plus en plus PETITE.",
      readingMnemonicFr: "SHOU comme 'show' - un PETIT spectacle intime ! CHII comme 'cheese' - un PETIT morceau de fromage !",
    },
    {
      character: "中",
      meaningsFr: ["Milieu", "Centre", "Intérieur"],
      readingsOn: ["チュウ"],
      readingsKun: ["なか"],
      meaningMnemonicFr: "Une flèche qui transperce pile au MILIEU d'une cible ! La ligne passe au CENTRE du rectangle. Dans le mille !",
      readingMnemonicFr: "CHUU comme 'chew' - tu mâches au MILIEU de ta bouche ! NAKA comme 'nachos' - le fromage est au MILIEU des nachos !",
    },
  ];

  for (const kanji of level2Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 2,
      },
    });
  }

  const level2Vocab = [
    {
      word: "火",
      meaningsFr: ["Feu"],
      readings: ["ひ"],
      mnemonicFr: "Le kanji seul se lit HI. C'est le FEU simple et direct !",
    },
    {
      word: "水",
      meaningsFr: ["Eau"],
      readings: ["みず"],
      mnemonicFr: "Le kanji seul se lit MIZU. C'est l'EAU que tu bois !",
    },
    {
      word: "大きい",
      meaningsFr: ["Grand"],
      readings: ["おおきい"],
      mnemonicFr: "GRAND + きい = l'adjectif 'grand'. OOKII décrit quelque chose de GRAND !",
    },
    {
      word: "小さい",
      meaningsFr: ["Petit"],
      readings: ["ちいさい"],
      mnemonicFr: "PETIT + さい = l'adjectif 'petit'. CHIISAI décrit quelque chose de PETIT !",
    },
    {
      word: "中",
      meaningsFr: ["Milieu", "Dedans"],
      readings: ["なか"],
      mnemonicFr: "Le kanji seul se lit NAKA. C'est le MILIEU ou l'intérieur de quelque chose !",
    },
    {
      word: "一人",
      meaningsFr: ["Une personne", "Seul"],
      readings: ["ひとり"],
      mnemonicFr: "UN + PERSONNE = UNE seule PERSONNE. HITORI c'est être seul, juste une personne !",
    },
    {
      word: "二人",
      meaningsFr: ["Deux personnes"],
      readings: ["ふたり"],
      mnemonicFr: "DEUX + PERSONNE = DEUX PERSONNES. FUTARI c'est un couple, un duo !",
    },
    {
      word: "大人",
      meaningsFr: ["Adulte"],
      readings: ["おとな"],
      mnemonicFr: "GRAND + PERSONNE = une grande personne = un ADULTE ! OTONA c'est quelqu'un qui a grandi.",
    },
    {
      word: "人",
      meaningsFr: ["Personne"],
      readings: ["ひと"],
      mnemonicFr: "Le kanji seul se lit HITO. C'est une PERSONNE, n'importe qui !",
    },
  ];

  for (const vocab of level2Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 2 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 2,
      },
    });
  }

  // ============================================
  // LEVEL 3 - Combining Elements
  // ============================================

  const level3Radicals = [
    { character: "女", meaningFr: "Femme", mnemonic: "Une FEMME assise élégamment, les jambes croisées. On voit sa silhouette gracieuse avec ses bras qui se croisent devant elle." },
    { character: "子", meaningFr: "Enfant", mnemonic: "Un ENFANT qui lève les bras pour qu'on le porte ! Le trait horizontal ce sont ses petits bras tendus vers ses parents." },
    { character: "力", meaningFr: "Force", mnemonic: "Un bras musclé qui se plie ! C'est le biceps d'un lutteur sumo qui montre sa FORCE. Regarde ce muscle !" },
    { character: "田", meaningFr: "Rizière", mnemonic: "Vue aérienne d'une RIZIÈRE japonaise divisée en quatre parcelles par les chemins d'irrigation. Chaque carré est une partie de la RIZIÈRE." },
    { character: "目", meaningFr: "Oeil", mnemonic: "Un OEIL vu de face ! Le rectangle vertical avec les lignes dedans, c'est l'iris et la pupille. L'OEIL te regarde !" },
    { character: "耳", meaningFr: "Oreille", mnemonic: "Une OREILLE avec tous ses replis ! Les lignes à l'intérieur représentent le pavillon de l'OREILLE. Tu peux presque la voir bouger pour écouter." },
    { character: "手", meaningFr: "Main", mnemonic: "Une MAIN avec ses doigts ! Les traits horizontaux sont les doigts et le trait vertical est la paume. Lève ta MAIN !" },
    { character: "足", meaningFr: "Pied/Jambe", mnemonic: "Un PIED avec sa jambe au-dessus ! La partie du haut est le genou, celle du bas avec les traits c'est le PIED avec ses orteils." },
    { character: "門", meaningFr: "Porte", mnemonic: "Une grande PORTE traditionnelle japonaise (torii) avec ses deux battants ! Tu passes sous cette PORTE pour entrer au temple." },
    { character: "雨", meaningFr: "Pluie", mnemonic: "Un nuage (la ligne du haut) avec des gouttes de PLUIE qui tombent ! Les petits traits à l'intérieur sont les gouttes de PLUIE." },
  ];

  for (const radical of level3Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 3 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 3,
      },
    });
  }

  const level3Kanji = [
    {
      character: "女",
      meaningsFr: ["Femme", "Féminin"],
      readingsOn: ["ジョ", "ニョ"],
      readingsKun: ["おんな"],
      meaningMnemonicFr: "Une FEMME assise élégamment, jambes croisées, bras repliés. La grâce féminine dans un seul caractère !",
      readingMnemonicFr: "JO comme 'Jo' un prénom. ONNA sonne comme 'on a' - 'On a une FEMME élégante ici !'",
    },
    {
      character: "子",
      meaningsFr: ["Enfant", "Fils"],
      readingsOn: ["シ", "ス"],
      readingsKun: ["こ"],
      meaningMnemonicFr: "Un ENFANT qui lève ses petits bras pour être porté ! Le trait horizontal ce sont ses bras tendus vers ses parents.",
      readingMnemonicFr: "SHI comme 'she'. KO comme 'ko' dans 'koala' - un bébé koala est un ENFANT koala !",
    },
    {
      character: "力",
      meaningsFr: ["Force", "Puissance"],
      readingsOn: ["リョク", "リキ"],
      readingsKun: ["ちから"],
      meaningMnemonicFr: "Un biceps plié qui montre toute sa FORCE ! C'est le bras d'un lutteur sumo prêt au combat !",
      readingMnemonicFr: "RYOKU comme 'roc' - solide comme un roc grâce à la FORCE ! CHIKARA sonne comme 'chi-power' - l'énergie vitale !",
    },
    {
      character: "田",
      meaningsFr: ["Rizière", "Champ de riz"],
      readingsOn: ["デン"],
      readingsKun: ["た"],
      meaningMnemonicFr: "Vue du ciel d'une RIZIÈRE divisée en quatre parcelles parfaites. Les chemins d'irrigation séparent chaque partie du champ.",
      readingMnemonicFr: "DEN comme 'dent' - les parcelles sont rangées comme des dents ! TA comme 'ta' en français - 'Ta RIZIÈRE est belle !'",
    },
    {
      character: "目",
      meaningsFr: ["Oeil", "Regard"],
      readingsOn: ["モク", "ボク"],
      readingsKun: ["め"],
      meaningMnemonicFr: "Un OEIL grand ouvert qui te fixe ! Les lignes horizontales sont l'iris et la pupille. Il voit tout !",
      readingMnemonicFr: "MOKU comme 'moqueur' - un OEIL moqueur qui te regarde ! ME comme 'mé' - 'regarde-ME avec tes YEUX !'",
    },
    {
      character: "男",
      meaningsFr: ["Homme", "Masculin"],
      readingsOn: ["ダン", "ナン"],
      readingsKun: ["おとこ"],
      meaningMnemonicFr: "Une RIZIÈRE (田) + FORCE (力) = un HOMME qui travaille aux champs avec force ! L'HOMME traditionnel cultive la terre.",
      readingMnemonicFr: "DAN comme 'dans' - l'HOMME dans le champ ! OTOKO sonne comme 'auto-ko' - un HOMME qui fait tout seul !",
    },
    {
      character: "好",
      meaningsFr: ["Aimer", "Bien"],
      readingsOn: ["コウ"],
      readingsKun: ["す-き", "この-む"],
      meaningMnemonicFr: "FEMME (女) + ENFANT (子) = l'amour d'une mère pour son enfant ! C'est AIMER dans sa forme la plus pure.",
      readingMnemonicFr: "KOU comme 'cou' - AIMER quelqu'un c'est vouloir l'embrasser dans le cou ! SUKI comme 'ski' - 'J'AIME le ski !'",
    },
    {
      character: "手",
      meaningsFr: ["Main"],
      readingsOn: ["シュ"],
      readingsKun: ["て"],
      meaningMnemonicFr: "Une MAIN avec ses doigts écartés ! Les traits horizontaux sont les doigts, le trait vertical est la paume. Tends la MAIN !",
      readingMnemonicFr: "SHU comme 'shoe' - tu mets tes chaussures avec tes MAINS ! TE comme 'thé' - tu tiens ta tasse de thé dans ta MAIN !",
    },
    {
      character: "足",
      meaningsFr: ["Pied", "Jambe", "Suffisant"],
      readingsOn: ["ソク"],
      readingsKun: ["あし", "た-りる"],
      meaningMnemonicFr: "Un PIED avec la jambe au-dessus ! La partie haute est le genou (口) et les traits du bas sont les orteils du PIED.",
      readingMnemonicFr: "SOKU comme 'soccer' - tu joues au foot avec tes PIEDS ! ASHI comme 'ashi' - 'j'ai mal aux PIEDS !'",
    },
    {
      character: "雨",
      meaningsFr: ["Pluie"],
      readingsOn: ["ウ"],
      readingsKun: ["あめ"],
      meaningMnemonicFr: "Un nuage (le toit) avec des gouttes de PLUIE qui tombent ! Les points à l'intérieur sont les gouttes qui dégoulinent.",
      readingMnemonicFr: "U comme 'ouh' - 'Ouh, il pleut !' AME comme 'amer' - la PLUIE peut rendre amer quand on est trempé !",
    },
  ];

  for (const kanji of level3Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 3,
      },
    });
  }

  const level3Vocab = [
    { word: "女", meaningsFr: ["Femme"], readings: ["おんな"], mnemonicFr: "Le kanji seul se lit ONNA. C'est une FEMME tout simplement !" },
    { word: "子", meaningsFr: ["Enfant"], readings: ["こ"], mnemonicFr: "Le kanji seul se lit KO. C'est un ENFANT !" },
    { word: "女の子", meaningsFr: ["Fille"], readings: ["おんなのこ"], mnemonicFr: "FEMME + ENFANT = une FILLE ! ONNA NO KO, c'est un enfant de sexe féminin." },
    { word: "男の子", meaningsFr: ["Garçon"], readings: ["おとこのこ"], mnemonicFr: "HOMME + ENFANT = un GARÇON ! OTOKO NO KO, c'est un enfant de sexe masculin." },
    { word: "力", meaningsFr: ["Force"], readings: ["ちから"], mnemonicFr: "Le kanji seul se lit CHIKARA. C'est la FORCE pure !" },
    { word: "目", meaningsFr: ["Oeil"], readings: ["め"], mnemonicFr: "Le kanji seul se lit ME. C'est l'OEIL !" },
    { word: "手", meaningsFr: ["Main"], readings: ["て"], mnemonicFr: "Le kanji seul se lit TE. C'est la MAIN !" },
    { word: "足", meaningsFr: ["Pied", "Jambe"], readings: ["あし"], mnemonicFr: "Le kanji seul se lit ASHI. C'est le PIED ou la JAMBE !" },
    { word: "雨", meaningsFr: ["Pluie"], readings: ["あめ"], mnemonicFr: "Le kanji seul se lit AME. C'est la PLUIE !" },
    { word: "好き", meaningsFr: ["Aimer", "Préféré"], readings: ["すき"], mnemonicFr: "AIMER + き = SUKI, 'j'aime' ou 'mon préféré' !" },
    { word: "大好き", meaningsFr: ["Adorer"], readings: ["だいすき"], mnemonicFr: "GRAND + AIMER = ADORER ! DAI SUKI c'est aimer très très fort !" },
    { word: "男", meaningsFr: ["Homme"], readings: ["おとこ"], mnemonicFr: "Le kanji seul se lit OTOKO. C'est un HOMME !" },
    { word: "田んぼ", meaningsFr: ["Rizière"], readings: ["たんぼ"], mnemonicFr: "RIZIÈRE + んぼ = TANBO, une vraie rizière inondée !" },
    { word: "上手", meaningsFr: ["Doué", "Habile"], readings: ["じょうず"], mnemonicFr: "DESSUS + MAIN = avoir la main au-dessus = être DOUÉ, HABILE ! JOUZU c'est être bon dans quelque chose." },
    { word: "下手", meaningsFr: ["Maladroit"], readings: ["へた"], mnemonicFr: "DESSOUS + MAIN = avoir la main en dessous = être MALADROIT ! HETA c'est ne pas être doué." },
    { word: "三人", meaningsFr: ["Trois personnes"], readings: ["さんにん"], mnemonicFr: "TROIS + PERSONNE = trois personnes. SANNIN c'est un groupe de trois !" },
  ];

  for (const vocab of level3Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 3 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 3,
      },
    });
  }

  // ============================================
  // Create kanji-radical relationships
  // ============================================
  const kanjiRadicalRelations = [
    // Level 1 - kanji = radical
    { kanjiChar: "一", radicalChars: ["一"] },
    { kanjiChar: "二", radicalChars: ["二"] },
    { kanjiChar: "三", radicalChars: ["三"] },
    { kanjiChar: "十", radicalChars: ["十"] },
    { kanjiChar: "日", radicalChars: ["日"] },
    { kanjiChar: "月", radicalChars: ["月"] },
    // Level 2 - kanji = radical
    { kanjiChar: "火", radicalChars: ["火"] },
    { kanjiChar: "水", radicalChars: ["水"] },
    { kanjiChar: "人", radicalChars: ["人"] },
    { kanjiChar: "大", radicalChars: ["大"] },
    { kanjiChar: "小", radicalChars: ["小"] },
    { kanjiChar: "中", radicalChars: ["中"] },
    // Level 3 - composite kanji
    { kanjiChar: "女", radicalChars: ["女"] },
    { kanjiChar: "子", radicalChars: ["子"] },
    { kanjiChar: "力", radicalChars: ["力"] },
    { kanjiChar: "田", radicalChars: ["田"] },
    { kanjiChar: "目", radicalChars: ["目"] },
    { kanjiChar: "男", radicalChars: ["田", "力"] },
    { kanjiChar: "好", radicalChars: ["女", "子"] },
    { kanjiChar: "手", radicalChars: ["手"] },
    { kanjiChar: "足", radicalChars: ["足"] },
    { kanjiChar: "雨", radicalChars: ["雨"] },
  ];

  for (const relation of kanjiRadicalRelations) {
    const kanji = await prisma.kanji.findUnique({
      where: { character: relation.kanjiChar },
    });

    if (kanji) {
      for (const radicalChar of relation.radicalChars) {
        const radical = await prisma.radical.findFirst({
          where: { character: radicalChar },
        });

        if (radical) {
          await prisma.kanjiRadical.upsert({
            where: {
              kanjiId_radicalId: { kanjiId: kanji.id, radicalId: radical.id },
            },
            update: {},
            create: { kanjiId: kanji.id, radicalId: radical.id },
          });
        }
      }
    }
  }

  // ============================================
  // Create vocabulary-kanji relationships
  // ============================================
  const vocabKanjiRelations = [
    // Level 1
    { vocabWord: "一", kanjiChars: ["一"] },
    { vocabWord: "二", kanjiChars: ["二"] },
    { vocabWord: "三", kanjiChars: ["三"] },
    { vocabWord: "十", kanjiChars: ["十"] },
    { vocabWord: "一日", kanjiChars: ["一", "日"] },
    { vocabWord: "二日", kanjiChars: ["二", "日"] },
    // Level 2
    { vocabWord: "火", kanjiChars: ["火"] },
    { vocabWord: "水", kanjiChars: ["水"] },
    { vocabWord: "大きい", kanjiChars: ["大"] },
    { vocabWord: "小さい", kanjiChars: ["小"] },
    { vocabWord: "中", kanjiChars: ["中"] },
    { vocabWord: "一人", kanjiChars: ["一", "人"] },
    { vocabWord: "二人", kanjiChars: ["二", "人"] },
    { vocabWord: "大人", kanjiChars: ["大", "人"] },
    { vocabWord: "人", kanjiChars: ["人"] },
    // Level 3
    { vocabWord: "女", kanjiChars: ["女"] },
    { vocabWord: "子", kanjiChars: ["子"] },
    { vocabWord: "女の子", kanjiChars: ["女", "子"] },
    { vocabWord: "男の子", kanjiChars: ["男", "子"] },
    { vocabWord: "力", kanjiChars: ["力"] },
    { vocabWord: "目", kanjiChars: ["目"] },
    { vocabWord: "手", kanjiChars: ["手"] },
    { vocabWord: "足", kanjiChars: ["足"] },
    { vocabWord: "雨", kanjiChars: ["雨"] },
    { vocabWord: "好き", kanjiChars: ["好"] },
    { vocabWord: "大好き", kanjiChars: ["大", "好"] },
    { vocabWord: "男", kanjiChars: ["男"] },
    { vocabWord: "田んぼ", kanjiChars: ["田"] },
    { vocabWord: "上手", kanjiChars: ["手"] },
    { vocabWord: "下手", kanjiChars: ["手"] },
    { vocabWord: "三人", kanjiChars: ["三", "人"] },
  ];

  for (const relation of vocabKanjiRelations) {
    const vocab = await prisma.vocabulary.findFirst({
      where: { word: relation.vocabWord },
    });

    if (vocab) {
      for (const kanjiChar of relation.kanjiChars) {
        const kanji = await prisma.kanji.findUnique({
          where: { character: kanjiChar },
        });

        if (kanji) {
          await prisma.vocabularyKanji.upsert({
            where: {
              vocabularyId_kanjiId: { vocabularyId: vocab.id, kanjiId: kanji.id },
            },
            update: {},
            create: { vocabularyId: vocab.id, kanjiId: kanji.id },
          });
        }
      }
    }
  }

  // ============================================
  // LEVEL 4 - Nature & Body
  // ============================================

  const level4Radicals = [
    { character: "心", meaningFr: "Coeur", mnemonic: "Un COEUR stylisé avec ses trois petits traits qui battent ! Tu peux presque sentir le 'boum boum' de ce COEUR." },
    { character: "立", meaningFr: "Debout", mnemonic: "Une personne DEBOUT sur une ligne, les bras écartés ! Elle se tient droite comme un samouraï au garde-à-vous." },
    { character: "見", meaningFr: "Voir", mnemonic: "Un OEIL (目) avec des jambes qui courent ! L'oeil se déplace pour mieux VOIR ce qui se passe partout." },
    { character: "言", meaningFr: "Parler", mnemonic: "Une bouche (口) au-dessus avec des ondes sonores qui sortent ! Quand tu PARLES, les mots sortent de ta bouche." },
    { character: "石", meaningFr: "Pierre", mnemonic: "Une falaise (厂) avec une bouche (口) = une PIERRE qui a l'air de parler ! C'est le rocher sacré du temple." },
    { character: "糸", meaningFr: "Fil", mnemonic: "Un FIL de soie enroulé avec un petit noeud en bas ! Les vers à soie japonais tissent ce FIL précieux." },
    { character: "車", meaningFr: "Voiture", mnemonic: "Une VOITURE vue de dessus ! Le carré central est l'habitacle, la ligne verticale est l'axe des roues." },
    { character: "貝", meaningFr: "Coquillage", mnemonic: "Un COQUILLAGE avec un oeil (目) et des pattes ! Autrefois au Japon, les COQUILLAGES servaient de monnaie." },
    { character: "食", meaningFr: "Manger", mnemonic: "Un toit qui protège de la bonne nourriture en dessous ! Quand tu MANGES, tu es sous un toit, à l'abri." },
    { character: "飲", meaningFr: "Boire", mnemonic: "Une personne qui ouvre grande la bouche pour BOIRE ! Le radical de gauche c'est la nourriture, à droite c'est avaler." },
  ];

  for (const radical of level4Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 4 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 4,
      },
    });
  }

  const level4Kanji = [
    {
      character: "心",
      meaningsFr: ["Coeur", "Esprit"],
      readingsOn: ["シン"],
      readingsKun: ["こころ"],
      meaningMnemonicFr: "Un COEUR qui bat avec ses trois petits traits ! Le COEUR est aussi le siège de l'ESPRIT au Japon.",
      readingMnemonicFr: "SHIN comme 'sheen' (éclat) - ton COEUR brille ! KOKORO est le son profond de ton COEUR qui bat.",
    },
    {
      character: "立",
      meaningsFr: ["Se lever", "Debout"],
      readingsOn: ["リツ"],
      readingsKun: ["た-つ"],
      meaningMnemonicFr: "Une personne DEBOUT sur le sol, bras écartés. Elle se LÈVE fièrement comme un samouraï !",
      readingMnemonicFr: "RITSU comme 'ritz' l'hôtel - tu te LÈVES pour entrer au Ritz ! TATSU sonne comme 'ta statue' - une statue est toujours DEBOUT.",
    },
    {
      character: "見",
      meaningsFr: ["Voir", "Regarder"],
      readingsOn: ["ケン"],
      readingsKun: ["み-る"],
      meaningMnemonicFr: "Un OEIL (目) avec des jambes en dessous ! Il court partout pour VOIR et REGARDER tout ce qui se passe.",
      readingMnemonicFr: "KEN comme 'ken' (connaissance en anglais). MIRU sonne comme 'miroir' - tu VOIS ton reflet !",
    },
    {
      character: "言",
      meaningsFr: ["Dire", "Parole"],
      readingsOn: ["ゲン", "ゴン"],
      readingsKun: ["い-う", "こと"],
      meaningMnemonicFr: "Une bouche (口) avec des ondes sonores qui en sortent ! Ce sont les PAROLES qui s'échappent quand tu DIS quelque chose.",
      readingMnemonicFr: "GEN comme 'genre' - quel GENRE de chose tu DIS ? IU comme 'you' - 'Hey you, qu'est-ce que tu DIS ?'",
    },
    {
      character: "石",
      meaningsFr: ["Pierre", "Rocher"],
      readingsOn: ["セキ", "シャク"],
      readingsKun: ["いし"],
      meaningMnemonicFr: "Une falaise (厂) avec une bouche (口) dessous - la PIERRE du temple qui semble murmurer des prières anciennes.",
      readingMnemonicFr: "SEKI comme 'séquelle' - tomber sur une PIERRE laisse des séquelles ! ISHI comme 'itchy' - une PIERRE qui gratte !",
    },
    {
      character: "車",
      meaningsFr: ["Voiture", "Véhicule"],
      readingsOn: ["シャ"],
      readingsKun: ["くるま"],
      meaningMnemonicFr: "Une VOITURE vue de dessus ! Le carré central est l'habitacle avec le conducteur, la ligne verticale traverse les roues.",
      readingMnemonicFr: "SHA comme 'chat' - un chat dans une VOITURE ! KURUMA sonne comme 'cool Roma' - une VOITURE cool à Rome !",
    },
    {
      character: "食",
      meaningsFr: ["Manger", "Nourriture"],
      readingsOn: ["ショク"],
      readingsKun: ["た-べる"],
      meaningMnemonicFr: "Un toit qui protège un bon repas ! Quand tu MANGES, tu es à l'abri, heureux devant ta NOURRITURE.",
      readingMnemonicFr: "SHOKU comme 'choc' - un choc de saveurs quand tu MANGES ! TABERU sonne comme 'table' - tu MANGES à table !",
    },
    {
      character: "飲",
      meaningsFr: ["Boire"],
      readingsOn: ["イン"],
      readingsKun: ["の-む"],
      meaningMnemonicFr: "Une personne qui penche la tête en arrière pour BOIRE ! Le radical de gauche (食) = nourriture, à droite = avaler goulûment.",
      readingMnemonicFr: "IN comme 'inn' (auberge) - tu BOIS à l'auberge ! NOMU comme 'no more' - plus rien à BOIRE !",
    },
    {
      character: "休",
      meaningsFr: ["Repos", "Se reposer"],
      readingsOn: ["キュウ"],
      readingsKun: ["やす-む"],
      meaningMnemonicFr: "Une personne (人) qui se REPOSE contre un arbre (木) ! Après le travail aux champs, on s'adosse à l'arbre pour le REPOS.",
      readingMnemonicFr: "KYUU comme 'queue' - tu fais la queue pour te REPOSER ! YASUMU sonne comme 'yeah zoom' - tu REPOSES après avoir zoomé toute la journée !",
    },
    {
      character: "体",
      meaningsFr: ["Corps"],
      readingsOn: ["タイ"],
      readingsKun: ["からだ"],
      meaningMnemonicFr: "Une personne (人) avec son CORPS principal (本). Le CORPS humain debout fièrement !",
      readingMnemonicFr: "TAI comme 'tie' (cravate) - tu mets une cravate sur ton CORPS ! KARADA sonne comme 'karaté' - le CORPS du karatéka !",
    },
  ];

  for (const kanji of level4Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 4,
      },
    });
  }

  const level4Vocab = [
    { word: "心", meaningsFr: ["Coeur", "Esprit"], readings: ["こころ"], mnemonicFr: "Le kanji seul se lit KOKORO. C'est le COEUR et l'ESPRIT japonais !" },
    { word: "立つ", meaningsFr: ["Se lever"], readings: ["たつ"], mnemonicFr: "DEBOUT + つ = TATSU, se lever, se mettre debout !" },
    { word: "見る", meaningsFr: ["Voir", "Regarder"], readings: ["みる"], mnemonicFr: "VOIR + る = MIRU, regarder quelque chose !" },
    { word: "言う", meaningsFr: ["Dire"], readings: ["いう"], mnemonicFr: "DIRE + う = IU, exprimer avec des mots !" },
    { word: "石", meaningsFr: ["Pierre"], readings: ["いし"], mnemonicFr: "Le kanji seul se lit ISHI. C'est une PIERRE !" },
    { word: "車", meaningsFr: ["Voiture"], readings: ["くるま"], mnemonicFr: "Le kanji seul se lit KURUMA. C'est une VOITURE !" },
    { word: "電車", meaningsFr: ["Train"], readings: ["でんしゃ"], mnemonicFr: "ÉLECTRICITÉ + VOITURE = un TRAIN électrique ! DENSHA c'est le métro ou train." },
    { word: "食べる", meaningsFr: ["Manger"], readings: ["たべる"], mnemonicFr: "MANGER + べる = TABERU, manger quelque chose !" },
    { word: "飲む", meaningsFr: ["Boire"], readings: ["のむ"], mnemonicFr: "BOIRE + む = NOMU, boire quelque chose !" },
    { word: "休む", meaningsFr: ["Se reposer"], readings: ["やすむ"], mnemonicFr: "REPOS + む = YASUMU, prendre du repos !" },
    { word: "休み", meaningsFr: ["Vacances", "Repos"], readings: ["やすみ"], mnemonicFr: "REPOS + み = YASUMI, les vacances ou un jour de repos !" },
    { word: "体", meaningsFr: ["Corps"], readings: ["からだ"], mnemonicFr: "Le kanji seul se lit KARADA. C'est le CORPS !" },
    { word: "食べ物", meaningsFr: ["Nourriture"], readings: ["たべもの"], mnemonicFr: "MANGER + CHOSE = TABEMONO, de la nourriture !" },
    { word: "飲み物", meaningsFr: ["Boisson"], readings: ["のみもの"], mnemonicFr: "BOIRE + CHOSE = NOMIMONO, une boisson !" },
    { word: "安心", meaningsFr: ["Tranquillité", "Soulagement"], readings: ["あんしん"], mnemonicFr: "PAIX + COEUR = ANSHIN, avoir l'esprit tranquille !" },
    { word: "中心", meaningsFr: ["Centre"], readings: ["ちゅうしん"], mnemonicFr: "MILIEU + COEUR = CHUUSHIN, le centre de tout !" },
  ];

  for (const vocab of level4Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 4 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 4,
      },
    });
  }

  // ============================================
  // LEVEL 5 - Actions & Directions
  // ============================================

  const level5Radicals = [
    { character: "上", meaningFr: "Dessus", mnemonic: "Une flèche qui pointe vers le HAUT ! Le trait horizontal est le sol, le trait vertical monte AU-DESSUS." },
    { character: "下", meaningFr: "Dessous", mnemonic: "Une flèche qui pointe vers le BAS ! Le trait horizontal est le plafond, le trait descend EN-DESSOUS." },
    { character: "右", meaningFr: "Droite", mnemonic: "Une main (ナ) et une bouche (口) - tu utilises ta main DROITE pour manger et ta bouche pour parler !" },
    { character: "左", meaningFr: "Gauche", mnemonic: "Une main (ナ) et le travail (工) - ta main GAUCHE aide au travail pendant que la droite agit !" },
    { character: "入", meaningFr: "Entrer", mnemonic: "Une flèche qui ENTRE dans quelque chose ! Imagine une personne qui se penche pour ENTRER par une petite porte." },
    { character: "出", meaningFr: "Sortir", mnemonic: "Deux montagnes (山) l'une sur l'autre qui SORTENT du sol ! Ou une flèche qui SORT vers le haut." },
    { character: "行", meaningFr: "Aller", mnemonic: "Un carrefour vu de haut ! Tu dois choisir où ALLER, quelle direction prendre à cette intersection." },
    { character: "来", meaningFr: "Venir", mnemonic: "Un arbre (木) avec des traits au-dessus - quelqu'un VIENT vers toi à travers les arbres ! Tu le vois approcher." },
    { character: "前", meaningFr: "Devant", mnemonic: "Des jambes (月) qui avancent avec force (力) - ce qui est DEVANT toi, là où tu vas !" },
    { character: "後", meaningFr: "Derrière", mnemonic: "Une personne qui traîne (彳) avec un fil (糸) - ce qui reste DERRIÈRE, ce que tu laisses en partant." },
  ];

  for (const radical of level5Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 5 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 5,
      },
    });
  }

  const level5Kanji = [
    {
      character: "上",
      meaningsFr: ["Dessus", "Haut", "Monter"],
      readingsOn: ["ジョウ"],
      readingsKun: ["うえ", "あ-がる", "のぼ-る"],
      meaningMnemonicFr: "Une ligne avec un trait qui monte AU-DESSUS ! C'est le HAUT, ce qui est en position supérieure.",
      readingMnemonicFr: "JOU comme 'joue' - ta joue est en HAUT de ton visage ! UE comme 'ouh et !' quand tu regardes en HAUT !",
    },
    {
      character: "下",
      meaningsFr: ["Dessous", "Bas", "Descendre"],
      readingsOn: ["カ", "ゲ"],
      readingsKun: ["した", "さ-がる", "くだ-る"],
      meaningMnemonicFr: "Une ligne avec un trait qui descend EN-DESSOUS ! C'est le BAS, ce qui est en position inférieure.",
      readingMnemonicFr: "KA comme 'cave' - la cave est en BAS ! SHITA comme 'shit ah' - 'merde, c'est tombé en BAS !'",
    },
    {
      character: "右",
      meaningsFr: ["Droite"],
      readingsOn: ["ウ", "ユウ"],
      readingsKun: ["みぎ"],
      meaningMnemonicFr: "Une main qui tient une bouche - tu MANGES avec ta main DROITE ! La DROITE est le côté dominant.",
      readingMnemonicFr: "U comme 'ou' - 'ou est la DROITE ?' MIGI sonne comme 'Mickey' - Mickey est à DROITE !",
    },
    {
      character: "左",
      meaningsFr: ["Gauche"],
      readingsOn: ["サ"],
      readingsKun: ["ひだり"],
      meaningMnemonicFr: "Une main qui aide au travail - ta main GAUCHE soutient pendant que la droite agit ! Le côté gauche.",
      readingMnemonicFr: "SA comme 'ça' - 'c'est par là, à GAUCHE !' HIDARI sonne comme 'hit Harry' - frappe Harry à GAUCHE !",
    },
    {
      character: "入",
      meaningsFr: ["Entrer"],
      readingsOn: ["ニュウ"],
      readingsKun: ["い-る", "はい-る"],
      meaningMnemonicFr: "Une personne qui se penche pour ENTRER par une petite porte ! Elle doit baisser la tête pour passer.",
      readingMnemonicFr: "NYUU comme 'new' - tu ENTRES dans un nouveau lieu ! HAIRU comme 'high rue' - tu ENTRES dans la grande rue !",
    },
    {
      character: "出",
      meaningsFr: ["Sortir"],
      readingsOn: ["シュツ"],
      readingsKun: ["で-る", "だ-す"],
      meaningMnemonicFr: "Une montagne au-dessus d'une autre qui SORT du sol ! Ou une idée qui SORT de ta tête.",
      readingMnemonicFr: "SHUTSU comme 'shut' - tu fermes en SORTANT ! DERU sonne comme 'des rues' - tu SORS dans les rues !",
    },
    {
      character: "行",
      meaningsFr: ["Aller"],
      readingsOn: ["コウ", "ギョウ"],
      readingsKun: ["い-く", "おこな-う"],
      meaningMnemonicFr: "Un carrefour vu de haut ! Tu choisis où ALLER, quelle route prendre. L'action de se déplacer.",
      readingMnemonicFr: "KOU comme 'coup' - tu pars d'un coup, tu y VAS ! IKU sonne comme 'I koo' - 'je vais !'",
    },
    {
      character: "来",
      meaningsFr: ["Venir"],
      readingsOn: ["ライ"],
      readingsKun: ["く-る"],
      meaningMnemonicFr: "Quelqu'un qui émerge des arbres et VIENT vers toi ! Tu le vois approcher de loin.",
      readingMnemonicFr: "RAI comme 'raille' - le train arrive, il VIENT ! KURU sonne comme 'cool rue' - quelqu'un de cool VIENT dans la rue !",
    },
    {
      character: "前",
      meaningsFr: ["Devant", "Avant"],
      readingsOn: ["ゼン"],
      readingsKun: ["まえ"],
      meaningMnemonicFr: "Des jambes qui avancent avec force - c'est DEVANT toi, là où tu vas, ce qui est AVANT !",
      readingMnemonicFr: "ZEN comme 'zen' - reste zen, regarde DEVANT ! MAE comme 'mais' - 'mais regarde DEVANT toi !'",
    },
    {
      character: "後",
      meaningsFr: ["Derrière", "Après"],
      readingsOn: ["ゴ", "コウ"],
      readingsKun: ["あと", "うし-ろ"],
      meaningMnemonicFr: "Ce qui reste DERRIÈRE toi, ce que tu laisses en avançant. Ce qui vient APRÈS.",
      readingMnemonicFr: "GO comme 'go' - 'go' c'est partir, et tu laisses quelque chose DERRIÈRE ! ATO comme 'à taux' - le reste vient APRÈS !",
    },
  ];

  for (const kanji of level5Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 5,
      },
    });
  }

  const level5Vocab = [
    { word: "上", meaningsFr: ["Dessus", "Haut"], readings: ["うえ"], mnemonicFr: "Le kanji seul se lit UE. C'est le HAUT !" },
    { word: "下", meaningsFr: ["Dessous", "Bas"], readings: ["した"], mnemonicFr: "Le kanji seul se lit SHITA. C'est le BAS !" },
    { word: "右", meaningsFr: ["Droite"], readings: ["みぎ"], mnemonicFr: "Le kanji seul se lit MIGI. C'est la DROITE !" },
    { word: "左", meaningsFr: ["Gauche"], readings: ["ひだり"], mnemonicFr: "Le kanji seul se lit HIDARI. C'est la GAUCHE !" },
    { word: "入る", meaningsFr: ["Entrer"], readings: ["はいる"], mnemonicFr: "ENTRER + る = HAIRU, pénétrer dans un lieu !" },
    { word: "出る", meaningsFr: ["Sortir"], readings: ["でる"], mnemonicFr: "SORTIR + る = DERU, quitter un lieu !" },
    { word: "行く", meaningsFr: ["Aller"], readings: ["いく"], mnemonicFr: "ALLER + く = IKU, se déplacer vers un endroit !" },
    { word: "来る", meaningsFr: ["Venir"], readings: ["くる"], mnemonicFr: "VENIR + る = KURU, se déplacer vers ici !" },
    { word: "前", meaningsFr: ["Devant", "Avant"], readings: ["まえ"], mnemonicFr: "Le kanji seul se lit MAE. C'est DEVANT !" },
    { word: "後", meaningsFr: ["Après", "Derrière"], readings: ["あと"], mnemonicFr: "Le kanji seul se lit ATO. C'est APRÈS ou DERRIÈRE !" },
    { word: "上がる", meaningsFr: ["Monter"], readings: ["あがる"], mnemonicFr: "HAUT + がる = AGARU, monter vers le haut !" },
    { word: "下がる", meaningsFr: ["Descendre"], readings: ["さがる"], mnemonicFr: "BAS + がる = SAGARU, descendre vers le bas !" },
    { word: "入口", meaningsFr: ["Entrée"], readings: ["いりぐち"], mnemonicFr: "ENTRER + BOUCHE = IRIGUCHI, l'entrée d'un lieu !" },
    { word: "出口", meaningsFr: ["Sortie"], readings: ["でぐち"], mnemonicFr: "SORTIR + BOUCHE = DEGUCHI, la sortie d'un lieu !" },
    { word: "左右", meaningsFr: ["Gauche et droite"], readings: ["さゆう"], mnemonicFr: "GAUCHE + DROITE = SAYUU, les deux côtés !" },
    { word: "前後", meaningsFr: ["Avant et après"], readings: ["ぜんご"], mnemonicFr: "DEVANT + DERRIÈRE = ZENGO, avant et après !" },
  ];

  for (const vocab of level5Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 5 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 5,
      },
    });
  }

  // ============================================
  // LEVEL 6 - Time & Nature
  // ============================================

  const level6Radicals = [
    { character: "年", meaningFr: "Année", mnemonic: "Une personne qui vieillit chaque ANNÉE ! Les traits représentent le passage du temps, année après année." },
    { character: "時", meaningFr: "Temps/Heure", mnemonic: "Le soleil (日) à côté d'un temple (寺) - le TEMPS est marqué par les cloches du temple qui sonnent les HEURES !" },
    { character: "分", meaningFr: "Minute/Diviser", mnemonic: "Un couteau (刀) qui DIVISE quelque chose en deux (八) ! On DIVISE le temps en MINUTES." },
    { character: "今", meaningFr: "Maintenant", mnemonic: "Un toit avec quelqu'un dessous - MAINTENANT, à cet instant précis où tu es là, sous ce toit !" },
    { character: "朝", meaningFr: "Matin", mnemonic: "Le soleil (日) qui se lève à l'horizon avec la lune (月) qui s'en va ! Le MATIN commence." },
    { character: "昼", meaningFr: "Midi/Jour", mnemonic: "Le soleil (日) au plus haut dans le ciel ! C'est le plein MIDI, le milieu du JOUR." },
    { character: "夜", meaningFr: "Nuit", mnemonic: "Une personne sous un toit avec la lune - la NUIT tombe et tu rentres te coucher." },
    { character: "週", meaningFr: "Semaine", mnemonic: "Un chemin (辶) autour de la terre (周) - une SEMAINE c'est le temps pour faire le tour de ta routine !" },
    { character: "天", meaningFr: "Ciel", mnemonic: "Une grande (大) ligne au-dessus représente le CIEL ! Le CIEL est au-dessus de tout, immense et vaste." },
    { character: "空", meaningFr: "Ciel/Vide", mnemonic: "Un trou (穴) dans le travail (工) - quand tu regardes en l'air, tu vois le CIEL VIDE au-dessus de toi." },
  ];

  for (const radical of level6Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 6 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 6,
      },
    });
  }

  const level6Kanji = [
    {
      character: "年",
      meaningsFr: ["Année", "An"],
      readingsOn: ["ネン"],
      readingsKun: ["とし"],
      meaningMnemonicFr: "Une personne qui vieillit avec le temps. Chaque ANNÉE qui passe laisse sa marque.",
      readingMnemonicFr: "NEN comme 'naine' - chaque ANNÉE tu grandis ! TOSHI sonne comme 'tôt shit' - 'encore une ANNÉE passée si vite !'",
    },
    {
      character: "時",
      meaningsFr: ["Temps", "Heure"],
      readingsOn: ["ジ"],
      readingsKun: ["とき"],
      meaningMnemonicFr: "Le soleil (日) au temple (寺) - les moines marquent le TEMPS en sonnant les cloches à chaque HEURE.",
      readingMnemonicFr: "JI comme 'G' (l'heure en argot). TOKI sonne comme 'Tokyo' - le TEMPS passe vite à Tokyo !",
    },
    {
      character: "分",
      meaningsFr: ["Minute", "Diviser", "Comprendre"],
      readingsOn: ["ブン", "フン"],
      readingsKun: ["わ-かる"],
      meaningMnemonicFr: "Un couteau (刀) qui DIVISE (八) ! On DIVISE l'heure en MINUTES, on DIVISE un problème pour COMPRENDRE.",
      readingMnemonicFr: "FUN comme 'fun' - chaque MINUTE de fun ! BUN comme 'bun' (brioche) - DIVISE la brioche ! WAKARU comme 'wah carré' - je COMPRENDS !",
    },
    {
      character: "今",
      meaningsFr: ["Maintenant", "Présent"],
      readingsOn: ["コン", "キン"],
      readingsKun: ["いま"],
      meaningMnemonicFr: "Un toit qui capture l'instant - MAINTENANT, sous ce toit, c'est le moment PRÉSENT qui compte.",
      readingMnemonicFr: "KON comme 'con' - 'arrête de faire le con, c'est MAINTENANT !' IMA comme 'imagine' - imagine MAINTENANT !",
    },
    {
      character: "朝",
      meaningsFr: ["Matin"],
      readingsOn: ["チョウ"],
      readingsKun: ["あさ"],
      meaningMnemonicFr: "Le soleil (日) qui apparaît avec la lune (月) qui s'efface ! Le MATIN se lève sur le Japon.",
      readingMnemonicFr: "CHOU comme 'chouette' - le MATIN c'est chouette ! ASA comme 'as-tu' - 'as-tu bien dormi ce MATIN ?'",
    },
    {
      character: "昼",
      meaningsFr: ["Midi", "Journée"],
      readingsOn: ["チュウ"],
      readingsKun: ["ひる"],
      meaningMnemonicFr: "Le soleil (日) au zénith ! C'est MIDI, le milieu de la JOURNÉE, quand le soleil est au plus haut.",
      readingMnemonicFr: "CHUU comme 'choux' - on mange des choux à MIDI ! HIRU comme 'hear ooh' - tu entends 'ooh' à MIDI !",
    },
    {
      character: "夜",
      meaningsFr: ["Nuit", "Soir"],
      readingsOn: ["ヤ"],
      readingsKun: ["よる"],
      meaningMnemonicFr: "Une personne sous un toit quand la NUIT tombe. On rentre chez soi le SOIR.",
      readingMnemonicFr: "YA comme 'yeah' - 'yeah, c'est la NUIT !' YORU comme 'your room' - tu vas dans ta chambre la NUIT !",
    },
    {
      character: "週",
      meaningsFr: ["Semaine"],
      readingsOn: ["シュウ"],
      readingsKun: [],
      meaningMnemonicFr: "Un chemin (辶) qui fait le tour (周) - une SEMAINE c'est faire le tour complet de tes jours !",
      readingMnemonicFr: "SHUU comme 'shoe' - tu changes de chaussures chaque SEMAINE !",
    },
    {
      character: "天",
      meaningsFr: ["Ciel", "Paradis"],
      readingsOn: ["テン"],
      readingsKun: ["あめ", "あま"],
      meaningMnemonicFr: "Une grande (大) barre au-dessus - le CIEL est ce qui est au-dessus de tout ! Le PARADIS est au CIEL.",
      readingMnemonicFr: "TEN comme 'tendre' - le CIEL est tendre et bleu ! AMA comme 'amazing' - le CIEL est amazing !",
    },
    {
      character: "空",
      meaningsFr: ["Ciel", "Vide"],
      readingsOn: ["クウ"],
      readingsKun: ["そら", "あ-く", "から"],
      meaningMnemonicFr: "Un trou (穴) au-dessus du travail (工) - regarde en l'air, tu vois le CIEL VIDE, sans limites !",
      readingMnemonicFr: "KUU comme 'cool' - le CIEL est cool ! SORA comme 'soar' - tu t'envoles dans le CIEL !",
    },
  ];

  for (const kanji of level6Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 6,
      },
    });
  }

  const level6Vocab = [
    { word: "年", meaningsFr: ["Année"], readings: ["とし", "ねん"], mnemonicFr: "Le kanji seul se lit TOSHI ou NEN. C'est une ANNÉE !" },
    { word: "今年", meaningsFr: ["Cette année"], readings: ["ことし"], mnemonicFr: "MAINTENANT + ANNÉE = KOTOSHI, cette année-ci !" },
    { word: "時", meaningsFr: ["Heure", "Temps"], readings: ["とき", "じ"], mnemonicFr: "Le kanji seul se lit TOKI ou JI. C'est le TEMPS !" },
    { word: "時間", meaningsFr: ["Temps", "Durée"], readings: ["じかん"], mnemonicFr: "TEMPS + INTERVALLE = JIKAN, la durée du temps !" },
    { word: "分", meaningsFr: ["Minute"], readings: ["ふん", "ぷん"], mnemonicFr: "Le kanji seul se lit FUN/PUN. C'est une MINUTE !" },
    { word: "今", meaningsFr: ["Maintenant"], readings: ["いま"], mnemonicFr: "Le kanji seul se lit IMA. C'est MAINTENANT !" },
    { word: "今日", meaningsFr: ["Aujourd'hui"], readings: ["きょう"], mnemonicFr: "MAINTENANT + JOUR = KYOU, aujourd'hui !" },
    { word: "朝", meaningsFr: ["Matin"], readings: ["あさ"], mnemonicFr: "Le kanji seul se lit ASA. C'est le MATIN !" },
    { word: "昼", meaningsFr: ["Midi"], readings: ["ひる"], mnemonicFr: "Le kanji seul se lit HIRU. C'est MIDI !" },
    { word: "夜", meaningsFr: ["Nuit"], readings: ["よる"], mnemonicFr: "Le kanji seul se lit YORU. C'est la NUIT !" },
    { word: "週", meaningsFr: ["Semaine"], readings: ["しゅう"], mnemonicFr: "Le kanji seul se lit SHUU. C'est une SEMAINE !" },
    { word: "今週", meaningsFr: ["Cette semaine"], readings: ["こんしゅう"], mnemonicFr: "MAINTENANT + SEMAINE = KONSHUU, cette semaine !" },
    { word: "天", meaningsFr: ["Ciel"], readings: ["てん"], mnemonicFr: "Le kanji seul se lit TEN. C'est le CIEL !" },
    { word: "空", meaningsFr: ["Ciel"], readings: ["そら"], mnemonicFr: "Le kanji seul se lit SORA. C'est le CIEL bleu !" },
    { word: "天気", meaningsFr: ["Météo"], readings: ["てんき"], mnemonicFr: "CIEL + ESPRIT = TENKI, la météo !" },
    { word: "朝ご飯", meaningsFr: ["Petit-déjeuner"], readings: ["あさごはん"], mnemonicFr: "MATIN + RIZ = ASAGOHAN, le repas du matin !" },
  ];

  for (const vocab of level6Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 6 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 6,
      },
    });
  }

  // ============================================
  // LEVEL 7 - Places & Society
  // ============================================

  const level7Radicals = [
    { character: "国", meaningFr: "Pays", mnemonic: "Un trésor (玉) protégé par des frontières (囗) - un PAYS protège ses richesses derrière ses frontières !" },
    { character: "学", meaningFr: "Étudier", mnemonic: "Un enfant (子) sous un toit avec des connaissances - ÉTUDIER c'est accumuler le savoir comme un enfant qui apprend !" },
    { character: "校", meaningFr: "École", mnemonic: "Un arbre (木) qui se croise (交) - l'ÉCOLE est un lieu où les savoirs se croisent et grandissent comme un arbre !" },
    { character: "会", meaningFr: "Rencontre", mnemonic: "Un toit avec des gens qui se rassemblent - une RÉUNION, une RENCONTRE sous un même toit !" },
    { character: "社", meaningFr: "Société/Sanctuaire", mnemonic: "Un autel divin (礻) et la terre (土) - un SANCTUAIRE où la SOCIÉTÉ se rassemble pour prier !" },
    { character: "店", meaningFr: "Magasin", mnemonic: "Un abri (广) avec quelque chose qui se vend (占) - un MAGASIN où l'on expose les marchandises !" },
    { character: "駅", meaningFr: "Gare", mnemonic: "Un cheval (馬) qui s'arrête (尺) - autrefois les GARES étaient des relais pour les chevaux !" },
    { character: "道", meaningFr: "Chemin", mnemonic: "Une tête qui avance (首) sur un chemin (辶) - le CHEMIN que tu parcours, la VOIE à suivre !" },
    { character: "外", meaningFr: "Extérieur", mnemonic: "Le soir (夕) et un devin (卜) - quand le soleil se couche à l'EXTÉRIEUR, les devins lisent les étoiles !" },
    { character: "内", meaningFr: "Intérieur", mnemonic: "Une personne (人) dans un cadre (冂) - quelqu'un à l'INTÉRIEUR d'un espace clos !" },
  ];

  for (const radical of level7Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 7 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 7,
      },
    });
  }

  const level7Kanji = [
    {
      character: "国",
      meaningsFr: ["Pays", "Nation"],
      readingsOn: ["コク"],
      readingsKun: ["くに"],
      meaningMnemonicFr: "Un trésor (玉) entouré de frontières (囗) - un PAYS protège ses richesses nationales !",
      readingMnemonicFr: "KOKU comme 'coque' - la coque protège le PAYS ! KUNI comme 'couni' - le petit PAYS !",
    },
    {
      character: "学",
      meaningsFr: ["Étudier", "Science"],
      readingsOn: ["ガク"],
      readingsKun: ["まな-ぶ"],
      meaningMnemonicFr: "Un enfant (子) qui accumule des connaissances sous un toit. ÉTUDIER c'est apprendre comme un enfant curieux !",
      readingMnemonicFr: "GAKU comme 'gag cou' - les blagues qu'on apprend en ÉTUDIANT ! MANABU comme 'mana-boost' - ÉTUDIER booste ton mana !",
    },
    {
      character: "校",
      meaningsFr: ["École"],
      readingsOn: ["コウ"],
      readingsKun: [],
      meaningMnemonicFr: "Un arbre (木) où les savoirs se croisent (交) - l'ÉCOLE est un lieu de rencontres et d'apprentissage !",
      readingMnemonicFr: "KOU comme 'coup' - tu prends un coup de savoir à l'ÉCOLE !",
    },
    {
      character: "会",
      meaningsFr: ["Rencontre", "Réunion", "Société"],
      readingsOn: ["カイ", "エ"],
      readingsKun: ["あ-う"],
      meaningMnemonicFr: "Des gens qui se rassemblent sous un toit - une RÉUNION, une RENCONTRE ! La SOCIÉTÉ se forme.",
      readingMnemonicFr: "KAI comme 'quai' - on se RENCONTRE sur le quai ! AU comme 'oh' - 'oh, on se RENCONTRE !'",
    },
    {
      character: "社",
      meaningsFr: ["Société", "Sanctuaire"],
      readingsOn: ["シャ"],
      readingsKun: ["やしろ"],
      meaningMnemonicFr: "Un autel (礻) sur la terre (土) - un SANCTUAIRE sacré où la SOCIÉTÉ se rassemble !",
      readingMnemonicFr: "SHA comme 'chat' - le chat du SANCTUAIRE ! YASHIRO comme 'yeah shi-ro' - 'yeah, le SANCTUAIRE !'",
    },
    {
      character: "店",
      meaningsFr: ["Magasin", "Boutique"],
      readingsOn: ["テン"],
      readingsKun: ["みせ"],
      meaningMnemonicFr: "Un abri (广) avec des marchandises exposées - le MAGASIN où tu fais tes achats !",
      readingMnemonicFr: "TEN comme 'tente' - le MAGASIN sous une tente ! MISE comme 'mise' - tu mises ton argent au MAGASIN !",
    },
    {
      character: "駅",
      meaningsFr: ["Gare", "Station"],
      readingsOn: ["エキ"],
      readingsKun: [],
      meaningMnemonicFr: "Un cheval (馬) au repos - autrefois les GARES étaient des relais pour changer de cheval !",
      readingMnemonicFr: "EKI comme 'équi' (cheval) - la GARE aux chevaux !",
    },
    {
      character: "道",
      meaningsFr: ["Chemin", "Route", "Voie"],
      readingsOn: ["ドウ"],
      readingsKun: ["みち"],
      meaningMnemonicFr: "Une tête (首) qui avance sur un chemin (辶) - le CHEMIN que tu suis, la VOIE de ta vie !",
      readingMnemonicFr: "DOU comme 'doux' - un CHEMIN doux ! MICHI comme 'mi-chemin' - tu es à mi-CHEMIN !",
    },
    {
      character: "外",
      meaningsFr: ["Extérieur", "Dehors"],
      readingsOn: ["ガイ", "ゲ"],
      readingsKun: ["そと", "ほか"],
      meaningMnemonicFr: "Le soir (夕) et la divination (卜) - à l'EXTÉRIEUR, les devins lisent les étoiles du soir !",
      readingMnemonicFr: "GAI comme 'gai' - dehors c'est GAI ! SOTO comme 'saut tôt' - tu sautes DEHORS tôt le matin !",
    },
    {
      character: "内",
      meaningsFr: ["Intérieur", "Dedans"],
      readingsOn: ["ナイ"],
      readingsKun: ["うち"],
      meaningMnemonicFr: "Une personne (人) dans un cadre (冂) - quelqu'un à l'INTÉRIEUR d'un espace fermé !",
      readingMnemonicFr: "NAI comme 'night' - la NUIT tu restes à l'INTÉRIEUR ! UCHI comme 'ouch' - 'ouch, je reste DEDANS !'",
    },
  ];

  for (const kanji of level7Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 7,
      },
    });
  }

  const level7Vocab = [
    { word: "国", meaningsFr: ["Pays"], readings: ["くに"], mnemonicFr: "Le kanji seul se lit KUNI. C'est un PAYS !" },
    { word: "外国", meaningsFr: ["Pays étranger"], readings: ["がいこく"], mnemonicFr: "EXTÉRIEUR + PAYS = GAIKOKU, un pays étranger !" },
    { word: "学ぶ", meaningsFr: ["Étudier"], readings: ["まなぶ"], mnemonicFr: "ÉTUDIER + ぶ = MANABU, apprendre quelque chose !" },
    { word: "学校", meaningsFr: ["École"], readings: ["がっこう"], mnemonicFr: "ÉTUDIER + ÉCOLE = GAKKOU, l'établissement scolaire !" },
    { word: "学生", meaningsFr: ["Étudiant"], readings: ["がくせい"], mnemonicFr: "ÉTUDIER + VIE = GAKUSEI, celui qui vit pour étudier !" },
    { word: "会う", meaningsFr: ["Rencontrer"], readings: ["あう"], mnemonicFr: "RENCONTRE + う = AU, rencontrer quelqu'un !" },
    { word: "会社", meaningsFr: ["Entreprise"], readings: ["かいしゃ"], mnemonicFr: "RÉUNION + SOCIÉTÉ = KAISHA, une entreprise !" },
    { word: "店", meaningsFr: ["Magasin"], readings: ["みせ"], mnemonicFr: "Le kanji seul se lit MISE. C'est un MAGASIN !" },
    { word: "駅", meaningsFr: ["Gare"], readings: ["えき"], mnemonicFr: "Le kanji seul se lit EKI. C'est une GARE !" },
    { word: "道", meaningsFr: ["Chemin"], readings: ["みち"], mnemonicFr: "Le kanji seul se lit MICHI. C'est un CHEMIN !" },
    { word: "外", meaningsFr: ["Extérieur"], readings: ["そと"], mnemonicFr: "Le kanji seul se lit SOTO. C'est l'EXTÉRIEUR !" },
    { word: "外出", meaningsFr: ["Sortir"], readings: ["がいしゅつ"], mnemonicFr: "EXTÉRIEUR + SORTIR = GAISHUTSU, sortir dehors !" },
    { word: "内", meaningsFr: ["Intérieur"], readings: ["うち"], mnemonicFr: "Le kanji seul se lit UCHI. C'est l'INTÉRIEUR !" },
    { word: "国内", meaningsFr: ["National", "Dans le pays"], readings: ["こくない"], mnemonicFr: "PAYS + INTÉRIEUR = KOKUNAI, à l'intérieur du pays !" },
    { word: "駅前", meaningsFr: ["Devant la gare"], readings: ["えきまえ"], mnemonicFr: "GARE + DEVANT = EKIMAE, la zone devant la gare !" },
    { word: "会社員", meaningsFr: ["Employé"], readings: ["かいしゃいん"], mnemonicFr: "ENTREPRISE + MEMBRE = KAISHAIN, un employé d'entreprise !" },
  ];

  for (const vocab of level7Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 7 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 7,
      },
    });
  }

  // ============================================
  // LEVEL 8 - Actions & States
  // ============================================

  const level8Radicals = [
    { character: "書", meaningFr: "Écrire", mnemonic: "Un pinceau (聿) au-dessus de quelque chose qui dit (曰) - ÉCRIRE c'est faire parler le pinceau !" },
    { character: "読", meaningFr: "Lire", mnemonic: "Des mots (言) qu'on vend (売) - quand tu LIES un livre, tu achètes des mots et des idées !" },
    { character: "話", meaningFr: "Parler/Histoire", mnemonic: "Des paroles (言) et une langue (舌) - PARLER c'est utiliser sa langue pour raconter des HISTOIRES !" },
    { character: "聞", meaningFr: "Écouter", mnemonic: "Une oreille (耳) dans une porte (門) - tu ÉCOUTES à la porte pour entendre les secrets !" },
    { character: "買", meaningFr: "Acheter", mnemonic: "Un filet (网) au-dessus de coquillages (貝) - ACHETER autrefois c'était échanger des coquillages-monnaie !" },
    { character: "売", meaningFr: "Vendre", mnemonic: "Un lettré (士) et des jambes qui partent - VENDRE c'est faire partir les marchandises !" },
    { character: "思", meaningFr: "Penser", mnemonic: "Un champ (田) dans le coeur (心) - PENSER c'est cultiver des idées dans ton coeur !" },
    { character: "知", meaningFr: "Savoir", mnemonic: "Une flèche (矢) et une bouche (口) - SAVOIR c'est avoir des paroles précises comme des flèches !" },
    { character: "住", meaningFr: "Habiter", mnemonic: "Une personne (人) qui reste (主) - HABITER c'est être le maître de son lieu de vie !" },
    { character: "待", meaningFr: "Attendre", mnemonic: "Marcher (彳) vers un temple (寺) - ATTENDRE pieusement devant le temple !" },
  ];

  for (const radical of level8Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 8 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 8,
      },
    });
  }

  const level8Kanji = [
    {
      character: "書",
      meaningsFr: ["Écrire", "Livre"],
      readingsOn: ["ショ"],
      readingsKun: ["か-く"],
      meaningMnemonicFr: "Un pinceau qui fait parler le papier - ÉCRIRE c'est créer des LIVRES avec tes mots !",
      readingMnemonicFr: "SHO comme 'show' - ton ÉCRITURE est un show ! KAKU comme 'caca cou' - tu ÉCRIS même des bêtises !",
    },
    {
      character: "読",
      meaningsFr: ["Lire"],
      readingsOn: ["ドク"],
      readingsKun: ["よ-む"],
      meaningMnemonicFr: "Des paroles (言) qu'on vend (売) - LIRE c'est acheter des mots avec tes yeux !",
      readingMnemonicFr: "DOKU comme 'doc' - tu LIS les documents ! YOMU comme 'yo mum' - 'yo maman, je LIS !'",
    },
    {
      character: "話",
      meaningsFr: ["Parler", "Histoire"],
      readingsOn: ["ワ"],
      readingsKun: ["はな-す", "はなし"],
      meaningMnemonicFr: "Des paroles (言) avec la langue (舌) - PARLER et raconter des HISTOIRES avec ta langue !",
      readingMnemonicFr: "WA comme 'wah' - 'wah, quelle HISTOIRE !' HANASU comme 'have a sue' - PARLE de ton procès !",
    },
    {
      character: "聞",
      meaningsFr: ["Écouter", "Entendre"],
      readingsOn: ["ブン", "モン"],
      readingsKun: ["き-く"],
      meaningMnemonicFr: "Une oreille (耳) à la porte (門) - tu ÉCOUTES à la porte pour tout ENTENDRE !",
      readingMnemonicFr: "MON comme 'mon' - 'MON oreille ÉCOUTE !' KIKU comme 'kick you' - 'kick you si tu n'ÉCOUTES pas !'",
    },
    {
      character: "買",
      meaningsFr: ["Acheter"],
      readingsOn: ["バイ"],
      readingsKun: ["か-う"],
      meaningMnemonicFr: "Un filet (网) de coquillages (貝) - les coquillages étaient la monnaie pour ACHETER autrefois !",
      readingMnemonicFr: "BAI comme 'buy' - tu ACHÈTES ! KAU comme 'cow' - tu ACHÈTES une vache !",
    },
    {
      character: "売",
      meaningsFr: ["Vendre"],
      readingsOn: ["バイ"],
      readingsKun: ["う-る"],
      meaningMnemonicFr: "Un lettré (士) qui fait partir les marchandises - VENDRE c'est faire circuler les biens !",
      readingMnemonicFr: "BAI comme 'bye' - tu dis bye quand tu VENDS ! URU comme 'euro' - tu VENDS en euros !",
    },
    {
      character: "思",
      meaningsFr: ["Penser", "Croire"],
      readingsOn: ["シ"],
      readingsKun: ["おも-う"],
      meaningMnemonicFr: "Un champ (田) dans le coeur (心) - PENSER c'est cultiver des idées dans ton esprit !",
      readingMnemonicFr: "SHI comme 'shi' (poésie) - tu PENSES en poésie ! OMOU comme 'oh mou' - 'oh, je PENSE que c'est mou !'",
    },
    {
      character: "知",
      meaningsFr: ["Savoir", "Connaître"],
      readingsOn: ["チ"],
      readingsKun: ["し-る"],
      meaningMnemonicFr: "Une flèche (矢) et une bouche (口) - SAVOIR c'est parler avec précision, droit au but !",
      readingMnemonicFr: "CHI comme 'chi' (énergie) - SAVOIR c'est avoir du chi ! SHIRU comme 'she rue' - elle SAIT la rue !",
    },
    {
      character: "住",
      meaningsFr: ["Habiter", "Résider"],
      readingsOn: ["ジュウ"],
      readingsKun: ["す-む"],
      meaningMnemonicFr: "Une personne (人) qui est maître (主) de son lieu - HABITER c'est être chez soi !",
      readingMnemonicFr: "JUU comme 'joue' - tu HABITES où tu joues ! SUMU comme 'sumo' - un sumo HABITE au dojo !",
    },
    {
      character: "待",
      meaningsFr: ["Attendre"],
      readingsOn: ["タイ"],
      readingsKun: ["ま-つ"],
      meaningMnemonicFr: "Marcher (彳) vers le temple (寺) et ATTENDRE patiemment ton tour pour prier !",
      readingMnemonicFr: "TAI comme 'time' - tu ATTENDS que le temps passe ! MATSU comme 'match' - tu ATTENDS le match !",
    },
  ];

  for (const kanji of level8Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 8,
      },
    });
  }

  const level8Vocab = [
    { word: "書く", meaningsFr: ["Écrire"], readings: ["かく"], mnemonicFr: "ÉCRIRE + く = KAKU, mettre des mots sur papier !" },
    { word: "読む", meaningsFr: ["Lire"], readings: ["よむ"], mnemonicFr: "LIRE + む = YOMU, parcourir des mots !" },
    { word: "話す", meaningsFr: ["Parler"], readings: ["はなす"], mnemonicFr: "PARLER + す = HANASU, s'exprimer oralement !" },
    { word: "話", meaningsFr: ["Histoire", "Conversation"], readings: ["はなし"], mnemonicFr: "Le kanji seul se lit HANASHI. C'est une HISTOIRE !" },
    { word: "聞く", meaningsFr: ["Écouter"], readings: ["きく"], mnemonicFr: "ÉCOUTER + く = KIKU, prêter l'oreille !" },
    { word: "買う", meaningsFr: ["Acheter"], readings: ["かう"], mnemonicFr: "ACHETER + う = KAU, acquérir contre de l'argent !" },
    { word: "売る", meaningsFr: ["Vendre"], readings: ["うる"], mnemonicFr: "VENDRE + る = URU, échanger contre de l'argent !" },
    { word: "思う", meaningsFr: ["Penser"], readings: ["おもう"], mnemonicFr: "PENSER + う = OMOU, réfléchir à quelque chose !" },
    { word: "知る", meaningsFr: ["Savoir"], readings: ["しる"], mnemonicFr: "SAVOIR + る = SHIRU, avoir connaissance !" },
    { word: "住む", meaningsFr: ["Habiter"], readings: ["すむ"], mnemonicFr: "HABITER + む = SUMU, résider quelque part !" },
    { word: "待つ", meaningsFr: ["Attendre"], readings: ["まつ"], mnemonicFr: "ATTENDRE + つ = MATSU, patienter !" },
    { word: "書類", meaningsFr: ["Document"], readings: ["しょるい"], mnemonicFr: "ÉCRIRE + SORTE = SHORUI, un document écrit !" },
    { word: "読書", meaningsFr: ["Lecture"], readings: ["どくしょ"], mnemonicFr: "LIRE + LIVRE = DOKUSHO, la lecture de livres !" },
    { word: "知識", meaningsFr: ["Connaissance"], readings: ["ちしき"], mnemonicFr: "SAVOIR + RECONNAÎTRE = CHISHIKI, la connaissance !" },
    { word: "売り場", meaningsFr: ["Rayon (magasin)"], readings: ["うりば"], mnemonicFr: "VENDRE + LIEU = URIBA, l'endroit où on vend !" },
    { word: "買い物", meaningsFr: ["Courses", "Shopping"], readings: ["かいもの"], mnemonicFr: "ACHETER + CHOSE = KAIMONO, faire les courses !" },
  ];

  for (const vocab of level8Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 8 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 8,
      },
    });
  }

  // ============================================
  // LEVEL 9 - Descriptions & Qualities
  // ============================================

  const level9Radicals = [
    { character: "白", meaningFr: "Blanc", mnemonic: "Un soleil avec un rayon - le BLANC pur comme la lumière du soleil qui illumine tout !" },
    { character: "赤", meaningFr: "Rouge", mnemonic: "La terre (土) qui brûle (火) - la terre ROUGE comme les flammes du coucher de soleil !" },
    { character: "青", meaningFr: "Bleu/Vert", mnemonic: "La vie (生) et la lune (月) - le BLEU du ciel la nuit, le VERT de la vie qui pousse !" },
    { character: "黒", meaningFr: "Noir", mnemonic: "Des flammes (火) au-dessus de la terre (土) - quand tout brûle, il ne reste que le NOIR des cendres !" },
    { character: "長", meaningFr: "Long", mnemonic: "Des cheveux qui poussent vers le bas - les cheveux LONGS qui descendent le long du dos !" },
    { character: "短", meaningFr: "Court", mnemonic: "Une flèche (矢) et un haricot (豆) - une flèche COURTE comme un haricot !" },
    { character: "高", meaningFr: "Haut", mnemonic: "Un bâtiment avec plusieurs étages - une tour HAUTE qui monte vers le ciel !" },
    { character: "安", meaningFr: "Pas cher/Paisible", mnemonic: "Une femme (女) sous un toit - une femme en paix chez elle, tout est PAISIBLE et PAS CHER !" },
    { character: "新", meaningFr: "Nouveau", mnemonic: "Un arbre (木) fraîchement coupé avec une hache - du bois NOUVEAU pour construire !" },
    { character: "古", meaningFr: "Vieux/Ancien", mnemonic: "Dix (十) générations avec une bouche (口) - les histoires ANCIENNES racontées depuis DIX générations !" },
  ];

  for (const radical of level9Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 9 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 9,
      },
    });
  }

  const level9Kanji = [
    {
      character: "白",
      meaningsFr: ["Blanc"],
      readingsOn: ["ハク", "ビャク"],
      readingsKun: ["しろ", "しら-"],
      meaningMnemonicFr: "Un soleil qui rayonne - le BLANC pur de la lumière, la pureté absolue !",
      readingMnemonicFr: "HAKU comme 'hack you' - le BLANC pur te frappe ! SHIRO comme 'shiro' (château) - un château BLANC !",
    },
    {
      character: "赤",
      meaningsFr: ["Rouge"],
      readingsOn: ["セキ", "シャク"],
      readingsKun: ["あか"],
      meaningMnemonicFr: "La terre (土) en feu (火) - le ROUGE des flammes, du sang, du coucher de soleil !",
      readingMnemonicFr: "SEKI comme 'sec' - le ROUGE des lèvres sèches ! AKA comme 'ah-kah' - 'ah, c'est ROUGE !'",
    },
    {
      character: "青",
      meaningsFr: ["Bleu", "Vert"],
      readingsOn: ["セイ", "ショウ"],
      readingsKun: ["あお"],
      meaningMnemonicFr: "La vie (生) sous la lune (月) - le BLEU du ciel nocturne, le VERT de la nature vivante !",
      readingMnemonicFr: "SEI comme 'say' - 'je dis que c'est BLEU !' AO comme 'ah oh' - 'ah oh, c'est BLEU-VERT !'",
    },
    {
      character: "黒",
      meaningsFr: ["Noir"],
      readingsOn: ["コク"],
      readingsKun: ["くろ"],
      meaningMnemonicFr: "Les flammes (火) sur la terre (土) laissent des cendres NOIRES - le NOIR de ce qui a brûlé !",
      readingMnemonicFr: "KOKU comme 'coke' - le NOIR du charbon ! KURO comme 'Kurosawa' - le réalisateur en NOIR !",
    },
    {
      character: "長",
      meaningsFr: ["Long", "Chef"],
      readingsOn: ["チョウ"],
      readingsKun: ["なが-い"],
      meaningMnemonicFr: "Des cheveux LONGS qui descendent - la LONGUEUR de ce qui s'étire ! Un CHEF a une LONGUE barbe.",
      readingMnemonicFr: "CHOU comme 'chou' - un chou LONG ! NAGAI comme 'nah guy' - 'nah, ce mec est LONG !'",
    },
    {
      character: "短",
      meaningsFr: ["Court"],
      readingsOn: ["タン"],
      readingsKun: ["みじか-い"],
      meaningMnemonicFr: "Une flèche (矢) courte comme un haricot (豆) - quelque chose de COURT en taille ou durée !",
      readingMnemonicFr: "TAN comme 'tan' - un bronzage COURT ! MIJIKAI comme 'me ji kai' - 'moi j'ai COURT !'",
    },
    {
      character: "高",
      meaningsFr: ["Haut", "Cher"],
      readingsOn: ["コウ"],
      readingsKun: ["たか-い"],
      meaningMnemonicFr: "Une tour à plusieurs étages - quelque chose de HAUT ! Ce qui est HAUT coûte souvent CHER.",
      readingMnemonicFr: "KOU comme 'coup' - un coup HAUT ! TAKAI comme 'take eye' - tu lèves les yeux HAUT !",
    },
    {
      character: "安",
      meaningsFr: ["Pas cher", "Tranquille", "Paix"],
      readingsOn: ["アン"],
      readingsKun: ["やす-い"],
      meaningMnemonicFr: "Une femme (女) sous un toit - en paix chez elle, tout est TRANQUILLE et PAS CHER !",
      readingMnemonicFr: "AN comme 'an' (année) - une année PAISIBLE ! YASUI comme 'yes oui' - 'yes, c'est PAS CHER !'",
    },
    {
      character: "新",
      meaningsFr: ["Nouveau", "Neuf"],
      readingsOn: ["シン"],
      readingsKun: ["あたら-しい"],
      meaningMnemonicFr: "Un arbre (木) coupé avec une hache - du bois NEUF fraîchement coupé, quelque chose de NOUVEAU !",
      readingMnemonicFr: "SHIN comme 'shiny' - le NOUVEAU brille ! ATARASHII comme 'a ta rash' - 'une NOUVELLE éruption !'",
    },
    {
      character: "古",
      meaningsFr: ["Vieux", "Ancien"],
      readingsOn: ["コ"],
      readingsKun: ["ふる-い"],
      meaningMnemonicFr: "Dix (十) bouches (口) qui racontent - les histoires ANCIENNES transmises depuis DIX générations !",
      readingMnemonicFr: "KO comme 'ko' (knock-out) - le VIEUX tombe K.O. ! FURUI comme 'foo rouille' - le VIEUX est rouillé !",
    },
  ];

  for (const kanji of level9Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 9,
      },
    });
  }

  const level9Vocab = [
    { word: "白", meaningsFr: ["Blanc"], readings: ["しろ"], mnemonicFr: "Le kanji seul se lit SHIRO. C'est BLANC !" },
    { word: "白い", meaningsFr: ["Blanc (adj.)"], readings: ["しろい"], mnemonicFr: "BLANC + い = SHIROI, l'adjectif blanc !" },
    { word: "赤", meaningsFr: ["Rouge"], readings: ["あか"], mnemonicFr: "Le kanji seul se lit AKA. C'est ROUGE !" },
    { word: "赤い", meaningsFr: ["Rouge (adj.)"], readings: ["あかい"], mnemonicFr: "ROUGE + い = AKAI, l'adjectif rouge !" },
    { word: "青", meaningsFr: ["Bleu"], readings: ["あお"], mnemonicFr: "Le kanji seul se lit AO. C'est BLEU !" },
    { word: "青い", meaningsFr: ["Bleu (adj.)"], readings: ["あおい"], mnemonicFr: "BLEU + い = AOI, l'adjectif bleu !" },
    { word: "黒", meaningsFr: ["Noir"], readings: ["くろ"], mnemonicFr: "Le kanji seul se lit KURO. C'est NOIR !" },
    { word: "黒い", meaningsFr: ["Noir (adj.)"], readings: ["くろい"], mnemonicFr: "NOIR + い = KUROI, l'adjectif noir !" },
    { word: "長い", meaningsFr: ["Long"], readings: ["ながい"], mnemonicFr: "LONG + い = NAGAI, quelque chose de long !" },
    { word: "短い", meaningsFr: ["Court"], readings: ["みじかい"], mnemonicFr: "COURT + い = MIJIKAI, quelque chose de court !" },
    { word: "高い", meaningsFr: ["Haut", "Cher"], readings: ["たかい"], mnemonicFr: "HAUT + い = TAKAI, haut ou cher !" },
    { word: "安い", meaningsFr: ["Pas cher"], readings: ["やすい"], mnemonicFr: "PAS CHER + い = YASUI, bon marché !" },
    { word: "新しい", meaningsFr: ["Nouveau"], readings: ["あたらしい"], mnemonicFr: "NOUVEAU + しい = ATARASHII, neuf !" },
    { word: "古い", meaningsFr: ["Vieux"], readings: ["ふるい"], mnemonicFr: "VIEUX + い = FURUI, ancien !" },
    { word: "長さ", meaningsFr: ["Longueur"], readings: ["ながさ"], mnemonicFr: "LONG + さ = NAGASA, la longueur !" },
    { word: "高さ", meaningsFr: ["Hauteur"], readings: ["たかさ"], mnemonicFr: "HAUT + さ = TAKASA, la hauteur !" },
  ];

  for (const vocab of level9Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 9 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 9,
      },
    });
  }

  // ============================================
  // LEVEL 10 - Advanced Concepts
  // ============================================

  const level10Radicals = [
    { character: "気", meaningFr: "Esprit/Air", mnemonic: "De la vapeur (气) avec du riz (米) - l'ESPRIT c'est comme la vapeur qui s'élève du riz chaud, invisible mais présent !" },
    { character: "電", meaningFr: "Électricité", mnemonic: "La pluie (雨) qui gronde avec des éclairs - l'ÉLECTRICITÉ des orages qui zèbre le ciel !" },
    { character: "間", meaningFr: "Intervalle", mnemonic: "Le soleil (日) qui passe par la porte (門) - l'INTERVALLE de lumière entre les battants !" },
    { character: "明", meaningFr: "Lumineux", mnemonic: "Le soleil (日) et la lune (月) ensemble - LUMINEUX de jour comme de nuit !" },
    { character: "多", meaningFr: "Beaucoup", mnemonic: "Deux soirs (夕夕) - BEAUCOUP de temps passé, soirée après soirée !" },
    { character: "少", meaningFr: "Peu", mnemonic: "Un petit (小) avec une queue - juste un PEU, une petite quantité !" },
    { character: "何", meaningFr: "Quoi", mnemonic: "Une personne (人) qui peut (可) - QUOI peut faire cette personne ? Question fondamentale !" },
    { character: "誰", meaningFr: "Qui", mnemonic: "Des paroles (言) sur quelqu'un - QUI est cette personne dont on parle ?" },
    { character: "友", meaningFr: "Ami", mnemonic: "Deux mains (又又) qui se serrent - les AMIS se donnent la main !" },
    { character: "親", meaningFr: "Parent", mnemonic: "Se tenir (立) et regarder (見) un arbre (木) - les PARENTS regardent leurs enfants grandir comme des arbres !" },
  ];

  for (const radical of level10Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 10 } },
      update: { ...radical },
      create: {
        ...radical,
        levelId: 10,
      },
    });
  }

  const level10Kanji = [
    {
      character: "気",
      meaningsFr: ["Esprit", "Air", "Énergie"],
      readingsOn: ["キ", "ケ"],
      readingsKun: [],
      meaningMnemonicFr: "De la vapeur (气) avec du riz (米) - l'ESPRIT invisible comme la vapeur du riz chaud !",
      readingMnemonicFr: "KI comme 'ki' (énergie vitale en japonais) - le fameux 'ki' des arts martiaux !",
    },
    {
      character: "電",
      meaningsFr: ["Électricité"],
      readingsOn: ["デン"],
      readingsKun: [],
      meaningMnemonicFr: "La pluie (雨) avec des éclairs - l'ÉLECTRICITÉ qui zèbre le ciel pendant l'orage !",
      readingMnemonicFr: "DEN comme 'dent' - l'ÉLECTRICITÉ te fait serrer les dents !",
    },
    {
      character: "間",
      meaningsFr: ["Intervalle", "Espace", "Pièce"],
      readingsOn: ["カン", "ケン"],
      readingsKun: ["あいだ", "ま"],
      meaningMnemonicFr: "Le soleil (日) entre les portes (門) - l'INTERVALLE de lumière, l'ESPACE entre deux choses !",
      readingMnemonicFr: "KAN comme 'canal' - un ESPACE entre deux rives ! AIDA comme 'aider' - dans l'INTERVALLE tu aides !",
    },
    {
      character: "明",
      meaningsFr: ["Lumineux", "Clair"],
      readingsOn: ["メイ", "ミョウ"],
      readingsKun: ["あか-るい", "あき-らか"],
      meaningMnemonicFr: "Le soleil (日) + la lune (月) = LUMINEUX ! La lumière du jour et de la nuit réunies.",
      readingMnemonicFr: "MEI comme 'May' - le mois LUMINEUX ! AKARUI comme 'a car oui' - 'oui, une voiture LUMINEUSE !'",
    },
    {
      character: "多",
      meaningsFr: ["Beaucoup", "Nombreux"],
      readingsOn: ["タ"],
      readingsKun: ["おお-い"],
      meaningMnemonicFr: "Deux soirs (夕夕) empilés - BEAUCOUP de temps passé, soirée après soirée !",
      readingMnemonicFr: "TA comme 'ta' - 'ta quantité est BEAUCOUP !' OOI comme 'oh oui' - 'oh oui, c'est BEAUCOUP !'",
    },
    {
      character: "少",
      meaningsFr: ["Peu", "Quelques"],
      readingsOn: ["ショウ"],
      readingsKun: ["すく-ない", "すこ-し"],
      meaningMnemonicFr: "Un petit (小) avec un trait - juste un PEU, une petite quantité !",
      readingMnemonicFr: "SHOU comme 'show' - un PETIT show ! SUKOSHI comme 'sue ko shi' - 'juste un PEU !'",
    },
    {
      character: "何",
      meaningsFr: ["Quoi", "Combien"],
      readingsOn: ["カ"],
      readingsKun: ["なに", "なん"],
      meaningMnemonicFr: "Une personne (人) qui peut (可) - QUOI peut-elle faire ? La question fondamentale !",
      readingMnemonicFr: "KA comme 'quoi' presque ! NANI comme 'nanny' - 'QUOI, tu veux une nounou ?'",
    },
    {
      character: "友",
      meaningsFr: ["Ami"],
      readingsOn: ["ユウ"],
      readingsKun: ["とも"],
      meaningMnemonicFr: "Deux mains (又又) qui se serrent - les AMIS se donnent la main !",
      readingMnemonicFr: "YUU comme 'you' - 'you are my AMI !' TOMO comme 'tomber' - un AMI te rattrape si tu tombes !",
    },
    {
      character: "親",
      meaningsFr: ["Parent", "Proche"],
      readingsOn: ["シン"],
      readingsKun: ["おや", "した-しい"],
      meaningMnemonicFr: "Se tenir (立), un arbre (木), et regarder (見) - les PARENTS regardent leurs enfants grandir comme des arbres !",
      readingMnemonicFr: "SHIN comme 'sheen' - les PARENTS brillent d'amour ! OYA comme 'oh yeah' - 'oh yeah, tes PARENTS !'",
    },
    {
      character: "生",
      meaningsFr: ["Vie", "Naître", "Cru"],
      readingsOn: ["セイ", "ショウ"],
      readingsKun: ["い-きる", "う-まれる", "なま"],
      meaningMnemonicFr: "Une plante qui pousse de la terre - la VIE qui NAÎT et grandit ! Quelque chose de CRU est vivant.",
      readingMnemonicFr: "SEI comme 'say' - 'say oui à la VIE !' IKIRU comme 'I kill roux' - non, VIVRE pas tuer ! NAMA comme 'nah ma' - 'nah, c'est CRU !'",
    },
  ];

  for (const kanji of level10Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji },
      create: {
        ...kanji,
        levelId: 10,
      },
    });
  }

  const level10Vocab = [
    { word: "気", meaningsFr: ["Esprit", "Énergie"], readings: ["き"], mnemonicFr: "Le kanji seul se lit KI. C'est l'ESPRIT, l'énergie vitale !" },
    { word: "天気", meaningsFr: ["Météo"], readings: ["てんき"], mnemonicFr: "CIEL + ESPRIT = TENKI, l'humeur du ciel = la météo !" },
    { word: "電気", meaningsFr: ["Électricité"], readings: ["でんき"], mnemonicFr: "ÉLECTRICITÉ + ESPRIT = DENKI, le courant électrique !" },
    { word: "元気", meaningsFr: ["En forme", "Énergique"], readings: ["げんき"], mnemonicFr: "ORIGINE + ESPRIT = GENKI, être en pleine forme !" },
    { word: "電話", meaningsFr: ["Téléphone"], readings: ["でんわ"], mnemonicFr: "ÉLECTRICITÉ + PARLER = DENWA, parler par l'électricité !" },
    { word: "間", meaningsFr: ["Intervalle"], readings: ["あいだ"], mnemonicFr: "Le kanji seul se lit AIDA. C'est l'INTERVALLE entre deux choses !" },
    { word: "時間", meaningsFr: ["Temps", "Durée"], readings: ["じかん"], mnemonicFr: "HEURE + INTERVALLE = JIKAN, la durée du temps !" },
    { word: "明るい", meaningsFr: ["Lumineux"], readings: ["あかるい"], mnemonicFr: "LUMINEUX + い = AKARUI, quelque chose de clair !" },
    { word: "多い", meaningsFr: ["Nombreux"], readings: ["おおい"], mnemonicFr: "BEAUCOUP + い = OOI, en grande quantité !" },
    { word: "少ない", meaningsFr: ["Peu nombreux"], readings: ["すくない"], mnemonicFr: "PEU + ない = SUKUNAI, en petite quantité !" },
    { word: "何", meaningsFr: ["Quoi"], readings: ["なに"], mnemonicFr: "Le kanji seul se lit NANI. C'est QUOI ?" },
    { word: "何人", meaningsFr: ["Combien de personnes"], readings: ["なんにん"], mnemonicFr: "QUOI + PERSONNE = NANNIN, combien de gens ?" },
    { word: "友達", meaningsFr: ["Ami"], readings: ["ともだち"], mnemonicFr: "AMI + ATTEINDRE = TOMODACHI, un ami proche !" },
    { word: "親", meaningsFr: ["Parent"], readings: ["おや"], mnemonicFr: "Le kanji seul se lit OYA. C'est un PARENT !" },
    { word: "生きる", meaningsFr: ["Vivre"], readings: ["いきる"], mnemonicFr: "VIE + きる = IKIRU, être en vie !" },
    { word: "生まれる", meaningsFr: ["Naître"], readings: ["うまれる"], mnemonicFr: "VIE + まれる = UMARERU, venir au monde !" },
  ];

  for (const vocab of level10Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: 10 } },
      update: { ...vocab },
      create: {
        ...vocab,
        levelId: 10,
      },
    });
  }

  // ============================================
  // Update kanji-radical relationships for levels 4-10
  // ============================================
  const additionalKanjiRadicalRelations = [
    // Level 4
    { kanjiChar: "心", radicalChars: ["心"] },
    { kanjiChar: "立", radicalChars: ["立"] },
    { kanjiChar: "見", radicalChars: ["見"] },
    { kanjiChar: "言", radicalChars: ["言"] },
    { kanjiChar: "石", radicalChars: ["石"] },
    { kanjiChar: "車", radicalChars: ["車"] },
    { kanjiChar: "食", radicalChars: ["食"] },
    { kanjiChar: "飲", radicalChars: ["食"] },
    { kanjiChar: "休", radicalChars: ["人", "木"] },
    { kanjiChar: "体", radicalChars: ["人"] },
    // Level 5
    { kanjiChar: "上", radicalChars: ["上"] },
    { kanjiChar: "下", radicalChars: ["下"] },
    { kanjiChar: "右", radicalChars: ["右"] },
    { kanjiChar: "左", radicalChars: ["左"] },
    { kanjiChar: "入", radicalChars: ["入"] },
    { kanjiChar: "出", radicalChars: ["出"] },
    { kanjiChar: "行", radicalChars: ["行"] },
    { kanjiChar: "来", radicalChars: ["来"] },
    { kanjiChar: "前", radicalChars: ["前"] },
    { kanjiChar: "後", radicalChars: ["後"] },
    // Level 6
    { kanjiChar: "年", radicalChars: ["年"] },
    { kanjiChar: "時", radicalChars: ["日", "時"] },
    { kanjiChar: "分", radicalChars: ["分"] },
    { kanjiChar: "今", radicalChars: ["今"] },
    { kanjiChar: "朝", radicalChars: ["日", "月", "朝"] },
    { kanjiChar: "昼", radicalChars: ["日", "昼"] },
    { kanjiChar: "夜", radicalChars: ["夜"] },
    { kanjiChar: "週", radicalChars: ["週"] },
    { kanjiChar: "天", radicalChars: ["大", "天"] },
    { kanjiChar: "空", radicalChars: ["空"] },
    // Level 7
    { kanjiChar: "国", radicalChars: ["国"] },
    { kanjiChar: "学", radicalChars: ["子", "学"] },
    { kanjiChar: "校", radicalChars: ["木", "校"] },
    { kanjiChar: "会", radicalChars: ["会"] },
    { kanjiChar: "社", radicalChars: ["社"] },
    { kanjiChar: "店", radicalChars: ["店"] },
    { kanjiChar: "駅", radicalChars: ["駅"] },
    { kanjiChar: "道", radicalChars: ["道"] },
    { kanjiChar: "外", radicalChars: ["外"] },
    { kanjiChar: "内", radicalChars: ["人", "内"] },
    // Level 8
    { kanjiChar: "書", radicalChars: ["書"] },
    { kanjiChar: "読", radicalChars: ["言", "読"] },
    { kanjiChar: "話", radicalChars: ["言", "話"] },
    { kanjiChar: "聞", radicalChars: ["耳", "門", "聞"] },
    { kanjiChar: "買", radicalChars: ["貝", "買"] },
    { kanjiChar: "売", radicalChars: ["売"] },
    { kanjiChar: "思", radicalChars: ["田", "心", "思"] },
    { kanjiChar: "知", radicalChars: ["知"] },
    { kanjiChar: "住", radicalChars: ["人", "住"] },
    { kanjiChar: "待", radicalChars: ["待"] },
    // Level 9
    { kanjiChar: "白", radicalChars: ["白"] },
    { kanjiChar: "赤", radicalChars: ["赤"] },
    { kanjiChar: "青", radicalChars: ["青"] },
    { kanjiChar: "黒", radicalChars: ["黒"] },
    { kanjiChar: "長", radicalChars: ["長"] },
    { kanjiChar: "短", radicalChars: ["短"] },
    { kanjiChar: "高", radicalChars: ["高"] },
    { kanjiChar: "安", radicalChars: ["女", "安"] },
    { kanjiChar: "新", radicalChars: ["木", "新"] },
    { kanjiChar: "古", radicalChars: ["十", "口", "古"] },
    // Level 10
    { kanjiChar: "気", radicalChars: ["気"] },
    { kanjiChar: "電", radicalChars: ["雨", "電"] },
    { kanjiChar: "間", radicalChars: ["門", "日", "間"] },
    { kanjiChar: "明", radicalChars: ["日", "月", "明"] },
    { kanjiChar: "多", radicalChars: ["多"] },
    { kanjiChar: "少", radicalChars: ["小", "少"] },
    { kanjiChar: "何", radicalChars: ["人", "何"] },
    { kanjiChar: "友", radicalChars: ["友"] },
    { kanjiChar: "親", radicalChars: ["立", "木", "見", "親"] },
    { kanjiChar: "生", radicalChars: ["生"] },
  ];

  for (const relation of additionalKanjiRadicalRelations) {
    const kanji = await prisma.kanji.findUnique({
      where: { character: relation.kanjiChar },
    });

    if (kanji) {
      for (const radicalChar of relation.radicalChars) {
        const radical = await prisma.radical.findFirst({
          where: { character: radicalChar },
        });

        if (radical) {
          await prisma.kanjiRadical.upsert({
            where: {
              kanjiId_radicalId: { kanjiId: kanji.id, radicalId: radical.id },
            },
            update: {},
            create: { kanjiId: kanji.id, radicalId: radical.id },
          });
        }
      }
    }
  }

  // ============================================
  // Update vocabulary-kanji relationships for levels 4-10
  // ============================================
  const additionalVocabKanjiRelations = [
    // Level 4
    { vocabWord: "心", kanjiChars: ["心"] },
    { vocabWord: "立つ", kanjiChars: ["立"] },
    { vocabWord: "見る", kanjiChars: ["見"] },
    { vocabWord: "言う", kanjiChars: ["言"] },
    { vocabWord: "石", kanjiChars: ["石"] },
    { vocabWord: "車", kanjiChars: ["車"] },
    { vocabWord: "電車", kanjiChars: ["電", "車"] },
    { vocabWord: "食べる", kanjiChars: ["食"] },
    { vocabWord: "飲む", kanjiChars: ["飲"] },
    { vocabWord: "休む", kanjiChars: ["休"] },
    { vocabWord: "休み", kanjiChars: ["休"] },
    { vocabWord: "体", kanjiChars: ["体"] },
    { vocabWord: "食べ物", kanjiChars: ["食"] },
    { vocabWord: "飲み物", kanjiChars: ["飲"] },
    { vocabWord: "安心", kanjiChars: ["安", "心"] },
    { vocabWord: "中心", kanjiChars: ["中", "心"] },
    // Level 5
    { vocabWord: "上", kanjiChars: ["上"] },
    { vocabWord: "下", kanjiChars: ["下"] },
    { vocabWord: "右", kanjiChars: ["右"] },
    { vocabWord: "左", kanjiChars: ["左"] },
    { vocabWord: "入る", kanjiChars: ["入"] },
    { vocabWord: "出る", kanjiChars: ["出"] },
    { vocabWord: "行く", kanjiChars: ["行"] },
    { vocabWord: "来る", kanjiChars: ["来"] },
    { vocabWord: "前", kanjiChars: ["前"] },
    { vocabWord: "後", kanjiChars: ["後"] },
    { vocabWord: "上がる", kanjiChars: ["上"] },
    { vocabWord: "下がる", kanjiChars: ["下"] },
    { vocabWord: "入口", kanjiChars: ["入", "口"] },
    { vocabWord: "出口", kanjiChars: ["出", "口"] },
    { vocabWord: "左右", kanjiChars: ["左", "右"] },
    { vocabWord: "前後", kanjiChars: ["前", "後"] },
    // Level 6
    { vocabWord: "年", kanjiChars: ["年"] },
    { vocabWord: "今年", kanjiChars: ["今", "年"] },
    { vocabWord: "時", kanjiChars: ["時"] },
    { vocabWord: "時間", kanjiChars: ["時", "間"] },
    { vocabWord: "分", kanjiChars: ["分"] },
    { vocabWord: "今", kanjiChars: ["今"] },
    { vocabWord: "今日", kanjiChars: ["今", "日"] },
    { vocabWord: "朝", kanjiChars: ["朝"] },
    { vocabWord: "昼", kanjiChars: ["昼"] },
    { vocabWord: "夜", kanjiChars: ["夜"] },
    { vocabWord: "週", kanjiChars: ["週"] },
    { vocabWord: "今週", kanjiChars: ["今", "週"] },
    { vocabWord: "天", kanjiChars: ["天"] },
    { vocabWord: "空", kanjiChars: ["空"] },
    { vocabWord: "天気", kanjiChars: ["天", "気"] },
    { vocabWord: "朝ご飯", kanjiChars: ["朝"] },
    // Level 7
    { vocabWord: "国", kanjiChars: ["国"] },
    { vocabWord: "外国", kanjiChars: ["外", "国"] },
    { vocabWord: "学ぶ", kanjiChars: ["学"] },
    { vocabWord: "学校", kanjiChars: ["学", "校"] },
    { vocabWord: "学生", kanjiChars: ["学", "生"] },
    { vocabWord: "会う", kanjiChars: ["会"] },
    { vocabWord: "会社", kanjiChars: ["会", "社"] },
    { vocabWord: "店", kanjiChars: ["店"] },
    { vocabWord: "駅", kanjiChars: ["駅"] },
    { vocabWord: "道", kanjiChars: ["道"] },
    { vocabWord: "外", kanjiChars: ["外"] },
    { vocabWord: "外出", kanjiChars: ["外", "出"] },
    { vocabWord: "内", kanjiChars: ["内"] },
    { vocabWord: "国内", kanjiChars: ["国", "内"] },
    { vocabWord: "駅前", kanjiChars: ["駅", "前"] },
    { vocabWord: "会社員", kanjiChars: ["会", "社"] },
    // Level 8
    { vocabWord: "書く", kanjiChars: ["書"] },
    { vocabWord: "読む", kanjiChars: ["読"] },
    { vocabWord: "話す", kanjiChars: ["話"] },
    { vocabWord: "話", kanjiChars: ["話"] },
    { vocabWord: "聞く", kanjiChars: ["聞"] },
    { vocabWord: "買う", kanjiChars: ["買"] },
    { vocabWord: "売る", kanjiChars: ["売"] },
    { vocabWord: "思う", kanjiChars: ["思"] },
    { vocabWord: "知る", kanjiChars: ["知"] },
    { vocabWord: "住む", kanjiChars: ["住"] },
    { vocabWord: "待つ", kanjiChars: ["待"] },
    { vocabWord: "書類", kanjiChars: ["書"] },
    { vocabWord: "読書", kanjiChars: ["読", "書"] },
    { vocabWord: "知識", kanjiChars: ["知"] },
    { vocabWord: "売り場", kanjiChars: ["売"] },
    { vocabWord: "買い物", kanjiChars: ["買"] },
    // Level 9
    { vocabWord: "白", kanjiChars: ["白"] },
    { vocabWord: "白い", kanjiChars: ["白"] },
    { vocabWord: "赤", kanjiChars: ["赤"] },
    { vocabWord: "赤い", kanjiChars: ["赤"] },
    { vocabWord: "青", kanjiChars: ["青"] },
    { vocabWord: "青い", kanjiChars: ["青"] },
    { vocabWord: "黒", kanjiChars: ["黒"] },
    { vocabWord: "黒い", kanjiChars: ["黒"] },
    { vocabWord: "長い", kanjiChars: ["長"] },
    { vocabWord: "短い", kanjiChars: ["短"] },
    { vocabWord: "高い", kanjiChars: ["高"] },
    { vocabWord: "安い", kanjiChars: ["安"] },
    { vocabWord: "新しい", kanjiChars: ["新"] },
    { vocabWord: "古い", kanjiChars: ["古"] },
    { vocabWord: "長さ", kanjiChars: ["長"] },
    { vocabWord: "高さ", kanjiChars: ["高"] },
    // Level 10
    { vocabWord: "気", kanjiChars: ["気"] },
    { vocabWord: "電気", kanjiChars: ["電", "気"] },
    { vocabWord: "元気", kanjiChars: ["気"] },
    { vocabWord: "電話", kanjiChars: ["電", "話"] },
    { vocabWord: "間", kanjiChars: ["間"] },
    { vocabWord: "明るい", kanjiChars: ["明"] },
    { vocabWord: "多い", kanjiChars: ["多"] },
    { vocabWord: "少ない", kanjiChars: ["少"] },
    { vocabWord: "何", kanjiChars: ["何"] },
    { vocabWord: "何人", kanjiChars: ["何", "人"] },
    { vocabWord: "友達", kanjiChars: ["友"] },
    { vocabWord: "親", kanjiChars: ["親"] },
    { vocabWord: "生きる", kanjiChars: ["生"] },
    { vocabWord: "生まれる", kanjiChars: ["生"] },
  ];

  for (const relation of additionalVocabKanjiRelations) {
    const vocab = await prisma.vocabulary.findFirst({
      where: { word: relation.vocabWord },
    });

    if (vocab) {
      for (const kanjiChar of relation.kanjiChars) {
        const kanji = await prisma.kanji.findUnique({
          where: { character: kanjiChar },
        });

        if (kanji) {
          await prisma.vocabularyKanji.upsert({
            where: {
              vocabularyId_kanjiId: { vocabularyId: vocab.id, kanjiId: kanji.id },
            },
            update: {},
            create: { vocabularyId: vocab.id, kanjiId: kanji.id },
          });
        }
      }
    }
  }

  console.log("Seeding complete! All 10 levels with improved mnemonics.");
  console.log("Total content:");
  console.log("- Radicals: ~98");
  console.log("- Kanji: ~92");
  console.log("- Vocabulary: ~143");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
