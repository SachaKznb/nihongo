import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";
import { ExampleSentences } from "@/components/vocabulary/ExampleSentences";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VocabularyDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const vocabularyId = parseInt(id);
  if (isNaN(vocabularyId)) notFound();

  const vocabulary = await prisma.vocabulary.findUnique({
    where: { id: vocabularyId },
    include: {
      level: true,
      kanji: {
        include: {
          kanji: {
            include: {
              userProgress: {
                where: { userId: session.user.id },
              },
            },
          },
        },
      },
      userProgress: {
        where: { userId: session.user.id },
      },
    },
  });

  if (!vocabulary) notFound();

  // Check if user has personalized sentences enabled
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { levelAwareSentencesEnabled: true },
  });

  const progress = vocabulary.userProgress[0];
  const stage = progress?.srsStage ?? 0;
  const isLocked = stage === 0;

  // Calculate accuracies
  const meaningTotal = (progress?.meaningCorrect ?? 0) + (progress?.meaningIncorrect ?? 0);
  const meaningAccuracy = meaningTotal > 0
    ? Math.round((progress?.meaningCorrect ?? 0) / meaningTotal * 100)
    : null;

  const readingTotal = (progress?.readingCorrect ?? 0) + (progress?.readingIncorrect ?? 0);
  const readingAccuracy = readingTotal > 0
    ? Math.round((progress?.readingCorrect ?? 0) / readingTotal * 100)
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/vocabulary"
        className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour au vocabulaire
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-4 px-6 flex items-center justify-between">
          <span className="text-white text-sm font-semibold uppercase tracking-wide">
            Vocabulaire - Niveau {vocabulary.levelId}
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLocked ? "bg-white/20 text-white" : `${SRS_STAGE_COLORS[stage]} text-white`
            }`}>
              {SRS_STAGE_NAMES[stage]}
            </span>
          </div>
        </div>

        {/* Word display */}
        <div className="py-16 px-4 text-center bg-gradient-to-b from-purple-50 to-white">
          <span className="text-7xl sm:text-8xl font-japanese text-stone-800">{vocabulary.word}</span>
          <p className="text-2xl font-japanese text-stone-500 mt-4">{vocabulary.readings.join("、")}</p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-6">
          {/* Meanings */}
          <div className="text-center">
            <p className="text-3xl font-bold text-stone-900">{vocabulary.meaningsFr.join(", ")}</p>
          </div>

          {/* Component Kanji */}
          {vocabulary.kanji.length > 0 && (
            <div className="bg-pink-50 rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-pink-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                Kanji composants
              </h4>
              <div className="flex flex-wrap gap-2">
                {vocabulary.kanji.map((vk) => {
                  const kanjiProgress = vk.kanji.userProgress[0];
                  const kanjiStage = kanjiProgress?.srsStage ?? 0;

                  return (
                    <Link
                      key={vk.kanjiId}
                      href={`/kanji/${vk.kanjiId}`}
                      className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-xl font-japanese text-pink-600">{vk.kanji.character}</span>
                      <span className="text-sm text-stone-600">{vk.kanji.meaningsFr[0]}</span>
                      {kanjiStage > 0 && (
                        <div className={`w-2 h-2 rounded-full ${SRS_STAGE_COLORS[kanjiStage]}`} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Progress stats */}
          {!isLocked && (
            <div className="bg-stone-50 rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
                Progression
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white rounded-xl">
                  <p className="text-xs text-stone-500 mb-2">Sens</p>
                  <div className="flex justify-center gap-4">
                    <div>
                      <p className="text-lg font-bold text-emerald-600">{progress?.meaningCorrect ?? 0}</p>
                      <p className="text-xs text-stone-400">Correct</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-rose-500">{progress?.meaningIncorrect ?? 0}</p>
                      <p className="text-xs text-stone-400">Incorrect</p>
                    </div>
                  </div>
                  {meaningAccuracy !== null && (
                    <p className="text-sm font-medium text-stone-600 mt-2">{meaningAccuracy}% precision</p>
                  )}
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <p className="text-xs text-stone-500 mb-2">Lecture</p>
                  <div className="flex justify-center gap-4">
                    <div>
                      <p className="text-lg font-bold text-emerald-600">{progress?.readingCorrect ?? 0}</p>
                      <p className="text-xs text-stone-400">Correct</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-rose-500">{progress?.readingIncorrect ?? 0}</p>
                      <p className="text-xs text-stone-400">Incorrect</p>
                    </div>
                  </div>
                  {readingAccuracy !== null && (
                    <p className="text-sm font-medium text-stone-600 mt-2">{readingAccuracy}% precision</p>
                  )}
                </div>
              </div>
              {progress?.nextReviewAt && (
                <p className="text-xs text-stone-500 text-center mt-3">
                  Prochaine revision: {new Date(progress.nextReviewAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              )}
            </div>
          )}

          {/* Mnemonic */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
            <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span>💡</span> Mnemonique
            </h4>
            {progress?.customMnemonic ? (
              <div className="space-y-2">
                <div className="bg-amber-100 rounded-lg p-3 border-l-4 border-amber-400">
                  <p className="text-stone-700 leading-relaxed">{progress.customMnemonic}</p>
                </div>
                <details className="text-sm">
                  <summary className="text-stone-500 cursor-pointer hover:text-stone-700">
                    Voir l'original
                  </summary>
                  <p className="text-stone-500 mt-2 pl-4">{vocabulary.mnemonicFr}</p>
                </details>
              </div>
            ) : (
              <p className="text-stone-700 leading-relaxed">{vocabulary.mnemonicFr}</p>
            )}
          </div>

          {/* Static Example Sentence */}
          {vocabulary.sentenceJp && vocabulary.sentenceFr && (
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-100">
              <h4 className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span>💬</span> Exemple
              </h4>
              <p className="text-lg font-japanese text-stone-800 mb-1">{vocabulary.sentenceJp}</p>
              <p className="text-stone-600">{vocabulary.sentenceFr}</p>
            </div>
          )}

          {/* Personalized Example Sentences */}
          {user?.levelAwareSentencesEnabled && !isLocked && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>✨</span> Exemples personnalises
              </h4>
              <ExampleSentences
                vocabularyId={vocabulary.id}
                collapsible={false}
                showRegenerate={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
