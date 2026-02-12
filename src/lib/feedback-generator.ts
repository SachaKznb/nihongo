import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./db";
import type { ItemType } from "@/types";

// Lazy-load Anthropic client
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

export interface FeedbackContext {
  itemType: ItemType;
  itemId: number;
  reviewType: "meaning" | "reading";
  userAnswer: string;
  correctAnswers: string[];
  character: string;
  meaningsFr?: string[];
  readingsOn?: string[];
  readingsKun?: string[];
  readings?: string[];
  radicals?: { character: string | null; meaningFr: string }[];
}

/**
 * Normalize a wrong answer for caching purposes
 * Lowercase, remove accents, trim whitespace
 */
export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .trim()
    .substring(0, 50); // Limit length for cache key
}

/**
 * Calculate Levenshtein distance between two strings
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Check if we should generate AI feedback for this mistake
 */
export function shouldGenerateFeedback(
  userAnswer: string,
  correctAnswers: string[],
  srsStage: number
): boolean {
  // Only for items user has seen multiple times (stage 3+)
  if (srsStage < 3) {
    return false;
  }

  // Check if it's just a typo (Levenshtein distance <= 3)
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  for (const correct of correctAnswers) {
    const normalizedCorrect = normalizeAnswer(correct);
    const distance = levenshteinDistance(normalizedUserAnswer, normalizedCorrect);
    if (distance <= 3 && distance > 0) {
      // It's a typo, not worth AI feedback
      return false;
    }
  }

  return true;
}

/**
 * Get cached feedback for this mistake pattern
 */
export async function getCachedFeedback(
  itemType: string,
  itemId: number,
  reviewType: string,
  userAnswer: string
): Promise<string | null> {
  const normalizedAnswer = normalizeAnswer(userAnswer);

  const cached = await prisma.mistakeFeedbackCache.findUnique({
    where: {
      itemType_itemId_reviewType_wrongAnswerPattern: {
        itemType,
        itemId,
        reviewType,
        wrongAnswerPattern: normalizedAnswer,
      },
    },
  });

  if (cached) {
    // Increment usage count (fire and forget)
    prisma.mistakeFeedbackCache
      .update({
        where: { id: cached.id },
        data: { usageCount: { increment: 1 } },
      })
      .catch(() => {}); // Ignore errors

    return cached.feedback;
  }

  return null;
}

/**
 * Save feedback to cache
 */
export async function saveFeedbackToCache(
  itemType: string,
  itemId: number,
  reviewType: string,
  userAnswer: string,
  feedback: string
): Promise<void> {
  const normalizedAnswer = normalizeAnswer(userAnswer);

  await prisma.mistakeFeedbackCache.upsert({
    where: {
      itemType_itemId_reviewType_wrongAnswerPattern: {
        itemType,
        itemId,
        reviewType,
        wrongAnswerPattern: normalizedAnswer,
      },
    },
    update: {
      feedback,
      usageCount: { increment: 1 },
    },
    create: {
      itemType,
      itemId,
      reviewType,
      wrongAnswerPattern: normalizedAnswer,
      feedback,
    },
  });
}

/**
 * Store a mistake in the database for pattern analysis
 */
export async function storeMistake(
  userId: string,
  itemType: string,
  itemId: number,
  reviewType: string,
  userAnswer: string,
  correctAnswers: string[],
  feedbackShown?: string
): Promise<void> {
  await prisma.reviewMistake.create({
    data: {
      userId,
      itemType,
      itemId,
      reviewType,
      userAnswer,
      correctAnswers,
      feedbackShown,
    },
  });
}

/**
 * Build the system prompt for feedback generation
 */
function buildSystemPrompt(): string {
  return `Tu es un tuteur de japonais bienveillant pour francophones. Ton role est d'expliquer brievement pourquoi l'élève s'est trompe et comment retenir la bonne réponse.

REGLES:
1. Ecris TOUJOURS en francais
2. Maximum 1-3 phrases, sois TRES CONCIS
3. Commence de maniere naturelle, comme "Ah," ou "Attention," ou "Le truc,"
4. Explique la confusion courante si applicable (kanji similaires, lectures proches, etc.)
5. Donne un indice memorisable si possible
6. Ton amical et encourageant, jamais condescendant
7. N'utilise pas de tirets doubles (--)
8. Ne pose pas de questions rhetoriques

FORMAT: Retourne UNIQUEMENT l'explication, sans introduction formelle.`;
}

/**
 * Build the user prompt for feedback generation
 */
function buildUserPrompt(context: FeedbackContext): string {
  const { itemType, reviewType, userAnswer, correctAnswers, character } = context;

  let itemDescription = "";
  let contextInfo = "";

  if (itemType === "radical") {
    itemDescription = `Radical: ${character}`;
    if (context.meaningsFr) {
      contextInfo = `Signification: ${context.meaningsFr.join(", ")}`;
    }
  } else if (itemType === "kanji") {
    itemDescription = `Kanji: ${character}`;
    if (context.meaningsFr) {
      contextInfo += `Significations: ${context.meaningsFr.join(", ")}\n`;
    }
    if (context.readingsOn && context.readingsOn.length > 0) {
      contextInfo += `Lectures On'yomi: ${context.readingsOn.join(", ")}\n`;
    }
    if (context.readingsKun && context.readingsKun.length > 0) {
      contextInfo += `Lectures Kun'yomi: ${context.readingsKun.join(", ")}\n`;
    }
    if (context.radicals && context.radicals.length > 0) {
      const radicalList = context.radicals
        .map((r) => `${r.character || "?"} (${r.meaningFr})`)
        .join(", ");
      contextInfo += `Radicaux: ${radicalList}`;
    }
  } else if (itemType === "vocabulary") {
    itemDescription = `Vocabulaire: ${character}`;
    if (context.meaningsFr) {
      contextInfo += `Significations: ${context.meaningsFr.join(", ")}\n`;
    }
    if (context.readings && context.readings.length > 0) {
      contextInfo += `Lectures: ${context.readings.join(", ")}`;
    }
  }

  const questionType = reviewType === "meaning" ? "la signification" : "la lecture";

  return `L'élève devait donner ${questionType} de cet élément:
${itemDescription}
${contextInfo}

Question: ${reviewType === "meaning" ? "Signification en francais" : "Lecture en hiragana"}
Réponse de l'élève: "${userAnswer}"
Bonne(s) réponse(s): "${correctAnswers.join('" ou "')}"

Explique brievement pourquoi cette erreur est courante et comment retenir la bonne réponse.`;
}

/**
 * Generate AI feedback for a mistake
 */
export async function generateFeedback(
  context: FeedbackContext
): Promise<string> {
  const anthropic = getAnthropicClient();
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(context);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 200,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return textBlock.text;
}

/**
 * Get feedback for a mistake (with caching)
 * Returns null if feedback should be skipped
 */
export async function getFeedbackForMistake(
  context: FeedbackContext,
  srsStage: number
): Promise<{ feedback: string; fromCache: boolean } | null> {
  // Check if we should generate feedback
  if (!shouldGenerateFeedback(context.userAnswer, context.correctAnswers, srsStage)) {
    return null;
  }

  // Check cache first
  const cached = await getCachedFeedback(
    context.itemType,
    context.itemId,
    context.reviewType,
    context.userAnswer
  );

  if (cached) {
    return { feedback: cached, fromCache: true };
  }

  // Generate new feedback
  const feedback = await generateFeedback(context);

  // Save to cache (fire and forget)
  saveFeedbackToCache(
    context.itemType,
    context.itemId,
    context.reviewType,
    context.userAnswer,
    feedback
  ).catch((err) => console.error("Failed to cache feedback:", err));

  return { feedback, fromCache: false };
}
