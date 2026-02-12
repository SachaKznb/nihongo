import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding levels 11-20...");

  // Create levels 11-20
  for (let i = 11; i <= 20; i++) {
    await prisma.level.upsert({
      where: { id: i },
      update: {},
      create: { id: i, name: `Niveau ${i}` },
    });
  }

  // ============================================
  // LEVEL 11 - Actions and Movement
  // ============================================

  const level11Radicals = [
    {
      character: "立",
      meaningFr: "Debout",
      mnemonic: "Une personne qui se tient DEBOUT, les bras écartés. Elle est stable sur ses deux jambes, prête à agir. Être DEBOUT, c'est être prêt !"
    },
    {
      character: "糸",
      meaningFr: "Fil",
      mnemonic: "Regarde ce FIL de soie qui s'enroule ! On dirait un cocon de ver à soie avec des petites boucles. Le FIL fin et précieux du kimono."
    },
    {
      character: "言",
      meaningFr: "Dire",
      mnemonic: "Une bouche (en haut) d'où sortent des PAROLES (les traits en dessous). Quand tu parles, les mots s'empilent comme ces lignes horizontales."
    },
    {
      character: "貝",
      meaningFr: "Coquillage",
      mnemonic: "Un COQUILLAGE précieux ! Autrefois au Japon, les coquillages servaient de monnaie. Ce radical apparaît dans les kanji liés à l'argent."
    },
    {
      character: "車",
      meaningFr: "Voiture",
      mnemonic: "Vue de dessus, une VOITURE avec ses roues et son châssis. Le trait vertical est l'essieu, les traits horizontaux sont le cadre."
    },
    {
      character: "足",
      meaningFr: "Pied",
      mnemonic: "Un PIED avec sa cheville (haut) et ses orteils (bas). Ce PIED marche dans les rues de Tokyo, faisant des pas réguliers."
    },
    {
      character: "酉",
      meaningFr: "Alcool",
      mnemonic: "Une jarre à saké traditionnelle ! C'est le radical de l'ALCOOL. Imagine le saké qui fermente doucement dans cette cruche ancienne."
    },
    {
      character: "門",
      meaningFr: "Porte",
      mnemonic: "Une grande PORTE traditionnelle japonaise vue de face. Les deux battants encadrent l'entrée d'un temple ou d'une maison."
    },
  ];

  for (const radical of level11Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 11 } },
      update: { ...radical },
      create: { ...radical, levelId: 11 },
    });
  }

  const level11Kanji = [
    {
      character: "走",
      meaningsFr: ["Courir"],
      readingsOn: ["ソウ"],
      readingsKun: ["はし-る"],
      meaningMnemonicFr: "En haut le kanji de la terre, en bas le pied qui bouge vite. Quelqu'un COURT sur la terre ferme !",
      readingMnemonicFr: "Hashiru - comme 'hashi' (baguettes) qui courent sur ton bol de ramen !",
    },
    {
      character: "起",
      meaningsFr: ["Se lever", "Se produire"],
      readingsOn: ["キ"],
      readingsKun: ["お-きる", "お-こる"],
      meaningMnemonicFr: "Le radical 'soi' avec le mouvement. Tu te lèves toi-même ! SE LEVER chaque matin pour une nouvelle journée.",
      readingMnemonicFr: "Okiru - 'O, qui rit ?' Toi, quand tu te lèves de bonne humeur !",
    },
    {
      character: "送",
      meaningsFr: ["Envoyer"],
      readingsOn: ["ソウ"],
      readingsKun: ["おく-る"],
      meaningMnemonicFr: "Le radical du chemin avec quelque chose qui avance. ENVOYER quelque chose sur son chemin, vers sa destination.",
      readingMnemonicFr: "Okuru - 'Oh, Kouro' (mon ami) à qui j'ENVOIE ce colis !",
    },
    {
      character: "届",
      meaningsFr: ["Livrer", "Atteindre"],
      readingsOn: ["トド"],
      readingsKun: ["とど-く", "とど-ける"],
      meaningMnemonicFr: "Quelque chose passe par la porte pour ARRIVER. Ta commande est LIVRÉE, elle ATTEINT sa destination !",
      readingMnemonicFr: "Todoku - 'Todo' comme ta todo-list est ATTEINTE !",
    },
    {
      character: "届",
      meaningsFr: ["Livrer", "Atteindre"],
      readingsOn: ["トド"],
      readingsKun: ["とど-く", "とど-ける"],
      meaningMnemonicFr: "Quelque chose passe par la porte pour ARRIVER. Ta commande est LIVRÉE, elle ATTEINT sa destination !",
      readingMnemonicFr: "Todoku - 'Todo' comme ta todo-list est ATTEINTE !",
    },
    {
      character: "持",
      meaningsFr: ["Tenir", "Posséder"],
      readingsOn: ["ジ"],
      readingsKun: ["も-つ"],
      meaningMnemonicFr: "La main avec le temple. Tu TIENS quelque chose de sacré dans tes mains, tu le POSSÈDES.",
      readingMnemonicFr: "Motsu - 'Mots' que tu TIENS dans ta mémoire !",
    },
    {
      character: "開",
      meaningsFr: ["Ouvrir"],
      readingsOn: ["カイ"],
      readingsKun: ["あ-く", "あ-ける", "ひら-く"],
      meaningMnemonicFr: "La porte avec deux mains qui l'OUVRENT. Pousse les deux battants pour OUVRIR !",
      readingMnemonicFr: "Hiraku - 'Hira' comme quand tes yeux s'OUVRENT grand !",
    },
    {
      character: "閉",
      meaningsFr: ["Fermer"],
      readingsOn: ["ヘイ"],
      readingsKun: ["し-める", "し-まる", "と-じる"],
      meaningMnemonicFr: "La porte avec une barre qui la FERME. On bloque l'entrée, on FERME le passage !",
      readingMnemonicFr: "Shimeru - 'Shi' me rend nerveux, FERME la porte !",
    },
    {
      character: "返",
      meaningsFr: ["Retourner", "Rendre"],
      readingsOn: ["ヘン"],
      readingsKun: ["かえ-す", "かえ-る"],
      meaningMnemonicFr: "Le chemin avec le retournement. RETOURNER sur ses pas, RENDRE ce qu'on a emprunté.",
      readingMnemonicFr: "Kaesu - 'Ka et su' RETOURNENT ensemble chez eux !",
    },
    {
      character: "届",
      meaningsFr: ["Délivrer", "Atteindre"],
      readingsOn: ["トド"],
      readingsKun: ["とど-く", "とど-ける"],
      meaningMnemonicFr: "Le corps qui se penche pour ATTEINDRE quelque chose à travers une porte. Le colis est DÉLIVRÉ !",
      readingMnemonicFr: "Todoku - 'To do ku' - à faire pour que ça ARRIVE !",
    },
    {
      character: "届",
      meaningsFr: ["Atteindre", "Parvenir"],
      readingsOn: ["トド"],
      readingsKun: ["とど-く", "とど-ける"],
      meaningMnemonicFr: "Sous le toit, quelque chose qui ARRIVE enfin. Le message PARVIENT à destination !",
      readingMnemonicFr: "Todoku - Ton message a ATTEINT son but !",
    },
  ];

  for (const kanji of level11Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 11 },
      create: { ...kanji, levelId: 11 },
    });
  }

  const level11Vocab = [
    {
      word: "走る",
      meaningsFr: ["Courir"],
      readings: ["はしる"],
      readingMnemonicFr: "Hashiru - Le verbe courir de base. Tes jambes bougent vite !",
      mnemonicFr: "La lecture kun'yomi du kanji courir. Tu COURS vers ton objectif !",
      levelId: 11,
    },
    {
      word: "起きる",
      meaningsFr: ["Se lever", "Se réveiller"],
      readings: ["おきる"],
      readingMnemonicFr: "Okiru - Tu t'éveilles et tu te lèves du lit !",
      mnemonicFr: "SE LEVER le matin, ouvrir les yeux sur un nouveau jour.",
      levelId: 11,
    },
    {
      word: "起こる",
      meaningsFr: ["Se produire", "Arriver"],
      readings: ["おこる"],
      readingMnemonicFr: "Okoru - Quelque chose SE PRODUIT, un événement ARRIVE.",
      mnemonicFr: "Quand quelque chose SE PRODUIT, ça change la situation !",
      levelId: 11,
    },
    {
      word: "送る",
      meaningsFr: ["Envoyer"],
      readings: ["おくる"],
      readingMnemonicFr: "Okuru - ENVOYER quelque chose ou quelqu'un quelque part.",
      mnemonicFr: "Tu ENVOIES une lettre, un colis, ou tu accompagnes quelqu'un.",
      levelId: 11,
    },
    {
      word: "持つ",
      meaningsFr: ["Tenir", "Avoir"],
      readings: ["もつ"],
      readingMnemonicFr: "Motsu - TENIR quelque chose dans tes mains ou AVOIR en possession.",
      mnemonicFr: "Tu TIENS ton téléphone, tu AS un rendez-vous.",
      levelId: 11,
    },
    {
      word: "開く",
      meaningsFr: ["Ouvrir"],
      readings: ["あく", "ひらく"],
      readingMnemonicFr: "Aku/Hiraku - La porte S'OUVRE ou tu l'OUVRES.",
      mnemonicFr: "OUVRIR une porte, un livre, une possibilité !",
      levelId: 11,
    },
    {
      word: "開ける",
      meaningsFr: ["Ouvrir (transitif)"],
      readings: ["あける"],
      readingMnemonicFr: "Akeru - Tu OUVRES activement quelque chose.",
      mnemonicFr: "Version transitive : TU OUVRES la porte (action directe).",
      levelId: 11,
    },
    {
      word: "閉める",
      meaningsFr: ["Fermer"],
      readings: ["しめる"],
      readingMnemonicFr: "Shimeru - FERMER la porte, la fenêtre, le magasin.",
      mnemonicFr: "Tu FERMES quelque chose, tu bloques le passage.",
      levelId: 11,
    },
    {
      word: "閉まる",
      meaningsFr: ["Se fermer"],
      readings: ["しまる"],
      readingMnemonicFr: "Shimaru - Ça SE FERME tout seul.",
      mnemonicFr: "La porte SE FERME automatiquement derrière toi.",
      levelId: 11,
    },
    {
      word: "返す",
      meaningsFr: ["Rendre", "Retourner"],
      readings: ["かえす"],
      readingMnemonicFr: "Kaesu - RENDRE ce qu'on a emprunté.",
      mnemonicFr: "Tu RENDS le livre à la bibliothèque.",
      levelId: 11,
    },
    {
      word: "届く",
      meaningsFr: ["Arriver", "Atteindre"],
      readings: ["とどく"],
      readingMnemonicFr: "Todoku - Ça ARRIVE à destination, ça ATTEINT le but.",
      mnemonicFr: "Ton colis ARRIVE, ta voix ATTEINT quelqu'un.",
      levelId: 11,
    },
    {
      word: "届ける",
      meaningsFr: ["Livrer", "Délivrer"],
      readings: ["とどける"],
      readingMnemonicFr: "Todokeru - Tu LIVRES activement quelque chose.",
      mnemonicFr: "Tu LIVRES le colis à domicile, tu DÉLIVRES un message.",
      levelId: 11,
    },
  ];

  for (const vocab of level11Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  // ============================================
  // LEVEL 12 - Emotions and Communication
  // ============================================

  const level12Radicals = [
    {
      character: "心",
      meaningFr: "Coeur",
      mnemonic: "Un COEUR stylisé avec ses trois gouttes de sang qui battent. Le COEUR est le siège des émotions au Japon aussi !"
    },
    {
      character: "忄",
      meaningFr: "Coeur (forme courte)",
      mnemonic: "Version compressée du COEUR quand il est sur le côté gauche. Trois petits traits verticaux qui battent vite !"
    },
    {
      character: "音",
      meaningFr: "Son",
      mnemonic: "Le soleil qui se lève et fait du bruit ! Le SON du matin qui réveille, comme un coq qui chante."
    },
    {
      character: "頁",
      meaningFr: "Page/Tête",
      mnemonic: "Une PAGE de livre ou une TÊTE vue de face. Les traits représentent les lignes d'écriture ou les traits du visage."
    },
    {
      character: "隹",
      meaningFr: "Oiseau (forme courte)",
      mnemonic: "Un petit OISEAU assis sur une branche. On voit sa tête, son corps et ses plumes ébouriffées."
    },
    {
      character: "雨",
      meaningFr: "Pluie",
      mnemonic: "Un nuage en haut avec des gouttes de PLUIE qui tombent. La PLUIE de la saison des typhons au Japon !"
    },
    {
      character: "彳",
      meaningFr: "Pas",
      mnemonic: "Un petit PAS, un mouvement de marche. Ce radical indique le déplacement, l'action de marcher."
    },
    {
      character: "攵",
      meaningFr: "Frapper",
      mnemonic: "Une main qui FRAPPE avec un bâton. Action de taper, de FRAPPER pour agir sur quelque chose."
    },
  ];

  for (const radical of level12Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 12 } },
      update: { ...radical },
      create: { ...radical, levelId: 12 },
    });
  }

  const level12Kanji = [
    {
      character: "思",
      meaningsFr: ["Penser"],
      readingsOn: ["シ"],
      readingsKun: ["おも-う"],
      meaningMnemonicFr: "Le champ de riz sur le coeur. Tu PENSES avec ton coeur au Japon !",
      readingMnemonicFr: "Omou - 'Oh, mou' comme tes pensées qui sont douces.",
    },
    {
      character: "感",
      meaningsFr: ["Ressentir", "Sensation"],
      readingsOn: ["カン"],
      readingsKun: ["かん-じる"],
      meaningMnemonicFr: "Toutes ces émotions qui touchent le coeur ! RESSENTIR profondément une émotion.",
      readingMnemonicFr: "Kanjiru - 'Kanji' + 'ru' = tu RESSENS les kanji !",
    },
    {
      character: "悲",
      meaningsFr: ["Triste"],
      readingsOn: ["ヒ"],
      readingsKun: ["かな-しい"],
      meaningMnemonicFr: "Le coeur qui n'est pas droit, qui penche. La TRISTESSE déforme le coeur.",
      readingMnemonicFr: "Kanashii - 'Kana, she' est TRISTE, elle pleure.",
    },
    {
      character: "忙",
      meaningsFr: ["Occupé"],
      readingsOn: ["ボウ"],
      readingsKun: ["いそが-しい"],
      meaningMnemonicFr: "Le coeur qui meurt ! Quand tu es trop OCCUPÉ, ton coeur souffre.",
      readingMnemonicFr: "Isogashii - 'Iso gash ii' - trop OCCUPÉ pour te reposer !",
    },
    {
      character: "忘",
      meaningsFr: ["Oublier"],
      readingsOn: ["ボウ"],
      readingsKun: ["わす-れる"],
      meaningMnemonicFr: "Le coeur qui meurt/disparaît. Quand tu OUBLIES, ton coeur ne se souvient plus.",
      readingMnemonicFr: "Wasureru - 'Wa sure ru' - tu OUBLIES d'être sûr !",
    },
    {
      character: "怒",
      meaningsFr: ["Colère", "Se fâcher"],
      readingsOn: ["ド"],
      readingsKun: ["おこ-る", "いか-る"],
      meaningMnemonicFr: "Le coeur de la femme esclave ? Non ! Le coeur qui bout de COLÈRE !",
      readingMnemonicFr: "Okoru - 'O, corps' qui tremble de COLÈRE !",
    },
    {
      character: "恐",
      meaningsFr: ["Craindre", "Peur"],
      readingsOn: ["キョウ"],
      readingsKun: ["おそ-れる", "こわ-い"],
      meaningMnemonicFr: "Le travail sur le coeur crée la PEUR. CRAINDRE ce qui nous dépasse.",
      readingMnemonicFr: "Kowai - 'Ko, why?' Pourquoi j'ai si PEUR ?",
    },
    {
      character: "驚",
      meaningsFr: ["Surprendre"],
      readingsOn: ["キョウ"],
      readingsKun: ["おどろ-く"],
      meaningMnemonicFr: "Le cheval qui fait sursauter ! SURPRENDRE quelqu'un comme un cheval au galop.",
      readingMnemonicFr: "Odoroku - 'O door OK' - la porte s'ouvre et te SURPREND !",
    },
    {
      character: "伝",
      meaningsFr: ["Transmettre"],
      readingsOn: ["デン"],
      readingsKun: ["つた-える", "つた-わる"],
      meaningMnemonicFr: "Une personne qui TRANSMET quelque chose. La tradition se TRANSMET de génération en génération.",
      readingMnemonicFr: "Tsutaeru - 'Tsuta et rue' - tu TRANSMETS dans la rue !",
    },
    {
      character: "説",
      meaningsFr: ["Expliquer", "Théorie"],
      readingsOn: ["セツ"],
      readingsKun: ["と-く"],
      meaningMnemonicFr: "Les paroles qui EXPLIQUENT. Une THÉORIE qu'on développe avec des mots.",
      readingMnemonicFr: "Setsumei - 'Set su may' - EXPLIQUE-moi en mai !",
    },
  ];

  for (const kanji of level12Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 12 },
      create: { ...kanji, levelId: 12 },
    });
  }

  const level12Vocab = [
    {
      word: "思う",
      meaningsFr: ["Penser", "Croire"],
      readings: ["おもう"],
      readingMnemonicFr: "Omou - Je PENSE que..., Je CROIS que...",
      mnemonicFr: "PENSER avec son coeur, CROIRE en quelque chose.",
      levelId: 12,
    },
    {
      word: "感じる",
      meaningsFr: ["Ressentir"],
      readings: ["かんじる"],
      readingMnemonicFr: "Kanjiru - RESSENTIR une émotion, une sensation.",
      mnemonicFr: "Tu RESSENS la joie, la tristesse, le froid...",
      levelId: 12,
    },
    {
      word: "感じ",
      meaningsFr: ["Sensation", "Impression"],
      readings: ["かんじ"],
      readingMnemonicFr: "Kanji - Une SENSATION, une IMPRESSION générale.",
      mnemonicFr: "Quelle IMPRESSION ça te fait ? Quelle SENSATION ?",
      levelId: 12,
    },
    {
      word: "悲しい",
      meaningsFr: ["Triste"],
      readings: ["かなしい"],
      readingMnemonicFr: "Kanashii - Être TRISTE, ressentir de la tristesse.",
      mnemonicFr: "C'est TRISTE, le coeur est lourd.",
      levelId: 12,
    },
    {
      word: "忙しい",
      meaningsFr: ["Occupé"],
      readings: ["いそがしい"],
      readingMnemonicFr: "Isogashii - Être très OCCUPÉ, débordé.",
      mnemonicFr: "Je suis OCCUPÉ, je n'ai pas le temps !",
      levelId: 12,
    },
    {
      word: "忘れる",
      meaningsFr: ["Oublier"],
      readings: ["わすれる"],
      readingMnemonicFr: "Wasureru - OUBLIER quelque chose ou quelqu'un.",
      mnemonicFr: "J'ai OUBLIÉ mes clés, mon rendez-vous...",
      levelId: 12,
    },
    {
      word: "怒る",
      meaningsFr: ["Se mettre en colère"],
      readings: ["おこる"],
      readingMnemonicFr: "Okoru - SE FÂCHER, être en COLÈRE.",
      mnemonicFr: "Il SE MET EN COLÈRE, il est furieux !",
      levelId: 12,
    },
    {
      word: "怖い",
      meaningsFr: ["Effrayant", "Avoir peur"],
      readings: ["こわい"],
      readingMnemonicFr: "Kowai - C'est EFFRAYANT, j'ai PEUR !",
      mnemonicFr: "Quelque chose de EFFRAYANT qui fait PEUR.",
      levelId: 12,
    },
    {
      word: "驚く",
      meaningsFr: ["Être surpris"],
      readings: ["おどろく"],
      readingMnemonicFr: "Odoroku - Être SURPRIS, sursauter.",
      mnemonicFr: "Tu es SURPRIS par quelque chose d'inattendu !",
      levelId: 12,
    },
    {
      word: "伝える",
      meaningsFr: ["Transmettre", "Communiquer"],
      readings: ["つたえる"],
      readingMnemonicFr: "Tsutaeru - TRANSMETTRE une information.",
      mnemonicFr: "Je te TRANSMETS le message, je te COMMUNIQUE la nouvelle.",
      levelId: 12,
    },
    {
      word: "説明",
      meaningsFr: ["Explication"],
      readings: ["せつめい"],
      readingMnemonicFr: "Setsumei - Une EXPLICATION claire.",
      mnemonicFr: "Donne-moi une EXPLICATION, explique-moi !",
      levelId: 12,
    },
    {
      word: "説明する",
      meaningsFr: ["Expliquer"],
      readings: ["せつめいする"],
      readingMnemonicFr: "Setsumei suru - EXPLIQUER quelque chose.",
      mnemonicFr: "Je vais t'EXPLIQUER comment ça marche.",
      levelId: 12,
    },
  ];

  for (const vocab of level12Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  // ============================================
  // LEVEL 13 - Nature and Weather
  // ============================================

  const level13Radicals = [
    {
      character: "風",
      meaningFr: "Vent",
      mnemonic: "L'insecte dans une boîte qui fait du VENT en volant ! Le VENT du typhon qui souffle sur le Japon."
    },
    {
      character: "雪",
      meaningFr: "Neige",
      mnemonic: "La pluie qui tombe et se transforme en NEIGE ! Le flocon qui descend doucement du ciel."
    },
    {
      character: "雲",
      meaningFr: "Nuage",
      mnemonic: "La pluie au-dessus avec l'idée qui parle. Les NUAGES qui parlent entre eux avant de pleuvoir !"
    },
    {
      character: "石",
      meaningFr: "Pierre",
      mnemonic: "Une falaise avec une PIERRE qui en tombe. La PIERRE solide et immuable."
    },
    {
      character: "草",
      meaningFr: "Herbe",
      mnemonic: "Le radical de la plante en haut, et le soleil qui la fait pousser. L'HERBE verte des jardins japonais."
    },
    {
      character: "花",
      meaningFr: "Fleur",
      mnemonic: "La plante qui se transforme ! L'herbe devient une FLEUR magnifique."
    },
    {
      character: "葉",
      meaningFr: "Feuille",
      mnemonic: "La plante, le monde et l'arbre. Les FEUILLES du monde entier sur les arbres !"
    },
    {
      character: "林",
      meaningFr: "Bosquet",
      mnemonic: "Deux arbres côte à côte forment un petit BOSQUET. Plus qu'un arbre, moins qu'une forêt."
    },
  ];

  for (const radical of level13Radicals) {
    await prisma.radical.upsert({
      where: { character_levelId: { character: radical.character, levelId: 13 } },
      update: { ...radical },
      create: { ...radical, levelId: 13 },
    });
  }

  const level13Kanji = [
    {
      character: "風",
      meaningsFr: ["Vent"],
      readingsOn: ["フウ"],
      readingsKun: ["かぜ"],
      meaningMnemonicFr: "L'insecte dans une boîte qui crée du VENT. Le VENT qui souffle !",
      readingMnemonicFr: "Kaze - 'Ka, ça' - le VENT, ça souffle !",
    },
    {
      character: "雪",
      meaningsFr: ["Neige"],
      readingsOn: ["セツ"],
      readingsKun: ["ゆき"],
      meaningMnemonicFr: "La pluie qui devient balai ! La NEIGE qui balaie le paysage de blanc.",
      readingMnemonicFr: "Yuki - 'You, qui?' Qui joue dans la NEIGE ?",
    },
    {
      character: "雲",
      meaningsFr: ["Nuage"],
      readingsOn: ["ウン"],
      readingsKun: ["くも"],
      meaningMnemonicFr: "La pluie au-dessus, dire en dessous. Les NUAGES qui parlent avant de pleuvoir.",
      readingMnemonicFr: "Kumo - 'Ku, mot' - les NUAGES ne disent pas un mot !",
    },
    {
      character: "晴",
      meaningsFr: ["Beau temps", "S'éclaircir"],
      readingsOn: ["セイ"],
      readingsKun: ["は-れる"],
      meaningMnemonicFr: "Le soleil et le bleu ! Quand le ciel devient CLAIR, c'est le BEAU TEMPS.",
      readingMnemonicFr: "Hareru - 'Ha, rarement' - il fait rarement aussi BEAU !",
    },
    {
      character: "曇",
      meaningsFr: ["Nuageux", "S'assombrir"],
      readingsOn: ["ドン"],
      readingsKun: ["くも-る"],
      meaningMnemonicFr: "Le soleil caché par les nuages et le soleil. Temps NUAGEUX !",
      readingMnemonicFr: "Kumoru - 'Kumo, rue' - les nuages dans la rue, c'est NUAGEUX !",
    },
    {
      character: "台風",
      meaningsFr: ["Typhon"],
      readingsOn: ["タイフウ"],
      readingsKun: [],
      meaningMnemonicFr: "L'estrade du vent ! Le TYPHON est le roi des vents au Japon.",
      readingMnemonicFr: "Taifuu - comme 'typhoon' en anglais !",
    },
    {
      character: "石",
      meaningsFr: ["Pierre"],
      readingsOn: ["セキ"],
      readingsKun: ["いし"],
      meaningMnemonicFr: "La falaise avec la PIERRE qui tombe. Solide comme la PIERRE !",
      readingMnemonicFr: "Ishi - 'I, shi' - une PIERRE, c'est tout !",
    },
    {
      character: "草",
      meaningsFr: ["Herbe"],
      readingsOn: ["ソウ"],
      readingsKun: ["くさ"],
      meaningMnemonicFr: "La plante et le soleil qui la font pousser. L'HERBE verte !",
      readingMnemonicFr: "Kusa - 'Ku ça' - l'HERBE, c'est vert comme ça !",
    },
    {
      character: "花",
      meaningsFr: ["Fleur"],
      readingsOn: ["カ"],
      readingsKun: ["はな"],
      meaningMnemonicFr: "La plante qui se transforme en FLEUR. La FLEUR de cerisier !",
      readingMnemonicFr: "Hana - comme le nez ! La FLEUR a une odeur pour le nez !",
    },
    {
      character: "葉",
      meaningsFr: ["Feuille"],
      readingsOn: ["ヨウ"],
      readingsKun: ["は"],
      meaningMnemonicFr: "La plante, le monde et l'arbre. Les FEUILLES couvrent le monde !",
      readingMnemonicFr: "Ha - comme 'ha' quand tu souffles sur les FEUILLES !",
    },
  ];

  for (const kanji of level13Kanji) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: { ...kanji, levelId: 13 },
      create: { ...kanji, levelId: 13 },
    });
  }

  const level13Vocab = [
    {
      word: "風",
      meaningsFr: ["Vent"],
      readings: ["かぜ"],
      readingMnemonicFr: "Kaze - Le VENT qui souffle.",
      mnemonicFr: "Le VENT frais de l'automne japonais.",
      levelId: 13,
    },
    {
      word: "台風",
      meaningsFr: ["Typhon"],
      readings: ["たいふう"],
      readingMnemonicFr: "Taifuu - Un TYPHON arrive !",
      mnemonicFr: "Le TYPHON dévastateur de l'été japonais.",
      levelId: 13,
    },
    {
      word: "雪",
      meaningsFr: ["Neige"],
      readings: ["ゆき"],
      readingMnemonicFr: "Yuki - La NEIGE blanche.",
      mnemonicFr: "La NEIGE qui couvre le Mont Fuji.",
      levelId: 13,
    },
    {
      word: "雲",
      meaningsFr: ["Nuage"],
      readings: ["くも"],
      readingMnemonicFr: "Kumo - Un NUAGE dans le ciel.",
      mnemonicFr: "Les NUAGES blancs qui flottent.",
      levelId: 13,
    },
    {
      word: "晴れ",
      meaningsFr: ["Beau temps"],
      readings: ["はれ"],
      readingMnemonicFr: "Hare - C'est le BEAU TEMPS !",
      mnemonicFr: "Le BEAU TEMPS parfait pour hanami.",
      levelId: 13,
    },
    {
      word: "晴れる",
      meaningsFr: ["S'éclaircir"],
      readings: ["はれる"],
      readingMnemonicFr: "Hareru - Le ciel S'ÉCLAIRCIT.",
      mnemonicFr: "Après la pluie, le ciel S'ÉCLAIRCIT.",
      levelId: 13,
    },
    {
      word: "曇り",
      meaningsFr: ["Temps nuageux"],
      readings: ["くもり"],
      readingMnemonicFr: "Kumori - C'est NUAGEUX aujourd'hui.",
      mnemonicFr: "Temps NUAGEUX, pas de soleil.",
      levelId: 13,
    },
    {
      word: "石",
      meaningsFr: ["Pierre"],
      readings: ["いし"],
      readingMnemonicFr: "Ishi - Une PIERRE sur le chemin.",
      mnemonicFr: "Une PIERRE dans le jardin zen.",
      levelId: 13,
    },
    {
      word: "草",
      meaningsFr: ["Herbe"],
      readings: ["くさ"],
      readingMnemonicFr: "Kusa - L'HERBE verte.",
      mnemonicFr: "L'HERBE fraîche du matin.",
      levelId: 13,
    },
    {
      word: "花",
      meaningsFr: ["Fleur"],
      readings: ["はな"],
      readingMnemonicFr: "Hana - Une belle FLEUR.",
      mnemonicFr: "La FLEUR de cerisier, sakura !",
      levelId: 13,
    },
    {
      word: "葉",
      meaningsFr: ["Feuille"],
      readings: ["は"],
      readingMnemonicFr: "Ha - Une FEUILLE d'arbre.",
      mnemonicFr: "Les FEUILLES d'automne rouges.",
      levelId: 13,
    },
    {
      word: "花火",
      meaningsFr: ["Feu d'artifice"],
      readings: ["はなび"],
      readingMnemonicFr: "Hanabi - FLEUR + FEU = FEU D'ARTIFICE !",
      mnemonicFr: "Les FEU D'ARTIFICE de l'été japonais.",
      levelId: 13,
    },
  ];

  for (const vocab of level13Vocab) {
    await prisma.vocabulary.upsert({
      where: { word_levelId: { word: vocab.word, levelId: vocab.levelId } },
      update: { ...vocab },
      create: { ...vocab },
    });
  }

  // Continue with levels 14-20...
  // (Similar pattern for each level)

  console.log("Seeding levels 11-13 complete!");
  console.log("Run this file separately after the main seed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
