import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const updateVocabularySchema = z.object({
  word: z.string().min(1, "Mot requis").optional(),
  meaningsFr: z.array(z.string()).optional(),
  readings: z.array(z.string()).optional(),
  mnemonicFr: z.string().optional(),
  sentenceJp: z.string().optional().nullable(),
  sentenceFr: z.string().optional().nullable(),
  levelId: z.number().optional(),
  kanjiIds: z.array(z.number()).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const { id } = await params;
    const vocabId = parseInt(id);

    const vocabulary = await prisma.vocabulary.findUnique({
      where: { id: vocabId },
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
    });

    if (!vocabulary) {
      return NextResponse.json(
        { error: "Vocabulaire non trouve" },
        { status: 404 }
      );
    }

    return NextResponse.json({ vocabulary });
  } catch (error) {
    console.error("Admin get vocabulary error:", error);
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
    const vocabId = parseInt(id);
    const body = await request.json();

    const validation = updateVocabularySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const existingVocabulary = await prisma.vocabulary.findUnique({
      where: { id: vocabId },
    });

    if (!existingVocabulary) {
      return NextResponse.json(
        { error: "Vocabulaire non trouve" },
        { status: 404 }
      );
    }

    const { word, meaningsFr, readings, mnemonicFr, sentenceJp, sentenceFr, levelId, kanjiIds } = validation.data;

    // If levelId is being changed, verify the new level exists
    if (levelId !== undefined && levelId !== existingVocabulary.levelId) {
      const level = await prisma.level.findUnique({
        where: { id: levelId },
      });

      if (!level) {
        return NextResponse.json(
          { error: "Niveau non trouve" },
          { status: 400 }
        );
      }
    }

    const updates: Record<string, unknown> = {};
    if (word !== undefined) updates.word = word;
    if (meaningsFr !== undefined) updates.meaningsFr = meaningsFr;
    if (readings !== undefined) updates.readings = readings;
    if (mnemonicFr !== undefined) updates.mnemonicFr = mnemonicFr;
    if (sentenceJp !== undefined) updates.sentenceJp = sentenceJp;
    if (sentenceFr !== undefined) updates.sentenceFr = sentenceFr;
    if (levelId !== undefined) updates.levelId = levelId;

    // Update vocabulary and kanji relationships in a transaction
    const vocabulary = await prisma.$transaction(async (tx) => {
      // Update kanji relationships if provided
      if (kanjiIds !== undefined) {
        // Delete existing relationships
        await tx.vocabularyKanji.deleteMany({
          where: { vocabularyId: vocabId },
        });

        // Create new relationships
        if (kanjiIds.length > 0) {
          await tx.vocabularyKanji.createMany({
            data: kanjiIds.map((kanjiId) => ({
              vocabularyId: vocabId,
              kanjiId,
            })),
          });
        }
      }

      // Update vocabulary
      return tx.vocabulary.update({
        where: { id: vocabId },
        data: updates,
        include: {
          kanji: {
            include: {
              kanji: true,
            },
          },
        },
      });
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.update",
      targetType: "vocabulary",
      targetId: id.toString(),
      details: { updates, kanjiIds },
    });

    return NextResponse.json({ vocabulary });
  } catch (error) {
    console.error("Admin update vocabulary error:", error);
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
    const vocabId = parseInt(id);

    const existingVocabulary = await prisma.vocabulary.findUnique({
      where: { id: vocabId },
      include: {
        userProgress: true,
      },
    });

    if (!existingVocabulary) {
      return NextResponse.json(
        { error: "Vocabulaire non trouve" },
        { status: 404 }
      );
    }

    if (existingVocabulary.userProgress.length > 0) {
      return NextResponse.json(
        { error: `Ce vocabulaire a ${existingVocabulary.userProgress.length} progressions utilisateur. Supprimez d'abord les progressions.` },
        { status: 400 }
      );
    }

    // Delete vocabulary and its kanji relationships
    await prisma.$transaction([
      prisma.vocabularyKanji.deleteMany({ where: { vocabularyId: vocabId } }),
      prisma.vocabulary.delete({ where: { id: vocabId } }),
    ]);

    await logAdminAction({
      adminId: session.user.id,
      action: "content.delete",
      targetType: "vocabulary",
      targetId: id.toString(),
      details: { word: existingVocabulary.word, meanings: existingVocabulary.meaningsFr },
    });

    return NextResponse.json({ message: "Vocabulaire supprime" });
  } catch (error) {
    console.error("Admin delete vocabulary error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
