"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ReviewItem, AnswerResult } from "@/types";
import { ReviewCard } from "./ReviewCard";
import { ReviewInput } from "./ReviewInput";
import { Button } from "@/components/ui/Button";
import { SRS_STAGE_NAMES } from "@/lib/srs";
import { playReading } from "@/lib/audio";

interface ReviewSessionProps {
  reviews: ReviewItem[];
}

interface ReviewQueueItem {
  item: ReviewItem;
  reviewType: "meaning" | "reading";
  completed: boolean;
}

export function ReviewSession({ reviews }: ReviewSessionProps) {
  const router = useRouter();
  const [queue, setQueue] = useState<ReviewQueueItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<AnswerResult | null>(null);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [isComplete, setIsComplete] = useState(false);

  // Initialize queue with both meaning and reading reviews
  useEffect(() => {
    const initialQueue: ReviewQueueItem[] = [];

    for (const item of reviews) {
      // All items have meaning review
      initialQueue.push({ item, reviewType: "meaning", completed: false });

      // Kanji and vocabulary also have reading review
      if (item.type === "kanji" || item.type === "vocabulary") {
        initialQueue.push({ item, reviewType: "reading", completed: false });
      }
    }

    // Shuffle the queue
    setQueue(initialQueue.sort(() => Math.random() - 0.5));
  }, [reviews]);

  const currentReview = queue[currentIndex];

  const handleSubmit = async (answer: string) => {
    if (!currentReview || showResult) return;

    try {
      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: currentReview.item.type,
          id: currentReview.item.id,
          reviewType: currentReview.reviewType,
          answer,
        }),
      });

      const result: AnswerResult = await response.json();
      setLastResult(result);
      setShowResult(true);

      // Update stats
      if (result.correct) {
        setStats((s) => ({ ...s, correct: s.correct + 1 }));

        // Play audio for correct reading answers
        if (currentReview.reviewType === "reading" && currentReview.item.readings) {
          playReading(currentReview.item.readings[0]);
        }
      } else {
        setStats((s) => ({ ...s, incorrect: s.incorrect + 1 }));
      }

      // Mark as completed
      setQueue((q) =>
        q.map((item, i) =>
          i === currentIndex ? { ...item, completed: result.correct } : item
        )
      );
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleNext = useCallback(() => {
    setShowResult(false);
    setLastResult(null);

    // Find next incomplete review
    const remainingReviews = queue.filter((_, i) => i > currentIndex && !queue[i].completed);
    const incompleteReviews = queue.filter((q) => !q.completed);

    if (remainingReviews.length > 0) {
      // Move to next in queue
      const nextIndex = queue.findIndex(
        (q, i) => i > currentIndex && !q.completed
      );
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex);
      }
    } else if (incompleteReviews.length > 0) {
      // Wrap around to beginning for incomplete items
      const nextIndex = queue.findIndex((q) => !q.completed);
      if (nextIndex !== -1) {
        setCurrentIndex(nextIndex);
      }
    } else {
      // All complete
      setIsComplete(true);
    }
  }, [queue, currentIndex]);

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

  if (queue.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Chargement des revisions...</p>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const accuracy =
      stats.correct + stats.incorrect > 0
        ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100)
        : 0;

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="text-6xl mb-4">&#127881;</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Session terminée !
          </h2>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{stats.incorrect}</p>
              <p className="text-sm text-gray-600">Incorrect</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{accuracy}%</p>
              <p className="text-sm text-gray-600">Précision</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              Retour au tableau de bord
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/reviews")}
              className="w-full"
            >
              Plus de revisions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const completedCount = queue.filter((q) => q.completed).length;
  const totalCount = queue.length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Correct: {stats.correct} | Incorrect: {stats.incorrect}
            </span>
            <span>
              {completedCount}/{totalCount}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Review Card */}
        <ReviewCard item={currentReview.item} reviewType={currentReview.reviewType} />

        {/* Input or Result */}
        <div className="mt-6">
          {!showResult ? (
            <ReviewInput
              reviewType={currentReview.reviewType}
              onSubmit={handleSubmit}
            />
          ) : (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  lastResult?.correct ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p
                      className={`font-semibold ${
                        lastResult?.correct ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {lastResult?.correct ? "Correct !" : "Incorrect"}
                    </p>
                    {!lastResult?.correct && (
                      <p className="text-gray-700 mt-1">
                        Reponse attendue : {lastResult?.expectedAnswers.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-500">
                      {SRS_STAGE_NAMES[lastResult?.srsStageFrom || 0]} →{" "}
                      {SRS_STAGE_NAMES[lastResult?.srsStageTo || 0]}
                    </p>
                  </div>
                </div>
              </div>
              <Button onClick={handleNext} className="w-full">
                Continuer (Entree)
              </Button>
            </div>
          )}
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Appuyez sur Entree pour soumettre votre reponse
        </div>
      </div>
    </div>
  );
}
