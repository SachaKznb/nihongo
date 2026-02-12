import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST /api/extra-study/complete - Award XP for extra study session
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { correctCount, totalCount } = body as {
      correctCount: number;
      totalCount: number;
    };

    if (typeof correctCount !== "number" || typeof totalCount !== "number") {
      return NextResponse.json(
        { error: "Données invalides" },
        { status: 400 }
      );
    }

    // Award 2 XP per correct answer (vs 5 for real reviews)
    const xpEarned = correctCount * 2;

    // Update user XP (no SRS changes)
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { increment: xpEarned },
        weeklyXp: { increment: xpEarned },
      },
    });

    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

    return NextResponse.json({
      success: true,
      xpEarned,
      correctCount,
      totalCount,
      accuracy,
    });
  } catch (error) {
    console.error("Extra study complete error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la complétion" },
      { status: 500 }
    );
  }
}
