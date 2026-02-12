"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  name: string | null;
}

export default function AdminNewRadicalPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [character, setCharacter] = useState("");
  const [meaning, setMeaning] = useState("");
  const [meaningMnemonic, setMeaningMnemonic] = useState("");
  const [image, setImage] = useState("");
  const [levelId, setLevelId] = useState("");

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const res = await fetch("/api/admin/content/levels?limit=100");
      if (res.ok) {
        const data = await res.json();
        setLevels(data.levels);
        if (data.levels.length > 0) {
          setLevelId(data.levels[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch levels:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/content/radicals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: character || undefined,
          meaning,
          meaningMnemonic: meaningMnemonic || undefined,
          image: image || undefined,
          levelId,
        }),
      });

      if (res.ok) {
        router.push("/admin/content/radicals");
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/content/radicals"
          className="text-stone-500 hover:text-stone-700 text-sm mb-2 inline-block"
        >
          &larr; Retour aux radicaux
        </Link>
        <h1 className="text-2xl font-bold text-stone-900">Nouveau radical</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Informations de base</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Caractere (optionnel)
              </label>
              <input
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                maxLength={10}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-2xl text-center"
                placeholder="一"
              />
              <p className="text-xs text-stone-500 mt-1">
                Laissez vide si le radical utilise une image
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Niveau
              </label>
              <select
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    Niveau {level.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Signification
              </label>
              <input
                type="text"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Sol, terre"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                URL de l&apos;image (optionnel)
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="/radicals/ground.svg"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Mnemonique</h2>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Mnemonique de signification
            </label>
            <textarea
              value={meaningMnemonic}
              onChange={(e) => setMeaningMnemonic(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Une histoire pour retenir la signification..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link
            href="/admin/content/radicals"
            className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={saving || !levelId}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            {saving ? "Creation..." : "Creer"}
          </button>
        </div>
      </form>
    </div>
  );
}
