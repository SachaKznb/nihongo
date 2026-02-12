import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";
import { ReadingBadges } from "@/components/ReadingBadges";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function KanjiDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const kanjiId = parseInt(id);
  if (isNaN(kanjiId)) notFound();

  const kanji = await prisma.kanji.findUnique({
    where: { id: kanjiId },
    include: {
      level: true,
      radicals: {
        include: {
          radical: {
            include: {
              userProgress: {
                where: { userId: session.user.id },
              },
            },
          },
        },
      },
      vocabulary: {
        include: {
          vocabulary: {
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

  if (!kanji) notFound();

  const progress = kanji.userProgress[0];
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
        href="/kanji"
        className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux kanji
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 py-4 px-6 flex items-center justify-between">
          <span className="text-white text-sm font-semibold uppercase tracking-wide">
            Kanji - Niveau {kanji.levelId}
          </span>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLocked ? "bg-white/20 text-white" : `${SRS_STAGE_COLORS[stage]} text-white`
            }`}>
              {SRS_STAGE_NAMES[stage]}
            </span>
          </div>
        </div>

        {/* Character display */}
        <div className="py-16 px-4 text-center bg-gradient-to-b from-pink-50 to-white">
          <span className="text-9xl font-japanese text-stone-800">{kanji.character}</span>
        </div>

        {/* Details */}
        <div className="p-6 space-y-6">
          {/* Meanings */}
          <div className="text-center">
            <p className="text-3xl font-bold text-stone-900">{kanji.meaningsFr.join(", ")}</p>
          </div>

          {/* Component Radicals */}
          {kanji.radicals.length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.659-.663 47.703 47.703 0 00-.31-4.82 48.472 48.472 0 01-4.168.3.64.64 0 01-.656-.643v0z" />
                </svg>
                Composants (radicaux)
              </h4>
              <div className="flex flex-wrap gap-2">
                {kanji.radicals.map((kr) => {
                  const radProgress = kr.radical.userProgress[0];
                  const radStage = radProgress?.srsStage ?? 0;

                  return (
                    <Link
                      key={kr.radicalId}
                      href={`/radicals/${kr.radicalId}`}
                      className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {kr.radical.character ? (
                        <span className="text-xl font-japanese text-blue-600">{kr.radical.character}</span>
                      ) : kr.radical.imageUrl ? (
                        <img src={kr.radical.imageUrl} alt="" className="w-6 h-6" />
                      ) : null}
                      <span className="text-sm text-stone-600">{kr.radical.meaningFr}</span>
                      {radStage > 0 && (
                        <div className={`w-2 h-2 rounded-full ${SRS_STAGE_COLORS[radStage]}`} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Readings */}
          <div className="bg-stone-50 rounded-2xl p-4">
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Lectures
            </h4>
            <ReadingBadges
              readingsOn={kanji.readingsOn}
              readingsKun={kanji.readingsKun}
              size="lg"
            />
          </div>

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

          {/* Meaning Mnemonic */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
            <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span>💡</span> Mnemonique de sens
            </h4>
            {progress?.customMeaningMnemonic ? (
              <div className="space-y-2">
                <div className="bg-amber-100 rounded-lg p-3 border-l-4 border-amber-400">
                  <p className="text-stone-700 leading-relaxed">{progress.customMeaningMnemonic}</p>
                </div>
                <details className="text-sm">
                  <summary className="text-stone-500 cursor-pointer hover:text-stone-700">
                    Voir l'original
                  </summary>
                  <p className="text-stone-500 mt-2 pl-4">{kanji.meaningMnemonicFr}</p>
                </details>
              </div>
            ) : (
              <p className="text-stone-700 leading-relaxed">{kanji.meaningMnemonicFr}</p>
            )}
          </div>

          {/* Reading Mnemonic */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
            <h4 className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span>🎵</span> Mnemonique de lecture
            </h4>
            {progress?.customReadingMnemonic ? (
              <div className="space-y-2">
                <div className="bg-purple-100 rounded-lg p-3 border-l-4 border-purple-400">
                  <p className="text-stone-700 leading-relaxed">{progress.customReadingMnemonic}</p>
                </div>
                <details className="text-sm">
                  <summary className="text-stone-500 cursor-pointer hover:text-stone-700">
                    Voir l'original
                  </summary>
                  <p className="text-stone-500 mt-2 pl-4">{kanji.readingMnemonicFr}</p>
                </details>
              </div>
            ) : (
              <p className="text-stone-700 leading-relaxed">{kanji.readingMnemonicFr}</p>
            )}
          </div>

          {/* Related Vocabulary */}
          {kanji.vocabulary.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>📖</span> Vocabulaire associe ({kanji.vocabulary.length})
              </h4>
              <div className="space-y-2">
                {kanji.vocabulary.map((kv) => {
                  const vocabProgress = kv.vocabulary.userProgress[0];
                  const vocabStage = vocabProgress?.srsStage ?? 0;
                  const vocabLocked = vocabStage === 0;

                  return (
                    <Link
                      key={kv.vocabularyId}
                      href={`/vocabulary/${kv.vocabularyId}`}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all hover:shadow-md ${
                        vocabLocked ? "bg-gray-100" : "bg-purple-50 hover:bg-purple-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-japanese ${vocabLocked ? "text-gray-500" : "text-purple-700"}`}>
                          {kv.vocabulary.word}
                        </span>
                        <span className="text-sm text-stone-400 font-japanese">
                          {kv.vocabulary.readings[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-stone-600">{kv.vocabulary.meaningsFr[0]}</span>
                        {vocabStage > 0 && (
                          <div className={`w-2.5 h-2.5 rounded-full ${SRS_STAGE_COLORS[vocabStage]}`} />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
