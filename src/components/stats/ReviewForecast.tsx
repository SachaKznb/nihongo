"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ForecastEntry {
  hour: string;
  count: number;
}

interface ReviewForecastProps {
  data: ForecastEntry[];
}

export function ReviewForecast({ data }: ReviewForecastProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-gray-400">
        Aucune revision programmee
      </div>
    );
  }

  // Group by day and sum counts
  const dailyData = new Map<string, number>();
  for (const entry of data) {
    const date = entry.hour.split("T")[0];
    dailyData.set(date, (dailyData.get(date) || 0) + entry.count);
  }

  const chartData = Array.from(dailyData.entries())
    .slice(0, 7) // Next 7 days
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
      }),
      count,
    }));

  const maxCount = Math.max(...chartData.map((d) => d.count), 1);

  return (
    <div className="w-full">
      {/* Chart */}
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              domain={[0, maxCount + 10]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              formatter={(value) => [value, "Revisions"]}
              labelStyle={{ color: "#9CA3AF" }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorForecast)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">
            {chartData[0]?.count || 0}
          </div>
          <div className="text-xs text-gray-500">Aujourd&apos;hui</div>
        </div>
        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-gray-300">
            {chartData.slice(0, 3).reduce((sum, d) => sum + d.count, 0)}
          </div>
          <div className="text-xs text-gray-500">3 prochains jours</div>
        </div>
        <div className="p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-gray-300">
            {chartData.reduce((sum, d) => sum + d.count, 0)}
          </div>
          <div className="text-xs text-gray-500">Cette semaine</div>
        </div>
      </div>
    </div>
  );
}
