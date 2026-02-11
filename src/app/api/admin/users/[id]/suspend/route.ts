import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { logAdminAction } from "@/lib/audit";

const suspendSchema = z.object({
  reason: z.string().min(1, "Raison requise").max(500),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdminApi();
  if (error || !session) return error;

  try {
    const { id } = await params;
    const body = await request.json();

    const validation = suspendSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { reason } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouve" },
        { status: 404 }
      );
    }

    if (existingUser.isAdmin) {
      return NextResponse.json(
        { error: "Impossible de suspendre un administrateur" },
        { status: 400 }
      );
    }

    if (existingUser.isSuspended) {
      return NextResponse.json(
        { error: "Utilisateur deja suspendu" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        isSuspended: true,
        suspendedAt: new Date(),
        suspendedBy: session.user.id,
        suspendReason: reason,
      },
    });

    await logAdminAction({
      adminId: session.user.id,
      action: "user.suspend",
      targetType: "user",
      targetId: id,
      details: { reason },
    });

    return NextResponse.json({
      message: "Utilisateur suspendu",
      user: {
        id: user.id,
        isSuspended: user.isSuspended,
        suspendedAt: user.suspendedAt,
        suspendReason: user.suspendReason,
      },
    });
  } catch (error) {
    console.error("Admin suspend user error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
