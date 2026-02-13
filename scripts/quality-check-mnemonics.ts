import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface KanjiWithMnemonics {
  id: number;
  character: string;
  meaningsFr: string[];
  readingsOn: string[];
  readingsKun: string[];
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
  levelId: number;
}

// French cultural references to search for
const FRENCH_PLACES = [
  'paris', 'provence', 'versailles', 'lyon', 'marseille', 'bordeaux', 'nice',
  'normandie', 'bretagne', 'alsace', 'champagne', 'bourgogne', 'loire',
  'mont blanc', 'cote d\'azur', 'côte d\'azur', 'seine', 'montmartre',
  'champs-élysées', 'champs elysees', 'louvre', 'notre-dame', 'notre dame',
  'toulouse', 'nantes', 'strasbourg', 'lille', 'saint-tropez'
];

const FRENCH_FOOD = [
  'croissant', 'baguette', 'fromage', 'vin', 'champagne', 'camembert', 'brie',
  'roquefort', 'foie gras', 'escargot', 'bouillabaisse', 'ratatouille',
  'crêpe', 'crepe', 'macaron', 'éclair', 'eclair', 'pain', 'brioche',
  'quiche', 'soupe', 'potage', 'cassoulet', 'coq au vin', 'croque',
  'tartine', 'pâté', 'saucisson', 'jambon', 'café', 'cafe', 'chocolat',
  'confiture', 'madeleine', 'galette', 'cidre', 'cognac', 'calvados',
  'beaujolais', 'bordeaux'
];

const FRENCH_HISTORY = [
  'napoléon', 'napoleon', 'révolution', 'revolution', 'louis', 'marie-antoinette',
  'marie antoinette', 'bastille', 'roi', 'reine', 'moyen âge', 'moyen age',
  'charlemagne', 'jeanne d\'arc', 'de gaulle', 'résistance', 'resistance',
  'empire', 'république', 'republique', 'monarchie', 'guillotine',
  'voltaire', 'rousseau', 'molière', 'moliere', 'hugo', 'dumas'
];

const FRENCH_CULTURE = [
  'tour eiffel', 'astérix', 'asterix', 'obélix', 'obelix', 'tintin',
  'bande dessinée', 'bd', 'tricolore', 'marseillaise', 'marianne',
  'coq', 'fleur de lys', 'accordéon', 'musette', 'pétanque', 'petanque',
  'béret', 'beret', 'moulin rouge', 'cancan', 'mime', 'arc de triomphe',
  'métro', 'metro', 'concierge', 'bistro', 'terrasse', 'cinéma', 'cinema',
  'nouvelle vague', 'impressionnisme', 'monet', 'renoir', 'cézanne', 'cezanne',
  'matisse', 'picasso', 'balzac', 'flaubert', 'proust', 'sartre', 'camus',
  'edith piaf', 'serge gainsbourg', 'johnny hallyday', 'daft punk'
];

async function main() {
  console.log("=".repeat(80));
  console.log("FRENCH CULTURAL RELEVANCE QUALITY CHECK FOR KANJI MNEMONICS");
  console.log("=".repeat(80));
  console.log();

  // Get total count
  const totalKanji = await prisma.kanji.count();
  console.log(`Total kanji in database: ${totalKanji}`);
  console.log();

  // 1. MNEMONIC QUALITY SAMPLE - Get 50 random kanji across different levels
  console.log("=".repeat(80));
  console.log("1. MNEMONIC QUALITY SAMPLE (50 random kanji across levels)");
  console.log("=".repeat(80));
  console.log();

  // Get kanji distribution by level
  const levelDistribution = await prisma.kanji.groupBy({
    by: ['levelId'],
    _count: { id: true },
    orderBy: { levelId: 'asc' }
  });

  console.log("Level distribution:");
  for (const level of levelDistribution) {
    console.log(`  Level ${level.levelId}: ${level._count.id} kanji`);
  }
  console.log();

  // Sample kanji from each level proportionally
  const sampleKanji: KanjiWithMnemonics[] = [];
  const totalLevels = levelDistribution.length;
  const samplePerLevel = Math.ceil(50 / totalLevels);

  for (const level of levelDistribution) {
    const levelKanji = await prisma.kanji.findMany({
      where: { levelId: level.levelId },
      take: Math.min(samplePerLevel, level._count.id),
      orderBy: { id: 'asc' } // Deterministic ordering for reproducibility
    });
    sampleKanji.push(...levelKanji);
  }

  // Limit to 50
  const sample = sampleKanji.slice(0, 50);

  console.log(`Analyzing ${sample.length} kanji sample...`);
  console.log();

  // Analyze sample
  let frenchCulturalCount = 0;
  let vividStoriesCount = 0;
  let visualComponentsCount = 0;
  let frenchPhoneticCount = 0;

  const goodExamples: { kanji: string; type: string; mnemonic: string; level: number }[] = [];
  const problematicExamples: { kanji: string; issue: string; mnemonic: string; level: number }[] = [];

  for (const kanji of sample) {
    const meaningMnemonic = kanji.meaningMnemonicFr.toLowerCase();
    const readingMnemonic = kanji.readingMnemonicFr.toLowerCase();
    const combinedMnemonics = meaningMnemonic + ' ' + readingMnemonic;

    // Check for French cultural references
    const hasFrenchPlace = FRENCH_PLACES.some(place => combinedMnemonics.includes(place));
    const hasFrenchFood = FRENCH_FOOD.some(food => combinedMnemonics.includes(food));
    const hasFrenchHistory = FRENCH_HISTORY.some(ref => combinedMnemonics.includes(ref));
    const hasFrenchCulture = FRENCH_CULTURE.some(ref => combinedMnemonics.includes(ref));

    if (hasFrenchPlace || hasFrenchFood || hasFrenchHistory || hasFrenchCulture) {
      frenchCulturalCount++;
      let type = '';
      if (hasFrenchPlace) type += 'place ';
      if (hasFrenchFood) type += 'food ';
      if (hasFrenchHistory) type += 'history ';
      if (hasFrenchCulture) type += 'culture ';
      goodExamples.push({
        kanji: kanji.character,
        type: `French ${type.trim()}`,
        mnemonic: kanji.meaningMnemonicFr.substring(0, 200) + '...',
        level: kanji.levelId
      });
    }

    // Check for vivid/memorable stories (look for narrative elements)
    const narrativeMarkers = ['imagine', 'regarde', 'pense', 'vois', 'histoire', 'raconte'];
    const hasNarrativeElements = narrativeMarkers.some(marker => combinedMnemonics.includes(marker));
    const hasExclamation = combinedMnemonics.includes('!');
    const hasQuestion = combinedMnemonics.includes('?');
    if (hasNarrativeElements || hasExclamation || hasQuestion) {
      vividStoriesCount++;
    }

    // Check for visual component explanation
    const visualMarkers = ['trait', 'ligne', 'forme', 'ressemble', 'représente', 'compose', 'partie', 'élément', 'haut', 'bas', 'gauche', 'droite', 'milieu', 'centre'];
    if (visualMarkers.some(marker => combinedMnemonics.includes(marker))) {
      visualComponentsCount++;
    }

    // Check for French phonetic similarities in reading mnemonics
    const frenchPhoneticMarkers = ['sonne comme', 'prononce', 'phonétique', 'français', 'comme en français', 'mot français', 'rappelle'];
    if (frenchPhoneticMarkers.some(marker => readingMnemonic.includes(marker))) {
      frenchPhoneticCount++;
    }

    // Identify problematic mnemonics
    if (kanji.meaningMnemonicFr.length < 50) {
      problematicExamples.push({
        kanji: kanji.character,
        issue: 'Too short (meaning mnemonic < 50 chars)',
        mnemonic: kanji.meaningMnemonicFr,
        level: kanji.levelId
      });
    }

    if (kanji.readingMnemonicFr.length < 30) {
      problematicExamples.push({
        kanji: kanji.character,
        issue: 'Too short (reading mnemonic < 30 chars)',
        mnemonic: kanji.readingMnemonicFr,
        level: kanji.levelId
      });
    }

    // Check for English-only phonetic references (not French)
    const englishOnlyPhonetics = ['sounds like', 'like english', 'english word'];
    if (englishOnlyPhonetics.some(ref => readingMnemonic.includes(ref))) {
      problematicExamples.push({
        kanji: kanji.character,
        issue: 'Uses English phonetics instead of French',
        mnemonic: kanji.readingMnemonicFr,
        level: kanji.levelId
      });
    }
  }

  console.log("Sample Analysis Results:");
  console.log(`  - Contains French cultural references: ${frenchCulturalCount}/50 (${(frenchCulturalCount/50*100).toFixed(1)}%)`);
  console.log(`  - Has vivid/memorable narrative elements: ${vividStoriesCount}/50 (${(vividStoriesCount/50*100).toFixed(1)}%)`);
  console.log(`  - Explains visual components: ${visualComponentsCount}/50 (${(visualComponentsCount/50*100).toFixed(1)}%)`);
  console.log(`  - Uses French phonetic similarities: ${frenchPhoneticCount}/50 (${(frenchPhoneticCount/50*100).toFixed(1)}%)`);
  console.log();

  // 2. CULTURAL REFERENCE ANALYSIS - Search entire database
  console.log("=".repeat(80));
  console.log("2. CULTURAL REFERENCE ANALYSIS (entire database)");
  console.log("=".repeat(80));
  console.log();

  const allKanji = await prisma.kanji.findMany();

  // Count references by category
  const placeReferences: { place: string; count: number; examples: string[] }[] = [];
  const foodReferences: { food: string; count: number; examples: string[] }[] = [];
  const historyReferences: { ref: string; count: number; examples: string[] }[] = [];
  const cultureReferences: { ref: string; count: number; examples: string[] }[] = [];

  for (const place of FRENCH_PLACES) {
    const matches = allKanji.filter(k =>
      k.meaningMnemonicFr.toLowerCase().includes(place) ||
      k.readingMnemonicFr.toLowerCase().includes(place)
    );
    if (matches.length > 0) {
      placeReferences.push({
        place,
        count: matches.length,
        examples: matches.slice(0, 3).map(k => k.character)
      });
    }
  }

  for (const food of FRENCH_FOOD) {
    const matches = allKanji.filter(k =>
      k.meaningMnemonicFr.toLowerCase().includes(food) ||
      k.readingMnemonicFr.toLowerCase().includes(food)
    );
    if (matches.length > 0) {
      foodReferences.push({
        food,
        count: matches.length,
        examples: matches.slice(0, 3).map(k => k.character)
      });
    }
  }

  for (const ref of FRENCH_HISTORY) {
    const matches = allKanji.filter(k =>
      k.meaningMnemonicFr.toLowerCase().includes(ref) ||
      k.readingMnemonicFr.toLowerCase().includes(ref)
    );
    if (matches.length > 0) {
      historyReferences.push({
        ref,
        count: matches.length,
        examples: matches.slice(0, 3).map(k => k.character)
      });
    }
  }

  for (const ref of FRENCH_CULTURE) {
    const matches = allKanji.filter(k =>
      k.meaningMnemonicFr.toLowerCase().includes(ref) ||
      k.readingMnemonicFr.toLowerCase().includes(ref)
    );
    if (matches.length > 0) {
      cultureReferences.push({
        ref,
        count: matches.length,
        examples: matches.slice(0, 3).map(k => k.character)
      });
    }
  }

  console.log("French PLACES found in mnemonics:");
  if (placeReferences.length > 0) {
    placeReferences.sort((a, b) => b.count - a.count);
    for (const ref of placeReferences) {
      console.log(`  - ${ref.place}: ${ref.count} occurrences (e.g., ${ref.examples.join(', ')})`);
    }
  } else {
    console.log("  No French places found in mnemonics.");
  }
  console.log();

  console.log("French FOOD found in mnemonics:");
  if (foodReferences.length > 0) {
    foodReferences.sort((a, b) => b.count - a.count);
    for (const ref of foodReferences) {
      console.log(`  - ${ref.food}: ${ref.count} occurrences (e.g., ${ref.examples.join(', ')})`);
    }
  } else {
    console.log("  No French food references found in mnemonics.");
  }
  console.log();

  console.log("French HISTORY found in mnemonics:");
  if (historyReferences.length > 0) {
    historyReferences.sort((a, b) => b.count - a.count);
    for (const ref of historyReferences) {
      console.log(`  - ${ref.ref}: ${ref.count} occurrences (e.g., ${ref.examples.join(', ')})`);
    }
  } else {
    console.log("  No French history references found in mnemonics.");
  }
  console.log();

  console.log("French CULTURE found in mnemonics:");
  if (cultureReferences.length > 0) {
    cultureReferences.sort((a, b) => b.count - a.count);
    for (const ref of cultureReferences) {
      console.log(`  - ${ref.ref}: ${ref.count} occurrences (e.g., ${ref.examples.join(', ')})`);
    }
  } else {
    console.log("  No French culture references found in mnemonics.");
  }
  console.log();

  const totalCulturalRefs = placeReferences.length + foodReferences.length + historyReferences.length + cultureReferences.length;
  console.log(`TOTAL unique French cultural references found: ${totalCulturalRefs}`);
  console.log();

  // 3. MNEMONIC LENGTH DISTRIBUTION
  console.log("=".repeat(80));
  console.log("3. MNEMONIC LENGTH DISTRIBUTION");
  console.log("=".repeat(80));
  console.log();

  const meaningLengths = allKanji.map(k => k.meaningMnemonicFr.length);
  const readingLengths = allKanji.map(k => k.readingMnemonicFr.length);

  const avgMeaningLength = meaningLengths.reduce((a, b) => a + b, 0) / meaningLengths.length;
  const avgReadingLength = readingLengths.reduce((a, b) => a + b, 0) / readingLengths.length;

  const minMeaningLength = Math.min(...meaningLengths);
  const maxMeaningLength = Math.max(...meaningLengths);
  const minReadingLength = Math.min(...readingLengths);
  const maxReadingLength = Math.max(...readingLengths);

  console.log("Meaning Mnemonics:");
  console.log(`  - Average length: ${avgMeaningLength.toFixed(0)} characters`);
  console.log(`  - Min length: ${minMeaningLength} characters`);
  console.log(`  - Max length: ${maxMeaningLength} characters`);
  console.log();

  console.log("Reading Mnemonics:");
  console.log(`  - Average length: ${avgReadingLength.toFixed(0)} characters`);
  console.log(`  - Min length: ${minReadingLength} characters`);
  console.log(`  - Max length: ${maxReadingLength} characters`);
  console.log();

  // Length distribution buckets
  const lengthBuckets = {
    'Very short (< 50 chars)': 0,
    'Short (50-100 chars)': 0,
    'Medium (100-200 chars)': 0,
    'Good (200-300 chars)': 0,
    'Detailed (300-500 chars)': 0,
    'Very detailed (500+ chars)': 0
  };

  for (const length of meaningLengths) {
    if (length < 50) lengthBuckets['Very short (< 50 chars)']++;
    else if (length < 100) lengthBuckets['Short (50-100 chars)']++;
    else if (length < 200) lengthBuckets['Medium (100-200 chars)']++;
    else if (length < 300) lengthBuckets['Good (200-300 chars)']++;
    else if (length < 500) lengthBuckets['Detailed (300-500 chars)']++;
    else lengthBuckets['Very detailed (500+ chars)']++;
  }

  console.log("Meaning Mnemonic Length Distribution:");
  for (const [bucket, count] of Object.entries(lengthBuckets)) {
    const percentage = (count / allKanji.length * 100).toFixed(1);
    console.log(`  - ${bucket}: ${count} (${percentage}%)`);
  }
  console.log();

  // 4. READING MNEMONIC QUALITY
  console.log("=".repeat(80));
  console.log("4. READING MNEMONIC QUALITY CHECK");
  console.log("=".repeat(80));
  console.log();

  let hasOnYomiExplanation = 0;
  let hasKunYomiExplanation = 0;
  let hasBothReadings = 0;

  for (const kanji of allKanji) {
    const readingMnemonic = kanji.readingMnemonicFr.toLowerCase();

    // Check if On'yomi readings are mentioned
    const hasOnReading = kanji.readingsOn.length > 0;
    const hasKunReading = kanji.readingsKun.length > 0;

    // Look for On'yomi indicators
    const onIndicators = ['on\'yomi', 'onyomi', 'lecture on', 'sino-japonais', 'chinois'];
    const mentionsOn = onIndicators.some(ind => readingMnemonic.includes(ind)) ||
                       kanji.readingsOn.some(r => readingMnemonic.includes(r.toLowerCase().replace(/[ー・]/g, '')));

    // Look for Kun'yomi indicators
    const kunIndicators = ['kun\'yomi', 'kunyomi', 'lecture kun', 'japonais natif'];
    const mentionsKun = kunIndicators.some(ind => readingMnemonic.includes(ind)) ||
                        kanji.readingsKun.some(r => readingMnemonic.includes(r.toLowerCase().replace(/[ー・\-]/g, '')));

    if (hasOnReading && mentionsOn) hasOnYomiExplanation++;
    if (hasKunReading && mentionsKun) hasKunYomiExplanation++;
    if (hasOnReading && hasKunReading && mentionsOn && mentionsKun) hasBothReadings++;
  }

  const kanjiWithBothReadings = allKanji.filter(k => k.readingsOn.length > 0 && k.readingsKun.length > 0).length;

  console.log("Reading Coverage:");
  console.log(`  - Kanji with On'yomi explanations: ${hasOnYomiExplanation}/${allKanji.length} (${(hasOnYomiExplanation/allKanji.length*100).toFixed(1)}%)`);
  console.log(`  - Kanji with Kun'yomi explanations: ${hasKunYomiExplanation}/${allKanji.length} (${(hasKunYomiExplanation/allKanji.length*100).toFixed(1)}%)`);
  console.log(`  - Kanji covering both readings: ${hasBothReadings}/${kanjiWithBothReadings} (${(hasBothReadings/kanjiWithBothReadings*100).toFixed(1)}% of kanji with both)`);
  console.log();

  // 5. EXAMPLES - Good and Problematic
  console.log("=".repeat(80));
  console.log("5. EXAMPLE MNEMONICS");
  console.log("=".repeat(80));
  console.log();

  console.log("GOOD EXAMPLES (with French cultural references):");
  console.log("-".repeat(60));
  for (const example of goodExamples.slice(0, 5)) {
    console.log(`\nKanji: ${example.kanji} (Level ${example.level})`);
    console.log(`Type: ${example.type}`);
    console.log(`Mnemonic: ${example.mnemonic}`);
  }
  console.log();

  // Get some detailed good examples directly
  console.log("\nDETAILED GOOD EXAMPLES (full mnemonics):");
  console.log("-".repeat(60));

  // Find kanji with the longest, most detailed mnemonics
  const detailedKanji = allKanji
    .filter(k => k.meaningMnemonicFr.length > 200)
    .sort((a, b) => b.meaningMnemonicFr.length - a.meaningMnemonicFr.length)
    .slice(0, 3);

  for (const kanji of detailedKanji) {
    console.log(`\nKanji: ${kanji.character} (Level ${kanji.levelId})`);
    console.log(`Meanings: ${kanji.meaningsFr.join(', ')}`);
    console.log(`On'yomi: ${kanji.readingsOn.join(', ')}`);
    console.log(`Kun'yomi: ${kanji.readingsKun.join(', ')}`);
    console.log(`\nMeaning Mnemonic (${kanji.meaningMnemonicFr.length} chars):`);
    console.log(kanji.meaningMnemonicFr);
    console.log(`\nReading Mnemonic (${kanji.readingMnemonicFr.length} chars):`);
    console.log(kanji.readingMnemonicFr);
    console.log("-".repeat(40));
  }

  if (problematicExamples.length > 0) {
    console.log("\n\nPROBLEMATIC EXAMPLES (issues found):");
    console.log("-".repeat(60));
    for (const example of problematicExamples.slice(0, 5)) {
      console.log(`\nKanji: ${example.kanji} (Level ${example.level})`);
      console.log(`Issue: ${example.issue}`);
      console.log(`Mnemonic: ${example.mnemonic}`);
    }
  }
  console.log();

  // Find shortest mnemonics
  console.log("\nSHORTEST MNEMONICS (potential issues):");
  console.log("-".repeat(60));
  const shortestMeaning = allKanji
    .sort((a, b) => a.meaningMnemonicFr.length - b.meaningMnemonicFr.length)
    .slice(0, 3);

  for (const kanji of shortestMeaning) {
    console.log(`\nKanji: ${kanji.character} (Level ${kanji.levelId})`);
    console.log(`Meaning mnemonic (${kanji.meaningMnemonicFr.length} chars): ${kanji.meaningMnemonicFr}`);
    console.log(`Reading mnemonic (${kanji.readingMnemonicFr.length} chars): ${kanji.readingMnemonicFr}`);
  }

  // 6. SUMMARY
  console.log();
  console.log("=".repeat(80));
  console.log("6. QUALITY SUMMARY");
  console.log("=".repeat(80));
  console.log();

  const qualityScore = {
    culturalRelevance: totalCulturalRefs > 0 ? 'NEEDS IMPROVEMENT' : 'POOR',
    vividness: (vividStoriesCount / 50 * 100) > 70 ? 'GOOD' : 'NEEDS IMPROVEMENT',
    visualExplanation: (visualComponentsCount / 50 * 100) > 60 ? 'GOOD' : 'NEEDS IMPROVEMENT',
    lengthQuality: avgMeaningLength > 100 ? 'GOOD' : 'NEEDS IMPROVEMENT',
    readingCoverage: (hasOnYomiExplanation / allKanji.length * 100) > 70 ? 'GOOD' : 'NEEDS IMPROVEMENT'
  };

  console.log("Quality Scores:");
  console.log(`  - French Cultural Relevance: ${qualityScore.culturalRelevance}`);
  console.log(`  - Story Vividness: ${qualityScore.vividness} (${(vividStoriesCount/50*100).toFixed(0)}% with narrative elements)`);
  console.log(`  - Visual Component Explanation: ${qualityScore.visualExplanation} (${(visualComponentsCount/50*100).toFixed(0)}%)`);
  console.log(`  - Mnemonic Length Quality: ${qualityScore.lengthQuality} (avg ${avgMeaningLength.toFixed(0)} chars)`);
  console.log(`  - Reading Coverage: ${qualityScore.readingCoverage} (${(hasOnYomiExplanation/allKanji.length*100).toFixed(0)}%)`);
  console.log();

  console.log("RECOMMENDATIONS:");
  if (totalCulturalRefs < 50) {
    console.log("  1. Add more French cultural references (Paris, baguettes, Napoleon, etc.)");
    console.log("     to make mnemonics more relatable for French speakers.");
  }
  if (frenchPhoneticCount < 25) {
    console.log("  2. Include more French phonetic similarities for readings.");
    console.log("     (e.g., 'sonne comme le mot français...')");
  }
  if (avgMeaningLength < 150) {
    console.log("  3. Expand shorter mnemonics with more vivid details and stories.");
  }
  console.log();

  await prisma.$disconnect();
}

main().catch(console.error);
