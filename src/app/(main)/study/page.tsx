"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { playReading } from "@/lib/audio";

interface StudyItem {
  type: string;
  id: number;
  character: string;
}

interface StudySuggestion {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  estimatedTime: string;
  items: StudyItem[];
  patternType?: string;
}

interface CompletionResult {
  xpEarned: number;
  totalXp: number;
}

const patternEmojis: Record<string, string> = {
  visual_confusion: "👁️",
  reading_confusion: "🔤",
  translation_nuance: "🇫🇷",
};

const patternColors: Record<string, { bg: string; border: string; text: string }> = {
  visual_confusion: {
    bg: "bg-rose-50",
    border: "border-rose-200 hover:border-rose-300",
    text: "text-rose-600",
  },
  reading_confusion: {
    bg: "bg-amber-50",
    border: "border-amber-200 hover:border-amber-300",
    text: "text-amber-600",
  },
  translation_nuance: {
    bg: "bg-blue-50",
    border: "border-blue-200 hover:border-blue-300",
    text: "text-blue-600",
  },
};

const encouragementMessages = [
  "Excellent travail ! Tu progresses à vue d'œil !",
  "Bravo ! Ces kanji n'ont plus de secrets pour toi !",
  "Super session ! Continue comme ça !",
  "Impressionnant ! Tu maîtrises de mieux en mieux !",
  "Génial ! Tes points faibles deviennent tes forces !",
];

export default function StudyPage() {
  const [suggestions, setSuggestions] = useState<StudySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<StudySuggestion | null>(null);
  const [completionResult, setCompletionResult] = useState<CompletionResult | null>(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/study/suggestions");
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleSessionComplete = async (session: StudySuggestion) => {
    try {
      const res = await fetch("/api/study/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patternType: session.patternType,
          itemCount: session.items.length,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setCompletionResult({
          xpEarned: data.xpEarned,
          totalXp: data.totalXp,
        });
      }
    } catch (err) {
      console.error("Failed to complete session:", err);
    }

    setSelectedSession(null);
  };

  const handleCloseCompletion = () => {
    setCompletionResult(null);
    fetchSuggestions(); // Refresh to remove completed pattern
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-stone-200 rounded-xl w-1/3"></div>
          <div className="h-32 bg-stone-200 rounded-3xl"></div>
          <div className="h-32 bg-stone-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  // Completion screen
  if (completionResult) {
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];

    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-3xl font-bold font-display mb-2">Session terminée !</h1>
          <p className="text-emerald-100 text-lg mb-6">{randomMessage}</p>

          {/* XP Reward */}
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">⚡</span>
              <span className="text-5xl font-bold font-display">+{completionResult.xpEarned}</span>
              <span className="text-2xl">XP</span>
            </div>
            <p className="text-emerald-100 text-sm">
              Total: {completionResult.totalXp.toLocaleString()} XP
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Retour au dashboard
            </Link>
            <button
              onClick={handleCloseCompletion}
              className="px-6 py-3 bg-emerald-400/30 text-white font-semibold rounded-xl hover:bg-emerald-400/40 transition-colors"
            >
              Continuer l&apos;étude
            </button>
          </div>
        </div>

        {/* Motivational tip */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-amber-800 text-sm">
            💡 <strong>Conseil :</strong> Reviens demain pour consolider ces acquis.
            La répétition espacée est la clé de la mémorisation !
          </p>
        </div>
      </div>
    );
  }

  // Study mode active
  if (selectedSession) {
    return (
      <StudySession
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
        onComplete={handleSessionComplete}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/dashboard"
          className="p-2 hover:bg-stone-100 rounded-xl transition-colors flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-stone-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">Étude ciblée</h1>
          <p className="text-sm sm:text-base text-stone-500">Renforce tes points faibles</p>
        </div>
      </div>

      {/* XP Reward Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl">⚡</span>
          <div>
            <p className="font-semibold text-sm sm:text-base">Gagne des XP bonus !</p>
            <p className="text-emerald-100 text-xs sm:text-sm">5 XP/élément + 20 XP bonus</p>
          </div>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200 p-6 sm:p-12 text-center">
          <span className="text-4xl sm:text-6xl mb-3 sm:mb-4 block">🎉</span>
          <h2 className="text-lg sm:text-xl font-bold font-display text-stone-900 mb-2">
            Aucun point faible détecté
          </h2>
          <p className="text-sm sm:text-base text-stone-500 mb-4 sm:mb-6 max-w-md mx-auto">
            Continue tes révisions ! Une fois que tu auras fait quelques erreurs,
            je pourrai t&apos;aider à cibler tes difficultés.
          </p>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            <span>Commencer les révisions</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const colors = patternColors[suggestion.patternType || "visual_confusion"] || patternColors.visual_confusion;
            const emoji = patternEmojis[suggestion.patternType || "visual_confusion"] || "📚";
            const potentialXp = suggestion.itemCount * 5 + 20;

            return (
              <div
                key={suggestion.id}
                className={`${colors.bg} rounded-2xl sm:rounded-3xl border-2 ${colors.border} p-4 sm:p-6 transition-all hover:shadow-lg cursor-pointer`}
                onClick={() => setSelectedSession(suggestion)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-4xl">{emoji}</div>
                  <div className="flex-1 min-w-0">
                    {/* Title and play button row */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold font-display text-stone-900">
                        {suggestion.title}
                      </h3>
                      <div className={`p-2 sm:p-3 rounded-xl ${colors.bg} flex-shrink-0`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 sm:w-6 sm:h-6 ${colors.text}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                      </div>
                    </div>

                    {/* Stats row - stacked on mobile */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm mb-2 sm:mb-3">
                      <span className="text-stone-500">{suggestion.itemCount} éléments</span>
                      <span className="text-stone-300 hidden sm:inline">•</span>
                      <span className="text-stone-500">{suggestion.estimatedTime}</span>
                      <span className="text-stone-300 hidden sm:inline">•</span>
                      <span className="text-emerald-600 font-medium">+{potentialXp} XP</span>
                    </div>

                    <p className="text-sm sm:text-base text-stone-600 mb-3 sm:mb-4">{suggestion.description}</p>

                    {/* Preview items */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {suggestion.items.slice(0, 6).map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-white border border-stone-200 rounded-lg font-japanese text-base sm:text-lg"
                        >
                          {item.character}
                        </span>
                      ))}
                      {suggestion.items.length > 6 && (
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-stone-400">
                          +{suggestion.items.length - 6}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips section */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-xl sm:text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-indigo-900 mb-1 text-sm sm:text-base">Comment ça marche ?</h3>
            <p className="text-xs sm:text-sm text-indigo-700 leading-relaxed">
              L&apos;étude ciblée analyse tes erreurs récurrentes et te propose des sessions
              focalisées sur tes points faibles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Item details interface
interface ItemDetails {
  id: number;
  character?: string;
  word?: string;
  meaningFr?: string;
  meaningsFr?: string[];
  readingsOn?: string[];
  readingsKun?: string[];
  readings?: string[];
  mnemonic?: string;
  meaningMnemonicFr?: string;
  readingMnemonicFr?: string;
  mnemonicFr?: string;
  customMnemonic?: string;
  customMeaningMnemonic?: string;
  customReadingMnemonic?: string;
}

// Study Session Component
function StudySession({
  session,
  onClose,
  onComplete,
}: {
  session: StudySuggestion;
  onClose: () => void;
  onComplete: (session: StudySuggestion) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const currentItem = session.items[currentIndex];
  const progress = ((currentIndex + 1) / session.items.length) * 100;
  const isLastItem = currentIndex === session.items.length - 1;

  useEffect(() => {
    if (currentItem) {
      fetchItemDetails();
    }
  }, [currentItem]);

  const fetchItemDetails = async () => {
    setLoading(true);
    setShowAnswer(false);
    setItemDetails(null);

    try {
      const endpoint =
        currentItem.type === "radical"
          ? `/api/radicals/${currentItem.id}`
          : currentItem.type === "kanji"
            ? `/api/kanji/${currentItem.id}`
            : `/api/vocabulary/${currentItem.id}`;

      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        setItemDetails(data);
      }
    } catch (err) {
      console.error("Failed to fetch item details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAudio = () => {
    if (!itemDetails) return;

    // Get the text to speak
    let textToSpeak = "";

    if (currentItem.type === "vocabulary" && itemDetails.word) {
      textToSpeak = itemDetails.word;
    } else if (currentItem.type === "kanji" && itemDetails.character) {
      // For kanji, use the first reading
      const reading = itemDetails.readingsKun?.[0] || itemDetails.readingsOn?.[0];
      textToSpeak = reading || itemDetails.character;
    } else if (currentItem.type === "radical" && itemDetails.character) {
      textToSpeak = itemDetails.character;
    } else {
      textToSpeak = currentItem.character;
    }

    playReading(textToSpeak);
  };

  const handleNext = () => {
    if (isLastItem) {
      onComplete(session);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Get the best mnemonic (custom AI-generated > default)
  const getMnemonic = () => {
    if (!itemDetails) return null;

    // For radicals
    if (currentItem.type === "radical") {
      return itemDetails.mnemonic || null;
    }

    // For kanji - check for custom meaning mnemonic first
    if (currentItem.type === "kanji") {
      return itemDetails.meaningMnemonicFr || null;
    }

    // For vocabulary
    if (currentItem.type === "vocabulary") {
      return itemDetails.mnemonicFr || null;
    }

    return null;
  };

  // Get reading mnemonic for kanji
  const getReadingMnemonic = () => {
    if (!itemDetails || currentItem.type !== "kanji") return null;
    return itemDetails.readingMnemonicFr || null;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Quitter</span>
        </button>
        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-500">
            {currentIndex + 1} / {session.items.length}
          </span>
          <span className="text-sm text-emerald-600 font-medium">
            +{(currentIndex + 1) * 5} XP
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-lg overflow-hidden">
        {/* Character display with audio button */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center relative">
          <span className="text-8xl font-japanese text-white drop-shadow-lg">
            {currentItem.character}
          </span>

          {/* Audio button */}
          <button
            onClick={handlePlayAudio}
            className="absolute bottom-4 right-4 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            title="Écouter la prononciation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-stone-200 rounded w-1/2"></div>
              <div className="h-4 bg-stone-200 rounded w-3/4"></div>
              <div className="h-4 bg-stone-200 rounded w-2/3"></div>
            </div>
          ) : showAnswer && itemDetails ? (
            <div className="space-y-4">
              {/* Meanings */}
              <div>
                <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-1">
                  Signification
                </h4>
                <p className="text-lg font-bold text-stone-900">
                  {itemDetails.meaningsFr?.join(", ") || itemDetails.meaningFr || "-"}
                </p>
              </div>

              {/* Readings (for kanji/vocab) */}
              {(itemDetails.readingsOn || itemDetails.readingsKun || itemDetails.readings) && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide">
                      Lectures
                    </h4>
                    <button
                      onClick={handlePlayAudio}
                      className="text-indigo-600 hover:text-indigo-700 transition-colors"
                      title="Écouter"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {itemDetails.readingsOn?.map((r, i) => (
                      <span key={`on-${i}`} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-lg text-sm font-japanese">
                        {r} <span className="text-pink-400 text-xs">(on)</span>
                      </span>
                    ))}
                    {itemDetails.readingsKun?.map((r, i) => (
                      <span key={`kun-${i}`} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-japanese">
                        {r} <span className="text-purple-400 text-xs">(kun)</span>
                      </span>
                    ))}
                    {itemDetails.readings?.map((r, i) => (
                      <span key={`r-${i}`} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-japanese">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Meaning Mnemonic */}
              {getMnemonic() && (
                <div className="bg-indigo-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-indigo-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span>💡</span>
                    Mnémonique (sens)
                  </h4>
                  <p className="text-indigo-900 text-sm leading-relaxed">
                    {getMnemonic()}
                  </p>
                </div>
              )}

              {/* Reading Mnemonic (for kanji) */}
              {getReadingMnemonic() && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-purple-600 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span>🎵</span>
                    Mnémonique (lecture)
                  </h4>
                  <p className="text-purple-900 text-sm leading-relaxed">
                    {getReadingMnemonic()}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-stone-500 mb-4">
                Essaie de te rappeler la signification et les lectures de ce caractère
              </p>
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Voir la réponse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      {showAnswer && (
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span>Précédent</span>
          </button>
          <button
            onClick={handleNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
              isLastItem
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <span>{isLastItem ? "Terminer et gagner XP !" : "Suivant"}</span>
            {isLastItem ? (
              <span>⚡</span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Encouragement nudge */}
      {currentIndex > 0 && currentIndex < session.items.length - 1 && (
        <div className="text-center text-sm text-stone-400">
          Plus que {session.items.length - currentIndex - 1} élément{session.items.length - currentIndex - 1 > 1 ? "s" : ""} !
        </div>
      )}
    </div>
  );
}
