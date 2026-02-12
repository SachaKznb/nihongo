import Stripe from "stripe";

// Lazy initialization to avoid build-time errors when env vars aren't set
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }
  return _stripe;
}

// Keep the stripe export for backward compatibility
export const stripe = {
  get webhooks() {
    return getStripe().webhooks;
  },
  get customers() {
    return getStripe().customers;
  },
  get checkout() {
    return getStripe().checkout;
  },
  get subscriptions() {
    return getStripe().subscriptions;
  },
  get billingPortal() {
    return getStripe().billingPortal;
  },
};

export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || "",
  yearly: process.env.STRIPE_PRICE_YEARLY || "",
  lifetime: process.env.STRIPE_PRICE_LIFETIME || "",
} as const;

export type PlanType = keyof typeof STRIPE_PRICES;

export const PLAN_DETAILS = {
  monthly: {
    name: "Mensuel",
    price: 6.99,
    priceDisplay: "6,99 €",
    period: "/mois",
    savings: null,
    description: "Accès complet, annulez quand vous voulez",
  },
  yearly: {
    name: "Annuel",
    price: 59.99,
    priceDisplay: "59,99 €",
    period: "/an",
    savings: "~30% d'économie",
    description: "Le meilleur rapport qualité-prix",
  },
  lifetime: {
    name: "À vie",
    price: 149.99,
    priceDisplay: "149,99 €",
    period: "paiement unique",
    savings: "Accès permanent",
    description: "Payez une fois, apprenez pour toujours",
  },
} as const;

export function isPlanType(value: string): value is PlanType {
  return value in STRIPE_PRICES;
}
