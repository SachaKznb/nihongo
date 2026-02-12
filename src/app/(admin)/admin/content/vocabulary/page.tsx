"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Level {
  id: number;
}

interface Vocab {
  id: number;
  word: string;
  readings: string[];
  meaningsFr: string[];
  level: Level;
}

interface VocabResponse {
  vocabulary: Vocab[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminVocabularyPage() {
  const [vocabulary, setVocabulary] = useState<Vocab[]>([]);
  const [levels, setLevels] = useState<{ id: number; name: string | null }[]>([]);
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

  const fetchVocabulary = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
        search,
        levelId,
      });

      const res = await fetch(`/api/admin/content/vocabulary?${params}`);
      if (res.ok) {
        const data: VocabResponse = await res.json();
        setVocabulary(data.vocabulary);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch vocabulary:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, levelId]);

  useEffect(() => {
    fetchLevels();
  }, []);

  useEffect(() => {
    fetchVocabulary();
  }, [fetchVocabulary]);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Vocabulaire</h1>
          <p className="text-stone-500 mt-1">{total} mots au total</p>
        </div>
        <Link
          href="/admin/content/vocabulary/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
        >
          Ajouter un mot
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Rechercher par mot, lecture ou signification..."
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
                Niveau {level.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vocabulary Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500">Chargement...</div>
        ) : vocabulary.length === 0 ? (
          <div className="p-12 text-center text-stone-500">Aucun mot trouve</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {vocabulary.map((vocab) => (
              <Link
                key={vocab.id}
                href={`/admin/content/vocabulary/${vocab.id}`}
                className="bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2 font-japanese">{vocab.word}</div>
                <div className="text-sm font-medium text-stone-900 truncate">
                  {vocab.meaningsFr[0]}
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  Niveau {vocab.level.id}
                </div>
                {vocab.readings.length > 0 && (
                  <div className="text-xs text-stone-400 mt-1 truncate">
                    {vocab.readings.join(", ")}
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
