"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TanukiStage,
  TanukiSkin,
  getTanukiStage,
  getNextTanukiStage,
  getProgressToNextStage,
  getTanukiSkinById,
  getTanukiMoodMessage,
  TANUKI_STAGES,
} from "@/lib/tanuki";

interface TanukiPetProps {
  totalXp: number;
  skinId: string;
  tanukiName?: string | null;
  lastStudyDate: Date | null;
  currentStreak: number;
  pendingReviews: number;
  timezone?: string;
}

export default function TanukiPet({
  totalXp,
  skinId,
  tanukiName,
  lastStudyDate,
  currentStreak,
  pendingReviews,
  timezone = "UTC",
}: TanukiPetProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);

  const stage = getTanukiStage(totalXp);
  const nextStage = getNextTanukiStage(totalXp);
  const progress = getProgressToNextStage(totalXp);
  const skin = getTanukiSkinById(skinId) || getTanukiSkinById("classic")!;
  const { mood, message } = getTanukiMoodMessage(stage, lastStudyDate, currentStreak, pendingReviews, timezone);

  // Periodic animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check for evolution (compare with localStorage)
  useEffect(() => {
    const lastStageId = localStorage.getItem("tanuki_stage_id");
    if (lastStageId && parseInt(lastStageId) < stage.id) {
      setShowEvolution(true);
      setTimeout(() => setShowEvolution(false), 3000);
    }
    localStorage.setItem("tanuki_stage_id", stage.id.toString());
  }, [stage.id]);

  const displayName = tanukiName || stage.name;

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl border border-amber-200 p-4 sm:p-6 relative overflow-hidden">
      {/* Section header with explanation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🦝</span>
          <h3 className="text-sm font-semibold text-amber-800">Ton compagnon Tanuki</h3>
        </div>
        <p className="text-xs text-amber-600 hidden sm:block">
          Il evolue avec ton XP et reagit a ta progression
        </p>
      </div>

      {/* Evolution overlay */}
      {showEvolution && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/80 to-yellow-300/80 flex items-center justify-center z-20 animate-pulse">
          <div className="text-center">
            <div className="text-4xl sm:text-5xl mb-2">✨</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-900">Évolution !</div>
            <div className="text-amber-800">{stage.name}</div>
          </div>
        </div>
      )}

      {/* Background decorations */}
      <div className="absolute top-2 right-2 text-3xl sm:text-4xl opacity-10">🍃</div>
      <div className="absolute bottom-2 left-2 text-2xl sm:text-3xl opacity-10">🌸</div>

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Tanuki Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl flex items-center justify-center relative transition-transform duration-300 ${
              isAnimating ? "scale-110" : ""
            } ${mood === "happy" || mood === "excited" ? "animate-bounce" : ""}`}
            style={{
              background: `linear-gradient(135deg, ${skin.colors.primary}33, ${skin.colors.secondary}66)`,
              boxShadow: `0 4px 20px ${skin.colors.primary}40`,
            }}
          >
            {/* Stage-based appearance */}
            {stage.id === 1 ? (
              // Egg
              <div className="relative">
                <div
                  className="text-3xl sm:text-5xl animate-pulse"
                  style={{ filter: `drop-shadow(0 0 10px ${skin.colors.accent})` }}
                >
                  🥚
                </div>
                <div
                  className="absolute inset-0 animate-ping opacity-30"
                  style={{ color: skin.colors.accent }}
                >
                  ✨
                </div>
              </div>
            ) : (
              // Tanuki
              <div className="relative">
                <div
                  className="text-3xl sm:text-5xl"
                  style={{
                    filter: stage.id >= 5 ? `drop-shadow(0 0 8px ${skin.colors.accent})` : undefined,
                  }}
                >
                  🦝
                </div>
                {/* Stage decorations */}
                {stage.id === 3 && (
                  <span className="absolute -top-1 -right-1 text-lg">🍃</span>
                )}
                {stage.id === 4 && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-sm">📚</span>
                )}
                {stage.id === 5 && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">🎐</span>
                )}
                {stage.id === 6 && (
                  <>
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">👘</span>
                    <span className="absolute -bottom-1 -right-1 text-sm">✨</span>
                  </>
                )}
                {/* Mood indicator */}
                {mood === "sleepy" && (
                  <span className="absolute -top-1 -right-1 text-lg">💤</span>
                )}
                {mood === "excited" && (
                  <span className="absolute -top-1 -right-1 text-lg animate-bounce">⭐</span>
                )}
              </div>
            )}
          </div>

          {/* Skin color indicator */}
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white"
            style={{ backgroundColor: skin.colors.primary }}
            title={skin.name}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-amber-900 truncate">{displayName}</h3>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-medium">
              Niv. {stage.id}
            </span>
          </div>

          <p className="text-sm text-amber-700 mb-3">{stage.description}</p>

          {/* Speech bubble */}
          <div className="relative bg-white rounded-xl p-3 shadow-sm border border-amber-100">
            <div className="absolute -left-2 top-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent"></div>
            <p className="text-sm text-stone-700 italic">&ldquo;{message}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* Progress to next stage */}
      {nextStage && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-amber-700 mb-1">
            <span>Prochaine évolution : {nextStage.name}</span>
            <span>{nextStage.xpRequired.toLocaleString()} XP</span>
          </div>
          <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-amber-600 mt-1 text-center">
            {totalXp.toLocaleString()} / {nextStage.xpRequired.toLocaleString()} XP ({progress}%)
          </div>
        </div>
      )}

      {/* Max level celebration */}
      {!nextStage && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            <span>✨</span>
            Niveau maximum atteint !
            <span>✨</span>
          </span>
        </div>
      )}

      {/* Link to rewards for skins */}
      <Link
        href="/rewards"
        className="mt-4 block text-center text-xs text-amber-600 hover:text-amber-800 transition-colors"
      >
        Personnaliser mon Tanuki →
      </Link>
    </div>
  );
}
