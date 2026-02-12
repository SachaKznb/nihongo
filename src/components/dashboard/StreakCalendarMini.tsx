"use client";

import Link from "next/link";

interface CalendarDay {
  date: string;
  studied: boolean;
  reviews: number;
}

interface StreakCalendarMiniProps {
  data: CalendarDay[];
}

function getIntensityClass(reviews: number): string {
  if (reviews === 0) return "bg-stone-200";
  if (reviews < 20) return "bg-emerald-200";
  if (reviews < 50) return "bg-emerald-400";
  if (reviews < 100) return "bg-emerald-500";
  return "bg-emerald-600";
}

export function StreakCalendarMini({ data }: StreakCalendarMiniProps) {
  // Take last 7 days
  const last7Days = data.slice(-7);

  // Pad to 7 days if needed
  while (last7Days.length < 7) {
    last7Days.unshift({ date: "", studied: false, reviews: 0 });
  }

  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

  // Get day of week for each date
  const getDayIndex = (dateStr: string): number => {
    if (!dateStr) return -1;
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday=0
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-stone-700">Cette semaine</h3>
        <Link
          href="/stats"
          className="text-xs text-teal-600 hover:text-teal-700 font-medium"
        >
          Voir tout →
        </Link>
      </div>

      <div className="flex justify-between gap-1">
        {last7Days.map((day, index) => {
          const dayIndex = day.date ? getDayIndex(day.date) : index;
          const isToday =
            day.date &&
            new Date(day.date).toDateString() === new Date().toDateString();

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-stone-400 font-medium">
                {dayLabels[dayIndex >= 0 ? dayIndex : index]}
              </span>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md ${getIntensityClass(
                  day.reviews
                )} ${isToday ? "ring-2 ring-teal-500 ring-offset-1" : ""}`}
                title={
                  day.date
                    ? `${new Date(day.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      })}: ${day.reviews} révisions`
                    : "Pas de données"
                }
              />
              {day.date && (
                <span className="text-[10px] text-stone-400">
                  {day.reviews > 0 ? day.reviews : "-"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
