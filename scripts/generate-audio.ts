import { PrismaClient } from "@prisma/client";
import { mkdir, writeFile, access } from "fs/promises";
import { join } from "path";

// Load env synchronously at startup
(function loadEnvSync() {
  const fs = require("fs");
  const path = require("path");
  try {
    const envPath = path.join(process.cwd(), ".env");
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
  } catch {
    console.log("No .env file found, using environment variables");
  }
})();

const prisma = new PrismaClient();

// Configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "EXAVITQu4vr4xnSDxMaL"; // Default: Sarah (multilingual)
const MODEL_ID = "eleven_multilingual_v2";
const OUTPUT_FORMAT = "pcm_44100"; // WAV format
const DELAY_MS = 150; // Delay between requests to avoid rate limiting
const BATCH_PAUSE_MS = 5000; // Pause between batches of 100

interface AudioItem {
  type: "kanji_on" | "kanji_kun" | "vocab" | "sentence";
  character: string;
  reading: string;
  id: number;
}

// Get all items that need audio
async function getAudioItems(): Promise<AudioItem[]> {
  const items: AudioItem[] = [];

  console.log("Fetching kanji readings...");
  const kanji = await prisma.kanji.findMany({
    select: { id: true, character: true, readingsOn: true, readingsKun: true }
  });

  for (const k of kanji) {
    for (const reading of k.readingsOn) {
      items.push({ type: "kanji_on", character: k.character, reading, id: k.id });
    }
    for (const reading of k.readingsKun) {
      // Remove trailing "-" from kunyomi readings
      const cleanReading = reading.replace(/-$/, "").replace(/-/g, "");
      if (cleanReading) {
        items.push({ type: "kanji_kun", character: k.character, reading: cleanReading, id: k.id });
      }
    }
  }

  console.log("Fetching vocabulary readings...");
  const vocab = await prisma.vocabulary.findMany({
    select: { id: true, word: true, readings: true, sentenceJp: true }
  });

  for (const v of vocab) {
    for (const reading of v.readings) {
      if (reading) {
        items.push({ type: "vocab", character: v.word, reading, id: v.id });
      }
    }
  }

  console.log("Fetching example sentences...");
  for (const v of vocab) {
    if (v.sentenceJp) {
      // sentenceJp can be either a plain string or JSON array
      try {
        const parsed = JSON.parse(v.sentenceJp);
        if (Array.isArray(parsed)) {
          // It's a JSON array of {japanese, french} objects
          for (let i = 0; i < parsed.length; i++) {
            const sentence = parsed[i];
            if (sentence.japanese) {
              items.push({
                type: "sentence",
                character: v.word,
                reading: sentence.japanese,
                id: v.id * 100 + i // Unique ID for each sentence
              });
            }
          }
        } else if (typeof parsed === "string") {
          items.push({ type: "sentence", character: v.word, reading: parsed, id: v.id });
        }
      } catch {
        // Plain string
        items.push({ type: "sentence", character: v.word, reading: v.sentenceJp, id: v.id });
      }
    }
  }

  return items;
}

// Generate audio using ElevenLabs API
async function generateAudio(text: string): Promise<Buffer> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Accept": "audio/wav",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true,
        },
        output_format: OUTPUT_FORMAT,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs API error ${response.status}: ${errorText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

// Get file path for an audio item
function getFilePath(item: AudioItem): string {
  // URL-safe filename
  const safeChar = encodeURIComponent(item.character).replace(/%/g, "_");

  // For sentences, use vocab ID to avoid filename length issues
  if (item.type === "sentence") {
    return join("public/audio/sentences", `${item.id}.wav`);
  }

  const safeReading = encodeURIComponent(item.reading).replace(/%/g, "_");
  const fileName = `${safeChar}-${safeReading}.wav`;

  switch (item.type) {
    case "kanji_on":
      return join("public/audio/kanji/on", fileName);
    case "kanji_kun":
      return join("public/audio/kanji/kun", fileName);
    case "vocab":
      return join("public/audio/vocab", fileName);
    default:
      return join("public/audio/other", fileName);
  }
}

// Check if file already exists
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// Sleep helper
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("=".repeat(80));
  console.log("ELEVENLABS AUDIO GENERATION SCRIPT");
  console.log("=".repeat(80));

  // Check API key
  if (!ELEVENLABS_API_KEY) {
    console.error("\nERROR: ELEVENLABS_API_KEY not set in .env file");
    console.error("Add this to your .env file:");
    console.error('ELEVENLABS_API_KEY=your_api_key_here');
    console.error("\nGet your API key from: https://elevenlabs.io/");
    process.exit(1);
  }

  // Parse command line arguments
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const skipExisting = !args.includes("--overwrite");
  const limitArg = args.find(a => a.startsWith("--limit="));
  const limit = limitArg ? parseInt(limitArg.split("=")[1]) : undefined;
  const typeArg = args.find(a => a.startsWith("--type="));
  const typeFilter = typeArg ? typeArg.split("=")[1] : undefined;

  console.log("\nConfiguration:");
  console.log(`  Voice ID: ${VOICE_ID}`);
  console.log(`  Model: ${MODEL_ID}`);
  console.log(`  Output: WAV (${OUTPUT_FORMAT})`);
  console.log(`  Dry run: ${dryRun}`);
  console.log(`  Skip existing: ${skipExisting}`);
  if (limit) console.log(`  Limit: ${limit} items`);
  if (typeFilter) console.log(`  Type filter: ${typeFilter}`);

  // Create directories
  console.log("\nCreating directories...");
  await mkdir("public/audio/kanji/on", { recursive: true });
  await mkdir("public/audio/kanji/kun", { recursive: true });
  await mkdir("public/audio/vocab", { recursive: true });
  await mkdir("public/audio/sentences", { recursive: true });

  // Get all items
  let items = await getAudioItems();
  console.log(`\nTotal items found: ${items.length}`);

  // Filter by type if specified
  if (typeFilter) {
    items = items.filter(item => item.type === typeFilter || item.type.startsWith(typeFilter));
    console.log(`After type filter: ${items.length}`);
  }

  // Apply limit
  if (limit) {
    items = items.slice(0, limit);
    console.log(`After limit: ${items.length}`);
  }

  // Check existing files
  if (skipExisting) {
    console.log("\nChecking existing files...");
    const toProcess: AudioItem[] = [];
    for (const item of items) {
      const path = getFilePath(item);
      if (!(await fileExists(path))) {
        toProcess.push(item);
      }
    }
    console.log(`Skipping ${items.length - toProcess.length} existing files`);
    items = toProcess;
  }

  console.log(`\nItems to process: ${items.length}`);

  if (items.length === 0) {
    console.log("\nNo items to process!");
    return;
  }

  // Show sample
  console.log("\nSample items:");
  for (const item of items.slice(0, 5)) {
    console.log(`  - [${item.type}] ${item.character} → ${item.reading}`);
  }

  if (dryRun) {
    console.log("\n[DRY RUN] Would process", items.length, "items");

    // Calculate character count for cost estimation
    const totalChars = items.reduce((sum, item) => sum + item.reading.length, 0);
    console.log(`Total characters: ${totalChars}`);
    console.log(`Estimated cost: ~$${(totalChars / 100000 * 22).toFixed(2)} (at Creator plan rates)`);
    return;
  }

  // Process items
  console.log("\n" + "=".repeat(80));
  console.log("PROCESSING");
  console.log("=".repeat(80));

  let processed = 0;
  let failed: { item: AudioItem; error: string }[] = [];
  let totalChars = 0;
  const startTime = Date.now();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    try {
      const audioBuffer = await generateAudio(item.reading);
      const filePath = getFilePath(item);
      await writeFile(filePath, audioBuffer);

      processed++;
      totalChars += item.reading.length;

      if (processed % 10 === 0 || processed === items.length) {
        const elapsed = (Date.now() - startTime) / 1000;
        const rate = processed / elapsed;
        const remaining = (items.length - processed) / rate;
        console.log(
          `[${processed}/${items.length}] ${item.character} → ${item.reading} ` +
          `(${rate.toFixed(1)}/s, ~${Math.ceil(remaining / 60)}min remaining)`
        );
      }

      // Rate limiting
      await sleep(DELAY_MS);

      // Batch pause every 100 items
      if (processed % 100 === 0 && processed < items.length) {
        console.log(`\n--- Pausing for ${BATCH_PAUSE_MS / 1000}s after 100 items ---\n`);
        await sleep(BATCH_PAUSE_MS);
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error(`FAILED: ${item.character} → ${item.reading}: ${errorMsg}`);
      failed.push({ item, error: errorMsg });

      // If rate limited, wait longer
      if (errorMsg.includes("429") || errorMsg.includes("rate")) {
        console.log("Rate limited! Waiting 60 seconds...");
        await sleep(60000);
      }
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log(`Processed: ${processed}`);
  console.log(`Failed: ${failed.length}`);
  console.log(`Total characters: ${totalChars}`);
  console.log(`Time: ${((Date.now() - startTime) / 1000 / 60).toFixed(1)} minutes`);

  // Save failed items for retry
  if (failed.length > 0) {
    const failedPath = "failed-audio-items.json";
    await writeFile(failedPath, JSON.stringify(failed, null, 2));
    console.log(`\nFailed items saved to: ${failedPath}`);
  }

  console.log("\nDone!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
