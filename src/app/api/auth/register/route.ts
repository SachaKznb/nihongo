import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { unlockAvailableItems } from "@/lib/unlocks";
import { sendVerificationEmail } from "@/lib/email";
import { authRateLimit, checkRateLimit } from "@/lib/upstash";

// Validation schema with strong password requirements
const registerSchema = z.object({
  email: z
    .string()
    .email("Adresse email invalide")
    .max(255, "Email trop long"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caracteres")
    .max(100, "Mot de passe trop long")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caracteres")
    .max(20, "Le nom d'utilisateur ne peut pas depasser 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores"
    ),
});

export async function POST(request: NextRequest) {
  // Rate limiting by IP for auth endpoints
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  const rateLimit = await checkRateLimit(authRateLimit, `register:${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Trop de tentatives. Veuillez patienter avant de réessayer." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate input with Zod
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email, password, username } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          { username: username.toLowerCase() },
        ],
      },
    });

    if (existingUser) {
      // Don't reveal which field is taken (security best practice)
      return NextResponse.json(
        { error: "Un compte avec ces informations existe deja" },
        { status: 400 }
      );
    }

    // Hash password with higher cost factor for production
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        username,
        currentLevel: 1,
      },
    });

    // Unlock initial items for level 1
    await unlockAvailableItems(user.id);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        email: user.email,
        userId: user.id,
        token: verificationToken,
        expiresAt,
      },
    });

    // Send verification email
    if (process.env.RESEND_API_KEY) {
      const emailResult = await sendVerificationEmail(user.email, verificationToken);
      if (!emailResult.success) {
        console.error("Failed to send verification email:", emailResult.error);
      }
    }

    return NextResponse.json({
      message: "Compte créé avec succes. Verifiez votre email pour activer votre compte.",
      user: { id: user.id, email: user.email, username: user.username },
      requiresVerification: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    // Don't expose internal error details to client
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la creation du compte" },
      { status: 500 }
    );
  }
}
