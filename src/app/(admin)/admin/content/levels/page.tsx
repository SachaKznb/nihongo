"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Level {
  id: string;
  number: number;
  _count: {
    radicals: number;
    kanji: number;
    vocabulary: number;
  };
}

export default function AdminLevelsPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newLevelNumber, setNewLevelNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      const res = await fetch("/api/admin/content/levels?limit=100");
      if (res.ok) {
        const data = await res.json();
        setLevels(data.levels);
      }
    } catch (error) {
      console.error("Failed to fetch levels:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCreating(true);

    try {
      const res = await fetch("/api/admin/content/levels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number: parseInt(newLevelNumber) }),
      });

      if (res.ok) {
        setNewLevelNumber("");
        await fetchLevels();
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (level: Level) => {
    if (level._count.radicals + level._count.kanji + level._count.vocabulary > 0) {
      alert("Ce niveau contient du contenu. Supprimez d'abord le contenu.");
      return;
    }

    if (!confirm(`Supprimer le niveau ${level.number} ?`)) return;

    try {
      const res = await fetch(`/api/admin/content/levels/${level.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchLevels();
      } else {
        const data = await res.json();
        alert(data.error || "Une erreur est survenue");
      }
    } catch {
      alert("Une erreur est survenue");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Niveaux</h1>
        <p className="text-stone-500 mt-1">{levels.length} niveaux</p>
      </div>

      {/* Create New Level */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 mb-6">
        <form onSubmit={handleCreate} className="flex items-end gap-4">
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Nouveau niveau
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={newLevelNumber}
              onChange={(e) => setNewLevelNumber(e.target.value)}
              placeholder="Numero du niveau"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={creating || !newLevelNumber}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
          >
            {creating ? "Creation..." : "Creer"}
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      {/* Levels Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500">Chargement...</div>
        ) : levels.length === 0 ? (
          <div className="p-12 text-center text-stone-500">Aucun niveau</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                    Niveau
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                    Radicaux
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                    Kanji
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                    Vocabulaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {levels.map((level) => {
                  const total = level._count.radicals + level._count.kanji + level._count.vocabulary;
                  return (
                    <tr key={level.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-stone-900">
                          {level.number}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/content/radicals?levelId=${level.id}`}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          {level._count.radicals}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/content/kanji?levelId=${level.id}`}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          {level._count.kanji}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/content/vocabulary?levelId=${level.id}`}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          {level._count.vocabulary}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-stone-500">{total}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(level)}
                          disabled={total > 0}
                          className="text-red-600 hover:text-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
