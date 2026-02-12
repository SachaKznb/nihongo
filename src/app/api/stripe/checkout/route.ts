import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe, STRIPE_PRICES, isPlanType } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { plan } = await request.json();

    if (!plan || !isPlanType(plan)) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        email: true,
        stripeCustomerId: true,
        subscriptionStatus: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    // Don't allow checkout if already subscribed
    if (user.subscriptionStatus === "active" || user.subscriptionStatus === "lifetime") {
      return NextResponse.json(
        { error: "Vous avez déjà un abonnement actif" },
        { status: 400 }
      );
    }

    // Get or create Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: session.user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const isLifetime = plan === "lifetime";
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: isLifetime ? "payment" : "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: STRIPE_PRICES[plan],
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      metadata: {
        userId: session.user.id,
        plan,
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      locale: "fr",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    );
  }
}
