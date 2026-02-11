import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const [
      totalUsers,
      activeUsers,
      suspendedUsers,
      unverifiedUsers,
      totalRadicals,
      totalKanji,
      totalVocabulary,
      totalLevels,
      totalReviews,
      recentReviews,
      recentRegistrations,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          lastStudyDate: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.user.count({ where: { isSuspended: true } }),
      prisma.user.count({ where: { emailVerified: null } }),
      prisma.radical.count(),
      prisma.kanji.count(),
      prisma.vocabulary.count(),
      prisma.level.count(),
      prisma.review.count(),
      prisma.review.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        suspended: suspendedUsers,
        unverified: unverifiedUsers,
        recentRegistrations,
      },
      content: {
        radicals: totalRadicals,
        kanji: totalKanji,
        vocabulary: totalVocabulary,
        levels: totalLevels,
      },
      activity: {
        totalReviews,
        recentReviews,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
