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

  const mistakeDetails = relevantMistakes
    .map(
      (m) =>
        `- ${m.character} (${m.itemType}): reponses "${m.wrongAnswers.slice(0, 3).join('", "')}" au lieu de "${m.correctAnswers.join('", "')}"`
    )
    .join("\n");

  let patternContext = "";
  switch (pattern.patternType) {
    case "visual_confusion":
      patternContext =
        "L'eleve confond des caracteres qui se ressemblent visuellement.";
      break;
    case "reading_confusion":
      patternContext =
        "L'eleve a du mal avec les lectures (on'yomi/kun'yomi) de certains caracteres.";
      break;
    case "translation_nuance":
      patternContext =
        "L'eleve confond des nuances de traduction en francais.";
      break;
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 150,
    system: `Tu es un tuteur de japonais bienveillant. Tu analyses les erreurs d'un eleve francophone pour lui donner un conseil personnalise.

REGLES:
1. Ecris en francais
2. Maximum 2-3 phrases
3. Sois encourageant, pas condescendant
4. Donne un conseil pratique et memorable`,
    messages: [
      {
        role: "user",
        content: `${patternContext}

Erreurs detectees:
${mistakeDetails}

Ecris une courte explication de ce pattern et un conseil pour s'ameliorer.`,
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
      // Use fallback descriptions
      switch (pattern.patternType) {
        case "visual_confusion":
          pattern.description =
            "Tu confonds parfois des kanji qui se ressemblent. Concentre-toi sur les petites differences.";
          break;
        case "reading_confusion":
          pattern.description =
            "Les lectures de certains kanji te posent probleme. Revise les lectures on'yomi et kun'yomi separement.";
          break;
        case "translation_nuance":
          pattern.description =
            "Certaines nuances de traduction te echappent. Essaie de memoriser le contexte d'utilisation.";
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
