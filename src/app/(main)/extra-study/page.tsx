"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface StudyItem {
  type: "radical" | "kanji" | "vocabulary";
  id: number;
  character: string | null;
  imageUrl: string | null;
  meaningsFr: string[];
  readings?: string[];
}

type Phase = "select" | "practice" | "complete";

const CORRECT_MESSAGES = ["Parfait !", "Excellent !", "Bravo !", "Superbe !"];
const INCORRECT_MESSAGES = ["Pas tout à fait...", "Presque !", "Continue !"];

export default function ExtraStudyPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [items, setItems] = useState<StudyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Practice state
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [completing, setCompleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentItem = items[currentIndex];

  // Focus input
  useEffect(() => {
    if (phase === "practice" && !showResult && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase, currentIndex, showResult]);

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "");
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        type: selectedType,
        level: selectedLevel,
        limit: "20",
      });
      const response = await fetch(`/api/extra-study/items?${params}`);
      if (!response.ok) throw new Error("Erreur de chargement");
      const data = await response.json();

      if (data.items.length === 0) {
        alert("Aucun élément disponible pour cette sélection. Essaie une autre combinaison.");
        return;
      }

      setItems(data.items);
      setPhase("practice");
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Erreur lors du chargement des éléments");
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    const normalizedAnswer = normalizeText(answer);
    const isAnswerCorrect = currentItem.meaningsFr.some((m) => {
      const normalizedMeaning = normalizeText(m);
      return (
        normalizedAnswer === normalizedMeaning ||
        normalizedAnswer.includes(normalizedMeaning)
      );
    });

    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    setTotalAnswered(totalAnswered + 1);

    if (isAnswerCorrect) {
      setCorrectCount(correctCount + 1);
      setResultMessage(
        CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
      );
    } else {
      setResultMessage(
        INCORRECT_MESSAGES[Math.floor(Math.random() * INCORRECT_MESSAGES.length)]
      );
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setAnswer("");

    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // End of session
      completeSession();
    }
  };

  const completeSession = async () => {
    setCompleting(true);
    try {
      await fetch("/api/extra-study/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correctCount,
          totalCount: totalAnswered,
        }),
      });
      setPhase("complete");
    } catch (error) {
      console.error("Error completing session:", error);
    } finally {
      setCompleting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showResult) {
        handleNext();
      } else if (answer.trim()) {
        checkAnswer();
      }
    }
  };

  const typeOptions = [
    { value: "all", label: "Tous les types" },
    { value: "radical", label: "Radicaux uniquement" },
    { value: "kanji", label: "Kanji uniquement" },
    { value: "vocabulary", label: "Vocabulaire uniquement" },
  ];

  const levelOptions = [
    { value: "all", label: "Tous les niveaux" },
    { value: "current", label: "Niveau actuel" },
    ...Array.from({ length: 10 }, (_, i) => ({
      value: String(i + 1),
      label: `Niveau ${i + 1}`,
    })),
  ];

  // SELECTION PHASE
  if (phase === "select") {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Étude libre</h1>
          <p className="text-stone-600">
            Pratique tes connaissances sans affecter ton SRS
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Type d&apos;éléments
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Niveau
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {levelOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-teal-50 rounded-xl p-4 text-sm text-teal-700">
            <strong>Note :</strong> L&apos;étude libre n&apos;affecte pas ton SRS.
            Tu gagnes 2 XP par bonne réponse (au lieu de 5 en révision normale).
          </div>

          <Button
            onClick={fetchItems}
            disabled={loading}
            className="w-full py-3"
          >
            {loading ? "Chargement..." : "Commencer la pratique"}
          </Button>

          <Button
            variant="secondary"
            onClick={() => router.push("/dashboard")}
            className="w-full"
          >
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    );
  }

  // PRACTICE PHASE
  if (phase === "practice" && currentItem) {
    const typeColors = {
      radical: "from-blue-500 to-blue-600",
      kanji: "from-pink-500 to-pink-600",
      vocabulary: "from-purple-500 to-purple-600",
    };

    const typeLabels = {
      radical: "Radical",
      kanji: "Kanji",
      vocabulary: "Vocabulaire",
    };

    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-stone-600 mb-2">
            <span>Étude libre</span>
            <span className="font-medium">
              {currentIndex + 1}/{items.length}
            </span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-400 to-teal-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentIndex + 1) / items.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            <span>{correctCount} correct(s)</span>
            <span>{totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0}%</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Type badge */}
          <div className={`bg-gradient-to-r ${typeColors[currentItem.type]} px-4 py-2 text-white text-sm font-medium text-center`}>
            {typeLabels[currentItem.type]}
          </div>

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
            {currentItem.character ? (
              <span className="text-8xl font-japanese">{currentItem.character}</span>
            ) : currentItem.imageUrl ? (
              <img
                src={currentItem.imageUrl}
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
                      {currentItem.meaningsFr[0]}
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
                        {currentItem.meaningsFr.join(", ")}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleNext}
                  className="w-full mt-6"
                  disabled={completing}
                >
                  {completing
                    ? "Finalisation..."
                    : currentIndex === items.length - 1
                    ? "Terminer"
                    : "Continuer"}
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
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
    const xpEarned = correctCount * 2;

    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">{accuracy >= 80 ? "🎉" : accuracy >= 60 ? "👍" : "💪"}</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">
            Session terminée !
          </h1>
          <p className="text-stone-600 mb-6">
            Tu as pratiqué {items.length} éléments
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-600">{correctCount}</div>
              <div className="text-xs text-emerald-700">Correct</div>
            </div>
            <div className="bg-stone-100 rounded-xl p-4">
              <div className="text-2xl font-bold text-stone-700">{accuracy}%</div>
              <div className="text-xs text-stone-600">Précision</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-4">
              <div className="text-2xl font-bold text-teal-600">+{xpEarned}</div>
              <div className="text-xs text-teal-700">XP</div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => {
                setPhase("select");
                setItems([]);
                setCurrentIndex(0);
                setCorrectCount(0);
                setTotalAnswered(0);
              }}
              className="w-full"
            >
              Nouvelle session
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
