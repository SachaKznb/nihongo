import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface ExampleSentence {
  japanese: string;
  french: string;
}

interface GrammarPointData {
  slug: string;
  titleJp: string;
  titleFr: string;
  meaningFr: string;
  formation: string;
  formationNotes?: string;
  exampleSentences: ExampleSentence[];
  nuancesFr?: string;
  mnemonicFr: string;
  jlptLevel: number;
  levelId: number;
  order: number;
}

const n5GrammarPoints: GrammarPointData[] = [
  // ============================================
  // LEVEL 1 - Absolute Basics
  // ============================================
  {
    slug: "desu",
    titleJp: "～です",
    titleFr: "Copule polie (etre)",
    meaningFr: "Equivalent poli de 'etre' en japonais. Utilise pour affirmer ou identifier quelque chose. C'est la forme polie de base qui termine la plupart des phrases en japonais formel.",
    formation: "Nom + です\nAdjectif-na + です",
    formationNotes: "です ne se conjugue pas avec les adjectifs en い (on utilise directement l'adjectif).",
    exampleSentences: [
      { japanese: "これは本です。", french: "Ceci est un livre." },
      { japanese: "私は学生です。", french: "Je suis etudiant." },
      { japanese: "田中さんは先生です。", french: "M. Tanaka est professeur." }
    ],
    nuancesFr: "です est neutre et poli. A l'oral decontracte, on peut l'omettre ou utiliser だ (masculin/informel).",
    mnemonicFr: "Pense a 'DES-sus' : quand tu poses quelque chose DES-sus la table, tu dis ce que c'EST. です = c'est !",
    jlptLevel: 5,
    levelId: 1,
    order: 1
  },
  {
    slug: "masu",
    titleJp: "～ます",
    titleFr: "Terminaison verbale polie",
    meaningFr: "Terminaison polie pour les verbes au present/futur affirmatif. C'est la forme de base pour parler poliment en japonais.",
    formation: "Radical du verbe + ます\n\nGroupe 1 (godan): Changer la derniere syllabe en -i + ます\n   例: 書く → 書きます\nGroupe 2 (ichidan): Retirer る + ます\n   例: 食べる → 食べます\nGroupe 3 (irreguliers): する → します, 来る → 来ます",
    exampleSentences: [
      { japanese: "毎日日本語を勉強します。", french: "J'etudie le japonais tous les jours." },
      { japanese: "明日東京に行きます。", french: "J'irai a Tokyo demain." },
      { japanese: "朝ご飯を食べます。", french: "Je mange le petit-dejeuner." }
    ],
    nuancesFr: "ます indique le present habituel ou le futur. Le contexte determine le temps.",
    mnemonicFr: "MASS-e ! Quand tu fais quelque chose, tu mets de la MASSE dans l'action. ます = tu FAIS quelque chose poliment !",
    jlptLevel: 5,
    levelId: 1,
    order: 2
  },
  {
    slug: "wa-particle",
    titleJp: "は (particule)",
    titleFr: "Particule de theme",
    meaningFr: "Marque le theme ou le sujet dont on parle. は indique 'en ce qui concerne X' ou 'quant a X'. C'est different du sujet grammatical (が).",
    formation: "Nom/Pronom + は + commentaire",
    formationNotes: "Se prononce 'wa' et non 'ha' quand utilise comme particule.",
    exampleSentences: [
      { japanese: "私は日本人です。", french: "Moi, je suis japonais." },
      { japanese: "今日は暑いです。", french: "Aujourd'hui, il fait chaud." },
      { japanese: "猫は可愛いです。", french: "Les chats, c'est mignon." }
    ],
    nuancesFr: "は met l'accent sur ce qui suit (le commentaire), tandis que が met l'accent sur ce qui precede (le sujet). は peut aussi marquer un contraste implicite.",
    mnemonicFr: "WA comme 'What about...?' (Et concernant...?). は pose le theme : 'Et concernant MOI, je suis...'",
    jlptLevel: 5,
    levelId: 1,
    order: 3
  },
  {
    slug: "ka-particle",
    titleJp: "か (particule)",
    titleFr: "Particule interrogative",
    meaningFr: "Transforme une phrase affirmative en question. Equivalent du point d'interrogation en francais, mais obligatoire a l'oral.",
    formation: "Phrase + か",
    exampleSentences: [
      { japanese: "これは何ですか。", french: "Qu'est-ce que c'est ?" },
      { japanese: "日本語を話しますか。", french: "Parlez-vous japonais ?" },
      { japanese: "お元気ですか。", french: "Comment allez-vous ?" }
    ],
    nuancesFr: "L'intonation monte naturellement avec か. A l'ecrit informel, on peut omettre か et utiliser juste ?",
    mnemonicFr: "KA comme 'Quoi ?' - tu poses une question, KA ? Tu vois KA marche !",
    jlptLevel: 5,
    levelId: 1,
    order: 4
  },

  // ============================================
  // LEVEL 2 - Basic Particles
  // ============================================
  {
    slug: "ga-particle",
    titleJp: "が (particule)",
    titleFr: "Particule de sujet",
    meaningFr: "Marque le sujet grammatical de la phrase, souvent pour introduire une nouvelle information ou mettre l'emphase sur le sujet.",
    formation: "Nom + が + predicat",
    exampleSentences: [
      { japanese: "猫がいます。", french: "Il y a un chat." },
      { japanese: "誰が来ましたか。", french: "Qui est venu ?" },
      { japanese: "水が欲しいです。", french: "Je veux de l'eau." }
    ],
    nuancesFr: "が introduit souvent une nouvelle information, tandis que は reprend un sujet connu. Avec les questions en 誰/何, on utilise が car la reponse est inconnue.",
    mnemonicFr: "GA comme 'Aha!' quand tu decouvres quelque chose de nouveau. が introduit ce qui est NOUVEAU !",
    jlptLevel: 5,
    levelId: 2,
    order: 1
  },
  {
    slug: "wo-particle",
    titleJp: "を (particule)",
    titleFr: "Particule d'objet direct",
    meaningFr: "Marque l'objet direct d'un verbe transitif. Indique ce qui subit l'action du verbe.",
    formation: "Nom + を + verbe transitif",
    formationNotes: "Se prononce 'o' et non 'wo' dans le japonais moderne.",
    exampleSentences: [
      { japanese: "りんごを食べます。", french: "Je mange une pomme." },
      { japanese: "本を読みます。", french: "Je lis un livre." },
      { japanese: "日本語を勉強します。", french: "J'etudie le japonais." }
    ],
    nuancesFr: "Certains verbes de deplacement utilisent aussi を pour marquer le lieu traverse (道を歩く = marcher dans la rue).",
    mnemonicFr: "を ressemble a un plat qu'on mange ! L'OBJET qu'on mange, lit, regarde... passe par を.",
    jlptLevel: 5,
    levelId: 2,
    order: 2
  },
  {
    slug: "ni-particle-location",
    titleJp: "に (lieu/temps)",
    titleFr: "Particule de lieu/temps",
    meaningFr: "Indique le lieu ou quelque chose existe, la destination d'un mouvement, ou un moment precis dans le temps.",
    formation: "Lieu + に + いる/ある (existence)\nDestination + に + 行く/来る (mouvement)\nTemps + に + verbe (moment precis)",
    exampleSentences: [
      { japanese: "東京に住んでいます。", french: "J'habite a Tokyo." },
      { japanese: "学校に行きます。", french: "Je vais a l'ecole." },
      { japanese: "七時に起きます。", french: "Je me leve a 7 heures." }
    ],
    nuancesFr: "に indique un point precis (lieu ou temps), contrairement a で qui indique le lieu d'une action.",
    mnemonicFr: "NI comme 'nid' - le nid est la ou l'oiseau SE TROUVE ou VA. に = point d'arrivee ou de presence.",
    jlptLevel: 5,
    levelId: 2,
    order: 3
  },
  {
    slug: "de-particle",
    titleJp: "で (particule)",
    titleFr: "Particule de moyen/lieu d'action",
    meaningFr: "Indique le lieu ou une action se deroule, le moyen/instrument utilise, ou la cause.",
    formation: "Lieu + で + verbe d'action\nMoyen/Instrument + で + verbe\nCause + で",
    exampleSentences: [
      { japanese: "図書館で勉強します。", french: "J'etudie a la bibliotheque." },
      { japanese: "箸で食べます。", french: "Je mange avec des baguettes." },
      { japanese: "バスで行きます。", french: "J'y vais en bus." }
    ],
    nuancesFr: "で implique une action active dans un lieu, tandis que に implique une presence statique.",
    mnemonicFr: "DE comme 'dans' + action. Tu fais quelque chose DANS un lieu, AVEC un outil = で !",
    jlptLevel: 5,
    levelId: 2,
    order: 4
  },
  {
    slug: "e-particle",
    titleJp: "へ (particule)",
    titleFr: "Particule de direction",
    meaningFr: "Indique la direction vers laquelle on se dirige. Plus vague que に, met l'accent sur la direction plutot que la destination precise.",
    formation: "Direction + へ + verbe de mouvement",
    formationNotes: "Se prononce 'e' et non 'he' quand utilise comme particule.",
    exampleSentences: [
      { japanese: "日本へ行きます。", french: "Je vais au Japon." },
      { japanese: "東へ進みます。", french: "J'avance vers l'est." },
      { japanese: "家へ帰ります。", french: "Je rentre a la maison." }
    ],
    nuancesFr: "へ et に sont souvent interchangeables pour la destination, mais へ est plus poetique et met l'accent sur le voyage.",
    mnemonicFr: "へ ressemble a une fleche qui pointe vers la droite → ! へ = VERS quelque part.",
    jlptLevel: 5,
    levelId: 2,
    order: 5
  },

  // ============================================
  // LEVEL 3 - Negation & Basic Adjectives
  // ============================================
  {
    slug: "masen",
    titleJp: "～ません",
    titleFr: "Negation polie des verbes",
    meaningFr: "Forme negative polie des verbes au present/futur. Equivalent de 'ne... pas' pour les verbes en forme polie.",
    formation: "Radical du verbe + ません\n\nGroupe 1: 書く → 書きません\nGroupe 2: 食べる → 食べません\nGroupe 3: する → しません, 来る → 来ません",
    exampleSentences: [
      { japanese: "肉を食べません。", french: "Je ne mange pas de viande." },
      { japanese: "日本語が分かりません。", french: "Je ne comprends pas le japonais." },
      { japanese: "明日は来ません。", french: "Je ne viendrai pas demain." }
    ],
    mnemonicFr: "MA-SEN comme 'Ma scène' est VIDE - il ne se passe RIEN. ません = NEGATION polie !",
    jlptLevel: 5,
    levelId: 3,
    order: 1
  },
  {
    slug: "janai-desu",
    titleJp: "～じゃないです",
    titleFr: "Negation polie de です",
    meaningFr: "Forme negative de です. Signifie 'n'est pas' ou 'ne suis pas'.",
    formation: "Nom + じゃないです\nAdjectif-na + じゃないです\n\nForme plus formelle: ではありません",
    exampleSentences: [
      { japanese: "これは私のじゃないです。", french: "Ce n'est pas le mien." },
      { japanese: "学生じゃないです。", french: "Je ne suis pas etudiant." },
      { japanese: "静かじゃないです。", french: "Ce n'est pas calme." }
    ],
    nuancesFr: "じゃないです est semi-formel. ではありません est plus formel. じゃない seul est informel.",
    mnemonicFr: "JA-NAI = 'Ja, nicht!' (allemand pour 'non, pas ca!'). じゃない = ce n'est PAS ca !",
    jlptLevel: 5,
    levelId: 3,
    order: 2
  },
  {
    slug: "i-adjectives",
    titleJp: "い形容詞",
    titleFr: "Adjectifs en い",
    meaningFr: "Adjectifs qui se terminent en い. Ils se conjuguent directement sans です au present affirmatif informel.",
    formation: "Adjectif-い + です (poli affirmatif)\nAdjectif sans い + くない (negatif)\nAdjectif sans い + かった (passe)\nAdjectif sans い + くなかった (passe negatif)",
    exampleSentences: [
      { japanese: "この本は面白いです。", french: "Ce livre est interessant." },
      { japanese: "今日は寒くないです。", french: "Il ne fait pas froid aujourd'hui." },
      { japanese: "映画は長かったです。", french: "Le film etait long." }
    ],
    nuancesFr: "Attention : いい (bon) devient よくない, よかった en conjugaison !",
    mnemonicFr: "Les adjectifs en い sont INDEPENDANTS - ils se conjuguent tout seuls comme des grands !",
    jlptLevel: 5,
    levelId: 3,
    order: 3
  },
  {
    slug: "na-adjectives",
    titleJp: "な形容詞",
    titleFr: "Adjectifs en な",
    meaningFr: "Adjectifs qui necessitent な pour modifier un nom. Ils se conjuguent avec です et ses formes.",
    formation: "Adjectif-na + です (poli affirmatif)\nAdjectif-na + じゃない (negatif)\nAdjectif-na + だった (passe)\nAdjectif-na + じゃなかった (passe negatif)\nAdjectif-na + な + nom (modification)",
    exampleSentences: [
      { japanese: "彼女は綺麗です。", french: "Elle est belle." },
      { japanese: "日本語は簡単じゃないです。", french: "Le japonais n'est pas facile." },
      { japanese: "静かな部屋が好きです。", french: "J'aime les chambres calmes." }
    ],
    nuancesFr: "Certains mots comme 好き, 嫌い, 上手, 下手 sont des adjectifs en な, pas des verbes !",
    mnemonicFr: "NA-cessitent な ! Ces adjectifs ont besoin d'aide (な ou です) pour fonctionner.",
    jlptLevel: 5,
    levelId: 3,
    order: 4
  },
  {
    slug: "no-particle",
    titleJp: "の (particule)",
    titleFr: "Particule de possession/lien",
    meaningFr: "Indique la possession ou une relation entre deux noms. Equivalent de 'de' en francais.",
    formation: "Nom A + の + Nom B = le B de A",
    exampleSentences: [
      { japanese: "私の本です。", french: "C'est mon livre." },
      { japanese: "日本の車は有名です。", french: "Les voitures japonaises sont celebres." },
      { japanese: "友達の友達です。", french: "C'est l'ami de mon ami." }
    ],
    nuancesFr: "の peut remplacer un nom deja mentionne : 'Quel livre ?' 'Le mien' = 私の.",
    mnemonicFr: "NO comme 'gnome' qui possede ses tresors. の = possession, relation, appartenance !",
    jlptLevel: 5,
    levelId: 3,
    order: 5
  },

  // ============================================
  // LEVEL 4 - Past Tense & て-form Introduction
  // ============================================
  {
    slug: "mashita",
    titleJp: "～ました",
    titleFr: "Passe poli des verbes",
    meaningFr: "Forme passee polie des verbes. Indique qu'une action a ete completee dans le passe.",
    formation: "Radical du verbe + ました\n\nGroupe 1: 書く → 書きました\nGroupe 2: 食べる → 食べました\nGroupe 3: する → しました, 来る → 来ました",
    exampleSentences: [
      { japanese: "昨日映画を見ました。", french: "J'ai regarde un film hier." },
      { japanese: "朝ご飯を食べました。", french: "J'ai mange le petit-dejeuner." },
      { japanese: "日本に行きました。", french: "Je suis alle au Japon." }
    ],
    mnemonicFr: "MASHI-TA comme 'Mache, ta!' - tu as MACHE (accompli) cette action dans le PASSE !",
    jlptLevel: 5,
    levelId: 4,
    order: 1
  },
  {
    slug: "masen-deshita",
    titleJp: "～ませんでした",
    titleFr: "Passe negatif poli",
    meaningFr: "Forme passee negative polie des verbes. Indique qu'une action n'a pas eu lieu dans le passe.",
    formation: "Radical du verbe + ませんでした",
    exampleSentences: [
      { japanese: "昨日学校に行きませんでした。", french: "Je ne suis pas alle a l'ecole hier." },
      { japanese: "何も食べませんでした。", french: "Je n'ai rien mange." },
      { japanese: "彼は来ませんでした。", french: "Il n'est pas venu." }
    ],
    mnemonicFr: "C'est ません + でした : la negation au passe. Comme dire 'ca ne s'est PAS passe !'",
    jlptLevel: 5,
    levelId: 4,
    order: 2
  },
  {
    slug: "deshita",
    titleJp: "～でした",
    titleFr: "Passe de です",
    meaningFr: "Forme passee de です. Signifie 'etait' ou 'a ete'.",
    formation: "Nom/Adjectif-na + でした",
    exampleSentences: [
      { japanese: "昨日は日曜日でした。", french: "Hier, c'etait dimanche." },
      { japanese: "テストは簡単でした。", french: "L'examen etait facile." },
      { japanese: "彼女は学生でした。", french: "Elle etait etudiante." }
    ],
    mnemonicFr: "でした = です + た (passe). C'ETAIT comme ca avant !",
    jlptLevel: 5,
    levelId: 4,
    order: 3
  },
  {
    slug: "te-form-intro",
    titleJp: "て形 (introduction)",
    titleFr: "Forme en て (base)",
    meaningFr: "Forme connective des verbes. Sert a enchainer des actions, faire des demandes, ou former des constructions grammaticales.",
    formation: "Groupe 1 (godan):\n  う/つ/る → って (買う→買って)\n  む/ぶ/ぬ → んで (読む→読んで)\n  く → いて (書く→書いて) *exception: 行く→行って\n  ぐ → いで (泳ぐ→泳いで)\n  す → して (話す→話して)\n\nGroupe 2 (ichidan): る → て (食べる→食べて)\n\nGroupe 3: する→して, 来る→来て",
    exampleSentences: [
      { japanese: "朝起きて、顔を洗います。", french: "Je me leve le matin et je me lave le visage." },
      { japanese: "ここに座ってください。", french: "Asseyez-vous ici, s'il vous plait." },
      { japanese: "本を読んで勉強します。", french: "J'etudie en lisant des livres." }
    ],
    nuancesFr: "La forme en て est ESSENTIELLE. Elle permet de construire de nombreuses structures grammaticales.",
    mnemonicFr: "TE comme 'et' ! La forme en て connecte les actions : 'je fais X ET je fais Y'.",
    jlptLevel: 5,
    levelId: 4,
    order: 4
  },

  // ============================================
  // LEVEL 5 - て-form Applications
  // ============================================
  {
    slug: "te-kudasai",
    titleJp: "～てください",
    titleFr: "Demande polie",
    meaningFr: "Forme polie pour demander a quelqu'un de faire quelque chose. Equivalent de 's'il vous plait + verbe'.",
    formation: "Verbe forme-て + ください",
    exampleSentences: [
      { japanese: "ちょっと待ってください。", french: "Attendez un moment, s'il vous plait." },
      { japanese: "名前を書いてください。", french: "Ecrivez votre nom, s'il vous plait." },
      { japanese: "ゆっくり話してください。", french: "Parlez lentement, s'il vous plait." }
    ],
    nuancesFr: "Plus poli que la forme imperative. Pour etre encore plus poli, ajouter お devant : お待ちください.",
    mnemonicFr: "KUDASAI = 'donnez-moi' cette action ! て + ください = 'faites cela pour moi SVP'",
    jlptLevel: 5,
    levelId: 5,
    order: 1
  },
  {
    slug: "te-iru",
    titleJp: "～ている",
    titleFr: "Action en cours/etat",
    meaningFr: "Indique une action en cours (progressif) ou un etat resultant d'une action passee.",
    formation: "Verbe forme-て + いる/います",
    exampleSentences: [
      { japanese: "今、本を読んでいます。", french: "Je suis en train de lire un livre." },
      { japanese: "東京に住んでいます。", french: "J'habite a Tokyo." },
      { japanese: "結婚しています。", french: "Je suis marie(e)." }
    ],
    nuancesFr: "Certains verbes (住む, 知る, 結婚する) utilisent ている pour exprimer un etat plutot qu'une action en cours.",
    mnemonicFr: "て + IRU (etre) = tu ES en train de faire. L'action EST la, maintenant, en cours !",
    jlptLevel: 5,
    levelId: 5,
    order: 2
  },
  {
    slug: "tai",
    titleJp: "～たい",
    titleFr: "Vouloir faire",
    meaningFr: "Exprime le desir de faire quelque chose. S'utilise uniquement pour exprimer ses propres desirs.",
    formation: "Radical du verbe + たい\n\nGroupe 1: 書く → 書きたい\nGroupe 2: 食べる → 食べたい\nGroupe 3: する → したい, 来る → 来たい",
    formationNotes: "たい se conjugue comme un adjectif en い : たくない, たかった, たくなかった",
    exampleSentences: [
      { japanese: "日本に行きたいです。", french: "Je veux aller au Japon." },
      { japanese: "寿司を食べたいです。", french: "Je veux manger des sushis." },
      { japanese: "もっと勉強したいです。", french: "Je veux etudier davantage." }
    ],
    nuancesFr: "Pour les desirs des autres, on utilise たがっている. たい est personnel et direct.",
    mnemonicFr: "TAI comme 'Thai food' que tu veux manger ! たい = 'je VEUX faire ca !'",
    jlptLevel: 5,
    levelId: 5,
    order: 3
  },
  {
    slug: "te-mo-ii",
    titleJp: "～てもいい",
    titleFr: "Permission",
    meaningFr: "Demander ou donner la permission de faire quelque chose. Equivalent de 'peut-on...?' ou 'c'est OK de...'.",
    formation: "Verbe forme-て + もいい(ですか)",
    exampleSentences: [
      { japanese: "ここで写真を撮ってもいいですか。", french: "Puis-je prendre des photos ici ?" },
      { japanese: "入ってもいいですよ。", french: "Vous pouvez entrer." },
      { japanese: "帰ってもいいですか。", french: "Puis-je rentrer ?" }
    ],
    nuancesFr: "Pour refuser poliment : ～てはいけません ou ～ないでください.",
    mnemonicFr: "て + MO II = 'c'est aussi (も) bien (いい)' de faire ca. Permission accordee !",
    jlptLevel: 5,
    levelId: 5,
    order: 4
  },

  // ============================================
  // LEVEL 6 - Conjunctions & Reasons
  // ============================================
  {
    slug: "kara-reason",
    titleJp: "から (raison)",
    titleFr: "Parce que",
    meaningFr: "Exprime la cause ou la raison. La cause vient AVANT から.",
    formation: "Phrase (forme polie/familiere) + から + consequence\nNom + だから (familier) / ですから (poli)",
    exampleSentences: [
      { japanese: "暑いですから、窓を開けてください。", french: "Il fait chaud, donc ouvrez la fenetre s'il vous plait." },
      { japanese: "疲れたから、早く寝ます。", french: "Parce que je suis fatigue, je vais me coucher tot." },
      { japanese: "明日は休みだから、遊びに行きます。", french: "Comme demain est un jour de conge, je vais m'amuser." }
    ],
    nuancesFr: "から est direct et affirmatif. Pour une raison plus douce/polie, utilisez ので.",
    mnemonicFr: "KARA comme 'car' en francais ! C'est parce que... CAR... = から !",
    jlptLevel: 5,
    levelId: 6,
    order: 1
  },
  {
    slug: "node",
    titleJp: "ので",
    titleFr: "Comme/Etant donne que",
    meaningFr: "Exprime la cause ou la raison de maniere plus douce et polie que から. Souvent utilise pour des excuses ou des explications.",
    formation: "Verbe/Adj-い + ので\nAdj-na + なので\nNom + なので",
    exampleSentences: [
      { japanese: "電車が遅れたので、遅刻しました。", french: "Comme le train etait en retard, je suis arrive en retard." },
      { japanese: "病気なので、今日は休みます。", french: "Etant malade, je me repose aujourd'hui." },
      { japanese: "高いので、買いませんでした。", french: "Comme c'etait cher, je ne l'ai pas achete." }
    ],
    nuancesFr: "ので sonne plus objectif et moins accablant que から. Prefere pour les excuses polies.",
    mnemonicFr: "NO-DE comme 'note de service' qui explique poliment pourquoi. ので = explication polie.",
    jlptLevel: 5,
    levelId: 6,
    order: 2
  },
  {
    slug: "kedo-but",
    titleJp: "けど/けれども",
    titleFr: "Mais/Cependant",
    meaningFr: "Connecte deux phrases avec une relation d'opposition ou de concession. Equivalent de 'mais' ou 'cependant'.",
    formation: "Phrase A + けど + Phrase B\n\nFormes: けど (familier) < けれど < けれども (formel) < が (le plus formel)",
    exampleSentences: [
      { japanese: "日本語は難しいけど、面白いです。", french: "Le japonais est difficile, mais interessant." },
      { japanese: "行きたいけど、時間がありません。", french: "Je veux y aller, mais je n'ai pas le temps." },
      { japanese: "高いけど、買います。", french: "C'est cher, mais je vais l'acheter." }
    ],
    nuancesFr: "けど peut aussi introduire un sujet de maniere douce : 'A propos de..., mais...'",
    mnemonicFr: "KEDO comme 'quedo' (je reste) mais je change d'avis ! けど = MAIS !",
    jlptLevel: 5,
    levelId: 6,
    order: 3
  },
  {
    slug: "ga-but",
    titleJp: "が (mais)",
    titleFr: "Mais (formel)",
    meaningFr: "Connecte deux phrases avec opposition. Plus formel que けど. Attention: different de la particule が du sujet !",
    formation: "Phrase A (forme polie) + が + Phrase B",
    exampleSentences: [
      { japanese: "すみませんが、もう一度言ってください。", french: "Excusez-moi, mais pourriez-vous repeter ?" },
      { japanese: "申し訳ありませんが、今日は営業しておりません。", french: "Nous sommes desoles, mais nous ne sommes pas ouverts aujourd'hui." },
      { japanese: "失礼ですが、お名前は？", french: "Excusez-moi, mais quel est votre nom ?" }
    ],
    nuancesFr: "が (conjonction) vient souvent apres une formule de politesse pour adoucir une demande ou un refus.",
    mnemonicFr: "GA formel = 'Gare a la politesse !' On utilise が quand on veut etre tres poli mais...",
    jlptLevel: 5,
    levelId: 6,
    order: 4
  },
  {
    slug: "te-kara",
    titleJp: "～てから",
    titleFr: "Apres avoir fait",
    meaningFr: "Indique qu'une action se fait apres une autre. L'action en て doit etre completee avant.",
    formation: "Verbe forme-て + から + action suivante",
    exampleSentences: [
      { japanese: "ご飯を食べてから、勉強します。", french: "Apres avoir mange, j'etudierai." },
      { japanese: "シャワーを浴びてから、寝ます。", french: "Apres avoir pris une douche, je me couche." },
      { japanese: "日本に来てから、三年になります。", french: "Ca fait trois ans que je suis arrive au Japon." }
    ],
    nuancesFr: "てから implique que la premiere action doit etre terminee. Different de simplement enchainer avec て.",
    mnemonicFr: "て + KARA = apres (から) avoir fait (て). La sequence est claire !",
    jlptLevel: 5,
    levelId: 6,
    order: 5
  },

  // ============================================
  // LEVEL 7 - Opinions & Abilities
  // ============================================
  {
    slug: "to-omou",
    titleJp: "と思う",
    titleFr: "Je pense que",
    meaningFr: "Exprime une opinion ou une pensee personnelle. Utilise pour donner son avis de maniere moins directe.",
    formation: "Phrase (forme familiere) + と思う/と思います",
    exampleSentences: [
      { japanese: "明日は雨だと思います。", french: "Je pense qu'il pleuvra demain." },
      { japanese: "この映画は面白いと思います。", french: "Je pense que ce film est interessant." },
      { japanese: "彼は来ないと思います。", french: "Je pense qu'il ne viendra pas." }
    ],
    nuancesFr: "Pour rapporter les pensees des autres : と思っている. Pour 'j'ai decide de' : と思う avec une action future.",
    mnemonicFr: "TO OMOU = 'to au mot' - tu mets tes PENSEES en mots avec と思う !",
    jlptLevel: 5,
    levelId: 7,
    order: 1
  },
  {
    slug: "koto-ga-dekiru",
    titleJp: "ことができる",
    titleFr: "Pouvoir/Etre capable de",
    meaningFr: "Exprime la capacite ou la possibilite de faire quelque chose. Plus formel que la forme potentielle.",
    formation: "Verbe (forme dictionnaire) + ことができる/ができます",
    exampleSentences: [
      { japanese: "日本語を話すことができます。", french: "Je peux parler japonais." },
      { japanese: "ここで写真を撮ることができますか。", french: "Peut-on prendre des photos ici ?" },
      { japanese: "漢字を読むことができません。", french: "Je ne peux pas lire les kanji." }
    ],
    nuancesFr: "ことができる est plus formel et met l'accent sur la capacite. La forme potentielle (～られる/～える) est plus naturelle a l'oral.",
    mnemonicFr: "KOTO GA DEKIRU = 'cette CHOSE (こと) peut SORTIR (出来る)'. Tu peux FAIRE sortir cette capacite !",
    jlptLevel: 5,
    levelId: 7,
    order: 2
  },
  {
    slug: "deshou",
    titleJp: "でしょう",
    titleFr: "Probablement/N'est-ce pas",
    meaningFr: "Exprime une supposition, une probabilite, ou cherche confirmation. Plus doux que です pour les affirmations incertaines.",
    formation: "Verbe/Adj (forme familiere) + でしょう\nNom + でしょう",
    exampleSentences: [
      { japanese: "明日は晴れるでしょう。", french: "Il fera probablement beau demain." },
      { japanese: "この本は面白いでしょう？", french: "Ce livre est interessant, n'est-ce pas ?" },
      { japanese: "彼は学生でしょう。", french: "Il est probablement etudiant." }
    ],
    nuancesFr: "Avec intonation montante = demande de confirmation. Avec intonation descendante = supposition.",
    mnemonicFr: "DESHOU sonne comme 'dis-donc' + 'show' (montre). Tu MONTRES ton incertitude polie !",
    jlptLevel: 5,
    levelId: 7,
    order: 3
  },
  {
    slug: "hou-ga-ii",
    titleJp: "～ほうがいい",
    titleFr: "Il vaut mieux",
    meaningFr: "Donne un conseil ou une recommandation. Indique qu'une option est meilleure qu'une autre.",
    formation: "Verbe (forme た) + ほうがいい (conseil fort)\nVerbe (forme dictionnaire) + ほうがいい (conseil general)\nVerbe ない-forme + ほうがいい (conseil negatif)",
    exampleSentences: [
      { japanese: "早く寝たほうがいいですよ。", french: "Tu ferais mieux de te coucher tot." },
      { japanese: "薬を飲んだほうがいいです。", french: "Tu devrais prendre des medicaments." },
      { japanese: "あまり食べないほうがいいです。", french: "Tu ferais mieux de ne pas trop manger." }
    ],
    nuancesFr: "Avec た, le conseil est plus fort et urgent. Avec la forme dictionnaire, c'est plus general.",
    mnemonicFr: "HOU GA II = 'cette direction (方) est bonne (いい)'. C'est le MEILLEUR chemin !",
    jlptLevel: 5,
    levelId: 7,
    order: 4
  },

  // ============================================
  // LEVEL 8 - Experiences & Intentions
  // ============================================
  {
    slug: "ta-koto-ga-aru",
    titleJp: "～たことがある",
    titleFr: "Avoir deja fait",
    meaningFr: "Exprime une experience passee. Indique qu'on a deja fait quelque chose au moins une fois dans sa vie.",
    formation: "Verbe (forme た) + ことがある/ことがあります",
    exampleSentences: [
      { japanese: "日本に行ったことがあります。", french: "Je suis deja alle au Japon." },
      { japanese: "納豆を食べたことがありますか。", french: "Avez-vous deja mange du natto ?" },
      { japanese: "富士山を見たことがありません。", french: "Je n'ai jamais vu le Mont Fuji." }
    ],
    nuancesFr: "Focus sur l'EXPERIENCE, pas sur le moment precis. Pour les experiences frequentes, on peut dire 何度もある.",
    mnemonicFr: "TA KOTO GA ARU = 'avoir (ある) le fait (こと) de l'avoir fait (た)'. J'AI cette experience !",
    jlptLevel: 5,
    levelId: 8,
    order: 1
  },
  {
    slug: "tsumori",
    titleJp: "～つもり",
    titleFr: "Avoir l'intention de",
    meaningFr: "Exprime une intention ou un plan ferme pour le futur. Plus determine que たい (vouloir).",
    formation: "Verbe (forme dictionnaire) + つもりです\nVerbe (forme ない) + つもりです (intention de ne pas faire)",
    exampleSentences: [
      { japanese: "来年日本に行くつもりです。", french: "J'ai l'intention d'aller au Japon l'annee prochaine." },
      { japanese: "大学で日本語を勉強するつもりです。", french: "J'ai l'intention d'etudier le japonais a l'universite." },
      { japanese: "明日は出かけないつもりです。", french: "Je n'ai pas l'intention de sortir demain." }
    ],
    nuancesFr: "つもり implique une decision prise. Pour les plans moins certains, utilisez 予定 (yotei).",
    mnemonicFr: "TSUMORI comme 'je te SORS ma resolution !' Mon intention est FERME !",
    jlptLevel: 5,
    levelId: 8,
    order: 2
  },
  {
    slug: "mae-ni",
    titleJp: "～前に",
    titleFr: "Avant de",
    meaningFr: "Indique qu'une action se fait avant une autre. L'action en 前に n'est pas encore realisee.",
    formation: "Verbe (forme dictionnaire) + 前に\nNom + の前に",
    exampleSentences: [
      { japanese: "寝る前に、歯を磨きます。", french: "Avant de dormir, je me brosse les dents." },
      { japanese: "食事の前に、手を洗ってください。", french: "Lavez-vous les mains avant le repas." },
      { japanese: "日本に来る前に、日本語を勉強しました。", french: "J'ai etudie le japonais avant de venir au Japon." }
    ],
    nuancesFr: "Avec un verbe, on utilise la forme dictionnaire meme si l'action globale est au passe.",
    mnemonicFr: "MAE = devant/avant. NI = marqueur de temps. 前に = AVANT ce moment !",
    jlptLevel: 5,
    levelId: 8,
    order: 3
  },
  {
    slug: "ato-de",
    titleJp: "～後で",
    titleFr: "Apres",
    meaningFr: "Indique qu'une action se fait apres une autre. Moins strict que てから sur l'ordre.",
    formation: "Verbe (forme た) + 後で\nNom + の後で",
    exampleSentences: [
      { japanese: "仕事の後で、飲みに行きましょう。", french: "Apres le travail, allons boire un verre." },
      { japanese: "食べた後で、散歩します。", french: "Apres avoir mange, je me promene." },
      { japanese: "授業の後で、質問してください。", french: "Posez vos questions apres le cours." }
    ],
    nuancesFr: "後で est plus flexible que てから. Il peut y avoir un intervalle entre les deux actions.",
    mnemonicFr: "ATO = apres. DE = marqueur. 後で = APRES ca, on fait autre chose !",
    jlptLevel: 5,
    levelId: 8,
    order: 4
  },

  // ============================================
  // LEVEL 9 - Comparisons & Conditions
  // ============================================
  {
    slug: "yori",
    titleJp: "より",
    titleFr: "Plus que/Comparaison",
    meaningFr: "Utilisé pour comparer deux choses. L'element apres より est celui qui est 'moins'.",
    formation: "A は B より + adjectif (A est plus [adj] que B)\nB より A のほうが + adjectif (structure alternative)",
    exampleSentences: [
      { japanese: "日本語は英語より難しいです。", french: "Le japonais est plus difficile que l'anglais." },
      { japanese: "夏より冬のほうが好きです。", french: "Je prefere l'hiver a l'ete." },
      { japanese: "バスより電車のほうが速いです。", french: "Le train est plus rapide que le bus." }
    ],
    nuancesFr: "より indique le point de comparaison. ほうが met l'emphase sur le choix prefere.",
    mnemonicFr: "YORI comme 'your' en anglais. 'YOUR choice' est compare a l'autre !",
    jlptLevel: 5,
    levelId: 9,
    order: 1
  },
  {
    slug: "ichiban",
    titleJp: "一番",
    titleFr: "Le plus/Le meilleur",
    meaningFr: "Exprime le superlatif. Indique le degre le plus eleve dans une comparaison.",
    formation: "[Groupe] で/の中で + 一番 + adjectif",
    exampleSentences: [
      { japanese: "クラスで一番背が高いです。", french: "Il/Elle est le/la plus grand(e) de la classe." },
      { japanese: "日本で一番有名な山は富士山です。", french: "La montagne la plus celebre du Japon est le Mont Fuji." },
      { japanese: "何が一番好きですか。", french: "Qu'est-ce que vous aimez le plus ?" }
    ],
    nuancesFr: "一番 litteralement signifie 'numero un'. Il se place avant l'adjectif.",
    mnemonicFr: "ICHIBAN = 'un (一) rang (番)' = NUMERO UN = le MEILLEUR !",
    jlptLevel: 5,
    levelId: 9,
    order: 2
  },
  {
    slug: "toki",
    titleJp: "～とき",
    titleFr: "Quand/Lorsque",
    meaningFr: "Indique le moment ou une action se produit. Traduit 'quand' ou 'au moment ou'.",
    formation: "Verbe (forme dictionnaire/た) + とき\nAdjectif-い + とき\nAdjectif-na + なとき\nNom + のとき",
    exampleSentences: [
      { japanese: "日本に行くとき、カメラを買いました。", french: "Quand je suis alle au Japon, j'ai achete un appareil photo." },
      { japanese: "暇なとき、映画を見ます。", french: "Quand je suis libre, je regarde des films." },
      { japanese: "子供のとき、よく遊びました。", french: "Quand j'etais enfant, je jouais beaucoup." }
    ],
    nuancesFr: "Forme dictionnaire + とき = avant/pendant l'action. Forme た + とき = apres l'action ou etat accompli.",
    mnemonicFr: "TOKI comme 'Tokyo time' - a ce MOMENT, a cette HEURE, QUAND... !",
    jlptLevel: 5,
    levelId: 9,
    order: 3
  },
  {
    slug: "tara",
    titleJp: "～たら",
    titleFr: "Si/Quand (conditionnel)",
    meaningFr: "Exprime une condition ou une sequence temporelle. 'Si X arrive, alors Y' ou 'Quand X arrivera, Y'.",
    formation: "Verbe forme-た + ら\nAdjectif-い sans い + かったら\nAdjectif-na/Nom + だったら",
    exampleSentences: [
      { japanese: "雨が降ったら、家にいます。", french: "S'il pleut, je reste a la maison." },
      { japanese: "安かったら、買います。", french: "Si c'est bon marche, je l'achete." },
      { japanese: "日本に着いたら、電話してください。", french: "Quand vous arriverez au Japon, appelez-moi." }
    ],
    nuancesFr: "たら implique souvent une sequence naturelle ou une decouverte. Tres polyvalent en japonais.",
    mnemonicFr: "TA-RA comme 'ta-da!' - SI ca arrive, ALORS ta-da, voici le resultat !",
    jlptLevel: 5,
    levelId: 9,
    order: 4
  },

  // ============================================
  // LEVEL 10 - Advanced Basics
  // ============================================
  {
    slug: "to-conditional",
    titleJp: "と (conditionnel)",
    titleFr: "Si/Quand (naturel)",
    meaningFr: "Exprime une condition naturelle ou habituelle. 'Quand X, alors automatiquement Y'.",
    formation: "Verbe (forme dictionnaire) + と\nAdjectif-い + と\nAdjectif-na + だと\nNom + だと",
    exampleSentences: [
      { japanese: "春になると、桜が咲きます。", french: "Quand le printemps arrive, les cerisiers fleurissent." },
      { japanese: "このボタンを押すと、ドアが開きます。", french: "Si vous appuyez sur ce bouton, la porte s'ouvre." },
      { japanese: "右に曲がると、駅があります。", french: "Si vous tournez a droite, il y a la gare." }
    ],
    nuancesFr: "と implique une consequence naturelle ou automatique. Ne s'utilise pas pour les volontes ou suggestions.",
    mnemonicFr: "TO comme 'auto-matique' ! Quand A, ALORS B suit naturellement !",
    jlptLevel: 5,
    levelId: 10,
    order: 1
  },
  {
    slug: "noni",
    titleJp: "のに",
    titleFr: "Bien que/Malgre",
    meaningFr: "Exprime une contradiction ou un regret. 'Meme si X, Y (de maniere inattendue)'.",
    formation: "Verbe (forme familiere) + のに\nAdjectif-い + のに\nAdjectif-na + なのに\nNom + なのに",
    exampleSentences: [
      { japanese: "たくさん勉強したのに、テストに落ちました。", french: "Bien que j'aie beaucoup etudie, j'ai echoue au test." },
      { japanese: "高いのに、おいしくないです。", french: "C'est cher, pourtant ce n'est pas bon." },
      { japanese: "日曜日なのに、仕事があります。", french: "Bien que ce soit dimanche, j'ai du travail." }
    ],
    nuancesFr: "のに exprime souvent la frustration ou la deception. Plus emotionnel que けど.",
    mnemonicFr: "NO-NI comme 'non, non!' de frustration. MALGRE tout ca, ca n'a pas marche !",
    jlptLevel: 5,
    levelId: 10,
    order: 2
  },
  {
    slug: "nagara",
    titleJp: "～ながら",
    titleFr: "Tout en faisant",
    meaningFr: "Indique deux actions simultanees faites par la meme personne. L'action principale vient apres ながら.",
    formation: "Verbe radical (forme ます sans ます) + ながら + action principale",
    exampleSentences: [
      { japanese: "音楽を聴きながら、勉強します。", french: "J'etudie en ecoutant de la musique." },
      { japanese: "コーヒーを飲みながら、新聞を読みます。", french: "Je lis le journal en buvant du cafe." },
      { japanese: "歩きながら、電話しないでください。", french: "Ne telephonez pas en marchant." }
    ],
    nuancesFr: "Les deux actions doivent etre faites par la meme personne. L'action en ながら est secondaire.",
    mnemonicFr: "NAGARA comme 'long' - tu fais une action qui dure LONGTEMPS pendant l'autre !",
    jlptLevel: 5,
    levelId: 10,
    order: 3
  },
  {
    slug: "ni-naru",
    titleJp: "～になる",
    titleFr: "Devenir",
    meaningFr: "Exprime un changement d'etat ou de condition. 'Devenir X' ou 'se transformer en X'.",
    formation: "Nom + になる\nAdjectif-na + になる\nAdjectif-い sans い + くなる",
    exampleSentences: [
      { japanese: "医者になりたいです。", french: "Je veux devenir medecin." },
      { japanese: "日本語が上手になりました。", french: "Mon japonais est devenu bon." },
      { japanese: "寒くなりましたね。", french: "Il fait froid maintenant, n'est-ce pas ?" }
    ],
    nuancesFr: "になる implique un changement naturel ou progressif. Pour un changement volontaire, voir にする.",
    mnemonicFr: "NI NARU = 'tu deviens (なる) vers (に) cet etat'. Transformation en cours !",
    jlptLevel: 5,
    levelId: 10,
    order: 4
  },
  {
    slug: "ni-suru",
    titleJp: "～にする",
    titleFr: "Decider de/Faire en sorte",
    meaningFr: "Exprime une decision ou un choix actif. 'Decider de X' ou 'opter pour X'.",
    formation: "Nom + にする\nVerbe (forme dictionnaire) + ことにする",
    exampleSentences: [
      { japanese: "コーヒーにします。", french: "Je prendrai un cafe (je decide)." },
      { japanese: "毎日運動することにしました。", french: "J'ai decide de faire de l'exercice tous les jours." },
      { japanese: "会議は明日にしましょう。", french: "Fixons la reunion a demain." }
    ],
    nuancesFr: "にする implique une decision active de la personne, contrairement a になる (changement naturel).",
    mnemonicFr: "NI SURU = 'tu FAIS (する) vers (に) ce choix'. C'est TOI qui decides !",
    jlptLevel: 5,
    levelId: 10,
    order: 5
  },
  {
    slug: "sou-hearsay",
    titleJp: "～そうです (伝聞)",
    titleFr: "On dit que/Il parait que",
    meaningFr: "Rapporte une information entendue de quelqu'un d'autre. 'J'ai entendu dire que...'",
    formation: "Phrase (forme familiere) + そうです\nNom + だそうです",
    exampleSentences: [
      { japanese: "明日は雨だそうです。", french: "Il parait qu'il pleuvra demain." },
      { japanese: "あの映画は面白いそうです。", french: "On dit que ce film est interessant." },
      { japanese: "田中さんは来週結婚するそうです。", french: "J'ai entendu dire que M. Tanaka se marie la semaine prochaine." }
    ],
    nuancesFr: "Utilise pour rapporter des informations non verifiees personnellement. Different de そう (apparence).",
    mnemonicFr: "SOU DESU (info) = 'on dit SO' - tu rapportes ce que quelqu'un d'autre a dit !",
    jlptLevel: 5,
    levelId: 10,
    order: 6
  },
  {
    slug: "sou-appearance",
    titleJp: "～そう (様態)",
    titleFr: "Avoir l'air de",
    meaningFr: "Exprime une apparence ou une impression basee sur l'observation. 'Ca a l'air de...'",
    formation: "Verbe radical + そう\nAdjectif-い sans い + そう (exception: いい → よさそう)\nAdjectif-na + そう",
    exampleSentences: [
      { japanese: "このケーキはおいしそうです。", french: "Ce gateau a l'air delicieux." },
      { japanese: "雨が降りそうです。", french: "On dirait qu'il va pleuvoir." },
      { japanese: "彼は元気そうです。", french: "Il a l'air en forme." }
    ],
    nuancesFr: "Base sur l'observation directe. Attention aux formes negatives : なさそう (adj-い), じゃなさそう (adj-na).",
    mnemonicFr: "SOU (apparence) = 'so it SEEMS' - CA A L'AIR comme ca !",
    jlptLevel: 5,
    levelId: 10,
    order: 7
  }
];

async function main() {
  console.log("Seeding N5 grammar points...");

  // Ensure levels 1-10 exist
  for (let i = 1; i <= 10; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  let created = 0;
  let updated = 0;

  for (const grammar of n5GrammarPoints) {
    const result = await prisma.grammarPoint.upsert({
      where: { slug: grammar.slug },
      update: {
        titleJp: grammar.titleJp,
        titleFr: grammar.titleFr,
        meaningFr: grammar.meaningFr,
        formation: grammar.formation,
        formationNotes: grammar.formationNotes,
        exampleSentences: grammar.exampleSentences as unknown as Prisma.JsonArray,
        nuancesFr: grammar.nuancesFr,
        mnemonicFr: grammar.mnemonicFr,
        jlptLevel: grammar.jlptLevel,
        levelId: grammar.levelId,
        order: grammar.order,
      },
      create: {
        slug: grammar.slug,
        titleJp: grammar.titleJp,
        titleFr: grammar.titleFr,
        meaningFr: grammar.meaningFr,
        formation: grammar.formation,
        formationNotes: grammar.formationNotes,
        exampleSentences: grammar.exampleSentences as unknown as Prisma.JsonArray,
        nuancesFr: grammar.nuancesFr,
        mnemonicFr: grammar.mnemonicFr,
        jlptLevel: grammar.jlptLevel,
        levelId: grammar.levelId,
        order: grammar.order,
        relatedGrammar: [],
      },
    });

    // Check if it was created or updated
    const existingCount = await prisma.grammarPoint.count({
      where: { slug: grammar.slug }
    });
    if (existingCount === 1) {
      // Check creation time vs now
      const existing = await prisma.grammarPoint.findUnique({
        where: { slug: grammar.slug }
      });
      // Simple heuristic: if we just upserted and got a result, count as created for new items
      created++;
    }
  }

  console.log(`\nN5 Grammar seeding complete!`);
  console.log(`Total grammar points: ${n5GrammarPoints.length}`);

  // Show distribution by level
  const levelDistribution: Record<number, number> = {};
  for (const g of n5GrammarPoints) {
    levelDistribution[g.levelId] = (levelDistribution[g.levelId] || 0) + 1;
  }

  console.log("\nDistribution by level:");
  for (let i = 1; i <= 10; i++) {
    console.log(`  Level ${i}: ${levelDistribution[i] || 0} grammar points`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
