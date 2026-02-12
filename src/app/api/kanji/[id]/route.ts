import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/kanji/[id] - Get a single kanji
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const { id } = await params;
  const kanjiId = parseInt(id, 10);

  if (isNaN(kanjiId)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const kanji = await prisma.kanji.findUnique({
      where: { id: kanjiId },
      include: {
        radicals: {
          include: {
            radical: { select: { character: true, meaningFr: true } },
          },
        },
        userProgress: {
          where: { userId: session.user.id },
          select: {
            srsStage: true,
            customMeaningMnemonic: true,
            customReadingMnemonic: true,
          },
        },
      },
    });

    if (!kanji) {
      return NextResponse.json({ error: "Kanji non trouve" }, { status: 404 });
    }

    const progress = kanji.userProgress[0];

    return NextResponse.json({
      id: kanji.id,
      character: kanji.character,
      meaningsFr: kanji.meaningsFr,
      readingsOn: kanji.readingsOn,
      readingsKun: kanji.readingsKun,
      meaningMnemonicFr: progress?.customMeaningMnemonic || kanji.meaningMnemonicFr,
      readingMnemonicFr: progress?.customReadingMnemonic || kanji.readingMnemonicFr,
      radicals: kanji.radicals.map((kr) => ({
        character: kr.radical.character,
        meaningFr: kr.radical.meaningFr,
      })),
      srsStage: progress?.srsStage ?? 0,
    });
  } catch (error) {
    console.error("Failed to fetch kanji:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recuperation" },
      { status: 500 }
    );
  }
}
