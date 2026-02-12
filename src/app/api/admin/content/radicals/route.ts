import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const radicalSchema = z.object({
  character: z.string().min(1).max(10).optional(),
  meaningFr: z.string().min(1, "Signification requise"),
  meaningHintFr: z.string().optional(),
  mnemonic: z.string().min(1, "Mnemonique requis"),
  imageUrl: z.string().optional().nullable(),
  levelId: z.number().min(1, "Niveau requis"),
});

export async function GET(request: NextRequest) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const levelId = searchParams.get("levelId") || "";

    const skip = (page - 1) * limit;

    const where: {
      OR?: Array<{ character?: { contains: string }; meaningFr?: { contains: string; mode: "insensitive" } }>;
      levelId?: number;
    } = {};

    if (search) {
      where.OR = [
        { character: { contains: search } },
        { meaningFr: { contains: search, mode: "insensitive" } },
      ];
    }

    if (levelId) {
      where.levelId = parseInt(levelId);
    }

    const [radicals, total] = await Promise.all([
      prisma.radical.findMany({
        where,
        include: {
          level: {
            select: { id: true },
          },
        },
        orderBy: [
          { levelId: "asc" },
          { meaningFr: "asc" },
        ],
        skip,
        take: limit,
      }),
      prisma.radical.count({ where }),
    ]);

    return NextResponse.json({
      radicals,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin radicals list error:", error);
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
    const validation = radicalSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { character, meaningFr, meaningHintFr, mnemonic, imageUrl, levelId } = validation.data;

    // Verify level exists
    const level = await prisma.level.findUnique({
      where: { id: levelId },
    });

    if (!level) {
      return NextResponse.json(
        { error: "Niveau non trouvé" },
        { status: 400 }
      );
    }

    const radical = await prisma.radical.create({
      data: {
        character: character || null,
        meaningFr,
        meaningHintFr: meaningHintFr || null,
        mnemonic,
        imageUrl: imageUrl || null,
        levelId,
      },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.create",
      targetType: "radical",
      targetId: radical.id.toString(),
      details: { meaningFr, levelId },
    });

    return NextResponse.json({ radical }, { status: 201 });
  } catch (error) {
    console.error("Admin create radical error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
