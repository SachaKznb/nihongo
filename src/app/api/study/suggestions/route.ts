import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCachedPatterns } from "@/lib/pattern-analyzer";

export interface StudySuggestion {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  estimatedTime: string;
  items: { type: string; id: number; character: string }[];
  patternType?: string;
}

// GET /api/study/suggestions - Get study suggestions based on weakness patterns
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const patterns = await getCachedPatterns(userId);

    const suggestions: StudySuggestion[] = [];

    for (const pattern of patterns) {
      if (pattern.affectedItems.length === 0) continue;

      let title = "";
      let description = "";

      switch (pattern.patternType) {
        case "visual_confusion":
          title = "Kanji visuellement proches";
          description = `${pattern.affectedItems.length} caractère${pattern.affectedItems.length > 1 ? "s" : ""} que tu confonds souvent`;
          break;
        case "reading_confusion":
          title = "Lectures à revoir";
          description = `${pattern.affectedItems.length} lecture${pattern.affectedItems.length > 1 ? "s" : ""} qui te posent problème`;
          break;
        case "translation_nuance":
          title = "Nuances de sens";
          description = `${pattern.affectedItems.length} élément${pattern.affectedItems.length > 1 ? "s" : ""} avec des traductions proches`;
          break;
        default:
          title = "Éléments à revoir";
          description = `${pattern.affectedItems.length} élément${pattern.affectedItems.length > 1 ? "s" : ""}`;
      }

      // Estimate 30 seconds per item
      const minutes = Math.ceil((pattern.affectedItems.length * 30) / 60);

      suggestions.push({
        id: `${pattern.patternType}-${pattern.affectedItems.map((i) => i.id).join("-")}`,
        title,
        description,
        itemCount: pattern.affectedItems.length,
        estimatedTime: `~${minutes} min`,
        items: pattern.affectedItems,
        patternType: pattern.patternType,
      });
    }

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("Failed to get study suggestions:", error);
    return NextResponse.json(
      { error: "Erreur lors de la recuperation des suggestions" },
      { status: 500 }
    );
  }
}
