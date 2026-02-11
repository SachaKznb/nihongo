"use client";

import type { SrsBreakdown as SrsBreakdownType } from "@/types";

interface SrsBreakdownProps {
  breakdown: SrsBreakdownType;
}

export function SrsBreakdown({ breakdown }: SrsBreakdownProps) {
  const categories = [
    { key: "apprentice", label: "Apprenti", color: "bg-pink-500", count: breakdown.apprentice },
    { key: "guru", label: "Guru", color: "bg-purple-500", count: breakdown.guru },
    { key: "master", label: "Maitre", color: "bg-blue-500", count: breakdown.master },
    { key: "enlightened", label: "Illumine", color: "bg-yellow-500", count: breakdown.enlightened },
    { key: "burned", label: "Brule", color: "bg-gray-800", count: breakdown.burned },
  ];

  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-3">
      <div className="flex gap-1 h-4 rounded-full overflow-hidden bg-gray-200">
        {categories.map((cat) => {
          const width = total > 0 ? (cat.count / total) * 100 : 0;
          if (width === 0) return null;
          return (
            <div
              key={cat.key}
              className={`${cat.color} transition-all duration-300`}
              style={{ width: `${width}%` }}
              title={`${cat.label}: ${cat.count}`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {categories.map((cat) => (
          <div key={cat.key} className="text-center">
            <div className={`w-3 h-3 ${cat.color} rounded-full mx-auto mb-1`} />
            <div className="text-xs text-gray-600">{cat.label}</div>
            <div className="text-sm font-semibold">{cat.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
