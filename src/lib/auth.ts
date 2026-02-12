import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            email: true,
            passwordHash: true,
            username: true,
            emailVerified: true,
            onboardingCompleted: true,
            isAdmin: true,
            isSuspended: true,
            subscriptionStatus: true,
            subscriptionCurrentPeriodEnd: true,
          },
        });

        if (!user) {
          return null;
        }

        // Check if user is suspended
        if (user.isSuspended) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.username,
          emailVerified: user.emailVerified,
          onboardingCompleted: user.onboardingCompleted,
          isAdmin: user.isAdmin,
          subscriptionStatus: user.subscriptionStatus as "free" | "active" | "canceled" | "past_due" | "lifetime",
          subscriptionCurrentPeriodEnd: user.subscriptionCurrentPeriodEnd,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.emailVerified = user.emailVerified;
        token.onboardingCompleted = user.onboardingCompleted;
        token.isAdmin = user.isAdmin;
        token.subscriptionStatus = user.subscriptionStatus;
        token.subscriptionCurrentPeriodEnd = user.subscriptionCurrentPeriodEnd;
      }
      // Refresh token data on update trigger (e.g., after email verification, onboarding, or subscription change)
      if (trigger === "update" && token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            emailVerified: true,
            onboardingCompleted: true,
            isAdmin: true,
            subscriptionStatus: true,
            subscriptionCurrentPeriodEnd: true,
          },
        });
        if (dbUser) {
          token.emailVerified = dbUser.emailVerified;
          token.onboardingCompleted = dbUser.onboardingCompleted;
          token.isAdmin = dbUser.isAdmin;
          token.subscriptionStatus = dbUser.subscriptionStatus;
          token.subscriptionCurrentPeriodEnd = dbUser.subscriptionCurrentPeriodEnd;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.emailVerified = token.emailVerified as Date | null;
        session.user.onboardingCompleted = token.onboardingCompleted as boolean;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.subscriptionStatus = (token.subscriptionStatus as "free" | "active" | "canceled" | "past_due" | "lifetime") || "free";

        // Compute hasFullAccess
        const status = session.user.subscriptionStatus;
        const periodEnd = token.subscriptionCurrentPeriodEnd as Date | null;
        session.user.hasFullAccess =
          status === "lifetime" ||
          status === "active" ||
          (status === "canceled" && periodEnd !== null && new Date(periodEnd) > new Date());
      }
      return session;
    },
  },
});
