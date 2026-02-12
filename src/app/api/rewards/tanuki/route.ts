import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getTanukiSkinById, TANUKI_SKINS } from "@/lib/tanuki";

// GET /api/rewards/tanuki - Get tanuki status
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      totalXp: true,
      tanukiName: true,
      tanukiSkin: true,
      unlockedSkins: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
  }

  const unlockedSkinsInfo = user.unlockedSkins.map((id) => getTanukiSkinById(id)).filter(Boolean);
  const lockedSkins = TANUKI_SKINS.filter((s) => !user.unlockedSkins.includes(s.id));

  return NextResponse.json({
    tanukiName: user.tanukiName,
    selectedSkin: user.tanukiSkin,
    unlockedSkins: unlockedSkinsInfo,
    lockedSkins,
    totalXp: user.totalXp,
  });
}

// POST /api/rewards/tanuki - Update tanuki name or purchase skin
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const { action, skinId, name } = await request.json();

    if (action === "rename") {
      // Rename tanuki
      if (!name || typeof name !== "string" || name.length > 20) {
        return NextResponse.json({ error: "Nom invalide (max 20 caracteres)" }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: userId },
        data: { tanukiName: name.trim() },
      });

      return NextResponse.json({
        success: true,
        message: `Ton Tanuki s'appelle maintenant "${name.trim()}" !`,
      });
    }

    if (action === "select_skin") {
      // Select an already unlocked skin
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { unlockedSkins: true },
      });

      if (!user?.unlockedSkins.includes(skinId)) {
        return NextResponse.json({ error: "Skin non debloque" }, { status: 400 });
      }

      await prisma.user.update({
        where: { id: userId },
        data: { tanukiSkin: skinId },
      });

      const skin = getTanukiSkinById(skinId);
      return NextResponse.json({
        success: true,
        message: `Skin "${skin?.name}" active !`,
      });
    }

    if (action === "purchase_skin") {
      // Purchase a new skin
      const skin = getTanukiSkinById(skinId);
      if (!skin) {
        return NextResponse.json({ error: "Skin non trouve" }, { status: 404 });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { totalXp: true, unlockedSkins: true },
      });

      if (!user) {
        return NextResponse.json({ error: "Utilisateur non trouve" }, { status: 404 });
      }

      if (user.unlockedSkins.includes(skinId)) {
        return NextResponse.json({ error: "Skin deja debloque" }, { status: 400 });
      }

      if (user.totalXp < skin.price) {
        return NextResponse.json(
          { error: `XP insuffisant. Il te faut ${skin.price} XP (tu as ${user.totalXp})` },
          { status: 400 }
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          totalXp: { decrement: skin.price },
          unlockedSkins: { push: skinId },
          tanukiSkin: skinId, // Auto-select new skin
        },
      });

      return NextResponse.json({
        success: true,
        message: `Skin "${skin.name}" debloque et active !`,
      });
    }

    return NextResponse.json({ error: "Action invalide" }, { status: 400 });
  } catch (error) {
    console.error("Tanuki update error:", error);
    return NextResponse.json({ error: "Erreur lors de la mise a jour" }, { status: 500 });
  }
}
