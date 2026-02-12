import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        currentLevel: true,
        currentStreak: true,
        longestStreak: true,
        totalXp: true,
        totalReviewsDone: true,
        totalLessonsDone: true,
        perfectDays: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      stats: {
        currentLevel: user.currentLevel,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalXp: user.totalXp,
        totalReviewsDone: user.totalReviewsDone,
        totalLessonsDone: user.totalLessonsDone,
        perfectDays: user.perfectDays,
      },
    });
  } catch (error) {
    console.error("Get account error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
