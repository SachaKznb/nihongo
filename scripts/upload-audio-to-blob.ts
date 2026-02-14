/**
 * Upload audio files to Vercel Blob storage
 *
 * This script uploads all audio files from public/audio/ to Vercel Blob.
 *
 * Prerequisites:
 * 1. Create a Vercel Blob store at https://vercel.com/dashboard/stores
 * 2. Get the BLOB_READ_WRITE_TOKEN from the store settings
 * 3. Set the token as environment variable
 *
 * Usage:
 *   BLOB_READ_WRITE_TOKEN=your_token npx tsx scripts/upload-audio-to-blob.ts
 *
 * Options:
 *   --dry-run    Show what would be uploaded without actually uploading
 *   --folder     Upload only specific folder (kanji/on, kanji/kun, vocab, sentences)
 *   --skip-existing  Skip files that already exist in blob storage
 */

import { put, list, head } from "@vercel/blob";
import * as fs from "fs";
import * as path from "path";

const AUDIO_DIR = path.join(process.cwd(), "public", "audio");

// Audio directories to upload
const AUDIO_FOLDERS = [
  { local: "kanji/on", blob: "audio/kanji/on" },
  { local: "kanji/kun", blob: "audio/kanji/kun" },
  { local: "vocab", blob: "audio/vocab" },
  { local: "sentences", blob: "audio/sentences" },
];

interface UploadStats {
  total: number;
  uploaded: number;
  skipped: number;
  failed: number;
  errors: string[];
}

async function getExistingBlobs(prefix: string): Promise<Set<string>> {
  const existing = new Set<string>();
  let cursor: string | undefined;

  do {
    const result = await list({
      prefix,
      cursor,
      limit: 1000,
    });

    for (const blob of result.blobs) {
      existing.add(blob.pathname);
    }

    cursor = result.cursor;
  } while (cursor);

  return existing;
}

async function uploadFile(
  localPath: string,
  blobPath: string,
  dryRun: boolean
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (dryRun) {
      console.log(`  [DRY RUN] Would upload: ${blobPath}`);
      return { success: true };
    }

    const fileBuffer = fs.readFileSync(localPath);
    const blob = await put(blobPath, fileBuffer, {
      access: "public",
      contentType: "audio/wav",
      addRandomSuffix: false,
    });

    return { success: true, url: blob.url };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
}

async function uploadFolder(
  localFolder: string,
  blobPrefix: string,
  options: { dryRun: boolean; skipExisting: boolean }
): Promise<UploadStats> {
  const stats: UploadStats = {
    total: 0,
    uploaded: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  const localPath = path.join(AUDIO_DIR, localFolder);

  // Check if folder exists
  if (!fs.existsSync(localPath)) {
    console.log(`  Folder not found: ${localPath}`);
    return stats;
  }

  // Get list of files
  const files = fs.readdirSync(localPath).filter((f) => f.endsWith(".wav"));
  stats.total = files.length;

  console.log(`  Found ${files.length} files in ${localFolder}`);

  // Get existing blobs if skipping
  let existingBlobs = new Set<string>();
  if (options.skipExisting && !options.dryRun) {
    console.log(`  Checking existing blobs...`);
    existingBlobs = await getExistingBlobs(blobPrefix);
    console.log(`  Found ${existingBlobs.size} existing blobs`);
  }

  // Upload files in batches
  const BATCH_SIZE = 10;
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (file) => {
        const filePath = path.join(localPath, file);
        const blobPath = `${blobPrefix}/${file}`;

        // Skip if already exists
        if (existingBlobs.has(blobPath)) {
          stats.skipped++;
          return;
        }

        const result = await uploadFile(filePath, blobPath, options.dryRun);

        if (result.success) {
          stats.uploaded++;
        } else {
          stats.failed++;
          stats.errors.push(`${file}: ${result.error}`);
        }
      })
    );

    // Progress indicator
    const progress = Math.min(i + BATCH_SIZE, files.length);
    const percent = Math.round((progress / files.length) * 100);
    process.stdout.write(
      `\r  Progress: ${progress}/${files.length} (${percent}%)`
    );
  }

  console.log(""); // New line after progress

  return stats;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const skipExisting = args.includes("--skip-existing");
  const folderArg = args.find((a) => a.startsWith("--folder="));
  const targetFolder = folderArg ? folderArg.split("=")[1] : null;

  console.log("=== Vercel Blob Audio Upload ===\n");

  // Check for token
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error(
      "Error: BLOB_READ_WRITE_TOKEN environment variable is required"
    );
    console.error(
      "\nUsage: BLOB_READ_WRITE_TOKEN=your_token npx tsx scripts/upload-audio-to-blob.ts"
    );
    process.exit(1);
  }

  if (dryRun) {
    console.log("Running in DRY RUN mode - no files will be uploaded\n");
  }

  if (skipExisting) {
    console.log("Skipping existing files\n");
  }

  // Filter folders if specific folder requested
  const foldersToUpload = targetFolder
    ? AUDIO_FOLDERS.filter((f) => f.local === targetFolder)
    : AUDIO_FOLDERS;

  if (foldersToUpload.length === 0) {
    console.error(`Invalid folder: ${targetFolder}`);
    console.error(
      "Valid folders: kanji/on, kanji/kun, vocab, sentences"
    );
    process.exit(1);
  }

  const totalStats: UploadStats = {
    total: 0,
    uploaded: 0,
    skipped: 0,
    failed: 0,
    errors: [],
  };

  // Upload each folder
  for (const folder of foldersToUpload) {
    console.log(`\nUploading ${folder.local}...`);

    const stats = await uploadFolder(folder.local, folder.blob, {
      dryRun,
      skipExisting,
    });

    totalStats.total += stats.total;
    totalStats.uploaded += stats.uploaded;
    totalStats.skipped += stats.skipped;
    totalStats.failed += stats.failed;
    totalStats.errors.push(...stats.errors);
  }

  // Summary
  console.log("\n=== Upload Summary ===");
  console.log(`Total files:   ${totalStats.total}`);
  console.log(`Uploaded:      ${totalStats.uploaded}`);
  console.log(`Skipped:       ${totalStats.skipped}`);
  console.log(`Failed:        ${totalStats.failed}`);

  if (totalStats.errors.length > 0) {
    console.log("\nErrors:");
    totalStats.errors.slice(0, 10).forEach((e) => console.log(`  - ${e}`));
    if (totalStats.errors.length > 10) {
      console.log(`  ... and ${totalStats.errors.length - 10} more errors`);
    }
  }

  // Output base URL info
  if (!dryRun && totalStats.uploaded > 0) {
    console.log("\n=== Next Steps ===");
    console.log(
      "1. After upload completes, note your blob store URL"
    );
    console.log(
      "2. Add BLOB_BASE_URL to your Vercel environment variables"
    );
    console.log("   Example: https://xxxxx.public.blob.vercel-storage.com");
    console.log(
      "3. The audio files will be served from Vercel Blob in production"
    );
  }
}

main().catch(console.error);
