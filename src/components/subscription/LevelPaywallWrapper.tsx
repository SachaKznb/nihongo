"use client";

import { useState, useEffect } from "react";
import { PaywallModal } from "./PaywallModal";

interface LevelPaywallWrapperProps {
  levelId: number;
  hasFullAccess: boolean;
  userLevel: number;
  children: React.ReactNode;
}

export function LevelPaywallWrapper({
  levelId,
  hasFullAccess,
  userLevel,
  children,
}: LevelPaywallWrapperProps) {
  const [showPaywall, setShowPaywall] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  const FREE_TIER_MAX_LEVEL = 3;
  const isPremiumLevel = levelId > FREE_TIER_MAX_LEVEL;
  const isCloseToPaywall = userLevel >= 2 && userLevel <= FREE_TIER_MAX_LEVEL && !hasFullAccess;

  useEffect(() => {
    // Show paywall immediately for premium levels without access
    if (isPremiumLevel && !hasFullAccess) {
      setShowPaywall(true);
    }
    // Show teaser for users close to paywall (level 2-3)
    else if (isCloseToPaywall && levelId === FREE_TIER_MAX_LEVEL) {
      // Show teaser after a delay when viewing level 3
      const timer = setTimeout(() => setShowTeaser(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isPremiumLevel, hasFullAccess, isCloseToPaywall, levelId]);

  // For premium levels without access, show locked state
  if (isPremiumLevel && !hasFullAccess) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-5xl">🔒</span>
            </div>
            <h2 className="text-3xl font-bold font-display text-stone-900 mb-4">
              Niveau {levelId} - Contenu Premium
            </h2>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Ce niveau fait partie du contenu premium. Abonnez-vous pour débloquer
              tous les niveaux et continuer votre apprentissage du japonais.
            </p>
            <button
              onClick={() => setShowPaywall(true)}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Voir les offres
            </button>
          </div>
        </div>
        <PaywallModal
          isOpen={showPaywall}
          onClose={() => setShowPaywall(false)}
          level={levelId}
          itemType="level"
        />
      </>
    );
  }

  return (
    <>
      {children}

      {/* Teaser modal for users on level 3 */}
      {showTeaser && (
        <TeaserBanner onUpgrade={() => setShowPaywall(true)} onDismiss={() => setShowTeaser(false)} />
      )}

      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        level={levelId}
        itemType="level"
      />
    </>
  );
}

function TeaserBanner({ onUpgrade, onDismiss }: { onUpgrade: () => void; onDismiss: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg animate-in slide-in-from-bottom duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl">✨</span>
          <div>
            <p className="font-semibold">Vous approchez de la fin du contenu gratuit !</p>
            <p className="text-sm text-teal-100">
              Débloquez les 57 niveaux restants et plus de 2000 kanji.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-sm text-teal-100 hover:text-white transition-colors"
          >
            Plus tard
          </button>
          <button
            onClick={onUpgrade}
            className="px-6 py-2 bg-white text-teal-600 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            Voir les offres
          </button>
        </div>
      </div>
    </div>
  );
}

export default LevelPaywallWrapper;
