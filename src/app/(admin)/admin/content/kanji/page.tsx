"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Level {
  id: string;
  number: number;
}

interface Radical {
  radical: {
    id: string;
    character: string | null;
    meaning: string;
  };
}

interface Kanji {
  id: string;
  character: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  level: Level;
  radicals: Radical[];
}

interface KanjiResponse {
  kanji: Kanji[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminKanjiPage() {
  const [kanji, setKanji] = useState<Kanji[]>([]);
  const [levels, setLevels] = useState<{ id: string; number: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [levelId, setLevelId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

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

  const fetchKanji = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
        search,
        levelId,
      });

      const res = await fetch(`/api/admin/content/kanji?${params}`);
      if (res.ok) {
        const data: KanjiResponse = await res.json();
        setKanji(data.kanji);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch kanji:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, levelId]);

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    fetchKanji();
  }, [fetchKanji]);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Kanji</h1>
          <p className="text-stone-500 mt-1">{total} kanji au total</p>
        </div>
        <Link
          href="/admin/content/kanji/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
        >
          Ajouter un kanji
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Rechercher par caractere ou signification..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <select
            value={levelId}
            onChange={(e) => {
              setLevelId(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Tous les niveaux</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                Niveau {level.number}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanji Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500">Chargement...</div>
        ) : kanji.length === 0 ? (
          <div className="p-12 text-center text-stone-500">Aucun kanji trouve</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {kanji.map((k) => (
              <Link
                key={k.id}
                href={`/admin/content/kanji/${k.id}`}
                className="bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-3xl mb-2">{k.character}</div>
                <div className="text-sm font-medium text-stone-900 truncate">
                  {k.meaning}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Niveau {k.level.number}
                </div>
                {k.onyomi.length > 0 && (
                  <div className="text-xs text-stone-400 mt-1 truncate">
                    {k.onyomi.join(", ")}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-stone-200 flex items-center justify-between">
            <p className="text-sm text-stone-500">
              Page {page} sur {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm border border-stone-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                Precedent
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm border border-stone-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-50"
              >
                Suivant
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
