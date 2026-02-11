"use client";

import { useState, useEffect, useCallback } from "react";

interface Admin {
  id: string;
  username: string;
  email: string;
}

interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  targetType: string;
  targetId: string;
  details: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  admin: Admin;
}

interface AuditResponse {
  logs: AuditLog[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [targetType, setTargetType] = useState("");
  const [action, setAction] = useState("");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "50",
      });
      if (targetType) params.set("targetType", targetType);
      if (action) params.set("action", action);

      const res = await fetch(`/api/admin/audit?${params}`);
      if (res.ok) {
        const data: AuditResponse = await res.json();
        setLogs(data.logs);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
    } finally {
      setLoading(false);
    }
  }, [page, targetType, action]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      "user.update": "Modification utilisateur",
      "user.suspend": "Suspension utilisateur",
      "user.unsuspend": "Levee de suspension",
      "user.reset-password": "Reinitialisation MDP",
      "content.create": "Creation contenu",
      "content.update": "Modification contenu",
      "content.delete": "Suppression contenu",
    };
    return labels[action] || action;
  };

  const getTargetTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      user: "Utilisateur",
      radical: "Radical",
      kanji: "Kanji",
      vocabulary: "Vocabulaire",
      level: "Niveau",
    };
    return labels[type] || type;
  };

  const getActionColor = (action: string) => {
    if (action.includes("delete") || action.includes("suspend")) {
      return "text-red-600 bg-red-50";
    }
    if (action.includes("create")) {
      return "text-green-600 bg-green-50";
    }
    return "text-blue-600 bg-blue-50";
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Journal d&apos;audit</h1>
        <p className="text-stone-500 mt-1">{total} actions enregistrees</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 mb-6">
        <div className="flex flex-wrap gap-4">
          <select
            value={targetType}
            onChange={(e) => {
              setTargetType(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Tous les types</option>
            <option value="user">Utilisateur</option>
            <option value="radical">Radical</option>
            <option value="kanji">Kanji</option>
            <option value="vocabulary">Vocabulaire</option>
            <option value="level">Niveau</option>
          </select>
          <select
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">Toutes les actions</option>
            <option value="create">Creation</option>
            <option value="update">Modification</option>
            <option value="delete">Suppression</option>
            <option value="suspend">Suspension</option>
          </select>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500">Chargement...</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-stone-500">Aucune action enregistree</div>
        ) : (
          <div className="divide-y divide-stone-200">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-stone-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getActionColor(log.action)}`}
                      >
                        {getActionLabel(log.action)}
                      </span>
                      <span className="text-xs text-stone-500">
                        {getTargetTypeLabel(log.targetType)}
                      </span>
                    </div>
                    <p className="text-sm text-stone-900">
                      <span className="font-medium">{log.admin.username}</span>
                      <span className="text-stone-500"> a effectue une action sur </span>
                      <span className="font-mono text-xs bg-stone-100 px-1 rounded">
                        {log.targetId}
                      </span>
                    </p>
                    {log.details && (
                      <div className="mt-2 text-xs text-stone-500 bg-stone-50 p-2 rounded">
                        <pre className="whitespace-pre-wrap overflow-hidden">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 whitespace-nowrap ml-4">
                    {formatDate(log.createdAt)}
                  </div>
                </div>
              </div>
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
