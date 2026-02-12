import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST /api/study/complete - Complete a study session, award XP, remove pattern
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const { patternType, itemCount } = body as {
      patternType?: string;
      itemCount: number;
    };

    // Award XP: 5 XP per item studied + 20 bonus for completing a session
    const xpEarned = itemCount * 5 + 20;

    // Update user stats and mark targeted study as done for today
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { increment: xpEarned },
        weeklyXp: { increment: xpEarned },
        lastPatternAnalysis: new Date(),
      },
      select: {
        totalXp: true,
        weeklyXp: true,
      },
    });

    // Remove the pattern if specified (mark as addressed)
    if (patternType) {
      await prisma.userWeaknessPattern.deleteMany({
        where: {
          userId,
          patternType,
        },
      });
    }

    // Clear old mistakes for these items to give a fresh start
    // (Optional: could also just reduce the count instead of deleting)

    return NextResponse.json({
      success: true,
      xpEarned,
      totalXp: user.totalXp,
      weeklyXp: user.weeklyXp,
      message: `Bravo ! Tu as gagne ${xpEarned} XP !`,
    });
  } catch (error) {
    console.error("Study complete error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la completion" },
      { status: 500 }
    );
  }
}
