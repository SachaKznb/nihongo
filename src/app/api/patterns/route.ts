import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  getCachedPatterns,
  shouldAnalyzePatterns,
  analyzeUserPatterns,
} from "@/lib/pattern-analyzer";

// GET /api/patterns - Get user's weakness patterns
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Check if we need to run analysis
    const needsAnalysis = await shouldAnalyzePatterns(userId);

    if (needsAnalysis) {
      // Run analysis in background and return cached patterns
      analyzeUserPatterns(userId).catch((err) =>
        console.error("Pattern analysis failed:", err)
      );
    }

    // Return cached patterns
    const patterns = await getCachedPatterns(userId);

    return NextResponse.json({
      patterns,
      needsAnalysis,
    });
  } catch (error) {
    console.error("Failed to get patterns:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des patterns" },
      { status: 500 }
    );
  }
}
