import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./db";

// Lazy-load Anthropic client
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

export type PatternType =
  | "visual_confusion"
  | "reading_confusion"
  | "translation_nuance";

export interface WeaknessPattern {
  patternType: PatternType;
  description: string;
  affectedItems: { type: string; id: number; character: string }[];
  mistakeCount: number;
  severity: number;
}

interface MistakeGroup {
  itemType: string;
  itemId: number;
  character: string;
  reviewType: string;
  wrongAnswers: string[];
  correctAnswers: string[];
  count: number;
}

/**
 * Fetch recent mistakes for a user
 */
async function getRecentMistakes(
  userId: string,
  limit: number = 100
): Promise<MistakeGroup[]> {
  const mistakes = await prisma.reviewMistake.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  // Group mistakes by item
  const groups = new Map<string, MistakeGroup>();

  for (const mistake of mistakes) {
    const key = `${mistake.itemType}-${mistake.itemId}-${mistake.reviewType}`;

    if (!groups.has(key)) {
      groups.set(key, {
        itemType: mistake.itemType,
        itemId: mistake.itemId,
        character: "", // Will be filled later
        reviewType: mistake.reviewType,
        wrongAnswers: [],
        correctAnswers: mistake.correctAnswers,
        count: 0,
      });
    }

    const group = groups.get(key)!;
    group.wrongAnswers.push(mistake.userAnswer);
    group.count++;
  }

  // Fetch characters for each item
  const itemsToFetch = Array.from(groups.values());

  const radicalIds = itemsToFetch
    .filter((i) => i.itemType === "radical")
    .map((i) => i.itemId);
  const kanjiIds = itemsToFetch
    .filter((i) => i.itemType === "kanji")
    .map((i) => i.itemId);
  const vocabIds = itemsToFetch
    .filter((i) => i.itemType === "vocabulary")
    .map((i) => i.itemId);

  const [radicals, kanji, vocabulary] = await Promise.all([
    radicalIds.length > 0
      ? prisma.radical.findMany({
          where: { id: { in: radicalIds } },
          select: { id: true, character: true, meaningFr: true },
        })
      : [],
    kanjiIds.length > 0
      ? prisma.kanji.findMany({
          where: { id: { in: kanjiIds } },
          select: { id: true, character: true },
        })
      : [],
    vocabIds.length > 0
      ? prisma.vocabulary.findMany({
          where: { id: { in: vocabIds } },
          select: { id: true, word: true },
        })
      : [],
  ]);

  // Map characters
  const radicalMap = new Map(radicals.map((r) => [r.id, r.character || `[${r.meaningFr}]`]));
  const kanjiMap = new Map(kanji.map((k) => [k.id, k.character]));
  const vocabMap = new Map(vocabulary.map((v) => [v.id, v.word]));

  for (const group of groups.values()) {
    if (group.itemType === "radical") {
      group.character = radicalMap.get(group.itemId) || "?";
    } else if (group.itemType === "kanji") {
      group.character = kanjiMap.get(group.itemId) || "?";
    } else if (group.itemType === "vocabulary") {
      group.character = vocabMap.get(group.itemId) || "?";
    }
  }

  return Array.from(groups.values()).filter((g) => g.count >= 2);
}

/**
 * Detect visual confusion patterns (similar-looking kanji)
 */
function detectVisualConfusion(mistakes: MistakeGroup[]): WeaknessPattern | null {
  // Find kanji mistakes where user answered with another kanji's meaning/reading
  const kanjiMistakes = mistakes.filter(
    (m) => m.itemType === "kanji" && m.count >= 2
  );

  if (kanjiMistakes.length < 2) return null;

  // Look for pairs where wrong answer matches another item's correct answer
  const confusedPairs: { a: MistakeGroup; b: MistakeGroup; count: number }[] = [];

  for (let i = 0; i < kanjiMistakes.length; i++) {
    for (let j = i + 1; j < kanjiMistakes.length; j++) {
      const a = kanjiMistakes[i];
      const b = kanjiMistakes[j];

      // Check if user confused a for b or b for a
      const aWrongMatchesB = a.wrongAnswers.some((wa) =>
        b.correctAnswers.some(
          (cb) => wa.toLowerCase().trim() === cb.toLowerCase().trim()
        )
      );
      const bWrongMatchesA = b.wrongAnswers.some((wb) =>
        a.correctAnswers.some(
          (ca) => wb.toLowerCase().trim() === ca.toLowerCase().trim()
        )
      );

      if (aWrongMatchesB || bWrongMatchesA) {
        confusedPairs.push({ a, b, count: a.count + b.count });
      }
    }
  }

  if (confusedPairs.length === 0) return null;

  // Sort by confusion count
  confusedPairs.sort((x, y) => y.count - x.count);
  const topPairs = confusedPairs.slice(0, 3);

  const affectedItems: { type: string; id: number; character: string }[] = [];
  const seenIds = new Set<string>();

  for (const pair of topPairs) {
    const keyA = `${pair.a.itemType}-${pair.a.itemId}`;
    const keyB = `${pair.b.itemType}-${pair.b.itemId}`;

    if (!seenIds.has(keyA)) {
      seenIds.add(keyA);
      affectedItems.push({
        type: pair.a.itemType,
        id: pair.a.itemId,
        character: pair.a.character,
      });
    }
    if (!seenIds.has(keyB)) {
      seenIds.add(keyB);
      affectedItems.push({
        type: pair.b.itemType,
        id: pair.b.itemId,
        character: pair.b.character,
      });
    }
  }

  const totalMistakes = topPairs.reduce((sum, p) => sum + p.count, 0);

  return {
    patternType: "visual_confusion",
    description: "", // Will be filled by AI
    affectedItems,
    mistakeCount: totalMistakes,
    severity: Math.min(totalMistakes / 20, 1),
  };
}

/**
 * Detect reading confusion patterns
 */
function detectReadingConfusion(mistakes: MistakeGroup[]): WeaknessPattern | null {
  const readingMistakes = mistakes.filter(
    (m) => m.reviewType === "reading" && m.count >= 2
  );

  if (readingMistakes.length < 2) return null;

  // Find items where user gave a valid reading but wrong one
  const affectedItems: { type: string; id: number; character: string }[] = [];
  let totalCount = 0;

  for (const mistake of readingMistakes) {
    // Check if wrong answers look like valid hiragana/romaji
    const hasReadingLikeAnswers = mistake.wrongAnswers.some(
      (wa) => /^[a-z]+$/i.test(wa) || /^[\u3040-\u309f]+$/.test(wa)
    );

    if (hasReadingLikeAnswers && mistake.count >= 2) {
      affectedItems.push({
        type: mistake.itemType,
        id: mistake.itemId,
        character: mistake.character,
      });
      totalCount += mistake.count;
    }
  }

  if (affectedItems.length < 2) return null;

  return {
    patternType: "reading_confusion",
    description: "",
    affectedItems: affectedItems.slice(0, 6),
    mistakeCount: totalCount,
    severity: Math.min(totalCount / 15, 1),
  };
}

/**
 * Detect translation nuance patterns
 */
function detectTranslationNuance(mistakes: MistakeGroup[]): WeaknessPattern | null {
  const meaningMistakes = mistakes.filter(
    (m) => m.reviewType === "meaning" && m.count >= 2
  );

  if (meaningMistakes.length < 2) return null;

  // Find items where user gave French words that are close but not accepted
  const affectedItems: { type: string; id: number; character: string }[] = [];
  let totalCount = 0;

  for (const mistake of meaningMistakes) {
    // Check if wrong answers look like French words (not typos)
    const hasPlausibleAnswers = mistake.wrongAnswers.some(
      (wa) => wa.length >= 3 && /^[a-zéèêëàâäùûüôöîïç\s]+$/i.test(wa)
    );

    if (hasPlausibleAnswers && mistake.count >= 2) {
      affectedItems.push({
        type: mistake.itemType,
        id: mistake.itemId,
        character: mistake.character,
      });
      totalCount += mistake.count;
    }
  }

  if (affectedItems.length < 2) return null;

  return {
    patternType: "translation_nuance",
    description: "",
    affectedItems: affectedItems.slice(0, 6),
    mistakeCount: totalCount,
    severity: Math.min(totalCount / 15, 1),
  };
}

/**
 * Generate AI description for a pattern
 */
async function generatePatternDescription(
  pattern: WeaknessPattern,
  mistakes: MistakeGroup[]
): Promise<string> {
  const anthropic = getAnthropicClient();

  const relevantMistakes = mistakes.filter((m) =>
    pattern.affectedItems.some(
      (item) => item.type === m.itemType && item.id === m.itemId
    )
  );

  // Build detailed confusion pairs for visual confusion
  let promptContent = "";

  if (pattern.patternType === "visual_confusion") {
    // Find actual confusion pairs (A answered with B's meaning)
    const confusionPairs: string[] = [];
    for (let i = 0; i < relevantMistakes.length; i++) {
      for (let j = i + 1; j < relevantMistakes.length; j++) {
        const a = relevantMistakes[i];
        const b = relevantMistakes[j];

        const aConfusedWithB = a.wrongAnswers.some((wa) =>
          b.correctAnswers.some((cb) => wa.toLowerCase().includes(cb.toLowerCase()) || cb.toLowerCase().includes(wa.toLowerCase()))
        );
        const bConfusedWithA = b.wrongAnswers.some((wb) =>
          a.correctAnswers.some((ca) => wb.toLowerCase().includes(ca.toLowerCase()) || ca.toLowerCase().includes(wb.toLowerCase()))
        );

        if (aConfusedWithB || bConfusedWithA) {
          confusionPairs.push(
            `${a.character} (${a.correctAnswers[0]}) <-> ${b.character} (${b.correctAnswers[0]})`
          );
        }
      }
    }

    promptContent = `L'élève confond ces paires de kanji visuellement similaires:
${confusionPairs.length > 0 ? confusionPairs.slice(0, 3).join("\n") : relevantMistakes.slice(0, 4).map(m => `${m.character} (${m.correctAnswers[0]})`).join(", ")}

Pour chaque paire, donne UNE difference visuelle CONCRETE et SPECIFIQUE (ex: "大 a un trait horizontal en plus que 犬" ou "水 a des gouttes sur les cotes, 氷 a un point en haut").`;

  } else if (pattern.patternType === "reading_confusion") {
    const readingDetails = relevantMistakes.slice(0, 4).map((m) => {
      const wrongReadings = [...new Set(m.wrongAnswers)].slice(0, 2).join(", ");
      return `${m.character}: a ecrit "${wrongReadings}" au lieu de "${m.correctAnswers.slice(0, 2).join("/")}"`;
    });

    promptContent = `L'élève se trompe sur les lectures de ces kanji:
${readingDetails.join("\n")}

Identifie le pattern spécifique (confond on'yomi/kun'yomi? melange des lectures similaires?) et donne UN conseil CONCRET pour ces kanji précis.`;

  } else if (pattern.patternType === "translation_nuance") {
    const translationDetails = relevantMistakes.slice(0, 4).map((m) => {
      const wrongAnswers = [...new Set(m.wrongAnswers)].slice(0, 2).join(", ");
      return `${m.character}: a repondu "${wrongAnswers}" au lieu de "${m.correctAnswers[0]}"`;
    });

    promptContent = `L'élève confond ces nuances de sens:
${translationDetails.join("\n")}

Explique la difference de sens PRECISE entre ce que l'élève a repondu et la bonne réponse. Par exemple, si il confond "grand" et "gros", explique quand utiliser chaque terme en japonais.`;
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    system: `Tu es un tuteur de japonais expert. Tu donnes des conseils ULTRA-SPECIFIQUES bases sur les erreurs exactes de l'élève.

REGLES STRICTES:
1. NE DIS JAMAIS "créé des mnémoniques" ou "utilise des associations" - l'app a déjà des mnémoniques
2. Donne des differences CONCRETES et VISUELLES spécifiques aux kanji mentionnes
3. Maximum 2-3 phrases, va droit au but
4. Commence directement par le conseil, pas de "Je vois que..." ou "Tu sembles..."
5. Utilise les caracteres japonais dans ta réponse pour illustrer
6. Sois précis: "le trait du haut" > "les éléments"`,
    messages: [
      {
        role: "user",
        content: promptContent,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return textBlock.text;
}

/**
 * Analyze patterns for a user and save to database
 */
export async function analyzeUserPatterns(userId: string): Promise<WeaknessPattern[]> {
  const mistakes = await getRecentMistakes(userId);

  if (mistakes.length < 5) {
    return [];
  }

  const patterns: WeaknessPattern[] = [];

  // Detect different pattern types
  const visualPattern = detectVisualConfusion(mistakes);
  if (visualPattern) patterns.push(visualPattern);

  const readingPattern = detectReadingConfusion(mistakes);
  if (readingPattern) patterns.push(readingPattern);

  const translationPattern = detectTranslationNuance(mistakes);
  if (translationPattern) patterns.push(translationPattern);

  // Generate AI descriptions for detected patterns
  for (const pattern of patterns) {
    try {
      pattern.description = await generatePatternDescription(pattern, mistakes);
    } catch (err) {
      console.error("Failed to generate pattern description:", err);
      // Use fallback descriptions with specific characters
      const chars = pattern.affectedItems.slice(0, 4).map(i => i.character).join(", ");
      switch (pattern.patternType) {
        case "visual_confusion":
          pattern.description =
            `Compare attentivement les traits de ${chars}. Cherche le detail qui les differencie (un point, un trait horizontal, une courbe).`;
          break;
        case "reading_confusion":
          pattern.description =
            `Pour ${chars}, verifie si tu melanges les lectures on'yomi et kun'yomi. Revois chaque lecture individuellement.`;
          break;
        case "translation_nuance":
          pattern.description =
            `Les sens de ${chars} sont proches mais distincts. Relis les exemples de phrases pour comprendre le contexte d'usage.`;
          break;
      }
    }
  }

  // Save patterns to database
  if (patterns.length > 0) {
    // Delete old patterns for this user
    await prisma.userWeaknessPattern.deleteMany({
      where: { userId },
    });

    // Insert new patterns
    await prisma.userWeaknessPattern.createMany({
      data: patterns.map((p) => ({
        userId,
        patternType: p.patternType,
        description: p.description,
        affectedItems: p.affectedItems,
        mistakeCount: p.mistakeCount,
        severity: p.severity,
      })),
    });

    // Update user's last analysis time
    await prisma.user.update({
      where: { id: userId },
      data: { lastPatternAnalysis: new Date() },
    });
  }

  return patterns;
}

/**
 * Get cached patterns for a user
 */
export async function getCachedPatterns(userId: string): Promise<WeaknessPattern[]> {
  const patterns = await prisma.userWeaknessPattern.findMany({
    where: { userId },
    orderBy: { severity: "desc" },
  });

  return patterns.map((p) => ({
    patternType: p.patternType as PatternType,
    description: p.description,
    affectedItems: p.affectedItems as { type: string; id: number; character: string }[],
    mistakeCount: p.mistakeCount,
    severity: p.severity,
  }));
}

/**
 * Check if user needs pattern analysis
 */
export async function shouldAnalyzePatterns(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastPatternAnalysis: true },
  });

  if (!user) return false;

  // Analyze if never done or more than 24h ago
  if (!user.lastPatternAnalysis) return true;

  const hoursSinceAnalysis =
    (Date.now() - user.lastPatternAnalysis.getTime()) / (1000 * 60 * 60);

  return hoursSinceAnalysis >= 24;
}

/**
 * Get mistake count since last analysis
 */
export async function getMistakeCountSinceAnalysis(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { lastPatternAnalysis: true },
  });

  const since = user?.lastPatternAnalysis || new Date(0);

  const count = await prisma.reviewMistake.count({
    where: {
      userId,
      createdAt: { gt: since },
    },
  });

  return count;
}
