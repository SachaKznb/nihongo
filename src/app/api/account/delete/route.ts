import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const deleteSchema = z.object({
  password: z.string().min(1, "Mot de passe requis"),
  confirmation: z.literal("SUPPRIMER", {
    message: "Veuillez taper SUPPRIMER pour confirmer",
  }),
});

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    const body = await request.json();
    const validation = deleteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { password } = validation.data;

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouve" },
        { status: 404 }
      );
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 400 }
      );
    }

    // Delete all user data (cascading will handle related records)
    // But we need to manually delete progress records as they don't have cascade
    await prisma.$transaction([
      prisma.userRadicalProgress.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.userKanjiProgress.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.userVocabularyProgress.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.review.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.emailVerificationToken.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.emailChangeToken.deleteMany({
        where: { userId: session.user.id },
      }),
      prisma.passwordResetToken.deleteMany({
        where: { email: session.user.email },
      }),
      prisma.user.delete({
        where: { id: session.user.id },
      }),
    ]);

    return NextResponse.json({
      message: "Compte supprime avec succes",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
