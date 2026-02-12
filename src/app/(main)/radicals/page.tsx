import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { SRS_STAGE_COLORS, SRS_STAGE_NAMES } from "@/lib/srs";

export default async function RadicalsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const radicals = await prisma.radical.findMany({
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
      },
    },
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
  });

  const groupedByLevel = radicals.reduce((acc, radical) => {
    const levelId = radical.levelId;
    if (!acc[levelId]) {
      acc[levelId] = [];
    }
    acc[levelId].push(radical);
    return acc;
  }, {} as Record<number, typeof radicals>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Radicaux</h1>
        <p className="text-gray-600">
          Les radicaux sont les composants de base des kanji
        </p>
      </div>

      {Object.entries(groupedByLevel).map(([levelId, levelRadicals]) => (
        <div key={levelId} className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Niveau {levelId}
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {levelRadicals.map((radical) => {
              const progress = radical.userProgress[0];
              const stage = progress?.srsStage ?? 0;
              const isLocked = stage === 0;

              return (
                <Link
                  key={radical.id}
                  href={`/radicals/${radical.id}`}
                  className={`relative aspect-square rounded-lg flex items-center justify-center text-white text-2xl font-japanese transition-transform hover:scale-105 ${
                    isLocked ? "bg-gray-400" : "bg-blue-500"
                  }`}
                  title={`${radical.meaningFr} - ${SRS_STAGE_NAMES[stage]}`}
                >
                  {radical.character || (
                    <span className="text-sm">IMG</span>
                  )}
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
          <p className="text-gray-600">Aucun radical disponible</p>
          <Link href="/dashboard" className="text-pink-600 hover:underline mt-4 inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      )}
    </div>
  );
}
