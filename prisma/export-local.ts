import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function main() {
  console.log("Exporting local data...\n");

  // Export radicals
  const radicals = await prisma.radical.findMany({
    orderBy: { id: "asc" },
  });
  fs.writeFileSync("/tmp/local-radicals.json", JSON.stringify(radicals, null, 2));
  console.log(`Exported ${radicals.length} radicals`);

  // Export kanji with radicals
  const kanji = await prisma.kanji.findMany({
    include: { radicals: { select: { radicalId: true } } },
    orderBy: { id: "asc" },
  });
  fs.writeFileSync("/tmp/local-kanji.json", JSON.stringify(kanji, null, 2));
  console.log(`Exported ${kanji.length} kanji`);

  // Export vocabulary with kanji
  const vocab = await prisma.vocabulary.findMany({
    include: { kanji: { select: { kanjiId: true } } },
    orderBy: { id: "asc" },
  });
  fs.writeFileSync("/tmp/local-vocab.json", JSON.stringify(vocab, null, 2));
  console.log(`Exported ${vocab.length} vocabulary`);

  console.log("\nExport complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
