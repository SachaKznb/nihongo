import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface RadicalJson {
  character: string;
  meaningFr: string;
  mnemonic: string;
  imageUrl?: string;
}

interface KanjiJson {
  character: string;
  meaningsFr: string[];
  readingsOn: string[];
  readingsKun: string[];
  meaningMnemonic: string;
  readingMnemonic: string;
  radicals: string[];
}

interface VocabularyJson {
  word: string;
  meaningsFr: string[];
  readings: string[];
  mnemonic: string;
  sentenceJp?: string;
  sentenceFr?: string;
  kanji: string[];
}

interface LevelContent {
  radicals: RadicalJson[];
  kanji: KanjiJson[];
  vocabulary: VocabularyJson[];
}

async function loadLevelContent(levelDir: string): Promise<LevelContent> {
  const radicalsPath = path.join(levelDir, "radicals.json");
  const kanjiPath = path.join(levelDir, "kanji.json");
  const vocabularyPath = path.join(levelDir, "vocabulary.json");

  const radicals: RadicalJson[] = fs.existsSync(radicalsPath)
    ? JSON.parse(fs.readFileSync(radicalsPath, "utf-8")).radicals
    : [];

  const kanji: KanjiJson[] = fs.existsSync(kanjiPath)
    ? JSON.parse(fs.readFileSync(kanjiPath, "utf-8")).kanji
    : [];

  const vocabulary: VocabularyJson[] = fs.existsSync(vocabularyPath)
    ? JSON.parse(fs.readFileSync(vocabularyPath, "utf-8")).vocabulary
    : [];

  return { radicals, kanji, vocabulary };
}

async function importLevel(levelNum: number, content: LevelContent) {
  console.log(`\n📚 Importing Level ${levelNum}...`);

  // Ensure level exists
  await prisma.level.upsert({
    where: { id: levelNum },
    update: {},
    create: { id: levelNum, name: `Niveau ${levelNum}` },
  });

  // Import radicals
  console.log(`  📍 Importing ${content.radicals.length} radicals...`);
  for (const radical of content.radicals) {
    await prisma.radical.upsert({
      where: {
        character_levelId: {
          character: radical.character,
          levelId: levelNum,
        },
      },
      update: {
        meaningFr: radical.meaningFr,
        mnemonic: radical.mnemonic,
        imageUrl: radical.imageUrl || null,
      },
      create: {
        character: radical.character,
        meaningFr: radical.meaningFr,
        mnemonic: radical.mnemonic,
        imageUrl: radical.imageUrl || null,
        levelId: levelNum,
      },
    });
  }

  // Import kanji
  console.log(`  🈁 Importing ${content.kanji.length} kanji...`);
  for (const kanji of content.kanji) {
    const kanjiRecord = await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonic,
        readingMnemonicFr: kanji.readingMnemonic,
        levelId: levelNum,
      },
      create: {
        character: kanji.character,
        meaningsFr: kanji.meaningsFr,
        readingsOn: kanji.readingsOn,
        readingsKun: kanji.readingsKun,
        meaningMnemonicFr: kanji.meaningMnemonic,
        readingMnemonicFr: kanji.readingMnemonic,
        levelId: levelNum,
      },
    });

    // Create kanji-radical relationships
    for (const radicalChar of kanji.radicals) {
      const radical = await prisma.radical.findFirst({
        where: { character: radicalChar },
      });

      if (radical) {
        await prisma.kanjiRadical.upsert({
          where: {
            kanjiId_radicalId: { kanjiId: kanjiRecord.id, radicalId: radical.id },
          },
          update: {},
          create: { kanjiId: kanjiRecord.id, radicalId: radical.id },
        });
      } else {
        console.warn(`    ⚠️  Radical "${radicalChar}" not found for kanji "${kanji.character}"`);
      }
    }
  }

  // Import vocabulary
  console.log(`  📖 Importing ${content.vocabulary.length} vocabulary...`);
  for (const vocab of content.vocabulary) {
    const vocabRecord = await prisma.vocabulary.upsert({
      where: {
        word_levelId: {
          word: vocab.word,
          levelId: levelNum,
        },
      },
      update: {
        meaningsFr: vocab.meaningsFr,
        readings: vocab.readings,
        mnemonicFr: vocab.mnemonic,
        sentenceJp: vocab.sentenceJp || null,
        sentenceFr: vocab.sentenceFr || null,
      },
      create: {
        word: vocab.word,
        meaningsFr: vocab.meaningsFr,
        readings: vocab.readings,
        mnemonicFr: vocab.mnemonic,
        sentenceJp: vocab.sentenceJp || null,
        sentenceFr: vocab.sentenceFr || null,
        levelId: levelNum,
      },
    });

    // Create vocabulary-kanji relationships
    for (const kanjiChar of vocab.kanji) {
      const kanji = await prisma.kanji.findUnique({
        where: { character: kanjiChar },
      });

      if (kanji) {
        await prisma.vocabularyKanji.upsert({
          where: {
            vocabularyId_kanjiId: { vocabularyId: vocabRecord.id, kanjiId: kanji.id },
          },
          update: {},
          create: { vocabularyId: vocabRecord.id, kanjiId: kanji.id },
        });
      } else {
        console.warn(`    ⚠️  Kanji "${kanjiChar}" not found for vocabulary "${vocab.word}"`);
      }
    }
  }

  console.log(`  ✅ Level ${levelNum} imported successfully!`);
}

async function validateContent(levelNum: number, content: LevelContent) {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check radicals
  for (const radical of content.radicals) {
    if (!radical.character && !radical.imageUrl) {
      errors.push(`Radical missing both character and imageUrl: ${JSON.stringify(radical)}`);
    }
    if (!radical.meaningFr) {
      errors.push(`Radical missing meaningFr: ${radical.character}`);
    }
    if (!radical.mnemonic) {
      warnings.push(`Radical missing mnemonic: ${radical.character}`);
    }
  }

  // Check kanji
  for (const kanji of content.kanji) {
    if (!kanji.character) {
      errors.push(`Kanji missing character`);
    }
    if (!kanji.meaningsFr || kanji.meaningsFr.length === 0) {
      errors.push(`Kanji missing meaningsFr: ${kanji.character}`);
    }
    if (!kanji.readingsOn || kanji.readingsOn.length === 0) {
      warnings.push(`Kanji missing readingsOn: ${kanji.character}`);
    }
    if (!kanji.meaningMnemonic) {
      warnings.push(`Kanji missing meaningMnemonic: ${kanji.character}`);
    }
    if (!kanji.readingMnemonic) {
      warnings.push(`Kanji missing readingMnemonic: ${kanji.character}`);
    }
    if (!kanji.radicals || kanji.radicals.length === 0) {
      warnings.push(`Kanji missing radicals: ${kanji.character}`);
    }
  }

  // Check vocabulary
  for (const vocab of content.vocabulary) {
    if (!vocab.word) {
      errors.push(`Vocabulary missing word`);
    }
    if (!vocab.meaningsFr || vocab.meaningsFr.length === 0) {
      errors.push(`Vocabulary missing meaningsFr: ${vocab.word}`);
    }
    if (!vocab.readings || vocab.readings.length === 0) {
      errors.push(`Vocabulary missing readings: ${vocab.word}`);
    }
    if (!vocab.mnemonic) {
      warnings.push(`Vocabulary missing mnemonic: ${vocab.word}`);
    }
    if (!vocab.kanji || vocab.kanji.length === 0) {
      warnings.push(`Vocabulary missing kanji references: ${vocab.word}`);
    }
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings for Level ${levelNum}:`);
    warnings.forEach((w) => console.log(`   - ${w}`));
  }

  if (errors.length > 0) {
    console.log(`\n❌ Errors for Level ${levelNum}:`);
    errors.forEach((e) => console.log(`   - ${e}`));
    return false;
  }

  return true;
}

async function main() {
  const contentDir = path.join(process.cwd(), "content");

  if (!fs.existsSync(contentDir)) {
    console.error("❌ Content directory not found at:", contentDir);
    process.exit(1);
  }

  // Get all level directories
  const levelDirs = fs
    .readdirSync(contentDir)
    .filter((dir) => dir.startsWith("level-"))
    .sort((a, b) => {
      const numA = parseInt(a.replace("level-", ""));
      const numB = parseInt(b.replace("level-", ""));
      return numA - numB;
    });

  console.log(`📂 Found ${levelDirs.length} level directories`);

  // Parse command line args
  const args = process.argv.slice(2);
  const validateOnly = args.includes("--validate");
  const specificLevel = args.find((a) => a.startsWith("--level="));
  const levelFilter = specificLevel ? parseInt(specificLevel.split("=")[1]) : null;

  for (const levelDir of levelDirs) {
    const levelNum = parseInt(levelDir.replace("level-", ""));

    if (levelFilter && levelNum !== levelFilter) {
      continue;
    }

    const levelPath = path.join(contentDir, levelDir);
    const content = await loadLevelContent(levelPath);

    console.log(`\n📋 Level ${levelNum}: ${content.radicals.length} radicals, ${content.kanji.length} kanji, ${content.vocabulary.length} vocabulary`);

    const isValid = await validateContent(levelNum, content);

    if (!validateOnly && isValid) {
      await importLevel(levelNum, content);
    }
  }

  if (validateOnly) {
    console.log("\n✅ Validation complete!");
  } else {
    console.log("\n🎉 Import complete!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
