"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLessons } from "@/lib/hooks";
import type { LessonItem } from "@/types";

// Dynamic import for code-splitting - only load when session starts
const LessonSession = dynamic(
  () => import("@/components/lessons/LessonSession").then((mod) => mod.LessonSession),
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

export default function LessonsPage() {
  const { data, isLoading } = useLessons();
  const [started, setStarted] = useState(false);

  const lessons: LessonItem[] = data?.lessons || [];

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

  if (lessons.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <span className="relative text-9xl font-japanese text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-600">完</span>
          </div>
          <h2 className="text-3xl font-bold font-display text-stone-900 mb-4">
            Toutes les leçons sont terminées !
          </h2>
          <p className="text-stone-500 mb-10 max-w-md mx-auto text-lg">
            Vous avez terminé toutes les leçons disponibles.
            Continuez a reviser pour débloquer de nouveaux éléments.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition-all hover:shadow-lg"
            >
              Tableau de bord
            </Link>
            <Link
              href="/reviews"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-teal-200/50 transition-all hover:-translate-y-0.5"
            >
              Faire des révisions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (started) {
    return <LessonSession lessons={lessons} />;
  }

  // Count by type
  const radicalCount = lessons.filter(l => l.type === "radical").length;
  const kanjiCount = lessons.filter(l => l.type === "kanji").length;
  const vocabCount = lessons.filter(l => l.type === "vocabulary").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-12">
        {/* Header with animated kanji */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <span className="relative text-9xl font-japanese text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-indigo-600 animate-float">学</span>
        </div>

        <h2 className="text-4xl font-bold font-display text-stone-900 mb-4">
          {lessons.length} leçon{lessons.length > 1 ? "s" : ""} disponible{lessons.length > 1 ? "s" : ""}
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
          Prenez votre temps pour bien mémoriser les mnémoniques.
          Chaque élément sera ensuite testé dans un quiz.
        </p>

        {/* XP Reward indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-10">
          <span className="text-lg">⚡</span>
          <span className="text-emerald-700 font-medium">+{lessons.length * 10} XP à gagner</span>
        </div>

        {/* Preview */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {lessons.slice(0, 10).map((lesson, index) => {
            const bgColor = lesson.type === "radical"
              ? "gradient-radical"
              : lesson.type === "kanji"
              ? "gradient-kanji"
              : "gradient-vocab";
            return (
              <div
                key={index}
                className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center text-white text-2xl font-japanese shadow-lg hover:scale-110 transition-transform cursor-default`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {lesson.character || "?"}
              </div>
            );
          })}
          {lessons.length > 10 && (
            <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center text-stone-500 text-sm font-bold">
              +{lessons.length - 10}
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
            className="group px-8 py-4 bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-stone-400/30 transition-all hover:-translate-y-1 inline-flex items-center gap-3"
          >
            <span>Commencer les leçons</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Tip */}
        <p className="mt-8 text-sm text-stone-400 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
          <span>Astuce : Visualisez les mnémoniques pour mieux retenir</span>
        </p>
      </div>
    </div>
  );
}
