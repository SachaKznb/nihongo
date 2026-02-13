import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Script to fix content ordering issues in the Nihongo database.
 *
 * Problem 1: Some radicals are taught AFTER the kanji that use them.
 * Solution: Move these radicals to Level 1 (or before the earliest kanji that uses them).
 *
 * Problem 2: Some vocabulary uses kanji from LATER levels.
 * Solution: Move vocabulary to the highest level of their component kanji.
 */

interface RadicalOrderIssue {
  radicalId: number;
  radicalCharacter: string | null;
  radicalMeaning: string;
  radicalLevel: number;
  kanjiCharacter: string;
  kanjiLevel: number;
}

interface VocabOrderIssue {
  vocabId: number;
  vocabWord: string;
  vocabLevel: number;
  kanjiCharacter: string;
  kanjiLevel: number;
  maxKanjiLevel: number;
}

async function findRadicalOrderIssues(): Promise<RadicalOrderIssue[]> {
  console.log("\n--- Finding Radical Order Issues ---\n");

  const issues: RadicalOrderIssue[] = [];

  // Get all kanji with their radicals
  const allKanji = await prisma.kanji.findMany({
    include: {
      radicals: {
        include: {
          radical: true,
        },
      },
    },
    orderBy: { levelId: "asc" },
  });

  for (const kanji of allKanji) {
    for (const kr of kanji.radicals) {
      const radical = kr.radical;
      if (radical.levelId > kanji.levelId) {
        issues.push({
          radicalId: radical.id,
          radicalCharacter: radical.character,
          radicalMeaning: radical.meaningFr,
          radicalLevel: radical.levelId,
          kanjiCharacter: kanji.character,
          kanjiLevel: kanji.levelId,
        });
      }
    }
  }

  return issues;
}

async function findVocabOrderIssues(): Promise<VocabOrderIssue[]> {
  console.log("\n--- Finding Vocabulary Order Issues ---\n");

  const issues: VocabOrderIssue[] = [];

  // Get all vocabulary with their kanji
  const allVocab = await prisma.vocabulary.findMany({
    include: {
      kanji: {
        include: {
          kanji: true,
        },
      },
    },
    orderBy: { levelId: "asc" },
  });

  for (const vocab of allVocab) {
    if (vocab.kanji.length === 0) continue;

    // Find the maximum level among all component kanji
    const kanjiLevels = vocab.kanji.map(vk => ({
      character: vk.kanji.character,
      level: vk.kanji.levelId,
    }));

    const maxKanjiLevel = Math.max(...kanjiLevels.map(k => k.level));

    // Find kanji that are from later levels
    for (const vk of vocab.kanji) {
      if (vk.kanji.levelId > vocab.levelId) {
        issues.push({
          vocabId: vocab.id,
          vocabWord: vocab.word,
          vocabLevel: vocab.levelId,
          kanjiCharacter: vk.kanji.character,
          kanjiLevel: vk.kanji.levelId,
          maxKanjiLevel,
        });
      }
    }
  }

  return issues;
}

async function fixRadicalOrderIssues(issues: RadicalOrderIssue[], dryRun: boolean): Promise<number> {
  console.log("\n--- Fixing Radical Order Issues ---\n");

  // Group issues by radical to find the earliest kanji level for each
  const radicalToEarliestKanjiLevel = new Map<number, { level: number; character: string | null; meaning: string }>();

  for (const issue of issues) {
    const existing = radicalToEarliestKanjiLevel.get(issue.radicalId);
    if (!existing || issue.kanjiLevel < existing.level) {
      radicalToEarliestKanjiLevel.set(issue.radicalId, {
        level: issue.kanjiLevel,
        character: issue.radicalCharacter,
        meaning: issue.radicalMeaning,
      });
    }
  }

  console.log(`Found ${radicalToEarliestKanjiLevel.size} radicals that need to be moved to earlier levels.\n`);

  // List of basic radicals that should be moved to Level 1
  const basicRadicals = ["足", "目", "耳", "手", "言", "糸", "金", "門", "食", "馬", "魚", "鳥", "貝", "車", "力", "田", "立", "見", "走", "赤", "青", "白", "黒", "黄"];

  let fixedCount = 0;

  for (const [radicalId, info] of radicalToEarliestKanjiLevel) {
    // Determine target level: Level 1 for basic radicals, or one level before the earliest kanji
    const isBasic = info.character && basicRadicals.includes(info.character);
    const targetLevel = isBasic ? 1 : Math.max(1, info.level - 1);

    console.log(`  Radical "${info.character || info.meaning}" (ID: ${radicalId}): Moving to Level ${targetLevel} (was used in kanji at Level ${info.level})`);

    if (!dryRun) {
      await prisma.radical.update({
        where: { id: radicalId },
        data: { levelId: targetLevel },
      });
    }

    fixedCount++;
  }

  return fixedCount;
}

async function fixVocabOrderIssues(issues: VocabOrderIssue[], dryRun: boolean): Promise<number> {
  console.log("\n--- Fixing Vocabulary Order Issues ---\n");

  // Group issues by vocabulary ID to find the max kanji level for each
  const vocabToMaxKanjiLevel = new Map<number, { word: string; currentLevel: number; maxKanjiLevel: number }>();

  for (const issue of issues) {
    const existing = vocabToMaxKanjiLevel.get(issue.vocabId);
    if (!existing || issue.maxKanjiLevel > existing.maxKanjiLevel) {
      vocabToMaxKanjiLevel.set(issue.vocabId, {
        word: issue.vocabWord,
        currentLevel: issue.vocabLevel,
        maxKanjiLevel: issue.maxKanjiLevel,
      });
    }
  }

  console.log(`Found ${vocabToMaxKanjiLevel.size} vocabulary items that need to be moved to later levels.\n`);

  let fixedCount = 0;

  // Sort by target level for cleaner output
  const sortedVocab = [...vocabToMaxKanjiLevel.entries()].sort(
    (a, b) => a[1].maxKanjiLevel - b[1].maxKanjiLevel
  );

  for (const [vocabId, info] of sortedVocab) {
    console.log(`  Vocab "${info.word}": Moving from Level ${info.currentLevel} to Level ${info.maxKanjiLevel}`);

    if (!dryRun) {
      await prisma.vocabulary.update({
        where: { id: vocabId },
        data: { levelId: info.maxKanjiLevel },
      });
    }

    fixedCount++;
  }

  return fixedCount;
}

async function printSummary() {
  console.log("\n========================================");
  console.log("DATABASE CONTENT ORDER ANALYSIS");
  console.log("========================================\n");

  // Count totals
  const totalRadicals = await prisma.radical.count();
  const totalKanji = await prisma.kanji.count();
  const totalVocabulary = await prisma.vocabulary.count();

  console.log(`Total content: ${totalRadicals} radicals, ${totalKanji} kanji, ${totalVocabulary} vocabulary\n`);

  // Find radical order issues
  const radicalIssues = await findRadicalOrderIssues();
  const uniqueRadicals = new Set(radicalIssues.map(i => i.radicalId));

  console.log(`PROBLEM 1: Radicals taught AFTER kanji that use them`);
  console.log(`  - ${uniqueRadicals.size} radicals affected`);
  console.log(`  - ${radicalIssues.length} total dependency violations`);

  if (radicalIssues.length > 0) {
    console.log("\n  Examples:");
    const seen = new Set<number>();
    for (const issue of radicalIssues.slice(0, 10)) {
      if (!seen.has(issue.radicalId)) {
        seen.add(issue.radicalId);
        console.log(`    - Radical "${issue.radicalCharacter || issue.radicalMeaning}" (L${issue.radicalLevel}) used by kanji "${issue.kanjiCharacter}" (L${issue.kanjiLevel})`);
      }
    }
  }

  // Find vocab order issues
  const vocabIssues = await findVocabOrderIssues();
  const uniqueVocab = new Set(vocabIssues.map(i => i.vocabId));

  console.log(`\nPROBLEM 2: Vocabulary uses kanji from LATER levels`);
  console.log(`  - ${uniqueVocab.size} vocabulary items affected`);
  console.log(`  - ${vocabIssues.length} total dependency violations`);

  if (vocabIssues.length > 0) {
    console.log("\n  Examples:");
    const seen = new Set<number>();
    for (const issue of vocabIssues.slice(0, 10)) {
      if (!seen.has(issue.vocabId)) {
        seen.add(issue.vocabId);
        console.log(`    - Vocab "${issue.vocabWord}" (L${issue.vocabLevel}) uses kanji "${issue.kanjiCharacter}" (L${issue.kanjiLevel})`);
      }
    }
  }

  return { radicalIssues, vocabIssues };
}

async function main() {
  console.log("========================================");
  console.log("NIHONGO CONTENT ORDER FIX SCRIPT");
  console.log("========================================");

  // Check for --dry-run flag
  const dryRun = process.argv.includes("--dry-run");

  if (dryRun) {
    console.log("\n*** DRY RUN MODE - No changes will be made ***\n");
  } else {
    console.log("\n*** LIVE MODE - Changes will be applied ***\n");
  }

  // Print initial summary
  const { radicalIssues, vocabIssues } = await printSummary();

  if (radicalIssues.length === 0 && vocabIssues.length === 0) {
    console.log("\n========================================");
    console.log("No ordering issues found. Database is correctly ordered!");
    console.log("========================================\n");
    return;
  }

  console.log("\n========================================");
  console.log("APPLYING FIXES");
  console.log("========================================");

  // Fix radical order issues
  const radicalFixCount = await fixRadicalOrderIssues(radicalIssues, dryRun);

  // Fix vocabulary order issues
  const vocabFixCount = await fixVocabOrderIssues(vocabIssues, dryRun);

  console.log("\n========================================");
  console.log("FIX SUMMARY");
  console.log("========================================");
  console.log(`\nRadicals moved to earlier levels: ${radicalFixCount}`);
  console.log(`Vocabulary moved to later levels: ${vocabFixCount}`);

  if (dryRun) {
    console.log("\n*** This was a DRY RUN. Run without --dry-run to apply changes. ***");
    console.log("  npx tsx prisma/fix-content-order.ts");
  } else {
    console.log("\n*** Changes have been applied to the database. ***");

    // Verify fixes
    console.log("\n--- Verifying fixes ---\n");
    const remainingRadicalIssues = await findRadicalOrderIssues();
    const remainingVocabIssues = await findVocabOrderIssues();

    if (remainingRadicalIssues.length === 0 && remainingVocabIssues.length === 0) {
      console.log("All ordering issues have been fixed successfully!");
    } else {
      console.log(`Remaining issues:`);
      console.log(`  - Radicals: ${new Set(remainingRadicalIssues.map(i => i.radicalId)).size}`);
      console.log(`  - Vocabulary: ${new Set(remainingVocabIssues.map(i => i.vocabId)).size}`);
      console.log("\nYou may need to run this script again or check for circular dependencies.");
    }
  }

  console.log("\n========================================");
  console.log("Script complete!");
  console.log("========================================\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
