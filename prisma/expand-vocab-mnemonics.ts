import { PrismaClient } from "@prisma/client";
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

// Load .env file manually
function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, ...valueParts] = trimmedLine.split("=");
        if (key && valueParts.length > 0) {
          let value = valueParts.join("=");
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  }
}

loadEnvFile();

const prisma = new PrismaClient();

// Lazy-load Anthropic client
function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("\n" + "=".repeat(80));
    console.error("ERROR: ANTHROPIC_API_KEY environment variable is not set");
    console.error("=".repeat(80));
    console.error("\nTo fix this, add the following to your .env file:");
    console.error('ANTHROPIC_API_KEY="sk-ant-your-api-key-here"');
    console.error("\nGet your API key from: https://console.anthropic.com");
    console.error("=".repeat(80) + "\n");
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

interface VocabularyItem {
  id: number;
  word: string;
  meaningsFr: string[];
  readings: string[];
  mnemonicFr: string;
  levelId: number;
}

// Sleep function for rate limiting
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Build prompt for expanding a vocabulary mnemonic
function buildExpansionPrompt(vocab: VocabularyItem): string {
  return `Tu es un expert en apprentissage du japonais pour les francophones. Tu crees des mnemoniques memorables.

CONTEXTE:
Ce mot de vocabulaire a un mnemonique trop court qui ne suffit pas pour aider a memoriser.

MOT: ${vocab.word}
SIGNIFICATIONS: ${vocab.meaningsFr.join(", ")}
LECTURE(S): ${vocab.readings.join(", ")}
MNEMONIQUE ACTUEL: "${vocab.mnemonicFr}"

CONSIGNES:
1. Cree un mnemonique COMPLET en francais qui aide a retenir DEUX choses:
   - La SIGNIFICATION du mot (${vocab.meaningsFr[0]})
   - La LECTURE/PRONONCIATION (${vocab.readings[0]})

2. Utilise une histoire vivante, drole ou absurde - plus c'est memorable, mieux c'est

3. Cherche des associations phonetiques entre la lecture japonaise et des mots francais
   Par exemple: "たべる" (taberu = manger) -> "Tu TABEs des RUes" ou reference a une table

4. Utilise des references culturelles francaises quand c'est pertinent:
   - Nourriture (croissant, fromage, vin...)
   - Lieux (Paris, Provence, Tour Eiffel...)
   - Celebrites, films, expressions francaises...

5. Format: 2-4 phrases maximum, commence directement par l'histoire/l'association

EXEMPLE DE BON MNEMONIQUE:
Mot: 食べる (taberu - manger)
"Imagine que tu es a une TABLE dans un Restaurant parisien. Tu TABEs des RUes entieres de croissants! Taberu = manger, comme se mettre a TABLE pour un bon Repas."

Retourne UNIQUEMENT le nouveau mnemonique, sans introduction ni explication.`;
}

// Generate expanded mnemonic using Claude
async function generateExpandedMnemonic(
  anthropic: Anthropic,
  vocab: VocabularyItem
): Promise<string> {
  const prompt = buildExpansionPrompt(vocab);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }
  return textBlock.text.trim();
}

// Process a batch of vocabulary items
async function processBatch(
  anthropic: Anthropic,
  vocabItems: VocabularyItem[],
  batchNumber: number,
  totalBatches: number
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  console.log(`\n--- Batch ${batchNumber}/${totalBatches} (${vocabItems.length} items) ---`);

  for (let i = 0; i < vocabItems.length; i++) {
    const vocab = vocabItems[i];
    const progress = `[${i + 1}/${vocabItems.length}]`;

    try {
      console.log(`${progress} Processing: ${vocab.word} (${vocab.meaningsFr[0]})`);
      console.log(`  Current mnemonic: "${vocab.mnemonicFr}"`);

      const newMnemonic = await generateExpandedMnemonic(anthropic, vocab);

      // Update in database
      await prisma.vocabulary.update({
        where: { id: vocab.id },
        data: { mnemonicFr: newMnemonic },
      });

      console.log(`  New mnemonic: "${newMnemonic.substring(0, 100)}${newMnemonic.length > 100 ? "..." : ""}"`);
      console.log(`  OK`);

      success++;

      // Rate limiting: wait 500ms between API calls
      await sleep(500);
    } catch (error) {
      console.error(`  FAILED: ${error instanceof Error ? error.message : error}`);
      failed++;

      // On rate limit error, wait longer
      if (error instanceof Error && error.message.includes("rate")) {
        console.log("  Rate limited, waiting 30 seconds...");
        await sleep(30000);
      }
    }
  }

  return { success, failed };
}

async function main() {
  console.log("=".repeat(80));
  console.log("VOCABULARY MNEMONIC EXPANSION SCRIPT");
  console.log("=".repeat(80));
  console.log();

  // Parse command line args
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const minLength = 30; // Minimum acceptable mnemonic length
  const batchSize = 100;

  // Parse --limit=N option
  const limitArg = args.find((a) => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : null;

  // Parse --level=N option to process only specific level
  const levelArg = args.find((a) => a.startsWith("--level="));
  const levelFilter = levelArg ? parseInt(levelArg.split("=")[1]) : null;

  if (dryRun) {
    console.log("DRY RUN MODE - No changes will be made to the database");
    console.log();
  }

  if (limit) {
    console.log(`LIMIT: Processing only first ${limit} items`);
  }

  if (levelFilter) {
    console.log(`LEVEL FILTER: Processing only level ${levelFilter}`);
  }

  // Find all vocabulary with short mnemonics
  console.log(`Finding vocabulary with mnemonics shorter than ${minLength} characters...`);

  const shortMnemonics = await prisma.vocabulary.findMany({
    where: levelFilter ? { levelId: levelFilter } : {},
    orderBy: { levelId: "asc" },
    select: {
      id: true,
      word: true,
      meaningsFr: true,
      readings: true,
      mnemonicFr: true,
      levelId: true,
    },
  });

  // Filter by length and apply limit
  let vocabToProcess = shortMnemonics.filter(
    (v) => v.mnemonicFr.length < minLength
  );

  if (limit && limit < vocabToProcess.length) {
    vocabToProcess = vocabToProcess.slice(0, limit);
  }

  console.log(`Found ${vocabToProcess.length} vocabulary items with short mnemonics`);
  console.log();

  if (vocabToProcess.length === 0) {
    console.log("No vocabulary items need expansion. Exiting.");
    await prisma.$disconnect();
    return;
  }

  // Show sample of items to process
  console.log("Sample items to process:");
  for (const vocab of vocabToProcess.slice(0, 10)) {
    console.log(`  - Level ${vocab.levelId}: ${vocab.word} (${vocab.meaningsFr[0]})`);
    console.log(`    Mnemonic (${vocab.mnemonicFr.length} chars): "${vocab.mnemonicFr}"`);
  }
  if (vocabToProcess.length > 10) {
    console.log(`  ... and ${vocabToProcess.length - 10} more`);
  }
  console.log();

  if (dryRun) {
    console.log("DRY RUN complete. Run without --dry-run to process.");
    await prisma.$disconnect();
    return;
  }

  // Initialize Anthropic client
  console.log("Initializing Anthropic client...");
  const anthropic = getAnthropicClient();

  // Process in batches
  const totalBatches = Math.ceil(vocabToProcess.length / batchSize);
  let totalSuccess = 0;
  let totalFailed = 0;

  console.log(`Processing ${vocabToProcess.length} items in ${totalBatches} batches of ${batchSize}...`);

  for (let batchNum = 1; batchNum <= totalBatches; batchNum++) {
    const startIdx = (batchNum - 1) * batchSize;
    const endIdx = Math.min(startIdx + batchSize, vocabToProcess.length);
    const batch = vocabToProcess.slice(startIdx, endIdx);

    const { success, failed } = await processBatch(
      anthropic,
      batch,
      batchNum,
      totalBatches
    );

    totalSuccess += success;
    totalFailed += failed;

    // Pause between batches
    if (batchNum < totalBatches) {
      console.log(`\nBatch ${batchNum} complete. Pausing 5 seconds before next batch...`);
      await sleep(5000);
    }
  }

  // Summary
  console.log();
  console.log("=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log(`Total processed: ${vocabToProcess.length}`);
  console.log(`Successful: ${totalSuccess}`);
  console.log(`Failed: ${totalFailed}`);
  console.log();

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
