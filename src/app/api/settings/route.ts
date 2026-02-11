import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      lessonsPerDay: true,
      reviewBatchSize: true,
      autoplayAudio: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Utilisateur non trouve" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const body = await request.json();
  const { lessonsPerDay, reviewBatchSize, autoplayAudio } = body;

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        lessonsPerDay: lessonsPerDay ?? undefined,
        reviewBatchSize: reviewBatchSize ?? undefined,
        autoplayAudio: autoplayAudio ?? undefined,
      },
      select: {
        lessonsPerDay: true,
        reviewBatchSize: true,
        autoplayAudio: true,
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
