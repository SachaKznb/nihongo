"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";
import { playReading } from "@/lib/audio";

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

function ReadingTooltip({ type, children }: { type: "onyomi" | "kunyomi"; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const info = READING_EXPLANATIONS[type];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-1.5 cursor-help"
      >
        {children}
        <svg
          className="w-3.5 h-3.5 text-stone-400"
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

interface BaseItem {
  id: number;
  stage: number;
  levelId: number;
}

interface RadicalItem extends BaseItem {
  type: "radical";
  character: string | null;
  imageUrl: string | null;
  meaningFr: string;
  meaningHintFr: string | null;
  mnemonic: string;
  customMnemonic?: string | null;
  meaningCorrect: number;
  meaningIncorrect: number;
  nextReviewAt: Date | null;
}

interface KanjiItem extends BaseItem {
  type: "kanji";
  character: string;
  meaningsFr: string[];
  readingsOn: string[];
  readingsKun: string[];
  meaningMnemonicFr: string;
  customMeaningMnemonic?: string | null;
  meaningCorrect: number;
  meaningIncorrect: number;
  readingCorrect: number;
  readingIncorrect: number;
  nextReviewAt: Date | null;
}

interface VocabularyItem extends BaseItem {
  type: "vocabulary";
  word: string;
  meaningsFr: string[];
  readings: string[];
  mnemonicFr: string;
  customMnemonic?: string | null;
  sentenceJp: string | null;
  sentenceFr: string | null;
  meaningCorrect: number;
  meaningIncorrect: number;
  readingCorrect: number;
  readingIncorrect: number;
  nextReviewAt: Date | null;
}

type PreviewItem = RadicalItem | KanjiItem | VocabularyItem;

interface ItemPreviewModalProps {
  item: PreviewItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemPreviewModal({ item, isOpen, onClose }: ItemPreviewModalProps) {
  if (!item) return null;

  const isLocked = item.stage === 0;

  const typeConfig = {
    radical: {
      label: "Radical",
      gradient: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      detailUrl: `/radicals/${item.id}`,
    },
    kanji: {
      label: "Kanji",
      gradient: "from-pink-500 to-pink-600",
      bgLight: "bg-pink-50",
      textColor: "text-pink-600",
      detailUrl: `/kanji/${item.id}`,
    },
    vocabulary: {
      label: "Vocabulaire",
      gradient: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
      detailUrl: `/vocabulary/${item.id}`,
    },
  };

  const config = typeConfig[item.type];

  const handlePlayAudio = () => {
    if (item.type === "kanji") {
      const reading = item.readingsOn[0] || item.readingsKun[0];
      if (reading) playReading(reading);
    } else if (item.type === "vocabulary") {
      if (item.readings[0]) playReading(item.readings[0]);
    }
  };

  // Calculate accuracy
  const getAccuracy = (correct: number, incorrect: number) => {
    const total = correct + incorrect;
    return total > 0 ? Math.round((correct / total) * 100) : null;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="space-y-4">
        {/* Header with type badge and SRS stage */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${config.gradient}`}>
            {config.label} - Niveau {item.levelId}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isLocked ? "bg-gray-200 text-gray-600" : `${SRS_STAGE_COLORS[item.stage]} text-white`
          }`}>
            {SRS_STAGE_NAMES[item.stage]}
          </span>
        </div>

        {/* Character display */}
        <div className={`py-8 rounded-2xl text-center ${config.bgLight}`}>
          {item.type === "radical" ? (
            item.character ? (
              <span className="text-7xl font-japanese text-stone-800">{item.character}</span>
            ) : item.imageUrl ? (
              <img src={item.imageUrl} alt={item.meaningFr} className="w-24 h-24 mx-auto" />
            ) : null
          ) : item.type === "kanji" ? (
            <span className="text-7xl font-japanese text-stone-800">{item.character}</span>
          ) : (
            <div>
              <span className="text-5xl font-japanese text-stone-800">{item.word}</span>
              <p className="text-xl font-japanese text-stone-500 mt-2">{item.readings.join("、")}</p>
            </div>
          )}
        </div>

        {/* Meaning */}
        <div className="text-center">
          <p className="text-2xl font-bold text-stone-900">
            {item.type === "radical" ? item.meaningFr : item.meaningsFr.join(", ")}
          </p>
          {item.type === "radical" && item.meaningHintFr && (
            <p className="text-stone-500 text-sm mt-1">{item.meaningHintFr}</p>
          )}
        </div>

        {/* Readings for kanji */}
        {item.type === "kanji" && (
          <div className="flex flex-wrap gap-3 justify-center">
            {item.readingsOn.length > 0 && (
              <div className="flex items-center gap-2 bg-pink-50 px-3 py-1.5 rounded-full">
                <ReadingTooltip type="onyomi">
                  <span className="text-xs text-pink-600 font-medium">On'yomi</span>
                </ReadingTooltip>
                <span className="font-japanese text-stone-700">{item.readingsOn.join("、")}</span>
              </div>
            )}
            {item.readingsKun.length > 0 && (
              <div className="flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full">
                <ReadingTooltip type="kunyomi">
                  <span className="text-xs text-teal-600 font-medium">Kun'yomi</span>
                </ReadingTooltip>
                <span className="font-japanese text-stone-700">{item.readingsKun.join("、")}</span>
              </div>
            )}
          </div>
        )}

        {/* Progress (if unlocked) */}
        {!isLocked && (
          <div className="bg-stone-50 rounded-xl p-3">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-lg font-bold text-emerald-600">{item.meaningCorrect}</p>
                <p className="text-xs text-stone-500">Correct</p>
              </div>
              <div>
                <p className="text-lg font-bold text-rose-500">{item.meaningIncorrect}</p>
                <p className="text-xs text-stone-500">Incorrect</p>
              </div>
              <div>
                <p className="text-lg font-bold text-stone-700">
                  {getAccuracy(item.meaningCorrect, item.meaningIncorrect) ?? "-"}%
                </p>
                <p className="text-xs text-stone-500">Precision</p>
              </div>
            </div>
            {item.nextReviewAt && (
              <p className="text-xs text-stone-500 text-center mt-2">
                Prochaine revision: {new Date(item.nextReviewAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            )}
          </div>
        )}

        {/* Example sentence for vocabulary */}
        {item.type === "vocabulary" && item.sentenceJp && (
          <div className="bg-teal-50 rounded-xl p-3 border border-teal-100">
            <p className="font-japanese text-stone-800">{item.sentenceJp}</p>
            <p className="text-sm text-stone-600 mt-1">{item.sentenceFr}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {(item.type === "kanji" || item.type === "vocabulary") && (
            <button
              onClick={handlePlayAudio}
              className="flex-1 py-2.5 px-4 border border-stone-300 rounded-xl text-stone-700 font-medium hover:bg-stone-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              Ecouter
            </button>
          )}
          <Link
            href={config.detailUrl}
            onClick={onClose}
            className={`flex-1 py-2.5 px-4 rounded-xl text-white font-medium transition-colors flex items-center justify-center gap-2 bg-gradient-to-r ${config.gradient} hover:opacity-90`}
          >
            Voir plus
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </Modal>
  );
}

// Export types for use in list pages
export type { RadicalItem, KanjiItem, VocabularyItem, PreviewItem };
