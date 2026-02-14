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

function getAnthropicClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("\nERROR: ANTHROPIC_API_KEY not set in .env file\n");
    throw new Error("ANTHROPIC_API_KEY environment variable is not set");
  }
  return new Anthropic({ apiKey });
}

interface KanjiItem {
  id: number;
  character: string;
  meaningsFr: string[];
  meaningMnemonicFr: string;
  levelId: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function expandMnemonic(
  client: Anthropic,
  kanji: KanjiItem
): Promise<string> {
  const prompt = `Tu es un expert en mnémotechnique pour l'apprentissage du japonais destiné aux francophones.

Le kanji "${kanji.character}" signifie: ${kanji.meaningsFr.join(", ")}

Le mnémonique actuel est trop court: "${kanji.meaningMnemonicFr}"

Crée un mnémonique FRANÇAIS mémorable et détaillé (80-150 caractères) qui:
1. Aide à retenir le SENS du kanji (${kanji.meaningsFr[0]})
2. Décrit visuellement la forme du kanji de manière créative
3. Utilise des références culturelles françaises (nourriture, célébrités, lieux, films)
4. Raconte une petite histoire ou crée une image mentale forte
5. Est amusant et facile à retenir

Réponds UNIQUEMENT avec le nouveau mnémonique, sans guillemets ni explications.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0];
  if (content.type === "text") {
    return content.text.trim();
  }
  throw new Error("Unexpected response format");
}

async function main() {
  console.log("=".repeat(80));
  console.log("KANJI MEANING MNEMONIC EXPANSION SCRIPT");
  console.log("=".repeat(80));

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : undefined;

  if (dryRun) console.log("\nDRY RUN MODE\n");
  if (limit) console.log(`LIMIT: ${limit} items\n`);

  console.log("Finding kanji with short meaning mnemonics (<50 chars)...");

  let shortMnemonics = await prisma.kanji.findMany({
    where: {},
    orderBy: { levelId: "asc" },
    select: {
      id: true,
      character: true,
      meaningsFr: true,
      meaningMnemonicFr: true,
      levelId: true,
    },
  });

  shortMnemonics = shortMnemonics.filter(k => k.meaningMnemonicFr.length < 50);
  console.log(`Found ${shortMnemonics.length} kanji with short mnemonics`);

  if (limit) {
    shortMnemonics = shortMnemonics.slice(0, limit);
  }

  if (shortMnemonics.length === 0) {
    console.log("\nNo kanji to process!");
    return;
  }

  console.log("\nSample items:");
  for (const item of shortMnemonics.slice(0, 5)) {
    console.log(`  - ${item.character} (${item.meaningsFr[0]}): "${item.meaningMnemonicFr.substring(0, 40)}..."`);
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would process", shortMnemonics.length, "items");
    return;
  }

  const client = getAnthropicClient();
  let processed = 0;
  let failed = 0;

  console.log("\n" + "=".repeat(80));
  console.log("PROCESSING");
  console.log("=".repeat(80) + "\n");

  for (const kanji of shortMnemonics) {
    try {
      const newMnemonic = await expandMnemonic(client, kanji);

      await prisma.kanji.update({
        where: { id: kanji.id },
        data: { meaningMnemonicFr: newMnemonic },
      });

      processed++;
      console.log(`[${processed}/${shortMnemonics.length}] ${kanji.character}: "${newMnemonic.substring(0, 60)}..."`);

      await sleep(500);

      if (processed % 50 === 0) {
        console.log("\n--- Pausing 5s ---\n");
        await sleep(5000);
      }

    } catch (error) {
      failed++;
      console.error(`FAILED: ${kanji.character}:`, error);

      if (String(error).includes("rate")) {
        console.log("Rate limited, waiting 60s...");
        await sleep(60000);
      }
    }
  }

  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log(`Processed: ${processed}`);
  console.log(`Failed: ${failed}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
