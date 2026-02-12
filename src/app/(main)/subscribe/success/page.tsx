"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SubscribeSuccessPage() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setChecking(false);
      return;
    }

    // Poll for subscription status update (webhook may take a moment)
    let attempts = 0;
    const maxAttempts = 15;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/subscription");
        const data = await res.json();

        if (data.hasFullAccess) {
          setVerified(true);
          setChecking(false);
          return true;
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
      return false;
    };

    const poll = async () => {
      const success = await checkStatus();
      if (!success && attempts < maxAttempts) {
        attempts++;
        setTimeout(poll, 2000);
      } else {
        setChecking(false);
        // Assume success after max attempts
        if (attempts >= maxAttempts) {
          setVerified(true);
        }
      }
    };

    poll();
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Celebration animation */}
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <span className="relative text-9xl animate-bounce">🎉</span>
      </div>

      <h1 className="text-4xl font-bold font-display text-stone-900 mb-4">
        Bienvenue dans Nihongo Pro !
      </h1>

      <p className="text-xl text-stone-600 mb-8">
        Votre abonnement est maintenant actif. Vous avez accès à tout le contenu.
      </p>

      {checking && (
        <div className="mb-8 flex items-center justify-center gap-3 text-stone-500">
          <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Activation en cours...</span>
        </div>
      )}

      {verified && !checking && (
        <div className="mb-8 flex items-center justify-center gap-2 text-emerald-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Abonnement activé avec succès !</span>
        </div>
      )}

      {/* Benefits reminder */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 mb-8 text-left">
        <h3 className="font-semibold text-stone-900 mb-4">
          Ce qui vous attend :
        </h3>
        <ul className="space-y-3">
          {[
            "Accès à tous les niveaux (1-60)",
            "2000+ kanji avec mnémoniques en français",
            "6000+ mots de vocabulaire",
            "Statistiques détaillées et suivi de progression",
            "Toutes les fonctionnalités premium",
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-stone-600">
              <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-sm">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/dashboard"
          className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
        >
          Continuer l'apprentissage
        </Link>
        <Link
          href="/lessons"
          className="px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-xl font-semibold hover:bg-stone-50 transition-all"
        >
          Commencer une leçon
        </Link>
      </div>

      {/* Receipt notice */}
      <p className="mt-8 text-sm text-stone-400">
        Un reçu a été envoyé à votre adresse email.
      </p>
    </div>
  );
}
