"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LessonItem } from "@/types";
import { LessonCard } from "./LessonCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

interface LessonSessionProps {
  lessons: LessonItem[];
  batchSize?: number;
}

type SessionPhase = "learning" | "quiz" | "batch-complete" | "all-complete";

const CORRECT_MESSAGES = [
  "Parfait !",
  "Excellent !",
  "Bravo !",
  "Magnifique !",
  "Superbe !",
  "Incroyable !",
];

const INCORRECT_MESSAGES = [
  "Pas tout a fait...",
  "Presque !",
  "Continue comme ca !",
  "Tu y es presque !",
];

export function LessonSession({ lessons: initialLessons, batchSize = 5 }: LessonSessionProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const [lessons, setLessons] = useState<LessonItem[]>(initialLessons);

  // Batch tracking
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const totalBatches = Math.ceil(lessons.length / batchSize);

  // Current batch items
  const getCurrentBatch = () => {
    const start = currentBatchIndex * batchSize;
    const end = Math.min(start + batchSize, lessons.length);
    return lessons.slice(start, end);
  };

  const [currentBatch, setCurrentBatch] = useState<LessonItem[]>(getCurrentBatch());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>("learning");

  // Quiz state
  const [quizItems, setQuizItems] = useState<LessonItem[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedInBatch, setCompletedInBatch] = useState<Set<number>>(new Set());
  const [allCompletedIds, setAllCompletedIds] = useState<Set<number>>(new Set());

  // UI state
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<"meaning" | "reading" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLesson = currentBatch[currentIndex];
  const currentQuizItem = quizItems[quizIndex];

  // Update current batch when batch index changes
  useEffect(() => {
    const batch = getCurrentBatch();
    setCurrentBatch(batch);
    setCurrentIndex(0);
    setCompletedInBatch(new Set());
  }, [currentBatchIndex]);

  // Handle mnemonic generation
  const handleGenerateMnemonic = async (mnemonicType: "meaning" | "reading", forceRegenerate: boolean = false) => {
    setIsGenerating(true);
    setGeneratingType(mnemonicType);

    try {
      const response = await fetch("/api/mnemonics/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: currentLesson.type,
          id: currentLesson.id,
          mnemonicType,
          forceRegenerate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 402 && data.requiresCredits) {
          addToast("Tu n'as plus de credits IA pour regenerer ce mnemonique. Mais tu peux continuer tes lecons normalement !", "warning");
          return;
        }
        throw new Error(data.error || "Generation failed");
      }

      const { mnemonic, fromCache } = data;

      // Update the lesson in state with the new custom mnemonic
      setLessons((prev) =>
        prev.map((lesson) => {
          if (lesson.type === currentLesson.type && lesson.id === currentLesson.id) {
            if (mnemonicType === "meaning") {
              return { ...lesson, customMnemonic: mnemonic };
            } else {
              return { ...lesson, customReadingMnemonic: mnemonic };
            }
          }
          return lesson;
        })
      );

      // Also update current batch
      setCurrentBatch((prev) =>
        prev.map((lesson) => {
          if (lesson.type === currentLesson.type && lesson.id === currentLesson.id) {
            if (mnemonicType === "meaning") {
              return { ...lesson, customMnemonic: mnemonic };
            } else {
              return { ...lesson, customReadingMnemonic: mnemonic };
            }
          }
          return lesson;
        })
      );

      if (forceRegenerate) {
        addToast("Mnemonique regenere ! (1 credit utilise)", "success");
      } else if (fromCache) {
        addToast("Mnemonique IA applique !", "success");
      } else {
        addToast("Mnemonique cree avec l'IA !", "success");
      }
    } catch (error) {
      console.error("Mnemonic generation error:", error);
      addToast(
        error instanceof Error ? error.message : "Erreur lors de la generation",
        "error"
      );
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
    }
  };

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
    if (currentIndex < currentBatch.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of learning phase for this batch - start quiz
      setQuizItems([...currentBatch].sort(() => Math.random() - 0.5));
      setQuizIndex(0);
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

      // Complete lesson with proper error handling
      if (!completedInBatch.has(currentQuizItem.id)) {
        setCompletedInBatch(new Set([...completedInBatch, currentQuizItem.id]));
        setAllCompletedIds(new Set([...allCompletedIds, currentQuizItem.id]));

        fetch("/api/lessons/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: currentQuizItem.type,
            id: currentQuizItem.id,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to complete lesson");
            }
          })
          .catch((error) => {
            console.error("Error completing lesson:", error);
            addToast("Erreur de sauvegarde. Votre progression sera resynchronisee.", "warning");
          });
      }
    } else {
      setResultMessage(INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)]);
    }
  };

  // Auto-advance after showing result
  useEffect(() => {
    if (!showResult) return;

    const delay = isCorrect ? 3000 : 4000;
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
    } else if (completedInBatch.size === currentBatch.length) {
      // All items in this batch completed
      if (currentBatchIndex < totalBatches - 1) {
        // More batches to go
        setPhase("batch-complete");
      } else {
        // All batches done
        setPhase("all-complete");
      }
    } else {
      // Some items still need to be retried
      const remaining = quizItems.filter(
        (item) => !completedInBatch.has(item.id)
      );
      if (remaining.length > 0) {
        setQuizItems(remaining.sort(() => Math.random() - 0.5));
        setQuizIndex(0);
      } else {
        if (currentBatchIndex < totalBatches - 1) {
          setPhase("batch-complete");
        } else {
          setPhase("all-complete");
        }
      }
    }
  };

  const startNextBatch = () => {
    setCurrentBatchIndex(currentBatchIndex + 1);
    setPhase("learning");
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

  // Batch complete screen
  if (phase === "batch-complete") {
    const batchXp = currentBatch.length * 10;
    const remainingItems = lessons.length - (currentBatchIndex + 1) * batchSize;
    const nextBatchSize = Math.min(batchSize, remainingItems);

    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
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
                  {["✨", "🌟", "⭐"][Math.floor(Math.random() * 3)]}
                </span>
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="text-7xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold font-display text-stone-900 mb-2">
              Lot {currentBatchIndex + 1} termine !
            </h2>
            <p className="text-stone-600 mb-4">
              {currentBatch.length} element{currentBatch.length > 1 ? "s" : ""} appris
            </p>

            {/* XP earned card */}
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-4 mb-4 text-white shadow-lg">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="text-2xl font-bold font-display">+{batchXp} XP</span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="bg-stone-100 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm text-stone-600 mb-2">
                <span>Progression totale</span>
                <span className="font-medium">{allCompletedIds.size}/{lessons.length}</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(allCompletedIds.size / lessons.length) * 100}%` }}
                />
              </div>
              <p className="text-stone-500 text-sm mt-2">
                Encore {remainingItems} element{remainingItems > 1 ? "s" : ""} a apprendre
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={startNextBatch} className="w-full">
                Continuer ({nextBatchSize} suivants)
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.push("/dashboard")}
                className="w-full"
              >
                Pause - Retour au tableau de bord
              </Button>
            </div>

            <p className="text-stone-400 text-xs mt-4">
              Ces elements apparaitront dans tes revisions dans 4 heures.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // All complete screen
  if (phase === "all-complete") {
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
              Felicitations !
            </h2>
            <p className="text-stone-600 mb-6">
              Tu as complete {lessons.length} lecon{lessons.length > 1 ? "s" : ""} !
            </p>

            {/* XP earned card */}
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">⚡</span>
                <span className="text-4xl font-bold font-display">+{totalXp} XP</span>
              </div>
              <p className="text-emerald-100 text-sm mt-2">Ajoutes a ton score !</p>
            </div>

            <p className="text-stone-500 text-sm mb-6">
              Ces elements apparaitront dans tes revisions dans 4 heures.
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
                Continuer les lecons
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
          {/* Batch indicator */}
          <div className="text-center mb-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
              Lot {currentBatchIndex + 1}/{totalBatches}
            </span>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Quiz</span>
              <span className="font-medium">
                {completedInBatch.size}/{currentBatch.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(completedInBatch.size / currentBatch.length) * 100}%`,
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
                      placeholder="Ta reponse..."
                      autoFocus
                      className="text-center text-lg"
                    />
                    <Button
                      onClick={checkAnswer}
                      disabled={!answer.trim()}
                      className="w-full"
                    >
                      Verifier
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
                        <p className="text-stone-600 text-sm mb-1">La bonne reponse :</p>
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

  // Learning phase
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Batch indicator */}
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Lot {currentBatchIndex + 1}/{totalBatches}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Apprentissage</span>
            <span>
              {currentIndex + 1}/{currentBatch.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all"
              style={{
                width: `${((currentIndex + 1) / currentBatch.length) * 100}%`,
              }}
            />
          </div>
          {/* Overall progress */}
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Total: {currentBatchIndex * batchSize + currentIndex + 1}/{lessons.length}</span>
          </div>
        </div>

        {/* Lesson Card */}
        <LessonCard
          item={currentLesson}
          onGenerateMnemonic={handleGenerateMnemonic}
          isGenerating={isGenerating}
          generatingType={generatingType}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Precedent
          </Button>
          <Button onClick={handleNext}>
            {currentIndex === currentBatch.length - 1 ? "Quiz" : "Suivant"}
          </Button>
        </div>
      </div>
    </div>
  );
}
