import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { SRS_STAGE_COLORS, SRS_STAGE_NAMES } from "@/lib/srs";

export default async function VocabularyPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const vocabulary = await prisma.vocabulary.findMany({
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
      },
    },
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
  });

  const groupedByLevel = vocabulary.reduce((acc, vocab) => {
    const levelId = vocab.levelId;
    if (!acc[levelId]) {
      acc[levelId] = [];
    }
    acc[levelId].push(vocab);
    return acc;
  }, {} as Record<number, typeof vocabulary>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vocabulaire</h1>
        <p className="text-gray-600">
          Les mots de vocabulaire utilisant les kanji appris
        </p>
      </div>

      {Object.entries(groupedByLevel).map(([levelId, levelVocab]) => (
        <div key={levelId} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Niveau {levelId}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {levelVocab.map((vocab) => {
              const progress = vocab.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <Link
                  key={vocab.id}
                  href={`/vocabulary/${vocab.id}`}
                  className={`relative rounded-lg p-3 text-white transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-purple-500"
                  }`}
                  title={`${vocab.meaningsFr[0]} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  <div className="text-xl font-japanese mb-1">{vocab.word}</div>
                  <div className="text-sm opacity-80">{vocab.meaningsFr[0]}</div>
                  {stage > 0 && (
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${SRS_STAGE_COLORS[stage]}`}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {Object.keys(groupedByLevel).length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-600">Aucun vocabulaire disponible</p>
          <Link href="/dashboard" className="text-pink-600 hover:underline mt-4 inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      )}
    </div>
  );
}
