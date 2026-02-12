"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
}

interface Radical {
  id: number;
  character: string | null;
  meaningFr: string;
  imageUrl: string | null;
}

interface Vocab {
  vocabulary: {
    id: number;
    word: string;
    meaningsFr: string[];
  };
}

interface Kanji {
  id: number;
  character: string;
  meaningsFr: string[];
  meaningMnemonicFr: string;
  readingsOn: string[];
  readingsKun: string[];
  readingMnemonicFr: string;
  level: Level;
  radicals: { radical: Radical }[];
  vocabulary: Vocab[];
}

export default function AdminKanjiEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [kanji, setKanji] = useState<Kanji | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [allRadicals, setAllRadicals] = useState<Radical[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [character, setCharacter] = useState("");
  const [meaningsFr, setMeaningsFr] = useState("");
  const [meaningMnemonicFr, setMeaningMnemonicFr] = useState("");
  const [readingsOn, setReadingsOn] = useState("");
  const [readingsKun, setReadingsKun] = useState("");
  const [readingMnemonicFr, setReadingMnemonicFr] = useState("");
  const [levelId, setLevelId] = useState<number | "">("");
  const [radicalIds, setRadicalIds] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([fetchKanji(), fetchLevels(), fetchRadicals()]);
  }, [id]);

  const fetchKanji = async () => {
    try {
      const res = await fetch(`/api/admin/content/kanji/${id}`);
      if (res.ok) {
        const data = await res.json();
        setKanji(data.kanji);
        setCharacter(data.kanji.character);
        setMeaningsFr(data.kanji.meaningsFr.join(", "));
        setMeaningMnemonicFr(data.kanji.meaningMnemonicFr || "");
        setReadingsOn(data.kanji.readingsOn.join(", "));
        setReadingsKun(data.kanji.readingsKun.join(", "));
        setReadingMnemonicFr(data.kanji.readingMnemonicFr || "");
        setLevelId(data.kanji.level.id);
        setRadicalIds(data.kanji.radicals.map((r: { radical: Radical }) => r.radical.id));
      } else if (res.status === 404) {
        router.push("/admin/content/kanji");
      }
    } catch (error) {
      console.error("Failed to fetch kanji:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLevels = async () => {
    try {
      const res = await fetch("/api/admin/content/levels?limit=100");
      if (res.ok) {
        const data = await res.json();
        setLevels(data.levels);
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
      const res = await fetch(`/api/admin/content/kanji/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character,
          meaningsFr: meaningsFr.split(",").map((s) => s.trim()).filter(Boolean),
          meaningMnemonicFr: meaningMnemonicFr,
          readingsOn: readingsOn.split(",").map((s) => s.trim()).filter(Boolean),
          readingsKun: readingsKun.split(",").map((s) => s.trim()).filter(Boolean),
          readingMnemonicFr: readingMnemonicFr,
          levelId: Number(levelId),
          radicalIds,
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

  const handleDelete = async () => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce kanji ?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/content/kanji/${id}`, {
        method: "DELETE",
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
      setDeleting(false);
    }
  };

  const toggleRadical = (radicalId: number) => {
    setRadicalIds((prev) =>
      prev.includes(radicalId)
        ? prev.filter((id) => id !== radicalId)
        : [...prev, radicalId]
    );
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-stone-500">Chargement...</div>
      </div>
    );
  }

  if (!kanji) {
    return (
      <div className="p-8">
        <div className="text-stone-500">Kanji non trouve</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/content/kanji"
          className="text-stone-500 hover:text-stone-700 text-sm mb-2 inline-block"
        >
          &larr; Retour aux kanji
        </Link>
        <h1 className="text-2xl font-bold text-stone-900">
          Modifier le kanji {kanji.character}
        </h1>
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Niveau
              </label>
              <select
                value={levelId}
                onChange={(e) => setLevelId(Number(e.target.value))}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Selectionner un niveau</option>
                {levels.map((level) => (
                  <option key={level.id} value={level.id}>
                    Niveau {level.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Significations (separees par virgule)
              </label>
              <input
                type="text"
                value={meaningsFr}
                onChange={(e) => setMeaningsFr(e.target.value)}
                required
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Un, Premier"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                On&apos;yomi (separes par virgule)
              </label>
              <input
                type="text"
                value={readingsOn}
                onChange={(e) => setReadingsOn(e.target.value)}
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
                value={readingsKun}
                onChange={(e) => setReadingsKun(e.target.value)}
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
                value={meaningMnemonicFr}
                onChange={(e) => setMeaningMnemonicFr(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Mnemonique de lecture
              </label>
              <textarea
                value={readingMnemonicFr}
                onChange={(e) => setReadingMnemonicFr(e.target.value)}
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
                  {radical.character || (radical.imageUrl ? "🖼" : "?")}
                </span>
                <span className="text-stone-600">{radical.meaningFr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Related Vocabulary */}
        {kanji.vocabulary.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Vocabulaire utilisant ce kanji ({kanji.vocabulary.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {kanji.vocabulary.map(({ vocabulary }) => (
                <Link
                  key={vocabulary.id}
                  href={`/admin/content/vocabulary/${vocabulary.id}`}
                  className="px-3 py-2 bg-stone-100 hover:bg-amber-100 rounded-lg"
                >
                  <span className="font-medium">{vocabulary.word}</span>
                  <span className="text-xs text-stone-500 ml-2">{vocabulary.meaningsFr[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || kanji.vocabulary.length > 0}
            className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? "Suppression..." : "Supprimer"}
          </button>

          <div className="flex gap-2">
            <Link
              href="/admin/content/kanji"
              className="px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
