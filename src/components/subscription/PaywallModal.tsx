"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  level?: number;
  itemType?: "radical" | "kanji" | "vocabulary" | "level";
}

export function PaywallModal({
  isOpen,
  onClose,
  level,
  itemType = "level",
}: PaywallModalProps) {
  const router = useRouter();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const itemTypeText = {
    radical: "Ce radical",
    kanji: "Ce kanji",
    vocabulary: "Ce vocabulaire",
    level: "Ce niveau",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-amber-200/50">
            <span className="text-4xl">🔒</span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold font-display text-stone-900 mb-2">
            Contenu Premium
          </h3>

          <p className="text-stone-600 mb-6">
            {itemTypeText[itemType]} {level && `(niveau ${level})`} est réservé aux
            membres premium. Débloquez tous les niveaux pour continuer votre
            apprentissage.
          </p>

          {/* Pricing preview */}
          <div className="bg-stone-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-stone-500 mb-2">À partir de</p>
            <p className="text-2xl font-bold text-stone-900">
              6,99 € <span className="text-base font-normal text-stone-500">/mois</span>
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => router.push(level ? `/pricing?level=${level}` : "/pricing")}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-200/50 transition-all"
            >
              Voir les offres
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition-all"
            >
              Continuer avec le contenu gratuit
            </button>
          </div>

          <p className="mt-4 text-xs text-stone-400">
            Annulez à tout moment • Accès immédiat
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaywallModal;
