"use client";

import { ReadingStoryGenerator } from "@/components/ai/ReadingStoryGenerator";
import Link from "next/link";

export default function ReadingPracticePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour au tableau de bord
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2 flex items-center gap-3">
          <span className="text-4xl">📖</span>
          Pratique de lecture
        </h1>
        <p className="text-stone-600">
          Generez des histoires courtes en japonais utilisant le vocabulaire que vous avez appris.
          Chaque histoire inclut des furigana et une traduction francaise.
        </p>
      </div>

      {/* Story Generator */}
      <ReadingStoryGenerator />

      {/* Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Conseils de lecture
        </h3>
        <ul className="space-y-2 text-stone-700 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Lisez d&apos;abord l&apos;histoire en japonais sans regarder la traduction</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Utilisez les furigana seulement si vous etes bloque sur un kanji</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Cliquez sur les mots de vocabulaire pour revoir leur fiche</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Essayez de lire a voix haute pour ameliorer votre prononciation</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
