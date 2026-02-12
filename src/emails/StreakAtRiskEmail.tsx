import {
  Button,
  Heading,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "./BaseLayout";

interface StreakAtRiskEmailProps {
  username: string;
  currentStreak: number;
  dashboardUrl: string;
  unsubscribeUrl: string;
}

export function StreakAtRiskEmail({
  username,
  currentStreak,
  dashboardUrl,
  unsubscribeUrl,
}: StreakAtRiskEmailProps) {
  return (
    <BaseLayout preview={`Ne perds pas ta serie de ${currentStreak} jours !`}>
      <Section style={contentSection}>
        {/* Fire emoji for urgency */}
        <Text style={fireEmoji}>🔥</Text>

        <Heading style={heading}>
          Ne perds pas ta serie de {currentStreak} jours !
        </Heading>

        <Text style={paragraph}>
          Salut {username}, ta serie est en danger ! Tu n'as pas encore etudie
          aujourd'hui. Complete au moins une revision pour maintenir ta serie.
        </Text>

        <Section style={streakBox}>
          <Text style={streakLabel}>Ta serie actuelle</Text>
          <Text style={streakNumber}>{currentStreak} jours</Text>
          <Text style={streakMotivation}>
            {currentStreak >= 7
              ? "Incroyable ! Continue comme ca !"
              : currentStreak >= 3
                ? "Belle progression ! Ne lache rien !"
                : "Chaque jour compte !"}
          </Text>
        </Section>

        <Section style={buttonSection}>
          <Button style={button} href={dashboardUrl}>
            Etudier maintenant
          </Button>
        </Section>

        <Text style={note}>
          <a href={unsubscribeUrl} style={unsubscribeLink}>
            Se desabonner de ces notifications
          </a>
        </Text>
      </Section>
    </BaseLayout>
  );
}

// Styles
const contentSection = {
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textAlign: "center" as const,
};

const fireEmoji = {
  fontSize: "48px",
  margin: "0 0 16px 0",
};

const heading = {
  color: "#1c1917",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 16px 0",
};

const paragraph = {
  color: "#57534e",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px 0",
  textAlign: "left" as const,
};

const streakBox = {
  backgroundColor: "#fef3c7",
  borderRadius: "12px",
  padding: "20px",
  margin: "24px 0",
};

const streakLabel = {
  color: "#92400e",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 8px 0",
};

const streakNumber = {
  color: "#1c1917",
  fontSize: "36px",
  fontWeight: "700",
  margin: "0 0 8px 0",
};

const streakMotivation = {
  color: "#92400e",
  fontSize: "14px",
  margin: "0",
};

const buttonSection = {
  margin: "24px 0",
};

const button = {
  backgroundColor: "#f97316",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "14px 32px",
  display: "inline-block",
};

const note = {
  margin: "24px 0 0 0",
};

const unsubscribeLink = {
  color: "#a8a29e",
  fontSize: "12px",
  textDecoration: "underline",
};

export default StreakAtRiskEmail;
