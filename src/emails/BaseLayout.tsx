import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface BaseLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function BaseLayout({ preview, children }: BaseLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo/Header */}
          <Section style={logoSection}>
            <Text style={logoKanji}>日</Text>
            <Heading style={logoText}>Nihongo</Heading>
          </Section>

          {/* Content */}
          {children}

          {/* Footer */}
          <Hr style={hr} />
          <Text style={footer}>
            Nihongo - Apprenez le japonais avec des mnemoniques en francais
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f5f5f4",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "500px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const logoKanji = {
  fontSize: "48px",
  margin: "0",
  lineHeight: "1",
};

const logoText = {
  color: "#1c1917",
  fontSize: "24px",
  fontWeight: "700",
  margin: "16px 0 0 0",
};

const hr = {
  borderColor: "#e7e5e4",
  margin: "32px 0",
};

const footer = {
  color: "#a8a29e",
  fontSize: "12px",
  textAlign: "center" as const,
};

export default BaseLayout;
