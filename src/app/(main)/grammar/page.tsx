import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { SRS_STAGE_NAMES, SRS_STAGE_COLORS } from "@/lib/srs";

export default async function GrammarPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const grammarPoints = await prisma.grammarPoint.findMany({
    include: {
      level: true,
      userProgress: {
        where: { userId: session.user.id },
      },
    },
    orderBy: [{ levelId: "asc" }, { id: "asc" }],
  });

  // Group by level
  const byLevel = grammarPoints.reduce((acc, gp) => {
    const levelId = gp.levelId;
    if (!acc[levelId]) acc[levelId] = [];
    acc[levelId].push(gp);
    return acc;
  }, {} as Record<number, typeof grammarPoints>);

  // Calculate stats
  const totalGrammar = grammarPoints.length;
  const learned = grammarPoints.filter(gp => (gp.userProgress[0]?.srsStage ?? 0) >= 1).length;
  const mastered = grammarPoints.filter(gp => (gp.userProgress[0]?.srsStage ?? 0) >= 5).length;

  // JLPT distribution
  const jlptCounts = grammarPoints.reduce((acc, gp) => {
    const level = `N${gp.jlptLevel}`;
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2 flex items-center gap-3">
          <span className="text-4xl font-japanese">文</span>
          Grammaire
        </h1>
        <p className="text-stone-600">
          Apprenez les points de grammaire japonaise avec le systeme SRS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <p className="text-2xl font-bold text-stone-900">{totalGrammar}</p>
          <p className="text-sm text-stone-500">Points total</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <p className="text-2xl font-bold text-teal-600">{learned}</p>
          <p className="text-sm text-stone-500">En cours</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <p className="text-2xl font-bold text-purple-600">{mastered}</p>
          <p className="text-sm text-stone-500">Maitrise</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200">
          <div className="flex gap-2 flex-wrap">
            {Object.entries(jlptCounts).map(([level, count]) => (
              <span key={level} className="text-xs bg-stone-100 px-2 py-1 rounded-full">
                {level}: {count}
              </span>
            ))}
          </div>
          <p className="text-sm text-stone-500 mt-1">Par JLPT</p>
        </div>
      </div>

      {/* Grammar by level */}
      <div className="space-y-6">
        {Object.entries(byLevel).map(([levelId, items]) => {
          const levelNum = parseInt(levelId);
          const levelProgress = items.filter(gp => (gp.userProgress[0]?.srsStage ?? 0) >= 5).length;
          const progressPercent = Math.round((levelProgress / items.length) * 100);

          return (
            <div key={levelId} className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {/* Level header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-white">Niveau {levelNum}</span>
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                      {items.length} points
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{progressPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Grammar items */}
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((gp) => {
                    const progress = gp.userProgress[0];
                    const stage = progress?.srsStage ?? 0;
                    const isLocked = stage === 0;

                    return (
                      <Link
                        key={gp.id}
                        href={`/grammar/${gp.id}`}
                        className={`group relative p-4 rounded-xl border transition-all hover:shadow-md ${
                          isLocked
                            ? "bg-stone-50 border-stone-200"
                            : "bg-white border-stone-200 hover:border-indigo-300"
                        }`}
                      >
                        {/* JLPT badge */}
                        <span className="absolute top-2 right-2 text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">
                          N{gp.jlptLevel}
                        </span>

                        {/* Title */}
                        <h3 className={`font-japanese text-lg mb-1 ${isLocked ? "text-stone-400" : "text-stone-900"}`}>
                          {gp.titleJp}
                        </h3>
                        <p className={`text-sm ${isLocked ? "text-stone-400" : "text-stone-600"}`}>
                          {gp.titleFr}
                        </p>

                        {/* Meaning preview */}
                        <p className="text-xs text-stone-400 mt-2 line-clamp-2">
                          {gp.meaningFr}
                        </p>

                        {/* SRS stage */}
                        {stage > 0 && (
                          <div className="mt-3 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${SRS_STAGE_COLORS[stage]}`} />
                            <span className="text-xs text-stone-500">{SRS_STAGE_NAMES[stage]}</span>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalGrammar === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <span className="text-6xl mb-4 block">文</span>
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Pas encore de grammaire</h3>
          <p className="text-stone-600">
            Le contenu de grammaire sera bientot disponible.
          </p>
        </div>
      )}
    </div>
  );
}
