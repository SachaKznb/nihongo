import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/kanji/decomposition?kanjiId=123 - Get visual decomposition of a kanji
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const kanjiIdParam = searchParams.get("kanjiId");

  if (!kanjiIdParam) {
    return NextResponse.json(
      { error: "Le paramètre kanjiId est requis" },
      { status: 400 }
    );
  }

  const kanjiId = parseInt(kanjiIdParam, 10);

  if (isNaN(kanjiId)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const kanji = await prisma.kanji.findUnique({
      where: { id: kanjiId },
      include: {
        radicals: {
          include: {
            radical: {
              select: {
                id: true,
                character: true,
                meaningFr: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!kanji) {
      return NextResponse.json({ error: "Kanji non trouvé" }, { status: 404 });
    }

    // Build the radicals array
    const radicals = kanji.radicals.map((kr) => ({
      id: kr.radical.id,
      character: kr.radical.character,
      meaningFr: kr.radical.meaningFr,
      imagePath: kr.radical.imageUrl,
    }));

    // Generate a simple explanation of how radicals combine to form the meaning
    const explanation = generateDecompositionExplanation(
      kanji.character,
      kanji.meaningsFr,
      radicals
    );

    return NextResponse.json({
      kanji: {
        id: kanji.id,
        character: kanji.character,
        meaningsFr: kanji.meaningsFr,
      },
      radicals,
      explanation,
    });
  } catch (error) {
    console.error("Failed to fetch kanji decomposition:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la décomposition" },
      { status: 500 }
    );
  }
}

/**
 * Generates a simple explanation of how radicals combine to form a kanji's meaning.
 * This is a template-based approach without AI.
 */
function generateDecompositionExplanation(
  kanjiCharacter: string,
  meaningsFr: string[],
  radicals: { id: number; character: string | null; meaningFr: string; imagePath: string | null }[]
): string {
  const primaryMeaning = meaningsFr[0] || "ce kanji";

  if (radicals.length === 0) {
    return `Le kanji ${kanjiCharacter} (${primaryMeaning}) est un caractère de base sans radical composant identifié.`;
  }

  if (radicals.length === 1) {
    const radical = radicals[0];
    const radicalName = radical.character || radical.meaningFr;
    return `Le kanji ${kanjiCharacter} (${primaryMeaning}) est basé sur le radical "${radicalName}" (${radical.meaningFr}).`;
  }

  // Multiple radicals
  const radicalDescriptions = radicals.map((r) => {
    const display = r.character || r.meaningFr;
    return `"${display}" (${r.meaningFr})`;
  });

  const lastRadical = radicalDescriptions.pop();
  const radicalsList = radicalDescriptions.join(", ") + " et " + lastRadical;

  return `Le kanji ${kanjiCharacter} (${primaryMeaning}) est composé des radicaux ${radicalsList}. En combinant ces éléments, on peut construire le sens du kanji.`;
}
