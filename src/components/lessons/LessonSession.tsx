"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LessonItem } from "@/types";
import { LessonCard } from "./LessonCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface LessonSessionProps {
  lessons: LessonItem[];
}

type SessionPhase = "learning" | "quiz" | "complete";

const CORRECT_MESSAGES = [
  "Parfait !",
  "Excellent !",
  "Bravo !",
  "Magnifique !",
  "Superbe !",
  "Incroyable !",
];

const INCORRECT_MESSAGES = [
  "Pas tout à fait...",
  "Presque !",
  "Continue comme ça !",
  "Tu y es presque !",
];

export function LessonSession({ lessons }: LessonSessionProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>("learning");
  const [quizItems, setQuizItems] = useState<LessonItem[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLesson = lessons[currentIndex];
  const currentQuizItem = quizItems[quizIndex];

  // Normalize text by removing accents and special characters
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "");
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizItems([...lessons].sort(() => Math.random() - 0.5));
      setPhase("quiz");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const checkAnswer = () => {
    const normalizedAnswer = normalizeText(answer);
    const isAnswerCorrect = currentQuizItem.meaningsFr.some((m) => {
      const normalizedMeaning = normalizeText(m);
      return (
        normalizedAnswer === normalizedMeaning ||
        normalizedAnswer.includes(normalizedMeaning)
      );
    });

    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    if (isAnswerCorrect) {
      setResultMessage(CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]);
      setShowXpAnimation(true);
      setEarnedXp(10);

      // Fire and forget - don't await
      if (!completedLessons.has(currentQuizItem.id)) {
        fetch("/api/lessons/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: currentQuizItem.type,
            id: currentQuizItem.id,
          }),
        }).catch(console.error);
        setCompletedLessons(new Set([...completedLessons, currentQuizItem.id]));
      }
    } else {
      setResultMessage(INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)]);
    }
  };

  // Auto-advance after showing result
  useEffect(() => {
    if (!showResult) return;

    const delay = isCorrect ? 3000 : 4000; // 3s for correct, 4s for incorrect to read
    const timer = setTimeout(() => {
      advanceToNext();
    }, delay);

    return () => clearTimeout(timer);
  }, [showResult, isCorrect]);

  const advanceToNext = () => {
    setAnswer("");
    setShowResult(false);
    setShowXpAnimation(false);

    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else if (completedLessons.size === lessons.length) {
      setPhase("complete");
    } else {
      const remaining = quizItems.filter(
        (item) => !completedLessons.has(item.id)
      );
      if (remaining.length > 0) {
        setQuizItems(remaining.sort(() => Math.random() - 0.5));
        setQuizIndex(0);
      } else {
        setPhase("complete");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showResult && answer.trim()) {
      checkAnswer();
    }
  };

  // Focus input when quiz phase starts or after advancing
  useEffect(() => {
    if (phase === "quiz" && !showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, quizIndex, showResult]);

  if (phase === "complete") {
    const totalXp = lessons.length * 10;
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md relative overflow-hidden">
          {/* Celebration background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float-up"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                <span className="text-2xl opacity-60">
                  {["✨", "🌟", "⭐", "💫"][Math.floor(Math.random() * 4)]}
                </span>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold font-display text-stone-900 mb-2">
              Félicitations !
            </h2>
            <p className="text-stone-600 mb-6">
              Tu as complété {lessons.length} leçon{lessons.length > 1 ? "s" : ""} !
            </p>

            {/* XP earned card */}
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">⚡</span>
                <span className="text-4xl font-bold font-display">+{totalXp} XP</span>
              </div>
              <p className="text-emerald-100 text-sm mt-2">Ajoutés à ton score !</p>
            </div>

            <p className="text-stone-500 text-sm mb-6">
              Ces éléments apparaîtront dans tes révisions dans 4 heures.
            </p>

            <div className="space-y-3">
              <Button onClick={() => router.push("/dashboard")} className="w-full">
                Retour au tableau de bord
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/lessons")}
                className="w-full"
              >
                Continuer les leçons
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Quiz</span>
              <span className="font-medium">
                {completedLessons.size}/{lessons.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(completedLessons.size / lessons.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
            {/* XP Animation Overlay */}
            {showXpAnimation && (
              <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                <div className="animate-xp-float text-center">
                  <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <span className="text-xl font-bold">+{earnedXp} XP</span>
                  </div>
                </div>
                {/* Sparkles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-sparkle"
                    style={{
                      top: "40%",
                      left: "50%",
                      transform: `rotate(${i * 45}deg) translateY(-60px)`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  >
                    <span className="text-yellow-400 text-xl">✦</span>
                  </div>
                ))}
              </div>
            )}

            {/* Character display */}
            <div className={`py-12 px-4 text-center transition-colors duration-300 ${
              showResult
                ? isCorrect
                  ? "bg-gradient-to-b from-emerald-50 to-emerald-100"
                  : "bg-gradient-to-b from-amber-50 to-orange-50"
                : "bg-gray-50"
            }`}>
              {currentQuizItem.character ? (
                <span className={`text-8xl font-japanese transition-transform duration-300 inline-block ${
                  showResult && isCorrect ? "scale-110" : ""
                }`}>
                  {currentQuizItem.character}
                </span>
              ) : currentQuizItem.imageUrl ? (
                <img
                  src={currentQuizItem.imageUrl}
                  alt="Radical"
                  className="w-24 h-24 mx-auto"
                />
              ) : (
                <span className="text-6xl text-gray-400">?</span>
              )}
            </div>

            <div className="p-6">
              {!showResult ? (
                <>
                  <p className="text-center text-gray-600 mb-4">
                    Quelle est la signification ?
                  </p>
                  <div className="space-y-4">
                    <Input
                      ref={inputRef}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ta réponse..."
                      autoFocus
                      className="text-center text-lg"
                    />
                    <Button
                      onClick={checkAnswer}
                      disabled={!answer.trim()}
                      className="w-full"
                    >
                      Vérifier
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  {isCorrect ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-4xl animate-bounce">🎯</span>
                        <h3 className="text-2xl font-bold text-emerald-600">{resultMessage}</h3>
                      </div>
                      <p className="text-emerald-700 font-medium text-lg">
                        {currentQuizItem.meaningsFr[0]}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">💪</span>
                        <h3 className="text-xl font-semibold text-amber-700">{resultMessage}</h3>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-4">
                        <p className="text-stone-600 text-sm mb-1">La bonne réponse :</p>
                        <p className="text-stone-900 font-bold text-lg">
                          {currentQuizItem.meaningsFr.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Apprentissage</span>
            <span>
              {currentIndex + 1}/{lessons.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / lessons.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Lesson Card */}
        <LessonCard item={currentLesson} />

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Précédent
          </Button>
          <Button onClick={handleNext}>
            {currentIndex === lessons.length - 1 ? "Quiz" : "Suivant"}
          </Button>
        </div>
      </div>
    </div>
  );
}
