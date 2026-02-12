"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

// Only initialize if we have the API key
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // We'll capture manually for more control
    capture_pageleave: true,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") {
        // Don't track in development by default
        posthog.opt_out_capturing();
      }
    },
  });
}

// Component to identify users when they log in
function PostHogIdentifier() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      posthog.identify(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      });
    }
  }, [session]);

  return null;
}

// Page view tracker component
export function PostHogPageView() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.capture("$pageview");
    }
  }, []);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Don't render provider if no API key
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PostHogIdentifier />
      {children}
    </PHProvider>
  );
}

// Helper to track custom events
export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
) {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }
}

// Common events for Nihongo
export const NihongoEvents = {
  // Learning events
  lessonStarted: (lessonType: string, itemCount: number) =>
    trackEvent("lesson_started", { lesson_type: lessonType, item_count: itemCount }),

  lessonCompleted: (lessonType: string, itemCount: number, xpEarned: number) =>
    trackEvent("lesson_completed", { lesson_type: lessonType, item_count: itemCount, xp_earned: xpEarned }),

  reviewStarted: (reviewCount: number) =>
    trackEvent("review_started", { review_count: reviewCount }),

  reviewCompleted: (reviewCount: number, accuracy: number) =>
    trackEvent("review_completed", { review_count: reviewCount, accuracy }),

  // Progress events
  levelUp: (newLevel: number) =>
    trackEvent("level_up", { new_level: newLevel }),

  streakMilestone: (days: number) =>
    trackEvent("streak_milestone", { days }),

  // Feature usage
  aiMnemonicGenerated: (itemType: string) =>
    trackEvent("ai_mnemonic_generated", { item_type: itemType }),

  sentenceGenerated: (vocabId: number) =>
    trackEvent("sentence_generated", { vocab_id: vocabId }),
};
