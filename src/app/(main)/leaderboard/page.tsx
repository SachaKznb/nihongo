"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type LeaderboardType = "weekly" | "monthly" | "alltime" | "streak" | "level";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  level: number;
  value: number;
  currentStreak: number;
}

interface LeaderboardData {
  type: LeaderboardType;
  period?: { start: string; end: string };
  rankings: LeaderboardEntry[];
  currentUser?: {
    rank: number;
    value: number;
  };
}

const TABS: { type: LeaderboardType; label: string; emoji: string; valueLabel: string }[] = [
  { type: "weekly", label: "Cette semaine", emoji: "📅", valueLabel: "XP" },
  { type: "monthly", label: "Ce mois", emoji: "📆", valueLabel: "XP" },
  { type: "alltime", label: "Tout temps", emoji: "🏆", valueLabel: "XP" },
  { type: "streak", label: "Séries", emoji: "🔥", valueLabel: "jours" },
  { type: "level", label: "Niveaux", emoji: "🎯", valueLabel: "niveau" },
];

function getRankBadge(rank: number) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return `#${rank}`;
}

function getLevelColor(level: number) {
  if (level <= 3) return "bg-blue-100 text-blue-700";
  if (level <= 6) return "bg-purple-100 text-purple-700";
  if (level <= 9) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardType>("weekly");
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/stats/leaderboard?type=${activeTab}&limit=50`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const leaderboardData = await res.json();
        setData(leaderboardData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeaderboard();
  }, [activeTab]);

  const currentTab = TABS.find((t) => t.type === activeTab)!;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl font-japanese text-amber-500">競</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Classement
            </h1>
            <p className="text-sm text-stone-500">
              Compétez avec les autres apprenants
            </p>
          </div>
        </div>
        <Link
          href="/stats"
          className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          Mes stats
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.type
                ? "bg-purple-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Period Info */}
      {data?.period && (
        <div className="text-sm text-stone-500 text-center">
          Période: {new Date(data.period.start).toLocaleDateString("fr-FR")} -{" "}
          {new Date(data.period.end).toLocaleDateString("fr-FR")}
        </div>
      )}

      {/* Current User Rank */}
      {data?.currentUser && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
                {data.currentUser.rank <= 3 ? (
                  <span className="text-xl">{getRankBadge(data.currentUser.rank)}</span>
                ) : (
                  <span className="text-sm">#{data.currentUser.rank}</span>
                )}
              </div>
              <div>
                <p className="font-medium">Votre classement</p>
                <p className="text-purple-200 text-sm">
                  {data.currentUser.value.toLocaleString()} {currentTab.valueLabel}
                </p>
              </div>
            </div>
            {data.currentUser.rank > 10 && (
              <span className="text-purple-200 text-sm">
                Top {Math.round((data.currentUser.rank / 100) * 100)}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Not Opted In Message */}
      {!data?.currentUser && !isLoading && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div>
              <p className="font-medium text-amber-800">
                Vous n&apos;apparaissez pas dans le classement
              </p>
              <p className="text-sm text-amber-600 mt-1">
                Activez l&apos;option dans{" "}
                <Link href="/settings" className="underline hover:text-amber-800">
                  les paramètres
                </Link>{" "}
                pour apparaître dans le classement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full"></div>
                  <div className="flex-1 h-6 bg-stone-200 rounded"></div>
                  <div className="w-20 h-6 bg-stone-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-stone-500">{error}</div>
        ) : data?.rankings.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-4xl mb-4 block">🏜️</span>
            <p className="text-stone-500">Personne dans le classement pour le moment</p>
            <p className="text-sm text-stone-400 mt-2">Soyez le premier à apparaître !</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {data?.rankings.map((entry, index) => (
              <div
                key={entry.userId}
                className={`flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors ${
                  index < 3 ? "bg-gradient-to-r from-amber-50/50 to-transparent" : ""
                }`}
              >
                {/* Rank */}
                <div className="w-10 text-center">
                  {entry.rank <= 3 ? (
                    <span className="text-2xl">{getRankBadge(entry.rank)}</span>
                  ) : (
                    <span className="text-stone-500 font-medium">{entry.rank}</span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-900 truncate">
                      {entry.username}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${getLevelColor(
                        entry.level
                      )}`}
                    >
                      Nv.{entry.level}
                    </span>
                    {entry.currentStreak >= 7 && (
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <span>🔥</span>
                        {entry.currentStreak}
                      </span>
                    )}
                  </div>
                </div>

                {/* Value */}
                <div className="text-right">
                  <span className="font-bold text-stone-900">
                    {entry.value.toLocaleString()}
                  </span>
                  <span className="text-stone-400 text-sm ml-1">
                    {currentTab.valueLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Note */}
      <p className="text-center text-xs text-stone-400">
        Seuls les utilisateurs ayant activé l&apos;option de classement apparaissent ici.
        <br />
        Vos données ne sont jamais partagées sans votre consentement.
      </p>
    </div>
  );
}
