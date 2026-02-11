"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LessonItem } from "@/types";
import { LessonCard } from "./LessonCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface LessonSessionProps {
  lessons: LessonItem[];
}

type SessionPhase = "learning" | "quiz" | "complete";

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

  const currentLesson = lessons[currentIndex];
  const currentQuizItem = quizItems[quizIndex];

  // Normalize text by removing accents and special characters
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9\s]/g, ""); // Remove special chars
  };

  const handleNext = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Move to quiz phase
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
  };

  const handleQuizNext = async () => {
    if (isCorrect && !completedLessons.has(currentQuizItem.id)) {
      // Mark lesson as completed via API
      try {
        await fetch("/api/lessons/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: currentQuizItem.type,
            id: currentQuizItem.id,
          }),
        });
        setCompletedLessons(new Set([...completedLessons, currentQuizItem.id]));
      } catch (error) {
        console.error("Error completing lesson:", error);
      }
    }

    setAnswer("");
    setShowResult(false);

    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else if (completedLessons.size + (isCorrect ? 1 : 0) === lessons.length) {
      setPhase("complete");
    } else {
      // Reshuffle and retry items that weren't completed
      const remaining = quizItems.filter(
        (item) => !completedLessons.has(item.id) && item.id !== currentQuizItem.id
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
    if (e.key === "Enter") {
      if (showResult) {
        handleQuizNext();
      } else if (answer.trim()) {
        checkAnswer();
      }
    }
  };

  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <div className="text-6xl mb-4">&#127881;</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Felicitations !
          </h2>
          <p className="text-gray-600 mb-6">
            Vous avez complete {lessons.length} lecon{lessons.length > 1 ? "s" : ""} !
            Ces elements apparaitront dans vos revisions dans 4 heures.
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
              <span>
                {completedLessons.size}/{lessons.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${(completedLessons.size / lessons.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="py-12 px-4 text-center bg-gray-50">
              {currentQuizItem.character ? (
                <span className="text-8xl font-japanese">
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
              <p className="text-center text-gray-600 mb-4">
                Quelle est la signification de cet element ?
              </p>

              {!showResult ? (
                <div className="space-y-4">
                  <Input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Entrez votre reponse..."
                    autoFocus
                  />
                  <Button
                    onClick={checkAnswer}
                    disabled={!answer.trim()}
                    className="w-full"
                  >
                    Verifier
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      isCorrect ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        isCorrect ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {isCorrect ? "Correct !" : "Incorrect"}
                    </p>
                    {!isCorrect && (
                      <p className="text-gray-700 mt-1">
                        Reponse attendue : {currentQuizItem.meaningsFr.join(", ")}
                      </p>
                    )}
                  </div>
                  <Button onClick={handleQuizNext} className="w-full">
                    Continuer
                  </Button>
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
            Precedent
          </Button>
          <Button onClick={handleNext}>
            {currentIndex === lessons.length - 1 ? "Quiz" : "Suivant"}
          </Button>
        </div>
      </div>
    </div>
  );
}
