"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

interface UserSettings {
  lessonsPerDay: number;
  reviewBatchSize: number;
  autoplayAudio: boolean;
  levelAwareSentencesEnabled: boolean;
  leaderboardOptIn: boolean;
}

interface NotificationPreferences {
  emailNotificationsEnabled: boolean;
  notifyReviewsWaiting: boolean;
  notifyStreakAtRisk: boolean;
  notifyLevelUp: boolean;
  notifyReengagement: boolean;
  notifyWeeklySummary: boolean;
  preferredNotificationHour: number;
  timezone: string;
}

interface AccountInfo {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  stats: {
    currentLevel: number;
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    totalReviewsDone: number;
    totalLessonsDone: number;
    perfectDays: number;
  };
}

export default function SettingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"learning" | "account" | "notifications">("learning");

  // Learning settings state
  const [settings, setSettings] = useState<UserSettings>({
    lessonsPerDay: 20,
    reviewBatchSize: 10,
    autoplayAudio: true,
    levelAwareSentencesEnabled: true,
    leaderboardOptIn: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Account state
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);

  // Notification preferences state
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailNotificationsEnabled: true,
    notifyReviewsWaiting: true,
    notifyStreakAtRisk: true,
    notifyLevelUp: true,
    notifyReengagement: true,
    notifyWeeklySummary: true,
    preferredNotificationHour: 9,
    timezone: "Europe/Paris",
  });
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsSaving, setNotificationsSaving] = useState(false);
  const [notificationsMessage, setNotificationsMessage] = useState("");

  // Form states
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  // UI states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{
    type: "success" | "error";
    text: string;
    field?: string;
  } | null>(null);

  // Check for email change success/error from URL
  useEffect(() => {
    const emailSuccess = searchParams.get("email_success");
    const emailError = searchParams.get("email_error");

    if (emailSuccess === "true") {
      setActionMessage({
        type: "success",
        text: "Votre adresse email a ete mise a jour avec succes",
        field: "email",
      });
      setActiveTab("account");
    } else if (emailError) {
      const errorMessages: Record<string, string> = {
        missing_token: "Lien invalide",
        invalid_token: "Ce lien n'est plus valide",
        expired_token: "Ce lien a expire",
        email_taken: "Cette adresse email est deja utilisee",
        server_error: "Une erreur est survenue",
      };
      setActionMessage({
        type: "error",
        text: errorMessages[emailError] || "Une erreur est survenue",
        field: "email",
      });
      setActiveTab("account");
    }
  }, [searchParams]);

  // Fetch learning settings
  useEffect(() => {
    async function fetchSettings() {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  // Fetch account info
  useEffect(() => {
    async function fetchAccount() {
      try {
        const response = await fetch("/api/account");
        if (response.ok) {
          const data = await response.json();
          setAccount(data);
          setNewUsername(data.username);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      } finally {
        setAccountLoading(false);
      }
    }

    fetchAccount();
  }, []);

  // Fetch notification preferences
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch("/api/notifications/preferences");
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setNotificationsLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage("Parametres enregistres avec succes");
      } else {
        setMessage("Erreur lors de l'enregistrement");
      }
    } catch {
      setMessage("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setNotificationsSaving(true);
    setNotificationsMessage("");

    try {
      const response = await fetch("/api/notifications/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notifications),
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setNotificationsMessage("Preferences enregistrees avec succes");
      } else {
        setNotificationsMessage("Erreur lors de l'enregistrement");
      }
    } catch {
      setNotificationsMessage("Erreur lors de l'enregistrement");
    } finally {
      setNotificationsSaving(false);
    }
  };

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) return;

    setActionLoading("username");
    setActionMessage(null);

    try {
      const response = await fetch("/api/account/username", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername }),
      });

      const data = await response.json();

      if (response.ok) {
        setActionMessage({ type: "success", text: data.message, field: "username" });
        setAccount((prev) => (prev ? { ...prev, username: newUsername } : null));
      } else {
        setActionMessage({ type: "error", text: data.error, field: "username" });
      }
    } catch {
      setActionMessage({ type: "error", text: "Une erreur est survenue", field: "username" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateEmail = async () => {
    if (!newEmail.trim() || !emailPassword) return;

    setActionLoading("email");
    setActionMessage(null);

    try {
      const response = await fetch("/api/account/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail, password: emailPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setActionMessage({ type: "success", text: data.message, field: "email" });
        setNewEmail("");
        setEmailPassword("");
      } else {
        setActionMessage({ type: "error", text: data.error, field: "email" });
      }
    } catch {
      setActionMessage({ type: "error", text: "Une erreur est survenue", field: "email" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) return;

    if (newPassword !== confirmNewPassword) {
      setActionMessage({
        type: "error",
        text: "Les mots de passe ne correspondent pas",
        field: "password",
      });
      return;
    }

    setActionLoading("password");
    setActionMessage(null);

    try {
      const response = await fetch("/api/account/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setActionMessage({ type: "success", text: data.message, field: "password" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setActionMessage({ type: "error", text: data.error, field: "password" });
      }
    } catch {
      setActionMessage({ type: "error", text: "Une erreur est survenue", field: "password" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleExportData = async () => {
    setActionLoading("export");

    try {
      const response = await fetch("/api/account/export");
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `nihongo-data-${account?.username || "export"}-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch {
      setActionMessage({ type: "error", text: "Erreur lors de l'export", field: "export" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword || deleteConfirmation !== "SUPPRIMER") return;

    setActionLoading("delete");

    try {
      const response = await fetch("/api/account/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePassword, confirmation: deleteConfirmation }),
      });

      const data = await response.json();

      if (response.ok) {
        await signOut({ redirectTo: "/" });
      } else {
        setActionMessage({ type: "error", text: data.error, field: "delete" });
      }
    } catch {
      setActionMessage({ type: "error", text: "Une erreur est survenue", field: "delete" });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading || accountLoading || notificationsLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Parametres</h1>
        <p className="text-gray-600">Gerez votre compte et vos preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 mb-6">
        <button
          onClick={() => setActiveTab("learning")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "learning"
              ? "border-teal-500 text-teal-600"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          Apprentissage
        </button>
        <button
          onClick={() => setActiveTab("account")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "account"
              ? "border-teal-500 text-teal-600"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          Compte
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "notifications"
              ? "border-teal-500 text-teal-600"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          Notifications
        </button>
      </div>

      {/* Learning Tab */}
      {activeTab === "learning" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Apprentissage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lecons par jour
                </label>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  value={settings.lessonsPerDay}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      lessonsPerDay: parseInt(e.target.value) || 20,
                    })
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  Nombre maximum de nouvelles lecons par session
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Taille des lots de revision
                </label>
                <Input
                  type="number"
                  min={5}
                  max={100}
                  value={settings.reviewBatchSize}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      reviewBatchSize: parseInt(e.target.value) || 10,
                    })
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  Nombre d&apos;elements par session de revision
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Lecture automatique</p>
                  <p className="text-sm text-gray-500">
                    Jouer automatiquement l&apos;audio des lectures
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      autoplayAudio: !settings.autoplayAudio,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    settings.autoplayAudio ? "bg-teal-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.autoplayAudio ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phrases d&apos;exemple</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Phrases personnalisees</p>
                  <p className="text-sm text-gray-500">
                    Generer des phrases utilisant uniquement les kanji que vous maitrisez
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      levelAwareSentencesEnabled: !settings.levelAwareSentencesEnabled,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    settings.levelAwareSentencesEnabled ? "bg-teal-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.levelAwareSentencesEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Confidentialite</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Apparaitre dans le classement</p>
                  <p className="text-sm text-gray-500">
                    Les autres joueurs verront votre pseudo, niveau et progression
                  </p>
                </div>
                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      leaderboardOptIn: !settings.leaderboardOptIn,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    settings.leaderboardOptIn ? "bg-teal-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.leaderboardOptIn ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {message && (
            <p
              className={`text-center ${
                message.includes("succes") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button onClick={handleSaveSettings} disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      )}

      {/* Account Tab */}
      {activeTab === "account" && account && (
        <div className="space-y-6">
          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-500">Email</p>
                  <p className="font-medium">{account.email}</p>
                </div>
                <div>
                  <p className="text-stone-500">Nom d&apos;utilisateur</p>
                  <p className="font-medium">{account.username}</p>
                </div>
                <div>
                  <p className="text-stone-500">Membre depuis</p>
                  <p className="font-medium">
                    {new Date(account.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div>
                  <p className="text-stone-500">Niveau actuel</p>
                  <p className="font-medium">{account.stats.currentLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Username */}
          <Card>
            <CardHeader>
              <CardTitle>Modifier le nom d&apos;utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Nouveau nom d'utilisateur"
              />
              {actionMessage?.field === "username" && (
                <p
                  className={`text-sm ${
                    actionMessage.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {actionMessage.text}
                </p>
              )}
              <Button
                onClick={handleUpdateUsername}
                disabled={actionLoading === "username" || newUsername === account.username}
              >
                {actionLoading === "username" ? "Modification..." : "Modifier"}
              </Button>
            </CardContent>
          </Card>

          {/* Change Email */}
          <Card>
            <CardHeader>
              <CardTitle>Modifier l&apos;adresse email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Nouvelle adresse email"
              />
              <Input
                type="password"
                value={emailPassword}
                onChange={(e) => setEmailPassword(e.target.value)}
                placeholder="Mot de passe actuel (pour confirmer)"
              />
              {actionMessage?.field === "email" && (
                <p
                  className={`text-sm ${
                    actionMessage.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {actionMessage.text}
                </p>
              )}
              <Button
                onClick={handleUpdateEmail}
                disabled={actionLoading === "email" || !newEmail || !emailPassword}
              >
                {actionLoading === "email" ? "Envoi..." : "Envoyer le lien de verification"}
              </Button>
              <p className="text-xs text-stone-500">
                Un email de verification sera envoye a la nouvelle adresse
              </p>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle>Modifier le mot de passe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Mot de passe actuel"
              />
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nouveau mot de passe"
              />
              <Input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirmer le nouveau mot de passe"
              />
              <p className="text-xs text-stone-500">
                8 caracteres min. avec majuscule, minuscule et chiffre
              </p>
              {actionMessage?.field === "password" && (
                <p
                  className={`text-sm ${
                    actionMessage.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {actionMessage.text}
                </p>
              )}
              <Button
                onClick={handleUpdatePassword}
                disabled={actionLoading === "password" || !currentPassword || !newPassword}
              >
                {actionLoading === "password" ? "Modification..." : "Modifier le mot de passe"}
              </Button>
            </CardContent>
          </Card>

          {/* Export Data */}
          <Card>
            <CardHeader>
              <CardTitle>Exporter mes données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-stone-600">
                Téléchargez une copie de toutes vos données personnelles (profil, progression,
                historique des révisions) au format JSON.
              </p>
              <Button
                variant="secondary"
                onClick={handleExportData}
                disabled={actionLoading === "export"}
              >
                {actionLoading === "export" ? "Export en cours..." : "Télécharger mes données"}
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Zone de danger</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-stone-600">
                La suppression de votre compte est irréversible. Toutes vos données seront
                définitivement supprimées.
              </p>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div className="space-y-6">
          {/* Master Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications par email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Activer les notifications</p>
                  <p className="text-sm text-gray-500">
                    Recevoir des emails concernant votre apprentissage
                  </p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({
                      ...notifications,
                      emailNotificationsEnabled: !notifications.emailNotificationsEnabled,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                    notifications.emailNotificationsEnabled ? "bg-teal-500" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.emailNotificationsEnabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Individual Preferences */}
          {notifications.emailNotificationsEnabled && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Types de notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Reviews Waiting */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <p className="font-medium text-gray-900">Révisions en attente</p>
                      <p className="text-sm text-gray-500">
                        Rappel quotidien quand vous avez des révisions à faire
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          notifyReviewsWaiting: !notifications.notifyReviewsWaiting,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                        notifications.notifyReviewsWaiting ? "bg-teal-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.notifyReviewsWaiting ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Streak At Risk */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <p className="font-medium text-gray-900">Alerte de serie</p>
                      <p className="text-sm text-gray-500">
                        Notification si votre serie risque d&apos;etre perdue
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          notifyStreakAtRisk: !notifications.notifyStreakAtRisk,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                        notifications.notifyStreakAtRisk ? "bg-teal-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.notifyStreakAtRisk ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Level Up */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <p className="font-medium text-gray-900">Passage de niveau</p>
                      <p className="text-sm text-gray-500">
                        Celebration quand vous atteignez un nouveau niveau
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          notifyLevelUp: !notifications.notifyLevelUp,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                        notifications.notifyLevelUp ? "bg-teal-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.notifyLevelUp ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Re-engagement */}
                  <div className="flex items-center justify-between py-2 border-b border-stone-100">
                    <div>
                      <p className="font-medium text-gray-900">Rappels de reengagement</p>
                      <p className="text-sm text-gray-500">
                        Rappels si vous n&apos;avez pas etudie depuis plusieurs jours
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          notifyReengagement: !notifications.notifyReengagement,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                        notifications.notifyReengagement ? "bg-teal-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.notifyReengagement ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Weekly Summary */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900">Resume hebdomadaire</p>
                      <p className="text-sm text-gray-500">
                        Resume de vos progres chaque dimanche
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({
                          ...notifications,
                          notifyWeeklySummary: !notifications.notifyWeeklySummary,
                        })
                      }
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                        notifications.notifyWeeklySummary ? "bg-teal-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.notifyWeeklySummary ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Timing Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Preferences horaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heure preferee pour les notifications
                    </label>
                    <select
                      value={notifications.preferredNotificationHour}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          preferredNotificationHour: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}h00
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fuseau horaire
                    </label>
                    <select
                      value={notifications.timezone}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          timezone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="Europe/Paris">Paris (Europe/Paris)</option>
                      <option value="Europe/London">Londres (Europe/London)</option>
                      <option value="Europe/Berlin">Berlin (Europe/Berlin)</option>
                      <option value="America/New_York">New York (America/New_York)</option>
                      <option value="America/Los_Angeles">Los Angeles (America/Los_Angeles)</option>
                      <option value="America/Montreal">Montreal (America/Montreal)</option>
                      <option value="Asia/Tokyo">Tokyo (Asia/Tokyo)</option>
                      <option value="Asia/Seoul">Seoul (Asia/Seoul)</option>
                      <option value="Australia/Sydney">Sydney (Australia/Sydney)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {notificationsMessage && (
            <p
              className={`text-center ${
                notificationsMessage.includes("succes") ? "text-green-600" : "text-red-600"
              }`}
            >
              {notificationsMessage}
            </p>
          )}

          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button onClick={handleSaveNotifications} disabled={notificationsSaving}>
              {notificationsSaving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletePassword("");
          setDeleteConfirmation("");
          setActionMessage(null);
        }}
        title="Supprimer votre compte"
      >
        <div className="space-y-4">
          <p className="text-sm text-stone-600">
            Cette action est irreversible. Toutes vos donnees seront definitivement supprimees.
          </p>
          <Input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Votre mot de passe"
          />
          <div>
            <label className="block text-sm text-stone-600 mb-1">
              Tapez <span className="font-mono font-bold">SUPPRIMER</span> pour confirmer
            </label>
            <Input
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="SUPPRIMER"
            />
          </div>
          {actionMessage?.field === "delete" && (
            <p className="text-sm text-red-600">{actionMessage.text}</p>
          )}
          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword("");
                setDeleteConfirmation("");
              }}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              disabled={
                actionLoading === "delete" ||
                !deletePassword ||
                deleteConfirmation !== "SUPPRIMER"
              }
            >
              {actionLoading === "delete" ? "Suppression..." : "Supprimer definitivement"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
