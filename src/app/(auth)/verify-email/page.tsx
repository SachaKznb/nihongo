"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const success = searchParams.get("success");
  const error = searchParams.get("error");

  // If verified successfully, redirect to dashboard after delay
  useEffect(() => {
    if (success === "true") {
      const timer = setTimeout(() => router.push("/dashboard"), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Veuillez entrer votre adresse email");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType("success");
      } else {
        setMessage(data.error || "Une erreur est survenue");
        setMessageType("error");
      }
    } catch {
      setMessage("Une erreur est survenue");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Success state - email verified
  if (success === "true") {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-2">
              Email verifie !
            </h1>
            <p className="text-stone-500 mb-6">
              Votre compte est maintenant actif. Vous allez etre redirige vers le tableau de bord...
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors"
            >
              Aller au tableau de bord
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Error messages mapping
  const errorMessages: Record<string, string> = {
    missing_token: "Lien invalide. Veuillez demander un nouvel email de verification.",
    invalid_token: "Ce lien n'est plus valide ou a déjà été utilise.",
    expired_token: "Ce lien a expire. Veuillez demander un nouvel email de verification.",
    server_error: "Une erreur est survenue. Veuillez réessayer.",
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100">
        <div className="text-center mb-8">
          <div className="text-5xl font-japanese text-stone-300 mb-4">&#9993;</div>
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Verifiez votre email
          </h1>
          {error ? (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl mt-4">
              <p className="text-red-600 text-sm">{errorMessages[error] || "Une erreur est survenue"}</p>
            </div>
          ) : (
            <p className="text-stone-500">
              Nous vous avons envoye un email de verification. Cliquez sur le lien dans l&apos;email pour activer votre compte.
            </p>
          )}
        </div>

        <div className="border-t border-stone-100 pt-6">
          <p className="text-sm text-stone-600 mb-4">
            Vous n&apos;avez pas recu l&apos;email ? Entrez votre adresse pour en recevoir un nouveau.
          </p>
          <form onSubmit={handleResend} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                "Renvoyer l'email"
              )}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-xl ${
              messageType === "success"
                ? "bg-emerald-50 border border-emerald-100"
                : "bg-red-50 border border-red-100"
            }`}>
              <p className={`text-sm text-center ${
                messageType === "success" ? "text-emerald-700" : "text-red-600"
              }`}>
                {message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-stone-100 text-center">
          <Link
            href="/login"
            className="text-teal-600 font-medium hover:text-teal-700"
          >
            Retour a la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 p-8 border border-stone-100 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
