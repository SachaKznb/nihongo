import { inngest } from "./client";
import { prisma } from "@/lib/db";
import {
  sendReviewsWaitingEmail,
  sendStreakAtRiskEmail,
  sendWeeklySummaryEmail,
} from "@/lib/email";

// Send review reminder emails to users with pending reviews
export const sendReviewReminders = inngest.createFunction(
  {
    id: "send-review-reminders",
    name: "Send Review Reminders",
  },
  { cron: "0 9 * * *" }, // Every day at 9 AM
  async ({ step }) => {
    const usersWithReviews = await step.run("fetch-users", async () => {
      const now = new Date();
      const users = await prisma.user.findMany({
        where: {
          emailVerified: { not: null },
          isSuspended: false,
          notifyReviewsWaiting: true,
        },
        select: {
          id: true,
          email: true,
          username: true,
          unsubscribeToken: true,
        },
      });

      // Check which users have pending reviews
      const usersWithPendingReviews = [];
      for (const user of users) {
        const [radicalCount, kanjiCount, vocabCount] = await Promise.all([
          prisma.userRadicalProgress.count({
            where: {
              userId: user.id,
              srsStage: { gte: 1, lt: 9 },
              nextReviewAt: { lte: now },
            },
          }),
          prisma.userKanjiProgress.count({
            where: {
              userId: user.id,
              srsStage: { gte: 1, lt: 9 },
              nextReviewAt: { lte: now },
            },
          }),
          prisma.userVocabularyProgress.count({
            where: {
              userId: user.id,
              srsStage: { gte: 1, lt: 9 },
              nextReviewAt: { lte: now },
            },
          }),
        ]);

        const totalReviews = radicalCount + kanjiCount + vocabCount;
        if (totalReviews >= 10) {
          // Only notify if 10+ reviews
          usersWithPendingReviews.push({
            ...user,
            reviewCount: totalReviews,
          });
        }
      }

      return usersWithPendingReviews;
    });

    // Send emails in batches
    let sent = 0;
    for (const user of usersWithReviews) {
      await step.run(`send-email-${user.id}`, async () => {
        if (user.unsubscribeToken) {
          await sendReviewsWaitingEmail(
            user.email,
            user.username,
            user.reviewCount,
            user.unsubscribeToken
          );
          sent++;
        }
      });

      // Rate limit: wait between emails
      await step.sleep("rate-limit", "100ms");
    }

    return { sent, total: usersWithReviews.length };
  }
);

// Send streak at risk notifications
export const sendStreakReminders = inngest.createFunction(
  {
    id: "send-streak-reminders",
    name: "Send Streak at Risk Reminders",
  },
  { cron: "0 20 * * *" }, // Every day at 8 PM
  async ({ step }) => {
    const usersAtRisk = await step.run("fetch-users-at-risk", async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return prisma.user.findMany({
        where: {
          emailVerified: { not: null },
          isSuspended: false,
          notifyStreakAtRisk: true,
          currentStreak: { gte: 3 }, // Only users with 3+ day streaks
          lastStudyDate: { lt: today }, // Haven't studied today
        },
        select: {
          id: true,
          email: true,
          username: true,
          currentStreak: true,
          unsubscribeToken: true,
        },
      });
    });

    let sent = 0;
    for (const user of usersAtRisk) {
      await step.run(`send-streak-email-${user.id}`, async () => {
        if (user.unsubscribeToken) {
          await sendStreakAtRiskEmail(
            user.email,
            user.username,
            user.currentStreak,
            user.unsubscribeToken
          );
          sent++;
        }
      });

      await step.sleep("rate-limit", "100ms");
    }

    return { sent, total: usersAtRisk.length };
  }
);

// Send weekly summary emails every Sunday
export const sendWeeklySummaries = inngest.createFunction(
  {
    id: "send-weekly-summaries",
    name: "Send Weekly Summary Emails",
  },
  { cron: "0 10 * * 0" }, // Every Sunday at 10 AM
  async ({ step }) => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    const users = await step.run("fetch-active-users", async () => {
      return prisma.user.findMany({
        where: {
          emailVerified: { not: null },
          isSuspended: false,
          notifyWeeklySummary: true,
          lastStudyDate: { gte: weekStart }, // Active in last week
        },
        select: {
          id: true,
          email: true,
          username: true,
          currentStreak: true,
          unsubscribeToken: true,
        },
      });
    });

    let sent = 0;
    for (const user of users) {
      const stats = await step.run(`get-stats-${user.id}`, async () => {
        // Get reviews from last week
        const reviews = await prisma.review.findMany({
          where: {
            userId: user.id,
            createdAt: { gte: weekStart },
          },
          select: { correct: true, srsStageFrom: true },
        });

        const reviewsCompleted = reviews.length;
        const lessonsCompleted = reviews.filter((r) => r.srsStageFrom === 0).length;
        const correctCount = reviews.filter((r) => r.correct).length;
        const accuracy = reviewsCompleted > 0
          ? Math.round((correctCount / reviewsCompleted) * 100)
          : 100;

        // Rough XP estimate
        const xpEarned = lessonsCompleted * 10 + (reviewsCompleted - lessonsCompleted) * 5;

        return {
          reviewsCompleted,
          lessonsCompleted,
          accuracy,
          xpEarned,
          currentStreak: user.currentStreak,
          itemsLearned: { radicals: 0, kanji: 0, vocabulary: 0 }, // Simplified
        };
      });

      await step.run(`send-summary-${user.id}`, async () => {
        if (user.unsubscribeToken && stats.reviewsCompleted > 0) {
          await sendWeeklySummaryEmail(
            user.email,
            user.username,
            stats,
            user.unsubscribeToken
          );
          sent++;
        }
      });

      await step.sleep("rate-limit", "100ms");
    }

    return { sent, total: users.length };
  }
);

// Event-triggered function: Level up celebration
export const onLevelUp = inngest.createFunction(
  {
    id: "on-level-up",
    name: "Handle Level Up Event",
  },
  { event: "user/level.up" },
  async ({ event, step }) => {
    const { userId, newLevel } = event.data;

    await step.run("send-level-up-email", async () => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          email: true,
          username: true,
          notifyLevelUp: true,
          unsubscribeToken: true,
        },
      });

      if (user?.notifyLevelUp && user.unsubscribeToken) {
        const { sendLevelUpEmail } = await import("@/lib/email");
        await sendLevelUpEmail(
          user.email,
          user.username,
          newLevel,
          user.unsubscribeToken
        );
      }
    });

    return { success: true };
  }
);

// Aggregate daily stats for analytics (runs at 1 AM daily)
export const aggregateDailyStats = inngest.createFunction(
  {
    id: "aggregate-daily-stats",
    name: "Aggregate Daily Stats",
  },
  { cron: "0 1 * * *" }, // Every day at 1 AM
  async ({ step }) => {
    // Aggregate yesterday's stats
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    const users = await step.run("fetch-active-users", async () => {
      // Get users who had activity yesterday
      const activeUserIds = await prisma.review.findMany({
        where: {
          createdAt: {
            gte: yesterday,
            lte: endOfYesterday,
          },
        },
        select: { userId: true },
        distinct: ["userId"],
      });

      return activeUserIds.map((u) => u.userId);
    });

    let aggregated = 0;
    for (const userId of users) {
      await step.run(`aggregate-${userId}`, async () => {
        // Get all reviews for yesterday
        const reviews = await prisma.review.findMany({
          where: {
            userId,
            createdAt: {
              gte: yesterday,
              lte: endOfYesterday,
            },
          },
          select: {
            correct: true,
            srsStageFrom: true,
          },
        });

        const reviewsCompleted = reviews.length;
        const lessonsCompleted = reviews.filter((r) => r.srsStageFrom === 0).length;
        const correctCount = reviews.filter((r) => r.correct).length;
        const incorrectCount = reviewsCompleted - correctCount;

        // Calculate XP earned
        const xpEarned = lessonsCompleted * 10 + (reviewsCompleted - lessonsCompleted) * 5;

        // Upsert daily stats
        await prisma.userDailyStats.upsert({
          where: {
            userId_date: {
              userId,
              date: yesterday,
            },
          },
          update: {
            reviewsCompleted,
            lessonsCompleted,
            correctCount,
            incorrectCount,
            xpEarned,
          },
          create: {
            userId,
            date: yesterday,
            reviewsCompleted,
            lessonsCompleted,
            correctCount,
            incorrectCount,
            xpEarned,
            studyTimeMinutes: 0, // We don't track this yet
          },
        });

        aggregated++;
      });
    }

    return { aggregated, total: users.length };
  }
);

// Reset weekly XP every Monday at midnight
export const resetWeeklyXp = inngest.createFunction(
  {
    id: "reset-weekly-xp",
    name: "Reset Weekly XP",
  },
  { cron: "0 0 * * 1" }, // Monday at midnight
  async ({ step }) => {
    const result = await step.run("reset-weekly-xp", async () => {
      const updated = await prisma.user.updateMany({
        where: {
          weeklyXp: { gt: 0 },
        },
        data: {
          weeklyXp: 0,
          weeklyXpResetAt: new Date(),
        },
      });

      return updated.count;
    });

    return { reset: result };
  }
);
