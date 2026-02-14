"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface VocabularyUsed {
  id: number;
  word: string;
  meaning: string;
}

interface StoryResponse {
  story: string;
  storyWithFurigana: string;
  translationFr: string;
  vocabularyUsed: VocabularyUsed[];
  level: number;
}

interface ReadingStoryGeneratorProps {
  userLevel?: number;
}

const JLPT_LEVELS = [5, 4, 3, 2, 1] as const;

const THEME_SUGGESTIONS: Record<number, string[]> = {
  5: ["vie quotidienne", "famille", "nourriture", "temps", "salutations"],
  4: ["voyage", "shopping", "restaurant", "transports", "loisirs"],
  3: ["travail", "sante", "actualites", "culture", "technologie"],
  2: ["societe", "economie", "politique", "environnement", "art"],
  1: ["philosophie", "litterature", "sciences", "histoire", "affaires"],
};

export function ReadingStoryGenerator({
  userLevel,
}: ReadingStoryGeneratorProps) {
  const router = useRouter();
  const { addToast } = useToast();

  // Default to N5 if no user level, otherwise map user level to JLPT
  // User levels 1-10 roughly map to JLPT N5, higher levels map to lower JLPT
  const defaultJlptLevel = userLevel
    ? userLevel <= 10
      ? 5
      : userLevel <= 20
        ? 4
        : userLevel <= 30
          ? 3
          : userLevel <= 40
            ? 2
            : 1
    : 5;

  const [selectedLevel, setSelectedLevel] = useState<number>(defaultJlptLevel);
  const [theme, setTheme] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState<StoryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);

  const getRandomTheme = useCallback(() => {
    const themes = THEME_SUGGESTIONS[selectedLevel] || THEME_SUGGESTIONS[5];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, [selectedLevel]);

  const generateStory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setShowUpgradePrompt(false);
    setRateLimitReset(null);

    try {
      const response = await fetch("/api/ai/reading-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level: selectedLevel,
          theme: theme.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        // Handle premium-only error (403)
        if (response.status === 403) {
          setShowUpgradePrompt(true);
          setError(data.error);
          return;
        }

        // Handle rate limit error (429)
        if (response.status === 429) {
          setRateLimitReset(data.retryAfter);
          setError(data.error);
          addToast("Limite de requetes atteinte. Reessayez plus tard.", "warning");
          return;
        }

        throw new Error(data.error || "Erreur lors de la generation");
      }

      const data: StoryResponse = await response.json();
      setStory(data);
      addToast("Histoire generee avec succes !", "success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur lors de la generation";
      setError(message);
      addToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [selectedLevel, theme, addToast]);

  const handleRegenerate = useCallback(() => {
    setStory(null);
    setTheme("");
  }, []);

  // Calculate countdown for rate limit
  const getRateLimitCountdown = () => {
    if (!rateLimitReset) return null;
    const seconds = Math.max(0, Math.ceil((rateLimitReset - Date.now()) / 1000));
    return seconds > 0 ? `${seconds}s` : null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-pink-500" />
          Generateur d&apos;histoires
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Level Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Niveau JLPT
          </label>
          <div className="flex gap-2 flex-wrap">
            {JLPT_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedLevel(level)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedLevel === level
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                N{level}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Theme (optionnel)
          </label>
          <div className="flex gap-2">
            <Input
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Ex: voyage, nourriture, famille..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={getRandomTheme}
              disabled={isLoading}
              title="Theme aleatoire"
            >
              <ShuffleIcon className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Suggestions pour N{selectedLevel}:{" "}
            {THEME_SUGGESTIONS[selectedLevel]?.join(", ")}
          </p>
        </div>

        {/* Generate Button */}
        {!story && (
          <Button
            onClick={generateStory}
            disabled={isLoading || !!rateLimitReset}
            className="w-full flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <LoadingSpinner className="w-5 h-5" />
                Generation en cours...
              </>
            ) : rateLimitReset ? (
              <>
                Reessayer dans {getRateLimitCountdown()}
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generer une histoire
              </>
            )}
          </Button>
        )}

        {/* Loading State */}
        {isLoading && <StoryLoadingSkeleton />}

        {/* Error State */}
        {error && !showUpgradePrompt && !rateLimitReset && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Rate Limit Message */}
        {rateLimitReset && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-6 h-6 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800">Limite atteinte</p>
                <p className="text-amber-700 text-sm">
                  Veuillez patienter avant de generer une nouvelle histoire.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade Prompt */}
        {showUpgradePrompt && (
          <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-200/50">
                <LockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Fonctionnalite Premium
              </h3>
              <p className="text-gray-600 text-sm">
                La generation d&apos;histoires de lecture est reservee aux membres
                Premium. Passez a Premium pour debloquer cette fonctionnalite !
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => router.push("/pricing")}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                >
                  Voir les offres
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowUpgradePrompt(false)}
                >
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Story Display */}
        {story && !isLoading && (
          <div className="space-y-6">
            {/* Japanese Story with Furigana */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <BookIcon className="w-4 h-4" />
                Histoire (N{story.level})
              </h4>
              <div
                className="p-4 bg-stone-50 rounded-xl text-lg leading-loose font-japanese"
                lang="ja"
                dangerouslySetInnerHTML={{ __html: story.storyWithFurigana }}
              />
            </div>

            {/* French Translation */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <TranslateIcon className="w-4 h-4" />
                Traduction
              </h4>
              <p className="p-4 bg-blue-50 rounded-xl text-gray-700">
                {story.translationFr}
              </p>
            </div>

            {/* Vocabulary Used */}
            {story.vocabularyUsed.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <ListIcon className="w-4 h-4" />
                  Vocabulaire utilise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {story.vocabularyUsed.map((vocab) => (
                    <Link
                      key={vocab.id}
                      href={`/vocabulary/${vocab.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-lg text-sm hover:bg-purple-200 transition-colors"
                    >
                      <span className="font-japanese font-medium">
                        {vocab.word}
                      </span>
                      <span className="text-purple-600">-</span>
                      <span>{vocab.meaning}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Regenerate Button */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={handleRegenerate}
                variant="secondary"
                className="flex-1"
              >
                Nouveau theme
              </Button>
              <Button
                onClick={generateStory}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <SparklesIcon className="w-4 h-4" />
                Regenerer
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Loading Skeleton
function StoryLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-5 w-36" />
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Icons
function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

function ShuffleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function TranslateIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );
}

export default ReadingStoryGenerator;
