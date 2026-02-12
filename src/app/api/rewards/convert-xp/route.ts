import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { XP_PER_CREDIT } from "@/lib/rewards";

// POST /api/rewards/convert-xp - Convert XP to AI credits
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const { credits } = await request.json();

    if (!credits || credits < 1 || !Number.isInteger(credits)) {
      return NextResponse.json(
        { error: "Nombre de credits invalide" },
        { status: 400 }
      );
    }

    const xpCost = credits * XP_PER_CREDIT;

    // Get user's current XP
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalXp: true,
        mnemonicCredits: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
    }

    // Check if user has enough XP
    if (user.totalXp < xpCost) {
      return NextResponse.json(
        { error: `XP insuffisant. Il te faut ${xpCost} XP pour ${credits} credit(s) (tu as ${user.totalXp})` },
        { status: 400 }
      );
    }

    // Convert XP to credits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { decrement: xpCost },
        mnemonicCredits: { increment: credits },
      },
      select: {
        totalXp: true,
        mnemonicCredits: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${credits} credit(s) IA obtenu(s) !`,
      creditsGained: credits,
      xpSpent: xpCost,
      remainingXp: updatedUser.totalXp,
      totalCredits: updatedUser.mnemonicCredits,
    });
  } catch (error) {
    console.error("Convert XP error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la conversion" },
      { status: 500 }
    );
  }
}
