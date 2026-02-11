import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const kanjiSchema = z.object({
  character: z.string().min(1, "Caractere requis").max(1),
  meaningsFr: z.array(z.string()).min(1, "Au moins une signification requise"),
  meaningMnemonicFr: z.string().min(1, "Mnemonique de signification requis"),
  readingsOn: z.array(z.string()).optional(),
  readingsKun: z.array(z.string()).optional(),
  readingMnemonicFr: z.string().min(1, "Mnemonique de lecture requis"),
  levelId: z.number().min(1, "Niveau requis"),
  radicalIds: z.array(z.number()).optional(),
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
      OR?: Array<{ character?: { contains: string }; meaningsFr?: { has: string } }>;
      levelId?: number;
    } = {};

    if (search) {
      where.OR = [
        { character: { contains: search } },
        { meaningsFr: { has: search } },
      ];
    }

    if (levelId) {
      where.levelId = parseInt(levelId);
    }

    const [kanji, total] = await Promise.all([
      prisma.kanji.findMany({
        where,
        include: {
          level: {
            select: { id: true },
          },
          radicals: {
            include: {
              radical: {
                select: { id: true, character: true, meaningFr: true },
              },
            },
          },
        },
        orderBy: [
          { levelId: "asc" },
          { character: "asc" },
        ],
        skip,
        take: limit,
      }),
      prisma.kanji.count({ where }),
    ]);

    return NextResponse.json({
      kanji,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin kanji list error:", error);
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
    const validation = kanjiSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { character, meaningsFr, meaningMnemonicFr, readingsOn, readingsKun, readingMnemonicFr, levelId, radicalIds } = validation.data;

    // Verify level exists
    const level = await prisma.level.findUnique({
      where: { id: levelId },
    });

    if (!level) {
      return NextResponse.json(
        { error: "Niveau non trouve" },
        { status: 400 }
      );
    }

    // Check if character already exists
    const existingKanji = await prisma.kanji.findUnique({
      where: { character },
    });

    if (existingKanji) {
      return NextResponse.json(
        { error: "Ce kanji existe deja" },
        { status: 400 }
      );
    }

    // Create kanji with radical relationships
    const kanji = await prisma.kanji.create({
      data: {
        character,
        meaningsFr,
        meaningMnemonicFr,
        readingsOn: readingsOn || [],
        readingsKun: readingsKun || [],
        readingMnemonicFr,
        levelId,
        radicals: radicalIds && radicalIds.length > 0
          ? {
              create: radicalIds.map((radicalId) => ({
                radicalId,
              })),
            }
          : undefined,
      },
      include: {
        radicals: {
          include: {
            radical: true,
          },
        },
      },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.create",
      targetType: "kanji",
      targetId: kanji.id.toString(),
      details: { character, meanings: meaningsFr, levelId },
    });

    return NextResponse.json({ kanji }, { status: 201 });
  } catch (error) {
    console.error("Admin create kanji error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
