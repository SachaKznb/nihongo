import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { unlockAvailableItems } from "@/lib/unlocks";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Email, mot de passe et nom d'utilisateur requis" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email ou nom existe deja" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        username,
        currentLevel: 1,
      },
    });

    // Unlock initial items for level 1
    await unlockAvailableItems(user.id);

    return NextResponse.json({
      message: "Compte cree avec succes",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation du compte" },
      { status: 500 }
    );
  }
}
