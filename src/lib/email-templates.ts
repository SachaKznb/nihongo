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

  const headline = custom ? replaceVariables(custom.headline, vars) : "Tes révisions t'attendent !";
  const defaultBody = `Bonjour ${username},

Tu as <strong style="color: #0d9488;">${reviewCount} révision${reviewCount > 1 ? "s" : ""}</strong> en attente. C'est le moment idéal pour renforcer ce que tu as appris.

Le système de répétition espacée fonctionne mieux quand tu fais tes révisions au bon moment. Ton cerveau est prêt à consolider ces kanji et vocabulaire, et quelques minutes suffisent pour ancrer ces connaissances sur le long terme.

Plus tu revises régulièrement, plus la mémorisation devient facile. Les premiers niveaux demandent un peu d'effort, mais tu verras vite que les kanji commencent à rester naturellement.`;

  const bodyText = custom ? replaceVariables(custom.bodyText, vars) : defaultBody;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Faire mes révisions";
  const footerText = custom?.footerText ? replaceVariables(custom.footerText, vars) : `${reviewCount * 5} XP t'attendent`;

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n\n/g, "</p><p style=\"color: #57534e; line-height: 1.6; margin-bottom: 16px;\">").replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
      <div style="font-size: 36px; font-weight: bold; color: white;">${reviewCount}</div>
      <div style="font-size: 14px; color: rgba(255,255,255,0.9);">révision${reviewCount > 1 ? "s" : ""} en attente</div>
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

  const headline = custom ? replaceVariables(custom.headline, vars) : `Ta série de ${currentStreak} jours est en danger`;

  const defaultBody = `Bonjour ${username},

Tu as construit une série de ${currentStreak} jours consécutifs d'apprentissage. C'est un vrai accomplissement, et ça serait dommage de la perdre maintenant.

Une seule révision suffit pour maintenir ta série. Ca prend moins de deux minutes, et tu gardes tout l'élan que tu as accumulé.

La régularité est la clé pour apprendre le japonais. Chaque jour compte, meme les jours ou tu n'as pas beaucoup de temps. Fais une révision rapide et ta série continue.`;

  const bodyText = custom ? replaceVariables(custom.bodyText, vars) : defaultBody;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Sauver ma série";
  const footerText = custom?.footerText
    ? replaceVariables(custom.footerText, vars)
    : "Ta série sera remise à zéro demain matin si tu ne fais pas au moins une révision aujourd'hui.";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n\n/g, "</p><p style=\"color: #57534e; line-height: 1.6; margin-bottom: 16px;\">").replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
      <div style="font-size: 48px; margin-bottom: 8px;">&#128293;</div>
      <div style="font-size: 36px; font-weight: bold; color: white;">${currentStreak}</div>
      <div style="font-size: 14px; color: rgba(255,255,255,0.9);">jours consécutifs</div>
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

  const headline = custom ? replaceVariables(custom.headline, vars) : `Niveau ${newLevel} débloqué`;

  const defaultBody = `Félicitations ${username},

Tu viens de passer au niveau ${newLevel}. Tu as prouvé que tu maîtrises les kanji du niveau précédent, et c'est une vraie progression.

De nouveaux radicaux, kanji et vocabulaire sont maintenant disponibles dans tes leçons. Ces nouveaux éléments s'appuient sur ce que tu connais déjà, donc tu vas voir des connexions avec ce que tu as appris.

Continue à ton rythme. L'important n'est pas d'aller vite, mais d'aller régulièrement. Chaque niveau te rapproche de la lecture fluide du japonais.`;

  const bodyText = custom ? replaceVariables(custom.bodyText, vars) : defaultBody;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Voir les nouvelles leçons";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n\n/g, "</p><p style=\"color: #57534e; line-height: 1.6; margin-bottom: 16px;\">").replace(/\n/g, "<br>")}
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

  if (daysInactive <= 5) {
    defaultHeadline = "Tes kanji t'attendent";
    defaultMessage = `Bonjour ${username},

Ça fait ${daysInactive} jours que tu n'as pas fait de révisions. Tes kanji et vocabulaire sont encore frais dans ta mémoire, mais ils commencent a s'estomper.

Le système de répétition espacée fonctionne mieux avec une pratique régulière. Quelques minutes maintenant te permettront de garder tout ce que tu as appris.

${pendingReviews > 0 ? `Tu as ${pendingReviews} révisions en attente. C'est le bon moment pour les faire.` : "Reviens faire quelques révisions pour maintenir tes acquis."}`;
    emoji = "&#128075;"; // waving hand
  } else if (daysInactive <= 14) {
    defaultHeadline = "Ta progression t'attend";
    defaultMessage = `Bonjour ${username},

Ça fait ${daysInactive} jours. Les kanji que tu as appris commencent a s'effacer de ta mémoire, mais tout n'est pas perdu.

Reprendre maintenant te permettra de recuperer une grande partie de ce que tu as appris. Le cerveau oublie progressivement, mais il se souvient aussi vite quand on revise.

${pendingReviews > 0 ? `${pendingReviews} révisions t'attendent. Commence par quelques-unes, sans pression.` : "Fais quelques révisions pour réactiver ta mémoire."}`;
    emoji = "&#129504;"; // brain
  } else {
    defaultHeadline = "Reprendre le japonais";
    defaultMessage = `Bonjour ${username},

Ça fait un moment qu'on ne t'a pas vu. Apprendre une langue demande de la régularité, et parfois on fait une pause plus longue que prevu.

La bonne nouvelle, c'est que tu peux reprendre a ton rythme. Les premiers jours de reprise seront peut-etre un peu plus difficiles, mais ta mémoire va vite se réactiver.

${pendingReviews > 0 ? `Tu as ${pendingReviews} révisions en attente. Pas besoin de tout faire d'un coup. Commence doucement.` : "Reviens quand tu es pret, tes kanji t'attendent."}`;
    emoji = "&#127793;"; // seedling
  }

  const headline = custom ? replaceVariables(custom.headline, vars) : defaultHeadline;
  const bodyText = custom ? replaceVariables(custom.bodyText, vars) : defaultMessage;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Reprendre mes révisions";
  const footerText = custom?.footerText
    ? replaceVariables(custom.footerText, vars)
    : "Meme 5 minutes par jour font une vraie difference sur le long terme.";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n\n/g, "</p><p style=\"color: #57534e; line-height: 1.6; margin-bottom: 16px;\">").replace(/\n/g, "<br>")}
    </p>

    <div style="background: #f5f5f4; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
      <div style="font-size: 48px; margin-bottom: 12px;">${emoji}</div>
      ${pendingReviews > 0 ? `<div style="font-size: 16px; color: #57534e;"><strong>${pendingReviews}</strong> révisions en attente</div>` : ""}
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

  const headline = custom ? replaceVariables(custom.headline, vars) : "Ta semaine en japonais";

  let progressComment = "";
  if (stats.accuracy >= 90) {
    progressComment = "Ta précision est excellente cette semaine. Les kanji rentrent bien.";
  } else if (stats.accuracy >= 75) {
    progressComment = "Bonne semaine de travail. Quelques erreurs, mais c'est comme ca qu'on apprend.";
  } else if (stats.reviewsCompleted > 0) {
    progressComment = "Tu as fait des révisions cette semaine, c'est l'essentiel. La précision viendra avec la pratique.";
  }

  let streakComment = "";
  if (stats.currentStreak >= 30) {
    streakComment = `${stats.currentStreak} jours de série, c'est impressionnant. Cette régularité fait vraiment la difference.`;
  } else if (stats.currentStreak >= 7) {
    streakComment = `${stats.currentStreak} jours consécutifs. Tu as pris un bon rythme.`;
  } else if (stats.currentStreak > 0) {
    streakComment = `Serie de ${stats.currentStreak} jour${stats.currentStreak > 1 ? "s" : ""}. Continue a construire cette habitude.`;
  }

  const defaultBody = `Bonjour ${username},

Voici ton résumé de la semaine. ${stats.reviewsCompleted > 0 ? `Tu as complete ${stats.reviewsCompleted} révision${stats.reviewsCompleted > 1 ? "s" : ""}` : ""}${stats.lessonsCompleted > 0 ? ` et appris ${stats.lessonsCompleted} nouvelle${stats.lessonsCompleted > 1 ? "s" : ""} leçon${stats.lessonsCompleted > 1 ? "s" : ""}` : ""}.

${progressComment}

${streakComment}`;

  const bodyText = custom ? replaceVariables(custom.bodyText, vars) : defaultBody;
  const buttonText = custom ? replaceVariables(custom.buttonText, vars) : "Continuer";
  const footerText = custom?.footerText
    ? replaceVariables(custom.footerText, vars)
    : "A la semaine prochaine pour un nouveau bilan.";

  return `
    <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
      ${headline}
    </h2>

    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
      ${bodyText.replace(/\n\n/g, "</p><p style=\"color: #57534e; line-height: 1.6; margin-bottom: 16px;\">").replace(/\n/g, "<br>")}
    </p>

    <div style="background: linear-gradient(135deg, #0d9488 0%, #10b981 100%); border-radius: 12px; padding: 24px; margin: 24px 0;">
      <div style="display: flex; justify-content: space-around; text-align: center; color: white;">
        <div>
          <div style="font-size: 28px; font-weight: bold;">${stats.reviewsCompleted}</div>
          <div style="font-size: 12px; opacity: 0.9;">révisions</div>
        </div>
        <div>
          <div style="font-size: 28px; font-weight: bold;">${stats.lessonsCompleted}</div>
          <div style="font-size: 12px; opacity: 0.9;">leçons</div>
        </div>
        <div>
          <div style="font-size: 28px; font-weight: bold;">${stats.accuracy}%</div>
          <div style="font-size: 12px; opacity: 0.9;">précision</div>
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
        <span style="color: #57534e;">Nouveaux éléments</span>
        <span style="color: #1c1917; font-weight: bold;">${totalItemsLearned}</span>
      </div>
    </div>

    ${getButton(buttonText, `${BASE_URL}/dashboard`, "#0d9488")}

    <p style="color: #a8a29e; font-size: 14px; text-align: center;">
      ${footerText}
    </p>
  `;
}
