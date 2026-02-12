import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCronAuth, getDaysSince, processInBatches } from "@/lib/cron-auth";
import { sendReengagementEmail } from "@/lib/email";
import crypto from "crypto";

/**
 * Cron job: Send re-engagement emails to inactive users
 * Schedule: Daily at 10 AM UTC (0 10 * * *)
 * Tiers: 3 days, 7 days, 30 days inactive
 * Cooldown: 7 days between re-engagement emails
 */
export async function GET(request: Request) {
  // Verify cron authentication
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get users who haven't studied recently and haven't received this email in 7 days
    const eligibleUsers = await prisma.user.findMany({
      where: {
        emailNotificationsEnabled: true,
        notifyReengagement: true,
        emailVerified: { not: null },
        isSuspended: false,
        lastStudyDate: { not: null },
        OR: [
          { lastReengagementEmail: null },
          { lastReengagementEmail: { lt: sevenDaysAgo } },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        lastStudyDate: true,
        unsubscribeToken: true,
      },
    });

    let sentCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    // Filter to users who are inactive (3+, 7+, or 30+ days)
    const usersToNotify = eligibleUsers.filter((user) => {
      if (!user.lastStudyDate) return false;
      const daysInactive = getDaysSince(user.lastStudyDate);
      // Send at 3, 7, or 30 day marks (with some buffer)
      return daysInactive >= 3;
    });

    // Process in batches
    await processInBatches(usersToNotify, async (user) => {
      try {
        if (!user.lastStudyDate) {
          skippedCount++;
          return;
        }

        const daysInactive = getDaysSince(user.lastStudyDate);

        // Determine which tier (only send at specific milestones)
        // 3 days: first reminder
        // 7 days: second reminder
        // 30 days: last chance
        // Skip if between milestones (e.g., 5 days, 15 days)
        const validMilestones = [3, 7, 30];
        const milestone = validMilestones.find(
          (m) => daysInactive >= m && daysInactive < m + 4
        );

        if (!milestone) {
          skippedCount++;
          return;
        }

        // Count pending reviews for this user
        const pendingReviews = await countPendingReviews(user.id);

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
        const result = await sendReengagementEmail(
          user.email,
          user.username,
          daysInactive,
          pendingReviews,
          unsubscribeToken
        );

        if (result.success) {
          // Update last sent timestamp and log
          await prisma.$transaction([
            prisma.user.update({
              where: { id: user.id },
              data: { lastReengagementEmail: now },
            }),
            prisma.notificationLog.create({
              data: {
                userId: user.id,
                type: "reengagement",
                success: true,
                metadata: { daysInactive, milestone, pendingReviews },
              },
            }),
          ]);
          sentCount++;
        } else {
          // Log error
          await prisma.notificationLog.create({
            data: {
              userId: user.id,
              type: "reengagement",
              success: false,
              error: result.error,
              metadata: { daysInactive, milestone },
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
    console.error("Reengagement cron error:", error);
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
