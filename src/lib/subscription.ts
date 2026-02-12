import { prisma } from "./db";

export const FREE_TIER_MAX_LEVEL = 3;

export type SubscriptionStatusType = "free" | "active" | "canceled" | "past_due" | "lifetime";

export interface SubscriptionInfo {
  status: SubscriptionStatusType;
  plan: string | null;
  hasFullAccess: boolean;
  periodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

/**
 * Get a user's subscription information
 */
export async function getUserSubscription(userId: string): Promise<SubscriptionInfo> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionStatus: true,
      subscriptionPlan: true,
      subscriptionCurrentPeriodEnd: true,
      subscriptionCancelAtPeriodEnd: true,
    },
  });

  if (!user) {
    return {
      status: "free",
      plan: null,
      hasFullAccess: false,
      periodEnd: null,
      cancelAtPeriodEnd: false,
    };
  }

  const hasFullAccess = checkFullAccess(
    user.subscriptionStatus as SubscriptionStatusType,
    user.subscriptionCurrentPeriodEnd
  );

  return {
    status: user.subscriptionStatus as SubscriptionStatusType,
    plan: user.subscriptionPlan,
    hasFullAccess,
    periodEnd: user.subscriptionCurrentPeriodEnd,
    cancelAtPeriodEnd: user.subscriptionCancelAtPeriodEnd,
  };
}

/**
 * Check if a user has full access based on their subscription status
 */
export function checkFullAccess(
  status: SubscriptionStatusType,
  periodEnd: Date | null
): boolean {
  // Lifetime = permanent access
  if (status === "lifetime") return true;

  // Active subscription = full access
  if (status === "active") return true;

  // Canceled but period hasn't ended = still has access
  if (status === "canceled" && periodEnd && new Date(periodEnd) > new Date()) {
    return true;
  }

  // Past due with grace period (7 days after period end)
  if (status === "past_due" && periodEnd) {
    const gracePeriodEnd = new Date(periodEnd);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 7);
    return new Date() < gracePeriodEnd;
  }

  return false;
}

/**
 * Check if a user can access a specific level
 */
export function canAccessLevel(
  targetLevel: number,
  hasFullAccess: boolean
): boolean {
  if (hasFullAccess) return true;
  return targetLevel <= FREE_TIER_MAX_LEVEL;
}

/**
 * Check if content from a specific level is accessible
 */
export function canAccessContent(
  contentLevel: number,
  hasFullAccess: boolean
): boolean {
  if (hasFullAccess) return true;
  return contentLevel <= FREE_TIER_MAX_LEVEL;
}

/**
 * Get the level filter for Prisma queries based on subscription
 */
export function getLevelFilter(hasFullAccess: boolean): { levelId?: { lte: number } } {
  if (hasFullAccess) return {};
  return { levelId: { lte: FREE_TIER_MAX_LEVEL } };
}

/**
 * Format subscription status for display
 */
export function formatSubscriptionStatus(status: SubscriptionStatusType): string {
  const statusMap: Record<SubscriptionStatusType, string> = {
    free: "Gratuit",
    active: "Actif",
    canceled: "Annulé",
    past_due: "Paiement en attente",
    lifetime: "À vie",
  };
  return statusMap[status] || status;
}

/**
 * Get appropriate badge color for subscription status
 */
export function getSubscriptionStatusColor(status: SubscriptionStatusType): string {
  const colorMap: Record<SubscriptionStatusType, string> = {
    free: "bg-stone-100 text-stone-700",
    active: "bg-emerald-100 text-emerald-700",
    canceled: "bg-amber-100 text-amber-700",
    past_due: "bg-red-100 text-red-700",
    lifetime: "bg-purple-100 text-purple-700",
  };
  return colorMap[status] || "bg-stone-100 text-stone-700";
}
