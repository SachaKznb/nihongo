import { Resend } from "resend";
import { render } from "@react-email/render";
import { VerificationEmail } from "@/emails/VerificationEmail";
import { PasswordResetEmail } from "@/emails/PasswordResetEmail";
import { StreakAtRiskEmail } from "@/emails/StreakAtRiskEmail";
import {
  getEmailWrapper,
  getReviewsWaitingContent,
  getStreakAtRiskContent,
  getLevelUpContent,
  getReengagementContent,
  getWeeklySummaryContent,
} from "./email-templates";

// Lazy-load Resend client to avoid build-time errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  try {
    const resend = getResendClient();
    const html = await render(PasswordResetEmail({ resetUrl }));

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: "Reinitialisation de votre mot de passe - Nihongo",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: "Erreur lors de l'envoi de l'email",
    };
  }
}

export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<{ success: boolean; error?: string }> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

  try {
    const resend = getResendClient();
    const html = await render(VerificationEmail({ verifyUrl }));

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: "Verifiez votre adresse email - Nihongo",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: "Erreur lors de l'envoi de l'email",
    };
  }
}

export async function sendEmailChangeVerification(
  newEmail: string,
  token: string,
  username: string
): Promise<{ success: boolean; error?: string }> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyUrl = `${baseUrl}/api/account/email/verify?token=${token}`;

  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: newEmail,
      subject: "Confirmez votre nouvelle adresse email - Nihongo",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 32px;">
                <span style="font-size: 48px;">&#26085;</span>
                <h1 style="color: #1c1917; margin: 16px 0 8px; font-size: 24px;">Nihongo</h1>
              </div>

              <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
                Confirmez votre nouvelle adresse email
              </h2>

              <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
                Bonjour ${username}, vous avez demande a changer votre adresse email sur Nihongo. Cliquez sur le bouton ci-dessous pour confirmer cette nouvelle adresse.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${verifyUrl}" style="display: inline-block; background: #0d9488; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
                  Confirmer cette adresse
                </a>
              </div>

              <p style="color: #a8a29e; font-size: 14px; margin-bottom: 8px;">
                Ce lien expirera dans 24 heures.
              </p>

              <p style="color: #a8a29e; font-size: 14px;">
                Si vous n'avez pas demande ce changement, vous pouvez ignorer cet email.
              </p>

              <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;">

              <p style="color: #a8a29e; font-size: 12px; text-align: center;">
                Nihongo - Apprenez le japonais
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: "Erreur lors de l'envoi de l'email",
    };
  }
}

export async function sendAdminPasswordReset(
  email: string,
  username: string,
  temporaryPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: "Votre mot de passe a ete reinitialise - Nihongo",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f4; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 32px;">
                <span style="font-size: 48px;">&#26085;</span>
                <h1 style="color: #1c1917; margin: 16px 0 8px; font-size: 24px;">Nihongo</h1>
              </div>

              <h2 style="color: #1c1917; font-size: 20px; margin-bottom: 16px;">
                Mot de passe reinitialise
              </h2>

              <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
                Bonjour ${username}, un administrateur a reinitialise votre mot de passe. Voici vos nouvelles informations de connexion :
              </p>

              <div style="background: #f5f5f4; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <p style="color: #57534e; margin: 0 0 8px;">
                  <strong>Mot de passe temporaire :</strong>
                </p>
                <p style="color: #1c1917; font-family: monospace; font-size: 18px; margin: 0; letter-spacing: 1px;">
                  ${temporaryPassword}
                </p>
              </div>

              <p style="color: #dc2626; font-size: 14px; margin-bottom: 24px;">
                Important : Veuillez changer ce mot de passe des votre prochaine connexion dans les parametres de votre compte.
              </p>

              <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;">

              <p style="color: #a8a29e; font-size: 12px; text-align: center;">
                Nihongo - Apprenez le japonais
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      error: "Erreur lors de l'envoi de l'email",
    };
  }
}

// ============================================
// NOTIFICATION EMAILS
// ============================================

/**
 * Send reviews waiting notification
 */
export async function sendReviewsWaitingEmail(
  email: string,
  username: string,
  reviewCount: number,
  unsubscribeToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const content = await getReviewsWaitingContent(username, reviewCount);
    const html = getEmailWrapper(content, unsubscribeToken, "reviews_waiting");

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: `${reviewCount} revision${reviewCount > 1 ? "s" : ""} t'attend${reviewCount > 1 ? "ent" : ""} - Nihongo`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'email" };
  }
}

/**
 * Send streak at risk notification
 */
export async function sendStreakAtRiskEmail(
  email: string,
  username: string,
  currentStreak: number,
  unsubscribeToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const content = await getStreakAtRiskContent(username, currentStreak);
    const html = getEmailWrapper(content, unsubscribeToken, "streak_at_risk");

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: `Ne perds pas ta serie de ${currentStreak} jours ! - Nihongo`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'email" };
  }
}

/**
 * Send level up celebration notification
 */
export async function sendLevelUpEmail(
  email: string,
  username: string,
  newLevel: number,
  unsubscribeToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const content = await getLevelUpContent(username, newLevel);
    const html = getEmailWrapper(content, unsubscribeToken, "level_up");

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: `Felicitations ! Tu passes au niveau ${newLevel} ! - Nihongo`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'email" };
  }
}

/**
 * Send re-engagement notification for inactive users
 */
export async function sendReengagementEmail(
  email: string,
  username: string,
  daysInactive: number,
  pendingReviews: number,
  unsubscribeToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const content = await getReengagementContent(username, daysInactive, pendingReviews);
    const html = getEmailWrapper(content, unsubscribeToken, "reengagement");

    let subject: string;
    if (daysInactive <= 3) {
      subject = "Tu nous manques ! - Nihongo";
    } else if (daysInactive <= 7) {
      subject = "Ta memoire a besoin de toi - Nihongo";
    } else {
      subject = "Reprenons ensemble - Nihongo";
    }

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'email" };
  }
}

/**
 * Send weekly progress summary
 */
export async function sendWeeklySummaryEmail(
  email: string,
  username: string,
  stats: {
    reviewsCompleted: number;
    lessonsCompleted: number;
    accuracy: number;
    xpEarned: number;
    currentStreak: number;
    itemsLearned: { radicals: number; kanji: number; vocabulary: number };
  },
  unsubscribeToken: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResendClient();
    const content = await getWeeklySummaryContent(username, stats);
    const html = getEmailWrapper(content, unsubscribeToken, "weekly_summary");

    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@trynihongo.fr>",
      to: email,
      subject: "Ton resume de la semaine - Nihongo",
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Erreur lors de l'envoi de l'email" };
  }
}
