import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Additional N2/N3 kanji with quality French storytelling mnemonics
// Each character is unique and commonly used

const kanjiData = [
  // Level 21 - Daily life verbs
  { character: "拾", meaningsFr: ["Ramasser", "Cueillir"], readingsOn: ["シュウ", "ジュウ"], readingsKun: ["ひろ-う"], meaningMnemonicFr: "Une main (扌) qui ramasse ce qu'elle joint (合) - RAMASSER. Comme ramasser les marrons dans les jardins du Luxembourg en automne.", readingMnemonicFr: "HIROU - 'Hé, regarde!' en ramassant un trésor.", levelId: 21 },
  { character: "捨", meaningsFr: ["Jeter", "Abandonner"], readingsOn: ["シャ"], readingsKun: ["す-てる"], meaningMnemonicFr: "Une main (扌) qui abandonne un abri (舎) - JETER. Se débarrasser du superflu, comme Marie Kondo nous l'enseigne.", readingMnemonicFr: "SUTERU - 'C'est fini!' en jetant à la poubelle.", levelId: 21 },
  { character: "払", meaningsFr: ["Payer", "Balayer"], readingsOn: ["フツ"], readingsKun: ["はら-う"], meaningMnemonicFr: "Une main (扌) avec le privé (ム) et force (力) - PAYER. Régler l'addition au restaurant, balayer devant sa porte.", readingMnemonicFr: "HARAU - 'Voilà!' en payant la note.", levelId: 21 },

  // Level 22 - Movement
  { character: "滑", meaningsFr: ["Glisser", "Lisse"], readingsOn: ["カツ"], readingsKun: ["すべ-る", "なめ-らか"], meaningMnemonicFr: "L'eau (氵) qui coule sur les os (骨) - GLISSER. La patinoire de l'Hôtel de Ville en hiver, les enfants qui glissent joyeusement.", readingMnemonicFr: "SUBERU - 'Super!' en glissant sur la glace.", levelId: 22 },
  { character: "跳", meaningsFr: ["Sauter", "Bondir"], readingsOn: ["チョウ"], readingsKun: ["と-ぶ", "は-ねる"], meaningMnemonicFr: "Un pied (足) qui part vers un signe (兆) - SAUTER. Le kangourou qui bondit, l'athlète aux JO de Paris.", readingMnemonicFr: "TOBU - 'Hop!' et on saute!", levelId: 22 },
  { character: "歩", meaningsFr: ["Marcher", "Pas"], readingsOn: ["ホ", "ブ", "フ"], readingsKun: ["ある-く", "あゆ-む"], meaningMnemonicFr: "Arrêter (止) puis avancer (少) - MARCHER. La promenade dominicale le long de la Seine, flâner à Montmartre.", readingMnemonicFr: "ARUKU - 'Allons-y!' on marche.", levelId: 22 },

  // Level 23 - Nature elements
  { character: "波", meaningsFr: ["Vague", "Ondulation"], readingsOn: ["ハ"], readingsKun: ["なみ"], meaningMnemonicFr: "L'eau (氵) avec la peau (皮) qui ondule - la VAGUE. Les vagues de l'océan à Biarritz, le surfeur qui attend.", readingMnemonicFr: "NAMI - la vague qui 'navigue'.", levelId: 23 },
  { character: "風", meaningsFr: ["Vent", "Style"], readingsOn: ["フウ", "フ"], readingsKun: ["かぜ"], meaningMnemonicFr: "Un insecte (虫) porté par l'air dans un enclos - le VENT. Le mistral en Provence, la brise marine sur la Côte d'Azur.", readingMnemonicFr: "KAZE - le vent qui 'caresse'.", levelId: 23 },
  { character: "雲", meaningsFr: ["Nuage"], readingsOn: ["ウン"], readingsKun: ["くも"], meaningMnemonicFr: "La pluie (雨) qui dit (云) quelque chose - le NUAGE. Les nuages qui passent au-dessus de Paris, annonçant la pluie.", readingMnemonicFr: "KUMO - le nuage qui 'couvre' le ciel.", levelId: 23 },

  // Level 24 - Emotions
  { character: "喜", meaningsFr: ["Joie", "Se réjouir"], readingsOn: ["キ"], readingsKun: ["よろこ-ぶ"], meaningMnemonicFr: "Un tambour (鼓) avec une bouche (口) sur un socle - la JOIE qui s'exprime. La fête de la musique, Paris qui chante.", readingMnemonicFr: "YOROKOBU - 'Youpi!' on se réjouit.", levelId: 24 },
  { character: "怒", meaningsFr: ["Colère", "Se fâcher"], readingsOn: ["ド"], readingsKun: ["いか-る", "おこ-る"], meaningMnemonicFr: "Une femme esclave (奴) avec un cœur (心) - la COLÈRE. L'émotion qui monte quand on est traité injustement.", readingMnemonicFr: "OKORU - 'Oh!' la colère qui explose.", levelId: 24 },
  { character: "悲", meaningsFr: ["Tristesse", "Chagrin"], readingsOn: ["ヒ"], readingsKun: ["かな-しい"], meaningMnemonicFr: "Un cœur (心) qui n'est pas (非) heureux - la TRISTESSE. Le vague à l'âme des poètes romantiques.", readingMnemonicFr: "KANASHII - le cœur qui 'saigne'.", levelId: 24 },

  // Level 25 - Social interactions
  { character: "会", meaningsFr: ["Rencontrer", "Réunion"], readingsOn: ["カイ", "エ"], readingsKun: ["あ-う"], meaningMnemonicFr: "Un toit (亼) avec des gens qui se rassemblent (云) - SE RÉUNIR. Le rendez-vous au café de Flore.", readingMnemonicFr: "AU - 'Ah!' en se rencontrant.", levelId: 25 },
  { character: "別", meaningsFr: ["Séparer", "Différent"], readingsOn: ["ベツ"], readingsKun: ["わか-れる"], meaningMnemonicFr: "Une bouche (口) avec un couteau (刂) et force (力) - SE SÉPARER. Les adieux déchirants à la gare.", readingMnemonicFr: "WAKARERU - 'Au revoir' en se séparant.", levelId: 25 },
  { character: "送", meaningsFr: ["Envoyer", "Accompagner"], readingsOn: ["ソウ"], readingsKun: ["おく-る"], meaningMnemonicFr: "Marcher (辶) avec deux personnes et un cadeau - ENVOYER. Raccompagner un ami, envoyer une lettre.", readingMnemonicFr: "OKURU - 'OK' je t'accompagne.", levelId: 25 },

  // Level 26 - Home and living
  { character: "住", meaningsFr: ["Habiter", "Vivre"], readingsOn: ["ジュウ"], readingsKun: ["す-む"], meaningMnemonicFr: "Une personne (亻) qui reste maître (主) - HABITER. S'installer dans son appartement parisien.", readingMnemonicFr: "SUMU - 'Ici c'est chez moi!'", levelId: 26 },
  { character: "建", meaningsFr: ["Construire", "Bâtir"], readingsOn: ["ケン", "コン"], readingsKun: ["た-てる"], meaningMnemonicFr: "Une main (廴) avec un pinceau (聿) qui dessine - CONSTRUIRE. L'architecte qui dessine, le maçon qui bâtit.", readingMnemonicFr: "TATERU - 'On construit!' les fondations.", levelId: 26 },
  { character: "修", meaningsFr: ["Réparer", "Étudier"], readingsOn: ["シュウ"], readingsKun: ["おさ-める"], meaningMnemonicFr: "Une personne (亻) qui arrange avec soin - RÉPARER. Le bricoleur qui répare, l'étudiant qui perfectionne.", readingMnemonicFr: "OSAMERU - 'Voilà, c'est réparé!'", levelId: 26 },

  // Level 27 - Work and effort
  { character: "勤", meaningsFr: ["Travailler", "Servir"], readingsOn: ["キン", "ゴン"], readingsKun: ["つと-める"], meaningMnemonicFr: "De l'herbe difficile (堇) avec de la force (力) - TRAVAILLER DUR. Le salaryman qui travaille sans relâche.", readingMnemonicFr: "TSUTOMERU - 'Je travaille!' avec effort.", levelId: 27 },
  { character: "休", meaningsFr: ["Se reposer", "Vacances"], readingsOn: ["キュウ"], readingsKun: ["やす-む"], meaningMnemonicFr: "Une personne (亻) près d'un arbre (木) - SE REPOSER. La sieste à l'ombre, la pause bien méritée.", readingMnemonicFr: "YASUMU - 'Ah, enfin du repos!'", levelId: 27 },
  { character: "続", meaningsFr: ["Continuer", "Suite"], readingsOn: ["ゾク"], readingsKun: ["つづ-く", "つづ-ける"], meaningMnemonicFr: "Un fil (糸) qui vend (売) toujours - CONTINUER. L'histoire qui se déroule, la série qu'on ne peut arrêter.", readingMnemonicFr: "TSUZUKU - 'À suivre...'", levelId: 27 },

  // Level 28 - Communication
  { character: "呼", meaningsFr: ["Appeler", "Crier"], readingsOn: ["コ"], readingsKun: ["よ-ぶ"], meaningMnemonicFr: "Une bouche (口) qui fait un signe (乎) - APPELER. Crier le nom de quelqu'un, appeler au téléphone.", readingMnemonicFr: "YOBU - 'Hé! Par ici!'", levelId: 28 },
  { character: "聴", meaningsFr: ["Écouter attentivement"], readingsOn: ["チョウ"], readingsKun: ["き-く"], meaningMnemonicFr: "Une oreille (耳) avec vertu (徳) et cœur (心) - ÉCOUTER attentivement. Prêter l'oreille aux confidences.", readingMnemonicFr: "KIKU - 'J'écoute de tout mon cœur'.", levelId: 28 },
  { character: "話", meaningsFr: ["Parler", "Histoire"], readingsOn: ["ワ"], readingsKun: ["はな-す", "はなし"], meaningMnemonicFr: "Des paroles (言) avec une langue (舌) - PARLER. La discussion animée au café, raconter ses aventures.", readingMnemonicFr: "HANASU - 'Laisse-moi te raconter...'", levelId: 28 },

  // Level 29 - Learning
  { character: "教", meaningsFr: ["Enseigner", "Religion"], readingsOn: ["キョウ"], readingsKun: ["おし-える", "おそ-わる"], meaningMnemonicFr: "La piété filiale (孝) avec frapper (攵) - ENSEIGNER. Le maître qui transmet son savoir avec discipline.", readingMnemonicFr: "OSHIERU - 'Je vais t'apprendre!'", levelId: 29 },
  { character: "学", meaningsFr: ["Apprendre", "Science"], readingsOn: ["ガク"], readingsKun: ["まな-ぶ"], meaningMnemonicFr: "Un enfant (子) sous un toit qui étudie avec ses mains - APPRENDRE. L'élève studieux, la soif de connaissance.", readingMnemonicFr: "MANABU - 'J'apprends chaque jour'.", levelId: 29 },
  { character: "思", meaningsFr: ["Penser", "Croire"], readingsOn: ["シ"], readingsKun: ["おも-う"], meaningMnemonicFr: "Un champ (田) dans le cœur (心) - PENSER. Cultiver ses pensées comme un champ, méditer.", readingMnemonicFr: "OMOU - 'Je pense donc je suis'.", levelId: 29 },

  // Level 30 - Actions
  { character: "開", meaningsFr: ["Ouvrir", "Développer"], readingsOn: ["カイ"], readingsKun: ["あ-く", "あ-ける", "ひら-く"], meaningMnemonicFr: "Une porte (門) avec deux mains qui poussent (开) - OUVRIR. Ouvrir la porte d'un nouveau chapitre de sa vie.", readingMnemonicFr: "AKERU - 'Ouvrez!' la porte s'ouvre.", levelId: 30 },
  { character: "閉", meaningsFr: ["Fermer", "Clore"], readingsOn: ["ヘイ"], readingsKun: ["と-じる", "し-める", "し-まる"], meaningMnemonicFr: "Une porte (門) avec un talent (才) enfermé - FERMER. Clore un chapitre, fermer boutique.", readingMnemonicFr: "SHIMERU - 'On ferme!' rideau.", levelId: 30 },
  { character: "回", meaningsFr: ["Tourner", "Fois"], readingsOn: ["カイ", "エ"], readingsKun: ["まわ-る", "まわ-す"], meaningMnemonicFr: "Une bouche (口) qui tourne sur elle-même - TOURNER. Le manège qui tourne, la Terre qui pivote.", readingMnemonicFr: "MAWARU - 'Ça tourne!' comme un carrousel.", levelId: 30 },

  // Level 31 - Feelings
  { character: "恐", meaningsFr: ["Craindre", "Terrible"], readingsOn: ["キョウ"], readingsKun: ["おそ-れる", "こわ-い"], meaningMnemonicFr: "Du travail (工) avec un cœur (心) et frapper - CRAINDRE. La peur qui fait battre le cœur vite.", readingMnemonicFr: "OSORERU - 'J'ai peur!' le cœur qui bat.", levelId: 31 },
  { character: "望", meaningsFr: ["Espérer", "Désirer"], readingsOn: ["ボウ", "モウ"], readingsKun: ["のぞ-む"], meaningMnemonicFr: "Regarder (亡) la lune (月) avec un roi (王) - ESPÉRER. Les rêves d'avenir, l'espoir d'un monde meilleur.", readingMnemonicFr: "NOZOMU - 'J'espère...' les yeux vers la lune.", levelId: 31 },
  { character: "悔", meaningsFr: ["Regretter", "Se repentir"], readingsOn: ["カイ"], readingsKun: ["く-いる", "くや-む"], meaningMnemonicFr: "Un cœur (心) avec chaque (毎) - REGRETTER. Le remords qui revient chaque jour, les regrets du passé.", readingMnemonicFr: "KUIRU - 'Si seulement...' le regret.", levelId: 31 },

  // Level 32 - Movement and direction
  { character: "登", meaningsFr: ["Monter", "Grimper"], readingsOn: ["トウ", "ト"], readingsKun: ["のぼ-る"], meaningMnemonicFr: "Une montée avec des pieds et des mains (豆) - MONTER. Gravir les marches de Montmartre, escalader.", readingMnemonicFr: "NOBORU - 'En haut!' on monte.", levelId: 32 },
  { character: "降", meaningsFr: ["Descendre", "Tomber"], readingsOn: ["コウ"], readingsKun: ["お-りる", "ふ-る"], meaningMnemonicFr: "Une colline (阝) d'où l'on descend - DESCENDRE. Descendre du métro, la pluie qui tombe.", readingMnemonicFr: "ORIRU - 'En bas!' on descend.", levelId: 32 },
  { character: "渡", meaningsFr: ["Traverser", "Remettre"], readingsOn: ["ト"], readingsKun: ["わた-る", "わた-す"], meaningMnemonicFr: "L'eau (氵) qu'on traverse avec mesure (度) - TRAVERSER. Traverser la Seine sur le Pont des Arts.", readingMnemonicFr: "WATARU - 'Je traverse!' d'une rive à l'autre.", levelId: 32 },

  // Level 33 - Nature
  { character: "花", meaningsFr: ["Fleur"], readingsOn: ["カ"], readingsKun: ["はな"], meaningMnemonicFr: "Une plante (艹) qui se transforme (化) - la FLEUR. Les cerisiers en fleurs, les jardins de Giverny.", readingMnemonicFr: "HANA - la fleur qui 'enchante'.", levelId: 33 },
  { character: "葉", meaningsFr: ["Feuille"], readingsOn: ["ヨウ"], readingsKun: ["は"], meaningMnemonicFr: "Une plante (艹) avec du monde (世) et un arbre (木) - la FEUILLE. Les feuilles mortes de Prévert.", readingMnemonicFr: "HA - la feuille qui 'danse' au vent.", levelId: 33 },
  { character: "根", meaningsFr: ["Racine", "Base"], readingsOn: ["コン"], readingsKun: ["ね"], meaningMnemonicFr: "Un arbre (木) avec ce qui reste (艮) - la RACINE. Les racines profondes du chêne centenaire.", readingMnemonicFr: "NE - les racines qui 'nourrissent'.", levelId: 33 },

  // Level 34 - Materials
  { character: "石", meaningsFr: ["Pierre", "Roche"], readingsOn: ["セキ", "シャク"], readingsKun: ["いし"], meaningMnemonicFr: "La falaise (厂) avec une bouche de grotte (口) - la PIERRE. Les pavés de Paris, les pierres de Versailles.", readingMnemonicFr: "ISHI - la pierre qui 'dure'.", levelId: 34 },
  { character: "鉄", meaningsFr: ["Fer", "Chemin de fer"], readingsOn: ["テツ"], readingsKun: [], meaningMnemonicFr: "Du métal (金) qui perd (失) son éclat avec le temps - le FER. La Tour Eiffel en fer forgé.", readingMnemonicFr: "TETSU - le fer qui 'résiste'.", levelId: 34 },
  { character: "布", meaningsFr: ["Tissu", "Étendre"], readingsOn: ["フ"], readingsKun: ["ぬの"], meaningMnemonicFr: "Du lin (巾) étalé avec une main (父) - le TISSU. Les soieries de Lyon, les étoffes précieuses.", readingMnemonicFr: "NUNO - le tissu qui 'habille'.", levelId: 34 },

  // Level 35 - Food
  { character: "飯", meaningsFr: ["Riz cuit", "Repas"], readingsOn: ["ハン"], readingsKun: ["めし"], meaningMnemonicFr: "De la nourriture (食) à l'inverse (反) de la faim - le RIZ. Le bol de riz fumant, le réconfort du repas.", readingMnemonicFr: "MESHI - 'Miam!' le repas est servi.", levelId: 35 },
  { character: "肉", meaningsFr: ["Viande", "Chair"], readingsOn: ["ニク"], readingsKun: [], meaningMnemonicFr: "L'intérieur du corps, la VIANDE. Le steak-frites parisien, le bœuf bourguignon mijotant.", readingMnemonicFr: "NIKU - la viande qui 'nourrit'.", levelId: 35 },
  { character: "魚", meaningsFr: ["Poisson"], readingsOn: ["ギョ"], readingsKun: ["うお", "さかな"], meaningMnemonicFr: "Le feu (灬) sous le poisson frais - le POISSON. La criée du marché, le sashimi fondant.", readingMnemonicFr: "SAKANA - le poisson qui 'nage'.", levelId: 35 },
];

async function main() {
  console.log("Seeding additional kanji (part 3 - levels 21-35)...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonicFr,
        readingMnemonicFr: kanji.readingMnemonicFr,
        levelId: kanji.levelId,
      },
      create: kanji,
    });
  }

  console.log(`Seeded ${kanjiData.length} additional kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
