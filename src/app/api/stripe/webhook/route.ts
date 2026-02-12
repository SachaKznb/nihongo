import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(event.data.object as Stripe.Checkout.Session);
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const plan = session.metadata?.plan;

  if (!userId) {
    console.error("No userId in checkout session metadata");
    return;
  }

  const isLifetime = plan === "lifetime";

  if (isLifetime) {
    // Lifetime purchase - one-time payment
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: "lifetime",
        subscriptionPlan: "lifetime",
        lifetimePurchasedAt: new Date(),
      },
    });
    console.log(`User ${userId} purchased lifetime access`);
  } else if (session.subscription) {
    // Subscription purchase
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
      { expand: ['items.data'] }
    ) as Stripe.Subscription;

    // Get the current_period_end from the first subscription item
    const subscriptionItem = subscription.items?.data?.[0];
    const currentPeriodEnd = subscriptionItem?.current_period_end
      ? new Date(subscriptionItem.current_period_end * 1000)
      : null;

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: "active",
        subscriptionPlan: plan,
        stripeSubscriptionId: subscription.id,
        subscriptionCurrentPeriodEnd: currentPeriodEnd,
        subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
    console.log(`User ${userId} subscribed to ${plan} plan`);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!user) {
    console.error(`No user found for subscription ${subscription.id}`);
    return;
  }

  // Don't update lifetime users
  if (user.subscriptionStatus === "lifetime") {
    return;
  }

  let status: string;
  switch (subscription.status) {
    case "active":
      status = "active";
      break;
    case "past_due":
      status = "past_due";
      break;
    case "canceled":
      status = "canceled";
      break;
    case "unpaid":
      status = "past_due";
      break;
    default:
      status = "free";
  }

  // Get the current_period_end from the first subscription item
  const subscriptionItem = subscription.items?.data?.[0];
  const currentPeriodEnd = subscriptionItem?.current_period_end
    ? new Date(subscriptionItem.current_period_end * 1000)
    : null;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: status,
      subscriptionCurrentPeriodEnd: currentPeriodEnd,
      subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
  console.log(`Subscription updated for user ${user.id}: ${status}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!user) {
    console.error(`No user found for subscription ${subscription.id}`);
    return;
  }

  // Don't update lifetime users
  if (user.subscriptionStatus === "lifetime") {
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus: "free",
      subscriptionPlan: null,
      stripeSubscriptionId: null,
      subscriptionCurrentPeriodEnd: null,
      subscriptionCancelAtPeriodEnd: false,
    },
  });
  console.log(`Subscription deleted for user ${user.id}, reverted to free`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // In newer Stripe API versions, subscription is accessed via parent
  const subscriptionId = invoice.parent?.subscription_details?.subscription as string | null;
  if (!subscriptionId) return;

  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!user || user.subscriptionStatus === "lifetime") return;

  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: "past_due" },
  });
  console.log(`Payment failed for user ${user.id}, status set to past_due`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // In newer Stripe API versions, subscription is accessed via parent
  const subscriptionId = invoice.parent?.subscription_details?.subscription as string | null;
  if (!subscriptionId) return;

  const user = await prisma.user.findFirst({
    where: { stripeSubscriptionId: subscriptionId },
  });

  if (!user || user.subscriptionStatus === "lifetime") return;

  // Only update if currently past_due
  if (user.subscriptionStatus === "past_due") {
    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionStatus: "active" },
    });
    console.log(`Payment succeeded for user ${user.id}, status restored to active`);
  }
}
