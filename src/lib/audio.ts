// Types for audio sources
type AudioSource = "kanji_on" | "kanji_kun" | "vocab" | "sentence";

// Audio cache to avoid re-creating Audio elements
const audioCache = new Map<string, HTMLAudioElement>();

// Get the path for pre-generated audio
function getAudioPath(source: AudioSource, character: string, reading: string, vocabId?: number): string {
  // URL-safe encoding (matches generation script)
  const safeChar = encodeURIComponent(character).replace(/%/g, "_");
  const safeReading = encodeURIComponent(reading).replace(/%/g, "_");

  // For sentences, use vocab ID
  if (source === "sentence" && vocabId) {
    return `/audio/sentences/${vocabId}.wav`;
  }

  const fileName = `${safeChar}-${safeReading}.wav`;

  switch (source) {
    case "kanji_on":
      return `/audio/kanji/on/${fileName}`;
    case "kanji_kun":
      return `/audio/kanji/kun/${fileName}`;
    case "vocab":
      return `/audio/vocab/${fileName}`;
    default:
      return `/audio/vocab/${fileName}`;
  }
}

// Current audio element for stopping
let currentAudio: HTMLAudioElement | null = null;

/**
 * Play a Japanese reading with pre-generated audio (falls back to Web Speech API)
 *
 * @param text - The reading/text to play
 * @param options - Optional config for pre-generated audio
 */
export async function playReading(
  text: string,
  options?: {
    source?: AudioSource;
    character?: string;
    vocabId?: number;
  }
): Promise<void> {
  if (typeof window === "undefined") return;

  // Stop any current playback
  stopAudio();

  // Try pre-generated audio first
  if (options?.source && options?.character) {
    const audioPath = getAudioPath(options.source, options.character, text, options.vocabId);

    try {
      // Check cache first
      let audio = audioCache.get(audioPath);

      if (!audio) {
        audio = new Audio(audioPath);
        // Only cache if it loads successfully
        audio.addEventListener("canplaythrough", () => {
          audioCache.set(audioPath, audio!);
        }, { once: true });
      }

      currentAudio = audio;
      audio.currentTime = 0;
      audio.playbackRate = 0.95; // Slightly slower for learners

      await audio.play();
      return;
    } catch (error) {
      // File doesn't exist or failed to play, fall back to Web Speech API
      console.debug("Pre-generated audio not available, using Web Speech API");
    }
  }

  // Fallback to Web Speech API
  fallbackToSpeechAPI(text);
}

/**
 * Play audio for a kanji reading
 */
export async function playKanjiReading(
  character: string,
  reading: string,
  type: "on" | "kun"
): Promise<void> {
  // Clean the reading (remove trailing dashes from kunyomi)
  const cleanReading = reading.replace(/-$/, "").replace(/-/g, "");

  return playReading(cleanReading, {
    source: type === "on" ? "kanji_on" : "kanji_kun",
    character,
  });
}

/**
 * Play audio for a vocabulary word
 */
export async function playVocabReading(
  word: string,
  reading: string,
  vocabId?: number
): Promise<void> {
  return playReading(reading, {
    source: "vocab",
    character: word,
    vocabId,
  });
}

/**
 * Play audio for an example sentence
 */
export async function playSentence(
  vocabWord: string,
  sentence: string,
  vocabId: number,
  sentenceIndex: number = 0
): Promise<void> {
  return playReading(sentence, {
    source: "sentence",
    character: vocabWord,
    vocabId: vocabId * 100 + sentenceIndex,
  });
}

/**
 * Fallback to browser's Web Speech API
 */
function fallbackToSpeechAPI(text: string): void {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8;

  // Try to find a Japanese voice
  const voices = speechSynthesis.getVoices();
  const japaneseVoice = voices.find(
    (voice) => voice.lang === "ja-JP" || voice.lang.startsWith("ja")
  );

  if (japaneseVoice) {
    utterance.voice = japaneseVoice;
  }

  speechSynthesis.speak(utterance);
}

/**
 * Stop any currently playing audio
 */
export function stopAudio(): void {
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

/**
 * Preload audio for faster playback (call ahead of time)
 */
export function preloadAudio(
  source: AudioSource,
  character: string,
  reading: string,
  vocabId?: number
): void {
  if (typeof window === "undefined") return;

  const audioPath = getAudioPath(source, character, reading, vocabId);

  if (!audioCache.has(audioPath)) {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = audioPath;

    audio.addEventListener("canplaythrough", () => {
      audioCache.set(audioPath, audio);
    }, { once: true });
  }
}

/**
 * Clear the audio cache (useful for memory management)
 */
export function clearAudioCache(): void {
  audioCache.clear();
}

// Legacy export for backwards compatibility
export { playReading as playAudio };
