import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getThemeById } from "@/lib/rewards";

// POST /api/rewards/select-theme - Select an unlocked theme
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const { themeId } = await request.json();

    const theme = getThemeById(themeId);
    if (!theme) {
      return NextResponse.json({ error: "Theme non trouve" }, { status: 404 });
    }

    // Get user's unlocked themes
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        unlockedThemes: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
    }

    // Check if theme is unlocked
    if (!user.unlockedThemes.includes(themeId)) {
      return NextResponse.json({ error: "Theme non debloque" }, { status: 400 });
    }

    // Select the theme
    await prisma.user.update({
      where: { id: userId },
      data: {
        selectedTheme: themeId,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Theme "${theme.name}" active !`,
      selectedTheme: themeId,
    });
  } catch (error) {
    console.error("Select theme error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la selection du theme" },
      { status: 500 }
    );
  }
}
