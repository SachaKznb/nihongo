"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "success";
  const message = searchParams.get("message") || "toutes les notifications";

  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {/* Logo */}
          <div className="mb-6">
            <span className="text-5xl font-japanese text-teal-600">&#26085;</span>
            <h1 className="text-xl font-bold text-stone-800 mt-2">Nihongo</h1>
          </div>

          {/* Status Icon */}
          <div className="mb-6">
            {isSuccess ? (
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-8 h-8 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Message */}
          {isSuccess ? (
            <>
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Desabonnement confirme
              </h2>
              <p className="text-stone-600 mb-6">
                Vous avez ete desabonne de {message}.
              </p>
              <p className="text-sm text-stone-500 mb-6">
                Vous pouvez modifier vos preferences de notification a tout moment
                dans les parametres de votre compte.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                Une erreur est survenue
              </h2>
              <p className="text-stone-600 mb-6">{message}</p>
            </>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/settings"
              className="block w-full px-4 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 transition-colors"
            >
              Gerer mes preferences
            </Link>
            <Link
              href="/"
              className="block w-full px-4 py-3 text-stone-600 rounded-xl font-medium hover:bg-stone-100 transition-colors"
            >
              Retour a l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
          <div className="animate-pulse text-stone-400">Chargement...</div>
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
