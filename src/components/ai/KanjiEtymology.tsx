"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

interface KanjiEtymologyProps {
  kanjiId: number;
  character: string;
}

type EtymologyOrigin = "pictographic" | "ideographic" | "compound";

interface EtymologyData {
  kanjiId: number;
  character: string;
  etymology: string;
  origin: EtymologyOrigin;
  cached: boolean;
}

const originConfig: Record<
  EtymologyOrigin,
  { label: string; icon: ReactNode; description: string }
> = {
  pictographic: {
    label: "Pictographique",
    description: "Representation d'un objet reel",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  ideographic: {
    label: "Ideographique",
    description: "Representation d'une idee abstraite",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  compound: {
    label: "Compose",
    description: "Combinaison de plusieurs elements",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
};

export function KanjiEtymology({ kanjiId, character }: KanjiEtymologyProps) {
  const [etymology, setEtymology] = useState<EtymologyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresPremium, setRequiresPremium] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const fetchEtymology = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRequiresPremium(false);

    try {
      const response = await fetch("/api/ai/kanji-etymology", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kanjiId }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        // Handle premium requirement
        if (response.status === 403) {
          setRequiresPremium(true);
          return;
        }

        // Handle rate limiting
        if (response.status === 429) {
          addToast("Trop de requetes. Veuillez patienter.", "warning");
          setError("Limite de requetes atteinte. Reessayez dans quelques minutes.");
          return;
        }

        throw new Error(errorData.error || "Erreur de generation");
      }

      const data: EtymologyData = await response.json();
      setEtymology(data);
      setExpanded(true);
    } catch (err) {
      console.error("Failed to fetch etymology:", err);
      setError("Erreur lors de la generation de l'etymologie");
      addToast("Erreur lors de la generation", "error");
    } finally {
      setLoading(false);
    }
  }, [kanjiId, addToast]);

  const handleToggle = useCallback(() => {
    if (!expanded && !etymology && !loading) {
      fetchEtymology();
    } else {
      setExpanded(!expanded);
    }
  }, [expanded, etymology, loading, fetchEtymology]);

  // Premium required state
  if (requiresPremium) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-800 mb-1">
              Fonctionnalite Premium
            </h4>
            <p className="text-sm text-amber-700 mb-3">
              L'etymologie des kanji est reservee aux membres premium.
              Decouvrez l'origine historique de chaque caractere.
            </p>
            <button
              onClick={() => router.push("/pricing")}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:shadow-md hover:shadow-amber-200/50 transition-all"
            >
              Devenir Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 overflow-hidden">
      {/* Header / Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-100/50 transition-colors disabled:cursor-wait"
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-sm font-medium text-amber-700">
            {loading ? "Generation en cours..." : "Voir l'etymologie"}
          </span>
        </div>

        {loading ? (
          <svg
            className="w-5 h-5 text-amber-500 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            className={`w-5 h-5 text-amber-500 transition-transform ${
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
        )}
      </button>

      {/* Content */}
      {expanded && etymology && (
        <div className="px-4 pb-4 space-y-3">
          {/* Origin Badge */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
              title={originConfig[etymology.origin].description}
            >
              {originConfig[etymology.origin].icon}
              {originConfig[etymology.origin].label}
            </span>

            {etymology.cached && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full text-xs">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                En cache
              </span>
            )}
          </div>

          {/* Etymology Text */}
          <div className="bg-white/60 rounded-xl p-3 border-l-4 border-amber-400">
            <p className="text-stone-700 leading-relaxed text-sm">
              {etymology.etymology}
            </p>
          </div>

          {/* Character reference */}
          <p className="text-xs text-amber-600/70 text-center">
            Etymologie de {character}
          </p>
        </div>
      )}

      {/* Error State */}
      {expanded && error && !etymology && (
        <div className="px-4 pb-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
            <p className="text-sm text-rose-700">{error}</p>
            <button
              type="button"
              onClick={fetchEtymology}
              disabled={loading}
              className="mt-2 text-sm text-rose-600 hover:text-rose-800 font-medium"
            >
              Reessayer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default KanjiEtymology;
