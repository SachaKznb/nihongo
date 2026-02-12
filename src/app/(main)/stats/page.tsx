"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AccuracyChart,
  ReviewsChart,
  SRSDistribution,
  StreakCalendar,
  LevelProgress,
  ReviewForecast,
} from "@/components/stats";

interface StatsData {
  overview: {
    totalReviews: number;
    totalLessons: number;
    overallAccuracy: number;
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    weeklyXp: number;
    perfectDays: number;
    memberSince: string;
  };
  dailyStats: {
    date: string;
    reviews: number;
    lessons: number;
    accuracy: number;
  }[];
  srsDistribution: {
    apprentice: number;
    guru: number;
    master: number;
    enlightened: number;
    burned: number;
  };
  levelHistory: {
    level: number;
    reachedAt: string;
  }[];
  reviewForecast: {
    hour: string;
    count: number;
  }[];
  streakCalendar: {
    date: string;
    studied: boolean;
    reviews: number;
  }[];
  itemBreakdown: {
    radicals: { apprentice: number; guru: number; master: number; enlightened: number; burned: number };
    kanji: { apprentice: number; guru: number; master: number; enlightened: number; burned: number };
    vocabulary: { apprentice: number; guru: number; master: number; enlightened: number; burned: number };
  };
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats/user");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-stone-200 rounded-xl w-1/3"></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-stone-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-80 bg-stone-200 rounded-3xl"></div>
            <div className="h-80 bg-stone-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-stone-600">{error || "Erreur lors du chargement des statistiques"}</p>
          <Link href="/dashboard" className="text-purple-600 hover:underline mt-4 inline-block">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  const memberSince = new Date(stats.overview.memberSince);
  const daysSinceMember = Math.floor(
    (Date.now() - memberSince.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl font-japanese text-purple-600">統</span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
              Statistiques
            </h1>
            <p className="text-sm text-stone-500">
              Membre depuis {daysSinceMember} jours
            </p>
          </div>
        </div>
        <Link
          href="/leaderboard"
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors"
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
              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
            />
          </svg>
          Classement
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total XP */}
        <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-4 text-white shadow-lg">
          <p className="text-purple-100 text-xs font-medium uppercase tracking-wide">XP Total</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-display">
              {stats.overview.totalXp.toLocaleString()}
            </span>
          </div>
          <p className="text-purple-200 text-xs mt-1">
            +{stats.overview.weeklyXp} cette semaine
          </p>
        </div>

        {/* Accuracy */}
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 text-white shadow-lg">
          <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide">Précision</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-display">
              {stats.overview.overallAccuracy}%
            </span>
          </div>
          <p className="text-emerald-200 text-xs mt-1">
            {stats.overview.perfectDays} jours parfaits
          </p>
        </div>

        {/* Reviews */}
        <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl p-4 text-white shadow-lg">
          <p className="text-orange-100 text-xs font-medium uppercase tracking-wide">Révisions</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-display">
              {stats.overview.totalReviews.toLocaleString()}
            </span>
          </div>
          <p className="text-orange-200 text-xs mt-1">
            {stats.overview.totalLessons} leçons
          </p>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
          <p className="text-amber-100 text-xs font-medium uppercase tracking-wide">Série</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-display">
              {stats.overview.currentStreak}
            </span>
            <span className="text-amber-200 text-sm">jours</span>
          </div>
          <p className="text-amber-200 text-xs mt-1">
            Record: {stats.overview.longestStreak}
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Accuracy Over Time */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-japanese text-emerald-500">精</span>
            <h3 className="font-bold font-display text-stone-900">Précision (30 jours)</h3>
          </div>
          <AccuracyChart data={stats.dailyStats} />
        </div>

        {/* Reviews Per Day */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-japanese text-purple-500">復</span>
            <h3 className="font-bold font-display text-stone-900">Activité quotidienne</h3>
          </div>
          <ReviewsChart data={stats.dailyStats} />
        </div>
      </div>

      {/* SRS and Forecast Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* SRS Distribution */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-japanese text-indigo-500">段</span>
            <h3 className="font-bold font-display text-stone-900">Répartition SRS</h3>
          </div>
          <SRSDistribution data={stats.srsDistribution} />
        </div>

        {/* Review Forecast */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-japanese text-teal-500">予</span>
            <h3 className="font-bold font-display text-stone-900">Prévisions</h3>
          </div>
          <ReviewForecast data={stats.reviewForecast} />
        </div>
      </div>

      {/* Level Progress and Calendar */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Level Timeline */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-japanese text-violet-500">級</span>
            <h3 className="font-bold font-display text-stone-900">Progression de niveau</h3>
          </div>
          <LevelProgress
            data={stats.levelHistory}
            currentLevel={stats.overview.currentLevel}
          />
        </div>

        {/* Streak Calendar */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-japanese text-green-500">暦</span>
            <h3 className="font-bold font-display text-stone-900">Calendrier d&apos;activité</h3>
          </div>
          <StreakCalendar data={stats.streakCalendar} />
        </div>
      </div>

      {/* Item Breakdown */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl font-japanese text-rose-500">項</span>
          <h3 className="font-bold font-display text-stone-900">Détails par type</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Radicals */}
          <div>
            <h4 className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Radicaux
            </h4>
            <div className="space-y-2">
              {Object.entries(stats.itemBreakdown.radicals).map(([stage, count]) => (
                <div key={stage} className="flex justify-between text-sm">
                  <span className="text-stone-600 capitalize">{stage}</span>
                  <span className="font-medium text-stone-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kanji */}
          <div>
            <h4 className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-pink-500 rounded-full"></span>
              Kanji
            </h4>
            <div className="space-y-2">
              {Object.entries(stats.itemBreakdown.kanji).map(([stage, count]) => (
                <div key={stage} className="flex justify-between text-sm">
                  <span className="text-stone-600 capitalize">{stage}</span>
                  <span className="font-medium text-stone-900">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary */}
          <div>
            <h4 className="text-sm font-medium text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Vocabulaire
            </h4>
            <div className="space-y-2">
              {Object.entries(stats.itemBreakdown.vocabulary).map(([stage, count]) => (
                <div key={stage} className="flex justify-between text-sm">
                  <span className="text-stone-600 capitalize">{stage}</span>
                  <span className="font-medium text-stone-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
