"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface SRSDistributionProps {
  data: {
    apprentice: number;
    guru: number;
    master: number;
    enlightened: number;
    burned: number;
  };
}

const COLORS = {
  apprentice: "#EC4899", // Pink
  guru: "#8B5CF6", // Purple
  master: "#3B82F6", // Blue
  enlightened: "#F59E0B", // Amber
  burned: "#1F2937", // Dark gray
};

const LABELS = {
  apprentice: "Apprenti",
  guru: "Guru",
  master: "Maître",
  enlightened: "Shodan",
  burned: "Satori",
};

export function SRSDistribution({ data }: SRSDistributionProps) {
  const chartData = [
    { name: LABELS.apprentice, value: data.apprentice, color: COLORS.apprentice },
    { name: LABELS.guru, value: data.guru, color: COLORS.guru },
    { name: LABELS.master, value: data.master, color: COLORS.master },
    { name: LABELS.enlightened, value: data.enlightened, color: COLORS.enlightened },
    { name: LABELS.burned, value: data.burned, color: COLORS.burned },
  ].filter((item) => item.value > 0);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
        Aucun élément appris pour le moment
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
            formatter={(value, name) => [
              `${value} (${Math.round((Number(value) / total) * 100)}%)`,
              name,
            ]}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: "20px" }}
            formatter={(value) => (
              <span style={{ color: "#9CA3AF" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
