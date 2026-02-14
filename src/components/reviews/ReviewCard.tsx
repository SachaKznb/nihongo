"use client";

import { ReviewItem } from "@/types";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";

interface ReviewCardProps {
  item: ReviewItem;
  reviewType: "meaning" | "reading" | "grammar";
}

export function ReviewCard({ item, reviewType }: ReviewCardProps) {
  const typeColors = {
    radical: "bg-blue-500",
    kanji: "bg-pink-500",
    vocabulary: "bg-purple-500",
    grammar: "bg-teal-500",
  };

  const typeLabels = {
    radical: "Radical",
    kanji: "Kanji",
    vocabulary: "Vocabulaire",
    grammar: "Grammaire",
  };

  // For grammar reviews, pick a random example sentence to use as fill-in-the-blank
  const grammarSentence = item.type === "grammar" && item.exampleSentences && item.exampleSentences.length > 0
    ? item.exampleSentences[0]
    : null;

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
        {item.type === "grammar" ? (
          // Grammar: Show the sentence with a blank or the grammar point
          <div className="space-y-4">
            <span className="text-6xl font-japanese text-teal-600">{item.character}</span>
            {grammarSentence && (
              <div className="mt-6 px-4">
                <p className="text-sm text-gray-500 mb-2">Completez avec le point de grammaire correct :</p>
                <p className="text-lg font-japanese text-stone-700">{grammarSentence.french}</p>
              </div>
            )}
          </div>
        ) : item.character ? (
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
          {item.type === "grammar"
            ? "Quel point de grammaire complete cette phrase ?"
            : reviewType === "meaning"
              ? "Quelle est la signification ?"
              : "Quelle est la lecture ?"}
        </p>
      </div>
    </div>
  );
}
