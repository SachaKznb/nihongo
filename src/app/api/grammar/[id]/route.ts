import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generalRateLimit, checkRateLimit } from "@/lib/upstash";

// GET /api/grammar/[id] - Get a single grammar point with details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    // Rate limiting
    const rateLimit = await checkRateLimit(generalRateLimit, userId);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Trop de requetes" }, { status: 429 });
    }

    const { id } = await params;
    const grammarId = parseInt(id, 10);

    if (isNaN(grammarId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    // Fetch the grammar point
    const grammarPoint = await prisma.grammarPoint.findUnique({
      where: { id: grammarId },
      include: {
        level: {
          select: { id: true, name: true },
        },
        userProgress: {
          where: { userId },
          select: {
            srsStage: true,
            correctCount: true,
            incorrectCount: true,
            nextReviewAt: true,
            unlockedAt: true,
            burnedAt: true,
          },
        },
      },
    });

    if (!grammarPoint) {
      return NextResponse.json(
        { error: "Point de grammaire non trouvé" },
        { status: 404 }
      );
    }

    // Fetch related grammar points if any
    let relatedGrammar: {
      id: number;
      slug: string;
      titleJp: string;
      titleFr: string;
      jlptLevel: number;
    }[] = [];

    if (grammarPoint.relatedGrammar.length > 0) {
      const related = await prisma.grammarPoint.findMany({
        where: { id: { in: grammarPoint.relatedGrammar } },
        select: {
          id: true,
          slug: true,
          titleJp: true,
          titleFr: true,
          jlptLevel: true,
        },
      });
      relatedGrammar = related;
    }

    const progress = grammarPoint.userProgress[0];

    // Parse example sentences from JSON
    const exampleSentences = grammarPoint.exampleSentences as Array<{
      japanese: string;
      french: string;
      audio?: string;
    }>;

    return NextResponse.json(
      {
        id: grammarPoint.id,
        slug: grammarPoint.slug,
        titleJp: grammarPoint.titleJp,
        titleFr: grammarPoint.titleFr,
        meaningFr: grammarPoint.meaningFr,
        formation: grammarPoint.formation,
        formationNotes: grammarPoint.formationNotes,
        exampleSentences,
        nuancesFr: grammarPoint.nuancesFr,
        mnemonicFr: grammarPoint.mnemonicFr,
        jlptLevel: grammarPoint.jlptLevel,
        level: grammarPoint.level,
        order: grammarPoint.order,
        relatedGrammar,
        progress: progress
          ? {
              srsStage: progress.srsStage,
              correctCount: progress.correctCount,
              incorrectCount: progress.incorrectCount,
              nextReviewAt: progress.nextReviewAt,
              unlockedAt: progress.unlockedAt,
              burnedAt: progress.burnedAt,
            }
          : null,
      },
      {
        headers: {
          "Cache-Control": "private, max-age=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Grammar [id] GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement du point de grammaire" },
      { status: 500 }
    );
  }
}
