import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const updateRadicalSchema = z.object({
  character: z.string().min(1).max(10).optional().nullable(),
  meaningFr: z.string().min(1, "Signification requise").optional(),
  meaningHintFr: z.string().optional().nullable(),
  mnemonic: z.string().optional(),
  imageUrl: z.string().optional().nullable(),
  levelId: z.number().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const { id } = await params;
    const radicalId = parseInt(id);

    const radical = await prisma.radical.findUnique({
      where: { id: radicalId },
      include: {
        level: {
          select: { id: true },
        },
        kanji: {
          select: {
            kanji: {
              select: { id: true, character: true, meaningsFr: true },
            },
          },
        },
      },
    });

    if (!radical) {
      return NextResponse.json(
        { error: "Radical non trouve" },
        { status: 404 }
      );
    }

    return NextResponse.json({ radical });
  } catch (error) {
    console.error("Admin get radical error:", error);
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
    const radicalId = parseInt(id);
    const body = await request.json();

    const validation = updateRadicalSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const existingRadical = await prisma.radical.findUnique({
      where: { id: radicalId },
    });

    if (!existingRadical) {
      return NextResponse.json(
        { error: "Radical non trouve" },
        { status: 404 }
      );
    }

    const { character, meaningFr, meaningHintFr, mnemonic, imageUrl, levelId } = validation.data;

    // If levelId is being changed, verify the new level exists
    if (levelId !== undefined && levelId !== existingRadical.levelId) {
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
    if (character !== undefined) updates.character = character;
    if (meaningFr !== undefined) updates.meaningFr = meaningFr;
    if (meaningHintFr !== undefined) updates.meaningHintFr = meaningHintFr;
    if (mnemonic !== undefined) updates.mnemonic = mnemonic;
    if (imageUrl !== undefined) updates.imageUrl = imageUrl;
    if (levelId !== undefined) updates.levelId = levelId;

    const radical = await prisma.radical.update({
      where: { id: radicalId },
      data: updates,
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.update",
      targetType: "radical",
      targetId: id.toString(),
      details: { updates },
    });

    return NextResponse.json({ radical });
  } catch (error) {
    console.error("Admin update radical error:", error);
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
    const radicalId = parseInt(id);

    const existingRadical = await prisma.radical.findUnique({
      where: { id: radicalId },
      include: {
        kanji: true,
        userProgress: true,
      },
    });

    if (!existingRadical) {
      return NextResponse.json(
        { error: "Radical non trouve" },
        { status: 404 }
      );
    }

    // Check if radical is used by kanji or has user progress
    if (existingRadical.kanji.length > 0) {
      return NextResponse.json(
        { error: `Ce radical est utilise par ${existingRadical.kanji.length} kanji. Supprimez d'abord les associations.` },
        { status: 400 }
      );
    }

    if (existingRadical.userProgress.length > 0) {
      return NextResponse.json(
        { error: `Ce radical a ${existingRadical.userProgress.length} progressions utilisateur. Supprimez d'abord les progressions.` },
        { status: 400 }
      );
    }

    await prisma.radical.delete({
      where: { id: radicalId },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.delete",
      targetType: "radical",
      targetId: id.toString(),
      details: { meaning: existingRadical.meaningFr },
    });

    return NextResponse.json({ message: "Radical supprime" });
  } catch (error) {
    console.error("Admin delete radical error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
