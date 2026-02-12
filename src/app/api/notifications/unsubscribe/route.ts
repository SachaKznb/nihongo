import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/notifications/unsubscribe
 * One-click unsubscribe from emails
 * Query params:
 *   - token: unsubscribe token
 *   - type: 'all' | 'reviews_waiting' | 'streak_at_risk' | 'level_up' | 'reengagement' | 'weekly_summary'
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const type = searchParams.get("type") || "all";

    if (!token) {
      return redirectWithMessage("error", "Token manquant");
    }

    // Find user by unsubscribe token
    const user = await prisma.user.findUnique({
      where: { unsubscribeToken: token },
      select: { id: true, username: true },
    });

    if (!user) {
      return redirectWithMessage("error", "Token invalide ou expire");
    }

    // Determine which préférences to update
    const updates: Record<string, boolean> = {};

    switch (type) {
      case "all":
        updates.emailNotificationsEnabled = false;
        break;
      case "reviews_waiting":
        updates.notifyReviewsWaiting = false;
        break;
      case "streak_at_risk":
        updates.notifyStreakAtRisk = false;
        break;
      case "level_up":
        updates.notifyLevelUp = false;
        break;
      case "reengagement":
        updates.notifyReengagement = false;
        break;
      case "weekly_summary":
        updates.notifyWeeklySummary = false;
        break;
      default:
        updates.emailNotificationsEnabled = false;
    }

    // Update user préférences
    await prisma.user.update({
      where: { id: user.id },
      data: updates,
    });

    // Log the unsubscribe
    await prisma.notificationLog.create({
      data: {
        userId: user.id,
        type: `unsubscribe_${type}`,
        success: true,
        metadata: { type },
      },
    });

    // Redirect to unsubscribe confirmation page
    const typeNames: Record<string, string> = {
      all: "toutes les notifications",
      reviews_waiting: "les rappels de révisions",
      streak_at_risk: "les alertes de serie",
      level_up: "les notifications de niveau",
      reengagement: "les rappels de reengagement",
      weekly_summary: "le résumé hebdomadaire",
    };

    const typeName = typeNames[type] || typeNames.all;
    return redirectWithMessage("success", typeName);
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return redirectWithMessage("error", "Une erreur est survenue");
  }
}

function redirectWithMessage(status: "success" | "error", message: string) {
  const baseUrl = process.env.NEXTAUTH_URL || "https://trynihongo.fr";
  const url = new URL("/unsubscribe", baseUrl);
  url.searchParams.set("status", status);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url);
}
