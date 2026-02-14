import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Count totals
  const totalKanji = await prisma.kanji.count();
  const totalVocab = await prisma.vocabulary.count();
  const totalRadicals = await prisma.radical.count();

  console.log("=== TOTALS ===");
  console.log("Radicals:", totalRadicals);
  console.log("Kanji:", totalKanji);
  console.log("Vocabulary:", totalVocab);

  // Get distribution per level
  console.log("\n=== PER LEVEL (first 15) ===");
  for (let level = 1; level <= 15; level++) {
    const radicals = await prisma.radical.count({ where: { levelId: level } });
    const kanji = await prisma.kanji.count({ where: { levelId: level } });
    const vocab = await prisma.vocabulary.count({ where: { levelId: level } });
    console.log("Level " + level + ": " + radicals + " radicals, " + kanji + " kanji, " + vocab + " vocab");
  }

  // Sample kanji from level 1-3
  console.log("\n=== SAMPLE KANJI (Levels 1-3) ===");
  const sampleKanji = await prisma.kanji.findMany({
    where: { levelId: { lte: 3 } },
    select: { character: true, meaningsFr: true, levelId: true },
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
    take: 20
  });
  sampleKanji.forEach(k => {
    console.log("L" + k.levelId + ": " + k.character + " - " + k.meaningsFr[0]);
  });

  // WaniKani Level 1-3 kanji comparison
  console.log("\n=== WANIKANI L1-3 KANJI MAPPING ===");
  const wkKanji: Record<number, string[]> = {
    1: ["一", "二", "七", "九", "人", "入", "八", "力", "十", "口", "大", "女", "山", "川", "工", "三"],
    2: ["上", "下", "丸", "刀", "土", "千", "夕", "小", "中", "五", "六", "円", "天", "手", "文", "日", "月", "木", "水", "火"],
    3: ["王", "正", "出", "右", "四", "左", "本", "田", "白", "目", "石", "立", "百", "年", "休", "先", "名"]
  };

  for (const [wkLevel, chars] of Object.entries(wkKanji)) {
    console.log("\nWaniKani Level " + wkLevel + ":");
    for (const char of chars.slice(0, 10)) {
      const found = await prisma.kanji.findFirst({
        where: { character: char },
        select: { character: true, levelId: true }
      });
      console.log("  " + char + ": " + (found ? "Nihongo Level " + found.levelId : "NOT FOUND"));
    }
  }
}

main().finally(() => prisma.$disconnect());
