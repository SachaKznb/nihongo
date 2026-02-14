import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// French phonetic associations for Japanese sounds
const phoneticAssociations: Record<string, string[]> = {
  // Common syllables
  "あ": ["ah", "a"],
  "い": ["i", "hi"],
  "う": ["ou", "hou"],
  "え": ["et", "eh"],
  "お": ["oh", "eau"],
  "か": ["car", "cas"],
  "き": ["qui", "key"],
  "く": ["cou", "coup"],
  "け": ["quai", "quet"],
  "こ": ["co", "corps"],
  "さ": ["sa", "ça"],
  "し": ["shi", "chi"],
  "す": ["su", "sous"],
  "せ": ["set", "c'est"],
  "そ": ["so", "seau"],
  "た": ["ta", "tas"],
  "ち": ["chi", "ti"],
  "つ": ["tsu", "tout-su"],
  "て": ["te", "thé"],
  "と": ["to", "tôt"],
  "な": ["na", "nana"],
  "に": ["ni", "nid"],
  "ぬ": ["nou", "nous"],
  "ね": ["né", "nez"],
  "の": ["no", "nos"],
  "は": ["ha", "ah"],
  "ひ": ["hi", "hii"],
  "ふ": ["fu", "fou"],
  "へ": ["hé", "hey"],
  "ほ": ["ho", "haut"],
  "ま": ["ma", "mât"],
  "み": ["mi", "mis"],
  "む": ["mou", "moue"],
  "め": ["mé", "mais"],
  "も": ["mo", "mot"],
  "や": ["ya", "yacht"],
  "ゆ": ["you", "yu"],
  "よ": ["yo", "yoyo"],
  "ら": ["ra", "rat"],
  "り": ["ri", "riz"],
  "る": ["ru", "rue"],
  "れ": ["ré", "raie"],
  "ろ": ["ro", "rot"],
  "わ": ["wa", "voilà"],
  "を": ["wo", "oh"],
  "ん": ["n", "hein"],
  // Long vowels
  "ー": ["longue", "étendu"],
  // Common combinations
  "きょ": ["kyo", "Kyoto"],
  "しょ": ["sho", "show"],
  "ちょ": ["cho", "chocolat"],
  "にょ": ["nyo", "gnon"],
  "りょ": ["ryo", "rio"],
  "じょ": ["jo", "joli"],
  "びょ": ["byo", "bio"],
  "ぴょ": ["pyo", "piou"],
  "みょ": ["myo", "miaou"],
  "ひょ": ["hyo", "hyène"],
  "ぎょ": ["gyo", "guio"],
};

// Templates for different types of vocabulary
const templates = {
  noun: [
    "{meaning} - Quand on dit {reading}, on pense immédiatement à ce concept. Le son évoque l'image de {meaning_lower} dans la culture japonaise.",
    "{meaning} - Ce mot se prononce {reading}, comme si on murmurait le nom de cette chose précieuse. Imaginez {meaning_lower} devant vos yeux.",
    "{meaning} - La prononciation {reading} résonne comme le bruit que fait {meaning_lower}. Un mot qui capture parfaitement son essence.",
  ],
  verb: [
    "{meaning} - L'action de {meaning_lower} se dit {reading}. Imaginez-vous en train de faire ce geste en prononçant le mot.",
    "{meaning} - Pour exprimer cette action, dites {reading}. Le son lui-même suggère le mouvement de {meaning_lower}.",
    "{meaning} - Quand on veut {meaning_lower}, on utilise {reading}. Le mot coule naturellement comme l'action qu'il décrit.",
  ],
  adjective: [
    "{meaning} - Cette qualité se dit {reading}. Le son capture l'essence de ce qui est {meaning_lower}.",
    "{meaning} - Pour décrire quelque chose de {meaning_lower}, utilisez {reading}. L'adjectif résonne avec sa signification.",
    "{meaning} - La qualité {meaning_lower} s'exprime par {reading}. Un mot qui peint une image dans l'esprit.",
  ],
  adverb: [
    "{meaning} - Cette manière de faire se dit {reading}. L'adverbe ajoute de la nuance à toute phrase.",
    "{meaning} - Pour exprimer {meaning_lower}, on utilise {reading}. Le mot modifie élégamment le sens.",
  ],
  expression: [
    "{meaning} - Cette expression courante se prononce {reading}. Utilisée quotidiennement au Japon.",
    "{meaning} - On dit {reading} pour exprimer ce concept. Une phrase essentielle à connaître.",
  ],
  counter: [
    "{meaning} - Ce compteur se lit {reading}. Utilisé pour compter ce type d'objets spécifiques.",
    "{meaning} - Pour compter, on dit {reading}. Un classificateur important en japonais.",
  ],
  default: [
    "{meaning} - Ce mot japonais se prononce {reading}. Mémorisez le son et la signification ensemble.",
    "{meaning} - La lecture {reading} correspond à ce concept. Un mot utile dans votre vocabulaire.",
    "{meaning} - Prononcé {reading}, ce mot enrichira votre japonais. Répétez-le plusieurs fois.",
  ],
};

// Detect word type based on meaning and word form
function detectWordType(word: string, meanings: string[]): keyof typeof templates {
  const meaningLower = meanings[0]?.toLowerCase() || "";

  // Check for verb patterns
  if (word.endsWith("る") || word.endsWith("う") || word.endsWith("く") ||
      word.endsWith("す") || word.endsWith("つ") || word.endsWith("ぬ") ||
      word.endsWith("ぶ") || word.endsWith("む") || word.endsWith("ぐ")) {
    if (meaningLower.includes("faire") || meaningLower.includes("aller") ||
        meaningLower.includes("venir") || meaningLower.includes("voir") ||
        meaningLower.includes("manger") || meaningLower.includes("boire") ||
        meaningLower.includes("parler") || meaningLower.includes("écrire") ||
        meaningLower.includes("lire") || meaningLower.includes("acheter") ||
        meaningLower.includes("vendre") || meaningLower.includes("prendre") ||
        meaningLower.includes("donner") || meaningLower.includes("recevoir") ||
        meaningLower.includes("ouvrir") || meaningLower.includes("fermer") ||
        meaningLower.includes("commencer") || meaningLower.includes("finir") ||
        meaningLower.includes("penser") || meaningLower.includes("croire") ||
        meaningLower.includes("savoir") || meaningLower.includes("connaître")) {
      return "verb";
    }
  }

  // Check for adjective patterns (i-adjectives and na-adjectives)
  if (word.endsWith("い") || word.endsWith("な")) {
    if (meaningLower.includes("grand") || meaningLower.includes("petit") ||
        meaningLower.includes("beau") || meaningLower.includes("bon") ||
        meaningLower.includes("mauvais") || meaningLower.includes("nouveau") ||
        meaningLower.includes("vieux") || meaningLower.includes("jeune") ||
        meaningLower.includes("chaud") || meaningLower.includes("froid") ||
        meaningLower.includes("cher") || meaningLower.includes("facile") ||
        meaningLower.includes("difficile") || meaningLower.includes("rapide") ||
        meaningLower.includes("lent") || meaningLower.includes("fort") ||
        meaningLower.includes("faible") || meaningLower.includes("haut") ||
        meaningLower.includes("bas") || meaningLower.includes("long") ||
        meaningLower.includes("court") || meaningLower.includes("gentil") ||
        meaningLower.includes("méchant") || meaningLower.includes("triste") ||
        meaningLower.includes("joyeux") || meaningLower.includes("calme")) {
      return "adjective";
    }
  }

  // Check for adverbs
  if (meaningLower.includes("très") || meaningLower.includes("souvent") ||
      meaningLower.includes("toujours") || meaningLower.includes("jamais") ||
      meaningLower.includes("parfois") || meaningLower.includes("rarement") ||
      meaningLower.includes("bien") || meaningLower.includes("mal") ||
      meaningLower.includes("vite") || meaningLower.includes("lentement") ||
      meaningLower.includes("beaucoup") || meaningLower.includes("peu") ||
      meaningLower.includes("ensemble") || meaningLower.includes("seul") ||
      meaningLower.includes("déjà") || meaningLower.includes("encore") ||
      meaningLower.includes("maintenant") || meaningLower.includes("bientôt")) {
    return "adverb";
  }

  // Check for counters
  if (meaningLower.includes("compteur") || meaningLower.includes("classifier") ||
      word.match(/^[一二三四五六七八九十百千万]/) ||
      meaningLower.match(/^\d+/) || meaningLower.includes("fois") ||
      meaningLower.includes("jour") || meaningLower.includes("mois") ||
      meaningLower.includes("année") || meaningLower.includes("heure") ||
      meaningLower.includes("minute") || meaningLower.includes("personne")) {
    return "counter";
  }

  // Check for expressions
  if (word.length > 4 || meaningLower.includes("s'il vous plaît") ||
      meaningLower.includes("merci") || meaningLower.includes("excusez") ||
      meaningLower.includes("bonjour") || meaningLower.includes("bonsoir") ||
      meaningLower.includes("au revoir") || meaningLower.includes("comment") ||
      meaningLower.includes("pourquoi") || meaningLower.includes("quand") ||
      meaningLower.includes("où") || meaningLower.includes("qui") ||
      meaningLower.includes("quoi") || meaningLower.includes("quel")) {
    if (meaningLower.length > 15) {
      return "expression";
    }
  }

  return "noun"; // Default to noun
}

// Generate expanded mnemonic
function generateMnemonic(word: string, meanings: string[], readings: string[]): string {
  const meaning = meanings[0] || "Ce mot";
  const meaningLower = meaning.toLowerCase();
  const reading = readings[0] || word;

  const wordType = detectWordType(word, meanings);
  const templateList = templates[wordType] || templates.default;

  // Pick a template based on word hash for consistency
  const hash = word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const template = templateList[hash % templateList.length];

  // Generate the base mnemonic
  let mnemonic = template
    .replace(/{meaning}/g, meaning.toUpperCase())
    .replace(/{meaning_lower}/g, meaningLower)
    .replace(/{reading}/g, reading);

  // Add phonetic hint if reading is in hiragana
  const firstChar = reading.charAt(0);
  const phoneticHint = phoneticAssociations[firstChar];
  if (phoneticHint && phoneticHint.length > 0) {
    const hint = phoneticHint[hash % phoneticHint.length];
    mnemonic += ` Le son "${firstChar}" rappelle "${hint}" en français.`;
  }

  return mnemonic;
}

async function main() {
  console.log("=".repeat(80));
  console.log("VOCABULARY MNEMONIC EXPANSION (LOCAL - NO API)");
  console.log("=".repeat(80));

  // Parse command line arguments
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : undefined;
  const levelArg = args.find(a => a.startsWith("--level="));
  const levelFilter = levelArg ? parseInt(levelArg.split("=")[1]) : undefined;

  if (dryRun) console.log("\nDRY RUN MODE - No changes will be made\n");
  if (limit) console.log(`LIMIT: Processing only first ${limit} items\n`);
  if (levelFilter) console.log(`LEVEL FILTER: Processing only level ${levelFilter}\n`);

  // Find vocabulary with short mnemonics
  console.log("Finding vocabulary with mnemonics shorter than 30 characters...");

  const whereClause: Record<string, unknown> = {};
  if (levelFilter) {
    whereClause.levelId = levelFilter;
  }

  let shortMnemonics = await prisma.vocabulary.findMany({
    where: whereClause,
    orderBy: { levelId: "asc" },
    select: {
      id: true,
      word: true,
      meaningsFr: true,
      readings: true,
      mnemonicFr: true,
      levelId: true,
    },
  });

  // Filter to only short mnemonics
  shortMnemonics = shortMnemonics.filter(v => v.mnemonicFr.length < 30);

  console.log(`Found ${shortMnemonics.length} vocabulary items with short mnemonics`);

  if (limit) {
    shortMnemonics = shortMnemonics.slice(0, limit);
  }

  if (shortMnemonics.length === 0) {
    console.log("\nNo vocabulary items to process!");
    return;
  }

  // Show samples
  console.log("\nSample items to process:");
  for (const item of shortMnemonics.slice(0, 5)) {
    console.log(`  - Level ${item.levelId}: ${item.word} (${item.meaningsFr[0]})`);
    console.log(`    Current (${item.mnemonicFr.length} chars): "${item.mnemonicFr}"`);
    const newMnemonic = generateMnemonic(item.word, item.meaningsFr, item.readings);
    console.log(`    New (${newMnemonic.length} chars): "${newMnemonic.substring(0, 80)}..."`);
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would process", shortMnemonics.length, "items");
    return;
  }

  // Process all items
  console.log("\n" + "=".repeat(80));
  console.log("PROCESSING VOCABULARY");
  console.log("=".repeat(80));

  let processed = 0;
  let errors = 0;

  for (const item of shortMnemonics) {
    try {
      const newMnemonic = generateMnemonic(item.word, item.meaningsFr, item.readings);

      await prisma.vocabulary.update({
        where: { id: item.id },
        data: { mnemonicFr: newMnemonic },
      });

      processed++;

      if (processed % 100 === 0) {
        console.log(`Processed ${processed}/${shortMnemonics.length} items...`);
      }
    } catch (error) {
      errors++;
      console.error(`Error processing ${item.word}:`, error);
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log(`Total processed: ${processed}`);
  console.log(`Errors: ${errors}`);
  console.log("=".repeat(80));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
