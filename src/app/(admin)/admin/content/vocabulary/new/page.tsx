"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  name: string | null;
}

interface KanjiItem {
  id: string;
  character: string;
  meaning: string;
}

export default function AdminNewVocabPage() {
  const router = useRouter();
  const [levels, setLevels] = useState<Level[]>([]);
  const [allKanji, setAllKanji] = useState<KanjiItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [word, setWord] = useState("");
  const [reading, setReading] = useState("");
  const [meaning, setMeaning] = useState("");
  const [meaningMnemonic, setMeaningMnemonic] = useState("");
  const [readingMnemonic, setReadingMnemonic] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [levelId, setLevelId] = useState("");
  const [kanjiIds, setKanjiIds] = useState<string[]>([]);

  useEffect(() => {
    fetchLevels();
    fetchKanji();
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

  const fetchKanji = async () => {
    try {
      const res = await fetch("/api/admin/content/kanji?limit=2000");
      if (res.ok) {
        const data = await res.json();
        setAllKanji(data.kanji);
      }
    } catch (error) {
      console.error("Failed to fetch kanji:", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/content/vocabulary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word,
          reading,
          meaning,
          meaningMnemonic: meaningMnemonic || undefined,
          readingMnemonic: readingMnemonic || undefined,
          partOfSpeech: partOfSpeech || undefined,
          levelId,
          kanjiIds: kanjiIds.length > 0 ? kanjiIds : undefined,
        }),
      });

      if (res.ok) {
        router.push("/admin/content/vocabulary");
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

  const toggleKanji = (kanjiId: string) => {
    setKanjiIds((prev) =>
      prev.includes(kanjiId)
        ? prev.filter((id) => id !== kanjiId)
        : [...prev, kanjiId]
    );
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/content/vocabulary"
          className="text-stone-500 hover:text-stone-700 text-sm mb-2 inline-block"
        >
          &larr; Retour au vocabulaire
        </Link>
        <h1 className="text-2xl font-bold text-stone-900">Nouveau mot</h1>
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
                Mot
              </label>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xl"
                placeholder="日本"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Lecture (hiragana)
              </label>
              <input
                type="text"
                value={reading}
                onChange={(e) => setReading(e.target.value)}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="にほん"
              />
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
                placeholder="Japon"
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
                    Niveau {level.id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Type de mot
              </label>
              <input
                type="text"
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="nom, verbe, adjectif..."
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

        {/* Kanji Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">
            Kanji composants ({kanjiIds.length} selectionnes)
          </h2>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            {allKanji.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => toggleKanji(k.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  kanjiIds.includes(k.id)
                    ? "bg-amber-100 border-amber-300 border-2"
                    : "bg-stone-100 border border-stone-200 hover:bg-stone-200"
                }`}
              >
                <span className="text-lg mr-1">{k.character}</span>
                <span className="text-stone-600">{k.meaning}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link
            href="/admin/content/vocabulary"
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
