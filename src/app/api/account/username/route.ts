import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caracteres")
    .max(20, "Le nom d'utilisateur ne peut pas depasser 20 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores"
    ),
});

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifie" }, { status: 401 });
    }

    const body = await request.json();
    const validation = usernameSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { username } = validation.data;

    // Check if username is taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        username: { equals: username, mode: "insensitive" },
        id: { not: session.user.id },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Ce nom d'utilisateur est deja pris" },
        { status: 400 }
      );
    }

    // Update username
    await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    return NextResponse.json({
      message: "Nom d'utilisateur mis a jour avec succes",
      username,
    });
  } catch (error) {
    console.error("Update username error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
