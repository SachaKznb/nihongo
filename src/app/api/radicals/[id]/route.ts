import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/radicals/[id] - Get a single radical
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const radicalId = parseInt(id, 10);

  if (isNaN(radicalId)) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const radical = await prisma.radical.findUnique({
      where: { id: radicalId },
      include: {
        userProgress: {
          where: { userId: session.user.id },
          select: { srsStage: true, customMnemonic: true },
        },
      },
    });

    if (!radical) {
      return NextResponse.json({ error: "Radical non trouvé" }, { status: 404 });
    }

    const progress = radical.userProgress[0];

    return NextResponse.json({
      id: radical.id,
      character: radical.character,
      meaningFr: radical.meaningFr,
      meaningHintFr: radical.meaningHintFr,
      mnemonic: progress?.customMnemonic || radical.mnemonic,
      imageUrl: radical.imageUrl,
      srsStage: progress?.srsStage ?? 0,
    });
  } catch (error) {
    console.error("Failed to fetch radical:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
