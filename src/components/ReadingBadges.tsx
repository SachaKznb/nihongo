"use client";

import { useState } from "react";

// Reading type explanations
const READING_EXPLANATIONS = {
  onyomi: {
    title: "On'yomi (音読み)",
    subtitle: "Lecture sino-japonaise",
    description: "Prononciation derivee du chinois ancien. Utilisee principalement dans les mots composes (jukugo) avec plusieurs kanji.",
    example: "山 (サン) dans 富士山 (ふじさん, Mont Fuji)",
    tip: "Souvent ecrit en katakana dans les dictionnaires.",
  },
  kunyomi: {
    title: "Kun'yomi (訓読み)",
    subtitle: "Lecture japonaise native",
    description: "Prononciation japonaise originale. Utilisee quand le kanji est seul ou avec des hiragana (okurigana).",
    example: "山 (やま) seul signifie 'montagne'",
    tip: "Souvent ecrit en hiragana dans les dictionnaires.",
  },
};

function ReadingTooltip({
  type,
  children
}: {
  type: "onyomi" | "kunyomi";
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const info = READING_EXPLANATIONS[type];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-1.5 cursor-help"
      >
        {children}
        <svg
          className="w-3.5 h-3.5 text-stone-400 hover:text-stone-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-72 p-4 bg-stone-800 text-white text-sm rounded-xl shadow-xl">
          <div className="font-bold text-base mb-1">{info.title}</div>
          <div className="text-stone-300 text-xs mb-2">{info.subtitle}</div>
          <p className="text-stone-200 mb-3 leading-relaxed">{info.description}</p>
          <div className="bg-stone-700 rounded-lg p-2 mb-2">
            <div className="text-xs text-stone-400 mb-1">Exemple:</div>
            <div className="font-japanese">{info.example}</div>
          </div>
          <div className="flex items-start gap-1.5 text-xs text-amber-300">
            <span>💡</span>
            <span>{info.tip}</span>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-6 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-stone-800" />
        </div>
      )}
    </div>
  );
}

interface ReadingBadgesProps {
  readingsOn: string[];
  readingsKun: string[];
  size?: "sm" | "md" | "lg";
}

export function ReadingBadges({
  readingsOn,
  readingsKun,
  size = "md"
}: ReadingBadgesProps) {
  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="space-y-2">
      {readingsOn.length > 0 && (
        <div className="flex items-center gap-3">
          <ReadingTooltip type="onyomi">
            <span className="text-xs font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
              On'yomi
            </span>
          </ReadingTooltip>
          <span className={`${textSizes[size]} font-japanese text-stone-800`}>
            {readingsOn.join("、")}
          </span>
        </div>
      )}
      {readingsKun.length > 0 && (
        <div className="flex items-center gap-3">
          <ReadingTooltip type="kunyomi">
            <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
              Kun'yomi
            </span>
          </ReadingTooltip>
          <span className={`${textSizes[size]} font-japanese text-stone-800`}>
            {readingsKun.join("、")}
          </span>
        </div>
      )}
    </div>
  );
}

// Export for use in ItemPreviewModal
export { ReadingTooltip, READING_EXPLANATIONS };
