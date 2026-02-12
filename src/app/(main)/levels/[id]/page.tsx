import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { SRS_STAGE_COLORS, SRS_STAGE_NAMES } from "@/lib/srs";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LevelPage({ params }: Props) {
  const { id } = await params;
  const levelId = parseInt(id);
  const session = await auth();

  if (!session?.user?.id) return null;

  const level = await prisma.level.findUnique({
    where: { id: levelId },
    include: {
      radicals: {
        include: {
          userProgress: { where: { userId: session.user.id } },
        },
      },
      kanji: {
        include: {
          userProgress: { where: { userId: session.user.id } },
        },
      },
      vocabulary: {
        include: {
          userProgress: { where: { userId: session.user.id } },
        },
      },
    },
  });

  if (!level) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Niveau non trouvé
          </h2>
          <Link href="/dashboard" className="text-pink-600 hover:underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Niveau {levelId}
        </h1>
        <p className="text-gray-600">
          {level.radicals.length} radicaux, {level.kanji.length} kanji,{" "}
          {level.vocabulary.length} vocabulaire
        </p>
      </div>

      {/* Radicals */}
      {level.radicals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Radicaux</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {level.radicals.map((radical) => {
              const progress = radical.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <div
                  key={radical.id}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-japanese cursor-pointer transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-blue-500"
                  }`}
                  title={`${radical.meaningFr} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  {radical.character || "IMG"}
                  {stage > 0 && (
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${SRS_STAGE_COLORS[stage]}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Kanji */}
      {level.kanji.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Kanji</h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {level.kanji.map((k) => {
              const progress = k.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <div
                  key={k.id}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-japanese cursor-pointer transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-pink-500"
                  }`}
                  title={`${k.meaningsFr[0]} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  {k.character}
                  {stage > 0 && (
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${SRS_STAGE_COLORS[stage]}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Vocabulary */}
      {level.vocabulary.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Vocabulaire
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {level.vocabulary.map((vocab) => {
              const progress = vocab.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <div
                  key={vocab.id}
                  className={`relative rounded-lg p-3 text-white cursor-pointer transition-transform hover:scale-105 ${
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
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Link href="/dashboard" className="text-pink-600 hover:underline">
        &larr; Retour au tableau de bord
      </Link>
    </div>
  );
}
