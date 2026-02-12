import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true, subscriptionStatus: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: "Aucun compte de facturation associé" },
        { status: 400 }
      );
    }

    // Lifetime users don't need the portal
    if (user.subscriptionStatus === "lifetime") {
      return NextResponse.json(
        { error: "Vous avez un accès à vie, pas besoin de gérer un abonnement" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${baseUrl}/settings`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'accès au portail de facturation" },
      { status: 500 }
    );
  }
}
