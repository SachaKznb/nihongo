"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Client-side validation
    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setMessage("Le mot de passe doit contenir au moins 8 caracteres");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setStatus("error");
      setMessage("Le mot de passe doit contenir au moins une majuscule");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setStatus("error");
      setMessage("Le mot de passe doit contenir au moins une minuscule");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setStatus("error");
      setMessage("Le mot de passe doit contenir au moins un chiffre");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
        return;
      }

      setStatus("success");
      setMessage("Mot de passe mis a jour avec succes !");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue. Veuillez reessayer.");
    }
  };

  if (!token) {
    return (
      <div className="text-center">
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl mb-6">
          <p className="text-red-600">Lien invalide ou expire.</p>
        </div>
        <Link
          href="/forgot-password"
          className="text-teal-600 font-medium hover:text-teal-700"
        >
          Faire une nouvelle demande
        </Link>
      </div>
    );
  }

  return (
    <>
      {status === "success" ? (
        <div className="text-center">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl mb-6">
            <p className="text-emerald-700">{message}</p>
            <p className="text-emerald-600 text-sm mt-2">
              Redirection vers la connexion...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Nouveau mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            <p className="mt-1.5 text-xs text-stone-400">
              8 caracteres min. avec majuscule, minuscule et chiffre
            </p>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-stone-700 mb-2"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="••••••••"
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
                Mise a jour...
              </span>
            ) : (
              "Reinitialiser le mot de passe"
            )}
          </button>
        </form>
      )}
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100">
        <div className="text-center mb-8">
          <div className="text-5xl font-japanese text-stone-300 mb-4">&#26032;</div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Nouveau mot de passe
          </h1>
          <p className="text-stone-500">Choisissez un nouveau mot de passe</p>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>

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
      </div>
    </div>
  );
}
