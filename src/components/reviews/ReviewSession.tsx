"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ReviewItem, ReviewSummary } from "@/types";
import { ReviewCard } from "./ReviewCard";
import { ReviewInput } from "./ReviewInput";
import { Button } from "@/components/ui/Button";
import { SRS_STAGE_NAMES } from "@/lib/srs";
import { playReading } from "@/lib/audio";

interface ReviewSessionProps {
  reviews: ReviewItem[];
}

// Track the state of each item being reviewed
interface ItemReviewState {
  item: ReviewItem;
  meaningAnswered: boolean;
  meaningCorrect: boolean | null;
  readingAnswered: boolean;
  readingCorrect: boolean | null;
  srsUpdated: boolean;
  newStage: number | null;
}

// What we're currently asking
interface CurrentQuestion {
  item: ReviewItem;
  reviewType: "meaning" | "reading";
}

export function ReviewSession({ reviews }: ReviewSessionProps) {
  const router = useRouter();

  // Track state for each unique item
  const [itemStates, setItemStates] = useState<Map<string, ItemReviewState>>(
    new Map()
  );

  // Question queue
  const [questionQueue, setQuestionQueue] = useState<CurrentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // UI state
  const [showResult, setShowResult] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [lastExpectedAnswers, setLastExpectedAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Summary data
  const [summary, setSummary] = useState<ReviewSummary | null>(null);

  // Stats during session
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });

  // Ref to track if item SRS was just updated (for showing stage change)
  const lastSrsUpdate = useRef<{
    from: number;
    to: number;
    itemKey: string;
  } | null>(null);

  // Initialize states and question queue
  useEffect(() => {
    const states = new Map<string, ItemReviewState>();
    const questions: CurrentQuestion[] = [];

    for (const item of reviews) {
      const key = `${item.type}-${item.id}`;

      // Initialize state for this item
      const hasReading = item.type === "kanji" || item.type === "vocabulary";
      states.set(key, {
        item,
        meaningAnswered: false,
        meaningCorrect: null,
        readingAnswered: !hasReading, // If no reading, mark as already answered
        readingCorrect: hasReading ? null : true,
        srsUpdated: false,
        newStage: null,
      });

      // Add meaning question
      questions.push({ item, reviewType: "meaning" });

      // Add reading question for kanji/vocab
      if (hasReading) {
        questions.push({ item, reviewType: "reading" });
      }
    }

    // Shuffle questions
    setQuestionQueue(questions.sort(() => Math.random() - 0.5));
    setItemStates(states);
  }, [reviews]);

  const currentQuestion = questionQueue[currentQuestionIndex];

  // Check if item is fully answered and update SRS
  const checkAndUpdateSrs = useCallback(
    async (itemKey: string, state: ItemReviewState) => {
      if (state.srsUpdated) return;
      if (!state.meaningAnswered) return;
      if (state.item.type !== "radical" && !state.readingAnswered) return;

      // Both parts answered (or just meaning for radicals)
      const allCorrect =
        state.meaningCorrect === true &&
        (state.item.type === "radical" || state.readingCorrect === true);

      try {
        const response = await fetch("/api/reviews/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: state.item.type,
            id: state.item.id,
            allCorrect,
          }),
        });

        const result = await response.json();

        // Update state with new SRS stage
        setItemStates((prev) => {
          const newStates = new Map(prev);
          const itemState = newStates.get(itemKey);
          if (itemState) {
            newStates.set(itemKey, {
              ...itemState,
              srsUpdated: true,
              newStage: result.newStage,
            });
          }
          return newStates;
        });

        // Store last SRS update for display
        lastSrsUpdate.current = {
          from: state.item.currentStage,
          to: result.newStage,
          itemKey,
        };
      } catch (error) {
        console.error("Error updating SRS:", error);
      }
    },
    []
  );

  const handleSubmit = async (answer: string) => {
    if (!currentQuestion || showResult) return;

    const itemKey = `${currentQuestion.item.type}-${currentQuestion.item.id}`;
    const state = itemStates.get(itemKey);
    if (!state) return;

    try {
      // Check the answer
      const response = await fetch("/api/reviews/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: currentQuestion.item.type,
          id: currentQuestion.item.id,
          reviewType: currentQuestion.reviewType,
          answer,
        }),
      });

      const result = await response.json();
      const correct = result.correct;

      setLastCorrect(correct);
      setLastExpectedAnswers(result.expectedAnswers);
      setShowResult(true);

      // Update stats
      if (correct) {
        setStats((s) => ({ ...s, correct: s.correct + 1 }));

        // Play audio for correct reading answers
        if (
          currentQuestion.reviewType === "reading" &&
          currentQuestion.item.readings
        ) {
          playReading(currentQuestion.item.readings[0]);
        }
      } else {
        setStats((s) => ({ ...s, incorrect: s.incorrect + 1 }));
      }

      // Update item state
      const newState = { ...state };
      if (currentQuestion.reviewType === "meaning") {
        newState.meaningAnswered = true;
        newState.meaningCorrect = correct;
      } else {
        newState.readingAnswered = true;
        newState.readingCorrect = correct;
      }

      setItemStates((prev) => {
        const newStates = new Map(prev);
        newStates.set(itemKey, newState);
        return newStates;
      });

      // Check if we should update SRS
      checkAndUpdateSrs(itemKey, newState);
    } catch (error) {
      console.error("Error checking answer:", error);
    }
  };

  const handleNext = useCallback(() => {
    setShowResult(false);
    setLastCorrect(null);
    setLastExpectedAnswers([]);
    lastSrsUpdate.current = null;

    // Find next unanswered question
    const findNextQuestion = () => {
      for (let i = currentQuestionIndex + 1; i < questionQueue.length; i++) {
        const q = questionQueue[i];
        const key = `${q.item.type}-${q.item.id}`;
        const state = itemStates.get(key);

        if (q.reviewType === "meaning" && !state?.meaningAnswered) {
          return i;
        }
        if (
          q.reviewType === "reading" &&
          !state?.readingAnswered &&
          state?.item.type !== "radical"
        ) {
          return i;
        }
      }

      // Wrap around to beginning
      for (let i = 0; i < currentQuestionIndex; i++) {
        const q = questionQueue[i];
        const key = `${q.item.type}-${q.item.id}`;
        const state = itemStates.get(key);

        if (q.reviewType === "meaning" && !state?.meaningAnswered) {
          return i;
        }
        if (
          q.reviewType === "reading" &&
          !state?.readingAnswered &&
          state?.item.type !== "radical"
        ) {
          return i;
        }
      }

      return -1; // All done
    };

    const nextIndex = findNextQuestion();

    if (nextIndex === -1) {
      // Calculate summary
      const stageChanges: ReviewSummary["stageChanges"] = [];
      let correctItems = 0;
      let incorrectItems = 0;

      itemStates.forEach((state) => {
        const allCorrect =
          state.meaningCorrect === true &&
          (state.item.type === "radical" || state.readingCorrect === true);

        if (allCorrect) {
          correctItems++;
        } else {
          incorrectItems++;
        }

        if (state.srsUpdated && state.newStage !== null) {
          stageChanges.push({
            type: state.item.type,
            character: state.item.character,
            from: state.item.currentStage,
            to: state.newStage,
          });
        }
      });

      const totalItems = correctItems + incorrectItems;
      const accuracy =
        totalItems > 0 ? Math.round((correctItems / totalItems) * 100) : 0;
      const xpEarned = correctItems * 5 + incorrectItems * 1;

      setSummary({
        totalItems,
        correctItems,
        incorrectItems,
        accuracy,
        xpEarned,
        stageChanges,
      });
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  }, [questionQueue, currentQuestionIndex, itemStates]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showResult && e.key === "Enter") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showResult, handleNext]);

  if (questionQueue.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Chargement des révisions...</p>
        </div>
      </div>
    );
  }

  // Show summary at the end
  if (isComplete && summary) {
    const stagesUp = summary.stageChanges.filter((s) => s.to > s.from);
    const stagesDown = summary.stageChanges.filter((s) => s.to < s.from);

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-lg w-full">
          <div className="text-7xl mb-6">
            {summary.accuracy >= 80 ? "🎉" : summary.accuracy >= 50 ? "👍" : "💪"}
          </div>

          <h2 className="text-3xl font-bold font-display text-stone-900 mb-2">
            Session terminée !
          </h2>

          <p className="text-stone-500 mb-8">
            {summary.accuracy >= 80
              ? "Excellent travail !"
              : summary.accuracy >= 50
              ? "Bon effort, continuez !"
              : "La pratique mène à la perfection !"}
          </p>

          {/* Main stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-emerald-50 rounded-2xl">
              <p className="text-3xl font-bold text-emerald-600">
                {summary.correctItems}
              </p>
              <p className="text-sm text-stone-600">Correct</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-2xl">
              <p className="text-3xl font-bold text-rose-600">
                {summary.incorrectItems}
              </p>
              <p className="text-sm text-stone-600">Incorrect</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl">
              <p className="text-3xl font-bold text-blue-600">
                {summary.accuracy}%
              </p>
              <p className="text-sm text-stone-600">Précision</p>
            </div>
          </div>

          {/* XP earned */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-50 border border-amber-200 rounded-full">
              <span className="text-xl">⚡</span>
              <span className="text-amber-700 font-semibold text-lg">
                +{summary.xpEarned} XP gagné
              </span>
            </div>
          </div>

          {/* Stage changes summary */}
          {(stagesUp.length > 0 || stagesDown.length > 0) && (
            <div className="mb-8 text-left">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
                Changements de niveau
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {stagesUp.slice(0, 5).map((change, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-emerald-50 rounded-lg"
                  >
                    <span className="font-japanese text-lg">
                      {change.character}
                    </span>
                    <span className="text-sm text-emerald-700">
                      {SRS_STAGE_NAMES[change.from]} → {SRS_STAGE_NAMES[change.to]}{" "}
                      ↑
                    </span>
                  </div>
                ))}
                {stagesDown.slice(0, 5).map((change, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-rose-50 rounded-lg"
                  >
                    <span className="font-japanese text-lg">
                      {change.character}
                    </span>
                    <span className="text-sm text-rose-700">
                      {SRS_STAGE_NAMES[change.from]} → {SRS_STAGE_NAMES[change.to]}{" "}
                      ↓
                    </span>
                  </div>
                ))}
                {stagesUp.length + stagesDown.length > 10 && (
                  <p className="text-sm text-stone-400 text-center">
                    ... et {stagesUp.length + stagesDown.length - 10} autres
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full py-4"
            >
              Retour au tableau de bord
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
              className="w-full py-4"
            >
              Plus de révisions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Count progress
  const answeredCount = Array.from(itemStates.values()).filter(
    (s) =>
      s.meaningAnswered &&
      (s.item.type === "radical" || s.readingAnswered)
  ).length;
  const totalItems = itemStates.size;

  // Get current item state for showing partial progress
  const currentItemKey = currentQuestion
    ? `${currentQuestion.item.type}-${currentQuestion.item.id}`
    : null;
  const currentItemState = currentItemKey
    ? itemStates.get(currentItemKey)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-600 mb-2">
            <span>
              ✓ {stats.correct} | ✗ {stats.incorrect}
            </span>
            <span>
              {answeredCount}/{totalItems} éléments
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Show if this item has partial answers */}
        {currentItemState &&
          (currentItemState.meaningAnswered ||
            currentItemState.readingAnswered) && (
            <div className="mb-4 flex justify-center gap-2">
              {currentItemState.meaningAnswered && (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentItemState.meaningCorrect
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  Sens {currentItemState.meaningCorrect ? "✓" : "✗"}
                </span>
              )}
              {currentQuestion?.item.type !== "radical" &&
                currentItemState.readingAnswered && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentItemState.readingCorrect
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    Lecture {currentItemState.readingCorrect ? "✓" : "✗"}
                  </span>
                )}
            </div>
          )}

        {/* Review Card */}
        {currentQuestion && (
          <ReviewCard
            item={currentQuestion.item}
            reviewType={currentQuestion.reviewType}
          />
        )}

        {/* Input or Result */}
        <div className="mt-6">
          {!showResult ? (
            <ReviewInput
              reviewType={currentQuestion?.reviewType || "meaning"}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="space-y-4">
              <div
                className={`p-5 rounded-2xl ${
                  lastCorrect
                    ? "bg-emerald-100 border border-emerald-200"
                    : "bg-rose-100 border border-rose-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={`font-semibold text-lg ${
                        lastCorrect ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {lastCorrect ? "Correct ! ✓" : "Incorrect ✗"}
                    </p>
                    {!lastCorrect && (
                      <p className="text-stone-700 mt-1">
                        Réponse attendue : {lastExpectedAnswers.join(", ")}
                      </p>
                    )}
                  </div>
                  {/* Show SRS change if this was the final answer for the item */}
                  {lastSrsUpdate.current &&
                    lastSrsUpdate.current.itemKey === currentItemKey && (
                      <div className="text-right text-sm">
                        <p
                          className={
                            lastSrsUpdate.current.to > lastSrsUpdate.current.from
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }
                        >
                          {SRS_STAGE_NAMES[lastSrsUpdate.current.from]} →{" "}
                          {SRS_STAGE_NAMES[lastSrsUpdate.current.to]}
                        </p>
                      </div>
                    )}
                </div>
              </div>
              <Button onClick={handleNext} className="w-full py-4">
                Continuer (Entrée)
              </Button>
            </div>
          )}
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-6 text-center text-sm text-stone-400">
          Appuyez sur Entrée pour soumettre
        </div>
      </div>
    </div>
  );
}
