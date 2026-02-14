import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Expand short kanji reading mnemonics (under 50 characters)
 * Creates memorable stories using phonetic associations in French
 */

// Phonetic association helpers for common Japanese readings
const phoneticAssociations: Record<string, string[]> = {
  // Common onyomi
  "にち": ["niche (comme une niche de chien)", "niche (un petit recoin)"],
  "じつ": ["jitsu (comme 'je t'su-is')", "jitsu (comme 'juste')"],
  "げつ": ["guetse (comme 'guetter')", "guet (surveillance)"],
  "がつ": ["gatsu (comme 'gâteau')"],
  "か": ["ka (comme 'cas')", "ka (le bruit d'un choc)"],
  "ひ": ["hi (comme 'hiii' de surprise)", "hi (rire nerveux)"],
  "すい": ["sui (comme 'suisse')", "sui (comme 'suivre')"],
  "もく": ["moku (comme 'moquette')", "moku (bois qui craque)"],
  "きん": ["kin (comme 'quinze')", "kin (son métallique)"],
  "こん": ["kon (comme 'con')", "kon (cognement)"],
  "ど": ["do (comme 'dos')", "do (la note de musique)"],
  "と": ["to (comme 'tôt')", "to (comme 'taux')"],
  "にん": ["nine (comme 'nine' en anglais)", "nin (comme 'nain')"],
  "じん": ["jin (comme 'djinn')", "jin (génie)"],
  "しん": ["shin (comme 'chien')", "shin (comme 'chine')"],
  "せん": ["sen (comme 'sens')", "sen (comme 'cent')"],
  "えん": ["en (comme 'yen')", "en (comme 'ennui')"],
  "こう": ["kou (comme 'coup')", "kou (comme 'cou')"],
  "そう": ["sou (comme 'sous')", "sou (comme 'soupe')"],
  "とう": ["tou (comme 'tout')", "tou (comme 'tour')"],
  "どう": ["dou (comme 'doux')", "dou (comme 'douche')"],
  "しょう": ["shou (comme 'chou')", "shou (comme 'show')"],
  "じょう": ["jou (comme 'joue')", "jou (comme 'jour')"],
  "ちょう": ["chou (comme 'chou')", "chou (comme 'chaud')"],
  "きょう": ["kyou (comme 'quoi')", "kyou (aujourd'hui)"],
  "りょう": ["ryou (comme 'rio')", "ryou (comme 'rythme')"],
  "りょく": ["ryoku (comme 'rigoler')", "ryoku (force)"],
  "てき": ["teki (comme 'technique')", "teki (ennemi)"],
  "せい": ["sei (comme 'c'est')", "sei (comme 'seize')"],
  "めい": ["mei (comme 'mais')", "mei (comme 'maître')"],
  "れい": ["rei (comme 'raie')", "rei (comme 'ray')"],
  "たい": ["tai (comme 'taie')", "tai (comme 'taille')"],
  "がい": ["gai (comme 'gai')", "gai (comme 'gay')"],
  "かい": ["kai (comme 'quai')", "kai (comme 'caisse')"],
  "さい": ["sai (comme 'saille')", "sai (comme 'psy')"],
  "ない": ["nai (comme 'naître')", "nai (intérieur)"],
  "ばい": ["bai (comme 'bye')", "bai (comme 'baie')"],
  "はい": ["hai (comme 'high')", "hai (oui en japonais)"],
  "まい": ["mai (comme 'mais')", "mai (le mois de mai)"],
  "らい": ["rai (comme 'rayon')", "rai (comme 'rail')"],

  // Common kunyomi
  "やま": ["yama (comme 'y a ma montagne')", "yama (comme 'Yémen')"],
  "かわ": ["kawa (comme 'kawaii')", "kawa (comme 'café')"],
  "た": ["ta (comme 'ta')", "ta (comme 'tas')"],
  "いし": ["ishi (comme 'ici')", "ishi (comme 'issue')"],
  "くち": ["kuchi (comme 'cou-chi')", "kuchi (chuchoter)"],
  "て": ["te (comme 'thé')", "te (comme 'taie')"],
  "め": ["me (comme 'mais')", "me (comme 'mère')"],
  "みみ": ["mimi (comme 'mimi')", "mimi (mignon)"],
  "あし": ["ashi (comme 'à chier')", "ashi (comme 'assez')"],
  "き": ["ki (comme 'qui')", "ki (comme 'quille')"],
  "みず": ["mizu (comme 'mi-zut')", "mizu (comme 'mise')"],
  "つち": ["tsuchi (comme 'toutchi')", "tsuchi (toucher)"],
  "ゆび": ["yubi (comme 'you-bi')", "yubi (comme 'jubilé')"],
  "いま": ["ima (comme 'il m'a')", "ima (comme 'image')"],
  "は": ["ha (comme 'ah')", "ha (comme 'haha')"],
  "まえ": ["mae (comme 'mais')", "mae (en avant)"],
  "あと": ["ato (comme 'à taux')", "ato (comme 'atome')"],
  "うしろ": ["ushiro (comme 'ouch-zero')", "ushiro (derrière)"],
  "うえ": ["ue (comme 'ouais')", "ue (en haut)"],
  "した": ["shita (comme 'chita')", "shita (guépard)"],
  "ひだり": ["hidari (comme 'il a ri')", "hidari (gauche)"],
  "みぎ": ["migi (comme 'mi-gui')", "migi (droite)"],
  "おんな": ["onna (comme 'on a')", "onna (une femme)"],
  "おとこ": ["otoko (comme 'auto-ko')", "otoko (un homme)"],
  "こ": ["ko (comme 'co')", "ko (comme 'corps')"],
  "ちち": ["chichi (comme 'chichi')", "chichi (père)"],
  "はは": ["haha (comme 'haha')", "haha (rire)"],
  "ちから": ["chikara (comme 'chic-ara')", "chikara (force)"],
  "こころ": ["kokoro (comme 'coco-ro')", "kokoro (coeur)"],
  "おもう": ["omou (comme 'oh mou')", "omou (penser)"],
  "いう": ["iu (comme 'il vous')", "iu (dire)"],
  "はなし": ["hanashi (comme 'Anna-chi')", "hanashi (histoire)"],
  "いく": ["iku (comme 'il coupe')", "iku (aller)"],
  "くる": ["kuru (comme 'cou-rou')", "kuru (venir)"],
  "みる": ["miru (comme 'mire')", "miru (regarder)"],
  "きく": ["kiku (comme 'qui coud')", "kiku (entendre)"],
  "たべる": ["taberu (comme 'table-ru')", "taberu (manger)"],
  "のむ": ["nomu (comme 'no mu')", "nomu (boire)"],
  "たつ": ["tatsu (comme 'ta statue')", "tatsu (se lever)"],
  "すわる": ["suwaru (comme 'sous-voir')", "suwaru (s'asseoir)"],
  "でる": ["deru (comme 'de rue')", "deru (sortir)"],
  "はいる": ["hairu (comme 'air-u')", "hairu (entrer)"],
  "まなぶ": ["manabu (comme 'mana-bu')", "manabu (apprendre)"],
  "とき": ["toki (comme 'toqué')", "toki (temps)"],
  "あいだ": ["aida (comme 'aïe-da')", "aida (intervalle)"],
};

// Function to generate expanded mnemonic
function generateExpandedMnemonic(
  character: string,
  readings: string[],
  meanings: string[],
  currentMnemonic: string
): string {
  // Parse the current mnemonic to extract readings mentioned
  const onyomi = readings.filter(r => r === r.toUpperCase() || /^[ァ-ヶー]+$/.test(r));
  const kunyomi = readings.filter(r => /[ぁ-ん]/.test(r));

  const meaning = meanings[0] || "ce kanji";

  let expandedMnemonic = "";

  // Build onyomi part
  if (onyomi.length > 0) {
    const onyomiParts: string[] = [];
    for (const reading of onyomi) {
      const hiragana = katakanaToHiragana(reading).toLowerCase();
      const association = phoneticAssociations[hiragana];
      if (association) {
        onyomiParts.push(`${reading} (${association[0]})`);
      } else {
        // Generate a generic phonetic association
        onyomiParts.push(`${reading} (prononce "${reading.toLowerCase()}")`);
      }
    }
    if (onyomiParts.length > 0) {
      expandedMnemonic += `Lecture ON : ${onyomiParts.join(" ou ")}. `;
    }
  }

  // Build kunyomi part
  if (kunyomi.length > 0) {
    const kunyomiParts: string[] = [];
    for (const reading of kunyomi) {
      const cleanReading = reading.replace(/\..+$/, ""); // Remove okurigana markers
      const association = phoneticAssociations[cleanReading];
      if (association) {
        kunyomiParts.push(`${reading} (${association[0]})`);
      } else {
        kunyomiParts.push(`${reading}`);
      }
    }
    if (kunyomiParts.length > 0) {
      expandedMnemonic += `Lecture KUN : ${kunyomiParts.join(" ou ")}. `;
    }
  }

  // Add a memorable story connecting meaning to reading
  if (readings.length > 0) {
    const primaryReading = readings[0];
    const hiragana = katakanaToHiragana(primaryReading).toLowerCase().replace(/\..+$/, "");

    expandedMnemonic += generateStory(character, meaning, primaryReading, hiragana);
  }

  return expandedMnemonic.trim();
}

function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30A1-\u30F6]/g, (char) =>
    String.fromCharCode(char.charCodeAt(0) - 0x60)
  );
}

function generateStory(character: string, meaning: string, reading: string, hiragana: string): string {
  // Get phonetic association
  const association = phoneticAssociations[hiragana];

  // Generate contextual stories based on meaning categories
  const stories: Record<string, (r: string, a: string) => string> = {
    "soleil": (r, a) => `Pour retenir ${r}, imagine le ${meaning} qui se leve en criant "${r}" comme ${a || `"${r}"`} !`,
    "lune": (r, a) => `La ${meaning} brille et murmure "${r}" ${a ? `(${a})` : ""} dans la nuit.`,
    "montagne": (r, a) => `Du sommet de la ${meaning}, tu cries "${r}" ${a ? `(${a})` : ""} et l'echo repond !`,
    "eau": (r, a) => `L'${meaning} coule en faisant "${r}" ${a ? `(${a})` : ""}, un son apaisant.`,
    "feu": (r, a) => `Le ${meaning} crepite "${r}" ${a ? `(${a})` : ""} en brulant le bois.`,
    "arbre": (r, a) => `L'${meaning} craque et murmure "${r}" ${a ? `(${a})` : ""} quand le vent souffle.`,
    "or": (r, a) => `L'${meaning} brille et tinte "${r}" ${a ? `(${a})` : ""} quand tu le frappes.`,
    "terre": (r, a) => `La ${meaning} gronde "${r}" ${a ? `(${a})` : ""} lors d'un seisme.`,
  };

  const meaningLower = meaning.toLowerCase();
  for (const [key, storyFn] of Object.entries(stories)) {
    if (meaningLower.includes(key)) {
      return storyFn(reading, association ? association[0] : "");
    }
  }

  // Default story template
  if (association) {
    return `Imagine ${meaning} qui fait le son "${reading}" - comme ${association[0]}. Ce son t'aidera a te souvenir de la lecture !`;
  }

  return `Pour "${meaning}", retiens le son "${reading}". Repete-le plusieurs fois : ${reading}, ${reading}, ${reading} !`;
}

// Expanded mnemonics for specific kanji that need improvement
const manualExpansions: Record<string, string> = {
  "日": `Se lit NICHI (comme "niche" ou dort le soleil chaque soir) ou JITSU (imagine le soleil qui dit "Je t'su-is" en se levant chaque matin). En lecture kun, c'est HI (comme le cri de surprise "Hiiii!" quand le soleil t'eblouit) ou -KA (pour compter les jours, comme "cas" : "Dans ce CAS, c'est quel jour ?").`,

  "月": `Se lit GETSU (comme "guetter" - tu guettes la lune chaque soir) ou GATSU (comme "gateau" - la lune ronde ressemble a un gateau). En kun, c'est TSUKI (comme "tsu-qui" - "Tsu, qui c'est la-haut ?" demandes-tu a la lune).`,

  "火": `Se lit KA (comme le bruit "KA!" d'une allumette qui s'enflamme). En kun, c'est HI (comme "hiii" le cri quand tu te brules !). Le FEU fait "KA-KA-KA" en crepitant !`,

  "水": `Se lit SUI (comme "suisse" - l'eau minerale suisse, pure comme celle des Alpes !). En kun, c'est MIZU (comme "mi-zut" - "Mince, j'ai renverse mon EAU !"). L'eau coule : "sui-sui-sui" !`,

  "木": `Se lit MOKU (comme "moquette" - mais non, c'est pas de la moquette, c'est les feuilles de l'ARBRE !). En kun, c'est KI (comme "qui" - "QUI a plante cet ARBRE ici ?"). Le bois craque : "moku-moku" !`,

  "金": `Se lit KIN (comme "quinze" - tu as trouve QUINZE lingots d'OR dans le coffre !) ou KON. En kun, c'est KANE (comme "canne" - une CANNE en OR massif, l'accessoire des nobles !). L'or tinte "kin-kin" !`,

  "土": `Se lit DO (comme "dos" - tu as de la TERRE plein le DOS apres avoir jardine !) ou TO. En kun, c'est TSUCHI (comme "toutchi" - tu touches la TERRE avec tes mains !). La terre fait "do-do" sous tes pas !`,

  "山": `Se lit SAN (comme "sans" - "SANS cette montagne, le paysage serait plat !") ou parfois ZAN. En kun, c'est YAMA (comme "y a ma" - "Y a ma MONTAGNE preferee la-bas !"). Du sommet tu cries "SAN!" et l'echo repond !`,

  "川": `Se lit SEN (comme "sens" - la riviere coule toujours dans le meme SENS). En kun, c'est KAWA (comme "kawaii" - cette RIVIERE est trop kawaii avec ses petits poissons !). L'eau murmure "sen-sen" en coulant !`,

  "田": `Se lit DEN (comme "dent" - les rangees du champ ressemblent a des DENTS alignees). En kun, c'est TA (comme "ta" - "C'est TA riziere ou celle du voisin ?"). Le riz pousse "ta-ta-ta" rang par rang !`,

  "人": `Se lit NIN (comme "nain" - meme un NAIN est une PERSONNE !) ou JIN (comme "djinn" - un genie, une PERSONNE magique !). En kun, c'est HITO (comme "hit" - cette PERSONNE est un hit, une star !).`,

  "口": `Se lit KOU (comme "coup" - tu recois un COUP sur la BOUCHE !) ou KU. En kun, c'est KUCHI (comme "cou-chi" - tu CHUCHOTES avec ta BOUCHE a l'oreille). La bouche fait "kou" quand elle souffle !`,

  "目": `Se lit MOKU (comme "moqueur" - un OEIL moqueur qui te juge !) ou BOKU. En kun, c'est ME (comme "mais" - "MAIS qu'est-ce que tu regardes avec tes YEUX ?"). Les yeux disent "me-me" en clignant !`,

  "耳": `Se lit JI (comme "j'y" - "J'Y entends rien !" quand tes OREILLES sont bouchees). En kun, c'est MIMI (comme "mimi" mignon - "Oh, quelles mignonnes petites OREILLES !"). L'oreille capte "ji-ji-ji" les sons !`,

  "手": `Se lit SHU (comme "chou" - tu petris la pate a CHOU avec tes MAINS !). En kun, c'est TE (comme "the" - pour servir le THE, tu dois avoir une MAIN stable !). La main applaudit "te-te-te" !`,

  "足": `Se lit SOKU (comme "saucisse" - tes PIEDS sont gonfles comme des saucisses apres la marche !). En kun, c'est ASHI (comme "a chier" - "J'ai mal aux PIEDS, c'est a chier cette randonnee !"). Les pieds font "soku-soku" en marchant !`,

  "一": `Se lit ICHI (comme "itchi" - tu te grattes, "ca me demange ICHI fois, UNE seule fois !"). En kun, c'est HITO-tsu (comme "hit" - UN seul hit, UN seul succes). Le chiffre UN fait "ichi" comme une demangeaison !`,

  "二": `Se lit NI (comme "nid" - DEUX oeufs dans le NID). En kun, c'est FUTA-tsu (comme "foot" - DEUX pieds pour jouer au foot). DEUX c'est comme un NI, un nid douillet !`,

  "三": `Se lit SAN (comme "sans" - TROIS c'est le minimum, jamais SANS !). En kun, c'est MI-tsu (comme "mite" - TROIS mites volent). Le TROIS japonais crie "SAN!" comme au karate !`,

  "四": `Se lit SHI (comme "chi" - QUATRE, un chiffre qui fait "chi" avec ses quatres coins). En kun, c'est YO-tsu ou YON (comme "yoyo" - le yoyo fait QUATRE rebonds). QUATRE comme les quatres saisons, "shi-shi" !`,

  "五": `Se lit GO (comme "go" - le jeu de GO avec ses CINQ pierres strategiques). En kun, c'est ITSU-tsu (comme "il su" - "il SUT que c'etait CINQ"). CINQ doigts disent "GO!" pour commencer !`,

  "六": `Se lit ROKU (comme "rock" - le ROCK a SIX cordes de guitare !). En kun, c'est MU-tsu ou MUI (comme "mui" - "MUI, je veux SIX bonbons !"). SIX fait du rock : "roku-roku" !`,

  "七": `Se lit SHICHI (comme "chic-chi" - SEPT, c'est le chiffre CHIC, chanceux !). En kun, c'est NANA (comme "nana" - ta NANA a SEPT robes). SEPT est chic, il fait "shichi" de fierte !`,

  "八": `Se lit HACHI (comme "hatchback" - une voiture HUIT places !). En kun, c'est YA-tsu (comme "yaourt" - HUIT yaourts dans le frigo). HUIT bourdonne comme une abeille : "hachi-hachi" !`,

  "九": `Se lit KU ou KYUU (comme "cul" ou "queue" - le NEUF ressemble a un cul assis !). En kun, c'est KOKONO-tsu (comme "coco-no" - "Non COCO, c'est NEUF !"). NEUF crie "KU!" de douleur d'etre assis !`,

  "十": `Se lit JUU (comme "jus" - DIX verres de JUS pour les DIX invites). En kun, c'est TOO (comme "taux" - le TAUX de DIX pour cent). DIX croix qui font "juu" ensemble !`,

  "百": `Se lit HYAKU (comme "hyaku" - CENT yakuzas hurlent "HYAKU!"). Le chiffre CENT rugit "HYAKU!" comme une armee de CENT guerriers !`,

  "千": `Se lit SEN (comme "sens" - MILLE directions, autant de SENS !). Le chiffre MILLE souffle "SEN" comme le vent de MILLE tempetes !`,

  "万": `Se lit MAN (comme "man" - un MAN, un homme qui vaut DIX MILLE !). En kun, c'est parfois YOROZU. DIX MILLE crie "MAN!" comme Superman !`,

  "円": `Se lit EN (comme "yen" - la monnaie japonaise, le YEN qui fait "EN!"). Le CERCLE de l'argent tourne en faisant "EN-EN-EN" !`,

  "年": `Se lit NEN (comme "n'est-ce" - "N'est-ce pas qu'une ANNEE passe vite ?"). En kun, c'est TOSHI (comme "toshiba" - chaque ANNEE un nouveau Toshiba !). Les ANS passent "nen-nen-nen" !`,

  "大": `Se lit DAI ou TAI (comme "daille" ou "taille" - GRANDE TAILLE !). En kun, c'est OO (comme "oh!" - "OH! C'est GRAND !"). Le GRAND crie "DAI!" de fierte !`,

  "小": `Se lit SHOU (comme "chou" - un PETIT chou mignon). En kun, c'est CHI-sai ou KO (comme "corps" - un PETIT corps). Le PETIT murmure "shou" tout doucement !`,

  "中": `Se lit CHUU (comme "tchou-tchou" - le train passe au MILIEU !). En kun, c'est NAKA (comme "nana-ka" - au MILIEU de la semaine). Le MILIEU fait "chuu" comme un bisou !`,

  "上": `Se lit JOU (comme "joue" - les joues en HAUT quand tu souris !). En kun, c'est UE (comme "ouais" - "OUAIS, c'est en HAUT !"). Le HAUT s'eleve en criant "JOU!" !`,

  "下": `Se lit KA ou GE (comme "cas" ou "gai" - le CAS du BAS !). En kun, c'est SHITA (comme "chita" guepard - le guepard court vers le BAS !). Le BAS descend "ka-ka-ka" !`,

  "左": `Se lit SA (comme "ca" - "C'est par la, a GAUCHE, CA !"). En kun, c'est HIDARI (comme "il a ri" - "Il a ri quand je lui ai dit de tourner a GAUCHE !"). La GAUCHE fait "SA!" pour indiquer !`,

  "右": `Se lit YUU ou U (comme "you" - "Hey YOU, c'est a DROITE !"). En kun, c'est MIGI (comme "mi-gui" - le gui est a DROITE de la porte !). La DROITE pointe "YUU!" vers la destination !`,

  "女": `Se lit JO ou NYO (comme "joli" - une JOLIE FEMME !). En kun, c'est ONNA (comme "on a" - "ON A une FEMME formidable !"). La FEMME dit "JO" avec elegance !`,

  "男": `Se lit DAN ou NAN (comme "dans" - "DANS cette maison vit un HOMME !"). En kun, c'est OTOKO (comme "auto-ko" - cet HOMME est KO de fatigue !). L'HOMME crie "DAN!" avec force !`,

  "子": `Se lit SHI (comme "chi" chou - "Mon petit CHOU, mon ENFANT !"). En kun, c'est KO (comme "co" - mon ENFANT est mon CO-pilote !). L'ENFANT gazouille "ko-ko-ko" !`,

  "父": `Se lit FU (comme "fou" - ce PERE est FOU de ses enfants !). En kun, c'est CHICHI (comme "chichi" - un PERE un peu CHICHI !). Le PERE dit "FU!" de fierte !`,

  "母": `Se lit BO (comme "beau" - "Ma MERE est la plus BELLE !"). En kun, c'est HAHA (comme le rire - "HAHAHA!" rit la MERE !). La MERE rit "BO-BO-BO" de bonheur !`,

  "力": `Se lit RYOKU ou RIKI (comme "rigoler" - on RIGOLE pas avec la FORCE !). En kun, c'est CHIKARA (comme "chic-ara" - ce mec a la FORCE, il est CHIC !). La FORCE fait "RYOKU!" en frappant !`,

  "心": `Se lit SHIN (comme "cheri" - "Mon CHERI, tu as vole mon COEUR !"). En kun, c'est KOKORO (comme "coco-ro" - ton COEUR fait "coco-ro" quand tu es amoureux !). Le COEUR bat "SHIN-SHIN" !`,

  "思": `Se lit SHI (comme "si" - "SI seulement je pouvais arreter de PENSER !"). En kun, c'est OMOU (comme "oh mou" - "Oh, mon cerveau est MOU, je n'arrive plus a PENSER !"). PENSER fait "SHI" de reflexion !`,

  "言": `Se lit GEN ou GON (comme "gene" - ca te GENE quand quelqu'un PARLE trop !). En kun, c'est IU (comme "il vous" - "Il vous a DIT quoi ?"). PARLER fait "GEN!" avec autorite !`,
};

async function main() {
  console.log("========================================");
  console.log("EXPAND SHORT KANJI READING MNEMONICS");
  console.log("========================================\n");

  // Step 1: Count short mnemonics
  const shortMnemonics = await prisma.kanji.findMany({
    where: {
      readingMnemonicFr: {
        not: undefined,
      },
    },
    select: {
      id: true,
      character: true,
      readingMnemonicFr: true,
      meaningsFr: true,
      readingsOn: true,
      readingsKun: true,
      levelId: true,
    },
    orderBy: { levelId: "asc" },
  });

  // Filter to those under 50 characters
  const shortOnes = shortMnemonics.filter(
    (k) => k.readingMnemonicFr.length < 50
  );

  console.log(`Total kanji: ${shortMnemonics.length}`);
  console.log(`Kanji with short reading mnemonics (<50 chars): ${shortOnes.length}\n`);

  if (shortOnes.length === 0) {
    console.log("No short mnemonics found. All are already expanded!");
    return;
  }

  // Show some examples
  console.log("Examples of short mnemonics:");
  console.log("----------------------------------------");
  for (const k of shortOnes.slice(0, 10)) {
    console.log(`${k.character} (Level ${k.levelId}): "${k.readingMnemonicFr}" (${k.readingMnemonicFr.length} chars)`);
  }
  console.log("----------------------------------------\n");

  // Step 2: Process in batches
  const BATCH_SIZE = 50;
  let updated = 0;
  let skipped = 0;

  console.log("Processing kanji in batches...\n");

  for (let i = 0; i < shortOnes.length; i += BATCH_SIZE) {
    const batch = shortOnes.slice(i, i + BATCH_SIZE);

    for (const kanji of batch) {
      // Check if we have a manual expansion
      let expandedMnemonic: string;

      if (manualExpansions[kanji.character]) {
        expandedMnemonic = manualExpansions[kanji.character];
      } else {
        // Generate automatic expansion
        const allReadings = [...kanji.readingsOn, ...kanji.readingsKun];
        expandedMnemonic = generateExpandedMnemonic(
          kanji.character,
          allReadings,
          kanji.meaningsFr,
          kanji.readingMnemonicFr
        );
      }

      // Only update if the new mnemonic is longer
      if (expandedMnemonic.length > kanji.readingMnemonicFr.length && expandedMnemonic.length >= 50) {
        await prisma.kanji.update({
          where: { id: kanji.id },
          data: { readingMnemonicFr: expandedMnemonic },
        });
        updated++;

        if (updated <= 5) {
          console.log(`Updated ${kanji.character}:`);
          console.log(`  Before (${kanji.readingMnemonicFr.length}): ${kanji.readingMnemonicFr}`);
          console.log(`  After (${expandedMnemonic.length}): ${expandedMnemonic.slice(0, 100)}...`);
          console.log();
        }
      } else {
        skipped++;
      }
    }

    const progress = Math.min(i + BATCH_SIZE, shortOnes.length);
    process.stdout.write(`\rProgress: ${progress}/${shortOnes.length} (Updated: ${updated}, Skipped: ${skipped})`);
  }

  console.log("\n\n========================================");
  console.log("SUMMARY");
  console.log("========================================");
  console.log(`Total processed: ${shortOnes.length}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (expansion not better): ${skipped}`);
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
