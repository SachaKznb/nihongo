import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
import {
  sendReviewReminders,
  sendStreakReminders,
  sendWeeklySummaries,
  onLevelUp,
  aggregateDailyStats,
  resetWeeklyXp,
} from "@/lib/inngest/functions";

// Export the Inngest serve handler
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    sendReviewReminders,
    sendStreakReminders,
    sendWeeklySummaries,
    onLevelUp,
    aggregateDailyStats,
    resetWeeklyXp,
  ],
});
