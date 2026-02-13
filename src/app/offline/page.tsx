"use client";

import { useState, useEffect } from "react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      // If we're online, go back or reload
      window.location.href = "/";
    } else {
      // Force a check by trying to fetch
      fetch("/api/health", { method: "HEAD" })
        .then(() => {
          window.location.href = "/";
        })
        .catch(() => {
          // Still offline
          setIsOnline(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 01-.586-7.414M12 12v.01M8.464 8.464a5 5 0 00-.586 7.414M5.636 5.636a9 9 0 000 12.728M3 3l18 18"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Vous etes hors ligne
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Il semble que vous n&apos;ayez pas de connexion Internet.
          Les revisions et les lecons necessitent une connexion active pour
          synchroniser votre progression.
        </p>

        {/* Feature List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 text-left">
          <h2 className="font-semibold text-gray-900 mb-3">
            Connexion requise pour :
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Revisions SRS
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Nouvelles lecons
            </li>
            <li className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Synchronisation de la progression
            </li>
          </ul>
        </div>

        {/* Status Indicator */}
        <div className="mb-6">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isOnline
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {isOnline ? "Connexion detectee" : "Hors ligne"}
          </span>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isOnline ? "Retourner a l'application" : "Reessayer la connexion"}
        </button>

        {/* Help Text */}
        <p className="mt-4 text-sm text-gray-500">
          Verifiez votre connexion Wi-Fi ou donnees mobiles, puis reessayez.
        </p>
      </div>
    </div>
  );
}
