"use client";

import { ReviewItem } from "@/types";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";

interface ReviewCardProps {
  item: ReviewItem;
  reviewType: "meaning" | "reading";
}

export function ReviewCard({ item, reviewType }: ReviewCardProps) {
  const typeColors = {
    radical: "bg-blue-500",
    kanji: "bg-pink-500",
    vocabulary: "bg-purple-500",
  };

  const typeLabels = {
    radical: "Radical",
    kanji: "Kanji",
    vocabulary: "Vocabulaire",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`${typeColors[item.type]} py-2 px-4 flex justify-between items-center`}>
        <span className="text-white text-sm font-medium">
          {typeLabels[item.type]}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${SRS_STAGE_COLORS[item.currentStage]} text-white`}>
          {SRS_STAGE_NAMES[item.currentStage]}
        </span>
      </div>

      {/* Character display */}
      <div className="py-16 px-4 text-center bg-gray-50">
        {item.character ? (
          <span className="text-9xl font-japanese">{item.character}</span>
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt="Radical"
            className="w-32 h-32 mx-auto"
          />
        ) : (
          <span className="text-8xl text-gray-400">?</span>
        )}
      </div>

      {/* Question */}
      <div className="p-6 text-center border-t border-gray-100">
        <p className="text-gray-600">
          {reviewType === "meaning"
            ? "Quelle est la signification ?"
            : "Quelle est la lecture ?"}
        </p>
      </div>
    </div>
  );
}
