"use client";

import { useState } from "react";
import Link from "next/link";

type ActionResult = {
  success?: boolean;
  error?: string;
  message?: string;
  patterns?: unknown[];
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

  // Tanuki/XP testing states
  const [xpAmount, setXpAmount] = useState(500);
  const [tanukiStage, setTanukiStage] = useState(2);

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
    } catch {
      setResult({ error: "Erreur reseau" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🧪</span>
          <h1 className="text-2xl font-bold text-gray-900">Outils de test</h1>
        </div>
        <p className="text-gray-600">
          Ces outils vous permettent de manipuler votre progression pour tester les fonctionnalites et faire des demos.
        </p>
      </div>

      {/* Result Banner */}
      {result && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            result.success
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-medium">{result.message || result.error}</p>
          {result.patterns && (
            <p className="text-sm mt-1 opacity-75">
              Patterns detectes: {(result.patterns as unknown[]).length}
            </p>
          )}
        </div>
      )}

      {/* How AI Feedback Works - Important Context */}
      <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-5">
        <h2 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
          <span>💡</span>
          Comment fonctionne le feedback IA ?
        </h2>
        <div className="text-sm text-amber-800 space-y-2">
          <p>
            <strong>Feedback en temps reel (pendant les revisions) :</strong> S&apos;affiche uniquement pour les items au <strong>stage SRS 3+</strong> (Apprenti 3 ou plus).
            Les items que vous venez d&apos;apprendre ne declenchent pas de feedback car vous les decouvrez encore.
          </p>
          <p>
            <strong>Detection de patterns (dashboard) :</strong> Analyse vos erreurs pour detecter des confusions recurrentes.
            Visible dans la section &quot;Mes points faibles&quot; sur le dashboard apres 5+ erreurs similaires.
          </p>
          <p>
            <strong>Etude ciblee :</strong> Accessible via le lien &quot;Etude ciblee&quot; sur le dashboard ou directement a <Link href="/study" className="underline">/study</Link>.
          </p>
        </div>
      </div>

      {/* Demo Mode - Featured */}
      <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🎬</span>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Mode Demo</h2>
            <p className="text-indigo-100 mb-4 text-sm leading-relaxed">
              Configure instantanement un etat ideal pour les demos. Cree un compte niveau 2 avec :
            </p>
            <ul className="text-indigo-100 text-sm mb-4 space-y-1">
              <li>• <strong>Revisions en attente</strong> - Plusieurs items prets a reviser</li>
              <li>• <strong>Lecons disponibles</strong> - Nouveaux items a apprendre</li>
              <li>• <strong>Erreurs de test</strong> - Pour voir la detection de patterns</li>
              <li>• <strong>Statistiques realistes</strong> - 5 jours de serie, ~450 XP</li>
            </ul>
            <button
              onClick={() => executeAction("setup_demo_mode")}
              disabled={loading === "setup_demo_mode"}
              className="px-5 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
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
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Reset Progress */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>🔄</span>
              Reinitialiser la progression
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">
              Efface votre progression SRS. Utile pour recommencer a zero ou tester le parcours d&apos;un nouvel utilisateur.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portee
                </label>
                <select
                  value={resetScope}
                  onChange={(e) => setResetScope(e.target.value as "all" | "level" | "type")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">Tout reinitialiser</option>
                  <option value="level">Un niveau specifique</option>
                  <option value="type">Un type d&apos;item</option>
                </select>
              </div>

              {resetScope === "level" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niveau
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={resetLevelId}
                    onChange={(e) => setResetLevelId(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}

              {resetScope === "type" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={resetItemType}
                    onChange={(e) => setResetItemType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                className="w-full px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading === "reset_progress" ? "Reinitialisation..." : "Reinitialiser"}
              </button>
            </div>
          </div>
        </div>

        {/* Set SRS Stage */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>📊</span>
              Modifier le stage SRS
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">
              Change le niveau SRS d&apos;items specifiques. Mettez des items au <strong>stage 3+</strong> pour tester le feedback IA.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={srsItemType}
                  onChange={(e) => setSrsItemType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="radical">Radical</option>
                  <option value="kanji">Kanji</option>
                  <option value="vocabulary">Vocabulaire</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IDs (separes par des virgules)
                </label>
                <input
                  type="text"
                  value={srsItemIds}
                  onChange={(e) => setSrsItemIds(e.target.value)}
                  placeholder="Ex: 1, 2, 3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Radicaux niv.1: 1-10 | Kanji niv.1: 1-6 | Vocab niv.1: 1-6
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stage SRS
                </label>
                <select
                  value={srsStage}
                  onChange={(e) => setSrsStage(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value={0}>0 - Verrouille</option>
                  <option value={1}>1 - Apprenti 1 (4h)</option>
                  <option value={2}>2 - Apprenti 2 (8h)</option>
                  <option value={3}>3 - Apprenti 3 (1j) ← Feedback IA actif</option>
                  <option value={4}>4 - Apprenti 4 (2j)</option>
                  <option value={5}>5 - Guru 1 (1 sem)</option>
                  <option value={6}>6 - Guru 2 (2 sem)</option>
                  <option value={7}>7 - Maitre (1 mois)</option>
                  <option value={8}>8 - Shodan (4 mois)</option>
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
                className="w-full px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading === "set_srs_stage" ? "Modification..." : "Modifier le stage"}
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Reviews Now */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>⏰</span>
              Programmer revisions maintenant
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">
              Rend tous vos items en apprentissage (stage 1-8) disponibles pour revision immediate.
              Utile pour tester le flux de revision sans attendre.
            </p>

            <button
              onClick={() => executeAction("schedule_reviews_now")}
              disabled={!!loading}
              className="w-full px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {loading === "schedule_reviews_now" ? "Programmation..." : "Programmer maintenant"}
            </button>
          </div>
        </div>

        {/* Add Test Mistakes */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>❌</span>
              Ajouter des erreurs de test
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">
              Injecte des erreurs fictives pour tester la detection de patterns.
              Apres ajout, lancez &quot;Analyser les patterns&quot; puis regardez le dashboard.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type de pattern
                </label>
                <select
                  value={mistakePattern}
                  onChange={(e) => setMistakePattern(e.target.value as "visual" | "reading" | "translation")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="visual">Confusion visuelle (kanji similaires)</option>
                  <option value="reading">Confusion de lectures (on/kun)</option>
                  <option value="translation">Nuances de traduction</option>
                </select>
              </div>

              <button
                onClick={() => executeAction("add_test_mistakes", { pattern: mistakePattern })}
                disabled={!!loading}
                className="w-full px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors disabled:opacity-50"
              >
                {loading === "add_test_mistakes" ? "Ajout..." : "Ajouter des erreurs"}
              </button>
            </div>
          </div>
        </div>

        {/* Pattern Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>🎯</span>
              Analyser les patterns
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">
              Lance manuellement l&apos;analyse IA de vos erreurs. Normalement automatique apres 20 erreurs,
              mais vous pouvez forcer l&apos;analyse ici. Les resultats apparaissent sur le <Link href="/dashboard" className="text-indigo-600 underline">dashboard</Link>.
            </p>

            <button
              onClick={() => executeAction("trigger_pattern_analysis")}
              disabled={!!loading}
              className="w-full px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading === "trigger_pattern_analysis" ? "Analyse en cours..." : "Analyser les patterns"}
            </button>
          </div>
        </div>

        {/* Clear Mistakes */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>🧹</span>
              Nettoyer les erreurs
            </h2>
          </div>
          <div className="p-5">
            <p className="text-sm text-gray-600 mb-4">
              Supprime toutes les erreurs enregistrees et les patterns detectes.
              Utile pour repartir de zero sur les tests de feedback IA.
            </p>

            <button
              onClick={() => executeAction("clear_mistakes")}
              disabled={!!loading}
              className="w-full px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading === "clear_mistakes" ? "Nettoyage..." : "Nettoyer les erreurs"}
            </button>
          </div>
        </div>
      </div>

      {/* Tanuki & XP Section */}
      <div className="mt-8 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🦝</span>
          <h2 className="text-xl font-bold text-gray-900">Tanuki & Recompenses</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Testez le systeme de pet Tanuki et les recompenses XP. Voir le Tanuki sur le <Link href="/dashboard" className="text-indigo-600 underline">dashboard</Link> ou les recompenses sur <Link href="/rewards" className="text-indigo-600 underline">/rewards</Link>.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Set XP */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
              <h3 className="font-semibold text-amber-900 flex items-center gap-2">
                <span>⚡</span>
                Definir XP
              </h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">
                Change votre XP total pour tester l&apos;evolution du Tanuki.
              </p>
              <div className="space-y-2">
                <input
                  type="number"
                  min={0}
                  value={xpAmount}
                  onChange={(e) => setXpAmount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <div className="flex flex-wrap gap-1">
                  {[0, 500, 2000, 5000, 15000, 50000].map((xp) => (
                    <button
                      key={xp}
                      onClick={() => setXpAmount(xp)}
                      className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded hover:bg-amber-200"
                    >
                      {xp.toLocaleString()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => executeAction("set_xp", { amount: xpAmount })}
                  disabled={!!loading}
                  className="w-full px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 disabled:opacity-50"
                >
                  {loading === "set_xp" ? "..." : "Appliquer"}
                </button>
              </div>
            </div>
          </div>

          {/* Set Tanuki Stage */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-orange-50 border-b border-orange-200 px-4 py-2">
              <h3 className="font-semibold text-orange-900 flex items-center gap-2">
                <span>🥚</span>
                Evolution Tanuki
              </h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">
                Force l&apos;evolution du Tanuki a un stade specifique.
              </p>
              <div className="space-y-2">
                <select
                  value={tanukiStage}
                  onChange={(e) => setTanukiStage(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value={1}>1 - Oeuf (0 XP)</option>
                  <option value={2}>2 - Bebe Tanuki (500 XP)</option>
                  <option value={3}>3 - Tanuki Curieux (2000 XP)</option>
                  <option value={4}>4 - Tanuki Etudiant (5000 XP)</option>
                  <option value={5}>5 - Tanuki Sage (15000 XP)</option>
                  <option value={6}>6 - Tanuki Sensei (50000 XP)</option>
                </select>
                <button
                  onClick={() => executeAction("set_tanuki_stage", { stage: tanukiStage })}
                  disabled={!!loading}
                  className="w-full px-3 py-2 bg-orange-600 text-white text-sm font-medium rounded-md hover:bg-orange-700 disabled:opacity-50"
                >
                  {loading === "set_tanuki_stage" ? "..." : "Evoluer"}
                </button>
              </div>
            </div>
          </div>

          {/* Unlock All Skins */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-200 px-4 py-2">
              <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                <span>🎨</span>
                Debloquer skins
              </h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">
                Debloque tous les skins Tanuki (Ninja, Sakura, Dore, Esprit).
              </p>
              <button
                onClick={() => executeAction("unlock_all_skins")}
                disabled={!!loading}
                className="w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {loading === "unlock_all_skins" ? "..." : "Tout debloquer"}
              </button>
            </div>
          </div>

          {/* Reset Rewards */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span>🔄</span>
                Reset recompenses
              </h3>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">
                Remet a zero XP, themes, badges, et Tanuki.
              </p>
              <button
                onClick={() => executeAction("reset_rewards")}
                disabled={!!loading}
                className="w-full px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:opacity-50"
              >
                {loading === "reset_rewards" ? "..." : "Reinitialiser"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Workflow Guide */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
          <h2 className="font-semibold text-gray-900">📋 Guide de test rapide</h2>
        </div>
        <div className="p-5">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Pour tester le feedback IA en temps reel :</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Utilisez &quot;Modifier le stage SRS&quot; pour mettre des kanji au <strong>stage 3+</strong></li>
                <li>Utilisez &quot;Programmer revisions maintenant&quot;</li>
                <li>Allez faire des revisions et faites des erreurs</li>
                <li>Le feedback IA apparait sous la bonne reponse</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Pour tester la detection de patterns :</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Utilisez &quot;Ajouter des erreurs de test&quot;</li>
                <li>Cliquez sur &quot;Analyser les patterns&quot;</li>
                <li>Allez sur le <Link href="/dashboard" className="text-indigo-600 underline">dashboard</Link></li>
                <li>Regardez la section &quot;Mes points faibles&quot;</li>
                <li>Cliquez sur &quot;Etude ciblee&quot; pour voir les sessions</li>
              </ol>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Pour tester le Tanuki & XP :</h3>
              <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                <li>Utilisez &quot;Definir XP&quot; ou &quot;Evolution Tanuki&quot;</li>
                <li>Allez sur le <Link href="/dashboard" className="text-indigo-600 underline">dashboard</Link> pour voir votre Tanuki</li>
                <li>Testez les skins sur <Link href="/rewards" className="text-indigo-600 underline">/rewards</Link></li>
                <li>Utilisez &quot;Reset recompenses&quot; pour recommencer</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
