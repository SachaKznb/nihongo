import { NextRequest, NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdminApi();
  if (error || !session) return error;

  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        emailVerified: true,
        isAdmin: true,
        isSuspended: true,
        suspendedAt: true,
        suspendedBy: true,
        suspendReason: true,
        currentLevel: true,
        currentStreak: true,
        longestStreak: true,
        totalXp: true,
        weeklyXp: true,
        totalReviewsDone: true,
        totalLessonsDone: true,
        perfectDays: true,
        lastStudyDate: true,
        lessonsPerDay: true,
        reviewBatchSize: true,
        autoplayAudio: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Get progress counts
    const [radicalProgress, kanjiProgress, vocabProgress] = await Promise.all([
      prisma.userRadicalProgress.groupBy({
        by: ["srsStage"],
        where: { userId: id },
        _count: true,
      }),
      prisma.userKanjiProgress.groupBy({
        by: ["srsStage"],
        where: { userId: id },
        _count: true,
      }),
      prisma.userVocabularyProgress.groupBy({
        by: ["srsStage"],
        where: { userId: id },
        _count: true,
      }),
    ]);

    return NextResponse.json({
      user,
      progress: {
        radicals: radicalProgress,
        kanji: kanjiProgress,
        vocabulary: vocabProgress,
      },
    });
  } catch (error) {
    console.error("Admin get user error:", error);
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
    const body = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Only allow certain fields to be updated
    const allowedFields = ["currentLevel", "isAdmin"];
    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "Aucun champ a mettre a jour" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: updates,
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "user.update",
      targetType: "user",
      targetId: id,
      details: { updates },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Admin update user error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
