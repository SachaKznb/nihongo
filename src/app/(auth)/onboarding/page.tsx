"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LessonItem } from "@/types";
import { LessonCard } from "@/components/lessons/LessonCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type OnboardingPhase = "intro" | "lesson" | "quiz" | "complete";

const CORRECT_MESSAGES = [
  "Parfait !",
  "Excellent !",
  "Bravo !",
  "Magnifique !",
  "Superbe !",
];

const INCORRECT_MESSAGES = [
  "Pas tout à fait...",
  "Presque !",
  "Continue !",
  "Tu y es presque !",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [phase, setPhase] = useState<OnboardingPhase>("intro");
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Quiz state
  const [quizItems, setQuizItems] = useState<LessonItem[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [completedQuiz, setCompletedQuiz] = useState<Set<number>>(new Set());
  const [completing, setCompleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLesson = lessons[currentIndex];
  const currentQuizItem = quizItems[quizIndex];

  // Redirect if already onboarded
  useEffect(() => {
    if (session?.user?.onboardingCompleted) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Fetch onboarding lessons
  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch("/api/onboarding/lessons");
        if (!response.ok) {
          const data = await response.json();
          if (data.error === "Onboarding déjà complété") {
            router.push("/dashboard");
            return;
          }
          throw new Error(data.error || "Erreur de chargement");
        }
        const data = await response.json();
        setLessons(data.lessons);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, [router]);

  // Focus input when quiz phase starts
  useEffect(() => {
    if (phase === "quiz" && !showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, quizIndex, showResult]);

  // Normalize text for answer comparison
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "");
  };

  const handleStartLessons = () => {
    setPhase("lesson");
  };

  const handleNextLesson = () => {
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Start quiz
      setQuizItems([...lessons].sort(() => Math.random() - 0.5));
      setPhase("quiz");
    }
  };

  const handlePreviousLesson = () => {
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
      setResultMessage(
        CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
      );
      setCompletedQuiz(new Set([...completedQuiz, currentQuizItem.id]));
    } else {
      setResultMessage(
        INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)]
      );
    }
  };

  const handleNextQuizItem = () => {
    setShowResult(false);
    setAnswer("");

    if (!isCorrect) {
      // Wrong answer: re-add to queue
      setQuizItems([...quizItems, currentQuizItem]);
    }

    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else if (completedQuiz.size >= lessons.length) {
      // All items completed correctly
      completeOnboarding();
    } else {
      // More items to review
      setQuizIndex(quizIndex + 1);
    }
  };

  const completeOnboarding = async () => {
    setCompleting(true);
    try {
      const radicalIds = lessons.map((l) => l.id);
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ radicalIds }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la complétion");
      }

      // Update session to reflect onboardingCompleted
      await updateSession();

      setPhase("complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setCompleting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showResult) {
        handleNextQuizItem();
      } else if (answer.trim()) {
        checkAnswer();
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-stone-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  // INTRO PHASE
  if (phase === "intro") {
    return (
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🎌</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-4">
            Bienvenue sur Nihongo !
          </h1>
          <p className="text-stone-600 mb-6">
            Tu vas apprendre tes <strong>5 premiers radicaux</strong>. Les radicaux sont les
            briques de base des kanji japonais.
          </p>
          <div className="bg-teal-50 rounded-xl p-4 mb-6 text-left">
            <p className="text-teal-800 text-sm">
              <strong>Comment ça marche :</strong>
            </p>
            <ul className="text-teal-700 text-sm mt-2 space-y-1">
              <li>1. Tu découvres chaque radical avec un mnémonique</li>
              <li>2. Tu passes un petit quiz pour vérifier</li>
              <li>3. Tu commences ton apprentissage !</li>
            </ul>
          </div>
          <Button onClick={handleStartLessons} className="w-full text-lg py-3">
            Commençons ! 🚀
          </Button>
        </div>
      </div>
    );
  }

  // LESSON PHASE
  if (phase === "lesson") {
    return (
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-600 mb-2">
            <span>Leçon</span>
            <span className="font-medium">
              {currentIndex + 1}/{lessons.length}
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / lessons.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Lesson Card */}
        {currentLesson && (
          <LessonCard
            item={currentLesson}
            showMnemonic={true}
            autoplayAudio={false}
            showPersonalizedSentences={false}
          />
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={handlePreviousLesson}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            Précédent
          </Button>
          <Button onClick={handleNextLesson} className="flex-1">
            {currentIndex === lessons.length - 1 ? "Passer au quiz" : "Suivant"}
          </Button>
        </div>
      </div>
    );
  }

  // QUIZ PHASE
  if (phase === "quiz") {
    return (
      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-600 mb-2">
            <span>Quiz</span>
            <span className="font-medium">
              {completedQuiz.size}/{lessons.length}
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(completedQuiz.size / lessons.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Character display */}
          <div
            className={`py-12 px-4 text-center transition-colors duration-300 ${
              showResult
                ? isCorrect
                  ? "bg-gradient-to-b from-emerald-50 to-emerald-100"
                  : "bg-gradient-to-b from-amber-50 to-orange-50"
                : "bg-stone-50"
            }`}
          >
            {currentQuizItem?.character ? (
              <span
                className={`text-8xl font-japanese transition-transform duration-300 inline-block ${
                  showResult && isCorrect ? "scale-110" : ""
                }`}
              >
                {currentQuizItem.character}
              </span>
            ) : currentQuizItem?.imageUrl ? (
              <img
                src={currentQuizItem.imageUrl}
                alt="Radical"
                className="w-24 h-24 mx-auto"
              />
            ) : (
              <span className="text-6xl text-stone-400">?</span>
            )}
          </div>

          <div className="p-6">
            {!showResult ? (
              <>
                <p className="text-center text-stone-600 mb-4">
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
                      <h3 className="text-2xl font-bold text-emerald-600">
                        {resultMessage}
                      </h3>
                    </div>
                    <p className="text-emerald-700 font-medium text-lg">
                      {currentQuizItem.meaningsFr[0]}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl">💪</span>
                      <h3 className="text-xl font-semibold text-amber-700">
                        {resultMessage}
                      </h3>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <p className="text-stone-600 text-sm mb-1">
                        La bonne réponse :
                      </p>
                      <p className="text-stone-900 font-bold text-lg">
                        {currentQuizItem.meaningsFr.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleNextQuizItem}
                  className="w-full mt-6"
                  disabled={completing}
                >
                  {completing ? "Finalisation..." : "Continuer"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // COMPLETE PHASE
  if (phase === "complete") {
    return (
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
          {/* Celebration background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-float text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.3,
                }}
              >
                {["🎉", "✨", "🌸", "⭐"][Math.floor(Math.random() * 4)]}
              </div>
            ))}
          </div>

          <div className="relative z-10">
            <div className="mb-6">
              <span className="text-6xl">🎊</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-800 mb-2">
              Félicitations !
            </h1>
            <p className="text-stone-600 mb-6">
              Tu as appris tes <strong>{lessons.length} premiers radicaux</strong> !
            </p>

            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-teal-700">
                <span className="text-xl">⚡</span>
                <span className="font-bold text-lg">+50 XP</span>
              </div>
              <p className="text-teal-600 text-sm mt-1">
                Bonus de bienvenue !
              </p>
            </div>

            <p className="text-stone-500 text-sm mb-6">
              Tes premières révisions seront disponibles dans 4 heures. En attendant,
              tu peux continuer tes leçons !
            </p>

            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full text-lg py-3"
            >
              Accéder au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
