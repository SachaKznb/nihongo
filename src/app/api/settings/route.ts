import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const settingsSchema = z.object({
  lessonsPerDay: z.number().int().min(1).max(100).optional(),
  lessonBatchSize: z.number().int().min(3).max(20).optional(),
  reviewBatchSize: z.number().int().min(1).max(50).optional(),
  autoplayAudio: z.boolean().optional(),
  levelAwareSentencesEnabled: z.boolean().optional(),
  leaderboardOptIn: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      lessonsPerDay: true,
      lessonBatchSize: true,
      reviewBatchSize: true,
      autoplayAudio: true,
      levelAwareSentencesEnabled: true,
      leaderboardOptIn: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouvé" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();

  const validation = settingsSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.issues[0].message },
      { status: 400 }
    );
  }

  const { lessonsPerDay, lessonBatchSize, reviewBatchSize, autoplayAudio, levelAwareSentencesEnabled, leaderboardOptIn } = validation.data;

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(lessonsPerDay !== undefined && { lessonsPerDay }),
        ...(lessonBatchSize !== undefined && { lessonBatchSize }),
        ...(reviewBatchSize !== undefined && { reviewBatchSize }),
        ...(autoplayAudio !== undefined && { autoplayAudio }),
        ...(levelAwareSentencesEnabled !== undefined && { levelAwareSentencesEnabled }),
        ...(leaderboardOptIn !== undefined && { leaderboardOptIn }),
      },
      select: {
        lessonsPerDay: true,
        lessonBatchSize: true,
        reviewBatchSize: true,
        autoplayAudio: true,
        levelAwareSentencesEnabled: true,
        leaderboardOptIn: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise a jour des parametres" },
      { status: 500 }
    );
  }
}
