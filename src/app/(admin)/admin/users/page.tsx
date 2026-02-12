"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  emailVerified: string | null;
  isAdmin: boolean;
  isSuspended: boolean;
  currentLevel: number;
  currentStreak: number;
  totalXp: number;
  lastStudyDate: string | null;
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        search,
        status,
      });

      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data: UsersResponse = await res.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Utilisateurs</h1>
        <p className="text-stone-500 mt-1">{total} utilisateurs au total</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Rechercher par email ou nom..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="suspended">Suspendus</option>
            <option value="unverified">Non verifies</option>
            <option value="admin">Administrateurs</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  XP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Serie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Inscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-500">
                    Chargement...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-stone-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-stone-900">
                          {user.username}
                          {user.isAdmin && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-stone-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isSuspended ? (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                          Suspendu
                        </span>
                      ) : !user.emailVerified ? (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          Non verifie
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Actif
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-stone-900">{user.currentLevel}</td>
                    <td className="px-6 py-4 text-stone-900">
                      {user.totalXp.toLocaleString("fr-FR")}
                    </td>
                    <td className="px-6 py-4 text-stone-900">
                      {user.currentStreak > 0 ? `${user.currentStreak}j` : "-"}
                    </td>
                    <td className="px-6 py-4 text-stone-500 text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="text-amber-600 hover:text-amber-700 font-medium text-sm"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
