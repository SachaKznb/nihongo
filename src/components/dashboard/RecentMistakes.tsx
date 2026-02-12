"use client";

import Link from "next/link";

interface MistakeItem {
  id: string;
  character: string | null;
  imageUrl: string | null;
  type: "radical" | "kanji" | "vocabulary";
  correctAnswer: string;
  userAnswer: string;
  createdAt: string;
}

interface RecentMistakesProps {
  mistakes: MistakeItem[];
}

export function RecentMistakes({ mistakes }: RecentMistakesProps) {
  if (mistakes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-stone-700">Erreurs récentes</h3>
        </div>
        <div className="text-center py-4">
          <span className="text-2xl">🎯</span>
          <p className="text-sm text-stone-500 mt-2">
            Aucune erreur récente. Continue comme ça !
          </p>
        </div>
      </div>
    );
  }

  const typeColors = {
    radical: "bg-blue-100 text-blue-700",
    kanji: "bg-pink-100 text-pink-700",
    vocabulary: "bg-purple-100 text-purple-700",
  };

  const typeLabels = {
    radical: "R",
    kanji: "K",
    vocabulary: "V",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-stone-700">Erreurs récentes</h3>
        <Link
          href="/extra-study"
          className="text-xs text-teal-600 hover:text-teal-700 font-medium"
        >
          Réviser →
        </Link>
      </div>

      <div className="space-y-2">
        {mistakes.slice(0, 5).map((mistake) => (
          <div
            key={mistake.id}
            className="flex items-center gap-3 p-2 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
          >
            {/* Character */}
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-stone-200">
              {mistake.character ? (
                <span className="text-xl font-japanese">{mistake.character}</span>
              ) : mistake.imageUrl ? (
                <img
                  src={mistake.imageUrl}
                  alt="Radical"
                  className="w-6 h-6"
                />
              ) : (
                <span className="text-stone-400">?</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    typeColors[mistake.type]
                  }`}
                >
                  {typeLabels[mistake.type]}
                </span>
                <span className="text-sm text-stone-700 truncate">
                  {mistake.correctAnswer}
                </span>
              </div>
              <p className="text-xs text-stone-400 truncate">
                Tu as répondu : {mistake.userAnswer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {mistakes.length > 5 && (
        <Link
          href="/study"
          className="block text-center text-xs text-stone-500 hover:text-stone-700 mt-3 pt-3 border-t border-stone-100"
        >
          +{mistakes.length - 5} autres erreurs
        </Link>
      )}
    </div>
  );
}
