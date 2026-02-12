"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function StudyPage() {
  const [suggestions, setSuggestions] = useState<StudySuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<StudySuggestion | null>(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
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

  // Study mode active
  if (selectedSession) {
    return (
      <StudySession
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="p-2 hover:bg-stone-100 rounded-xl transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-stone-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-display text-stone-900">Etude ciblee</h1>
          <p className="text-stone-500">Renforce tes points faibles avec des sessions personnalisees</p>
        </div>
      </div>

      {suggestions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center">
          <span className="text-6xl mb-4 block">🎉</span>
          <h2 className="text-xl font-bold font-display text-stone-900 mb-2">
            Aucun point faible detecte
          </h2>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">
            Continue tes revisions ! Une fois que tu auras fait quelques erreurs,
            je pourrai t&apos;aider a cibler tes difficultes.
          </p>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <span>Commencer les revisions</span>
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

            return (
              <div
                key={suggestion.id}
                className={`${colors.bg} rounded-3xl border-2 ${colors.border} p-6 transition-all hover:shadow-lg cursor-pointer`}
                onClick={() => setSelectedSession(suggestion)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold font-display text-stone-900">
                        {suggestion.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-stone-500">
                        <span>{suggestion.itemCount} elements</span>
                        <span className="text-stone-300">•</span>
                        <span>{suggestion.estimatedTime}</span>
                      </div>
                    </div>
                    <p className="text-stone-600 mb-4">{suggestion.description}</p>

                    {/* Preview items */}
                    <div className="flex flex-wrap gap-2">
                      {suggestion.items.slice(0, 8).map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1.5 bg-white border border-stone-200 rounded-lg font-japanese text-lg"
                        >
                          {item.character}
                        </span>
                      ))}
                      {suggestion.items.length > 8 && (
                        <span className="inline-flex items-center px-3 py-1.5 text-sm text-stone-400">
                          +{suggestion.items.length - 8}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${colors.bg}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 ${colors.text}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips section */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-indigo-900 mb-1">Comment ca marche ?</h3>
            <p className="text-sm text-indigo-700 leading-relaxed">
              L&apos;etude ciblee analyse tes erreurs recurrentes et te propose des sessions
              focalisees sur tes points faibles. Chaque session te montre les elements
              que tu confonds le plus souvent, avec des explications pour t&apos;aider a
              les differencier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Study Session Component
function StudySession({
  session,
  onClose,
}: {
  session: StudySuggestion;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [itemDetails, setItemDetails] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  const currentItem = session.items[currentIndex];
  const progress = ((currentIndex + 1) / session.items.length) * 100;

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

  const handleNext = () => {
    if (currentIndex < session.items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
        <span className="text-sm text-stone-500">
          {currentIndex + 1} / {session.items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl border-2 border-stone-200 shadow-lg overflow-hidden">
        {/* Character display */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center">
          <span className="text-8xl font-japanese text-white drop-shadow-lg">
            {currentItem.character}
          </span>
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
                  {(itemDetails as { meaningsFr?: string[]; meaningFr?: string }).meaningsFr?.join(", ") ||
                    (itemDetails as { meaningFr?: string }).meaningFr ||
                    "-"}
                </p>
              </div>

              {/* Readings (for kanji/vocab) */}
              {((itemDetails as { readingsOn?: string[] }).readingsOn ||
                (itemDetails as { readingsKun?: string[] }).readingsKun ||
                (itemDetails as { readings?: string[] }).readings) && (
                <div>
                  <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-1">
                    Lectures
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(itemDetails as { readingsOn?: string[] }).readingsOn?.map((r: string, i: number) => (
                      <span key={`on-${i}`} className="px-2 py-1 bg-pink-100 text-pink-700 rounded-lg text-sm font-japanese">
                        {r}
                      </span>
                    ))}
                    {(itemDetails as { readingsKun?: string[] }).readingsKun?.map((r: string, i: number) => (
                      <span key={`kun-${i}`} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-japanese">
                        {r}
                      </span>
                    ))}
                    {(itemDetails as { readings?: string[] }).readings?.map((r: string, i: number) => (
                      <span key={`r-${i}`} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-japanese">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mnemonic */}
              {((itemDetails as { mnemonic?: string }).mnemonic ||
                (itemDetails as { meaningMnemonicFr?: string }).meaningMnemonicFr ||
                (itemDetails as { mnemonicFr?: string }).mnemonicFr) && (
                <div className="bg-stone-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-2">
                    Mnemonique
                  </h4>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    {(itemDetails as { mnemonic?: string }).mnemonic ||
                      (itemDetails as { meaningMnemonicFr?: string }).meaningMnemonicFr ||
                      (itemDetails as { mnemonicFr?: string }).mnemonicFr}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-stone-500 mb-4">
                Essaie de te rappeler la signification et les lectures de ce caractere
              </p>
              <button
                onClick={() => setShowAnswer(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Voir la reponse
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
            <span>Precedent</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <span>{currentIndex < session.items.length - 1 ? "Suivant" : "Terminer"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
