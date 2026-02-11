"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Level {
  id: string;
  number: number;
}

interface Radical {
  id: string;
  character: string | null;
  meaning: string;
  image: string | null;
}

export default function AdminNewKanjiPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [allRadicals, setAllRadicals] = useState<Radical[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [character, setCharacter] = useState("");
  const [meaning, setMeaning] = useState("");
  const [meaningMnemonic, setMeaningMnemonic] = useState("");
  const [onyomi, setOnyomi] = useState("");
  const [kunyomi, setKunyomi] = useState("");
  const [readingMnemonic, setReadingMnemonic] = useState("");
  const [levelId, setLevelId] = useState("");
  const [radicalIds, setRadicalIds] = useState<string[]>([]);

  useEffect(() => {
    fetchLevels();
    fetchRadicals();
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

  const fetchRadicals = async () => {
    try {
      const res = await fetch("/api/admin/content/radicals?limit=500");
      if (res.ok) {
        const data = await res.json();
        setAllRadicals(data.radicals);
      }
    } catch (error) {
      console.error("Failed to fetch radicals:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/content/kanji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          meaning,
          meaningMnemonic: meaningMnemonic || undefined,
          onyomi: onyomi.split(",").map((s) => s.trim()).filter(Boolean),
          kunyomi: kunyomi.split(",").map((s) => s.trim()).filter(Boolean),
          readingMnemonic: readingMnemonic || undefined,
          levelId,
          radicalIds: radicalIds.length > 0 ? radicalIds : undefined,
        }),
      });

      if (res.ok) {
        router.push("/admin/content/kanji");
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

  const toggleRadical = (radicalId: string) => {
    setRadicalIds((prev) =>
      prev.includes(radicalId)
        ? prev.filter((id) => id !== radicalId)
        : [...prev, radicalId]
    );
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/content/kanji"
          className="text-stone-500 hover:text-stone-700 text-sm mb-2 inline-block"
        >
          &larr; Retour aux kanji
        </Link>
        <h1 className="text-2xl font-bold text-stone-900">Nouveau kanji</h1>
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
                Caractere
              </label>
              <input
                type="text"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                maxLength={1}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-2xl text-center"
                placeholder="日"
              />
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
                    Niveau {level.number}
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
                placeholder="Soleil, jour"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                On&apos;yomi (separes par virgule)
              </label>
              <input
                type="text"
                value={onyomi}
                onChange={(e) => setOnyomi(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="ニチ, ジツ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Kun&apos;yomi (separes par virgule)
              </label>
              <input
                type="text"
                value={kunyomi}
                onChange={(e) => setKunyomi(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="ひ, か"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">Mnemoniques</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Mnemonique de signification
              </label>
              <textarea
                value={meaningMnemonic}
                onChange={(e) => setMeaningMnemonic(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Mnemonique de lecture
              </label>
              <textarea
                value={readingMnemonic}
                onChange={(e) => setReadingMnemonic(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Radicals Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">
            Radicaux composants ({radicalIds.length} selectionnes)
          </h2>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {allRadicals.map((radical) => (
              <button
                key={radical.id}
                type="button"
                onClick={() => toggleRadical(radical.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  radicalIds.includes(radical.id)
                    ? "bg-amber-100 border-amber-300 border-2"
                    : "bg-stone-100 border border-stone-200 hover:bg-stone-200"
                }`}
              >
                <span className="text-lg mr-1">
                  {radical.character || (radical.image ? "🖼" : "?")}
                </span>
                <span className="text-stone-600">{radical.meaning}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link
            href="/admin/content/kanji"
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
