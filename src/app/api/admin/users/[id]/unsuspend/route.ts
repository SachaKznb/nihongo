import { NextRequest, NextResponse } from "next/server";
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
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouve" },
        { status: 404 }
      );
    }

    if (!existingUser.isSuspended) {
      return NextResponse.json(
        { error: "Utilisateur non suspendu" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        isSuspended: false,
        suspendedAt: null,
        suspendedBy: null,
        suspendReason: null,
      },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "user.unsuspend",
      targetType: "user",
      targetId: id,
      details: { previousReason: existingUser.suspendReason },
    });

    return NextResponse.json({
      message: "Suspension levee",
      user: {
        id: user.id,
        isSuspended: user.isSuspended,
      },
    });
  } catch (error) {
    console.error("Admin unsuspend user error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
