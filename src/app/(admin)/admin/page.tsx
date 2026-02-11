import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

async function getStats() {
  const [
    totalUsers,
    activeUsers,
    suspendedUsers,
    unverifiedUsers,
    totalRadicals,
    totalKanji,
    totalVocabulary,
    totalLevels,
    totalReviews,
    recentReviews,
    recentRegistrations,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        lastStudyDate: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.user.count({ where: { isSuspended: true } }),
    prisma.user.count({ where: { emailVerified: null } }),
    prisma.radical.count(),
    prisma.kanji.count(),
    prisma.vocabulary.count(),
    prisma.level.count(),
    prisma.review.count(),
    prisma.review.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
      suspended: suspendedUsers,
      unverified: unverifiedUsers,
      recentRegistrations,
    },
    content: {
      radicals: totalRadicals,
      kanji: totalKanji,
      vocabulary: totalVocabulary,
      levels: totalLevels,
    },
    activity: {
      totalReviews,
      recentReviews,
    },
  };
}

function StatCard({
  title,
  value,
  subtitle,
  color = "stone",
}: {
  title: string;
  value: number;
  subtitle?: string;
  color?: "stone" | "amber" | "green" | "red" | "blue";
}) {
  const colorClasses = {
    stone: "bg-stone-100 text-stone-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-stone-500">{title}</p>
          <p className="text-3xl font-bold text-stone-900 mt-1">
            {value.toLocaleString("fr-FR")}
          </p>
          {subtitle && (
            <p className="text-sm text-stone-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
          <span className="text-lg font-bold">{value > 0 ? "+" : "0"}</span>
        </div>
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await getStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-500 mt-1">Vue d&apos;ensemble de l&apos;application</p>
      </div>

      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Utilisateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total"
            value={stats.users.total}
            color="blue"
          />
          <StatCard
            title="Actifs (7j)"
            value={stats.users.active}
            color="green"
          />
          <StatCard
            title="Nouveaux (7j)"
            value={stats.users.recentRegistrations}
            color="amber"
          />
          <StatCard
            title="Suspendus"
            value={stats.users.suspended}
            color="red"
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Contenu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Niveaux"
            value={stats.content.levels}
            color="stone"
          />
          <StatCard
            title="Radicaux"
            value={stats.content.radicals}
            color="amber"
          />
          <StatCard
            title="Kanji"
            value={stats.content.kanji}
            color="blue"
          />
          <StatCard
            title="Vocabulaire"
            value={stats.content.vocabulary}
            color="green"
          />
        </div>
      </section>

      {/* Activity Section */}
      <section>
        <h2 className="text-lg font-semibold text-stone-900 mb-4">Activite</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Reviews totales"
            value={stats.activity.totalReviews}
            color="blue"
          />
          <StatCard
            title="Reviews (24h)"
            value={stats.activity.recentReviews}
            color="green"
          />
        </div>
      </section>
    </div>
  );
}
