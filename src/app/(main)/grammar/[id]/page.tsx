import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GrammarDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const grammarId = parseInt(id);
  if (isNaN(grammarId)) notFound();

  const grammar = await prisma.grammarPoint.findUnique({
    where: { id: grammarId },
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
      },
    },
  });

  if (!grammar) notFound();

  const progress = grammar.userProgress[0];
  const stage = progress?.srsStage ?? 0;
  const isLocked = stage === 0;

  // Parse example sentences
  const examples = grammar.exampleSentences as Array<{
    jp: string;
    reading?: string;
    fr: string;
  }>;

  // Calculate accuracies
  const total = (progress?.correctCount ?? 0) + (progress?.incorrectCount ?? 0);
  const accuracy = total > 0 ? Math.round((progress?.correctCount ?? 0) / total * 100) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/grammar"
        className="inline-flex items-center text-stone-600 hover:text-stone-900 mb-6"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour a la grammaire
      </Link>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold uppercase tracking-wide">
              Grammaire - Niveau {grammar.levelId}
            </span>
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              JLPT N{grammar.jlptLevel}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLocked ? "bg-white/20 text-white" : `${SRS_STAGE_COLORS[stage]} text-white`
            }`}>
              {SRS_STAGE_NAMES[stage]}
            </span>
          </div>
        </div>

        {/* Title display */}
        <div className="py-12 px-4 text-center bg-gradient-to-b from-indigo-50 to-white">
          <span className="text-5xl font-japanese text-stone-800 block mb-4">{grammar.titleJp}</span>
          <span className="text-2xl text-stone-600">{grammar.titleFr}</span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meaning */}
          <div className="bg-purple-50 rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-3">
              Signification
            </h4>
            <p className="text-stone-700 leading-relaxed">{grammar.meaningFr}</p>
          </div>

          {/* Formation */}
          <div className="bg-indigo-50 rounded-2xl p-5">
            <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-3">
              Formation
            </h4>
            <div className="font-mono text-stone-800 whitespace-pre-wrap bg-white rounded-lg p-4 border border-indigo-100">
              {grammar.formation}
            </div>
          </div>

          {/* Mnemonic */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <h4 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span>💡</span> Mnemonique
            </h4>
            <p className="text-stone-700 leading-relaxed">{grammar.mnemonicFr}</p>
          </div>

          {/* Example sentences */}
          {examples && examples.length > 0 && (
            <div className="bg-stone-50 rounded-2xl p-5">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-4">
                Exemples ({examples.length})
              </h4>
              <div className="space-y-4">
                {examples.map((ex, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-stone-200">
                    <p className="text-lg font-japanese text-stone-800 mb-1">{ex.jp}</p>
                    {ex.reading && (
                      <p className="text-sm text-stone-500 font-japanese mb-2">{ex.reading}</p>
                    )}
                    <p className="text-stone-600">{ex.fr}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress stats */}
          {!isLocked && (
            <div className="bg-stone-50 rounded-2xl p-5">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">
                Progression
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-xl">
                  <p className="text-lg font-bold text-emerald-600">{progress?.correctCount ?? 0}</p>
                  <p className="text-xs text-stone-400">Correct</p>
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <p className="text-lg font-bold text-rose-500">{progress?.incorrectCount ?? 0}</p>
                  <p className="text-xs text-stone-400">Incorrect</p>
                </div>
                <div className="text-center p-3 bg-white rounded-xl">
                  <p className="text-lg font-bold text-stone-700">{accuracy !== null ? `${accuracy}%` : "-"}</p>
                  <p className="text-xs text-stone-400">Precision</p>
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

          {/* Related grammar */}
          {grammar.relatedGrammar && grammar.relatedGrammar.length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-5">
              <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-3">
                Grammaire associee
              </h4>
              <p className="text-sm text-stone-500">
                Points lies: {grammar.relatedGrammar.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
