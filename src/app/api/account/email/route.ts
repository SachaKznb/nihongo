import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendEmailChangeVerification } from "@/lib/email";

const emailChangeSchema = z.object({
  newEmail: z.string().email("Adresse email invalide").max(255, "Email trop long"),
  password: z.string().min(1, "Mot de passe requis"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    const body = await request.json();
    const validation = emailChangeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { newEmail, password } = validation.data;
    const normalizedEmail = newEmail.toLowerCase();

    // Get user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true, username: true, email: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Check if same email
    if (user.email === normalizedEmail) {
      return NextResponse.json(
        { error: "C'est déjà votre adresse email actuelle" },
        { status: 400 }
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

    // Check if email is already taken
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cette adresse email est déjà utilisee" },
        { status: 400 }
      );
    }

    // Delete any existing email change tokens for this user
    await prisma.emailChangeToken.deleteMany({
      where: { userId: session.user.id },
    });

    // Create verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailChangeToken.create({
      data: {
        userId: session.user.id,
        newEmail: normalizedEmail,
        token,
        expiresAt,
      },
    });

    // Send verification email to new address
    if (process.env.RESEND_API_KEY) {
      const emailResult = await sendEmailChangeVerification(
        normalizedEmail,
        token,
        user.username
      );
      if (!emailResult.success) {
        console.error("Failed to send email change verification:", emailResult.error);
      }
    }

    return NextResponse.json({
      message: "Un email de verification a été envoye a votre nouvelle adresse.",
    });
  } catch (error) {
    console.error("Email change error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
