import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const vocabularySchema = z.object({
  word: z.string().min(1, "Mot requis"),
  meaningsFr: z.array(z.string()).min(1, "Au moins une signification requise"),
  readings: z.array(z.string()).min(1, "Au moins une lecture requise"),
  mnemonicFr: z.string().min(1, "Mnemonique requis"),
  sentenceJp: z.string().optional(),
  sentenceFr: z.string().optional(),
  levelId: z.number().min(1, "Niveau requis"),
  kanjiIds: z.array(z.number()).optional(),
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
      OR?: Array<{ word?: { contains: string }; readings?: { has: string }; meaningsFr?: { has: string } }>;
      levelId?: number;
    } = {};

    if (search) {
      where.OR = [
        { word: { contains: search } },
        { readings: { has: search } },
        { meaningsFr: { has: search } },
      ];
    }

    if (levelId) {
      where.levelId = parseInt(levelId);
    }

    const [vocabulary, total] = await Promise.all([
      prisma.vocabulary.findMany({
        where,
        include: {
          level: {
            select: { id: true },
          },
          kanji: {
            include: {
              kanji: {
                select: { id: true, character: true, meaningsFr: true },
              },
            },
          },
        },
        orderBy: [
          { levelId: "asc" },
          { word: "asc" },
        ],
        skip,
        take: limit,
      }),
      prisma.vocabulary.count({ where }),
    ]);

    return NextResponse.json({
      vocabulary,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Admin vocabulary list error:", error);
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
    const validation = vocabularySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { word, meaningsFr, readings, mnemonicFr, sentenceJp, sentenceFr, levelId, kanjiIds } = validation.data;

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

    // Create vocabulary with kanji relationships
    const vocabulary = await prisma.vocabulary.create({
      data: {
        word,
        meaningsFr,
        readings,
        mnemonicFr,
        sentenceJp: sentenceJp || null,
        sentenceFr: sentenceFr || null,
        levelId,
        kanji: kanjiIds && kanjiIds.length > 0
          ? {
              create: kanjiIds.map((kanjiId) => ({
                kanjiId,
              })),
            }
          : undefined,
      },
      include: {
        kanji: {
          include: {
            kanji: true,
          },
        },
      },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.create",
      targetType: "vocabulary",
      targetId: vocabulary.id.toString(),
      details: { word, meanings: meaningsFr, levelId },
    });

    return NextResponse.json({ vocabulary }, { status: 201 });
  } catch (error) {
    console.error("Admin create vocabulary error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
