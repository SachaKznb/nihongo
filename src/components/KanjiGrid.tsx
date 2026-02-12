"use client";

import { useState } from "react";
import { SRS_STAGE_COLORS, SRS_STAGE_NAMES } from "@/lib/srs";
import { ItemPreviewModal, KanjiItem } from "./ItemPreviewModal";

interface Kanji {
  id: number;
  character: string;
  meaningsFr: string[];
  readingsOn: string[];
  readingsKun: string[];
  meaningMnemonicFr: string;
  levelId: number;
  userProgress: {
    srsStage: number;
    customMeaningMnemonic: string | null;
    meaningCorrect: number;
    meaningIncorrect: number;
    readingCorrect: number;
    readingIncorrect: number;
    nextReviewAt: Date | null;
  }[];
}

interface KanjiGridProps {
  kanjiList: Kanji[];
}

export function KanjiGrid({ kanjiList }: KanjiGridProps) {
  const [selectedItem, setSelectedItem] = useState<KanjiItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (kanji: Kanji) => {
    const progress = kanji.userProgress[0];
    const item: KanjiItem = {
      type: "kanji",
      id: kanji.id,
      character: kanji.character,
      meaningsFr: kanji.meaningsFr,
      readingsOn: kanji.readingsOn,
      readingsKun: kanji.readingsKun,
      meaningMnemonicFr: kanji.meaningMnemonicFr,
      customMeaningMnemonic: progress?.customMeaningMnemonic,
      levelId: kanji.levelId,
      stage: progress?.srsStage ?? 0,
      meaningCorrect: progress?.meaningCorrect ?? 0,
      meaningIncorrect: progress?.meaningIncorrect ?? 0,
      readingCorrect: progress?.readingCorrect ?? 0,
      readingIncorrect: progress?.readingIncorrect ?? 0,
      nextReviewAt: progress?.nextReviewAt ?? null,
    };
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Group by level
  const groupedByLevel = kanjiList.reduce((acc, kanji) => {
    const levelId = kanji.levelId;
    if (!acc[levelId]) {
      acc[levelId] = [];
    }
    acc[levelId].push(kanji);
    return acc;
  }, {} as Record<number, Kanji[]>);

  return (
    <>
      {Object.entries(groupedByLevel).map(([levelId, levelKanji]) => (
        <div key={levelId} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Niveau {levelId}
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {levelKanji.map((kanji) => {
              const progress = kanji.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <button
                  key={kanji.id}
                  onClick={() => handleCardClick(kanji)}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-japanese transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-pink-500"
                  }`}
                  title={`${kanji.meaningsFr[0]} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  {kanji.character}
                  {stage > 0 && (
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${SRS_STAGE_COLORS[stage]}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <ItemPreviewModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
