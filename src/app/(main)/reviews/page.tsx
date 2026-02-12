"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useReviews } from "@/lib/hooks";
import type { ReviewItem } from "@/types";

// Dynamic import for code-splitting - only load when session starts
const ReviewSession = dynamic(
  () => import("@/components/reviews/ReviewSession").then((mod) => mod.ReviewSession),
  {
    loading: () => (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-stone-200 rounded-xl w-1/3"></div>
          <div className="h-96 bg-stone-200 rounded-3xl"></div>
        </div>
      </div>
    ),
  }
);

export default function ReviewsPage() {
  const { data, isLoading } = useReviews();
  const [started, setStarted] = useState(false);

  const reviews: ReviewItem[] = data?.reviews || [];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-stone-200 rounded-xl w-1/3"></div>
          <div className="h-64 bg-stone-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <span className="relative text-9xl font-japanese text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-orange-600">休</span>
          </div>
          <h2 className="text-3xl font-bold font-display text-stone-900 mb-4">
            Pas de révisions pour le moment
          </h2>
          <p className="text-stone-500 mb-10 max-w-md mx-auto text-lg">
            Vous n&apos;avez aucune révision en attente.
            Faites de nouvelles leçons ou revenez plus tard !
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition-all hover:shadow-lg"
            >
              Tableau de bord
            </Link>
            <Link
              href="/lessons"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-teal-200/50 transition-all hover:-translate-y-0.5"
            >
              Faire des leçons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (started) {
    return <ReviewSession reviews={reviews} />;
  }

  // Count by type
  const radicalCount = reviews.filter(r => r.type === "radical").length;
  const kanjiCount = reviews.filter(r => r.type === "kanji").length;
  const vocabCount = reviews.filter(r => r.type === "vocabulary").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        {/* Header with animated kanji */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-rose-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <span className="relative text-9xl font-japanese text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-rose-600 animate-float">復</span>
        </div>

        <h2 className="text-4xl font-bold font-display text-stone-900 mb-4">
          {reviews.length} revision{reviews.length > 1 ? "s" : ""} en attente
        </h2>

        {/* Type breakdown */}
        <div className="flex justify-center gap-4 mb-6">
          {radicalCount > 0 && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {radicalCount} radical{radicalCount > 1 ? "s" : ""}
            </span>
          )}
          {kanjiCount > 0 && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              {kanjiCount} kanji
            </span>
          )}
          {vocabCount > 0 && (
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              {vocabCount} vocabulaire
            </span>
          )}
        </div>

        <p className="text-stone-500 mb-10 max-w-lg mx-auto text-lg">
          C&apos;est le moment de tester vos connaissances !
          Essayez de vous rappeler les significations et lectures.
        </p>

        {/* XP Reward indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-10">
          <span className="text-lg">⚡</span>
          <span className="text-emerald-700 font-medium">+{reviews.length * 5} XP a gagner</span>
        </div>

        {/* Preview */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {reviews.slice(0, 10).map((review, index) => {
            const bgColor = review.type === "radical"
              ? "gradient-radical"
              : review.type === "kanji"
              ? "gradient-kanji"
              : "gradient-vocab";
            return (
              <div
                key={index}
                className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center text-white text-2xl font-japanese shadow-lg hover:scale-110 transition-transform cursor-default`}
              >
                {review.character || "?"}
              </div>
            );
          })}
          {reviews.length > 10 && (
            <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center text-stone-500 text-sm font-bold">
              +{reviews.length - 10}
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition-all hover:shadow-lg"
          >
            Plus tard
          </Link>
          <button
            onClick={() => setStarted(true)}
            className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-200/50 transition-all hover:-translate-y-1 inline-flex items-center gap-3"
          >
            <span>Commencer les révisions</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Streak reminder */}
        <div className="mt-8 inline-flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
          <span className="text-lg">🔥</span>
          <span className="text-sm font-medium">Complète tes révisions pour maintenir ta série !</span>
        </div>
      </div>
    </div>
  );
}
