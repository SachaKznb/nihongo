import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getThemeById } from "@/lib/rewards";

// POST /api/rewards/purchase-theme - Buy a theme with XP
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

    // Get user's current XP and unlocked themes
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalXp: true,
        unlockedThemes: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
    }

    // Check if already unlocked
    if (user.unlockedThemes.includes(themeId)) {
      return NextResponse.json({ error: "Theme deja debloque" }, { status: 400 });
    }

    // Check if user has enough XP
    if (user.totalXp < theme.price) {
      return NextResponse.json(
        { error: `XP insuffisant. Il te faut ${theme.price} XP (tu as ${user.totalXp})` },
        { status: 400 }
      );
    }

    // Purchase the theme
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalXp: { decrement: theme.price },
        unlockedThemes: { push: themeId },
        selectedTheme: themeId, // Auto-select the new theme
      },
      select: {
        totalXp: true,
        unlockedThemes: true,
        selectedTheme: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Theme "${theme.name}" debloque !`,
      remainingXp: updatedUser.totalXp,
      selectedTheme: updatedUser.selectedTheme,
      unlockedThemes: updatedUser.unlockedThemes,
    });
  } catch (error) {
    console.error("Purchase theme error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'achat du theme" },
      { status: 500 }
    );
  }
}
