import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { analyzeUserPatterns } from "@/lib/pattern-analyzer";

// POST /api/patterns/analyze - Trigger pattern analysis
export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const patterns = await analyzeUserPatterns(userId);

    return NextResponse.json({
      patterns,
      analyzed: true,
    });
  } catch (error) {
    console.error("Pattern analysis failed:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'analyse" },
      { status: 500 }
    );
  }
}
