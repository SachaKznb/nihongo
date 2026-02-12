"use client";

import { useState } from "react";
import { SRS_STAGE_COLORS, SRS_STAGE_NAMES } from "@/lib/srs";
import { ItemPreviewModal, VocabularyItem } from "./ItemPreviewModal";

interface Vocabulary {
  id: number;
  word: string;
  meaningsFr: string[];
  readings: string[];
  mnemonicFr: string;
  sentenceJp: string | null;
  sentenceFr: string | null;
  levelId: number;
  userProgress: {
    srsStage: number;
    customMnemonic: string | null;
    meaningCorrect: number;
    meaningIncorrect: number;
    readingCorrect: number;
    readingIncorrect: number;
    nextReviewAt: Date | null;
  }[];
}

interface VocabularyGridProps {
  vocabularyList: Vocabulary[];
}

export function VocabularyGrid({ vocabularyList }: VocabularyGridProps) {
  const [selectedItem, setSelectedItem] = useState<VocabularyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (vocab: Vocabulary) => {
    const progress = vocab.userProgress[0];
    const item: VocabularyItem = {
      type: "vocabulary",
      id: vocab.id,
      word: vocab.word,
      meaningsFr: vocab.meaningsFr,
      readings: vocab.readings,
      mnemonicFr: vocab.mnemonicFr,
      customMnemonic: progress?.customMnemonic,
      sentenceJp: vocab.sentenceJp,
      sentenceFr: vocab.sentenceFr,
      levelId: vocab.levelId,
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
  const groupedByLevel = vocabularyList.reduce((acc, vocab) => {
    const levelId = vocab.levelId;
    if (!acc[levelId]) {
      acc[levelId] = [];
    }
    acc[levelId].push(vocab);
    return acc;
  }, {} as Record<number, Vocabulary[]>);

  return (
    <>
      {Object.entries(groupedByLevel).map(([levelId, levelVocab]) => (
        <div key={levelId} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Niveau {levelId}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {levelVocab.map((vocab) => {
              const progress = vocab.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <button
                  key={vocab.id}
                  onClick={() => handleCardClick(vocab)}
                  className={`relative rounded-lg p-3 text-white text-left transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-purple-500"
                  }`}
                  title={`${vocab.meaningsFr[0]} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  <div className="text-xl font-japanese mb-1">{vocab.word}</div>
                  <div className="text-sm opacity-80">{vocab.meaningsFr[0]}</div>
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
