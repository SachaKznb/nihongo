import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

async function getAnalytics() {
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const [
    // User metrics
    totalUsers,
    activeToday,
    activeWeek,
    activeMonth,
    signupsWeek,
    optedInLeaderboard,

    // Retention - users who signed up 7+ days ago and were active this week
    usersSignedUp7DaysAgo,
    usersSignedUp7DaysAgoAndActive,
    usersSignedUp30DaysAgo,
    usersSignedUp30DaysAgoAndActive,

    // Content difficulty - most failed items
    difficultKanji,
    difficultRadicals,
    difficultVocab,

    // Level distribution
    levelDistribution,

    // Recent reviews for engagement stats
    recentReviews,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: { lastStudyDate: { gte: today } },
    }),
    prisma.user.count({
      where: { lastStudyDate: { gte: sevenDaysAgo } },
    }),
    prisma.user.count({
      where: { lastStudyDate: { gte: thirtyDaysAgo } },
    }),
    prisma.user.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.user.count({
      where: { leaderboardOptIn: true },
    }),

    // Day 7 retention
    prisma.user.count({
      where: {
        createdAt: { lte: sevenDaysAgo },
      },
    }),
    prisma.user.count({
      where: {
        createdAt: { lte: sevenDaysAgo },
        lastStudyDate: { gte: sevenDaysAgo },
      },
    }),

    // Day 30 retention
    prisma.user.count({
      where: {
        createdAt: { lte: thirtyDaysAgo },
      },
    }),
    prisma.user.count({
      where: {
        createdAt: { lte: thirtyDaysAgo },
        lastStudyDate: { gte: thirtyDaysAgo },
      },
    }),

    // Most difficult kanji (by incorrect/total ratio)
    prisma.$queryRaw<{ id: number; character: string; failRate: number }[]>`
      SELECT
        k.id,
        k.character,
        CASE WHEN (ukp."meaningCorrect" + ukp."meaningIncorrect" + ukp."readingCorrect" + ukp."readingIncorrect") > 0
          THEN ROUND(
            (ukp."meaningIncorrect"::numeric + ukp."readingIncorrect"::numeric) /
            (ukp."meaningCorrect" + ukp."meaningIncorrect" + ukp."readingCorrect" + ukp."readingIncorrect") * 100
          )
          ELSE 0
        END as "failRate"
      FROM "Kanji" k
      JOIN "UserKanjiProgress" ukp ON k.id = ukp."kanjiId"
      WHERE ukp."meaningCorrect" + ukp."meaningIncorrect" + ukp."readingCorrect" + ukp."readingIncorrect" >= 10
      GROUP BY k.id, k.character, ukp."meaningCorrect", ukp."meaningIncorrect", ukp."readingCorrect", ukp."readingIncorrect"
      ORDER BY "failRate" DESC
      LIMIT 10
    `,

    // Most difficult radicals
    prisma.$queryRaw<{ id: number; meaningFr: string; failRate: number }[]>`
      SELECT
        r.id,
        r."meaningFr",
        CASE WHEN (urp."meaningCorrect" + urp."meaningIncorrect") > 0
          THEN ROUND(
            urp."meaningIncorrect"::numeric /
            (urp."meaningCorrect" + urp."meaningIncorrect") * 100
          )
          ELSE 0
        END as "failRate"
      FROM "Radical" r
      JOIN "UserRadicalProgress" urp ON r.id = urp."radicalId"
      WHERE urp."meaningCorrect" + urp."meaningIncorrect" >= 10
      GROUP BY r.id, r."meaningFr", urp."meaningCorrect", urp."meaningIncorrect"
      ORDER BY "failRate" DESC
      LIMIT 10
    `,

    // Most difficult vocabulary
    prisma.$queryRaw<{ id: number; word: string; failRate: number }[]>`
      SELECT
        v.id,
        v.word,
        CASE WHEN (uvp."meaningCorrect" + uvp."meaningIncorrect" + uvp."readingCorrect" + uvp."readingIncorrect") > 0
          THEN ROUND(
            (uvp."meaningIncorrect"::numeric + uvp."readingIncorrect"::numeric) /
            (uvp."meaningCorrect" + uvp."meaningIncorrect" + uvp."readingCorrect" + uvp."readingIncorrect") * 100
          )
          ELSE 0
        END as "failRate"
      FROM "Vocabulary" v
      JOIN "UserVocabularyProgress" uvp ON v.id = uvp."vocabularyId"
      WHERE uvp."meaningCorrect" + uvp."meaningIncorrect" + uvp."readingCorrect" + uvp."readingIncorrect" >= 10
      GROUP BY v.id, v.word, uvp."meaningCorrect", uvp."meaningIncorrect", uvp."readingCorrect", uvp."readingIncorrect"
      ORDER BY "failRate" DESC
      LIMIT 10
    `,

    // Level distribution
    prisma.user.groupBy({
      by: ["currentLevel"],
      _count: true,
      orderBy: { currentLevel: "asc" },
    }),

    // Recent reviews for engagement
    prisma.review.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { correct: true },
    }),
  ]);

  // Calculate engagement metrics
  const avgAccuracy = recentReviews.length > 0
    ? Math.round((recentReviews.filter(r => r.correct).length / recentReviews.length) * 100)
    : 0;

  const avgDailyReviews = Math.round(recentReviews.length / 7);

  // Calculate retention rates
  const day7Retention = usersSignedUp7DaysAgo > 0
    ? Math.round((usersSignedUp7DaysAgoAndActive / usersSignedUp7DaysAgo) * 100)
    : 0;

  const day30Retention = usersSignedUp30DaysAgo > 0
    ? Math.round((usersSignedUp30DaysAgoAndActive / usersSignedUp30DaysAgo) * 100)
    : 0;

  return {
    userGrowth: {
      totalUsers,
      activeToday,
      activeWeek,
      activeMonth,
      signupsWeek,
      optedInLeaderboard,
    },
    engagement: {
      avgDailyReviews,
      avgAccuracy,
      totalReviewsWeek: recentReviews.length,
    },
    retention: {
      day7: day7Retention,
      day30: day30Retention,
    },
    contentDifficulty: {
      kanji: difficultKanji,
      radicals: difficultRadicals,
      vocabulary: difficultVocab,
    },
    levelDistribution: levelDistribution.map(l => ({
      level: l.currentLevel,
      count: l._count,
    })),
  };
}

function StatCard({
  title,
  value,
  suffix,
  color = "stone",
}: {
  title: string;
  value: number | string;
  suffix?: string;
  color?: "stone" | "amber" | "green" | "red" | "blue" | "purple";
}) {
  const colorClasses = {
    stone: "bg-stone-100 text-stone-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
      <p className="text-sm text-stone-500">{title}</p>
      <div className="flex items-baseline gap-1 mt-1">
        <p className="text-3xl font-bold text-stone-900">{value}</p>
        {suffix && <span className="text-stone-500 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

function DifficultyTable({
  title,
  items,
  itemKey,
}: {
  title: string;
  items: { id: number; [key: string]: string | number }[];
  itemKey: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-stone-200">
        <h3 className="font-semibold text-stone-900">{title}</h3>
      </div>
      <div className="divide-y divide-stone-100">
        {items.length === 0 ? (
          <p className="px-6 py-4 text-stone-500 text-sm">Pas assez de données</p>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className="px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-stone-400 text-sm w-6">{index + 1}.</span>
                <span className="font-medium text-stone-900">{item[itemKey]}</span>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                {item.failRate}% erreur
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default async function AdminAnalytics() {
  await requireAdmin();
  const analytics = await getAnalytics();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Analytiques</h1>
        <p className="text-stone-500 mt-1">Metriques detaillees de l&apos;application</p>
      </div>

      {/* User Growth */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Croissance utilisateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total"
            value={analytics.userGrowth.totalUsers}
            color="blue"
          />
          <StatCard
            title="Actifs aujourd'hui"
            value={analytics.userGrowth.activeToday}
            color="green"
          />
          <StatCard
            title="Actifs (7j)"
            value={analytics.userGrowth.activeWeek}
            color="green"
          />
          <StatCard
            title="Actifs (30j)"
            value={analytics.userGrowth.activeMonth}
            color="amber"
          />
          <StatCard
            title="Nouveaux (7j)"
            value={analytics.userGrowth.signupsWeek}
            color="purple"
          />
          <StatCard
            title="Classement actif"
            value={analytics.userGrowth.optedInLeaderboard}
            color="stone"
          />
        </div>
      </section>

      {/* Engagement */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Engagement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Reviews/jour (moy.)"
            value={analytics.engagement.avgDailyReviews}
            color="blue"
          />
          <StatCard
            title="Precision moyenne"
            value={analytics.engagement.avgAccuracy}
            suffix="%"
            color="green"
          />
          <StatCard
            title="Reviews cette semaine"
            value={analytics.engagement.totalReviewsWeek.toLocaleString()}
            color="purple"
          />
        </div>
      </section>

      {/* Retention */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Retention</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Retention J+7"
            value={analytics.retention.day7}
            suffix="%"
            color={analytics.retention.day7 >= 30 ? "green" : analytics.retention.day7 >= 15 ? "amber" : "red"}
          />
          <StatCard
            title="Retention J+30"
            value={analytics.retention.day30}
            suffix="%"
            color={analytics.retention.day30 >= 20 ? "green" : analytics.retention.day30 >= 10 ? "amber" : "red"}
          />
        </div>
        <p className="text-sm text-stone-500 mt-2">
          % d&apos;utilisateurs inscrits il y a X jours qui ont été actifs cette semaine
        </p>
      </section>

      {/* Level Distribution */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Distribution par niveau</h2>
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
          <div className="flex items-end gap-2 h-40">
            {analytics.levelDistribution.map((level) => {
              const maxCount = Math.max(...analytics.levelDistribution.map(l => l.count));
              const height = maxCount > 0 ? (level.count / maxCount) * 100 : 0;
              return (
                <div key={level.level} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-stone-500">{level.count}</span>
                  <div
                    className="w-full bg-purple-500 rounded-t"
                    style={{ height: `${height}%`, minHeight: level.count > 0 ? '4px' : '0' }}
                  />
                  <span className="text-xs text-stone-600">Nv.{level.level}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Difficulty */}
      <section>
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Contenu difficile</h2>
        <p className="text-sm text-stone-500 mb-4">
          Elements avec le plus haut taux d&apos;erreur (minimum 10 reviews)
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DifficultyTable
            title="Kanji difficiles"
            items={analytics.contentDifficulty.kanji as { id: number; character: string; failRate: number }[]}
            itemKey="character"
          />
          <DifficultyTable
            title="Radicaux difficiles"
            items={analytics.contentDifficulty.radicals as { id: number; meaningFr: string; failRate: number }[]}
            itemKey="meaningFr"
          />
          <DifficultyTable
            title="Vocabulaire difficile"
            items={analytics.contentDifficulty.vocabulary as { id: number; word: string; failRate: number }[]}
            itemKey="word"
          />
        </div>
      </section>
    </div>
  );
}
