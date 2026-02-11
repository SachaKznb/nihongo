import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdminApi();
  if (error || !session) return error;

  try {
    const { id } = await params;

    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, username: true, isAdmin: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouve" },
        { status: 404 }
      );
    }

    // Cannot reset admin password (security measure)
    if (existingUser.isAdmin && existingUser.id !== session.user.id) {
      return NextResponse.json(
        { error: "Impossible de reinitialiser le mot de passe d'un administrateur" },
        { status: 400 }
      );
    }

    // Generate a random temporary password
    const tempPassword = crypto.randomBytes(8).toString("hex");
    const passwordHash = await bcrypt.hash(tempPassword, 12);

    await prisma.user.update({
      where: { id },
      data: { passwordHash },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "user.reset-password",
      targetType: "user",
      targetId: id,
      details: { username: existingUser.username },
    });

    // Return the temporary password to be communicated to the user
    return NextResponse.json({
      message: "Mot de passe reinitialise",
      temporaryPassword: tempPassword,
      note: "Communiquez ce mot de passe a l'utilisateur et demandez-lui de le changer immediatement.",
    });
  } catch (error) {
    console.error("Admin reset password error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
