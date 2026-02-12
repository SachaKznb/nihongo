import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserSubscription, FREE_TIER_MAX_LEVEL } from "@/lib/subscription";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const subscription = await getUserSubscription(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { currentLevel: true },
    });

    return NextResponse.json({
      status: subscription.status,
      plan: subscription.plan,
      periodEnd: subscription.periodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      hasFullAccess: subscription.hasFullAccess,
      currentLevel: user?.currentLevel || 1,
      freeAccessMaxLevel: FREE_TIER_MAX_LEVEL,
    });
  } catch (error) {
    console.error("Subscription status error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du statut" },
      { status: 500 }
    );
  }
}
