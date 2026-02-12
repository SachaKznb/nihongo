import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * GET /api/notifications/preferences
 * Get current user's notification preferences
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        emailNotificationsEnabled: true,
        notifyReviewsWaiting: true,
        notifyStreakAtRisk: true,
        notifyLevelUp: true,
        notifyReengagement: true,
        notifyWeeklySummary: true,
        preferredNotificationHour: true,
        timezone: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Get notification preferences error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des preferences" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/notifications/preferences
 * Update current user's notification preferences
 */
export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    const body = await request.json();

    // Validate fields
    const allowedFields = [
      "emailNotificationsEnabled",
      "notifyReviewsWaiting",
      "notifyStreakAtRisk",
      "notifyLevelUp",
      "notifyReengagement",
      "notifyWeeklySummary",
      "preferredNotificationHour",
      "timezone",
    ];

    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (field in body) {
        // Validate types
        if (field === "preferredNotificationHour") {
          const hour = parseInt(body[field]);
          if (isNaN(hour) || hour < 0 || hour > 23) {
            return NextResponse.json(
              { error: "L'heure doit etre entre 0 et 23" },
              { status: 400 }
            );
          }
          updates[field] = hour;
        } else if (field === "timezone") {
          // Validate timezone
          try {
            Intl.DateTimeFormat("en-US", { timeZone: body[field] });
            updates[field] = body[field];
          } catch {
            return NextResponse.json(
              { error: "Fuseau horaire invalide" },
              { status: 400 }
            );
          }
        } else {
          // Boolean fields
          updates[field] = Boolean(body[field]);
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Aucune modification fournie" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updates,
      select: {
        emailNotificationsEnabled: true,
        notifyReviewsWaiting: true,
        notifyStreakAtRisk: true,
        notifyLevelUp: true,
        notifyReengagement: true,
        notifyWeeklySummary: true,
        preferredNotificationHour: true,
        timezone: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update notification preferences error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour des preferences" },
      { status: 500 }
    );
  }
}
