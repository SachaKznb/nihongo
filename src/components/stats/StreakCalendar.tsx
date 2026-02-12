"use client";

interface CalendarDay {
  date: string;
  studied: boolean;
  reviews: number;
}

interface StreakCalendarProps {
  data: CalendarDay[];
}

function getIntensityClass(reviews: number): string {
  if (reviews === 0) return "bg-gray-800";
  if (reviews < 20) return "bg-emerald-900";
  if (reviews < 50) return "bg-emerald-700";
  if (reviews < 100) return "bg-emerald-500";
  return "bg-emerald-400";
}

export function StreakCalendar({ data }: StreakCalendarProps) {
  // Group data by weeks
  const weeks: CalendarDay[][] = [];
  let currentWeek: CalendarDay[] = [];

  // Pad the first week to align with the day of week
  if (data.length > 0) {
    const firstDate = new Date(data[0].date);
    const dayOfWeek = firstDate.getDay();
    // Adjust for Monday start (0 = Monday in our display)
    const paddingDays = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    for (let i = 0; i < paddingDays; i++) {
      currentWeek.push({ date: "", studied: false, reviews: 0 });
    }
  }

  for (const day of data) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add remaining days
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const dayLabels = ["L", "M", "M", "J", "V", "S", "D"];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-2">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="w-3 h-3 text-[10px] text-gray-500 flex items-center justify-center"
            >
              {i % 2 === 0 ? label : ""}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-3 h-3 rounded-sm ${
                  day.date
                    ? getIntensityClass(day.reviews)
                    : "bg-transparent"
                }`}
                title={
                  day.date
                    ? `${new Date(day.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                      })}: ${day.reviews} revisions`
                    : ""
                }
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
        <span>Moins</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-800" />
          <div className="w-3 h-3 rounded-sm bg-emerald-900" />
          <div className="w-3 h-3 rounded-sm bg-emerald-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
        </div>
        <span>Plus</span>
      </div>
    </div>
  );
}
