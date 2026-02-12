import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { XP_PER_CREDIT } from "@/lib/rewards";

// POST /api/rewards/convert-xp - Convert XP to AI crédits
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const { crédits } = await request.json();

    if (!crédits || crédits < 1 || !Number.isInteger(crédits)) {
      return NextResponse.json(
        { error: "Nombre de crédits invalide" },
        { status: 400 }
      );
    }

    const xpCost = crédits * XP_PER_CREDIT;

    // Get user's current XP
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalXp: true,
        mnemonicCredits: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Check if user has enough XP
    if (user.totalXp < xpCost) {
      return NextResponse.json(
        { error: `XP insuffisant. Il te faut ${xpCost} XP pour ${crédits} crédit(s) (tu as ${user.totalXp})` },
        { status: 400 }
      );
    }

    // Convert XP to crédits
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { decrement: xpCost },
        mnemonicCredits: { increment: crédits },
      },
      select: {
        totalXp: true,
        mnemonicCredits: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${crédits} crédit(s) IA obtenu(s) !`,
      créditsGained: crédits,
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
