import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generalRateLimit, checkRateLimit, cacheGet, cacheSet } from "@/lib/upstash";

type LeaderboardType = "weekly" | "monthly" | "alltime" | "streak" | "level";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  level: number;
  value: number;
  currentStreak: number;
}

interface LeaderboardResponse {
  type: LeaderboardType;
  period?: { start: string; end: string };
  rankings: LeaderboardEntry[];
  currentUser?: {
    rank: number;
    value: number;
  };
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    // Rate limiting (allow anonymous access but rate limit by IP)
    const identifier = userId || request.headers.get("x-forwarded-for") || "anonymous";
    const rateLimit = await checkRateLimit(generalRateLimit, identifier);
    if (!rateLimit.success) {
      return NextResponse.json({ error: "Trop de requetes" }, { status: 429 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = (searchParams.get("type") || "weekly") as LeaderboardType;
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    // Validate type
    const validTypes: LeaderboardType[] = ["weekly", "monthly", "alltime", "streak", "level"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Type de classement invalide" }, { status: 400 });
    }

    // Check cache first (5 minute TTL for leaderboard)
    const cacheKey = `leaderboard:${type}:${limit}`;
    const cached = await cacheGet<LeaderboardResponse>(cacheKey);
    if (cached && !userId) {
      // Return cached for anonymous users
      return NextResponse.json(cached);
    }

    const now = new Date();
    let rankings: LeaderboardEntry[] = [];
    let period: { start: string; end: string } | undefined;

    // Get opted-in users based on leaderboard type
    const baseWhere = {
      leaderboardOptIn: true,
      isSuspended: false,
      emailVerified: { not: null },
    };

    switch (type) {
      case "weekly": {
        // Get Monday of current week
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        period = {
          start: weekStart.toISOString().split("T")[0],
          end: weekEnd.toISOString().split("T")[0],
        };

        // Use weeklyXp field (reset weekly)
        const users = await prisma.user.findMany({
          where: {
            ...baseWhere,
            weeklyXp: { gt: 0 },
          },
          select: {
            id: true,
            username: true,
            currentLevel: true,
            weeklyXp: true,
            currentStreak: true,
          },
          orderBy: { weeklyXp: "desc" },
          take: limit,
        });

        rankings = users.map((user, index) => ({
          rank: index + 1,
          userId: user.id,
          username: user.username,
          level: user.currentLevel,
          value: user.weeklyXp,
          currentStreak: user.currentStreak,
        }));
        break;
      }

      case "monthly": {
        // Get first day of current month
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        period = {
          start: monthStart.toISOString().split("T")[0],
          end: monthEnd.toISOString().split("T")[0],
        };

        // Calculate monthly XP from reviews
        const monthlyData = await prisma.review.groupBy({
          by: ["userId"],
          where: {
            createdAt: { gte: monthStart },
            user: baseWhere,
          },
          _count: { id: true },
        });

        // Get lesson count for XP calculation
        const monthlyLessons = await prisma.review.groupBy({
          by: ["userId"],
          where: {
            createdAt: { gte: monthStart },
            srsStageFrom: 0,
            user: baseWhere,
          },
          _count: { id: true },
        });

        const lessonMap = new Map(monthlyLessons.map(l => [l.userId, l._count.id]));

        const userXpMap = new Map<string, number>();
        for (const data of monthlyData) {
          const lessons = lessonMap.get(data.userId) || 0;
          const reviews = data._count.id - lessons;
          const xp = lessons * 10 + reviews * 5;
          userXpMap.set(data.userId, xp);
        }

        // Get user details for top users
        const topUserIds = Array.from(userXpMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, limit)
          .map(([id]) => id);

        const users = await prisma.user.findMany({
          where: { id: { in: topUserIds } },
          select: {
            id: true,
            username: true,
            currentLevel: true,
            currentStreak: true,
          },
        });

        const userMap = new Map(users.map(u => [u.id, u]));

        rankings = topUserIds.map((id, index) => {
          const user = userMap.get(id)!;
          return {
            rank: index + 1,
            userId: id,
            username: user.username,
            level: user.currentLevel,
            value: userXpMap.get(id) || 0,
            currentStreak: user.currentStreak,
          };
        });
        break;
      }

      case "alltime": {
        const users = await prisma.user.findMany({
          where: baseWhere,
          select: {
            id: true,
            username: true,
            currentLevel: true,
            totalXp: true,
            currentStreak: true,
          },
          orderBy: { totalXp: "desc" },
          take: limit,
        });

        rankings = users.map((user, index) => ({
          rank: index + 1,
          userId: user.id,
          username: user.username,
          level: user.currentLevel,
          value: user.totalXp,
          currentStreak: user.currentStreak,
        }));
        break;
      }

      case "streak": {
        const users = await prisma.user.findMany({
          where: {
            ...baseWhere,
            currentStreak: { gt: 0 },
          },
          select: {
            id: true,
            username: true,
            currentLevel: true,
            totalXp: true,
            currentStreak: true,
          },
          orderBy: { currentStreak: "desc" },
          take: limit,
        });

        rankings = users.map((user, index) => ({
          rank: index + 1,
          userId: user.id,
          username: user.username,
          level: user.currentLevel,
          value: user.currentStreak,
          currentStreak: user.currentStreak,
        }));
        break;
      }

      case "level": {
        const users = await prisma.user.findMany({
          where: baseWhere,
          select: {
            id: true,
            username: true,
            currentLevel: true,
            totalXp: true,
            currentStreak: true,
          },
          orderBy: [
            { currentLevel: "desc" },
            { totalXp: "desc" },
          ],
          take: limit,
        });

        rankings = users.map((user, index) => ({
          rank: index + 1,
          userId: user.id,
          username: user.username,
          level: user.currentLevel,
          value: user.currentLevel,
          currentStreak: user.currentStreak,
        }));
        break;
      }
    }

    // Find current user's rank if logged in and opted in
    let currentUser: LeaderboardResponse["currentUser"];
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          leaderboardOptIn: true,
          weeklyXp: true,
          totalXp: true,
          currentStreak: true,
          currentLevel: true,
        },
      });

      if (user?.leaderboardOptIn) {
        const existingRank = rankings.find(r => r.userId === userId);
        if (existingRank) {
          currentUser = {
            rank: existingRank.rank,
            value: existingRank.value,
          };
        } else {
          // User not in top N, find their actual rank
          let value: number;
          let rank: number;

          switch (type) {
            case "weekly":
              value = user.weeklyXp;
              rank = await prisma.user.count({
                where: {
                  ...baseWhere,
                  weeklyXp: { gt: value },
                },
              }) + 1;
              break;
            case "alltime":
              value = user.totalXp;
              rank = await prisma.user.count({
                where: {
                  ...baseWhere,
                  totalXp: { gt: value },
                },
              }) + 1;
              break;
            case "streak":
              value = user.currentStreak;
              rank = await prisma.user.count({
                where: {
                  ...baseWhere,
                  currentStreak: { gt: value },
                },
              }) + 1;
              break;
            case "level":
              value = user.currentLevel;
              rank = await prisma.user.count({
                where: {
                  ...baseWhere,
                  currentLevel: { gt: value },
                },
              }) + 1;
              break;
            default:
              value = 0;
              rank = 0;
          }

          if (rank > 0) {
            currentUser = { rank, value };
          }
        }
      }
    }

    const response: LeaderboardResponse = {
      type,
      period,
      rankings,
      currentUser,
    };

    // Cache the response (without user-specific data)
    if (!userId) {
      await cacheSet(cacheKey, response, 300); // 5 minutes
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Leaderboard GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement du classement" },
      { status: 500 }
    );
  }
}
