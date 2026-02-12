import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import { authRateLimit, checkRateLimit } from "@/lib/upstash";

const forgotPasswordSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export async function POST(request: NextRequest) {
  // Rate limiting by IP
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  const rateLimit = await checkRateLimit(authRateLimit, `forgot:${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Trop de tentatives. Veuillez patienter." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Validate input
    const validation = forgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    const normalizedEmail = email.toLowerCase();

    // Check if user exists (don't reveal if they do or not for security)
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success to prevent email enumeration
    // But only send email if user exists
    if (user) {
      try {
        // Delete any existing tokens for this email
        await prisma.passwordResetToken.deleteMany({
          where: { email: normalizedEmail },
        });

        // Generate secure token
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Save token to database
        await prisma.passwordResetToken.create({
          data: {
            email: normalizedEmail,
            token,
            expiresAt,
          },
        });

        // Send email (only if RESEND_API_KEY is configured)
        if (process.env.RESEND_API_KEY) {
          const result = await sendPasswordResetEmail(normalizedEmail, token);
          if (!result.success) {
            console.error("Failed to send reset email:", result.error);
          }
        } else {
          console.warn("RESEND_API_KEY not configured, skipping email send");
        }
      } catch (innerError) {
        console.error("Error processing password reset:", innerError);
        // Don't throw - still return success to prevent email enumeration
      }
    }

    // Always return the same response for security
    return NextResponse.json({
      message:
        "Si un compte existe avec cette adresse email, vous recevrez un lien de reinitialisation.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
