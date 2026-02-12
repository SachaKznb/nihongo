import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/extra-study/items - Returns learned items for extra study
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all"; // all, radical, kanji, vocabulary
    const level = searchParams.get("level") || "all"; // all, current, 1-10
    const limit = parseInt(searchParams.get("limit") || "20");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { currentLevel: true },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    interface StudyItem {
      type: "radical" | "kanji" | "vocabulary";
      id: number;
      character: string | null;
      imageUrl: string | null;
      meaningsFr: string[];
      readings?: string[];
      mnemonic?: string;
      readingMnemonic?: string;
    }

    const items: StudyItem[] = [];

    // Build level filter
    const levelFilter =
      level === "all"
        ? {}
        : level === "current"
        ? { levelId: user.currentLevel }
        : { levelId: parseInt(level) };

    // Fetch radicals if type is all or radical
    if (type === "all" || type === "radical") {
      const radicalProgress = await prisma.userRadicalProgress.findMany({
        where: {
          userId,
          srsStage: { gte: 1 }, // Only learned items
          radical: levelFilter.levelId ? { levelId: levelFilter.levelId } : undefined,
        },
        include: {
          radical: {
            select: {
              id: true,
              character: true,
              meaningFr: true,
              imageUrl: true,
              mnemonic: true,
            },
          },
        },
        take: type === "radical" ? limit : Math.floor(limit / 3),
      });

      for (const rp of radicalProgress) {
        items.push({
          type: "radical",
          id: rp.radical.id,
          character: rp.radical.character,
          imageUrl: rp.radical.imageUrl,
          meaningsFr: [rp.radical.meaningFr],
          mnemonic: rp.radical.mnemonic,
        });
      }
    }

    // Fetch kanji if type is all or kanji
    if (type === "all" || type === "kanji") {
      const kanjiProgress = await prisma.userKanjiProgress.findMany({
        where: {
          userId,
          srsStage: { gte: 1 },
          kanji: levelFilter.levelId ? { levelId: levelFilter.levelId } : undefined,
        },
        include: {
          kanji: {
            select: {
              id: true,
              character: true,
              meaningsFr: true,
              readingsOn: true,
              readingsKun: true,
              meaningMnemonicFr: true,
              readingMnemonicFr: true,
            },
          },
        },
        take: type === "kanji" ? limit : Math.floor(limit / 3),
      });

      for (const kp of kanjiProgress) {
        items.push({
          type: "kanji",
          id: kp.kanji.id,
          character: kp.kanji.character,
          imageUrl: null,
          meaningsFr: kp.kanji.meaningsFr,
          readings: [...kp.kanji.readingsOn, ...kp.kanji.readingsKun],
          mnemonic: kp.kanji.meaningMnemonicFr,
          readingMnemonic: kp.kanji.readingMnemonicFr || undefined,
        });
      }
    }

    // Fetch vocabulary if type is all or vocabulary
    if (type === "all" || type === "vocabulary") {
      const vocabProgress = await prisma.userVocabularyProgress.findMany({
        where: {
          userId,
          srsStage: { gte: 1 },
          vocabulary: levelFilter.levelId ? { levelId: levelFilter.levelId } : undefined,
        },
        include: {
          vocabulary: {
            select: {
              id: true,
              word: true,
              meaningsFr: true,
              readings: true,
              mnemonicFr: true,
            },
          },
        },
        take: type === "vocabulary" ? limit : Math.floor(limit / 3),
      });

      for (const vp of vocabProgress) {
        items.push({
          type: "vocabulary",
          id: vp.vocabulary.id,
          character: vp.vocabulary.word,
          imageUrl: null,
          meaningsFr: vp.vocabulary.meaningsFr,
          readings: vp.vocabulary.readings,
          mnemonic: vp.vocabulary.mnemonicFr,
        });
      }
    }

    // Shuffle items
    const shuffled = items.sort(() => Math.random() - 0.5).slice(0, limit);

    return NextResponse.json({
      items: shuffled,
      total: shuffled.length,
    });
  } catch (error) {
    console.error("Extra study items GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des éléments" },
      { status: 500 }
    );
  }
}
