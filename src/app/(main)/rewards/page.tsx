"use client";

import { useState, useEffect } from "react";
import { Theme, Badge, XP_PER_CREDIT } from "@/lib/rewards";
import { TanukiSkin, getTanukiStage, TANUKI_STAGES } from "@/lib/tanuki";

interface RewardsData {
  totalXp: number;
  mnemonicCredits: number;
  selectedTheme: string;
  unlockedThemes: Theme[];
  lockedThemes: Theme[];
  unlockedBadges: Badge[];
  allBadges: Badge[];
  stats: {
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalReviewsDone: number;
    totalLessonsDone: number;
  };
}

interface TanukiData {
  tanukiName: string | null;
  selectedSkin: string;
  unlockedSkins: TanukiSkin[];
  lockedSkins: TanukiSkin[];
  totalXp: number;
}

export default function RewardsPage() {
  const [data, setData] = useState<RewardsData | null>(null);
  const [tanukiData, setTanukiData] = useState<TanukiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [créditsToConvert, setCreditsToConvert] = useState(1);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [tanukiName, setTanukiName] = useState("");
  const [isRenamingTanuki, setIsRenamingTanuki] = useState(false);

  useEffect(() => {
    fetchRewards();
    fetchTanuki();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await fetch("/api/rewards");
      if (res.ok) {
        const rewardsData = await res.json();
        setData(rewardsData);
      }
    } catch (err) {
      console.error("Failed to fetch rewards:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTanuki = async () => {
    try {
      const res = await fetch("/api/rewards/tanuki");
      if (res.ok) {
        const tData = await res.json();
        setTanukiData(tData);
        setTanukiName(tData.tanukiName || "");
      }
    } catch (err) {
      console.error("Failed to fetch tanuki:", err);
    }
  };

  const renameTanuki = async () => {
    if (!tanukiName.trim()) return;
    setIsRenamingTanuki(true);
    try {
      const res = await fetch("/api/rewards/tanuki", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "rename", name: tanukiName }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: result.message });
        fetchTanuki();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setIsRenamingTanuki(false);
    }
  };

  const selectTanukiSkin = async (skinId: string) => {
    try {
      const res = await fetch("/api/rewards/tanuki", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "select_skin", skinId }),
      });
      if (res.ok) {
        fetchTanuki();
        fetchRewards();
      }
    } catch (err) {
      console.error("Failed to select skin:", err);
    }
  };

  const purchaseTanukiSkin = async (skinId: string) => {
    setPurchasing(skinId);
    setMessage(null);
    try {
      const res = await fetch("/api/rewards/tanuki", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "purchase_skin", skinId }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: result.message });
        fetchTanuki();
        fetchRewards();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setPurchasing(null);
    }
  };

  const purchaseTheme = async (themeId: string) => {
    setPurchasing(themeId);
    setMessage(null);
    try {
      const res = await fetch("/api/rewards/purchase-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: result.message });
        fetchRewards();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setPurchasing(null);
    }
  };

  const selectTheme = async (themeId: string) => {
    try {
      const res = await fetch("/api/rewards/select-theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themeId }),
      });
      if (res.ok) {
        fetchRewards();
      }
    } catch (err) {
      console.error("Failed to select theme:", err);
    }
  };

  const convertXpToCredits = async () => {
    setConverting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/rewards/convert-xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crédits: créditsToConvert }),
      });
      const result = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: result.message });
        fetchRewards();
      } else {
        setMessage({ type: "error", text: result.error });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur de connexion" });
    } finally {
      setConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-stone-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-stone-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-stone-500">Erreur de chargement</p>
      </div>
    );
  }

  const maxCredits = Math.floor(data.totalXp / XP_PER_CREDIT);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-10">
      {/* Header with XP Balance */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">Récompenses</h1>
          <p className="text-sm sm:text-base text-stone-600 mt-1">Dépense ton XP pour débloquer des thèmes et des crédits IA</p>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex-1 sm:flex-none text-center bg-amber-50 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600">{data.totalXp.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-stone-500">XP disponible</div>
          </div>
          <div className="flex-1 sm:flex-none text-center bg-indigo-50 rounded-xl p-3 sm:p-4">
            <div className="text-2xl sm:text-3xl font-bold text-indigo-600">{data.mnemonicCredits}</div>
            <div className="text-xs sm:text-sm text-stone-500">Crédits IA</div>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* XP to Credits Conversion */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-indigo-900 mb-2">Convertir XP en Crédits IA</h2>
        <p className="text-sm sm:text-base text-indigo-700 mb-4">
          Utilise tes crédits pour régénérer des mnémoniques personnalisés avec l'IA.
          <span className="font-medium"> {XP_PER_CREDIT} XP = 1 crédit</span>
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
            <button
              onClick={() => setCreditsToConvert(Math.max(1, créditsToConvert - 1))}
              className="w-10 h-10 rounded-lg bg-white border border-indigo-200 text-indigo-600 font-bold hover:bg-indigo-50"
              disabled={créditsToConvert <= 1}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              max={maxCredits}
              value={créditsToConvert}
              onChange={(e) => setCreditsToConvert(Math.max(1, Math.min(maxCredits, parseInt(e.target.value) || 1)))}
              className="w-20 text-center text-lg font-bold rounded-lg border border-indigo-200 p-2"
            />
            <button
              onClick={() => setCreditsToConvert(Math.min(maxCredits, créditsToConvert + 1))}
              className="w-10 h-10 rounded-lg bg-white border border-indigo-200 text-indigo-600 font-bold hover:bg-indigo-50"
              disabled={créditsToConvert >= maxCredits}
            >
              +
            </button>
          </div>
          <span className="text-indigo-600 text-center sm:text-left w-full sm:w-auto">
            = <strong>{créditsToConvert * XP_PER_CREDIT}</strong> XP
          </span>
          <button
            onClick={convertXpToCredits}
            disabled={converting || maxCredits < 1}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {converting ? "Conversion..." : "Convertir"}
          </button>
          {maxCredits < 1 && (
            <span className="text-indigo-500 text-sm text-center sm:text-left w-full sm:w-auto">Il te faut au moins {XP_PER_CREDIT} XP</span>
          )}
        </div>
      </section>

      {/* Tanuki Pet Section */}
      {tanukiData && (
        <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-2xl border border-amber-200 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">🦝</span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900">Mon Tanuki</h2>
              <p className="text-sm sm:text-base text-amber-700">Ton compagnon d'apprentissage évolue avec ton XP !</p>
            </div>
          </div>

          {/* Current stage info */}
          <div className="bg-white/70 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium text-amber-800">Évolution actuelle</span>
              <span className="text-xs sm:text-sm text-amber-600">
                {getTanukiStage(data?.totalXp || 0).name}
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {TANUKI_STAGES.map((stage) => {
                const isReached = (data?.totalXp || 0) >= stage.xpRequired;
                return (
                  <div
                    key={stage.id}
                    className={`text-center p-2 rounded-lg transition-all ${
                      isReached
                        ? "bg-amber-100 border border-amber-300"
                        : "bg-stone-100 border border-stone-200 opacity-50"
                    }`}
                    title={`${stage.name}: ${stage.xpRequired.toLocaleString()} XP`}
                  >
                    <div className={`text-2xl ${isReached ? "" : "grayscale"}`}>
                      {stage.id === 1 ? "🥚" : "🦝"}
                    </div>
                    <div className="text-xs text-stone-600 mt-1">Niv.{stage.id}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rename tanuki */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Nom de ton Tanuki
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tanukiName}
                onChange={(e) => setTanukiName(e.target.value)}
                maxLength={20}
                placeholder="Donne-lui un nom..."
                className="flex-1 px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              <button
                onClick={renameTanuki}
                disabled={isRenamingTanuki || !tanukiName.trim()}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50"
              >
                {isRenamingTanuki ? "..." : "Renommer"}
              </button>
            </div>
          </div>

          {/* Tanuki Skins */}
          <div>
            <h3 className="text-lg font-medium text-amber-800 mb-3">Apparences</h3>

            {/* Unlocked skins */}
            {tanukiData.unlockedSkins.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                {tanukiData.unlockedSkins.map((skin) => (
                  <div
                    key={skin.id}
                    onClick={() => selectTanukiSkin(skin.id)}
                    className={`cursor-pointer rounded-xl p-3 text-center transition-all ${
                      tanukiData.selectedSkin === skin.id
                        ? "bg-amber-200 border-2 border-amber-500"
                        : "bg-white border border-amber-100 hover:border-amber-300"
                    }`}
                  >
                    <div
                      className="w-12 h-12 mx-auto rounded-full mb-2 flex items-center justify-center"
                      style={{ backgroundColor: skin.colors.primary + "40" }}
                    >
                      <span className="text-2xl">🦝</span>
                    </div>
                    <div className="text-sm font-medium text-stone-800">{skin.name}</div>
                    {tanukiData.selectedSkin === skin.id && (
                      <span className="text-xs text-amber-600">Actif</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Locked skins */}
            {tanukiData.lockedSkins.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {tanukiData.lockedSkins.map((skin) => (
                  <div
                    key={skin.id}
                    className="rounded-xl p-3 text-center bg-stone-100 border border-dashed border-stone-300"
                  >
                    <div
                      className="w-12 h-12 mx-auto rounded-full mb-2 flex items-center justify-center opacity-50"
                      style={{ backgroundColor: skin.colors.primary + "40" }}
                    >
                      <span className="text-2xl grayscale">🦝</span>
                    </div>
                    <div className="text-sm font-medium text-stone-600">{skin.name}</div>
                    <div className="text-xs text-amber-600 font-bold">{skin.price} XP</div>
                    <button
                      onClick={() => purchaseTanukiSkin(skin.id)}
                      disabled={(data?.totalXp || 0) < skin.price || purchasing === skin.id}
                      className={`mt-2 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        (data?.totalXp || 0) >= skin.price
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-stone-200 text-stone-400 cursor-not-allowed"
                      }`}
                    >
                      {purchasing === skin.id ? "..." : "Acheter"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Themes Section */}
      <section>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Thèmes</h2>

        {/* Unlocked Themes */}
        {data.unlockedThemes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-stone-700 mb-3">Tes thèmes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.unlockedThemes.map((theme) => (
                <div
                  key={theme.id}
                  className={`relative rounded-2xl border-2 p-4 transition-all ${
                    data.selectedTheme === theme.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-stone-200 bg-white hover:border-stone-300"
                  }`}
                >
                  <div
                    className="h-24 rounded-xl mb-3"
                    style={{ background: theme.preview }}
                  ></div>
                  <h4 className="font-bold text-stone-900">{theme.name}</h4>
                  <p className="text-sm text-stone-500 mb-3">{theme.description}</p>
                  {data.selectedTheme === theme.id ? (
                    <span className="inline-flex items-center gap-1 text-teal-600 font-medium text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Actif
                    </span>
                  ) : (
                    <button
                      onClick={() => selectTheme(theme.id)}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Activer
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Themes */}
        {data.lockedThemes.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-stone-700 mb-3">À débloquer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.lockedThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="relative rounded-2xl border-2 border-dashed border-stone-300 p-4 bg-stone-50"
                >
                  <div
                    className="h-24 rounded-xl mb-3 opacity-60"
                    style={{ background: theme.preview }}
                  ></div>
                  <h4 className="font-bold text-stone-900">{theme.name}</h4>
                  <p className="text-sm text-stone-500 mb-3">{theme.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-600 font-bold">{theme.price.toLocaleString()} XP</span>
                    <button
                      onClick={() => purchaseTheme(theme.id)}
                      disabled={data.totalXp < theme.price || purchasing === theme.id}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        data.totalXp >= theme.price
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-stone-200 text-stone-400 cursor-not-allowed"
                      }`}
                    >
                      {purchasing === theme.id ? "..." : "Acheter"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Badges Section */}
      <section>
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Badges</h2>
        <p className="text-stone-600 mb-6">
          Les badges sont gagnés automatiquement en atteignant des objectifs. Continue à progresser pour tous les débloquer !
        </p>

        {/* Badge categories */}
        {["milestone", "streak", "mastery", "dedication"].map((category) => {
          const categoryBadges = data.allBadges.filter((b) => b.category === category);
          const categoryNames: Record<string, string> = {
            milestone: "Jalons",
            streak: "Séries",
            mastery: "Maîtrise",
            dedication: "Dédication",
          };

          return (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-medium text-stone-700 mb-3">{categoryNames[category]}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryBadges.map((badge) => {
                  const isUnlocked = data.unlockedBadges.some((b) => b.id === badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`rounded-2xl border p-4 text-center transition-all ${
                        isUnlocked
                          ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                          : "bg-stone-100 border-stone-200 opacity-60"
                      }`}
                    >
                      <div className={`text-4xl mb-2 ${isUnlocked ? "" : "grayscale"}`}>
                        {badge.icon}
                      </div>
                      <h4 className={`font-bold ${isUnlocked ? "text-stone-900" : "text-stone-500"}`}>
                        {badge.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">{badge.condition}</p>
                      {isUnlocked && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                          Obtenu
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
