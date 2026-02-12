"use client";

import { useState, useCallback } from "react";
import { FuriganaSentence } from "@/components/ui/FuriganaText";
import { GrammarNoteTooltip } from "@/components/ui/GrammarNoteTooltip";
import { useToast } from "@/components/ui/Toast";
import type { SentenceData, GenerateSentencesResponse } from "@/types/sentences";

interface ExampleSentencesProps {
  vocabularyId: number;
  initialSentences?: SentenceData[];
  showRegenerate?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const complexityLabels: Record<string, { label: string; color: string }> = {
  simple: { label: "Simple", color: "bg-emerald-100 text-emerald-700" },
  natural: { label: "Naturel", color: "bg-blue-100 text-blue-700" },
  combined: { label: "Combiné", color: "bg-purple-100 text-purple-700" },
};

export function ExampleSentences({
  vocabularyId,
  initialSentences,
  showRegenerate = true,
  collapsible = false,
  defaultExpanded = true,
}: ExampleSentencesProps) {
  const [sentences, setSentences] = useState<SentenceData[] | null>(
    initialSentences || null
  );
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [masteredCount, setMasteredCount] = useState<number | null>(null);
  const { addToast } = useToast();

  const generateSentences = useCallback(
    async (forceRegenerate = false) => {
      setLoading(true);
      try {
        const response = await fetch("/api/sentences/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vocabularyId, forceRegenerate }),
        });

        if (!response.ok) {
          const error = await response.json();
          if (error.requiresCredits) {
            addToast(
              `Crédits insuffisants (${error.créditsRemaining || 0} restants)`,
              "warning"
            );
            return;
          }
          throw new Error(error.error || "Erreur de génération");
        }

        const data: GenerateSentencesResponse = await response.json();
        setSentences(data.sentences);
        setMasteredCount(data.masteredKanjiCount);

        if (forceRegenerate) {
          addToast("Nouvelles phrases générées", "success");
        }
      } catch (error) {
        console.error("Failed to generate sentences:", error);
        addToast("Erreur lors de la génération des phrases", "error");
      } finally {
        setLoading(false);
      }
    },
    [vocabularyId, addToast]
  );

  // Load sentences on first expand if collapsible
  const handleExpand = useCallback(() => {
    if (!expanded && !sentences && !loading) {
      generateSentences(false);
    }
    setExpanded(!expanded);
  }, [expanded, sentences, loading, generateSentences]);

  // Auto-load if not collapsible and no initial sentences
  const handleLoadClick = useCallback(() => {
    if (!sentences && !loading) {
      generateSentences(false);
    }
  }, [sentences, loading, generateSentences]);

  if (collapsible) {
    return (
      <div className="border border-stone-200 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={handleExpand}
          className="w-full px-4 py-3 flex items-center justify-between bg-stone-50 hover:bg-stone-100 transition-colors"
        >
          <span className="text-sm font-medium text-stone-700">
            Voir des exemples personnalisés
          </span>
          <svg
            className={`w-5 h-5 text-stone-500 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {expanded && (
          <div className="p-4">
            <SentencesList
              sentences={sentences}
              loading={loading}
              masteredCount={masteredCount}
              showRegenerate={showRegenerate}
              onRegenerate={() => generateSentences(true)}
            />
          </div>
        )}
      </div>
    );
  }

  // Non-collapsible version
  return (
    <div className="space-y-4">
      {!sentences && !loading && (
        <button
          type="button"
          onClick={handleLoadClick}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Générer des phrases personnalisées
        </button>
      )}

      <SentencesList
        sentences={sentences}
        loading={loading}
        masteredCount={masteredCount}
        showRegenerate={showRegenerate}
        onRegenerate={() => generateSentences(true)}
      />
    </div>
  );
}

interface SentencesListProps {
  sentences: SentenceData[] | null;
  loading: boolean;
  masteredCount: number | null;
  showRegenerate: boolean;
  onRegenerate: () => void;
}

function SentencesList({
  sentences,
  loading,
  masteredCount,
  showRegenerate,
  onRegenerate,
}: SentencesListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="h-6 bg-stone-200 rounded w-3/4" />
            <div className="h-4 bg-stone-100 rounded w-1/2" />
          </div>
        ))}
        <p className="text-sm text-stone-500 text-center">
          Génération en cours...
        </p>
      </div>
    );
  }

  if (!sentences || sentences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Mastered count info */}
      {masteredCount !== null && (
        <p className="text-xs text-stone-500">
          Basé sur vos {masteredCount} kanji maîtrisés
        </p>
      )}

      {/* Sentences */}
      {sentences.map((sentence, index) => (
        <SentenceCard key={index} sentence={sentence} index={index} />
      ))}

      {/* Regenerate button */}
      {showRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          disabled={loading}
          className="w-full py-2 px-4 border border-stone-300 text-stone-600 rounded-lg text-sm hover:bg-stone-50 transition-colors disabled:opacity-50"
        >
          Autres exemples (1 crédit)
        </button>
      )}
    </div>
  );
}

interface SentenceCardProps {
  sentence: SentenceData;
  index: number;
}

function SentenceCard({ sentence, index }: SentenceCardProps) {
  const complexity = complexityLabels[sentence.complexity] || complexityLabels.simple;

  return (
    <div className="space-y-2">
      {/* Header with complexity badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-stone-400">#{index + 1}</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${complexity.color}`}
        >
          {complexity.label}
        </span>
      </div>

      {/* Japanese sentence with furigana */}
      <FuriganaSentence segments={sentence.segments} size="lg" />

      {/* French translation */}
      <p className="text-stone-600">{sentence.translation}</p>

      {/* Grammar notes */}
      {sentence.grammarNotes && sentence.grammarNotes.length > 0 && (
        <GrammarNoteTooltip notes={sentence.grammarNotes} className="mt-2" />
      )}
    </div>
  );
}

/**
 * Compact version for review sessions - shows just one sentence
 */
interface CompactSentenceProps {
  sentence: SentenceData;
}

export function CompactSentence({ sentence }: CompactSentenceProps) {
  return (
    <div className="bg-stone-50 rounded-lg p-3 space-y-1">
      <FuriganaSentence segments={sentence.segments} size="md" />
      <p className="text-sm text-stone-600">{sentence.translation}</p>
    </div>
  );
}
