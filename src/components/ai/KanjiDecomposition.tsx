"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";

interface Radical {
  id: number;
  character: string | null;
  meaningFr: string;
  imagePath: string | null;
}

interface DecompositionData {
  kanji: {
    id: number;
    character: string;
    meaningsFr: string[];
  };
  radicals: Radical[];
  explanation: string;
}

interface KanjiDecompositionProps {
  kanjiId: number;
  character: string;
}

export function KanjiDecomposition({ kanjiId, character }: KanjiDecompositionProps) {
  const [data, setData] = useState<DecompositionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDecomposition() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/kanji/decomposition?kanjiId=${kanjiId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur lors du chargement");
        }

        const decomposition = await response.json();
        setData(decomposition);
      } catch (err) {
        console.error("Failed to fetch kanji decomposition:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    }

    fetchDecomposition();
  }, [kanjiId]);

  if (loading) {
    return <DecompositionSkeleton character={character} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-red-700 font-medium mb-1">Impossible de charger la decomposition</p>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!data || data.radicals.length === 0) {
    return (
      <div className="bg-blue-50 rounded-2xl p-6">
        <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center gap-2">
          <PuzzleIcon />
          Decomposition visuelle
        </h4>
        <div className="text-center py-4">
          <span className="text-6xl font-japanese text-blue-600">{character}</span>
          <p className="text-stone-500 mt-4 text-sm">
            Ce kanji est un caractere de base sans radical composant identifie.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 rounded-2xl p-6">
      <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center gap-2">
        <PuzzleIcon />
        Decomposition visuelle
      </h4>

      {/* Visual decomposition */}
      <div className="flex flex-col items-center gap-6">
        {/* Radicals combining */}
        <div className="flex items-center justify-center flex-wrap gap-3">
          {data.radicals.map((radical, index) => (
            <div key={radical.id} className="flex items-center gap-3">
              {/* Radical box */}
              <Link
                href={`/radicals/${radical.id}`}
                className="group flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all group-hover:scale-105 border-2 border-blue-300">
                  {radical.character ? (
                    <span className="text-3xl sm:text-4xl font-japanese text-blue-700">
                      {radical.character}
                    </span>
                  ) : radical.imagePath ? (
                    <img
                      src={radical.imagePath}
                      alt={radical.meaningFr}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  ) : (
                    <span className="text-xl text-blue-500">?</span>
                  )}
                </div>
                <span className="mt-2 text-xs sm:text-sm text-blue-600 font-medium text-center max-w-[80px] truncate">
                  {radical.meaningFr}
                </span>
              </Link>

              {/* Plus sign between radicals */}
              {index < data.radicals.length - 1 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold text-lg">
                  +
                </div>
              )}
            </div>
          ))}

          {/* Arrow pointing to result */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>

            {/* Resulting kanji */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-400">
                <span className="text-4xl sm:text-5xl font-japanese text-white">
                  {data.kanji.character}
                </span>
              </div>
              <span className="mt-2 text-sm sm:text-base text-blue-700 font-semibold">
                {data.kanji.meaningsFr[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Explanation text */}
        <div className="w-full mt-4 bg-white/60 rounded-xl p-4 border border-blue-100">
          <p className="text-stone-600 text-sm leading-relaxed text-center">
            {data.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

function DecompositionSkeleton({ character }: { character: string }) {
  return (
    <div className="bg-blue-50 rounded-2xl p-6">
      <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4 flex items-center gap-2">
        <PuzzleIcon />
        Decomposition visuelle
      </h4>

      <div className="flex flex-col items-center gap-6">
        {/* Skeleton radicals */}
        <div className="flex items-center justify-center flex-wrap gap-3">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl" />
                <Skeleton className="mt-2 w-12 h-4 rounded" />
              </div>
              {index === 0 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold text-lg">
                  +
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3">
            <svg
              className="w-8 h-8 text-blue-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-400">
                <span className="text-4xl sm:text-5xl font-japanese text-white">
                  {character}
                </span>
              </div>
              <Skeleton className="mt-2 w-16 h-5 rounded" />
            </div>
          </div>
        </div>

        {/* Skeleton explanation */}
        <div className="w-full mt-4 bg-white/60 rounded-xl p-4 border border-blue-100">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}

function PuzzleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82 48.472 48.472 0 01-4.168.3.64.64 0 01-.656-.643v0z"
      />
    </svg>
  );
}
