"use client";

import { useState } from "react";
import { SRS_STAGE_COLORS, SRS_STAGE_NAMES } from "@/lib/srs";
import { ItemPreviewModal, RadicalItem } from "./ItemPreviewModal";

interface Radical {
  id: number;
  character: string | null;
  meaningFr: string;
  meaningHintFr: string | null;
  mnemonic: string;
  imageUrl: string | null;
  levelId: number;
  userProgress: {
    srsStage: number;
    customMnemonic: string | null;
    meaningCorrect: number;
    meaningIncorrect: number;
    nextReviewAt: Date | null;
  }[];
}

interface RadicalGridProps {
  radicals: Radical[];
}

export function RadicalGrid({ radicals }: RadicalGridProps) {
  const [selectedItem, setSelectedItem] = useState<RadicalItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (radical: Radical) => {
    const progress = radical.userProgress[0];
    const item: RadicalItem = {
      type: "radical",
      id: radical.id,
      character: radical.character,
      imageUrl: radical.imageUrl,
      meaningFr: radical.meaningFr,
      meaningHintFr: radical.meaningHintFr,
      mnemonic: radical.mnemonic,
      customMnemonic: progress?.customMnemonic,
      levelId: radical.levelId,
      stage: progress?.srsStage ?? 0,
      meaningCorrect: progress?.meaningCorrect ?? 0,
      meaningIncorrect: progress?.meaningIncorrect ?? 0,
      nextReviewAt: progress?.nextReviewAt ?? null,
    };
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Group by level
  const groupedByLevel = radicals.reduce((acc, radical) => {
    const levelId = radical.levelId;
    if (!acc[levelId]) {
      acc[levelId] = [];
    }
    acc[levelId].push(radical);
    return acc;
  }, {} as Record<number, Radical[]>);

  return (
    <>
      {Object.entries(groupedByLevel).map(([levelId, levelRadicals]) => (
        <div key={levelId} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Niveau {levelId}
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {levelRadicals.map((radical) => {
              const progress = radical.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <button
                  key={radical.id}
                  onClick={() => handleCardClick(radical)}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-japanese transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-blue-500"
                  }`}
                  title={`${radical.meaningFr} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  {radical.character || (
                    radical.imageUrl ? (
                      <img src={radical.imageUrl} alt="" className="w-8 h-8" />
                    ) : (
                      <span className="text-sm">?</span>
                    )
                  )}
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
