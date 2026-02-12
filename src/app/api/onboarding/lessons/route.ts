import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES } from "@/lib/srs";
import type { LessonItem } from "@/types";

// GET /api/onboarding/lessons - Returns 5 radicals for onboarding
// Query params: skip (number) - number of radicals to skip (for additional batches)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0");

    // Check if user has already completed onboarding
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { onboardingCompleted: true },
    });

    if (user?.onboardingCompleted) {
      return NextResponse.json(
        { error: "Onboarding déjà complété" },
        { status: 400 }
      );
    }

    // Get 5 locked radicals (with optional skip for additional batches)
    const radicalProgress = await prisma.userRadicalProgress.findMany({
      where: { userId, srsStage: SRS_STAGES.LOCKED },
      include: {
        radical: {
          include: {
            kanji: {
              select: {
                kanji: {
                  select: { character: true, meaningsFr: true },
                },
              },
              take: 3,
            },
          },
        },
      },
      skip,
      take: 5,
      orderBy: { radical: { id: "asc" } },
    });

    const lessons: LessonItem[] = radicalProgress.map((rp) => ({
      type: "radical" as const,
      id: rp.radical.id,
      character: rp.radical.character,
      meaningsFr: [rp.radical.meaningFr],
      mnemonic: rp.radical.mnemonic,
      customMnemonic: rp.customMnemonic,
      imageUrl: rp.radical.imageUrl,
      usedInKanji: rp.radical.kanji.map((k) => ({
        character: k.kanji.character,
        meaningFr: k.kanji.meaningsFr[0] || "",
      })),
    }));

    return NextResponse.json({ lessons, total: lessons.length });
  } catch (error) {
    console.error("Onboarding lessons GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des leçons" },
      { status: 500 }
    );
  }
}
