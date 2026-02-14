"use client";

import { useState } from "react";
import { LessonItem } from "@/types";
import { playReading, playKanjiReading, playVocabReading } from "@/lib/audio";
import { ExampleSentences } from "@/components/vocabulary/ExampleSentences";

interface LessonCardProps {
  item: LessonItem;
  showMnemonic?: boolean;
  autoplayAudio?: boolean;
  onGenerateMnemonic?: (mnemonicType: "meaning" | "reading", forceRegenerate: boolean) => Promise<void>;
  isGenerating?: boolean;
  generatingType?: "meaning" | "reading" | null;
  showPersonalizedSentences?: boolean;
}

export function LessonCard({
  item,
  showMnemonic = true,
  autoplayAudio = true,
  onGenerateMnemonic,
  isGenerating = false,
  generatingType = null,
  showPersonalizedSentences = true,
}: LessonCardProps) {
  const [showDefaultMeaning, setShowDefaultMeaning] = useState(false);
  const [showDefaultReading, setShowDefaultReading] = useState(false);

  const hasMeaningCustom = !!item.customMnemonic;
  const hasReadingCustom = !!item.customReadingMnemonic;
  const handlePlayAudio = () => {
    if (item.type === "vocabulary" && item.readings && item.readings.length > 0 && item.character) {
      // Use pre-generated vocab audio
      playVocabReading(item.character, item.readings[0], item.id);
    } else if (item.type === "kanji" && item.character) {
      // Use pre-generated kanji audio (prefer on'yomi)
      if (item.readingsOn && item.readingsOn.length > 0) {
        playKanjiReading(item.character, item.readingsOn[0], "on");
      } else if (item.readingsKun && item.readingsKun.length > 0) {
        playKanjiReading(item.character, item.readingsKun[0], "kun");
      }
    } else if (item.readings && item.readings.length > 0) {
      // Fallback for other types
      playReading(item.readings[0]);
    } else if (item.readingsOn && item.readingsOn.length > 0) {
      playReading(item.readingsOn[0]);
    } else if (item.readingsKun && item.readingsKun.length > 0) {
      playReading(item.readingsKun[0]);
    }
  };

  const typeConfig = {
    radical: {
      bg: "gradient-radical",
      color: "blue",
      label: "Radical",
      headerBg: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    kanji: {
      bg: "gradient-kanji",
      color: "pink",
      label: "Kanji",
      headerBg: "bg-gradient-to-r from-pink-500 to-pink-600",
    },
    vocabulary: {
      bg: "gradient-vocab",
      color: "purple",
      label: "Vocabulaire",
      headerBg: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    grammar: {
      bg: "gradient-grammar",
      color: "teal",
      label: "Grammaire",
      headerBg: "bg-gradient-to-r from-teal-500 to-teal-600",
    },
  };

  const config = typeConfig[item.type];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Header with type */}
      <div className={`${config.headerBg} py-3 px-6 flex items-center justify-between`}>
        <span className="text-white text-sm font-semibold uppercase tracking-wide">
          {config.label}
        </span>
        {(item.readings || item.readingsOn || item.readingsKun) && (
          <button
            onClick={handlePlayAudio}
            className="text-white/80 hover:text-white transition-colors p-1"
            aria-label="Écouter la prononciation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </button>
        )}
      </div>

      {/* Character display */}
      <div className="py-12 px-4 text-center bg-gradient-to-b from-stone-50 to-white">
        {item.character ? (
          <span className="text-8xl font-japanese text-stone-800">{item.character}</span>
        ) : item.imageUrl ? (
          <img src={item.imageUrl} alt="Radical" className="w-28 h-28 mx-auto" />
        ) : (
          <span className="text-6xl text-gray-400">?</span>
        )}
      </div>

      {/* Details */}
      <div className="p-6 space-y-5">
        {/* Meanings */}
        <div className="text-center">
          <p className="text-2xl font-bold text-stone-900">
            {item.meaningsFr.join(", ")}
          </p>
        </div>

        {/* Component Radicals (for Kanji) */}
        {item.componentRadicals && item.componentRadicals.length > 0 && (
          <div className="bg-blue-50 rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82 48.472 48.472 0 01-4.168.3.64.64 0 01-.656-.643v0z" />
              </svg>
              Composants (radicaux)
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.componentRadicals.map((radical, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm">
                  {radical.character ? (
                    <span className="text-xl font-japanese text-blue-600">{radical.character}</span>
                  ) : radical.imageUrl ? (
                    <img src={radical.imageUrl} alt="" className="w-6 h-6" />
                  ) : null}
                  <span className="text-sm text-stone-600">{radical.meaningFr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Readings for kanji and vocabulary */}
        {(item.readingsOn || item.readingsKun || item.readings) && (
          <div className="bg-stone-50 rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Lecture(s)
            </h4>
            <div className="space-y-2">
              {item.readingsOn && item.readingsOn.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">On'yomi</span>
                  <span className="text-xl font-japanese text-stone-800">{item.readingsOn.join("、")}</span>
                </div>
              )}
              {item.readingsKun && item.readingsKun.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">Kun'yomi</span>
                  <span className="text-xl font-japanese text-stone-800">{item.readingsKun.join("、")}</span>
                </div>
              )}
              {item.readings && (
                <span className="text-xl font-japanese text-stone-800">{item.readings.join("、")}</span>
              )}
            </div>
          </div>
        )}

        {/* Mnemonic */}
        {showMnemonic && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide flex items-center gap-2">
                <span>💡</span> Mnémonique
              </h4>
              {onGenerateMnemonic && !hasMeaningCustom && (
                <button
                  onClick={() => onGenerateMnemonic("meaning", false)}
                  disabled={isGenerating}
                  className="text-xs text-amber-600 hover:text-amber-800 flex items-center gap-1 disabled:opacity-50 transition-colors"
                >
                  {isGenerating && generatingType === "meaning" ? (
                    <>
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creation...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>Creer avec l'IA</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {item.customMnemonic ? (
              <div className="space-y-2">
                <div className="bg-amber-100 rounded-lg p-3 border-l-4 border-amber-400">
                  <p className="text-stone-700 leading-relaxed text-sm font-medium">
                    {item.customMnemonic}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDefaultMeaning(!showDefaultMeaning)}
                    className="text-xs text-stone-500 hover:text-stone-700 flex items-center gap-1"
                  >
                    <svg className={`w-3 h-3 transition-transform ${showDefaultMeaning ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Voir l'original
                  </button>
                  {onGenerateMnemonic && (
                    <button
                      onClick={() => onGenerateMnemonic("meaning", true)}
                      disabled={isGenerating}
                      className="text-xs text-amber-600 hover:text-amber-800 flex items-center gap-1 disabled:opacity-50"
                    >
                      {isGenerating && generatingType === "meaning" ? (
                        <>
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Regeneration...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Regenerer (1 crédit)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                {showDefaultMeaning && (
                  <p className="text-stone-500 leading-relaxed text-sm pl-4">{item.mnemonic}</p>
                )}
              </div>
            ) : (
              <p className="text-stone-700 leading-relaxed">{item.mnemonic}</p>
            )}
          </div>
        )}

        {/* Reading mnemonic for kanji */}
        {showMnemonic && item.readingMnemonic && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-purple-700 uppercase tracking-wide flex items-center gap-2">
                <span>🎵</span> Mnémonique de lecture
              </h4>
              {onGenerateMnemonic && !hasReadingCustom && (
                <button
                  onClick={() => onGenerateMnemonic("reading", false)}
                  disabled={isGenerating}
                  className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 disabled:opacity-50 transition-colors"
                >
                  {isGenerating && generatingType === "reading" ? (
                    <>
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creation...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <span>Creer avec l'IA</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {item.customReadingMnemonic ? (
              <div className="space-y-2">
                <div className="bg-purple-100 rounded-lg p-3 border-l-4 border-purple-400">
                  <p className="text-stone-700 leading-relaxed text-sm font-medium">
                    {item.customReadingMnemonic}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDefaultReading(!showDefaultReading)}
                    className="text-xs text-stone-500 hover:text-stone-700 flex items-center gap-1"
                  >
                    <svg className={`w-3 h-3 transition-transform ${showDefaultReading ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Voir l'original
                  </button>
                  {onGenerateMnemonic && (
                    <button
                      onClick={() => onGenerateMnemonic("reading", true)}
                      disabled={isGenerating}
                      className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 disabled:opacity-50"
                    >
                      {isGenerating && generatingType === "reading" ? (
                        <>
                          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Regeneration...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Regenerer (1 crédit)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                {showDefaultReading && (
                  <p className="text-stone-500 leading-relaxed text-sm pl-4">{item.readingMnemonic}</p>
                )}
              </div>
            ) : (
              <p className="text-stone-700 leading-relaxed">{item.readingMnemonic}</p>
            )}
          </div>
        )}

        {/* Used in Kanji (for radicals) */}
        {item.usedInKanji && item.usedInKanji.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span>📚</span> Utilisé dans ces kanji
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.usedInKanji.map((kanji, i) => (
                <div key={i} className="flex items-center gap-2 bg-pink-50 rounded-xl px-3 py-2">
                  <span className="text-xl font-japanese text-pink-600">{kanji.character}</span>
                  <span className="text-sm text-stone-600">{kanji.meaningFr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Used in Vocabulary (for kanji) */}
        {item.usedInVocabulary && item.usedInVocabulary.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span>📖</span> Vocabulaire associé
            </h4>
            <div className="space-y-2">
              {item.usedInVocabulary.map((vocab, i) => (
                <div key={i} className="flex items-center justify-between bg-purple-50 rounded-xl px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-japanese text-purple-700">{vocab.word}</span>
                    <span className="text-sm text-stone-400 font-japanese">{vocab.reading}</span>
                  </div>
                  <span className="text-sm text-stone-600">{vocab.meaningFr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Example sentence for vocabulary */}
        {item.sentence && (
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-100">
            <h4 className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span>💬</span> Exemple
            </h4>
            <p className="text-lg font-japanese text-stone-800 mb-1">{item.sentence.jp}</p>
            <p className="text-stone-600">{item.sentence.fr}</p>
          </div>
        )}

        {/* Grammar-specific: Formation */}
        {item.type === "grammar" && item.formation && (
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-4 border border-cyan-100">
            <h4 className="text-xs font-semibold text-cyan-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span>📐</span> Formation
            </h4>
            <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{item.formation}</p>
            {item.formationNotes && (
              <p className="text-stone-500 text-sm mt-2 italic">{item.formationNotes}</p>
            )}
          </div>
        )}

        {/* Grammar-specific: Example sentences */}
        {item.type === "grammar" && item.exampleSentences && item.exampleSentences.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
            <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span>💬</span> Exemples
            </h4>
            <div className="space-y-3">
              {item.exampleSentences.map((sentence, i) => (
                <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-lg font-japanese text-stone-800 mb-1">{sentence.japanese}</p>
                  <p className="text-stone-600 text-sm">{sentence.french}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grammar-specific: Nuances */}
        {item.type === "grammar" && item.nuancesFr && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
            <h4 className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span>🎯</span> Nuances
            </h4>
            <p className="text-stone-700 leading-relaxed">{item.nuancesFr}</p>
          </div>
        )}

        {/* Personalized sentences for vocabulary */}
        {item.type === "vocabulary" && showPersonalizedSentences && (
          <ExampleSentences
            vocabularyId={item.id}
            collapsible={true}
            defaultExpanded={false}
            showRegenerate={true}
          />
        )}
      </div>
    </div>
  );
}
