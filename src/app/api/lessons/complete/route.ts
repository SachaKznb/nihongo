import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SRS_STAGES, calculateNextReview } from "@/lib/srs";
import { unlockAvailableItems } from "@/lib/unlocks";
import type { ItemType } from "@/types";

// POST /api/lessons/complete - Mark a lesson as completed
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();
  const { type, id } = body as { type: ItemType; id: number };

  if (!type || !id) {
    return NextResponse.json(
      { error: "Type et ID requis" },
      { status: 400 }
    );
  }

  const nextReviewAt = calculateNextReview(SRS_STAGES.APPRENTICE_1);

  try {
    if (type === "radical") {
      await prisma.userRadicalProgress.update({
        where: { userId_radicalId: { userId, radicalId: id } },
        data: {
          srsStage: SRS_STAGES.APPRENTICE_1,
          nextReviewAt,
        },
      });
    } else if (type === "kanji") {
      await prisma.userKanjiProgress.update({
        where: { userId_kanjiId: { userId, kanjiId: id } },
        data: {
          srsStage: SRS_STAGES.APPRENTICE_1,
          nextReviewAt,
        },
      });
    } else if (type === "vocabulary") {
      await prisma.userVocabularyProgress.update({
        where: { userId_vocabularyId: { userId, vocabularyId: id } },
        data: {
          srsStage: SRS_STAGES.APPRENTICE_1,
          nextReviewAt,
        },
      });
    }

    // Check for newly unlocked items after completing a lesson
    await unlockAvailableItems(userId);

    // Award XP for completing a lesson (+10 XP)
    await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { increment: 10 },
        weeklyXp: { increment: 10 },
        totalLessonsDone: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, nextReviewAt });
  } catch (error) {
    console.error("Lesson complete error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la completion de la lecon" },
      { status: 500 }
    );
  }
}
