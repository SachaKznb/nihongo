import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyCronAuth, isYesterday, isToday, processInBatches } from "@/lib/cron-auth";
import { sendStreakAtRiskEmail } from "@/lib/email";
import crypto from "crypto";

/**
 * Cron job: Send "streak at risk" emails
 * Schedule: Daily at 8 PM UTC (0 20 * * *)
 * Sends to users who studied yesterday but not today, and have a streak > 0
 */
export async function GET(request: Request) {
  // Verify cron authentication
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get users with active streaks who haven't received this email today
    const eligibleUsers = await prisma.user.findMany({
      where: {
        emailNotificationsEnabled: true,
        notifyStreakAtRisk: true,
        emailVerified: { not: null },
        isSuspended: false,
        currentStreak: { gt: 0 },
        lastStudyDate: { not: null },
        OR: [
          { lastStreakAtRiskEmail: null },
          { lastStreakAtRiskEmail: { lt: oneDayAgo } },
        ],
      },
      select: {
        id: true,
        email: true,
        username: true,
        currentStreak: true,
        lastStudyDate: true,
        timezone: true,
        unsubscribeToken: true,
      },
    });

    let sentCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    // Filter to users who studied yesterday but NOT today
    const usersAtRisk = eligibleUsers.filter((user) => {
      if (!user.lastStudyDate) return false;

      const studiedYesterday = isYesterday(user.lastStudyDate, user.timezone);
      const studiedToday = isToday(user.lastStudyDate, user.timezone);

      // At risk if they studied yesterday but not today
      return studiedYesterday && !studiedToday;
    });

    // Process in batches
    await processInBatches(usersAtRisk, async (user) => {
      try {
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
        const result = await sendStreakAtRiskEmail(
          user.email,
          user.username,
          user.currentStreak,
          unsubscribeToken
        );

        if (result.success) {
          // Update last sent timestamp and log
          await prisma.$transaction([
            prisma.user.update({
              where: { id: user.id },
              data: { lastStreakAtRiskEmail: now },
            }),
            prisma.notificationLog.create({
              data: {
                userId: user.id,
                type: "streak_at_risk",
                success: true,
                metadata: { currentStreak: user.currentStreak },
              },
            }),
          ]);
          sentCount++;
        } else {
          // Log error
          await prisma.notificationLog.create({
            data: {
              userId: user.id,
              type: "streak_at_risk",
              success: false,
              error: result.error,
              metadata: { currentStreak: user.currentStreak },
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
      processed: usersAtRisk.length,
      sent: sentCount,
      skipped: skippedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Streak at risk cron error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
