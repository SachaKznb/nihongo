/**
 * Cron job authentication helper
 * Verifies that requests to cron endpoints come from Vercel Cron
 */

export function verifyCronAuth(request: Request): boolean {
  // Vercel Cron sends authorization header with CRON_SECRET
  const authHeader = request.headers.get("authorization");
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    return true;
  }

  // Also check Vercel's internal cron header (for production)
  const vercelCronHeader = request.headers.get("x-vercel-cron");
  if (vercelCronHeader === "true") {
    return true;
  }

  return false;
}

/**
 * Get the current hour in a specific timezone
 */
export function getUserLocalHour(timezone: string): number {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "numeric",
      hour12: false,
    });
    return parseInt(formatter.format(new Date()));
  } catch {
    // Fallback to Europe/Paris if timezone is invalid
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Paris",
      hour: "numeric",
      hour12: false,
    });
    return parseInt(formatter.format(new Date()));
  }
}

/**
 * Check if a date is from yesterday (in the user's timezone)
 */
export function isYesterday(date: Date, timezone: string): boolean {
  const now = new Date();

  // Get today's date in user's timezone
  const todayFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const todayStr = todayFormatter.format(now);
  const dateStr = todayFormatter.format(date);

  // Parse dates and check if difference is 1 day
  const today = new Date(todayStr);
  const checkDate = new Date(dateStr);

  const diffTime = today.getTime() - checkDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 1;
}

/**
 * Check if a date is today (in the user's timezone)
 */
export function isToday(date: Date, timezone: string): boolean {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(now) === formatter.format(date);
}

/**
 * Get days since a date
 */
export function getDaysSince(date: Date): number {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Batch processing helper - processes items in batches with delays
 * to respect API rate limits
 */
export async function processInBatches<T>(
  items: T[],
  processFn: (item: T) => Promise<void>,
  batchSize: number = 50,
  delayMs: number = 1000
): Promise<void> {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(processFn));

    // Add delay between batches (except for last batch)
    if (i + batchSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
