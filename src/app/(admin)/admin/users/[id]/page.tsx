"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  emailVerified: string | null;
  isAdmin: boolean;
  isSuspended: boolean;
  suspendedAt: string | null;
  suspendedBy: string | null;
  suspendReason: string | null;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  weeklyXp: number;
  totalReviewsDone: number;
  totalLessonsDone: number;
  perfectDays: number;
  lastStudyDate: string | null;
  lessonsPerDay: number;
  reviewBatchSize: number;
  autoplayAudio: boolean;
}

interface Progress {
  srsStage: number;
  _count: number;
}

interface UserData {
  user: User;
  progress: {
    radicals: Progress[];
    kanji: Progress[];
    vocabulary: Progress[];
  };
}

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [newLevel, setNewLevel] = useState(1);
  const [showLevelModal, setShowLevelModal] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/admin/users/${id}`);
      if (res.ok) {
        const userData = await res.json();
        setData(userData);
        setNewLevel(userData.user.currentLevel);
      } else if (res.status === 404) {
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspend = async () => {
    if (!suspendReason.trim()) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${id}/suspend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: suspendReason }),
      });
      if (res.ok) {
        await fetchUser();
        setShowSuspendModal(false);
        setSuspendReason("");
      }
    } catch (error) {
      console.error("Failed to suspend user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnsuspend = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${id}/unsuspend`, {
        method: "POST",
      });
      if (res.ok) {
        await fetchUser();
      }
    } catch (error) {
      console.error("Failed to unsuspend user:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${id}/reset-password`, {
        method: "POST",
      });
      if (res.ok) {
        const result = await res.json();
        setTempPassword(result.temporaryPassword);
      }
    } catch (error) {
      console.error("Failed to reset password:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateLevel = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentLevel: newLevel }),
      });
      if (res.ok) {
        await fetchUser();
        setShowLevelModal(false);
      }
    } catch (error) {
      console.error("Failed to update level:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSrsLabel = (stage: number) => {
    const labels: Record<number, string> = {
      0: "Verrouille",
      1: "Apprenti 1",
      2: "Apprenti 2",
      3: "Apprenti 3",
      4: "Apprenti 4",
      5: "Guru 1",
      6: "Guru 2",
      7: "Maitre",
      8: "Illumine",
      9: "Brule",
    };
    return labels[stage] || `Stage ${stage}`;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-stone-500">Chargement...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8">
        <div className="text-stone-500">Utilisateur non trouvé</div>
      </div>
    );
  }

  const { user, progress } = data;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <Link
            href="/admin/users"
            className="text-stone-500 hover:text-stone-700 text-sm mb-2 inline-block"
          >
            &larr; Retour aux utilisateurs
          </Link>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-3">
            {user.username}
            {user.isAdmin && (
              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">
                Admin
              </span>
            )}
            {user.isSuspended && (
              <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                Suspendu
              </span>
            )}
          </h1>
          <p className="text-stone-500 mt-1">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowResetModal(true)}
            disabled={user.isAdmin}
            className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reinitialiser MDP
          </button>
          {user.isSuspended ? (
            <button
              onClick={handleUnsuspend}
              disabled={actionLoading}
              className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Lever suspension
            </button>
          ) : (
            <button
              onClick={() => setShowSuspendModal(true)}
              disabled={user.isAdmin || actionLoading}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suspendre
            </button>
          )}
        </div>
      </div>

      {/* Suspension Info */}
      {user.isSuspended && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <h3 className="font-medium text-red-800">Compte suspendu</h3>
          <p className="text-red-700 text-sm mt-1">Raison: {user.suspendReason}</p>
          <p className="text-red-600 text-xs mt-1">
            Suspendu le {formatDate(user.suspendedAt)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Informations</h2>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-stone-500">Email</dt>
              <dd className="text-stone-900">{user.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Email verifie</dt>
              <dd className="text-stone-900">
                {user.emailVerified ? formatDate(user.emailVerified) : "Non"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Inscription</dt>
              <dd className="text-stone-900">{formatDate(user.createdAt)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Dernière activite</dt>
              <dd className="text-stone-900">{formatDate(user.lastStudyDate)}</dd>
            </div>
          </dl>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Statistiques</h2>
          <dl className="space-y-3">
            <div className="flex justify-between items-center">
              <dt className="text-stone-500">Niveau actuel</dt>
              <dd className="flex items-center gap-2">
                <span className="text-stone-900 font-medium">{user.currentLevel}</span>
                <button
                  onClick={() => setShowLevelModal(true)}
                  className="text-xs text-amber-600 hover:text-amber-700"
                >
                  Modifier
                </button>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">XP total</dt>
              <dd className="text-stone-900">{user.totalXp.toLocaleString("fr-FR")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">XP hebdomadaire</dt>
              <dd className="text-stone-900">{user.weeklyXp.toLocaleString("fr-FR")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Serie actuelle</dt>
              <dd className="text-stone-900">{user.currentStreak} jours</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Meilleure serie</dt>
              <dd className="text-stone-900">{user.longestStreak} jours</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Lecons terminees</dt>
              <dd className="text-stone-900">{user.totalLessonsDone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Reviews terminees</dt>
              <dd className="text-stone-900">{user.totalReviewsDone}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Jours parfaits</dt>
              <dd className="text-stone-900">{user.perfectDays}</dd>
            </div>
          </dl>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 lg:col-span-2">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Progression SRS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Radicals */}
            <div>
              <h3 className="font-medium text-stone-700 mb-2">Radicaux</h3>
              <div className="space-y-1">
                {progress.radicals.length === 0 ? (
                  <p className="text-sm text-stone-500">Aucune progression</p>
                ) : (
                  progress.radicals.map((p) => (
                    <div key={p.srsStage} className="flex justify-between text-sm">
                      <span className="text-stone-500">{getSrsLabel(p.srsStage)}</span>
                      <span className="text-stone-900">{p._count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Kanji */}
            <div>
              <h3 className="font-medium text-stone-700 mb-2">Kanji</h3>
              <div className="space-y-1">
                {progress.kanji.length === 0 ? (
                  <p className="text-sm text-stone-500">Aucune progression</p>
                ) : (
                  progress.kanji.map((p) => (
                    <div key={p.srsStage} className="flex justify-between text-sm">
                      <span className="text-stone-500">{getSrsLabel(p.srsStage)}</span>
                      <span className="text-stone-900">{p._count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Vocabulary */}
            <div>
              <h3 className="font-medium text-stone-700 mb-2">Vocabulaire</h3>
              <div className="space-y-1">
                {progress.vocabulary.length === 0 ? (
                  <p className="text-sm text-stone-500">Aucune progression</p>
                ) : (
                  progress.vocabulary.map((p) => (
                    <div key={p.srsStage} className="flex justify-between text-sm">
                      <span className="text-stone-500">{getSrsLabel(p.srsStage)}</span>
                      <span className="text-stone-900">{p._count}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Suspendre {user.username}
            </h3>
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="Raison de la suspension..."
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[100px]"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason("");
                }}
                className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50"
              >
                Annuler
              </button>
              <button
                onClick={handleSuspend}
                disabled={!suspendReason.trim() || actionLoading}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Suspendre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Reinitialiser le mot de passe
            </h3>
            {tempPassword ? (
              <>
                <p className="text-sm text-stone-600 mb-4">
                  Mot de passe temporaire genere. Communiquez-le a l&apos;utilisateur:
                </p>
                <div className="bg-stone-100 p-4 rounded-lg font-mono text-center text-lg">
                  {tempPassword}
                </div>
                <p className="text-xs text-stone-500 mt-4">
                  L&apos;utilisateur devra changer ce mot de passe a sa prochaine connexion.
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      setShowResetModal(false);
                      setTempPassword("");
                    }}
                    className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    Fermer
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-stone-600 mb-4">
                  Un nouveau mot de passe temporaire sera genere. L&apos;ancien mot de passe
                  sera invalide immediatement.
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowResetModal(false)}
                    className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleResetPassword}
                    disabled={actionLoading}
                    className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
                  >
                    Generer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Level Modal */}
      {showLevelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-stone-900 mb-4">
              Modifier le niveau
            </h3>
            <input
              type="number"
              min="1"
              max="60"
              value={newLevel}
              onChange={(e) => setNewLevel(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-xs text-stone-500 mt-2">
              Attention: Cela ne débloquéra pas automatiquement le contenu du nouveau niveau.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowLevelModal(false)}
                className="px-4 py-2 text-sm border border-stone-300 rounded-lg hover:bg-stone-50"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateLevel}
                disabled={actionLoading}
                className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
