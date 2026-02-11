import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build where clause
    const where: {
      OR?: Array<{ email?: { contains: string; mode: "insensitive" }; username?: { contains: string; mode: "insensitive" } }>;
      isSuspended?: boolean;
      emailVerified?: null | { not: null };
      isAdmin?: boolean;
    } = {};

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
      ];
    }

    switch (status) {
      case "suspended":
        where.isSuspended = true;
        break;
      case "active":
        where.isSuspended = false;
        break;
      case "unverified":
        where.emailVerified = null;
        break;
      case "admin":
        where.isAdmin = true;
        break;
    }

    // Build orderBy
    const orderBy: Record<string, string> = {};
    orderBy[sortBy] = sortOrder;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          emailVerified: true,
          isAdmin: true,
          isSuspended: true,
          currentLevel: true,
          currentStreak: true,
          totalXp: true,
          lastStudyDate: true,
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin users list error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
