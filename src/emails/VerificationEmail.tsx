import {
  Button,
  Heading,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "./BaseLayout";

interface VerificationEmailProps {
  verifyUrl: string;
}

export function VerificationEmail({ verifyUrl }: VerificationEmailProps) {
  return (
    <BaseLayout preview="Verifiez votre email pour commencer a apprendre le japonais">
      <Section style={contentSection}>
        <Heading style={heading}>Bienvenue sur Nihongo !</Heading>

        <Text style={paragraph}>
          Merci de vous etre inscrit. Pour commencer votre apprentissage du
          japonais, veuillez confirmer votre adresse email en cliquant sur le
          bouton ci-dessous.
        </Text>

        <Section style={buttonSection}>
          <Button style={button} href={verifyUrl}>
            Verifier mon email
          </Button>
        </Section>

        <Text style={note}>Ce lien expirera dans 24 heures.</Text>

        <Text style={noteSecondary}>
          Si vous n'avez pas cree de compte sur Nihongo, vous pouvez ignorer cet
          email.
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

export default VerificationEmail;
