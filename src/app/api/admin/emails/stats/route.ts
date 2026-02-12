import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminApi } from "@/lib/admin-auth";

/**
 * GET /api/admin/emails/stats
 * Get notification statistics for each email type
 */
export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    // Get aggregated stats for each notification type
    const notificationStats = await prisma.notificationLog.groupBy({
      by: ["type"],
      _count: {
        _all: true,
      },
      _max: {
        sentAt: true,
      },
    });

    // Get success/failure counts per type
    const successStats = await prisma.notificationLog.groupBy({
      by: ["type", "success"],
      _count: {
        _all: true,
      },
    });

    // Build stats map
    const statsMap: Record<
      string,
      { total: number; success: number; failed: number; lastSent: Date | null }
    > = {};

    for (const stat of notificationStats) {
      statsMap[stat.type] = {
        total: stat._count._all,
        success: 0,
        failed: 0,
        lastSent: stat._max.sentAt,
      };
    }

    for (const stat of successStats) {
      if (statsMap[stat.type]) {
        if (stat.success) {
          statsMap[stat.type].success = stat._count._all;
        } else {
          statsMap[stat.type].failed = stat._count._all;
        }
      }
    }

    // Convert to array
    const stats = Object.entries(statsMap).map(([type, data]) => ({
      type,
      ...data,
      lastSent: data.lastSent?.toISOString() || null,
    }));

    // Also get recent stats (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentStats = await prisma.notificationLog.groupBy({
      by: ["type"],
      where: {
        sentAt: { gte: sevenDaysAgo },
      },
      _count: {
        _all: true,
      },
    });

    const recentByType: Record<string, number> = {};
    for (const stat of recentStats) {
      recentByType[stat.type] = stat._count._all;
    }

    return NextResponse.json({
      stats,
      recentByType,
      totalEmails: await prisma.notificationLog.count(),
      last7Days: await prisma.notificationLog.count({
        where: { sentAt: { gte: sevenDaysAgo } },
      }),
    });
  } catch (err) {
    console.error("Error fetching email stats:", err);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
