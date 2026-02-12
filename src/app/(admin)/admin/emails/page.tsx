"use client";

import { useState, useEffect } from "react";

// Default email templates (used as fallback and for reset)
const DEFAULT_TEMPLATES: Record<string, EmailTemplate> = {
  reviews_waiting: {
    type: "reviews_waiting",
    subject: "{{count}} revision{{s}} t'attend{{ent}} - Nihongo",
    headline: "Tes revisions t'attendent !",
    bodyText:
      "Bonjour {{username}}, tu as {{count}} revision{{s}} en attente.\n\nPrends quelques minutes pour les completer et renforcer ta memoire. Chaque revision te rapproche de la maitrise !",
    buttonText: "Commencer les revisions",
    footerText: "+{{xp}} XP a gagner",
    isActive: true,
    schedule: "Tous les jours a 9h UTC",
    trigger: "Utilisateurs avec des revisions en attente et notifications activees",
  },
  streak_at_risk: {
    type: "streak_at_risk",
    subject: "Ne perds pas ta serie de {{streak}} jours ! - Nihongo",
    headline: "Ne perds pas ta serie de {{streak}} jours !",
    bodyText:
      "Bonjour {{username}}, tu n'as pas encore etudie aujourd'hui. Complete au moins une revision pour maintenir ta serie !",
    buttonText: "Proteger ma serie",
    footerText: "Ta serie sera perdue demain si tu n'etudies pas aujourd'hui !",
    isActive: true,
    schedule: "Tous les jours a 20h UTC",
    trigger: "Utilisateurs qui ont etudie hier mais pas aujourd'hui, avec une serie > 0",
  },
  level_up: {
    type: "level_up",
    subject: "Felicitations ! Tu passes au niveau {{level}} ! - Nihongo",
    headline: "Felicitations ! Tu passes au niveau {{level}} !",
    bodyText:
      "Bravo {{username}} ! Tu as maitrise suffisamment de kanji pour debloquer le niveau {{level}}. De nouveaux radicaux, kanji et vocabulaire t'attendent !",
    buttonText: "Decouvrir les nouvelles lecons",
    footerText: null,
    isActive: true,
    schedule: "Instantane",
    trigger: "Declenche immediatement quand l'utilisateur atteint 90% de kanji Guru sur son niveau",
  },
  reengagement: {
    type: "reengagement",
    subject: "Tu nous manques ! - Nihongo",
    headline: "Tu nous manques !",
    bodyText:
      "Bonjour {{username}}, ca fait {{days}} jours qu'on ne t'a pas vu. Reviens faire quelques revisions pour ne pas perdre tes acquis.",
    buttonText: "Reprendre l'apprentissage",
    footerText: "Meme 5 minutes par jour font une grande difference !",
    isActive: true,
    schedule: "Tous les jours a 10h UTC",
    trigger: "Utilisateurs inactifs depuis 3, 7 ou 30 jours (cooldown de 7 jours entre emails)",
  },
  weekly_summary: {
    type: "weekly_summary",
    subject: "Ton resume de la semaine - Nihongo",
    headline: "Ton resume de la semaine",
    bodyText:
      "Bonjour {{username}}, voici ce que tu as accompli cette semaine !",
    buttonText: "Continuer l'apprentissage",
    footerText: "Continue comme ca, tu progresses bien !",
    isActive: true,
    schedule: "Tous les dimanches a 10h UTC",
    trigger: "Utilisateurs avec activite cette semaine et notification activee",
  },
  password_reset: {
    type: "password_reset",
    subject: "Reinitialisation de votre mot de passe - Nihongo",
    headline: "Reinitialisation de votre mot de passe",
    bodyText:
      "Vous avez demande la reinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour creer un nouveau mot de passe.",
    buttonText: "Reinitialiser mon mot de passe",
    footerText: "Ce lien expirera dans 1 heure. Si vous n'avez pas demande cette reinitialisation, vous pouvez ignorer cet email.",
    isActive: true,
    schedule: "Instantane",
    trigger: "Demande de reinitialisation de mot de passe par l'utilisateur",
  },
  verification: {
    type: "verification",
    subject: "Verifiez votre adresse email - Nihongo",
    headline: "Bienvenue sur Nihongo !",
    bodyText:
      "Merci de vous etre inscrit. Pour commencer votre apprentissage du japonais, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.",
    buttonText: "Verifier mon email",
    footerText: "Ce lien expirera dans 24 heures. Si vous n'avez pas cree de compte sur Nihongo, vous pouvez ignorer cet email.",
    isActive: true,
    schedule: "Instantane",
    trigger: "Inscription d'un nouvel utilisateur",
  },
  email_change: {
    type: "email_change",
    subject: "Confirmez votre nouvelle adresse email - Nihongo",
    headline: "Confirmez votre nouvelle adresse email",
    bodyText:
      "Bonjour {{username}}, vous avez demande a changer votre adresse email sur Nihongo. Cliquez sur le bouton ci-dessous pour confirmer cette nouvelle adresse.",
    buttonText: "Confirmer cette adresse",
    footerText: "Ce lien expirera dans 24 heures. Si vous n'avez pas demande ce changement, vous pouvez ignorer cet email.",
    isActive: true,
    schedule: "Instantane",
    trigger: "Demande de changement d'email par l'utilisateur",
  },
  admin_password_reset: {
    type: "admin_password_reset",
    subject: "Votre mot de passe a ete reinitialise - Nihongo",
    headline: "Mot de passe reinitialise",
    bodyText:
      "Bonjour {{username}}, un administrateur a reinitialise votre mot de passe. Voici vos nouvelles informations de connexion.",
    buttonText: "",
    footerText: "Important : Veuillez changer ce mot de passe des votre prochaine connexion dans les parametres de votre compte.",
    isActive: true,
    schedule: "Instantane",
    trigger: "Reinitialisation de mot de passe par un administrateur",
  },
};

interface EmailTemplate {
  type: string;
  subject: string;
  headline: string;
  bodyText: string;
  buttonText: string;
  footerText: string | null;
  isActive: boolean;
  schedule?: string;
  trigger?: string;
  updatedAt?: string;
  updatedBy?: string;
}

interface NotificationStats {
  type: string;
  total: number;
  success: number;
  failed: number;
  lastSent: string | null;
}

const EMAIL_CATEGORIES = {
  notifications: {
    label: "Notifications automatiques",
    description: "Emails envoyes automatiquement par les cron jobs",
    types: ["reviews_waiting", "streak_at_risk", "level_up", "reengagement", "weekly_summary"],
  },
  transactional: {
    label: "Emails transactionnels",
    description: "Emails declenches par des actions utilisateur",
    types: ["password_reset", "verification", "email_change", "admin_password_reset"],
  },
};

const TYPE_LABELS: Record<string, string> = {
  reviews_waiting: "Revisions en attente",
  streak_at_risk: "Serie en danger",
  level_up: "Passage de niveau",
  reengagement: "Re-engagement",
  weekly_summary: "Resume hebdomadaire",
  password_reset: "Reinitialisation MDP",
  verification: "Verification email",
  email_change: "Changement email",
  admin_password_reset: "Reset MDP (Admin)",
};

const VARIABLE_HINTS: Record<string, string[]> = {
  reviews_waiting: ["{{username}}", "{{count}}", "{{s}}", "{{ent}}", "{{xp}}"],
  streak_at_risk: ["{{username}}", "{{streak}}"],
  level_up: ["{{username}}", "{{level}}"],
  reengagement: ["{{username}}", "{{days}}", "{{reviews}}"],
  weekly_summary: ["{{username}}", "{{reviews}}", "{{lessons}}", "{{accuracy}}", "{{xp}}", "{{streak}}"],
  password_reset: [],
  verification: [],
  email_change: ["{{username}}"],
  admin_password_reset: ["{{username}}", "{{password}}"],
};

export default function AdminEmailsPage() {
  const [templates, setTemplates] = useState<Record<string, EmailTemplate>>(DEFAULT_TEMPLATES);
  const [stats, setStats] = useState<NotificationStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EmailTemplate | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [templatesRes, statsRes] = await Promise.all([
        fetch("/api/admin/emails"),
        fetch("/api/admin/emails/stats"),
      ]);

      if (templatesRes.ok) {
        const data = await templatesRes.json();
        // Merge with defaults
        const merged = { ...DEFAULT_TEMPLATES };
        for (const template of data.templates) {
          merged[template.type] = { ...merged[template.type], ...template };
        }
        setTemplates(merged);
      }

      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch email data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (type: string) => {
    setSelectedType(type);
    setEditForm({ ...templates[type] });
    setMessage(null);
  };

  const handleSave = async () => {
    if (!editForm || !selectedType) return;

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/emails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      if (res.ok) {
        const data = await res.json();
        setTemplates((prev) => ({
          ...prev,
          [selectedType]: { ...prev[selectedType], ...data.template },
        }));
        setMessage({ type: "success", text: "Template mis a jour !" });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Erreur lors de la sauvegarde" });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur lors de la sauvegarde" });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!selectedType) return;
    setEditForm({ ...DEFAULT_TEMPLATES[selectedType] });
  };

  const handleToggleActive = async (type: string, isActive: boolean) => {
    try {
      const res = await fetch("/api/admin/emails", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, isActive }),
      });

      if (res.ok) {
        setTemplates((prev) => ({
          ...prev,
          [type]: { ...prev[type], isActive },
        }));
      }
    } catch (error) {
      console.error("Failed to toggle template:", error);
    }
  };

  const getStatsForType = (type: string) => {
    return stats.find((s) => s.type === type);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-stone-200 rounded w-48"></div>
          <div className="h-64 bg-stone-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Gestion des Emails</h1>
        <p className="text-stone-600 mt-1">
          Visualisez et personnalisez le contenu de tous les emails
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Email List */}
        <div className="space-y-6">
          {Object.entries(EMAIL_CATEGORIES).map(([categoryKey, category]) => (
            <div key={categoryKey} className="bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-4 border-b border-stone-100">
                <h2 className="font-semibold text-stone-900">{category.label}</h2>
                <p className="text-sm text-stone-500">{category.description}</p>
              </div>
              <div className="divide-y divide-stone-100">
                {category.types.map((type) => {
                  const template = templates[type];
                  const typeStats = getStatsForType(type);
                  const isSelected = selectedType === type;

                  return (
                    <div
                      key={type}
                      className={`p-4 cursor-pointer transition-colors ${
                        isSelected ? "bg-amber-50" : "hover:bg-stone-50"
                      }`}
                      onClick={() => handleEdit(type)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-stone-900">
                              {TYPE_LABELS[type]}
                            </h3>
                            {!template.isActive && (
                              <span className="px-2 py-0.5 text-xs bg-stone-200 text-stone-600 rounded">
                                Desactive
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-stone-500 mt-1 truncate">
                            {template.subject}
                          </p>
                          {template.schedule && (
                            <p className="text-xs text-stone-400 mt-1">
                              {template.schedule}
                            </p>
                          )}
                        </div>
                        {typeStats && (
                          <div className="text-right text-sm">
                            <p className="text-stone-900 font-medium">
                              {typeStats.total} envoyes
                            </p>
                            {typeStats.failed > 0 && (
                              <p className="text-red-600 text-xs">
                                {typeStats.failed} echecs
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Panel */}
        <div className="lg:sticky lg:top-8 self-start">
          {selectedType && editForm ? (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-stone-900">
                    {TYPE_LABELS[selectedType]}
                  </h2>
                  {templates[selectedType].updatedAt && (
                    <p className="text-xs text-stone-500 mt-1">
                      Modifie le{" "}
                      {new Date(templates[selectedType].updatedAt!).toLocaleDateString("fr-FR")}
                    </p>
                  )}
                </div>
                <label className="flex items-center gap-2">
                  <span className="text-sm text-stone-600">Actif</span>
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    onChange={(e) => {
                      setEditForm({ ...editForm, isActive: e.target.checked });
                      handleToggleActive(selectedType, e.target.checked);
                    }}
                    className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                </label>
              </div>

              <div className="p-4 space-y-4">
                {/* Trigger info */}
                {DEFAULT_TEMPLATES[selectedType].trigger && (
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                    <p className="text-xs font-medium text-blue-800">Declencheur</p>
                    <p className="text-sm text-blue-700 mt-1">
                      {DEFAULT_TEMPLATES[selectedType].trigger}
                    </p>
                  </div>
                )}

                {/* Variables hint */}
                {VARIABLE_HINTS[selectedType]?.length > 0 && (
                  <div className="bg-stone-50 border border-stone-100 rounded-lg p-3">
                    <p className="text-xs font-medium text-stone-700">Variables disponibles</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {VARIABLE_HINTS[selectedType].map((v) => (
                        <code
                          key={v}
                          className="px-1.5 py-0.5 bg-stone-200 text-stone-700 text-xs rounded"
                        >
                          {v}
                        </code>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={editForm.subject}
                    onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                {/* Headline */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Titre principal
                  </label>
                  <input
                    type="text"
                    value={editForm.headline}
                    onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Contenu
                  </label>
                  <textarea
                    value={editForm.bodyText}
                    onChange={(e) => setEditForm({ ...editForm, bodyText: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                {/* Button text */}
                {editForm.buttonText !== "" && (
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">
                      Texte du bouton
                    </label>
                    <input
                      type="text"
                      value={editForm.buttonText}
                      onChange={(e) => setEditForm({ ...editForm, buttonText: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Footer */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">
                    Texte de pied de page
                  </label>
                  <input
                    type="text"
                    value={editForm.footerText || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, footerText: e.target.value || null })
                    }
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Optionnel"
                  />
                </div>

                {/* Message */}
                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 font-medium"
                  >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-stone-300 text-stone-700 rounded-lg hover:bg-stone-50"
                  >
                    Reinitialiser
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-100 rounded-xl p-8 text-center">
              <svg
                className="w-12 h-12 mx-auto text-stone-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-stone-600">
                Selectionnez un email pour voir et modifier son contenu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
