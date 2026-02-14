import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generalRateLimit, checkRateLimit } from "@/lib/upstash";
import { getUserSubscription, getLevelFilter } from "@/lib/subscription";

// GET /api/grammar - List grammar points
// Query params: ?levelId=X or ?unlocked=true
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const levelId = searchParams.get("levelId");
  const unlocked = searchParams.get("unlocked") === "true";

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

    // Check subscription and get level filter
    const subscription = await getUserSubscription(userId);
    const levelFilter = getLevelFilter(subscription.hasFullAccess);

    // Build the where clause
    const where: {
      levelId?: number | { lte: number };
    } = {};

    if (levelId) {
      where.levelId = parseInt(levelId, 10);
    } else if (levelFilter.levelId) {
      where.levelId = levelFilter.levelId;
    }

    // Fetch grammar points with user progress
    const grammarPoints = await prisma.grammarPoint.findMany({
      where,
      include: {
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
      orderBy: [{ levelId: "asc" }, { order: "asc" }],
    });

    // If unlocked=true, filter to only include unlocked grammar points
    let filteredGrammar = grammarPoints;
    if (unlocked) {
      filteredGrammar = grammarPoints.filter(
        (gp) => gp.userProgress.length > 0 && gp.userProgress[0].srsStage > 0
      );
    }

    // Format response
    const grammar = filteredGrammar.map((gp) => {
      const progress = gp.userProgress[0];
      return {
        id: gp.id,
        slug: gp.slug,
        titleJp: gp.titleJp,
        titleFr: gp.titleFr,
        meaningFr: gp.meaningFr,
        jlptLevel: gp.jlptLevel,
        levelId: gp.levelId,
        order: gp.order,
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
      };
    });

    return NextResponse.json(
      { grammar, total: grammar.length },
      {
        headers: {
          "Cache-Control": "private, max-age=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Grammar GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des points de grammaire" },
      { status: 500 }
    );
  }
}
