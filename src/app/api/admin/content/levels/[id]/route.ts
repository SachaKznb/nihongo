import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const updateLevelSchema = z.object({
  name: z.string().optional().nullable(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminApi();
  if (error) return error;

  try {
    const { id } = await params;
    const levelId = parseInt(id);

    const level = await prisma.level.findUnique({
      where: { id: levelId },
      include: {
        radicals: {
          select: { id: true, character: true, meaningFr: true, imageUrl: true },
        },
        kanji: {
          select: { id: true, character: true, meaningsFr: true },
        },
        vocabulary: {
          select: { id: true, word: true, readings: true, meaningsFr: true },
        },
        _count: {
          select: {
            radicals: true,
            kanji: true,
            vocabulary: true,
          },
        },
      },
    });

    if (!level) {
      return NextResponse.json(
        { error: "Niveau non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ level });
  } catch (error) {
    console.error("Admin get level error:", error);
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
    const levelId = parseInt(id);
    const body = await request.json();

    const validation = updateLevelSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const existingLevel = await prisma.level.findUnique({
      where: { id: levelId },
    });

    if (!existingLevel) {
      return NextResponse.json(
        { error: "Niveau non trouvé" },
        { status: 404 }
      );
    }

    const { name } = validation.data;

    const level = await prisma.level.update({
      where: { id: levelId },
      data: { name },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.update",
      targetType: "level",
      targetId: id.toString(),
      details: { name, previousName: existingLevel.name },
    });

    return NextResponse.json({ level });
  } catch (error) {
    console.error("Admin update level error:", error);
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
    const levelId = parseInt(id);

    const existingLevel = await prisma.level.findUnique({
      where: { id: levelId },
      include: {
        _count: {
          select: {
            radicals: true,
            kanji: true,
            vocabulary: true,
          },
        },
      },
    });

    if (!existingLevel) {
      return NextResponse.json(
        { error: "Niveau non trouvé" },
        { status: 404 }
      );
    }

    const totalContent =
      existingLevel._count.radicals +
      existingLevel._count.kanji +
      existingLevel._count.vocabulary;

    if (totalContent > 0) {
      return NextResponse.json(
        { error: `Ce niveau contient ${totalContent} éléments. Supprimez d'abord le contenu ou reassignez-le a un autre niveau.` },
        { status: 400 }
      );
    }

    await prisma.level.delete({
      where: { id: levelId },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "content.delete",
      targetType: "level",
      targetId: id.toString(),
      details: { id: levelId, name: existingLevel.name },
    });

    return NextResponse.json({ message: "Niveau supprime" });
  } catch (error) {
    console.error("Admin delete level error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
