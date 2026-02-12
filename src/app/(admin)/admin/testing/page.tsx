"use client";

import { useState } from "react";
import Link from "next/link";

type ActionResult = {
  success?: boolean;
  error?: string;
  message?: string;
};

export default function AdminTestingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [result, setResult] = useState<ActionResult | null>(null);

  // Form states
  const [resetScope, setResetScope] = useState<"all" | "level" | "type">("all");
  const [resetLevelId, setResetLevelId] = useState(1);
  const [resetItemType, setResetItemType] = useState("radical");

  const [srsItemType, setSrsItemType] = useState("radical");
  const [srsItemIds, setSrsItemIds] = useState("");
  const [srsStage, setSrsStage] = useState(1);

  const [mistakePattern, setMistakePattern] = useState<"visual" | "reading" | "translation">("visual");

  const executeAction = async (action: string, params: Record<string, unknown> = {}) => {
    setLoading(action);
    setResult(null);

    try {
      const res = await fetch("/api/admin/testing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...params }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Erreur reseau" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outils de test</h1>
          <p className="text-gray-600 mt-1">
            Manipuler votre progression pour tester les fonctionnalites
          </p>
        </div>
        <Link
          href="/admin"
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Retour au dashboard
        </Link>
      </div>

      {/* Result Banner */}
      {result && (
        <div
          className={`p-4 rounded-xl ${
            result.success
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {result.message || result.error}
        </div>
      )}

      {/* Demo Mode - Most Important */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Mode Demo</h2>
            <p className="text-indigo-100 mb-4 max-w-lg">
              Configure instantanement un etat realiste pour les demos : niveau 2,
              des revisions en attente, des lecons disponibles, et des erreurs
              pour tester la detection de patterns.
            </p>
            <button
              onClick={() => executeAction("setup_demo_mode")}
              disabled={loading === "setup_demo_mode"}
              className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-50"
            >
              {loading === "setup_demo_mode" ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full"></span>
                  Configuration...
                </span>
              ) : (
                "Activer le mode demo"
              )}
            </button>
          </div>
          <span className="text-6xl opacity-50">🎬</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reset Progress */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🔄</span>
            <h2 className="text-lg font-bold text-gray-900">Reinitialiser la progression</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portee
              </label>
              <select
                value={resetScope}
                onChange={(e) => setResetScope(e.target.value as "all" | "level" | "type")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">Tout reinitialiser</option>
                <option value="level">Par niveau</option>
                <option value="type">Par type</option>
              </select>
            </div>

            {resetScope === "level" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={resetLevelId}
                  onChange={(e) => setResetLevelId(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}

            {resetScope === "type" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={resetItemType}
                  onChange={(e) => setResetItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="radical">Radicaux</option>
                  <option value="kanji">Kanji</option>
                  <option value="vocabulary">Vocabulaire</option>
                </select>
              </div>
            )}

            <button
              onClick={() =>
                executeAction("reset_progress", {
                  scope: resetScope,
                  levelId: resetScope === "level" ? resetLevelId : undefined,
                  itemType: resetScope === "type" ? resetItemType : undefined,
                })
              }
              disabled={!!loading}
              className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading === "reset_progress" ? "Reinitialisation..." : "Reinitialiser"}
            </button>
          </div>
        </div>

        {/* Set SRS Stage */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📊</span>
            <h2 className="text-lg font-bold text-gray-900">Modifier le stage SRS</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={srsItemType}
                onChange={(e) => setSrsItemType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="radical">Radical</option>
                <option value="kanji">Kanji</option>
                <option value="vocabulary">Vocabulaire</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IDs (separes par des virgules)
              </label>
              <input
                type="text"
                value={srsItemIds}
                onChange={(e) => setSrsItemIds(e.target.value)}
                placeholder="1, 2, 3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage SRS
              </label>
              <select
                value={srsStage}
                onChange={(e) => setSrsStage(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value={0}>0 - Verrouille</option>
                <option value={1}>1 - Apprenti 1</option>
                <option value={2}>2 - Apprenti 2</option>
                <option value={3}>3 - Apprenti 3</option>
                <option value={4}>4 - Apprenti 4</option>
                <option value={5}>5 - Guru 1</option>
                <option value={6}>6 - Guru 2</option>
                <option value={7}>7 - Maitre</option>
                <option value={8}>8 - Shodan</option>
                <option value={9}>9 - Satori (termine)</option>
              </select>
            </div>

            <button
              onClick={() =>
                executeAction("set_srs_stage", {
                  itemType: srsItemType,
                  itemIds: srsItemIds.split(",").map((id) => parseInt(id.trim())).filter((n) => !isNaN(n)),
                  stage: srsStage,
                })
              }
              disabled={!!loading || !srsItemIds.trim()}
              className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading === "set_srs_stage" ? "Modification..." : "Modifier le stage"}
            </button>
          </div>
        </div>

        {/* Schedule Reviews Now */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⏰</span>
            <h2 className="text-lg font-bold text-gray-900">Programmer revisions maintenant</h2>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Tous vos elements en cours d&apos;apprentissage seront programmes pour revision immediate.
          </p>

          <button
            onClick={() => executeAction("schedule_reviews_now")}
            disabled={!!loading}
            className="w-full px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {loading === "schedule_reviews_now" ? "Programmation..." : "Programmer maintenant"}
          </button>
        </div>

        {/* Add Test Mistakes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">❌</span>
            <h2 className="text-lg font-bold text-gray-900">Ajouter des erreurs de test</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de pattern
              </label>
              <select
                value={mistakePattern}
                onChange={(e) => setMistakePattern(e.target.value as "visual" | "reading" | "translation")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="visual">Confusion visuelle (kanji similaires)</option>
                <option value="reading">Confusion de lectures</option>
                <option value="translation">Nuances de traduction</option>
              </select>
            </div>

            <button
              onClick={() => executeAction("add_test_mistakes", { pattern: mistakePattern })}
              disabled={!!loading}
              className="w-full px-4 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50"
            >
              {loading === "add_test_mistakes" ? "Ajout..." : "Ajouter des erreurs"}
            </button>
          </div>
        </div>

        {/* Pattern Analysis */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h2 className="text-lg font-bold text-gray-900">Detection de patterns</h2>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Declencher manuellement l&apos;analyse des patterns d&apos;erreur.
          </p>

          <button
            onClick={() => executeAction("trigger_pattern_analysis")}
            disabled={!!loading}
            className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading === "trigger_pattern_analysis" ? "Analyse..." : "Analyser les patterns"}
          </button>
        </div>

        {/* Clear Mistakes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🧹</span>
            <h2 className="text-lg font-bold text-gray-900">Nettoyer les erreurs</h2>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Supprimer toutes les erreurs enregistrees et les patterns detectes.
          </p>

          <button
            onClick={() => executeAction("clear_mistakes")}
            disabled={!!loading}
            className="w-full px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {loading === "clear_mistakes" ? "Nettoyage..." : "Nettoyer les erreurs"}
          </button>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Reference rapide des IDs</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Radicaux Niveau 1</h3>
            <p className="text-gray-600">IDs: 1-10</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Kanji Niveau 1</h3>
            <p className="text-gray-600">IDs: 1-6</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Vocabulaire Niveau 1</h3>
            <p className="text-gray-600">IDs: 1-6</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Tip: Utilisez Prisma Studio (<code>npm run db:studio</code>) pour voir tous les IDs
        </p>
      </div>
    </div>
  );
}
