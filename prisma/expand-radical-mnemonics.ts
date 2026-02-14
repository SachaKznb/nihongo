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

interface RadicalItem {
  id: number;
  character: string | null;
  meaningFr: string;
  mnemonic: string;
  levelId: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function expandMnemonic(
  client: Anthropic,
  radical: RadicalItem
): Promise<string> {
  const prompt = `Tu es un expert en mnémotechnique pour l'apprentissage du japonais destiné aux francophones.

Le radical "${radical.character || '[image]'}" signifie: ${radical.meaningFr}

Le mnémonique actuel est trop court: "${radical.mnemonic}"

Crée un mnémonique FRANÇAIS mémorable et détaillé (80-150 caractères) qui:
1. Aide à retenir le SENS du radical (${radical.meaningFr})
2. Décrit visuellement la forme du radical de manière créative
3. Utilise des références culturelles françaises (nourriture, célébrités, lieux, films)
4. Raconte une petite histoire ou crée une image mentale forte
5. Est amusant et facile à retenir

IMPORTANT: Les radicaux sont les "briques" qui composent les kanji. Ce mnémonique sera réutilisé dans les kanji qui contiennent ce radical.

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
  console.log("RADICAL MNEMONIC EXPANSION SCRIPT");
  console.log("=".repeat(80));

  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : undefined;

  if (dryRun) console.log("\nDRY RUN MODE\n");
  if (limit) console.log(`LIMIT: ${limit} items\n`);

  console.log("Finding radicals with short mnemonics (<50 chars)...");

  let shortMnemonics = await prisma.radical.findMany({
    where: {},
    orderBy: { levelId: "asc" },
    select: {
      id: true,
      character: true,
      meaningFr: true,
      mnemonic: true,
      levelId: true,
    },
  });

  shortMnemonics = shortMnemonics.filter(r => r.mnemonic.length < 50);
  console.log(`Found ${shortMnemonics.length} radicals with short mnemonics`);

  if (limit) {
    shortMnemonics = shortMnemonics.slice(0, limit);
  }

  if (shortMnemonics.length === 0) {
    console.log("\nNo radicals to process!");
    return;
  }

  console.log("\nSample items:");
  for (const item of shortMnemonics.slice(0, 5)) {
    console.log(`  - ${item.character || '[img]'} (${item.meaningFr}): "${item.mnemonic.substring(0, 40)}..."`);
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

  for (const radical of shortMnemonics) {
    try {
      const newMnemonic = await expandMnemonic(client, radical);

      await prisma.radical.update({
        where: { id: radical.id },
        data: { mnemonic: newMnemonic },
      });

      processed++;
      console.log(`[${processed}/${shortMnemonics.length}] ${radical.character || '[img]'}: "${newMnemonic.substring(0, 60)}..."`);

      await sleep(500);

      if (processed % 50 === 0) {
        console.log("\n--- Pausing 5s ---\n");
        await sleep(5000);
      }

    } catch (error) {
      failed++;
      console.error(`FAILED: ${radical.character || '[img]'}:`, error);

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
