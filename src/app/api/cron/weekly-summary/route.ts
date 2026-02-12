import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCronAuth, processInBatches } from "@/lib/cron-auth";
import { sendWeeklySummaryEmail } from "@/lib/email";
import crypto from "crypto";

/**
 * Cron job: Send weekly progress summary emails
 * Schedule: Every Sunday at 10 AM UTC (0 10 * * 0)
 */
export async function GET(request: Request) {
  // Verify cron authentication
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get users who want weekly summaries
    const eligibleUsers = await prisma.user.findMany({
      where: {
        emailNotificationsEnabled: true,
        notifyWeeklySummary: true,
        emailVerified: { not: null },
        isSuspended: false,
        // Only send to users who have some activity
        totalReviewsDone: { gt: 0 },
        OR: [
          { lastWeeklySummaryEmail: null },
          { lastWeeklySummaryEmail: { lt: oneWeekAgo } },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        currentStreak: true,
        unsubscribeToken: true,
      },
    });

    let sentCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    // Process in batches
    await processInBatches(eligibleUsers, async (user) => {
      try {
        // Get weekly stats for this user
        const stats = await getWeeklyStats(user.id, oneWeekAgo);

        // Skip if no activity this week
        if (stats.reviewsCompleted === 0 && stats.lessonsCompleted === 0) {
          skippedCount++;
          return;
        }

        // Generate unsubscribe token if not exists
        let unsubscribeToken = user.unsubscribeToken;
        if (!unsubscribeToken) {
          unsubscribeToken = crypto.randomBytes(32).toString("hex");
          await prisma.user.update({
            where: { id: user.id },
            data: { unsubscribeToken },
          });
        }

        // Send email
        const result = await sendWeeklySummaryEmail(
          user.email,
          user.username,
          {
            ...stats,
            currentStreak: user.currentStreak,
          },
          unsubscribeToken
        );

        if (result.success) {
          // Update last sent timestamp and log
          await prisma.$transaction([
            prisma.user.update({
              where: { id: user.id },
              data: { lastWeeklySummaryEmail: now },
            }),
            prisma.notificationLog.create({
              data: {
                userId: user.id,
                type: "weekly_summary",
                success: true,
                metadata: stats,
              },
            }),
          ]);
          sentCount++;
        } else {
          // Log error
          await prisma.notificationLog.create({
            data: {
              userId: user.id,
              type: "weekly_summary",
              success: false,
              error: result.error,
            },
          });
          errors.push(`${user.email}: ${result.error}`);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        errors.push(`${user.email}: ${message}`);
      }
    });

    return NextResponse.json({
      success: true,
      processed: eligibleUsers.length,
      sent: sentCount,
      skipped: skippedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Weekly summary cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Get weekly stats for a user
 */
async function getWeeklyStats(
  userId: string,
  since: Date
): Promise<{
  reviewsCompleted: number;
  lessonsCompleted: number;
  accuracy: number;
  xpEarned: number;
  itemsLearned: { radicals: number; kanji: number; vocabulary: number };
}> {
  // Get reviews from this week
  const reviews = await prisma.review.findMany({
    where: {
      userId,
      createdAt: { gte: since },
    },
    select: {
      correct: true,
      srsStageFrom: true,
      itemType: true,
    },
  });

  const reviewsCompleted = reviews.length;
  const correctReviews = reviews.filter((r) => r.correct).length;
  const accuracy = reviewsCompleted > 0
    ? Math.round((correctReviews / reviewsCompleted) * 100)
    : 100;

  // Count lessons (reviews where srsStageFrom was 0)
  const lessonsCompleted = reviews.filter((r) => r.srsStageFrom === 0).length;

  // Calculate XP earned (5 per correct review, 1 per incorrect, 10 per lesson)
  const xpFromReviews = correctReviews * 5 + (reviewsCompleted - correctReviews) * 1;
  const xpFromLessons = lessonsCompleted * 10;
  const xpEarned = xpFromReviews + xpFromLessons;

  // Count new items learned by type (items that went from stage 0 to 1+)
  const newRadicals = reviews.filter(
    (r) => r.srsStageFrom === 0 && r.itemType === "radical"
  ).length;
  const newKanji = reviews.filter(
    (r) => r.srsStageFrom === 0 && r.itemType === "kanji"
  ).length;
  const newVocabulary = reviews.filter(
    (r) => r.srsStageFrom === 0 && r.itemType === "vocabulary"
  ).length;

  return {
    reviewsCompleted,
    lessonsCompleted,
    accuracy,
    xpEarned,
    itemsLearned: {
      radicals: newRadicals,
      kanji: newKanji,
      vocabulary: newVocabulary,
    },
  };
}
