import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { aiGenerationRateLimit, checkRateLimit } from "@/lib/upstash";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateStoryRequest {
  level: number; // JLPT level 1-5
  theme?: string;
}

interface VocabularyUsed {
  id: number;
  word: string;
  meaning: string;
}

interface StoryResponse {
  story: string;
  storyWithFurigana: string;
  translationFr: string;
  vocabularyUsed: VocabularyUsed[];
  level: number;
}

// Theme suggestions in French
const themeExamples: Record<number, string[]> = {
  5: ["vie quotidienne", "famille", "nourriture", "temps", "salutations"],
  4: ["voyage", "shopping", "restaurant", "transports", "loisirs"],
  3: ["travail", "santé", "actualités", "culture", "technologie"],
  2: ["société", "économie", "politique", "environnement", "art"],
  1: ["philosophie", "littérature", "sciences", "histoire", "affaires"],
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Rate limiting
    const rateLimitResult = await checkRateLimit(
      aiGenerationRateLimit,
      `story:${session.user.id}`
    );
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Trop de requêtes. Veuillez réessayer dans quelques instants.",
          retryAfter: rateLimitResult.reset,
        },
        { status: 429 }
      );
    }

    const body: GenerateStoryRequest = await request.json();
    const { level, theme } = body;

    // Validate JLPT level
    if (!level || level < 1 || level > 5) {
      return NextResponse.json(
        { error: "Niveau JLPT invalide. Doit être entre 1 et 5." },
        { status: 400 }
      );
    }

    // Check subscription status - premium feature
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscriptionStatus: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    const isPremium = ["active", "lifetime"].includes(user.subscriptionStatus);
    if (!isPremium) {
      return NextResponse.json(
        {
          error:
            "Cette fonctionnalité est réservée aux membres Premium. Passez à Premium pour générer des histoires de lecture.",
        },
        { status: 403 }
      );
    }

    // Get user's learned vocabulary (SRS stage >= 5 = Guru or higher)
    const learnedVocabulary = await prisma.userVocabularyProgress.findMany({
      where: {
        userId: session.user.id,
        srsStage: { gte: 5 },
      },
      include: {
        vocabulary: {
          select: {
            id: true,
            word: true,
            meaningsFr: true,
            readings: true,
            jlptLevel: true,
          },
        },
      },
      take: 100, // Limit to avoid very long prompts
    });

    if (learnedVocabulary.length < 5) {
      return NextResponse.json(
        {
          error:
            "Vous devez avoir au moins 5 mots de vocabulaire au niveau Guru ou plus pour générer une histoire. Continuez vos révisions !",
        },
        { status: 400 }
      );
    }

    // Filter vocabulary by JLPT level if available, prioritize matching levels
    const vocabForLevel = learnedVocabulary.filter(
      (v) => !v.vocabulary.jlptLevel || v.vocabulary.jlptLevel >= level
    );

    // Use filtered vocab if enough, otherwise use all learned vocab
    const vocabToUse =
      vocabForLevel.length >= 5 ? vocabForLevel : learnedVocabulary;

    // Randomly select 5-10 words to include in the story
    const shuffled = vocabToUse.sort(() => Math.random() - 0.5);
    const selectedVocab = shuffled.slice(0, Math.min(10, shuffled.length));

    // Format vocabulary for the prompt
    const vocabList = selectedVocab
      .map(
        (v) =>
          `- ${v.vocabulary.word} (${v.vocabulary.readings[0]}): ${v.vocabulary.meaningsFr[0]}`
      )
      .join("\n");

    const selectedTheme =
      theme ||
      themeExamples[level][Math.floor(Math.random() * themeExamples[level].length)];

    const prompt = `Tu es un professeur de japonais expert. Génère une courte histoire de lecture en japonais pour un apprenant de niveau JLPT N${level}.

VOCABULAIRE À UTILISER (l'élève a appris ces mots):
${vocabList}

THÈME: ${selectedTheme}

CONSIGNES:
1. Écris une histoire courte (100-200 caractères japonais) adaptée au niveau JLPT N${level}
2. Utilise OBLIGATOIREMENT 5 à 10 mots du vocabulaire fourni ci-dessus
3. Utilise une grammaire appropriée au niveau N${level}
4. L'histoire doit être cohérente et avoir un début, un milieu et une fin

Réponds UNIQUEMENT au format JSON suivant (sans markdown, sans backticks):
{
  "story": "L'histoire en japonais sans furigana",
  "storyWithFurigana": "L'histoire avec furigana pour TOUS les kanji au format HTML ruby: <ruby>漢字<rt>かんじ</rt></ruby>",
  "translationFr": "Traduction française de l'histoire",
  "usedWords": ["mot1", "mot2", "mot3"]
}

IMPORTANT:
- Le JSON doit être valide et parsable
- Utilise des guillemets doubles pour les chaînes
- Échappe les guillemets dans le texte avec \\"
- usedWords contient les mots japonais (caractères) utilisés dans l'histoire`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Format de réponse inattendu");
    }

    // Parse the JSON response
    let parsedResponse: {
      story: string;
      storyWithFurigana: string;
      translationFr: string;
      usedWords: string[];
    };

    try {
      // Clean up potential markdown code blocks
      let jsonText = content.text.trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.slice(7);
      }
      if (jsonText.startsWith("```")) {
        jsonText = jsonText.slice(3);
      }
      if (jsonText.endsWith("```")) {
        jsonText = jsonText.slice(0, -3);
      }
      parsedResponse = JSON.parse(jsonText.trim());
    } catch {
      console.error("Failed to parse AI response:", content.text);
      throw new Error("Erreur lors de l'analyse de la réponse de l'IA");
    }

    // Match used words back to vocabulary items for linking
    const vocabularyUsed: VocabularyUsed[] = selectedVocab
      .filter((v) => parsedResponse.usedWords.includes(v.vocabulary.word))
      .map((v) => ({
        id: v.vocabulary.id,
        word: v.vocabulary.word,
        meaning: v.vocabulary.meaningsFr[0],
      }));

    const result: StoryResponse = {
      story: parsedResponse.story,
      storyWithFurigana: parsedResponse.storyWithFurigana,
      translationFr: parsedResponse.translationFr,
      vocabularyUsed,
      level,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating reading story:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'histoire" },
      { status: 500 }
    );
  }
}
