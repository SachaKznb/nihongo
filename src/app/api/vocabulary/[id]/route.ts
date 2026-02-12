import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/vocabulary/[id] - Get a single vocabulary
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const vocabularyId = parseInt(id, 10);

  if (isNaN(vocabularyId)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const vocabulary = await prisma.vocabulary.findUnique({
      where: { id: vocabularyId },
      include: {
        kanji: {
          include: {
            kanji: { select: { character: true, meaningsFr: true } },
          },
        },
        userProgress: {
          where: { userId: session.user.id },
          select: { srsStage: true, customMnemonic: true },
        },
      },
    });

    if (!vocabulary) {
      return NextResponse.json({ error: "Vocabulaire non trouvé" }, { status: 404 });
    }

    const progress = vocabulary.userProgress[0];

    return NextResponse.json({
      id: vocabulary.id,
      word: vocabulary.word,
      meaningsFr: vocabulary.meaningsFr,
      readings: vocabulary.readings,
      mnemonicFr: progress?.customMnemonic || vocabulary.mnemonicFr,
      sentenceJp: vocabulary.sentenceJp,
      sentenceFr: vocabulary.sentenceFr,
      kanji: vocabulary.kanji.map((vk) => ({
        character: vk.kanji.character,
        meaningsFr: vk.kanji.meaningsFr,
      })),
      srsStage: progress?.srsStage ?? 0,
    });
  } catch (error) {
    console.error("Failed to fetch vocabulary:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
