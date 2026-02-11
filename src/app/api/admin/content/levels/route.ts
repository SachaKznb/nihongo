import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

export async function GET(request: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "100");

    const skip = (page - 1) * limit;

    const [levels, total] = await Promise.all([
      prisma.level.findMany({
        include: {
          _count: {
            select: {
              radicals: true,
              kanji: true,
              vocabulary: true,
            },
          },
        },
        orderBy: { id: "asc" },
        skip,
        take: limit,
      }),
      prisma.level.count(),
    ]);

    return NextResponse.json({
      levels,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin levels list error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { error, session } = await requireAdminApi();
  if (error || !session) return error;

  try {
    const body = await request.json();
    const { name } = body;

    const level = await prisma.level.create({
      data: { name: name || null },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.create",
      targetType: "level",
      targetId: level.id.toString(),
      details: { id: level.id, name },
    });

    return NextResponse.json({ level }, { status: 201 });
  } catch (error) {
    console.error("Admin create level error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
