import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// Level thresholds for unlocking JLPT mock tests
const JLPT_UNLOCK_LEVELS: Record<number, number> = {
  5: 10,  // N5 unlocks at Level 10
  4: 20,  // N4 unlocks at Level 20
  3: 35,  // N3 unlocks at Level 35
  2: 50,  // N2 unlocks at Level 50
  1: 60,  // N1 unlocks at Level 60
};

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        currentLevel: true,
        subscriptionStatus: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const isPremium = ["active", "lifetime"].includes(user.subscriptionStatus);

    // Get existing access records
    const existingAccess = await prisma.$queryRaw<Array<{ jlptLevel: number; freeTestUsed: boolean }>>`
      SELECT "jlptLevel", "freeTestUsed"
      FROM "UserJLPTAccess"
      WHERE "userId" = ${session.user.id}
    `;

    const accessMap = new Map(existingAccess.map(a => [a.jlptLevel, a.freeTestUsed]));

    // Calculate access for each JLPT level
    const access = [5, 4, 3, 2, 1].map(jlptLevel => {
      const unlockLevel = JLPT_UNLOCK_LEVELS[jlptLevel];
      const isUnlocked = user.currentLevel >= unlockLevel;
      const freeTestUsed = accessMap.get(jlptLevel) ?? false;

      return {
        jlptLevel,
        name: `JLPT N${jlptLevel}`,
        unlockLevel,
        isUnlocked,
        freeTestAvailable: isUnlocked && !freeTestUsed,
        freeTestUsed,
        premiumRequired: freeTestUsed && !isPremium,
        canTakeTest: isUnlocked && (isPremium || !freeTestUsed),
      };
    });

    // Get test history count
    const testCounts = await prisma.jLPTMockTest.groupBy({
      by: ["jlptLevel"],
      where: { userId: session.user.id },
      _count: true,
    });

    const testCountMap = new Map(testCounts.map(t => [t.jlptLevel, t._count]));

    return NextResponse.json({
      currentLevel: user.currentLevel,
      isPremium,
      access: access.map(a => ({
        ...a,
        testsTaken: testCountMap.get(a.jlptLevel) ?? 0,
      })),
    });

  } catch (error) {
    console.error("Error checking JLPT access:", error);
    return NextResponse.json(
      { error: "Erreur lors de la vérification de l'accès JLPT" },
      { status: 500 }
    );
  }
}
