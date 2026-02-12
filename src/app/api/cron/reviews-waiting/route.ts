import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCronAuth, processInBatches } from "@/lib/cron-auth";
import { sendReviewsWaitingEmail } from "@/lib/email";
import crypto from "crypto";

/**
 * Cron job: Send "reviews waiting" emails
 * Schedule: Daily at 9 AM UTC (0 9 * * *)
 * Sends to all eligible users who haven't received this email in the last 24 hours
 */
export async function GET(request: Request) {
  // Verify cron authentication
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get all users who have reviews waiting notification enabled
    // and haven't received this email in the last 24 hours
    const eligibleUsers = await prisma.user.findMany({
      where: {
        emailNotificationsEnabled: true,
        notifyReviewsWaiting: true,
        emailVerified: { not: null },
        isSuspended: false,
        OR: [
          { lastReviewsWaitingEmail: null },
          { lastReviewsWaitingEmail: { lt: oneDayAgo } },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        preferredNotificationHour: true,
        timezone: true,
        unsubscribeToken: true,
      },
    });

    let sentCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    // On Hobby plan, we run once daily at 9 AM UTC
    // All eligible users get notified
    const usersToNotify = eligibleUsers;

    // Process in batches
    await processInBatches(usersToNotify, async (user) => {
      try {
        // Count pending reviews for this user
        const pendingReviews = await countPendingReviews(user.id);

        if (pendingReviews === 0) {
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
        const result = await sendReviewsWaitingEmail(
          user.email,
          user.username,
          pendingReviews,
          unsubscribeToken
        );

        if (result.success) {
          // Update last sent timestamp and log
          await prisma.$transaction([
            prisma.user.update({
              where: { id: user.id },
              data: { lastReviewsWaitingEmail: now },
            }),
            prisma.notificationLog.create({
              data: {
                userId: user.id,
                type: "reviews_waiting",
                success: true,
                metadata: { reviewCount: pendingReviews },
              },
            }),
          ]);
          sentCount++;
        } else {
          // Log error
          await prisma.notificationLog.create({
            data: {
              userId: user.id,
              type: "reviews_waiting",
              success: false,
              error: result.error,
              metadata: { reviewCount: pendingReviews },
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
      processed: usersToNotify.length,
      sent: sentCount,
      skipped: skippedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Reviews waiting cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Count pending reviews for a user
 */
async function countPendingReviews(userId: string): Promise<number> {
  const now = new Date();

  const [radicals, kanji, vocab] = await Promise.all([
    prisma.userRadicalProgress.count({
      where: {
        userId,
        srsStage: { gte: 1, lt: 9 },
        nextReviewAt: { lte: now },
      },
    }),
    prisma.userKanjiProgress.count({
      where: {
        userId,
        srsStage: { gte: 1, lt: 9 },
        nextReviewAt: { lte: now },
      },
    }),
    prisma.userVocabularyProgress.count({
      where: {
        userId,
        srsStage: { gte: 1, lt: 9 },
        nextReviewAt: { lte: now },
      },
    }),
  ]);

  return radicals + kanji + vocab;
}
