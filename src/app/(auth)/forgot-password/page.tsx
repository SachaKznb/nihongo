"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
        return;
      }

      setStatus("success");
      setMessage(data.message);
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100">
        <div className="text-center mb-8">
          <div className="text-5xl font-japanese text-stone-300 mb-4">&#37749;</div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Mot de passe oublie ?
          </h1>
          <p className="text-stone-500">
            Entrez votre email pour recevoir un lien de reinitialisation
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center">
            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-6">
              <p className="text-emerald-700 text-sm">{message}</p>
            </div>
            <Link
              href="/login"
              className="text-teal-600 font-medium hover:text-teal-700"
            >
              Retour a la connexion
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="votre@email.com"
              />
            </div>

            {status === "error" && message && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-600 text-sm text-center">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-medium hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                "Envoyer le lien"
              )}
            </button>
          </form>
        )}

        {status !== "success" && (
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-stone-500">
              <Link
                href="/login"
                className="text-teal-600 font-medium hover:text-teal-700"
              >
                Retour a la connexion
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
