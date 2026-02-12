"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DayStat {
  date: string;
  accuracy: number;
  reviews: number;
}

interface AccuracyChartProps {
  data: DayStat[];
}

export function AccuracyChart({ data }: AccuracyChartProps) {
  // Format data for the chart
  const chartData = data.map((day) => ({
    date: new Date(day.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    }),
    accuracy: day.accuracy,
    reviews: day.reviews,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#9CA3AF"
            fontSize={12}
            tickLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
            formatter={(value) => [`${value}%`, "Précision"]}
            labelStyle={{ color: "#9CA3AF" }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#10B981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
