import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";

/**
 * API route to serve audio files from Vercel Blob storage
 *
 * This route handles requests like:
 * - /api/audio/kanji/on/file.wav
 * - /api/audio/kanji/kun/file.wav
 * - /api/audio/vocab/file.wav
 * - /api/audio/sentences/file.wav
 *
 * In development, it redirects to local files.
 * In production with blob storage, it redirects to blob URLs.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const audioPath = path.join("/");

  // Validate the path
  if (!isValidAudioPath(audioPath)) {
    return NextResponse.json(
      { error: "Invalid audio path" },
      { status: 400 }
    );
  }

  // In development or without blob storage, redirect to local files
  if (
    process.env.NODE_ENV !== "production" ||
    !process.env.BLOB_READ_WRITE_TOKEN
  ) {
    return NextResponse.redirect(
      new URL(`/audio/${audioPath}`, request.url)
    );
  }

  // In production, try to get the blob URL
  try {
    const blobPath = `audio/${audioPath}`;
    const blob = await head(blobPath);

    // Redirect to the blob URL with cache headers
    return NextResponse.redirect(blob.url, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    // Blob not found, return 404
    console.error(`Audio blob not found: audio/${audioPath}`, error);
    return NextResponse.json(
      { error: "Audio file not found" },
      { status: 404 }
    );
  }
}

/**
 * Validate that the audio path matches expected patterns
 */
function isValidAudioPath(path: string): boolean {
  // Must end with .wav
  if (!path.endsWith(".wav")) {
    return false;
  }

  // Must be in one of the allowed directories
  const validPrefixes = [
    "kanji/on/",
    "kanji/kun/",
    "vocab/",
    "sentences/",
  ];

  return validPrefixes.some((prefix) => path.startsWith(prefix));
}
