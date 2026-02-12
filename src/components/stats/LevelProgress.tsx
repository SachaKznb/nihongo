"use client";

interface LevelEntry {
  level: number;
  reachedAt: string;
}

interface LevelProgressProps {
  data: LevelEntry[];
  currentLevel: number;
}

export function LevelProgress({ data, currentLevel }: LevelProgressProps) {
  if (data.length === 0) {
    return (
      <div className="text-gray-400 text-sm">
        Aucune progression de niveau enregistrée
      </div>
    );
  }

  // Calculate time between levels
  const levelsWithDuration = data.map((entry, index) => {
    const prevDate = index > 0 ? new Date(data[index - 1].reachedAt) : null;
    const currentDate = new Date(entry.reachedAt);
    const daysToReach = prevDate
      ? Math.round(
          (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

    return {
      ...entry,
      daysToReach,
      formattedDate: currentDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  });

  return (
    <div className="w-full">
      {/* Timeline */}
      <div className="relative">
        {levelsWithDuration.map((entry, index) => (
          <div key={entry.level} className="flex items-start mb-4 last:mb-0">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center mr-4">
              <div
                className={`w-4 h-4 rounded-full ${
                  entry.level === currentLevel
                    ? "bg-purple-500 ring-4 ring-purple-500/20"
                    : "bg-gray-600"
                }`}
              />
              {index < levelsWithDuration.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-700" />
              )}
            </div>

            {/* Level info */}
            <div className="flex-1 -mt-1">
              <div className="flex items-center gap-2">
                <span
                  className={`font-bold ${
                    entry.level === currentLevel
                      ? "text-purple-400"
                      : "text-gray-300"
                  }`}
                >
                  Niveau {entry.level}
                </span>
                {entry.level === currentLevel && (
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                    Actuel
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {entry.formattedDate}
                {entry.daysToReach > 0 && (
                  <span className="ml-2 text-gray-600">
                    ({entry.daysToReach} jour{entry.daysToReach > 1 ? "s" : ""})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats summary */}
      {data.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Temps moyen par niveau</span>
              <p className="text-gray-300 font-medium">
                {Math.round(
                  levelsWithDuration
                    .filter((l) => l.daysToReach > 0)
                    .reduce((sum, l) => sum + l.daysToReach, 0) /
                    Math.max(
                      1,
                      levelsWithDuration.filter((l) => l.daysToReach > 0).length
                    )
                )}{" "}
                jours
              </p>
            </div>
            <div>
              <span className="text-gray-500">Niveau le plus rapide</span>
              <p className="text-gray-300 font-medium">
                {levelsWithDuration.filter((l) => l.daysToReach > 0).length > 0
                  ? `${Math.min(
                      ...levelsWithDuration
                        .filter((l) => l.daysToReach > 0)
                        .map((l) => l.daysToReach)
                    )} jours`
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
