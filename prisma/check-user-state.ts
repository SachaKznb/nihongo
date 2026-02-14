import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.PRODUCTION_DATABASE_URL } }
});

async function main() {
  const user = await prisma.user.findFirst({ where: { email: "sacha@kaizen-media.co" } });
  if (user === null) {
    console.log("User not found");
    return;
  }

  const userId = user.id;

  const [radicalsByStage, kanjiByStage, vocabByStage] = await Promise.all([
    prisma.userRadicalProgress.groupBy({
      by: ["srsStage"],
      where: { userId },
      _count: true,
    }),
    prisma.userKanjiProgress.groupBy({
      by: ["srsStage"],
      where: { userId },
      _count: true,
    }),
    prisma.userVocabularyProgress.groupBy({
      by: ["srsStage"],
      where: { userId },
      _count: true,
    }),
  ]);

  console.log("User settings:");
  console.log("  lessonsPerDay:", user.lessonsPerDay);
  console.log("  currentLevel:", user.currentLevel);
  console.log("");

  console.log("Radicals by stage:");
  radicalsByStage.forEach(s => console.log("  Stage", s.srsStage, ":", s._count));

  console.log("\nKanji by stage:");
  kanjiByStage.forEach(s => console.log("  Stage", s.srsStage, ":", s._count));

  console.log("\nVocab by stage:");
  vocabByStage.forEach(s => console.log("  Stage", s.srsStage, ":", s._count));

  const lockedRadicals = radicalsByStage.find(s => s.srsStage === 0)?._count || 0;
  const lockedKanji = kanjiByStage.find(s => s.srsStage === 0)?._count || 0;
  const lockedVocab = vocabByStage.find(s => s.srsStage === 0)?._count || 0;

  console.log("\nTotal pending lessons (stage 0):", lockedRadicals + lockedKanji + lockedVocab);
  console.log("  Radicals:", lockedRadicals);
  console.log("  Kanji:", lockedKanji);
  console.log("  Vocab:", lockedVocab);

  // Check today's completed lessons
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLessons = await prisma.review.count({
    where: {
      userId,
      createdAt: { gte: today },
      srsStageFrom: 0,
    }
  });

  console.log("\nLessons done today:", todayLessons);

  await prisma.$disconnect();
}

main();
