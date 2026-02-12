import Anthropic from "@anthropic-ai/sdk";
import crypto from "crypto";
import { prisma } from "./db";
import { GURU_THRESHOLD } from "./unlocks";
import type {
  SentenceData,
  MasteredContext,
  VocabularyDetails,
} from "@/types/sentences";

// Lazy-load Anthropic client
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

/**
 * Fetch user's mastered kanji and vocabulary (Guru+ stage)
 */
export async function fetchMasteredContext(
  userId: string
): Promise<MasteredContext> {
  const [kanjiProgress, vocabProgress] = await Promise.all([
    prisma.userKanjiProgress.findMany({
      where: { userId, srsStage: { gte: GURU_THRESHOLD } },
      include: {
        kanji: {
          select: {
            character: true,
            meaningsFr: true,
            readingsOn: true,
            readingsKun: true,
          },
        },
      },
      take: 50, // Limit to avoid token explosion
    }),
    prisma.userVocabularyProgress.findMany({
      where: { userId, srsStage: { gte: GURU_THRESHOLD } },
      include: {
        vocabulary: {
          select: {
            word: true,
            meaningsFr: true,
            readings: true,
          },
        },
      },
      take: 30, // Limit vocab context
    }),
  ]);

  return {
    kanji: kanjiProgress.map((kp) => ({
      character: kp.kanji.character,
      meaningsFr: kp.kanji.meaningsFr,
      readingsOn: kp.kanji.readingsOn,
      readingsKun: kp.kanji.readingsKun,
    })),
    vocabulary: vocabProgress.map((vp) => ({
      word: vp.vocabulary.word,
      meaningsFr: vp.vocabulary.meaningsFr,
      readings: vp.vocabulary.readings,
    })),
  };
}

/**
 * Compute a hash of mastered kanji for cache invalidation
 */
export function computeMasteredHash(context: MasteredContext): string {
  const kanjiChars = context.kanji
    .map((k) => k.character)
    .sort()
    .join("");
  return crypto.createHash("md5").update(kanjiChars).digest("hex").substring(0, 16);
}

/**
 * Check if cached sentences are stale (mastered items changed significantly)
 */
export function isCacheStale(
  cachedHash: string,
  cachedVocabCount: number,
  currentContext: MasteredContext
): boolean {
  const currentHash = computeMasteredHash(currentContext);
  const currentVocabCount = currentContext.vocabulary.length;

  // Consider stale if kanji hash changed or vocab count changed by >20%
  if (cachedHash !== currentHash) return true;
  if (cachedVocabCount === 0 && currentVocabCount > 0) return true;
  if (cachedVocabCount > 0) {
    const changePercent =
      Math.abs(currentVocabCount - cachedVocabCount) / cachedVocabCount;
    if (changePercent > 0.2) return true;
  }

  return false;
}

/**
 * Get cached sentences for a vocabulary item
 */
export async function getCachedSentences(
  userId: string,
  vocabularyId: number
): Promise<{ sentences: SentenceData[]; isStale: boolean } | null> {
  const cached = await prisma.userSentenceCache.findUnique({
    where: {
      userId_vocabularyId: { userId, vocabularyId },
    },
  });

  if (!cached) return null;

  const currentContext = await fetchMasteredContext(userId);
  const isStale = isCacheStale(
    cached.masteredKanjiHash,
    cached.masteredVocabCount,
    currentContext
  );

  return {
    sentences: cached.sentences as unknown as SentenceData[],
    isStale,
  };
}

/**
 * Save generated sentences to cache
 */
export async function cacheSentences(
  userId: string,
  vocabularyId: number,
  sentences: SentenceData[],
  context: MasteredContext
): Promise<void> {
  const hash = computeMasteredHash(context);

  await prisma.userSentenceCache.upsert({
    where: {
      userId_vocabularyId: { userId, vocabularyId },
    },
    update: {
      sentences: sentences as unknown as object,
      masteredKanjiHash: hash,
      masteredVocabCount: context.vocabulary.length,
      updatedAt: new Date(),
    },
    create: {
      userId,
      vocabularyId,
      sentences: sentences as unknown as object,
      masteredKanjiHash: hash,
      masteredVocabCount: context.vocabulary.length,
    },
  });
}

/**
 * Fetch vocabulary details with component kanji
 */
export async function fetchVocabularyDetails(
  vocabularyId: number
): Promise<VocabularyDetails | null> {
  const vocab = await prisma.vocabulary.findUnique({
    where: { id: vocabularyId },
    select: {
      id: true,
      word: true,
      meaningsFr: true,
      readings: true,
      sentenceJp: true,
      sentenceFr: true,
      kanji: {
        select: {
          kanji: {
            select: {
              character: true,
              meaningsFr: true,
            },
          },
        },
      },
    },
  });

  if (!vocab) return null;

  return {
    id: vocab.id,
    word: vocab.word,
    meaningsFr: vocab.meaningsFr,
    readings: vocab.readings,
    sentenceJp: vocab.sentenceJp,
    sentenceFr: vocab.sentenceFr,
    kanji: vocab.kanji.map((k) => ({
      character: k.kanji.character,
      meaningsFr: k.kanji.meaningsFr,
    })),
  };
}

/**
 * Build the system prompt for sentence generation
 */
function buildSystemPrompt(): string {
  return `Tu es un expert en création de phrases d'exemple pour l'apprentissage du japonais destiné aux francophones.

RÈGLES CRITIQUES:
1. Utilise UNIQUEMENT les kanji et vocabulaire fournis dans "ÉLÉMENTS MAÎTRISÉS"
2. Les autres mots doivent être écrits en HIRAGANA (pas de kanji inconnus)
3. Génère exactement 2-3 phrases par demande
4. Chaque phrase doit utiliser le mot cible de manière naturelle
5. Progresse en complexité: simple -> naturel -> combiné (si possible)

FORMAT DE SORTIE (JSON STRICT):
{
  "sentences": [
    {
      "japanese": "phrase complète en japonais",
      "segments": [
        {"text": "漢字", "reading": "かんじ"},
        {"text": "を", "reading": null},
        {"text": "書", "reading": "か"},
        {"text": "きます", "reading": null}
      ],
      "translation": "Traduction en français",
      "complexity": "simple",
      "grammarNotes": [
        {"pattern": "を", "explanation": "Particule marquant l'objet direct"}
      ]
    }
  ]
}

RÈGLES POUR LES SEGMENTS:
- Chaque segment contient "text" (le texte affiché) et "reading" (furigana ou null)
- Les kanji individuels ou mots kanji ont un "reading" en hiragana
- Les particules et hiragana ont "reading": null
- Découpe intelligemment: garde les mots ensemble quand possible

NIVEAUX DE COMPLEXITÉ:
- "simple": Structure S-O-V basique, temps présent, phrase courte
- "natural": Conjugaisons variées, connecteurs simples, contexte réaliste
- "combined": Combine plusieurs mots maîtrisés, structures plus élaborées

NOTES DE GRAMMAIRE:
- Ajoute des notes UNIQUEMENT pour les patterns que l'utilisateur pourrait ne pas connaître
- Particules de base (は, が, を, に, で) -> pas de note sauf usage inhabituel
- Conjugaisons (ます, ている, た) -> note brève si pertinent
- Maximum 2 notes par phrase

IMPORTANT: Retourne UNIQUEMENT le JSON valide, sans markdown ni texte additionnel.`;
}

/**
 * Build the user prompt with vocabulary and mastered context
 */
function buildUserPrompt(
  vocabulary: VocabularyDetails,
  context: MasteredContext,
  userLevel: number
): string {
  // Format mastered kanji list
  const kanjiList =
    context.kanji.length > 0
      ? context.kanji
          .slice(0, 30)
          .map(
            (k) =>
              `${k.character} (${k.meaningsFr[0]}, lectures: ${[...k.readingsKun, ...k.readingsOn].slice(0, 3).join(", ")})`
          )
          .join("\n  ")
      : "Aucun kanji maîtrisé encore";

  // Format mastered vocabulary list
  const vocabList =
    context.vocabulary.length > 0
      ? context.vocabulary
          .slice(0, 20)
          .map((v) => `${v.word} (${v.meaningsFr[0]})`)
          .join(", ")
      : "Aucun vocabulaire maîtrisé encore";

  // Determine number of sentences based on level
  const sentenceCount = userLevel >= 5 ? 3 : 2;
  const complexityInstruction =
    userLevel >= 5
      ? "Génère 3 phrases (simple, naturel, combiné)"
      : "Génère 2 phrases (simple, naturel)";

  return `MOT CIBLE:
- Mot: ${vocabulary.word}
- Signification: ${vocabulary.meaningsFr.join(", ")}
- Lecture: ${vocabulary.readings.join(", ")}
${vocabulary.kanji.length > 0 ? `- Kanji composants: ${vocabulary.kanji.map((k) => `${k.character} (${k.meaningsFr[0]})`).join(", ")}` : ""}

ÉLÉMENTS MAÎTRISÉS PAR L'UTILISATEUR:
Kanji (${context.kanji.length} maîtrisés):
  ${kanjiList}

Vocabulaire (${context.vocabulary.length} maîtrisés):
  ${vocabList}

NIVEAU DE L'UTILISATEUR: ${userLevel}
${complexityInstruction}

Génère des phrases d'exemple en utilisant UNIQUEMENT ces éléments maîtrisés + le mot cible.
Les mots non maîtrisés doivent être en hiragana.`;
}

/**
 * Parse and validate the AI response
 */
function parseAIResponse(response: string): SentenceData[] {
  try {
    // Try to extract JSON from the response
    let jsonStr = response.trim();

    // Handle potential markdown code blocks
    if (jsonStr.startsWith("```")) {
      const match = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) {
        jsonStr = match[1].trim();
      }
    }

    const parsed = JSON.parse(jsonStr);

    if (!parsed.sentences || !Array.isArray(parsed.sentences)) {
      throw new Error("Invalid response structure: missing sentences array");
    }

    // Validate each sentence
    return parsed.sentences.map((s: SentenceData) => ({
      japanese: s.japanese || "",
      segments: Array.isArray(s.segments)
        ? s.segments.map((seg) => ({
            text: seg.text || "",
            reading: seg.reading || undefined,
          }))
        : [],
      translation: s.translation || "",
      complexity: s.complexity || "simple",
      grammarNotes: Array.isArray(s.grammarNotes)
        ? s.grammarNotes.map((note) => ({
            pattern: note.pattern || "",
            explanation: note.explanation || "",
          }))
        : undefined,
    }));
  } catch (error) {
    console.error("Failed to parse AI response:", error, response);
    throw new Error("Failed to parse sentence generation response");
  }
}

/**
 * Generate level-aware example sentences using Claude
 */
export async function generateSentences(
  vocabulary: VocabularyDetails,
  context: MasteredContext,
  userLevel: number
): Promise<SentenceData[]> {
  const anthropic = getAnthropicClient();
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(vocabulary, context, userLevel);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500, // More tokens needed for structured JSON response
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return parseAIResponse(textBlock.text);
}

/**
 * Generate fallback sentences when user has very few mastered items
 */
export function generateFallbackSentences(
  vocabulary: VocabularyDetails
): SentenceData[] {
  // If static sentence exists, use it as fallback
  if (vocabulary.sentenceJp && vocabulary.sentenceFr) {
    return [
      {
        japanese: vocabulary.sentenceJp,
        segments: [{ text: vocabulary.sentenceJp }], // Simple single segment
        translation: vocabulary.sentenceFr,
        complexity: "simple",
      },
    ];
  }

  // Generate very simple hiragana-only sentence
  const reading = vocabulary.readings[0] || vocabulary.word;
  return [
    {
      japanese: `${reading}です。`,
      segments: [
        { text: reading },
        { text: "です。" },
      ],
      translation: `C'est "${vocabulary.meaningsFr[0]}".`,
      complexity: "simple",
    },
  ];
}

// Re-export credit functions from mnemonic-generator for consistency
export { checkAndDeductCredit, getUserCredits } from "./mnemonic-generator";
