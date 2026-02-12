import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function RadicalDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const radicalId = parseInt(id);
  if (isNaN(radicalId)) notFound();

  const radical = await prisma.radical.findUnique({
    where: { id: radicalId },
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

  if (!radical) notFound();

  const progress = radical.userProgress[0];
  const stage = progress?.srsStage ?? 0;
  const isLocked = stage === 0;

  // Calculate accuracy
  const totalReviews = (progress?.meaningCorrect ?? 0) + (progress?.meaningIncorrect ?? 0);
  const accuracy = totalReviews > 0
    ? Math.round((progress?.meaningCorrect ?? 0) / totalReviews * 100)
    : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/radicals"
        className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux radicaux
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6 flex items-center justify-between">
          <span className="text-white text-sm font-semibold uppercase tracking-wide">
            Radical - Niveau {radical.levelId}
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
        <div className="py-16 px-4 text-center bg-gradient-to-b from-blue-50 to-white">
          {radical.character ? (
            <span className="text-9xl font-japanese text-stone-800">{radical.character}</span>
          ) : radical.imageUrl ? (
            <img src={radical.imageUrl} alt={radical.meaningFr} className="w-32 h-32 mx-auto" />
          ) : (
            <span className="text-6xl text-gray-400">?</span>
          )}
        </div>

        {/* Details */}
        <div className="p-6 space-y-6">
          {/* Meaning */}
          <div className="text-center">
            <p className="text-3xl font-bold text-stone-900">{radical.meaningFr}</p>
            {radical.meaningHintFr && (
              <p className="text-stone-500 mt-2">{radical.meaningHintFr}</p>
            )}
          </div>

          {/* Progress stats */}
          {!isLocked && (
            <div className="bg-stone-50 rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
                Progression
              </h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{progress?.meaningCorrect ?? 0}</p>
                  <p className="text-xs text-stone-500">Correct</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-rose-500">{progress?.meaningIncorrect ?? 0}</p>
                  <p className="text-xs text-stone-500">Incorrect</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-700">{accuracy !== null ? `${accuracy}%` : "-"}</p>
                  <p className="text-xs text-stone-500">Precision</p>
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
                  <p className="text-stone-500 mt-2 pl-4">{radical.mnemonic}</p>
                </details>
              </div>
            ) : (
              <p className="text-stone-700 leading-relaxed">{radical.mnemonic}</p>
            )}
          </div>

          {/* Used in Kanji */}
          {radical.kanji.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span>📚</span> Utilise dans ces kanji ({radical.kanji.length})
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {radical.kanji.map((kj) => {
                  const kjProgress = kj.kanji.userProgress[0];
                  const kjStage = kjProgress?.srsStage ?? 0;
                  const kjLocked = kjStage === 0;

                  return (
                    <Link
                      key={kj.kanjiId}
                      href={`/kanji/${kj.kanjiId}`}
                      className={`relative aspect-square rounded-lg flex items-center justify-center text-white text-xl font-japanese transition-transform hover:scale-105 ${
                        kjLocked ? "bg-gray-400" : "bg-pink-500"
                      }`}
                      title={kj.kanji.meaningsFr[0]}
                    >
                      {kj.kanji.character}
                      {kjStage > 0 && (
                        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${SRS_STAGE_COLORS[kjStage]}`} />
                      )}
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
