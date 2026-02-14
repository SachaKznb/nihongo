"use client";

import { useState } from "react";
import { PersonalizedMnemonicButton } from "@/components/ai/PersonalizedMnemonicButton";
import { KanjiDecomposition } from "@/components/ai/KanjiDecomposition";
import { KanjiEtymology } from "@/components/ai/KanjiEtymology";

interface KanjiDetailClientProps {
  kanjiId: number;
  character: string;
  meaningMnemonicFr: string;
  readingMnemonicFr: string;
  customMeaningMnemonic?: string | null;
  customReadingMnemonic?: string | null;
}

export function KanjiDetailClient({
  kanjiId,
  character,
  meaningMnemonicFr,
  readingMnemonicFr,
  customMeaningMnemonic,
  customReadingMnemonic,
}: KanjiDetailClientProps) {
  const [meaningMnemonic, setMeaningMnemonic] = useState(customMeaningMnemonic || null);
  const [readingMnemonic, setReadingMnemonic] = useState(customReadingMnemonic || null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Visual Decomposition */}
      <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
        <KanjiDecomposition kanjiId={kanjiId} character={character} />
      </div>

      {/* Meaning Mnemonic with Personalization */}
      <div
        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 animate-slide-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-2">
            <span>💡</span> Mnemonique de sens
          </h4>
          <PersonalizedMnemonicButton
            itemType="kanji"
            itemId={kanjiId}
            mnemonicType="meaning"
            currentMnemonic={meaningMnemonicFr}
            onGenerated={(mnemonic) => setMeaningMnemonic(mnemonic)}
          />
        </div>
        {meaningMnemonic ? (
          <div className="space-y-2">
            <div className="bg-amber-100 rounded-lg p-3 border-l-4 border-amber-400 animate-fade-in">
              <p className="text-stone-700 leading-relaxed">{meaningMnemonic}</p>
            </div>
            <details className="text-sm">
              <summary className="text-stone-500 cursor-pointer hover:text-stone-700">
                Voir l&apos;original
              </summary>
              <p className="text-stone-500 mt-2 pl-4">{meaningMnemonicFr}</p>
            </details>
          </div>
        ) : (
          <p className="text-stone-700 leading-relaxed">{meaningMnemonicFr}</p>
        )}
      </div>

      {/* Reading Mnemonic with Personalization */}
      <div
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 animate-slide-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold text-purple-700 uppercase tracking-wide flex items-center gap-2">
            <span>🎵</span> Mnemonique de lecture
          </h4>
          <PersonalizedMnemonicButton
            itemType="kanji"
            itemId={kanjiId}
            mnemonicType="reading"
            currentMnemonic={readingMnemonicFr}
            onGenerated={(mnemonic) => setReadingMnemonic(mnemonic)}
          />
        </div>
        {readingMnemonic ? (
          <div className="space-y-2">
            <div className="bg-purple-100 rounded-lg p-3 border-l-4 border-purple-400 animate-fade-in">
              <p className="text-stone-700 leading-relaxed">{readingMnemonic}</p>
            </div>
            <details className="text-sm">
              <summary className="text-stone-500 cursor-pointer hover:text-stone-700">
                Voir l&apos;original
              </summary>
              <p className="text-stone-500 mt-2 pl-4">{readingMnemonicFr}</p>
            </details>
          </div>
        ) : (
          <p className="text-stone-700 leading-relaxed">{readingMnemonicFr}</p>
        )}
      </div>

      {/* Etymology */}
      <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
        <KanjiEtymology kanjiId={kanjiId} character={character} />
      </div>

      {/* CSS Animations with reduced motion support */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-slide-up {
          opacity: 0;
          animation: slide-up 0.4s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in,
          .animate-slide-up {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
