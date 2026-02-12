import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES, calculateNextReview } from "@/lib/srs";
import { unlockAvailableItems } from "@/lib/unlocks";

// POST /api/onboarding/complete - Mark onboarding as complete and move radicals to Apprentice
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

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

    // Get the radical IDs from the request body
    const body = await request.json();
    const { radicalIds } = body as { radicalIds: number[] };

    if (!radicalIds || radicalIds.length === 0) {
      return NextResponse.json(
        { error: "Aucun radical fourni" },
        { status: 400 }
      );
    }

    const nextReviewAt = calculateNextReview(SRS_STAGES.APPRENTICE_1);
    const now = new Date();

    // Update radicals to Apprentice 1 (like completing a lesson)
    await prisma.userRadicalProgress.updateMany({
      where: {
        userId,
        radicalId: { in: radicalIds },
        srsStage: SRS_STAGES.LOCKED,
      },
      data: {
        srsStage: SRS_STAGES.APPRENTICE_1,
        nextReviewAt,
      },
    });

    // Update user stats and mark onboarding complété
    await prisma.user.update({
      where: { id: userId },
      data: {
        onboardingCompleted: true,
        totalLessonsDone: { increment: radicalIds.length },
        totalXp: { increment: 50 }, // 50 XP bonus for completing onboarding
        weeklyXp: { increment: 50 },
        currentStreak: 1,
        lastStudyDate: now,
      },
    });

    // Check for any new unlocks (kanji that use these radicals)
    const unlocks = await unlockAvailableItems(userId);

    return NextResponse.json({
      success: true,
      message: "Onboarding complete avec succès!",
      radicalsLearned: radicalIds.length,
      xpEarned: 50,
      unlocks,
    });
  } catch (error) {
    console.error("Onboarding complete error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la complétion de l'onboarding" },
      { status: 500 }
    );
  }
}
