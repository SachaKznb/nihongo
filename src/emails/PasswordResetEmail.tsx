import {
  Button,
  Heading,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "./BaseLayout";

interface PasswordResetEmailProps {
  resetUrl: string;
}

export function PasswordResetEmail({ resetUrl }: PasswordResetEmailProps) {
  return (
    <BaseLayout preview="Reinitialisation de votre mot de passe Nihongo">
      <Section style={contentSection}>
        <Heading style={heading}>
          Reinitialisation de votre mot de passe
        </Heading>

        <Text style={paragraph}>
          Vous avez demande la reinitialisation de votre mot de passe. Cliquez
          sur le bouton ci-dessous pour créér un nouveau mot de passe.
        </Text>

        <Section style={buttonSection}>
          <Button style={button} href={resetUrl}>
            Reinitialiser mon mot de passe
          </Button>
        </Section>

        <Text style={note}>Ce lien expirera dans 1 heure.</Text>

        <Text style={noteSecondary}>
          Si vous n'avez pas demande cette reinitialisation, vous pouvez ignorer
          cet email en toute securite.
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
};

const heading = {
  color: "#1c1917",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const paragraph = {
  color: "#57534e",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px 0",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0d9488",
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
  color: "#a8a29e",
  fontSize: "14px",
  margin: "0 0 8px 0",
};

const noteSecondary = {
  color: "#a8a29e",
  fontSize: "14px",
  margin: "0",
};

export default PasswordResetEmail;
