"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface UserSettings {
  lessonsPerDay: number;
  reviewBatchSize: number;
  autoplayAudio: boolean;
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<UserSettings>({
    lessonsPerDay: 20,
    reviewBatchSize: 10,
    autoplayAudio: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleSave = async () => {
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
    } catch (error) {
      setMessage("Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
        <p className="text-gray-600">Personnalisez votre experience d&apos;apprentissage</p>
      </div>

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
                Nombre maximum de nouvelles leçons par session
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Taille des lots de révision
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
                Nombre d&apos;éléments par session de révision
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
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                  settings.autoplayAudio ? "bg-pink-500" : "bg-gray-200"
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
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
