/**
 * Shared email templates for Nihongo notification emails
 * All templates follow the same branding and style
 * Supports database customization via EmailTemplate model
 */

import { prisma } from "./db";

const BASE_URL = process.env.NEXTAUTH_URL || "https://trynihongo.fr";

// Simple in-memory cache for email templates (5 minute TTL)
const templateCache: Map<string, { data: EmailTemplateData; expiresAt: number }> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

interface EmailTemplateData {
  subject: string;
  headline: string;
  bodyText: string;
  buttonText: string;
  footerText: string | null;
  isActive: boolean;
}

/**
 * Get custom template from database with caching
 */
export async function getCustomTemplate(type: string): Promise<EmailTemplateData | null> {
  const cached = templateCache.get(type);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    const template = await prisma.emailTemplate.findUnique({
      where: { type },
    });

    if (template) {
      const data: EmailTemplateData = {
        subject: template.subject,
        headline: template.headline,
        bodyText: template.bodyText,
        buttonText: template.buttonText,
        footerText: template.footerText,
        isActive: template.isActive,
      };
      templateCache.set(type, { data, expiresAt: Date.now() + CACHE_TTL });
      return data;
    }
  } catch (error) {
    console.error(`Error fetching template ${type}:`, error);
  }

  return null;
}

/**
 * Replace template variables with actual values
 */
function replaceVariables(text: string, vars: Record<string, string | number>): string {
  let result = text;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), String(value));
  }
  return result;
}

/**
 * Wraps email content with Nihongo branding and unsubscribe footer
 */
export function getEmailWrapper(
  content: string,
  unsubscribeToken?: string,
  unsubscribeType?: string
): string {
  const unsubscribeUrl = unsubscribeToken
    ? `${BASE_URL}/api/notifications/unsubscribe?token=${unsubscribeToken}&type=${unsubscribeType || "all"}`
    : null;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4; padding: 40px 20px; margin: 0;">
        <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 32px;">
            <span style="font-size: 48px;">&#26085;</span>
            <h1 style="color: #1c1917; margin: 16px 0 8px; font-size: 24px;">Nihongo</h1>
          </div>

          ${content}

          <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;">

          <p style="color: #a8a29e; font-size: 12px; text-align: center;">
            Nihongo - Apprenez le japonais<br>
            ${unsubscribeUrl ? `<a href="${unsubscribeUrl}" style="color: #a8a29e; text-decoration: underline;">Se desabonner de ces emails</a>` : ""}
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Primary CTA button style
 */
export function getButton(text: string, url: string, color: string = "#0d9488"): string {
  return `
    <div style="text-align: center; margin: 32px 0;">
      <a href="${url}" style="display: inline-block; background: ${color}; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
        ${text}
      </a>
    </div>
  `;
}

/**
 * Stat box for showing numbers (XP, reviews, etc.)
 */
export function getStatBox(stats: { label: string; value: string | number; emoji?: string }[]): string {
  const statItems = stats
    .map(
      (s) => `
        <div style="text-align: center; padding: 12px 16px;">
          ${s.emoji ? `<div style="font-size: 24px; margin-bottom: 4px;">${s.emoji}</div>` : ""}
          <div style="font-size: 24px; font-weight: bold; color: #1c1917;">${s.value}</div>
          <div style="font-size: 12px; color: #78716c;">${s.label}</div>
        </div>
      `
    )
    .join("");

  return `
    <div style="background: #f5f5f4; border-radius: 12px; padding: 16px; margin: 24px 0; display: flex; justify-content: space-around;">
      ${statItems}
    </div>
  `;
}

/**
 * Reviews waiting email content
 */
export async function getReviewsWaitingContent(username: string, reviewCount: number): Promise<string> {
  const custom = await getCustomTemplate("reviews_waiting");
  const vars = {
    username,
    count: reviewCount,
    s: reviewCount > 1 ? "s" : "",
    ent: reviewCount > 1 ? "ent" : "",
    xp: reviewCount * 5,
  };

  const headline = custom ? replaceVariables(custom.headline, vars) : "Tes revisions t'attendent !";
  const bodyText = custom
    ? replaceVariables(custom.bodyText, vars)
    : `Bonjour ${username}, tu as <strong style="color: #0d9488;">${reviewCount} revision${reviewCount > 1 ? "s" : ""}</strong> en attente.\n\nPrends quelques minutes pour les completer et renforcer ta memoire. Chaque revision te rapproche de la maitrise !`;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Commencer les revisions";
  const footerText = custom?.footerText ? replaceVariables(custom.footerText, vars) : `+${reviewCount * 5} XP a gagner`;

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
      <div style="font-size: 36px; font-weight: bold; color: white;">${reviewCount}</div>
      <div style="font-size: 14px; color: rgba(255,255,255,0.9);">revisions en attente</div>
    </div>

    ${getButton(buttonText, `${BASE_URL}/reviews`, "#f97316")}

    <p style="color: #a8a29e; font-size: 14px; text-align: center;">
      ${footerText}
    </p>
  `;
}

/**
 * Streak at risk email content
 */
export async function getStreakAtRiskContent(username: string, currentStreak: number): Promise<string> {
  const custom = await getCustomTemplate("streak_at_risk");
  const vars = { username, streak: currentStreak };

  const headline = custom ? replaceVariables(custom.headline, vars) : `Ne perds pas ta serie de ${currentStreak} jours !`;
  const bodyText = custom
    ? replaceVariables(custom.bodyText, vars)
    : `Bonjour ${username}, tu n'as pas encore etudie aujourd'hui. Complete au moins une revision pour maintenir ta serie !`;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Proteger ma serie";
  const footerText = custom?.footerText
    ? replaceVariables(custom.footerText, vars)
    : "Ta serie sera perdue demain si tu n'etudies pas aujourd'hui !";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
      <div style="font-size: 48px; margin-bottom: 8px;">&#128293;</div>
      <div style="font-size: 36px; font-weight: bold; color: white;">${currentStreak}</div>
      <div style="font-size: 14px; color: rgba(255,255,255,0.9);">jours de serie</div>
    </div>

    ${getButton(buttonText, `${BASE_URL}/reviews`, "#ea580c")}

    <p style="color: #dc2626; font-size: 14px; text-align: center; font-weight: 500;">
      ${footerText}
    </p>
  `;
}

/**
 * Level up celebration email content
 */
export async function getLevelUpContent(username: string, newLevel: number): Promise<string> {
  const custom = await getCustomTemplate("level_up");
  const vars = { username, level: newLevel };

  const headline = custom ? replaceVariables(custom.headline, vars) : `Felicitations ! Tu passes au niveau ${newLevel} !`;
  const bodyText = custom
    ? replaceVariables(custom.bodyText, vars)
    : `Bravo ${username} ! Tu as maitrise suffisamment de kanji pour debloquer le niveau ${newLevel}. De nouveaux radicaux, kanji et vocabulaire t'attendent !`;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Decouvrir les nouvelles lecons";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
      <div style="font-size: 48px; margin-bottom: 8px;">&#127881;</div>
      <div style="font-size: 14px; color: rgba(255,255,255,0.9); margin-bottom: 4px;">NIVEAU</div>
      <div style="font-size: 48px; font-weight: bold; color: white;">${newLevel}</div>
    </div>

    ${getButton(buttonText, `${BASE_URL}/lessons`, "#8b5cf6")}
  `;
}

/**
 * Re-engagement email content (for inactive users)
 */
export async function getReengagementContent(
  username: string,
  daysInactive: number,
  pendingReviews: number
): Promise<string> {
  const custom = await getCustomTemplate("reengagement");
  const vars = { username, days: daysInactive, reviews: pendingReviews };

  let defaultHeadline: string;
  let defaultMessage: string;
  let emoji: string;

  if (daysInactive <= 3) {
    defaultHeadline = "Tu nous manques !";
    defaultMessage = `Ca fait ${daysInactive} jours qu'on ne t'a pas vu. Reviens faire quelques revisions pour ne pas perdre tes acquis.`;
    emoji = "&#128075;"; // waving hand
  } else if (daysInactive <= 7) {
    defaultHeadline = "Ta memoire a besoin de toi";
    defaultMessage = `Ca fait une semaine ! Tes connaissances commencent a s'effacer. Quelques minutes suffisent pour les rafraichir.`;
    emoji = "&#129504;"; // brain
  } else {
    defaultHeadline = "Reprenons ensemble";
    defaultMessage = `Ca fait ${daysInactive} jours. Pas d'inquietude, on peut reprendre doucement. Tes kanji t'attendent patiemment.`;
    emoji = "&#127793;"; // seedling
  }

  const headline = custom ? replaceVariables(custom.headline, vars) : defaultHeadline;
  const bodyText = custom
    ? replaceVariables(custom.bodyText, vars)
    : `Bonjour ${username}, ${defaultMessage}`;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Reprendre l'apprentissage";
  const footerText = custom?.footerText
    ? replaceVariables(custom.footerText, vars)
    : "Meme 5 minutes par jour font une grande difference !";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n/g, "<br>")}
    </p>

    <div style="background: #f5f5f4; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
      <div style="font-size: 48px; margin-bottom: 12px;">${emoji}</div>
      ${pendingReviews > 0 ? `<div style="font-size: 16px; color: #57534e;"><strong>${pendingReviews}</strong> revisions t'attendent</div>` : ""}
    </div>

    ${getButton(buttonText, `${BASE_URL}/dashboard`, "#0d9488")}

    <p style="color: #a8a29e; font-size: 14px; text-align: center;">
      ${footerText}
    </p>
  `;
}

/**
 * Weekly summary email content
 */
export async function getWeeklySummaryContent(
  username: string,
  stats: {
    reviewsCompleted: number;
    lessonsCompleted: number;
    accuracy: number;
    xpEarned: number;
    currentStreak: number;
    itemsLearned: { radicals: number; kanji: number; vocabulary: number };
  }
): Promise<string> {
  const custom = await getCustomTemplate("weekly_summary");
  const totalItemsLearned =
    stats.itemsLearned.radicals + stats.itemsLearned.kanji + stats.itemsLearned.vocabulary;

  const vars = {
    username,
    reviews: stats.reviewsCompleted,
    lessons: stats.lessonsCompleted,
    accuracy: stats.accuracy,
    xp: stats.xpEarned,
    streak: stats.currentStreak,
    items: totalItemsLearned,
  };

  const headline = custom ? replaceVariables(custom.headline, vars) : "Ton resume de la semaine";
  const bodyText = custom
    ? replaceVariables(custom.bodyText, vars)
    : `Bonjour ${username}, voici ce que tu as accompli cette semaine !`;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Continuer l'apprentissage";
  const footerText = custom?.footerText
    ? replaceVariables(custom.footerText, vars)
    : "Continue comme ca, tu progresses bien !";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #0d9488 0%, #10b981 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
      <div style="display: flex; justify-content: space-around; text-align: center; color: white;">
        <div>
          <div style="font-size: 28px; font-weight: bold;">${stats.reviewsCompleted}</div>
          <div style="font-size: 12px; opacity: 0.9;">revisions</div>
        </div>
        <div>
          <div style="font-size: 28px; font-weight: bold;">${stats.lessonsCompleted}</div>
          <div style="font-size: 12px; opacity: 0.9;">lecons</div>
        </div>
        <div>
          <div style="font-size: 28px; font-weight: bold;">${stats.accuracy}%</div>
          <div style="font-size: 12px; opacity: 0.9;">precision</div>
        </div>
      </div>
    </div>

    <div style="background: #f5f5f4; border-radius: 12px; padding: 16px; margin: 24px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e7e5e4;">
        <span style="color: #57534e;">XP gagnes</span>
        <span style="color: #0d9488; font-weight: bold;">+${stats.xpEarned}</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #e7e5e4;">
        <span style="color: #57534e;">Serie actuelle</span>
        <span style="color: #f59e0b; font-weight: bold;">${stats.currentStreak} jours &#128293;</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0;">
        <span style="color: #57534e;">Nouveaux elements</span>
        <span style="color: #1c1917; font-weight: bold;">${totalItemsLearned}</span>
      </div>
    </div>

    ${getButton(buttonText, `${BASE_URL}/dashboard`, "#0d9488")}

    <p style="color: #a8a29e; font-size: 14px; text-align: center;">
      ${footerText}
    </p>
  `;
}
