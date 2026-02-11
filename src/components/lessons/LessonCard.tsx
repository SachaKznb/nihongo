"use client";

import { LessonItem } from "@/types";
import { playReading } from "@/lib/audio";

interface LessonCardProps {
  item: LessonItem;
  showMnemonic?: boolean;
  autoplayAudio?: boolean;
}

export function LessonCard({
  item,
  showMnemonic = true,
  autoplayAudio = true,
}: LessonCardProps) {
  const handlePlayAudio = () => {
    if (item.readings && item.readings.length > 0) {
      playReading(item.readings[0]);
    } else if (item.readingsOn && item.readingsOn.length > 0) {
      playReading(item.readingsOn[0]);
    } else if (item.readingsKun && item.readingsKun.length > 0) {
      playReading(item.readingsKun[0]);
    }
  };

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
      {/* Header with type */}
      <div className={`${typeColors[item.type]} py-2 px-4`}>
        <span className="text-white text-sm font-medium">
          {typeLabels[item.type]}
        </span>
      </div>

      {/* Character display */}
      <div className="py-12 px-4 text-center bg-gray-50">
        {item.character ? (
          <span className="text-8xl font-japanese">{item.character}</span>
        ) : item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt="Radical"
            className="w-24 h-24 mx-auto"
          />
        ) : (
          <span className="text-6xl text-gray-400">?</span>
        )}
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {/* Meanings */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
            Signification
          </h4>
          <p className="text-xl font-semibold text-gray-900">
            {item.meaningsFr.join(", ")}
          </p>
        </div>

        {/* Readings for kanji and vocabulary */}
        {(item.readingsOn || item.readingsKun || item.readings) && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              Lecture(s)
            </h4>
            <div className="flex flex-wrap gap-2 items-center">
              {item.readingsOn && item.readingsOn.length > 0 && (
                <div>
                  <span className="text-xs text-gray-400">On&apos;yomi: </span>
                  <span className="text-lg font-japanese">
                    {item.readingsOn.join(", ")}
                  </span>
                </div>
              )}
              {item.readingsKun && item.readingsKun.length > 0 && (
                <div>
                  <span className="text-xs text-gray-400">Kun&apos;yomi: </span>
                  <span className="text-lg font-japanese">
                    {item.readingsKun.join(", ")}
                  </span>
                </div>
              )}
              {item.readings && (
                <span className="text-lg font-japanese">
                  {item.readings.join(", ")}
                </span>
              )}
              <button
                onClick={handlePlayAudio}
                className="ml-2 p-2 text-gray-500 hover:text-pink-500 transition-colors"
                aria-label="Ecouter la prononciation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Mnemonic */}
        {showMnemonic && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              Mnemonique
            </h4>
            <p className="text-gray-700 leading-relaxed">{item.mnemonic}</p>
          </div>
        )}

        {/* Reading mnemonic for kanji */}
        {showMnemonic && item.readingMnemonic && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              Mnemonique de lecture
            </h4>
            <p className="text-gray-700 leading-relaxed">
              {item.readingMnemonic}
            </p>
          </div>
        )}

        {/* Example sentence for vocabulary */}
        {item.sentence && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Exemple
            </h4>
            <p className="text-lg font-japanese mb-1">{item.sentence.jp}</p>
            <p className="text-gray-600">{item.sentence.fr}</p>
          </div>
        )}
      </div>
    </div>
  );
}
