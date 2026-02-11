"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="text-6xl mb-6">:(</div>
        <h2 className="text-2xl font-bold text-stone-900 mb-2">
          Une erreur est survenue
        </h2>
        <p className="text-stone-500 mb-6">
          Nous sommes desoles, quelque chose s&apos;est mal passe. Veuillez
          reessayer.
        </p>
        {error.digest && (
          <p className="text-xs text-stone-400 mb-6">
            Code erreur: {error.digest}
          </p>
        )}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-medium hover:bg-teal-700 transition-all"
          >
            Reessayer
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-stone-100 text-stone-700 py-3.5 rounded-xl font-medium hover:bg-stone-200 transition-all"
          >
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  );
}
