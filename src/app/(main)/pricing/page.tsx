"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PLAN_DETAILS } from "@/lib/stripe";

export default function PricingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<{
    status: string;
    hasFullAccess: boolean;
  } | null>(null);

  const fromLevel = searchParams.get("level");

  useEffect(() => {
    fetch("/api/subscription")
      .then((res) => res.json())
      .then(setSubscription)
      .catch(console.error);
  }, []);

  const handleSubscribe = async (plan: string) => {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (data.url) {
        router.push(data.url);
      } else {
        alert(data.error || "Erreur lors de la création de la session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Une erreur est survenue");
    } finally {
      setLoading(null);
    }
  };

  // Already subscribed
  if (subscription?.hasFullAccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">✨</div>
        <h1 className="text-3xl font-bold font-display text-stone-900 mb-4">
          Vous avez déjà accès à tout !
        </h1>
        <p className="text-stone-600 mb-8">
          Votre abonnement vous donne accès à l'ensemble du contenu.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Retour au tableau de bord
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-display text-stone-900 mb-4">
          Débloquez tout le contenu
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
          Accédez à tous les niveaux, tous les kanji, tout le vocabulaire.
          Maîtrisez le japonais sans limite.
        </p>
      </div>

      {/* From level notice */}
      {fromLevel && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-center max-w-2xl mx-auto">
          <p className="text-amber-800">
            <span className="font-semibold">Le niveau {fromLevel}</span> nécessite un abonnement.
            Débloquez-le maintenant pour continuer votre apprentissage !
          </p>
        </div>
      )}

      {/* Free tier info */}
      <div className="bg-stone-100 rounded-2xl p-6 mb-12 text-center max-w-2xl mx-auto">
        <p className="text-stone-600">
          <span className="font-semibold">Accès gratuit actuel :</span> Niveaux 1-3
          (radicaux, kanji et vocabulaire de base)
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Monthly */}
        <PricingCard
          plan="monthly"
          details={PLAN_DETAILS.monthly}
          onSubscribe={handleSubscribe}
          loading={loading === "monthly"}
        />

        {/* Yearly - Popular */}
        <PricingCard
          plan="yearly"
          details={PLAN_DETAILS.yearly}
          onSubscribe={handleSubscribe}
          loading={loading === "yearly"}
          popular
        />

        {/* Lifetime */}
        <PricingCard
          plan="lifetime"
          details={PLAN_DETAILS.lifetime}
          onSubscribe={handleSubscribe}
          loading={loading === "lifetime"}
        />
      </div>

      {/* Features list */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8">
        <h3 className="text-xl font-bold font-display text-stone-900 mb-6 text-center">
          Inclus dans tous les plans premium
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "📚", text: "Tous les niveaux (1-60)" },
            { icon: "🎯", text: "2000+ kanji" },
            { icon: "💬", text: "6000+ mots de vocabulaire" },
            { icon: "🧠", text: "Mnémoniques en français" },
            { icon: "📊", text: "Statistiques détaillées" },
            { icon: "🔥", text: "Système de séries" },
            { icon: "🎮", text: "Gamification complète" },
            { icon: "📧", text: "Support prioritaire" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-stone-600">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold font-display text-stone-900 mb-8 text-center">
          Questions fréquentes
        </h3>
        <div className="space-y-4">
          <FaqItem
            question="Puis-je annuler à tout moment ?"
            answer="Oui, vous pouvez annuler votre abonnement à tout moment depuis vos paramètres. Vous conserverez l'accès jusqu'à la fin de votre période de facturation."
          />
          <FaqItem
            question="Que se passe-t-il si j'annule ?"
            answer="Vous gardez l'accès à tout le contenu jusqu'à la fin de votre période payée. Après, vous repassez au plan gratuit (niveaux 1-3), mais votre progression est conservée."
          />
          <FaqItem
            question="Puis-je passer à un autre plan ?"
            answer="Oui, vous pouvez changer de plan à tout moment. La différence de prix sera calculée au prorata."
          />
          <FaqItem
            question="L'offre À vie est-elle vraiment à vie ?"
            answer="Oui ! C'est un paiement unique qui vous donne un accès permanent à tout le contenu, présent et futur."
          />
        </div>
      </div>

      {/* Back link */}
      <div className="mt-12 text-center">
        <Link
          href="/dashboard"
          className="text-stone-500 hover:text-stone-700 transition-colors"
        >
          ← Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}

interface PricingCardProps {
  plan: string;
  details: {
    name: string;
    priceDisplay: string;
    period: string;
    savings: string | null;
    description: string;
  };
  onSubscribe: (plan: string) => void;
  loading: boolean;
  popular?: boolean;
}

function PricingCard({
  plan,
  details,
  onSubscribe,
  loading,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative bg-white rounded-3xl border-2 p-6 ${
        popular
          ? "border-teal-500 shadow-xl shadow-teal-100/50"
          : "border-stone-200"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
            Le plus populaire
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold font-display text-stone-900 mb-2">
          {details.name}
        </h3>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold font-display text-stone-900">
            {details.priceDisplay}
          </span>
          <span className="text-stone-500">{details.period}</span>
        </div>
        {details.savings && (
          <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
            {details.savings}
          </span>
        )}
        <p className="mt-3 text-sm text-stone-500">{details.description}</p>
      </div>

      <button
        onClick={() => onSubscribe(plan)}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          popular
            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-teal-200/50"
            : "bg-stone-100 text-stone-900 hover:bg-stone-200"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? "Chargement..." : "Choisir ce plan"}
      </button>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-semibold text-stone-900">{question}</span>
        <span className="text-stone-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-stone-600">{answer}</p>
        </div>
      )}
    </div>
  );
}
