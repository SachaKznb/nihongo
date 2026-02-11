"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { UserProgress } from "@/types";

// Motivational messages based on context
const getMotivationalMessage = (streak: number, pendingReviews: number, todayReviews: number) => {
  if (streak >= 7) return "Une semaine complete ! Tu es en feu !";
  if (streak >= 3) return "Belle serie ! Continue comme ca !";
  if (pendingReviews > 0 && todayReviews === 0) return "Tes revisions t'attendent !";
  if (todayReviews >= 50) return "Impressionnant ! Tu maitrises !";
  if (todayReviews >= 20) return "Super progression aujourd'hui !";
  return "Chaque jour compte. Commence maintenant !";
};

// XP thresholds for levels
const getXpLevel = (xp: number) => {
  const levels = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5200, 6500, 8000, 10000];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) {
      const currentLevelXp = levels[i];
      const nextLevelXp = levels[i + 1] || levels[i] + 2000;
      const progress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
      return { level: i + 1, progress, nextLevelXp, currentLevelXp };
    }
  }
  return { level: 1, progress: 0, nextLevelXp: 100, currentLevelXp: 0 };
};

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [showStreakWarning, setShowStreakWarning] = useState(false);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch("/api/progress");
        const data = await response.json();
        setProgress(data);

        // Show streak warning if user has a streak and hasn't studied today
        if (data.gamification?.currentStreak > 0 && data.gamification?.todayReviews === 0) {
          setShowStreakWarning(true);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-stone-200 rounded-xl w-1/3"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-48 bg-stone-200 rounded-3xl"></div>
            <div className="h-48 bg-stone-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-stone-600">Erreur lors du chargement des donnees</p>
      </div>
    );
  }

  const gamification = progress.gamification;
  const xpInfo = getXpLevel(gamification.totalXp);
  const motivationalMessage = getMotivationalMessage(
    gamification.currentStreak,
    progress.pendingReviews,
    gamification.todayReviews
  );

  const totalItems = progress.srsBreakdown.apprentice + progress.srsBreakdown.guru +
    progress.srsBreakdown.master + progress.srsBreakdown.enlightened + progress.srsBreakdown.burned;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Streak Warning Banner - Loss Aversion */}
      {showStreakWarning && (
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg animate-slide-up">
          <div className="absolute inset-0 opacity-20 bg-white/5" style={{backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px"}}></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-streak-fire">🔥</span>
              <div>
                <p className="font-bold font-display text-lg">Ne perds pas ta serie de {gamification.currentStreak} jours !</p>
                <p className="text-amber-100 text-sm">Complete au moins une revision aujourd&apos;hui.</p>
              </div>
            </div>
            <button
              onClick={() => setShowStreakWarning(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header with Greeting & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-5xl font-japanese text-teal-600">進</span>
            <div>
              <h1 className="text-3xl font-bold font-display text-stone-900">Tableau de bord</h1>
              <p className="text-stone-500 font-display">Niveau {progress.currentLevel} • {motivationalMessage}</p>
            </div>
          </div>
        </div>

        {/* Live Activity Indicator - Social Proof */}
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-green-700">
            {gamification.activeLearners} apprenants actifs
          </span>
        </div>
      </div>

      {/* Gamification Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg card-hover">
          <div className="absolute -right-4 -top-4 text-6xl opacity-20">🔥</div>
          <div className="relative">
            <p className="text-amber-100 text-xs font-medium uppercase tracking-wide">Serie</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-display">{gamification.currentStreak}</span>
              <span className="text-amber-200 text-sm">jours</span>
            </div>
            {gamification.longestStreak > gamification.currentStreak && (
              <p className="text-amber-200 text-xs mt-1">Record: {gamification.longestStreak}</p>
            )}
          </div>
        </div>

        {/* XP */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-4 text-white shadow-lg card-hover">
          <div className="absolute -right-2 -top-2 text-5xl opacity-20">⚡</div>
          <div className="relative">
            <p className="text-emerald-100 text-xs font-medium uppercase tracking-wide">XP Total</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-display">{gamification.totalXp.toLocaleString()}</span>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-emerald-200 mb-1">
                <span>Niv. {xpInfo.level}</span>
                <span>{Math.round(xpInfo.progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${xpInfo.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl p-4 text-white shadow-lg card-hover">
          <div className="absolute -right-2 -top-2 text-5xl opacity-20">📊</div>
          <div className="relative">
            <p className="text-violet-100 text-xs font-medium uppercase tracking-wide">Aujourd&apos;hui</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-display">{gamification.todayReviews}</span>
              <span className="text-violet-200 text-sm">revisions</span>
            </div>
            <p className="text-violet-200 text-xs mt-1">
              {gamification.todayAccuracy}% de precision
            </p>
          </div>
        </div>

        {/* Perfect Days */}
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl p-4 text-white shadow-lg card-hover">
          <div className="absolute -right-2 -top-2 text-5xl opacity-20">✨</div>
          <div className="relative">
            <p className="text-rose-100 text-xs font-medium uppercase tracking-wide">Jours parfaits</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold font-display">{gamification.perfectDays}</span>
              <span className="text-rose-200 text-sm">100%</span>
            </div>
            <p className="text-rose-200 text-xs mt-1">Sans erreur</p>
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Lessons Card */}
        <Link href="/lessons" className="group">
          <div className="relative overflow-hidden bg-white rounded-3xl border-2 border-stone-200 p-6 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100/50 transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500"></div>
            <div className="absolute bottom-4 right-4 text-8xl font-japanese text-blue-100 group-hover:text-blue-200 transition-colors">学</div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 gradient-radical rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-6xl font-bold font-display text-stone-900">{progress.pendingLessons}</span>
                  {progress.pendingLessons > 0 && (
                    <div className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      +{progress.pendingLessons * 10} XP
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold font-display text-stone-900 mb-1">Lecons disponibles</h3>
              <p className="text-stone-500">Nouveaux elements a apprendre</p>
              {progress.pendingLessons > 0 && (
                <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                  <span>Commencer maintenant</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </Link>

        {/* Reviews Card */}
        <Link href="/reviews" className="group">
          <div className="relative overflow-hidden bg-white rounded-3xl border-2 border-stone-200 p-6 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-100/50 transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-500"></div>
            <div className="absolute bottom-4 right-4 text-8xl font-japanese text-orange-100 group-hover:text-orange-200 transition-colors">復</div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 gradient-orange rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <div className="text-right">
                  <span className="text-6xl font-bold font-display text-stone-900">{progress.pendingReviews}</span>
                  {progress.pendingReviews > 0 && (
                    <div className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      +{progress.pendingReviews * 5} XP
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold font-display text-stone-900 mb-1">Revisions en attente</h3>
              <p className="text-stone-500">Elements prets a reviser</p>
              {progress.pendingReviews > 0 && (
                <div className="mt-4 flex items-center gap-2 text-orange-600 font-medium group-hover:gap-3 transition-all">
                  <span>Reviser maintenant</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Level Progress */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-japanese text-indigo-500">級</span>
              <h3 className="font-bold font-display text-stone-900">Niveau {progress.currentLevel}</h3>
            </div>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              {gamification.levelProgress}% complete
            </span>
          </div>

          {/* Level progress bar */}
          <div className="mb-6">
            <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full gradient-level rounded-full transition-all duration-500"
                style={{ width: `${gamification.levelProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-stone-400 mt-2 text-center">
              90% des kanji au niveau Guru pour passer
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-500 flex items-center gap-2">
                  <span className="w-3 h-3 gradient-radical rounded-full"></span>
                  Radicaux
                </span>
                <span className="font-bold font-display text-stone-700">
                  {progress.learnedRadicals}/{progress.totalRadicals}
                </span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-radical rounded-full transition-all"
                  style={{ width: `${progress.totalRadicals > 0 ? (progress.learnedRadicals / progress.totalRadicals) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-500 flex items-center gap-2">
                  <span className="w-3 h-3 gradient-kanji rounded-full"></span>
                  Kanji
                </span>
                <span className="font-bold font-display text-stone-700">
                  {progress.learnedKanji}/{progress.totalKanji}
                </span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-kanji rounded-full transition-all"
                  style={{ width: `${progress.totalKanji > 0 ? (progress.learnedKanji / progress.totalKanji) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-stone-500 flex items-center gap-2">
                  <span className="w-3 h-3 gradient-vocab rounded-full"></span>
                  Vocabulaire
                </span>
                <span className="font-bold font-display text-stone-700">
                  {progress.learnedVocabulary}/{progress.totalVocabulary}
                </span>
              </div>
              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full gradient-vocab rounded-full transition-all"
                  style={{ width: `${progress.totalVocabulary > 0 ? (progress.learnedVocabulary / progress.totalVocabulary) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* SRS Breakdown */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-japanese text-purple-500">段</span>
              <h3 className="font-bold font-display text-stone-900">Repartition SRS</h3>
            </div>
            <span className="text-xs font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
              {totalItems} elements
            </span>
          </div>
          <div className="space-y-3">
            {[
              { label: "Apprenti", count: progress.srsBreakdown.apprentice, color: "bg-pink-500", emoji: "🌱" },
              { label: "Guru", count: progress.srsBreakdown.guru, color: "bg-purple-500", emoji: "🌿" },
              { label: "Maitre", count: progress.srsBreakdown.master, color: "bg-blue-500", emoji: "🌳" },
              { label: "Illumine", count: progress.srsBreakdown.enlightened, color: "bg-amber-500", emoji: "☀️" },
              { label: "Brule", count: progress.srsBreakdown.burned, color: "bg-stone-800", emoji: "🔥" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors">
                <span className="text-lg">{item.emoji}</span>
                <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                <span className="text-sm text-stone-600 flex-1 font-medium">{item.label}</span>
                <span className="text-sm font-bold font-display text-stone-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-japanese text-teal-500">時</span>
              <h3 className="font-bold font-display text-stone-900">Prochaines revisions</h3>
            </div>
            <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              24h
            </span>
          </div>
          <div className="space-y-2">
            {progress.upcomingReviews.length > 0 ? (
              progress.upcomingReviews.slice(0, 5).map((review, index) => {
                const hours = Math.round((new Date(review.time).getTime() - Date.now()) / (1000 * 60 * 60));
                if (review.count === 0) return null;
                return (
                  <div key={index} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-stone-50 transition-colors border-b border-stone-100 last:border-0">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-stone-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-stone-500">
                        Dans {hours < 1 ? "< 1" : hours}h
                      </span>
                    </div>
                    <span className="text-sm font-bold font-display text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                      +{review.count}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <span className="text-4xl mb-2 block">🎉</span>
                <p className="text-sm text-stone-400">
                  Aucune revision prevue
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Access with better styling */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-japanese text-stone-400">索</span>
          <h3 className="font-bold font-display text-stone-900">Acces rapide</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/radicals"
            className="flex items-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all hover:shadow-md hover:-translate-y-0.5 font-medium"
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Radicaux
          </Link>
          <Link
            href="/kanji"
            className="flex items-center gap-2 px-5 py-3 bg-pink-50 text-pink-700 rounded-xl hover:bg-pink-100 transition-all hover:shadow-md hover:-translate-y-0.5 font-medium"
          >
            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
            Kanji
          </Link>
          <Link
            href="/vocabulary"
            className="flex items-center gap-2 px-5 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all hover:shadow-md hover:-translate-y-0.5 font-medium"
          >
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Vocabulaire
          </Link>
          <Link
            href={`/levels/${progress.currentLevel}`}
            className="flex items-center gap-2 px-5 py-3 bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200 transition-all hover:shadow-md hover:-translate-y-0.5 font-medium"
          >
            <span className="w-2 h-2 bg-stone-500 rounded-full"></span>
            Niveau {progress.currentLevel}
          </Link>
        </div>
      </div>

      {/* Weekly Challenge / Goal - Variable Reward */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-200 text-sm font-medium uppercase tracking-wide mb-1">Objectif hebdomadaire</p>
            <h3 className="text-2xl font-bold font-display">Gagne {1000 - gamification.weeklyXp} XP de plus cette semaine</h3>
            <p className="text-indigo-200 mt-1">{gamification.weeklyXp} / 1000 XP</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(gamification.weeklyXp / 1000) * 251.2} 251.2`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold font-display">{Math.round((gamification.weeklyXp / 1000) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, (gamification.weeklyXp / 1000) * 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
