/**
 * Timezone-aware date utilities for streak calculation
 *
 * All streak calculations should use the user's timezone to determine
 * what constitutes "today" and "yesterday". This prevents users from
 * unfairly losing streaks due to timezone differences.
 */

const DEFAULT_TIMEZONE = "UTC";

/**
 * Get the start of today (midnight) in the user's timezone.
 * Returns a Date object representing when "today" started for the user.
 */
export function getTodayStart(timezone: string = DEFAULT_TIMEZONE): Date {
  try {
    const now = new Date();

    // Format the current time in the user's timezone to get the date parts
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    // Get today's date string in user's timezone (e.g., "2024-02-13")
    const todayStr = formatter.format(now);

    // Create a Date object for midnight in the user's timezone
    // We'll work with the date string and create a UTC date that represents
    // midnight in the user's timezone
    const [year, month, day] = todayStr.split("-").map(Number);

    // Create date at midnight UTC, then adjust for timezone offset
    const midnightUTC = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));

    // Get the offset for this timezone at this time
    const offsetMs = getTimezoneOffsetMs(timezone, midnightUTC);

    // Subtract the offset to get the actual UTC time when it's midnight in user's TZ
    return new Date(midnightUTC.getTime() - offsetMs);
  } catch {
    // Fallback to UTC if timezone is invalid
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
  }
}

/**
 * Get the start of yesterday (midnight) in the user's timezone.
 */
export function getYesterdayStart(timezone: string = DEFAULT_TIMEZONE): Date {
  const todayStart = getTodayStart(timezone);
  return new Date(todayStart.getTime() - 24 * 60 * 60 * 1000);
}

/**
 * Get the start of the week (Monday midnight) in the user's timezone.
 */
export function getWeekStart(timezone: string = DEFAULT_TIMEZONE): Date {
  try {
    const now = new Date();

    // Get today's date in user's timezone
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const todayStr = formatter.format(now);
    const [year, month, day] = todayStr.split("-").map(Number);

    // Create a date for today in UTC
    const todayDate = new Date(Date.UTC(year, month - 1, day));

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = todayDate.getUTCDay();

    // Calculate days since Monday (if Sunday, go back 6 days)
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Get Monday's date
    const mondayDate = new Date(todayDate.getTime() - daysSinceMonday * 24 * 60 * 60 * 1000);

    // Get the timezone offset for Monday
    const offsetMs = getTimezoneOffsetMs(timezone, mondayDate);

    // Return the UTC time when it's midnight on Monday in user's TZ
    return new Date(mondayDate.getTime() - offsetMs);
  } catch {
    // Fallback to UTC
    const now = new Date();
    const todayDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const dayOfWeek = todayDate.getUTCDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return new Date(todayDate.getTime() - daysSinceMonday * 24 * 60 * 60 * 1000);
  }
}

/**
 * Check if a date is "today" in the user's timezone.
 */
export function isToday(date: Date, timezone: string = DEFAULT_TIMEZONE): boolean {
  const todayStart = getTodayStart(timezone);
  return date >= todayStart;
}

/**
 * Check if a date is "yesterday" in the user's timezone.
 */
export function isYesterday(date: Date, timezone: string = DEFAULT_TIMEZONE): boolean {
  const todayStart = getTodayStart(timezone);
  const yesterdayStart = getYesterdayStart(timezone);
  return date >= yesterdayStart && date < todayStart;
}

/**
 * Check if a date is "today or yesterday" in the user's timezone.
 * Useful for streak continuation checks.
 */
export function isTodayOrYesterday(date: Date, timezone: string = DEFAULT_TIMEZONE): boolean {
  const yesterdayStart = getYesterdayStart(timezone);
  return date >= yesterdayStart;
}

/**
 * Get the timezone offset in milliseconds for a given timezone at a specific time.
 * Positive offset means the timezone is ahead of UTC (e.g., Asia/Tokyo +9h = +32400000ms)
 */
function getTimezoneOffsetMs(timezone: string, date: Date): number {
  try {
    // Format the date in both UTC and the target timezone
    const utcFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tzFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const utcParts = parseFormattedDate(utcFormatter.format(date));
    const tzParts = parseFormattedDate(tzFormatter.format(date));

    const utcTime = Date.UTC(utcParts.year, utcParts.month - 1, utcParts.day, utcParts.hour, utcParts.minute);
    const tzTime = Date.UTC(tzParts.year, tzParts.month - 1, tzParts.day, tzParts.hour, tzParts.minute);

    return tzTime - utcTime;
  } catch {
    return 0; // Fallback to no offset
  }
}

/**
 * Parse a formatted date string from Intl.DateTimeFormat
 */
function parseFormattedDate(formatted: string): { year: number; month: number; day: number; hour: number; minute: number } {
  // Format is "MM/DD/YYYY, HH:MM"
  const [datePart, timePart] = formatted.split(", ");
  const [month, day, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return { year, month, day, hour, minute };
}

/**
 * Get the date string (YYYY-MM-DD) for a given date in the user's timezone.
 * Useful for daily stats and grouping.
 */
export function getDateString(date: Date, timezone: string = DEFAULT_TIMEZONE): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(date);
  } catch {
    // Fallback to UTC
    return date.toISOString().split("T")[0];
  }
}

/**
 * Validate that a timezone string is valid.
 */
export function isValidTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Common timezones for the dropdown selector.
 */
export const COMMON_TIMEZONES = [
  { value: "Europe/Paris", label: "Paris (Europe/Paris)" },
  { value: "Europe/London", label: "Londres (Europe/London)" },
  { value: "Europe/Berlin", label: "Berlin (Europe/Berlin)" },
  { value: "Europe/Brussels", label: "Bruxelles (Europe/Brussels)" },
  { value: "Europe/Zurich", label: "Zurich (Europe/Zurich)" },
  { value: "America/New_York", label: "New York (America/New_York)" },
  { value: "America/Los_Angeles", label: "Los Angeles (America/Los_Angeles)" },
  { value: "America/Montreal", label: "Montreal (America/Montreal)" },
  { value: "Asia/Tokyo", label: "Tokyo (Asia/Tokyo)" },
  { value: "Asia/Seoul", label: "Seoul (Asia/Seoul)" },
  { value: "Asia/Shanghai", label: "Shanghai (Asia/Shanghai)" },
  { value: "Australia/Sydney", label: "Sydney (Australia/Sydney)" },
  { value: "Pacific/Auckland", label: "Auckland (Pacific/Auckland)" },
  { value: "UTC", label: "UTC" },
] as const;
