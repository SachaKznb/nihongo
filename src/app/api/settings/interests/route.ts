import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const VALID_INTERESTS = [
  "gaming",
  "cooking",
  "football",
  "cinema",
  "music",
  "travel",
  "nature",
  "anime",
  "history",
  "science",
] as const;

type Interest = (typeof VALID_INTERESTS)[number];

// GET - Fetch user interests
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { interests: true },
    });

    return NextResponse.json({
      interests: user?.interests || [],
      availableInterests: VALID_INTERESTS.map(interest => ({
        id: interest,
        label: getInterestLabel(interest),
        icon: getInterestIcon(interest),
      })),
    });
  } catch (error) {
    console.error("Error fetching interests:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des intérêts" },
      { status: 500 }
    );
  }
}

// PUT - Update user interests
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { interests } = body as { interests: string[] };

    // Validate interests
    const validInterests = interests.filter(
      (i): i is Interest => VALID_INTERESTS.includes(i as Interest)
    );

    // Limit to 5 interests max
    const limitedInterests = validInterests.slice(0, 5);

    await prisma.user.update({
      where: { id: session.user.id },
      data: { interests: limitedInterests },
    });

    return NextResponse.json({
      interests: limitedInterests,
      message: "Intérêts mis à jour",
    });
  } catch (error) {
    console.error("Error updating interests:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des intérêts" },
      { status: 500 }
    );
  }
}

function getInterestLabel(interest: Interest): string {
  const labels: Record<Interest, string> = {
    gaming: "Jeux vidéo",
    cooking: "Cuisine",
    football: "Football",
    cinema: "Cinéma",
    music: "Musique",
    travel: "Voyage",
    nature: "Nature",
    anime: "Anime / Manga",
    history: "Histoire",
    science: "Science",
  };
  return labels[interest];
}

function getInterestIcon(interest: Interest): string {
  const icons: Record<Interest, string> = {
    gaming: "🎮",
    cooking: "👨‍🍳",
    football: "⚽",
    cinema: "🎬",
    music: "🎵",
    travel: "✈️",
    nature: "🌿",
    anime: "🎌",
    history: "🏛️",
    science: "🔬",
  };
  return icons[interest];
}
