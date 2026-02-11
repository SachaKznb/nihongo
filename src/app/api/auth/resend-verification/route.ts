import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/email";

const resendSchema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = resendSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    const normalizedEmail = email.toLowerCase();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Always return success to prevent email enumeration
    if (user && !user.emailVerified) {
      // Delete existing tokens for this user
      await prisma.emailVerificationToken.deleteMany({
        where: { userId: user.id },
      });

      // Generate new token
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await prisma.emailVerificationToken.create({
        data: {
          email: normalizedEmail,
          userId: user.id,
          token,
          expiresAt,
        },
      });

      // Send verification email
      if (process.env.RESEND_API_KEY) {
        await sendVerificationEmail(normalizedEmail, token);
      }
    }

    return NextResponse.json({
      message: "Si un compte non verifie existe avec cette adresse, un email a ete envoye.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
