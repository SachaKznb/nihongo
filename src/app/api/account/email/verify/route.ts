import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/settings?email_error=missing_token", request.url)
      );
    }

    const emailChangeToken = await prisma.emailChangeToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!emailChangeToken) {
      return NextResponse.redirect(
        new URL("/settings?email_error=invalid_token", request.url)
      );
    }

    if (emailChangeToken.expiresAt < new Date()) {
      await prisma.emailChangeToken.delete({
        where: { id: emailChangeToken.id },
      });
      return NextResponse.redirect(
        new URL("/settings?email_error=expired_token", request.url)
      );
    }

    // Check if new email is still available
    const existingUser = await prisma.user.findUnique({
      where: { email: emailChangeToken.newEmail },
    });

    if (existingUser && existingUser.id !== emailChangeToken.userId) {
      await prisma.emailChangeToken.delete({
        where: { id: emailChangeToken.id },
      });
      return NextResponse.redirect(
        new URL("/settings?email_error=email_taken", request.url)
      );
    }

    // Update user's email
    await prisma.$transaction([
      prisma.user.update({
        where: { id: emailChangeToken.userId },
        data: { email: emailChangeToken.newEmail },
      }),
      prisma.emailChangeToken.delete({
        where: { id: emailChangeToken.id },
      }),
    ]);

    return NextResponse.redirect(
      new URL("/settings?email_success=true", request.url)
    );
  } catch (error) {
    console.error("Email change verification error:", error);
    return NextResponse.redirect(
      new URL("/settings?email_error=server_error", request.url)
    );
  }
}
