# Audio Generation Plan - ElevenLabs TTS for Nihongo

## Executive Summary

This document outlines the plan to pre-generate audio pronunciations for all kanji and vocabulary items using the ElevenLabs Text-to-Speech API, storing them as static files to eliminate repeated API calls during user sessions.

---

## 1. Content Analysis

### Current Content Counts (from seed files analysis)

Based on the project's PLAN.md and seed file structure:

| Item Type | Target Count | Readings per Item |
|-----------|--------------|-------------------|
| Kanji | ~2,000+ | 2-4 (onyomi + kunyomi) |
| Vocabulary | ~6,000+ | 1-2 readings |

### Audio Files Needed

**Kanji Audio:**
- Each kanji has `readingsOn[]` (onyomi) and `readingsKun[]` (kunyomi)
- Average ~2-3 readings per kanji
- Estimated: 2,000 kanji x 2.5 readings = **~5,000 kanji reading files**

**Vocabulary Audio:**
- Each vocabulary item has `readings[]` array
- Most have 1-2 readings
- Estimated: 6,000 vocab x 1.5 readings = **~9,000 vocabulary reading files**

**Total Estimated Audio Files: ~14,000 files**

### Sample Data Structure

```typescript
// Kanji example
{
  character: "日",
  readingsOn: ["ニチ", "ジツ"],   // 2 onyomi readings
  readingsKun: ["ひ"],            // 1 kunyomi reading
  // -> 3 audio files needed
}

// Vocabulary example
{
  word: "一日",
  readings: ["いちにち", "ついたち"],  // 2 readings
  // -> 2 audio files needed
}
```

---

## 2. Current Audio Setup

### Existing Implementation (`src/lib/audio.ts`)

```typescript
export function playReading(text: string) {
  // Uses Web Speech API with Japanese voice
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8;
  speechSynthesis.speak(utterance);
}
```

**Current Approach:** Browser-based Web Speech API
- Pros: No server costs, works offline after page load
- Cons: Quality varies by device/browser, not consistent

**Proposed Approach:** Pre-generated ElevenLabs audio files
- Pros: High-quality, consistent across all devices
- Cons: Storage costs, initial generation time, API costs

---

## 3. ElevenLabs API Research

### API Endpoint

```
POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}
```

### Key Parameters

| Parameter | Description |
|-----------|-------------|
| `voice_id` | ID of the voice to use (need Japanese-capable voice) |
| `model_id` | `eleven_multilingual_v2` for Japanese support |
| `text` | The Japanese text to convert |
| `output_format` | `mp3_44100_128` recommended for web |

### Japanese Voice Support

- ElevenLabs Multilingual v2 model supports 32 languages including Japanese
- Flash v2.5 is faster (~75ms latency) but same quality
- Text normalization parameter available for proper Japanese pronunciation

### Pricing Tiers

| Plan | Characters/Month | Cost |
|------|------------------|------|
| Free | 10,000 | $0 |
| Starter | 30,000 | $5/month |
| Creator | 100,000 | $22/month |
| Pro | 500,000 | $99/month |
| Scale | 2,000,000 | $330/month |

### Character Estimation

Average reading length: ~3-4 characters (hiragana/katakana)
- 14,000 files x 4 characters = **~56,000 characters**

This fits within the **Creator plan** ($22/month) for a one-time generation, or could be split across multiple months on the free/starter tier.

### Rate Limits

- Varies by plan tier
- Concurrency limits: 4-30 concurrent sessions depending on plan
- Recommend implementing delays between requests (100-500ms)

---

## 4. File Storage Design

### Directory Structure

```
public/
  audio/
    kanji/
      on/
        日-ニチ.mp3
        日-ジツ.mp3
      kun/
        日-ひ.mp3
    vocab/
      一日-いちにち.mp3
      一日-ついたち.mp3
```

### File Naming Convention

**Option A: Character-based (Recommended)**
```
kanji/on/{character}-{reading}.mp3
kanji/kun/{character}-{reading}.mp3
vocab/{word}-{reading}.mp3
```

**Option B: ID-based**
```
kanji/{id}-{readingIndex}.mp3
vocab/{id}-{readingIndex}.mp3
```

Recommendation: **Option A** is more human-readable and debuggable, though requires URL encoding for special characters.

### File Size Estimation

- Average audio length: 0.5-1 second
- MP3 at 128kbps: ~10-15KB per file
- Total storage: 14,000 files x 12KB = **~168 MB**

This is acceptable for static hosting on Vercel/CDN.

---

## 5. Implementation Plan

### Phase 1: Script Development

#### 5.1 Database Query Script

Create `scripts/generate-audio.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface AudioItem {
  type: "kanji_on" | "kanji_kun" | "vocab";
  character: string;  // The kanji character or vocabulary word
  reading: string;    // The specific reading
  id: number;         // Database ID for reference
}

async function getAudioItems(): Promise<AudioItem[]> {
  const items: AudioItem[] = [];

  // Get all kanji with readings
  const kanji = await prisma.kanji.findMany({
    select: { id: true, character: true, readingsOn: true, readingsKun: true }
  });

  for (const k of kanji) {
    for (const reading of k.readingsOn) {
      items.push({ type: "kanji_on", character: k.character, reading, id: k.id });
    }
    for (const reading of k.readingsKun) {
      // Remove trailing "-" from kunyomi readings
      const cleanReading = reading.replace(/-$/, "");
      items.push({ type: "kanji_kun", character: k.character, reading: cleanReading, id: k.id });
    }
  }

  // Get all vocabulary with readings
  const vocab = await prisma.vocabulary.findMany({
    select: { id: true, word: true, readings: true }
  });

  for (const v of vocab) {
    for (const reading of v.readings) {
      items.push({ type: "vocab", character: v.word, reading, id: v.id });
    }
  }

  return items;
}
```

#### 5.2 ElevenLabs API Integration

```typescript
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "japanese-voice-id"; // To be determined from voice library
const MODEL_ID = "eleven_multilingual_v2";

async function generateAudio(text: string): Promise<Buffer> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY!,
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
        language_code: "ja", // Japanese text normalization
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs API error: ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}
```

#### 5.3 Batch Processing with Rate Limiting

```typescript
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const BATCH_SIZE = 10;
const DELAY_MS = 200; // 200ms between requests

async function processAudioGeneration() {
  const items = await getAudioItems();
  console.log(`Total items to process: ${items.length}`);

  // Create directories
  await mkdir("public/audio/kanji/on", { recursive: true });
  await mkdir("public/audio/kanji/kun", { recursive: true });
  await mkdir("public/audio/vocab", { recursive: true });

  // Track progress
  let processed = 0;
  let failed: AudioItem[] = [];

  for (const item of items) {
    try {
      const audioBuffer = await generateAudio(item.reading);

      // Determine file path
      const fileName = `${encodeURIComponent(item.character)}-${encodeURIComponent(item.reading)}.mp3`;
      let filePath: string;

      switch (item.type) {
        case "kanji_on":
          filePath = join("public/audio/kanji/on", fileName);
          break;
        case "kanji_kun":
          filePath = join("public/audio/kanji/kun", fileName);
          break;
        case "vocab":
          filePath = join("public/audio/vocab", fileName);
          break;
      }

      await writeFile(filePath, audioBuffer);
      processed++;

      if (processed % 100 === 0) {
        console.log(`Processed ${processed}/${items.length} (${((processed/items.length)*100).toFixed(1)}%)`);
      }

      // Rate limiting delay
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));

    } catch (error) {
      console.error(`Failed: ${item.character} - ${item.reading}`, error);
      failed.push(item);
    }
  }

  console.log(`\nComplete! Processed: ${processed}, Failed: ${failed.length}`);

  // Save failed items for retry
  if (failed.length > 0) {
    await writeFile("failed-audio-items.json", JSON.stringify(failed, null, 2));
  }
}
```

### Phase 2: Audio Playback Integration

#### 5.4 Updated Audio Library

Update `src/lib/audio.ts`:

```typescript
// Types for audio sources
type AudioSource = "kanji_on" | "kanji_kun" | "vocab";

// Check if pre-generated audio exists
async function hasPreGeneratedAudio(source: AudioSource, character: string, reading: string): Promise<boolean> {
  const path = getAudioPath(source, character, reading);
  try {
    const response = await fetch(path, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
}

function getAudioPath(source: AudioSource, character: string, reading: string): string {
  const encodedChar = encodeURIComponent(character);
  const encodedReading = encodeURIComponent(reading);
  const fileName = `${encodedChar}-${encodedReading}.mp3`;

  switch (source) {
    case "kanji_on":
      return `/audio/kanji/on/${fileName}`;
    case "kanji_kun":
      return `/audio/kanji/kun/${fileName}`;
    case "vocab":
      return `/audio/vocab/${fileName}`;
  }
}

// Audio playback with fallback
let currentAudio: HTMLAudioElement | null = null;

export async function playReading(
  text: string,
  options?: {
    source?: AudioSource;
    character?: string;
  }
) {
  if (typeof window === "undefined") return;

  // Stop any current playback
  stopAudio();

  // Try pre-generated audio first
  if (options?.source && options?.character) {
    const audioPath = getAudioPath(options.source, options.character, text);

    try {
      currentAudio = new Audio(audioPath);
      currentAudio.playbackRate = 0.9; // Slightly slower for learners
      await currentAudio.play();
      return;
    } catch (error) {
      console.warn("Pre-generated audio not available, falling back to Web Speech API");
    }
  }

  // Fallback to Web Speech API
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8;

  const voices = speechSynthesis.getVoices();
  const japaneseVoice = voices.find(
    (voice) => voice.lang === "ja-JP" || voice.lang.startsWith("ja")
  );

  if (japaneseVoice) {
    utterance.voice = japaneseVoice;
  }

  speechSynthesis.speak(utterance);
}

export function stopAudio() {
  if (typeof window === "undefined") return;

  // Stop HTML5 Audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Stop Web Speech API
  speechSynthesis.cancel();
}
```

### Phase 3: Deployment Considerations

#### 5.5 Git LFS for Audio Files

Since we'll have ~168MB of audio files, use Git LFS:

```bash
# Initialize Git LFS
git lfs install

# Track MP3 files
git lfs track "public/audio/**/*.mp3"

# Add .gitattributes
git add .gitattributes
```

#### 5.6 Alternative: CDN Storage

For production, consider storing audio on a CDN:
- Cloudflare R2 (free egress)
- AWS S3 + CloudFront
- Vercel Blob Storage

This keeps the Git repository lean and improves caching.

---

## 6. Cost Analysis

### One-Time Generation Costs

| Item | Cost |
|------|------|
| ElevenLabs API (56K characters) | ~$22 (Creator plan for 1 month) |
| Storage (if using CDN) | ~$0-5/month |
| Development time | ~8-16 hours |

### Ongoing Costs

- Storage hosting: Included in Vercel or ~$1-5/month for CDN
- No recurring API costs (audio is pre-generated)

---

## 7. Implementation Checklist

### Setup
- [ ] Sign up for ElevenLabs account
- [ ] Get API key and add to `.env`
- [ ] Research and select Japanese voice from voice library
- [ ] Test API with a few sample readings

### Development
- [ ] Create `scripts/generate-audio.ts`
- [ ] Implement database query for all readings
- [ ] Implement ElevenLabs API integration
- [ ] Add rate limiting and retry logic
- [ ] Add progress tracking and logging
- [ ] Create directories structure

### Generation
- [ ] Run script in batches (start with Level 1-10)
- [ ] Verify audio quality manually
- [ ] Complete full generation
- [ ] Handle any failed items

### Integration
- [ ] Update `src/lib/audio.ts` with new playback logic
- [ ] Update components to pass audio source info
- [ ] Test fallback to Web Speech API
- [ ] Add audio preloading for better UX

### Deployment
- [ ] Configure Git LFS or CDN storage
- [ ] Test on staging environment
- [ ] Deploy to production
- [ ] Monitor audio loading performance

---

## 8. Next Steps

1. **Immediate**: Set up ElevenLabs account and test API with Japanese voices
2. **Short-term**: Develop and test generation script with Level 1 content
3. **Medium-term**: Generate all audio files in batches
4. **Long-term**: Integrate with app and deploy

---

## Appendix: Environment Variables

Add to `.env`:

```env
# ElevenLabs Text-to-Speech
ELEVENLABS_API_KEY=your_api_key_here
ELEVENLABS_VOICE_ID=japanese_voice_id
```

---

## References

- [ElevenLabs API Documentation](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
- [ElevenLabs Japanese TTS](https://elevenlabs.io/text-to-speech/japanese)
- [ElevenLabs Pricing](https://elevenlabs.io/pricing)
- [ElevenLabs Models](https://elevenlabs.io/docs/models)
