import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const updateKanjiSchema = z.object({
  character: z.string().min(1).max(1).optional(),
  meaningsFr: z.array(z.string()).optional(),
  meaningMnemonicFr: z.string().optional(),
  readingsOn: z.array(z.string()).optional(),
  readingsKun: z.array(z.string()).optional(),
  readingMnemonicFr: z.string().optional(),
  levelId: z.number().optional(),
  radicalIds: z.array(z.number()).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const { id } = await params;
    const kanjiId = parseInt(id);

    const kanji = await prisma.kanji.findUnique({
      where: { id: kanjiId },
      include: {
        level: {
          select: { id: true },
        },
        radicals: {
          include: {
            radical: {
              select: { id: true, character: true, meaningFr: true, imageUrl: true },
            },
          },
        },
        vocabulary: {
          select: {
            vocabulary: {
              select: { id: true, word: true, meaningsFr: true },
            },
          },
        },
      },
    });

    if (!kanji) {
      return NextResponse.json(
        { error: "Kanji non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ kanji });
  } catch (error) {
    console.error("Admin get kanji error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdminApi();
  if (error || !session) return error;

  try {
    const { id } = await params;
    const kanjiId = parseInt(id);
    const body = await request.json();

    const validation = updateKanjiSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const existingKanji = await prisma.kanji.findUnique({
      where: { id: kanjiId },
    });

    if (!existingKanji) {
      return NextResponse.json(
        { error: "Kanji non trouvé" },
        { status: 404 }
      );
    }

    const { character, meaningsFr, meaningMnemonicFr, readingsOn, readingsKun, readingMnemonicFr, levelId, radicalIds } = validation.data;

    // If character is being changed, check uniqueness
    if (character && character !== existingKanji.character) {
      const duplicateKanji = await prisma.kanji.findUnique({
        where: { character },
      });
      if (duplicateKanji) {
        return NextResponse.json(
          { error: "Ce kanji existe deja" },
          { status: 400 }
        );
      }
    }

    // If levelId is being changed, verify the new level exists
    if (levelId !== undefined && levelId !== existingKanji.levelId) {
      const level = await prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!level) {
        return NextResponse.json(
          { error: "Niveau non trouvé" },
          { status: 400 }
        );
      }
    }

    const updates: Record<string, unknown> = {};
    if (character !== undefined) updates.character = character;
    if (meaningsFr !== undefined) updates.meaningsFr = meaningsFr;
    if (meaningMnemonicFr !== undefined) updates.meaningMnemonicFr = meaningMnemonicFr;
    if (readingsOn !== undefined) updates.readingsOn = readingsOn;
    if (readingsKun !== undefined) updates.readingsKun = readingsKun;
    if (readingMnemonicFr !== undefined) updates.readingMnemonicFr = readingMnemonicFr;
    if (levelId !== undefined) updates.levelId = levelId;

    // Update kanji and radical relationships in a transaction
    const kanji = await prisma.$transaction(async (tx) => {
      // Update radical relationships if provided
      if (radicalIds !== undefined) {
        // Delete existing relationships
        await tx.kanjiRadical.deleteMany({
          where: { kanjiId },
        });

        // Create new relationships
        if (radicalIds.length > 0) {
          await tx.kanjiRadical.createMany({
            data: radicalIds.map((radicalId) => ({
              kanjiId,
              radicalId,
            })),
          });
        }
      }

      // Update kanji
      return tx.kanji.update({
        where: { id: kanjiId },
        data: updates,
        include: {
          radicals: {
            include: {
              radical: true,
            },
          },
        },
      });
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.update",
      targetType: "kanji",
      targetId: id.toString(),
      details: { updates, radicalIds },
    });

    return NextResponse.json({ kanji });
  } catch (error) {
    console.error("Admin update kanji error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdminApi();
  if (error || !session) return error;

  try {
    const { id } = await params;
    const kanjiId = parseInt(id);

    const existingKanji = await prisma.kanji.findUnique({
      where: { id: kanjiId },
      include: {
        vocabulary: true,
        userProgress: true,
      },
    });

    if (!existingKanji) {
      return NextResponse.json(
        { error: "Kanji non trouvé" },
        { status: 404 }
      );
    }

    // Check if kanji is used by vocabulary or has user progress
    if (existingKanji.vocabulary.length > 0) {
      return NextResponse.json(
        { error: `Ce kanji est utilise par ${existingKanji.vocabulary.length} mots de vocabulaire. Supprimez d'abord les associations.` },
        { status: 400 }
      );
    }

    if (existingKanji.userProgress.length > 0) {
      return NextResponse.json(
        { error: `Ce kanji a ${existingKanji.userProgress.length} progressions utilisateur. Supprimez d'abord les progressions.` },
        { status: 400 }
      );
    }

    // Delete kanji and its radical relationships
    await prisma.$transaction([
      prisma.kanjiRadical.deleteMany({ where: { kanjiId } }),
      prisma.kanji.delete({ where: { id: kanjiId } }),
    ]);

    await logAdminAction({
      adminId: session.user.id,
      action: "content.delete",
      targetType: "kanji",
      targetId: id.toString(),
      details: { character: existingKanji.character, meanings: existingKanji.meaningsFr },
    });

    return NextResponse.json({ message: "Kanji supprime" });
  } catch (error) {
    console.error("Admin delete kanji error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
