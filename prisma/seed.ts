import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create levels 1-3
  for (let i = 1; i <= 3; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // Level 1 Radicals
  const level1Radicals = [
    { character: "\u4e00", meaningFr: "Un", mnemonic: "Un seul trait horizontal, comme le chiffre 1 couche sur le cote." },
    { character: "\u4e8c", meaningFr: "Deux", mnemonic: "Deux traits horizontaux, comme deux lignes paralleles." },
    { character: "\u4e09", meaningFr: "Trois", mnemonic: "Trois traits horizontaux empiles." },
    { character: "\u5341", meaningFr: "Dix", mnemonic: "Une croix, comme le chiffre romain X." },
    { character: "\u53e3", meaningFr: "Bouche", mnemonic: "Un carre ouvert, comme une bouche vue de face." },
    { character: "\u65e5", meaningFr: "Soleil", mnemonic: "Un rectangle avec un trait au milieu, comme le soleil brillant." },
    { character: "\u6708", meaningFr: "Lune", mnemonic: "Une forme courbee comme un croissant de lune." },
    { character: "\u5c71", meaningFr: "Montagne", mnemonic: "Trois pics comme une chaine de montagnes." },
    { character: "\u5ddd", meaningFr: "Riviere", mnemonic: "Trois traits verticaux comme l'eau qui coule." },
    { character: "\u6728", meaningFr: "Arbre", mnemonic: "Un tronc avec des branches, comme un arbre vu de loin." },
  ];

  for (const radical of level1Radicals) {
    await prisma.radical.upsert({
      where: { id: level1Radicals.indexOf(radical) + 1 },
      update: {},
      create: {
        ...radical,
        levelId: 1,
      },
    });
  }

  // Level 1 Kanji
  const level1Kanji = [
    {
      character: "\u4e00",
      meaningsFr: ["Un", "Premier"],
      readingsOn: ["\u30a4\u30c1"],
      readingsKun: ["\u3072\u3068-", "\u3072\u3068\u3064"],
      meaningMnemonicFr: "Un seul trait horizontal represente le chiffre un.",
      readingMnemonicFr: "Pensez a 'ichi' comme 'itchy' (ca demange) - vous avez UN seul endroit qui demange.",
    },
    {
      character: "\u4e8c",
      meaningsFr: ["Deux", "Deuxieme"],
      readingsOn: ["\u30cb"],
      readingsKun: ["\u3075\u305f-", "\u3075\u305f\u3064"],
      meaningMnemonicFr: "Deux traits horizontaux empiles representent le chiffre deux.",
      readingMnemonicFr: "Pensez a 'ni' comme 'knee' (genou) - vous avez DEUX genoux.",
    },
    {
      character: "\u4e09",
      meaningsFr: ["Trois", "Troisieme"],
      readingsOn: ["\u30b5\u30f3"],
      readingsKun: ["\u307f-", "\u307f\u3063\u3064"],
      meaningMnemonicFr: "Trois traits horizontaux empiles representent le chiffre trois.",
      readingMnemonicFr: "Pensez a 'san' comme le prenom - TROIS lettres dans San.",
    },
    {
      character: "\u5341",
      meaningsFr: ["Dix"],
      readingsOn: ["\u30b8\u30e5\u30a6"],
      readingsKun: ["\u3068\u304a"],
      meaningMnemonicFr: "Une croix comme le chiffre romain X (dix).",
      readingMnemonicFr: "Pensez a 'juu' comme 'jew' - le peuple a erre DIX ans dans le desert.",
    },
    {
      character: "\u65e5",
      meaningsFr: ["Soleil", "Jour"],
      readingsOn: ["\u30cb\u30c1"],
      readingsKun: ["\u3072"],
      meaningMnemonicFr: "Un rectangle avec une ligne au milieu represente le soleil.",
      readingMnemonicFr: "'Nichi' ressemble a 'niche' - le soleil brille sur votre niche.",
    },
    {
      character: "\u6708",
      meaningsFr: ["Lune", "Mois"],
      readingsOn: ["\u30b2\u30c4"],
      readingsKun: ["\u3064\u304d"],
      meaningMnemonicFr: "Une forme courbee represente la lune ou un mois.",
      readingMnemonicFr: "'Getsu' - chaque mois, on 'get' (obtient) une nouvelle lune.",
    },
  ];

  for (let i = 0; i < level1Kanji.length; i++) {
    const kanji = level1Kanji[i];
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {},
      create: {
        ...kanji,
        levelId: 1,
      },
    });
  }

  // Level 1 Vocabulary
  const level1Vocab = [
    {
      word: "\u4e00",
      meaningsFr: ["Un"],
      readings: ["\u3044\u3061"],
      mnemonicFr: "Le kanji seul se lit 'ichi' et signifie un.",
      sentenceJp: "\u4e00\u304b\u3089\u5341\u307e\u3067\u6570\u3048\u3066\u304f\u3060\u3055\u3044\u3002",
      sentenceFr: "Comptez de un a dix s'il vous plait.",
    },
    {
      word: "\u4e8c",
      meaningsFr: ["Deux"],
      readings: ["\u306b"],
      mnemonicFr: "Le kanji seul se lit 'ni' et signifie deux.",
      sentenceJp: "\u4e8c\u3064\u306e\u308a\u3093\u3054\u304c\u3042\u308a\u307e\u3059\u3002",
      sentenceFr: "Il y a deux pommes.",
    },
    {
      word: "\u4e09",
      meaningsFr: ["Trois"],
      readings: ["\u3055\u3093"],
      mnemonicFr: "Le kanji seul se lit 'san' et signifie trois.",
      sentenceJp: "\u4e09\u4eba\u306e\u5b66\u751f\u304c\u3044\u307e\u3059\u3002",
      sentenceFr: "Il y a trois etudiants.",
    },
    {
      word: "\u5341",
      meaningsFr: ["Dix"],
      readings: ["\u3058\u3085\u3046"],
      mnemonicFr: "Le kanji seul se lit 'juu' et signifie dix.",
      sentenceJp: "\u5341\u5206\u5f85\u3063\u3066\u304f\u3060\u3055\u3044\u3002",
      sentenceFr: "Attendez dix minutes s'il vous plait.",
    },
    {
      word: "\u4e00\u65e5",
      meaningsFr: ["Premier jour", "Un jour"],
      readings: ["\u3044\u3061\u306b\u3061", "\u3064\u3044\u305f\u3061"],
      mnemonicFr: "Un + jour = premier jour du mois ou une journee.",
      sentenceJp: "\u4e00\u65e5\u306f\u65e5\u66dc\u65e5\u3067\u3059\u3002",
      sentenceFr: "Le premier est un dimanche.",
    },
    {
      word: "\u4e8c\u65e5",
      meaningsFr: ["Deuxieme jour", "Deux jours"],
      readings: ["\u3075\u3064\u304b"],
      mnemonicFr: "Deux + jour = deuxieme jour du mois ou deux jours.",
      sentenceJp: "\u4e8c\u65e5\u306b\u4f1a\u3044\u307e\u3057\u3087\u3046\u3002",
      sentenceFr: "Retrouvons-nous le deux.",
    },
  ];

  for (const vocab of level1Vocab) {
    await prisma.vocabulary.upsert({
      where: { id: level1Vocab.indexOf(vocab) + 1 },
      update: {},
      create: {
        ...vocab,
        levelId: 1,
      },
    });
  }

  // Level 2 Radicals
  const level2Radicals = [
    { character: "\u706b", meaningFr: "Feu", mnemonic: "Des flammes qui s'elevent vers le haut." },
    { character: "\u6c34", meaningFr: "Eau", mnemonic: "Des gouttes d'eau qui coulent." },
    { character: "\u571f", meaningFr: "Terre", mnemonic: "Une croix avec une base, comme une plante dans le sol." },
    { character: "\u91d1", meaningFr: "Or", mnemonic: "Un toit sur des lingots d'or." },
    { character: "\u4eba", meaningFr: "Personne", mnemonic: "Une personne qui marche, vue de cote." },
    { character: "\u5927", meaningFr: "Grand", mnemonic: "Une personne qui ecarte les bras pour montrer 'grand'." },
    { character: "\u5c0f", meaningFr: "Petit", mnemonic: "Un point avec deux traits, comme quelque chose de petit." },
    { character: "\u4e2d", meaningFr: "Milieu", mnemonic: "Une ligne qui passe au milieu d'un rectangle." },
  ];

  for (let i = 0; i < level2Radicals.length; i++) {
    await prisma.radical.upsert({
      where: { id: 11 + i },
      update: {},
      create: {
        ...level2Radicals[i],
        levelId: 2,
      },
    });
  }

  // Level 2 Kanji
  const level2Kanji = [
    {
      character: "\u706b",
      meaningsFr: ["Feu"],
      readingsOn: ["\u30ab"],
      readingsKun: ["\u3072"],
      meaningMnemonicFr: "Des flammes qui montent represente le feu.",
      readingMnemonicFr: "'Ka' comme dans 'car' - le feu peut bruler une voiture.",
    },
    {
      character: "\u6c34",
      meaningsFr: ["Eau"],
      readingsOn: ["\u30b9\u30a4"],
      readingsKun: ["\u307f\u305a"],
      meaningMnemonicFr: "Des gouttes d'eau qui s'ecoulent.",
      readingMnemonicFr: "'Sui' comme 'sweet' - l'eau fraiche est douce.",
    },
    {
      character: "\u4eba",
      meaningsFr: ["Personne", "Homme"],
      readingsOn: ["\u30b8\u30f3", "\u30cb\u30f3"],
      readingsKun: ["\u3072\u3068"],
      meaningMnemonicFr: "Une silhouette de personne qui marche.",
      readingMnemonicFr: "'Jin' comme 'jeans' - une personne porte des jeans.",
    },
    {
      character: "\u5927",
      meaningsFr: ["Grand", "Gros"],
      readingsOn: ["\u30c0\u30a4", "\u30bf\u30a4"],
      readingsKun: ["\u304a\u304a-"],
      meaningMnemonicFr: "Une personne ecartant les bras pour montrer la grandeur.",
      readingMnemonicFr: "'Dai' comme 'die' - quelque chose de grand peut vous ecraser.",
    },
    {
      character: "\u5c0f",
      meaningsFr: ["Petit"],
      readingsOn: ["\u30b7\u30e7\u30a6"],
      readingsKun: ["\u3061\u3044-", "\u3053-", "\u304a-"],
      meaningMnemonicFr: "Un point minuscule avec deux petits traits.",
      readingMnemonicFr: "'Shou' comme 'show' - un petit spectacle.",
    },
    {
      character: "\u4e2d",
      meaningsFr: ["Milieu", "Centre", "Interieur"],
      readingsOn: ["\u30c1\u30e5\u30a6"],
      readingsKun: ["\u306a\u304b"],
      meaningMnemonicFr: "Une ligne qui traverse le centre d'un rectangle.",
      readingMnemonicFr: "'Chuu' comme 'chew' - macher au milieu de la bouche.",
    },
  ];

  for (const kanji of level2Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {},
      create: {
        ...kanji,
        levelId: 2,
      },
    });
  }

  // Level 2 Vocabulary
  const level2Vocab = [
    {
      word: "\u706b",
      meaningsFr: ["Feu"],
      readings: ["\u3072"],
      mnemonicFr: "Le kanji seul se lit 'hi' et signifie feu.",
    },
    {
      word: "\u6c34",
      meaningsFr: ["Eau"],
      readings: ["\u307f\u305a"],
      mnemonicFr: "Le kanji seul se lit 'mizu' et signifie eau.",
    },
    {
      word: "\u5927\u304d\u3044",
      meaningsFr: ["Grand"],
      readings: ["\u304a\u304a\u304d\u3044"],
      mnemonicFr: "Grand + ki = adjectif 'grand'.",
    },
    {
      word: "\u5c0f\u3055\u3044",
      meaningsFr: ["Petit"],
      readings: ["\u3061\u3044\u3055\u3044"],
      mnemonicFr: "Petit + sai = adjectif 'petit'.",
    },
    {
      word: "\u4e2d",
      meaningsFr: ["Milieu", "Dedans"],
      readings: ["\u306a\u304b"],
      mnemonicFr: "Le kanji seul se lit 'naka' et signifie milieu ou dedans.",
    },
    {
      word: "\u4e00\u4eba",
      meaningsFr: ["Une personne", "Seul"],
      readings: ["\u3072\u3068\u308a"],
      mnemonicFr: "Un + personne = une seule personne.",
    },
    {
      word: "\u4e8c\u4eba",
      meaningsFr: ["Deux personnes"],
      readings: ["\u3075\u305f\u308a"],
      mnemonicFr: "Deux + personne = deux personnes.",
    },
  ];

  for (let i = 0; i < level2Vocab.length; i++) {
    await prisma.vocabulary.upsert({
      where: { id: 7 + i },
      update: {},
      create: {
        ...level2Vocab[i],
        levelId: 2,
      },
    });
  }

  // Create kanji-radical relationships
  const kanjiRadicalRelations = [
    { kanjiChar: "\u4e00", radicalChars: ["\u4e00"] },
    { kanjiChar: "\u4e8c", radicalChars: ["\u4e8c"] },
    { kanjiChar: "\u4e09", radicalChars: ["\u4e09"] },
    { kanjiChar: "\u5341", radicalChars: ["\u5341"] },
    { kanjiChar: "\u65e5", radicalChars: ["\u65e5"] },
    { kanjiChar: "\u6708", radicalChars: ["\u6708"] },
    { kanjiChar: "\u706b", radicalChars: ["\u706b"] },
    { kanjiChar: "\u6c34", radicalChars: ["\u6c34"] },
    { kanjiChar: "\u4eba", radicalChars: ["\u4eba"] },
    { kanjiChar: "\u5927", radicalChars: ["\u5927"] },
    { kanjiChar: "\u5c0f", radicalChars: ["\u5c0f"] },
    { kanjiChar: "\u4e2d", radicalChars: ["\u4e2d"] },
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

  // Create vocabulary-kanji relationships
  const vocabKanjiRelations = [
    { vocabWord: "一", kanjiChars: ["一"] },
    { vocabWord: "二", kanjiChars: ["二"] },
    { vocabWord: "三", kanjiChars: ["三"] },
    { vocabWord: "十", kanjiChars: ["十"] },
    { vocabWord: "一日", kanjiChars: ["一", "日"] },
    { vocabWord: "二日", kanjiChars: ["二", "日"] },
    { vocabWord: "火", kanjiChars: ["火"] },
    { vocabWord: "水", kanjiChars: ["水"] },
    { vocabWord: "大人", kanjiChars: ["大", "人"] },
    { vocabWord: "人", kanjiChars: ["人"] },
    { vocabWord: "大きい", kanjiChars: ["大"] },
    { vocabWord: "小さい", kanjiChars: ["小"] },
    { vocabWord: "中", kanjiChars: ["中"] },
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

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
