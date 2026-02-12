"use client";

import { useState } from "react";

// Hiragana/Katakana to romaji conversion
function kanaToRomaji(kana: string): string {
  const map: Record<string, string> = {
    // Hiragana
    "\u3042": "a", "\u3044": "i", "\u3046": "u", "\u3048": "e", "\u304a": "o",
    "\u304b": "ka", "\u304d": "ki", "\u304f": "ku", "\u3051": "ke", "\u3053": "ko",
    "\u3055": "sa", "\u3057": "shi", "\u3059": "su", "\u305b": "se", "\u305d": "so",
    "\u305f": "ta", "\u3061": "chi", "\u3064": "tsu", "\u3066": "te", "\u3068": "to",
    "\u306a": "na", "\u306b": "ni", "\u306c": "nu", "\u306d": "ne", "\u306e": "no",
    "\u306f": "ha", "\u3072": "hi", "\u3075": "fu", "\u3078": "he", "\u307b": "ho",
    "\u307e": "ma", "\u307f": "mi", "\u3080": "mu", "\u3081": "me", "\u3082": "mo",
    "\u3084": "ya", "\u3086": "yu", "\u3088": "yo",
    "\u3089": "ra", "\u308a": "ri", "\u308b": "ru", "\u308c": "re", "\u308d": "ro",
    "\u308f": "wa", "\u3092": "wo", "\u3093": "n",
    "\u304c": "ga", "\u304e": "gi", "\u3050": "gu", "\u3052": "ge", "\u3054": "go",
    "\u3056": "za", "\u3058": "ji", "\u305a": "zu", "\u305c": "ze", "\u305e": "zo",
    "\u3060": "da", "\u3062": "ji", "\u3065": "zu", "\u3067": "de", "\u3069": "do",
    "\u3070": "ba", "\u3073": "bi", "\u3076": "bu", "\u3079": "be", "\u307c": "bo",
    "\u3071": "pa", "\u3074": "pi", "\u3077": "pu", "\u307a": "pe", "\u307d": "po",
    // Small kana (for combinations)
    "\u3083": "ya", "\u3085": "yu", "\u3087": "yo",
    "\u3063": "", // small tsu (handled separately)
    // Katakana
    "\u30a2": "a", "\u30a4": "i", "\u30a6": "u", "\u30a8": "e", "\u30aa": "o",
    "\u30ab": "ka", "\u30ad": "ki", "\u30af": "ku", "\u30b1": "ke", "\u30b3": "ko",
    "\u30b5": "sa", "\u30b7": "shi", "\u30b9": "su", "\u30bb": "se", "\u30bd": "so",
    "\u30bf": "ta", "\u30c1": "chi", "\u30c4": "tsu", "\u30c6": "te", "\u30c8": "to",
    "\u30ca": "na", "\u30cb": "ni", "\u30cc": "nu", "\u30cd": "ne", "\u30ce": "no",
    "\u30cf": "ha", "\u30d2": "hi", "\u30d5": "fu", "\u30d8": "he", "\u30db": "ho",
    "\u30de": "ma", "\u30df": "mi", "\u30e0": "mu", "\u30e1": "me", "\u30e2": "mo",
    "\u30e4": "ya", "\u30e6": "yu", "\u30e8": "yo",
    "\u30e9": "ra", "\u30ea": "ri", "\u30eb": "ru", "\u30ec": "re", "\u30ed": "ro",
    "\u30ef": "wa", "\u30f2": "wo", "\u30f3": "n",
    "\u30ac": "ga", "\u30ae": "gi", "\u30b0": "gu", "\u30b2": "ge", "\u30b4": "go",
    "\u30b6": "za", "\u30b8": "ji", "\u30ba": "zu", "\u30bc": "ze", "\u30be": "zo",
    "\u30c0": "da", "\u30c2": "ji", "\u30c5": "zu", "\u30c7": "de", "\u30c9": "do",
    "\u30d0": "ba", "\u30d3": "bi", "\u30d6": "bu", "\u30d9": "be", "\u30dc": "bo",
    "\u30d1": "pa", "\u30d4": "pi", "\u30d7": "pu", "\u30da": "pe", "\u30dd": "po",
    "\u30e3": "ya", "\u30e5": "yu", "\u30e7": "yo",
    "\u30c3": "", // small tsu
    "\u30fc": "", // long vowel mark
  };

  let result = "";
  const chars = [...kana];

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const nextChar = chars[i + 1];

    // Handle small tsu (doubles next consonant)
    if (char === "\u3063" || char === "\u30c3") {
      const nextRomaji = map[nextChar] || "";
      if (nextRomaji && nextRomaji[0]) {
        result += nextRomaji[0];
      }
      continue;
    }

    // Handle combination characters (ki + small ya = kya)
    if (nextChar && (nextChar === "\u3083" || nextChar === "\u3085" || nextChar === "\u3087" ||
                     nextChar === "\u30e3" || nextChar === "\u30e5" || nextChar === "\u30e7")) {
      const base = map[char] || char;
      const small = map[nextChar] || "";
      if (base.length >= 2) {
        result += base.slice(0, -1) + small;
        i++;
        continue;
      }
    }

    result += map[char] || char;
  }

  return result;
}

// Reading type explanations - now accepts dynamic example
function getReadingExplanation(
  type: "onyomi" | "kunyomi",
  kanji?: string,
  readings?: string[]
) {
  const firstReading = readings?.[0];
  const romaji = firstReading ? kanaToRomaji(firstReading) : "";

  if (type === "onyomi") {
    return {
      title: "On'yomi (音読み)",
      subtitle: "Lecture sino-japonaise",
      description: "Prononciation derivee du chinois ancien. Utilisee principalement dans les mots composes (jukugo) avec plusieurs kanji.",
      example: kanji && firstReading
        ? `${kanji} (${firstReading} = ${romaji})`
        : "Souvent en katakana (ex: サン, カン)",
      tip: "Utilise dans les mots composes avec d'autres kanji.",
    };
  } else {
    return {
      title: "Kun'yomi (訓読み)",
      subtitle: "Lecture japonaise native",
      description: "Prononciation japonaise originale. Utilisee quand le kanji apparait seul ou avec des hiragana (okurigana).",
      example: kanji && firstReading
        ? `${kanji} (${firstReading} = ${romaji})`
        : "Souvent en hiragana (ex: やま, みず)",
      tip: "Utilise quand le kanji est seul ou suivi d'hiragana.",
    };
  }
}

function ReadingTooltip({
  type,
  kanji,
  readings,
  children
}: {
  type: "onyomi" | "kunyomi";
  kanji?: string;
  readings?: string[];
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const info = getReadingExplanation(type, kanji, readings);

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
        <>
          {/* Mobile-friendly tooltip with responsive positioning */}
          <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mb-2 w-[calc(100vw-2rem)] sm:w-72 max-w-72 p-3 sm:p-4 bg-stone-800 text-white text-sm rounded-xl shadow-xl">
            <div className="font-bold text-sm sm:text-base mb-1">{info.title}</div>
            <div className="text-stone-300 text-xs mb-2">{info.subtitle}</div>
            <p className="text-stone-200 text-xs sm:text-sm mb-3 leading-relaxed">{info.description}</p>
            <div className="bg-stone-700 rounded-lg p-2 mb-2">
              <div className="text-xs text-stone-400 mb-1">Exemple:</div>
              <div className="font-japanese text-sm sm:text-base">{info.example}</div>
            </div>
            <div className="flex items-start gap-1.5 text-xs text-amber-300">
              <span>💡</span>
              <span>{info.tip}</span>
            </div>
            {/* Arrow - centered on mobile, left-aligned on desktop */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-stone-800" />
          </div>
        </>
      )}
    </div>
  );
}

interface ReadingBadgesProps {
  kanji?: string;
  readingsOn: string[];
  readingsKun: string[];
  size?: "sm" | "md" | "lg";
  showRomaji?: boolean;
}

export function ReadingBadges({
  kanji,
  readingsOn,
  readingsKun,
  size = "md",
  showRomaji = false
}: ReadingBadgesProps) {
  const textSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  const formatReadings = (readings: string[]) => {
    if (!showRomaji) {
      return readings.join("、");
    }
    return readings.map(r => `${r} (${kanaToRomaji(r)})`).join("、");
  };

  return (
    <div className="space-y-2">
      {readingsOn.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <ReadingTooltip type="onyomi" kanji={kanji} readings={readingsOn}>
            <span className="text-xs font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              On'yomi
            </span>
          </ReadingTooltip>
          <span className={`${textSizes[size]} font-japanese text-stone-800`}>
            {formatReadings(readingsOn)}
          </span>
        </div>
      )}
      {readingsKun.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <ReadingTooltip type="kunyomi" kanji={kanji} readings={readingsKun}>
            <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              Kun'yomi
            </span>
          </ReadingTooltip>
          <span className={`${textSizes[size]} font-japanese text-stone-800`}>
            {formatReadings(readingsKun)}
          </span>
        </div>
      )}
    </div>
  );
}

// Export for use in ItemPreviewModal
export { ReadingTooltip, kanaToRomaji };
