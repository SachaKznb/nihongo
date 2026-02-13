import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./db";
import { GURU_THRESHOLD } from "./unlocks";
import { withAIRetry } from "./ai-utils";
import type { ItemType } from "@/types";

// Lazy-load Anthropic client
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

interface RadicalDetails {
  character: string | null;
  meaningFr: string;
  meaningHintFr: string | null;
  imageUrl: string | null;
}

interface KanjiDetails {
  character: string;
  meaningsFr: string[];
  readingsOn: string[];
  readingsKun: string[];
  radicals: { radical: { character: string | null; meaningFr: string } }[];
}

interface VocabularyDetails {
  word: string;
  meaningsFr: string[];
  readings: string[];
  kanji: { kanji: { character: string; meaningsFr: string[] } }[];
}

interface LearnedContext {
  radicals: { character: string | null; meaningFr: string }[];
  kanji: { character: string; meaningsFr: string[] }[];
}

interface MnemonicContext {
  item: RadicalDetails | KanjiDetails | VocabularyDetails;
  type: ItemType;
  mnemonicType: "meaning" | "reading";
  learnedContext: LearnedContext;
}

export async function generateMnemonic(context: MnemonicContext): Promise<string> {
  const anthropic = getAnthropicClient();
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(context);

  const response = await withAIRetry(() =>
    anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    })
  );

  const textBlock = response.content.find(block => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }
  return textBlock.text;
}

function buildSystemPrompt(): string {
  return `Tu es un expert en apprentissage du japonais pour les francophones. Tu créés des mnémoniques memorables pour aider a retenir les kanji, radicaux et vocabulaire.

REGLES IMPORTANTES:
1. Ecris TOUJOURS en francais
2. Cree des images mentales VIVANTES, DROLES ou ABSURDES - plus c'est bizarre, mieux c'est
3. Maximum 2-4 phrases, sois CONCIS
4. Utilise des references a la culture francaise quand c'est pertinent (films, celebrites, nourriture, lieux)
5. Cherche des COGNATES ou sons similaires entre le francais et le japonais
6. Si l'utilisateur connaît déjà des radicaux/kanji composants, REUTILISE-LES dans l'histoire
7. Pour les lectures (readings), créé des associations phonetiques avec des mots francais
8. Evite les explications - va droit au mnémonique

FORMAT: Retourne UNIQUEMENT le mnémonique, sans introduction ni explication.`;
}

function buildUserPrompt(context: MnemonicContext): string {
  const { item, type, mnemonicType, learnedContext } = context;

  let prompt = "";

  if (type === "radical") {
    const radical = item as RadicalDetails;
    prompt = `Cree un mnémonique pour ce RADICAL japonais:
- Caractere: ${radical.character || "[image]"}
- Signification: ${radical.meaningFr}
${radical.meaningHintFr ? `- Indice: ${radical.meaningHintFr}` : ""}`;
  }
  else if (type === "kanji") {
    const kanji = item as KanjiDetails;
    if (mnemonicType === "meaning") {
      const components = kanji.radicals
        .map(r => `${r.radical.character || "?"} (${r.radical.meaningFr})`)
        .join(", ");
      prompt = `Cree un mnémonique pour la SIGNIFICATION de ce kanji:
- Kanji: ${kanji.character}
- Signification(s): ${kanji.meaningsFr.join(", ")}
- Composants (radicaux): ${components || "aucun"}`;
    } else {
      prompt = `Cree un mnémonique pour la LECTURE de ce kanji:
- Kanji: ${kanji.character}
- Signification: ${kanji.meaningsFr[0]}
- Lectures On'yomi: ${kanji.readingsOn?.join(", ") || "aucune"}
- Lectures Kun'yomi: ${kanji.readingsKun?.join(", ") || "aucune"}
- Trouve une association phonetique avec un mot francais`;
    }
  }
  else if (type === "vocabulary") {
    const vocab = item as VocabularyDetails;
    const kanjiComponents = vocab.kanji
      .map(k => `${k.kanji.character} (${k.kanji.meaningsFr[0]})`)
      .join(", ");
    prompt = `Cree un mnémonique pour ce MOT DE VOCABULAIRE:
- Mot: ${vocab.word}
- Signification(s): ${vocab.meaningsFr.join(", ")}
- Lecture: ${vocab.readings.join(", ")}
- Kanji composants: ${kanjiComponents || "aucun"}`;
  }

  // Add learned context
  if (learnedContext.radicals.length > 0 || learnedContext.kanji.length > 0) {
    prompt += `\n\nL'utilisateur connaît déjà ces éléments (Guru+), tu peux les référencer:`;

    if (learnedContext.radicals.length > 0) {
      const radicalList = learnedContext.radicals
        .slice(0, 10)
        .map(r => `${r.character || "?"} (${r.meaningFr})`)
        .join(", ");
      prompt += `\n- Radicaux: ${radicalList}`;
    }

    if (learnedContext.kanji.length > 0) {
      const kanjiList = learnedContext.kanji
        .slice(0, 10)
        .map(k => `${k.character} (${k.meaningsFr[0]})`)
        .join(", ");
      prompt += `\n- Kanji: ${kanjiList}`;
    }
  }

  return prompt;
}

export async function fetchItemWithContext(
  userId: string,
  type: ItemType,
  id: number
): Promise<{ item: RadicalDetails | KanjiDetails | VocabularyDetails | null; learnedContext: LearnedContext }> {
  // Fetch the target item
  let item: RadicalDetails | KanjiDetails | VocabularyDetails | null = null;

  if (type === "radical") {
    const radical = await prisma.radical.findUnique({
      where: { id },
      select: {
        character: true,
        meaningFr: true,
        meaningHintFr: true,
        imageUrl: true,
      },
    });
    item = radical;
  } else if (type === "kanji") {
    const kanji = await prisma.kanji.findUnique({
      where: { id },
      select: {
        character: true,
        meaningsFr: true,
        readingsOn: true,
        readingsKun: true,
        radicals: {
          select: {
            radical: {
              select: {
                character: true,
                meaningFr: true,
              },
            },
          },
        },
      },
    });
    item = kanji;
  } else {
    const vocabulary = await prisma.vocabulary.findUnique({
      where: { id },
      select: {
        word: true,
        meaningsFr: true,
        readings: true,
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
    item = vocabulary;
  }

  // Fetch user's learned items (Guru+) for context
  const [learnedRadicals, learnedKanji] = await Promise.all([
    prisma.userRadicalProgress.findMany({
      where: { userId, srsStage: { gte: GURU_THRESHOLD } },
      select: {
        radical: {
          select: {
            character: true,
            meaningFr: true,
          },
        },
      },
      take: 20,
    }),
    prisma.userKanjiProgress.findMany({
      where: { userId, srsStage: { gte: GURU_THRESHOLD } },
      select: {
        kanji: {
          select: {
            character: true,
            meaningsFr: true,
          },
        },
      },
      take: 20,
    }),
  ]);

  return {
    item,
    learnedContext: {
      radicals: learnedRadicals.map(r => ({
        character: r.radical.character,
        meaningFr: r.radical.meaningFr,
      })),
      kanji: learnedKanji.map(k => ({
        character: k.kanji.character,
        meaningsFr: k.kanji.meaningsFr,
      })),
    },
  };
}

export async function saveMnemonic(
  userId: string,
  type: ItemType,
  id: number,
  mnemonic: string,
  mnemonicType: "meaning" | "reading"
): Promise<void> {
  if (type === "radical") {
    await prisma.userRadicalProgress.update({
      where: { userId_radicalId: { userId, radicalId: id } },
      data: { customMnemonic: mnemonic },
    });
  } else if (type === "kanji") {
    const data = mnemonicType === "meaning"
      ? { customMeaningMnemonic: mnemonic }
      : { customReadingMnemonic: mnemonic };
    await prisma.userKanjiProgress.update({
      where: { userId_kanjiId: { userId, kanjiId: id } },
      data,
    });
  } else {
    await prisma.userVocabularyProgress.update({
      where: { userId_vocabularyId: { userId, vocabularyId: id } },
      data: { customMnemonic: mnemonic },
    });
  }
}

// Shared mnemonic cache functions
export async function getSharedMnemonic(
  type: ItemType,
  id: number,
  mnemonicType: "meaning" | "reading"
): Promise<string | null> {
  const shared = await prisma.sharedMnemonic.findUnique({
    where: {
      itemType_itemId_mnemonicType: {
        itemType: type,
        itemId: id,
        mnemonicType,
      },
    },
  });

  if (shared) {
    // Increment usage count in background (fire and forget)
    prisma.sharedMnemonic.update({
      where: { id: shared.id },
      data: { usageCount: { increment: 1 } },
    }).catch(() => {}); // Ignore errors

    return shared.content;
  }

  return null;
}

export async function saveSharedMnemonic(
  type: ItemType,
  id: number,
  mnemonicType: "meaning" | "reading",
  content: string
): Promise<void> {
  await prisma.sharedMnemonic.upsert({
    where: {
      itemType_itemId_mnemonicType: {
        itemType: type,
        itemId: id,
        mnemonicType,
      },
    },
    update: {
      content,
      usageCount: 1,
    },
    create: {
      itemType: type,
      itemId: id,
      mnemonicType,
      content,
      usageCount: 1,
    },
  });
}

export async function checkAndDeductCredit(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mnemonicCredits: true },
  });

  if (!user || user.mnemonicCredits <= 0) {
    return false;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { mnemonicCredits: { decrement: 1 } },
  });

  return true;
}

export async function getUserCredits(userId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { mnemonicCredits: true },
  });

  return user?.mnemonicCredits ?? 0;
}
