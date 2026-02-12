"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Level {
  id: number;
  name: string | null;
}

interface Kanji {
  kanji: {
    id: number;
    character: string;
    meaningsFr: string[];
  };
}

interface Radical {
  id: number;
  character: string | null;
  meaningFr: string;
  mnemonic: string;
  imageUrl: string | null;
  level: Level;
  kanji: Kanji[];
}

export default function AdminRadicalEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [radical, setRadical] = useState<Radical | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [character, setCharacter] = useState("");
  const [meaningFr, setMeaningFr] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [levelId, setLevelId] = useState<number | "">("");

  useEffect(() => {
    Promise.all([fetchRadical(), fetchLevels()]);
  }, [id]);

  const fetchRadical = async () => {
    try {
      const res = await fetch(`/api/admin/content/radicals/${id}`);
      if (res.ok) {
        const data = await res.json();
        setRadical(data.radical);
        setCharacter(data.radical.character || "");
        setMeaningFr(data.radical.meaningFr);
        setMnemonic(data.radical.mnemonic || "");
        setImageUrl(data.radical.imageUrl || "");
        setLevelId(data.radical.level.id);
      } else if (res.status === 404) {
        router.push("/admin/content/radicals");
      }
    } catch (error) {
      console.error("Failed to fetch radical:", error);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/content/radicals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: character || null,
          meaningFr,
          mnemonic: mnemonic || null,
          imageUrl: imageUrl || null,
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

  const handleDelete = async () => {
    if (!confirm("Etes-vous sur de vouloir supprimer ce radical ?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/content/radicals/${id}`, {
        method: "DELETE",
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
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-stone-500">Chargement...</div>
      </div>
    );
  }

  if (!radical) {
    return (
      <div className="p-8">
        <div className="text-stone-500">Radical non trouve</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          href="/admin/content/radicals"
          className="text-stone-500 hover:text-stone-700 text-sm mb-2 inline-block"
        >
          &larr; Retour aux radicaux
        </Link>
        <h1 className="text-2xl font-bold text-stone-900">Modifier le radical</h1>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Niveau
              </label>
              <select
                value={levelId}
                onChange={(e) => setLevelId(parseInt(e.target.value))}
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
                value={meaningFr}
                onChange={(e) => setMeaningFr(e.target.value)}
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
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              placeholder="Une histoire pour retenir la signification..."
            />
          </div>
        </div>

        {/* Related Kanji */}
        {radical.kanji.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Kanji utilisant ce radical ({radical.kanji.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {radical.kanji.map(({ kanji }) => (
                <Link
                  key={kanji.id}
                  href={`/admin/content/kanji/${kanji.id}`}
                  className="px-3 py-2 bg-stone-100 hover:bg-amber-100 rounded-lg text-center"
                >
                  <span className="text-xl">{kanji.character}</span>
                  <span className="text-xs text-stone-500 ml-2">{kanji.meaningsFr[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting || radical.kanji.length > 0}
            className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? "Suppression..." : "Supprimer"}
          </button>

          <div className="flex gap-2">
            <Link
              href="/admin/content/radicals"
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
