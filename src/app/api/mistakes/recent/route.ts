import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/mistakes/recent - Returns last 5 mistakes with item details
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch last 10 mistakes (we'll dedupe by item)
    const mistakes = await prisma.reviewMistake.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // Get item details for each mistake
    const mistakesWithDetails = await Promise.all(
      mistakes.map(async (mistake) => {
        let character: string | null = null;
        let imageUrl: string | null = null;

        if (mistake.itemType === "radical") {
          const radical = await prisma.radical.findUnique({
            where: { id: mistake.itemId },
            select: { character: true, imageUrl: true },
          });
          character = radical?.character || null;
          imageUrl = radical?.imageUrl || null;
        } else if (mistake.itemType === "kanji") {
          const kanji = await prisma.kanji.findUnique({
            where: { id: mistake.itemId },
            select: { character: true },
          });
          character = kanji?.character || null;
        } else if (mistake.itemType === "vocabulary") {
          const vocab = await prisma.vocabulary.findUnique({
            where: { id: mistake.itemId },
            select: { word: true },
          });
          character = vocab?.word || null;
        }

        return {
          id: mistake.id,
          character,
          imageUrl,
          type: mistake.itemType as "radical" | "kanji" | "vocabulary",
          correctAnswer: mistake.correctAnswers[0] || "",
          userAnswer: mistake.userAnswer,
          createdAt: mistake.createdAt.toISOString(),
        };
      })
    );

    // Dedupe by character (keep most recent)
    const seen = new Set<string>();
    const uniqueMistakes = mistakesWithDetails.filter((m) => {
      const key = `${m.type}-${m.character}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return NextResponse.json({ mistakes: uniqueMistakes.slice(0, 5) });
  } catch (error) {
    console.error("Recent mistakes GET error:", error);
    return NextResponse.json(
      { error: "Erreur lors du chargement des erreurs" },
      { status: 500 }
    );
  }
}
