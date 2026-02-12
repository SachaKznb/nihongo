"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface WeaknessPattern {
  patternType: "visual_confusion" | "reading_confusion" | "translation_nuance";
  description: string;
  affectedItems: { type: string; id: number; character: string }[];
  mistakeCount: number;
  severity: number;
}

const patternLabels: Record<string, { label: string; emoji: string; color: string }> = {
  visual_confusion: {
    label: "Confusion visuelle",
    emoji: "👁️",
    color: "text-rose-600 bg-rose-50",
  },
  reading_confusion: {
    label: "Lectures melangees",
    emoji: "🔤",
    color: "text-amber-600 bg-amber-50",
  },
  translation_nuance: {
    label: "Nuances de traduction",
    emoji: "🇫🇷",
    color: "text-blue-600 bg-blue-50",
  },
};

export default function WeaknessPatterns() {
  const [patterns, setPatterns] = useState<WeaknessPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    try {
      const res = await fetch("/api/patterns");
      if (res.ok) {
        const data = await res.json();
        setPatterns(data.patterns || []);
      }
    } catch (err) {
      console.error("Failed to fetch patterns:", err);
    } finally {
      setLoading(false);
    }
  };

  const triggerAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/patterns/analyze", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setPatterns(data.patterns || []);
      }
    } catch (err) {
      console.error("Failed to analyze patterns:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Don't show if loading or no patterns
  if (loading) {
    return null;
  }

  if (patterns.length === 0) {
    return null;
  }

  const displayedPatterns = expanded ? patterns : patterns.slice(0, 2);

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <h3 className="font-bold font-display text-stone-900">Mes points faibles</h3>
        </div>
        <button
          onClick={triggerAnalysis}
          disabled={analyzing}
          className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors disabled:opacity-50"
        >
          {analyzing ? (
            <span className="flex items-center gap-1">
              <span className="animate-spin h-3 w-3 border-2 border-indigo-500 border-t-transparent rounded-full"></span>
              Analyse...
            </span>
          ) : (
            "Actualiser"
          )}
        </button>
      </div>

      <div className="space-y-4">
        {displayedPatterns.map((pattern, index) => {
          const config = patternLabels[pattern.patternType] || patternLabels.visual_confusion;

          return (
            <div
              key={index}
              className="bg-stone-50 rounded-2xl p-4 border border-stone-100"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{config.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-stone-400">
                      {pattern.mistakeCount} erreur{pattern.mistakeCount > 1 ? "s" : ""}
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {pattern.description}
                  </p>

                  {/* Affected items preview */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pattern.affectedItems.slice(0, 6).map((item, i) => (
                      <Link
                        key={i}
                        href={`/${item.type === "vocabulary" ? "vocabulary" : item.type === "kanji" ? "kanji" : "radicals"}/${item.id}`}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-stone-200 rounded-lg text-sm hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                      >
                        <span className="font-japanese text-base">{item.character}</span>
                      </Link>
                    ))}
                    {pattern.affectedItems.length > 6 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs text-stone-400">
                        +{pattern.affectedItems.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        {patterns.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            {expanded ? "Voir moins" : `Voir tout (${patterns.length})`}
          </button>
        )}
        <Link
          href="/study"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors ml-auto"
        >
          <span>Session ciblee</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
