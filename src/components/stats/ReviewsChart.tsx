"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DayStat {
  date: string;
  reviews: number;
  lessons: number;
}

interface ReviewsChartProps {
  data: DayStat[];
}

export function ReviewsChart({ data }: ReviewsChartProps) {
  // Format data for the chart
  const chartData = data.map((day) => ({
    date: new Date(day.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    }),
    reviews: day.reviews - day.lessons, // Reviews only (not lessons)
    lessons: day.lessons,
  }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
            labelStyle={{ color: "#9CA3AF" }}
          />
          <Legend
            wrapperStyle={{ color: "#9CA3AF" }}
            formatter={(value) => (value === "reviews" ? "Révisions" : "Leçons")}
          />
          <Bar
            dataKey="lessons"
            stackId="a"
            fill="#EC4899"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="reviews"
            stackId="a"
            fill="#8B5CF6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
