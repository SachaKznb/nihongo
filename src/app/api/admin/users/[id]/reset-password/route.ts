import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";
import { sendAdminPasswordReset } from "@/lib/email";

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
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Cannot reset admin password (security measure)
    if (existingUser.isAdmin && existingUser.id !== session.user.id) {
      return NextResponse.json(
        { error: "Impossible de réinitialisér le mot de passe d'un administrateur" },
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

    // Send email with temporary password
    if (process.env.RESEND_API_KEY) {
      await sendAdminPasswordReset(existingUser.email, existingUser.username, tempPassword);
    }

    await logAdminAction({
      adminId: session.user.id,
      action: "user.reset-password",
      targetType: "user",
      targetId: id,
      details: { username: existingUser.username },
      ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    return NextResponse.json({
      message: "Mot de passe réinitialisé. Un email a été envoye a l'utilisateur avec les instructions.",
    });
  } catch (error) {
    console.error("Admin reset password error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
