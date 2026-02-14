import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Interest themes with French cultural elements
const interestThemes: Record<string, string[]> = {
  gaming: ["jeux vidéo", "Mario", "Zelda", "PlayStation", "manettes", "boss final", "niveau", "game over"],
  cooking: ["cuisine", "croissants", "baguette", "chef étoilé", "recette", "Ratatouille", "casserole", "ingrédients"],
  football: ["football", "Mbappé", "PSG", "but", "gardien", "carton rouge", "stade", "supporters"],
  cinema: ["cinéma", "Astérix", "Amélie Poulain", "Oscars", "réalisateur", "scène culte", "blockbuster"],
  music: ["musique", "Daft Punk", "concert", "guitare", "piano", "mélodie", "festival", "rock"],
  travel: ["voyage", "Tour Eiffel", "plage", "valise", "avion", "hôtel", "aventure", "destination"],
  nature: ["nature", "forêt", "montagne", "océan", "animaux", "jardin", "fleurs", "randonnée"],
  anime: ["anime", "manga", "Naruto", "One Piece", "Studio Ghibli", "cosplay", "otaku", "kawaii"],
  history: ["histoire", "Napoléon", "château", "roi", "révolution", "chevalier", "époque", "musée"],
  science: ["science", "laboratoire", "Einstein", "expérience", "découverte", "molécule", "robot"],
};

interface GenerateRequest {
  itemType: "radical" | "kanji" | "vocabulary";
  itemId: number;
  mnemonicType?: "meaning" | "reading"; // Only for kanji
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body: GenerateRequest = await request.json();
    const { itemType, itemId, mnemonicType = "meaning" } = body;

    // Get user with interests and credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        interests: true,
        mnemonicCredits: true,
        subscriptionStatus: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Check credits (premium users get unlimited, free users need credits)
    const isPremium = ["active", "lifetime"].includes(user.subscriptionStatus);
    if (!isPremium && user.mnemonicCredits <= 0) {
      return NextResponse.json(
        { error: "Pas assez de crédits. Passez à Premium pour des mnémoniques illimités." },
        { status: 403 }
      );
    }

    // Get item details
    let itemData: {
      character: string;
      meaning: string;
      reading?: string;
    } | null = null;

    if (itemType === "radical") {
      const radical = await prisma.radical.findUnique({
        where: { id: itemId },
        select: { character: true, meaningFr: true },
      });
      if (radical) {
        itemData = { character: radical.character || "[image]", meaning: radical.meaningFr };
      }
    } else if (itemType === "kanji") {
      const kanji = await prisma.kanji.findUnique({
        where: { id: itemId },
        select: { character: true, meaningsFr: true, readingsOn: true, readingsKun: true },
      });
      if (kanji) {
        itemData = {
          character: kanji.character,
          meaning: kanji.meaningsFr[0],
          reading: [...kanji.readingsOn, ...kanji.readingsKun].join(", "),
        };
      }
    } else if (itemType === "vocabulary") {
      const vocab = await prisma.vocabulary.findUnique({
        where: { id: itemId },
        select: { word: true, meaningsFr: true, readings: true },
      });
      if (vocab) {
        itemData = {
          character: vocab.word,
          meaning: vocab.meaningsFr[0],
          reading: vocab.readings[0],
        };
      }
    }

    if (!itemData) {
      return NextResponse.json({ error: "Élément non trouvé" }, { status: 404 });
    }

    // Build personalized prompt
    const userInterests = user.interests.length > 0 ? user.interests : ["general"];
    const themeElements: string[] = [];
    for (const interest of userInterests) {
      if (interestThemes[interest]) {
        themeElements.push(...interestThemes[interest]);
      }
    }
    const themeString = themeElements.length > 0
      ? themeElements.slice(0, 10).join(", ")
      : "culture française, vie quotidienne, Paris, croissants";

    let prompt: string;

    if (itemType === "vocabulary" || (itemType === "kanji" && mnemonicType === "meaning")) {
      prompt = `Tu es un expert en mnémotechnique pour l'apprentissage du japonais.

ÉLÉMENT: ${itemData.character}
SIGNIFICATION: ${itemData.meaning}
${itemData.reading ? `LECTURE: ${itemData.reading}` : ""}

THÈMES PRÉFÉRÉS DE L'UTILISATEUR: ${themeString}

Crée un mnémonique FRANÇAIS personnalisé (100-150 caractères) qui:
1. Utilise les thèmes préférés de l'utilisateur pour créer une histoire mémorable
2. Aide à retenir la SIGNIFICATION: ${itemData.meaning}
${itemData.reading ? `3. Intègre des sons français qui rappellent la lecture japonaise "${itemData.reading}"` : ""}
4. Est amusant, visuel et facile à retenir
5. Utilise des jeux de mots ou associations phonétiques

Réponds UNIQUEMENT avec le mnémonique, sans guillemets ni explications.`;
    } else {
      // Kanji reading mnemonic
      prompt = `Tu es un expert en mnémotechnique pour l'apprentissage du japonais.

KANJI: ${itemData.character}
SIGNIFICATION: ${itemData.meaning}
LECTURES: ${itemData.reading}

THÈMES PRÉFÉRÉS DE L'UTILISATEUR: ${themeString}

Crée un mnémonique FRANÇAIS pour la LECTURE (100-150 caractères) qui:
1. Utilise les thèmes préférés de l'utilisateur
2. Crée des associations phonétiques entre les lectures japonaises et des mots français
3. Intègre la signification "${itemData.meaning}" dans l'histoire
4. Est amusant et mémorable

Exemple de format: "Se lit X (comme 'mot français' - histoire courte avec le thème)"

Réponds UNIQUEMENT avec le mnémonique, sans guillemets ni explications.`;
    }

    // Generate with Claude
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response format");
    }

    const newMnemonic = content.text.trim();

    // Deduct credit if not premium
    if (!isPremium) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { mnemonicCredits: { decrement: 1 } },
      });
    }

    // Save custom mnemonic to user's progress
    if (itemType === "radical") {
      await prisma.userRadicalProgress.upsert({
        where: {
          userId_radicalId: { userId: session.user.id, radicalId: itemId },
        },
        update: { customMnemonic: newMnemonic },
        create: {
          userId: session.user.id,
          radicalId: itemId,
          customMnemonic: newMnemonic,
        },
      });
    } else if (itemType === "kanji") {
      const updateData = mnemonicType === "meaning"
        ? { customMeaningMnemonic: newMnemonic }
        : { customReadingMnemonic: newMnemonic };
      await prisma.userKanjiProgress.upsert({
        where: {
          userId_kanjiId: { userId: session.user.id, kanjiId: itemId },
        },
        update: updateData,
        create: {
          userId: session.user.id,
          kanjiId: itemId,
          ...updateData,
        },
      });
    } else if (itemType === "vocabulary") {
      await prisma.userVocabularyProgress.upsert({
        where: {
          userId_vocabularyId: { userId: session.user.id, vocabularyId: itemId },
        },
        update: { customMnemonic: newMnemonic },
        create: {
          userId: session.user.id,
          vocabularyId: itemId,
          customMnemonic: newMnemonic,
        },
      });
    }

    return NextResponse.json({
      mnemonic: newMnemonic,
      creditsRemaining: isPremium ? "unlimited" : user.mnemonicCredits - 1,
    });

  } catch (error) {
    console.error("Error generating personalized mnemonic:", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération du mnémonique" },
      { status: 500 }
    );
  }
}
