import { list, head } from "@vercel/blob";

// Base URL for Vercel Blob storage
// This will be set after first upload
const BLOB_BASE_URL = process.env.BLOB_BASE_URL;

// Check if we're in production and have blob storage configured
export function useBlobStorage(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    !!process.env.BLOB_READ_WRITE_TOKEN
  );
}

// Audio path types matching the existing structure
type AudioType = "kanji/on" | "kanji/kun" | "vocab" | "sentences";

/**
 * Get the blob URL for an audio file
 * Returns the blob URL in production, or local path in development
 */
export function getAudioUrl(type: AudioType, filename: string): string {
  if (useBlobStorage() && BLOB_BASE_URL) {
    return `${BLOB_BASE_URL}/audio/${type}/${filename}`;
  }
  // Fallback to local files
  return `/audio/${type}/${filename}`;
}

/**
 * Get audio URL from a local path (converts /audio/... to blob URL)
 */
export function convertLocalPathToBlobUrl(localPath: string): string {
  if (!useBlobStorage() || !BLOB_BASE_URL) {
    return localPath;
  }

  // Convert /audio/kanji/on/file.wav to blob URL
  if (localPath.startsWith("/audio/")) {
    return `${BLOB_BASE_URL}${localPath}`;
  }

  return localPath;
}

/**
 * Check if a blob exists
 */
export async function blobExists(pathname: string): Promise<boolean> {
  try {
    await head(pathname);
    return true;
  } catch {
    return false;
  }
}

/**
 * List all blobs with a given prefix
 */
export async function listBlobs(prefix: string) {
  const blobs = await list({ prefix });
  return blobs;
}
