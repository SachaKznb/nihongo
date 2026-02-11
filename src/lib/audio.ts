export function playReading(text: string) {
  if (typeof window === "undefined") return;

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  // Use Web Speech API with Japanese voice
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.8; // Slightly slower for learners

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

export function stopAudio() {
  if (typeof window === "undefined") return;
  speechSynthesis.cancel();
}
