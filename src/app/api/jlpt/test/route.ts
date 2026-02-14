import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

// Level thresholds for unlocking JLPT mock tests
const JLPT_UNLOCK_LEVELS: Record<number, number> = {
  5: 10,
  4: 20,
  3: 35,
  2: 50,
  1: 60,
};

// POST - Start a new JLPT mock test
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { jlptLevel } = body as { jlptLevel: number };

    if (![1, 2, 3, 4, 5].includes(jlptLevel)) {
      return NextResponse.json({ error: "Niveau JLPT invalide" }, { status: 400 });
    }

    // Check user access
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
    const requiredLevel = JLPT_UNLOCK_LEVELS[jlptLevel];

    if (user.currentLevel < requiredLevel) {
      return NextResponse.json(
        { error: `Atteignez le niveau ${requiredLevel} pour débloquer JLPT N${jlptLevel}` },
        { status: 403 }
      );
    }

    // Check free test usage
    const existingAccess = await prisma.$queryRaw<Array<{ freeTestUsed: boolean }>>`
      SELECT "freeTestUsed"
      FROM "UserJLPTAccess"
      WHERE "userId" = ${session.user.id} AND "jlptLevel" = ${jlptLevel}
      LIMIT 1
    `;

    const freeTestUsed = existingAccess[0]?.freeTestUsed ?? false;

    if (freeTestUsed && !isPremium) {
      return NextResponse.json(
        { error: "Passez à Premium pour des tests illimités" },
        { status: 403 }
      );
    }

    // Get questions for this level
    const questions = await prisma.jLPTQuestion.findMany({
      where: { jlptLevel },
      orderBy: [
        { section: "asc" },
        { difficulty: "asc" },
      ],
    });

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "Aucune question disponible pour ce niveau" },
        { status: 404 }
      );
    }

    // Shuffle questions within each section and pick subset
    const sections = ["vocabulary", "grammar", "reading", "listening"];
    const questionsPerSection: Record<string, number> = {
      vocabulary: 25,
      grammar: 25,
      reading: 10,
      listening: 15,
    };

    const selectedQuestions: typeof questions = [];

    for (const section of sections) {
      const sectionQuestions = questions.filter(q => q.section === section);
      const shuffled = sectionQuestions.sort(() => Math.random() - 0.5);
      const count = Math.min(questionsPerSection[section], shuffled.length);
      selectedQuestions.push(...shuffled.slice(0, count));
    }

    // Create the test
    const test = await prisma.jLPTMockTest.create({
      data: {
        userId: session.user.id,
        jlptLevel,
      },
    });

    // Mark free test as used if not premium
    if (!isPremium && !freeTestUsed) {
      await prisma.$executeRaw`
        INSERT INTO "UserJLPTAccess" ("id", "userId", "jlptLevel", "freeTestUsed", "unlockedAt")
        VALUES (gen_random_uuid(), ${session.user.id}, ${jlptLevel}, true, NOW())
        ON CONFLICT ("userId", "jlptLevel")
        DO UPDATE SET "freeTestUsed" = true
      `;
    }

    // Return test with questions (without correct answers)
    return NextResponse.json({
      testId: test.id,
      jlptLevel,
      questions: selectedQuestions.map((q, index) => ({
        index,
        questionId: q.id,
        section: q.section,
        questionType: q.questionType,
        questionText: q.questionText,
        questionAudio: q.questionAudio,
        passageText: q.passageText,
        options: q.options,
        // Do NOT include correctIndex or explanation
      })),
      totalQuestions: selectedQuestions.length,
      sections: sections.map(s => ({
        name: s,
        count: selectedQuestions.filter(q => q.section === s).length,
      })),
    });

  } catch (error) {
    console.error("Error starting JLPT test:", error);
    return NextResponse.json(
      { error: "Erreur lors du démarrage du test" },
      { status: 500 }
    );
  }
}

// GET - Get current test progress or history
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const testId = searchParams.get("testId");

    if (testId) {
      // Get specific test with results
      const test = await prisma.jLPTMockTest.findUnique({
        where: { id: testId, userId: session.user.id },
        include: {
          answers: {
            include: {
              question: true,
            },
          },
        },
      });

      if (!test) {
        return NextResponse.json({ error: "Test non trouvé" }, { status: 404 });
      }

      return NextResponse.json({ test });
    }

    // Get test history
    const tests = await prisma.jLPTMockTest.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: "desc" },
      take: 20,
      select: {
        id: true,
        jlptLevel: true,
        startedAt: true,
        completedAt: true,
        totalScore: true,
        passed: true,
        vocabularyScore: true,
        grammarScore: true,
        readingScore: true,
        listeningScore: true,
      },
    });

    return NextResponse.json({ tests });

  } catch (error) {
    console.error("Error getting JLPT test:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du test" },
      { status: 500 }
    );
  }
}
