"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/Toast";

interface PersonalizedMnemonicButtonProps {
  itemType: "radical" | "kanji" | "vocabulary";
  itemId: number;
  mnemonicType?: "meaning" | "reading";
  currentMnemonic: string;
  onGenerated?: (mnemonic: string) => void;
}

interface GenerateResponse {
  mnemonic: string;
  creditsRemaining: number | "unlimited";
}

interface ErrorResponse {
  error: string;
}

export function PersonalizedMnemonicButton({
  itemType,
  itemId,
  mnemonicType = "meaning",
  currentMnemonic,
  onGenerated,
}: PersonalizedMnemonicButtonProps) {
  const [loading, setLoading] = useState(false);
  const [generatedMnemonic, setGeneratedMnemonic] = useState<string | null>(null);
  const [creditsRemaining, setCreditsRemaining] = useState<number | "unlimited" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [needsPremium, setNeedsPremium] = useState(false);
  const { addToast } = useToast();

  const generateMnemonic = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNeedsPremium(false);

    try {
      const response = await fetch("/api/ai/personalized-mnemonic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType,
          itemId,
          mnemonicType,
        }),
      });

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();

        if (response.status === 403) {
          // No credits remaining - needs premium
          setNeedsPremium(true);
          addToast(errorData.error, "warning");
          return;
        }

        throw new Error(errorData.error || "Erreur lors de la génération");
      }

      const data: GenerateResponse = await response.json();
      setGeneratedMnemonic(data.mnemonic);
      setCreditsRemaining(data.creditsRemaining);
      addToast("Mnémonique personnalisé généré", "success");

      if (onGenerated) {
        onGenerated(data.mnemonic);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur inconnue";
      setError(errorMessage);
      addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, [itemType, itemId, mnemonicType, onGenerated, addToast]);

  const handleRegenerate = useCallback(() => {
    setGeneratedMnemonic(null);
    generateMnemonic();
  }, [generateMnemonic]);

  // Show generated mnemonic with option to regenerate
  if (generatedMnemonic) {
    return (
      <div className="space-y-3">
        {/* Original mnemonic (collapsed) */}
        {currentMnemonic && (
          <details className="text-sm">
            <summary className="text-stone-500 cursor-pointer hover:text-stone-700">
              Voir le mnémonique original
            </summary>
            <p className="mt-2 text-stone-600 pl-4 border-l-2 border-stone-200">
              {currentMnemonic}
            </p>
          </details>
        )}

        {/* Generated mnemonic display */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <SparklesIcon className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-pink-700">Mnémonique personnalisé</p>
              <p className="text-stone-700">{generatedMnemonic}</p>
            </div>
          </div>
        </div>

        {/* Credits info and regenerate button */}
        <div className="flex items-center justify-between">
          {creditsRemaining !== null && creditsRemaining !== "unlimited" && (
            <span className="text-xs text-stone-500">
              {creditsRemaining} crédit{creditsRemaining !== 1 ? "s" : ""} restant{creditsRemaining !== 1 ? "s" : ""}
            </span>
          )}
          {creditsRemaining === "unlimited" && (
            <span className="text-xs text-purple-600 font-medium">Crédits illimités</span>
          )}
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={loading}
            className="text-sm text-pink-600 hover:text-pink-700 font-medium disabled:opacity-50"
          >
            {loading ? "Génération..." : "Régénérer"}
          </button>
        </div>
      </div>
    );
  }

  // Error state with retry
  if (error && !needsPremium) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-rose-600">{error}</p>
        <button
          type="button"
          onClick={generateMnemonic}
          className="text-sm text-pink-600 hover:text-pink-700 font-medium"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Needs premium state
  if (needsPremium) {
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={generateMnemonic}
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-400 rounded-xl text-sm font-medium cursor-not-allowed"
        >
          <SparklesIcon className="w-4 h-4" />
          <span>Personnaliser</span>
        </button>
        <a
          href="/pricing"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <CrownIcon className="w-3.5 h-3.5" />
          Premium
        </a>
      </div>
    );
  }

  // Default button state
  return (
    <button
      type="button"
      onClick={generateMnemonic}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-sm font-medium shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          <span>Génération...</span>
        </>
      ) : (
        <>
          <SparklesIcon className="w-4 h-4" />
          <span>Personnaliser</span>
        </>
      )}
    </button>
  );
}

// Sparkles icon component
function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.48.48 0 01.458.339l.376 1.318a2.4 2.4 0 001.644 1.644l1.318.376a.48.48 0 010 .918l-1.318.376a2.4 2.4 0 00-1.644 1.644l-.376 1.318a.48.48 0 01-.918 0l-.376-1.318A2.4 2.4 0 0016.04 6.39l-1.318-.376a.48.48 0 010-.918l1.318-.376A2.4 2.4 0 0017.684 3.08l.376-1.318A.48.48 0 0118 1.5zM16.5 15a.48.48 0 01.458.339l.376 1.318a2.4 2.4 0 001.644 1.644l1.318.376a.48.48 0 010 .918l-1.318.376a2.4 2.4 0 00-1.644 1.644l-.376 1.318a.48.48 0 01-.918 0l-.376-1.318a2.4 2.4 0 00-1.644-1.644l-1.318-.376a.48.48 0 010-.918l1.318-.376a2.4 2.4 0 001.644-1.644l.376-1.318A.48.48 0 0116.5 15z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Crown icon for premium badge
function CrownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 1.5l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.51L12 1.5z" />
    </svg>
  );
}

export default PersonalizedMnemonicButton;
