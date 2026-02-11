import { Resend } from "resend";

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
    const { error } = await resend.emails.send({
      from: "Nihongo <noreply@resend.dev>", // Use your verified domain in production
      to: email,
      subject: "Reinitialisation de votre mot de passe - Nihongo",
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
                Reinitialisation de votre mot de passe
              </h2>

              <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
                Vous avez demande la reinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour creer un nouveau mot de passe.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #0d9488; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
                  Reinitialiser mon mot de passe
                </a>
              </div>

              <p style="color: #a8a29e; font-size: 14px; margin-bottom: 8px;">
                Ce lien expirera dans 1 heure.
              </p>

              <p style="color: #a8a29e; font-size: 14px;">
                Si vous n'avez pas demande cette reinitialisation, vous pouvez ignorer cet email en toute securite.
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
