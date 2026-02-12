import type {
  User,
  Radical,
  Kanji,
  Vocabulary,
  UserRadicalProgress,
  UserKanjiProgress,
  UserVocabularyProgress,
  Review,
} from "@prisma/client";

export type { User, Radical, Kanji, Vocabulary, Review };

export type ItemType = "radical" | "kanji" | "vocabulary";
export type ReviewType = "meaning" | "reading";

export interface RadicalWithProgress extends Radical {
  userProgress?: UserRadicalProgress | null;
}

export interface KanjiWithProgress extends Kanji {
  userProgress?: UserKanjiProgress | null;
  radicals?: { radical: Radical }[];
}

export interface VocabularyWithProgress extends Vocabulary {
  userProgress?: UserVocabularyProgress | null;
  kanji?: { kanji: Kanji }[];
}

export interface LessonItem {
  type: ItemType;
  id: number;
  character: string | null;
  meaningsFr: string[];
  readings?: string[];
  readingsOn?: string[];
  readingsKun?: string[];
  mnemonic: string;
  readingMnemonic?: string;
  customMnemonic?: string | null; // User's custom AI-generated mnemonic
  customReadingMnemonic?: string | null; // For kanji only
  imageUrl?: string | null;
  sentence?: { jp: string; fr: string } | null;
  // For radicals: kanji that use this radical
  usedInKanji?: { character: string; meaningFr: string }[];
  // For kanji: component radicals
  componentRadicals?: { character: string | null; meaningFr: string; imageUrl?: string | null }[];
  // For kanji: vocabulary using this kanji
  usedInVocabulary?: { word: string; meaningFr: string; reading: string }[];
}

export interface ReviewItem {
  type: ItemType;
  id: number;
  character: string | null;
  meaningsFr: string[];
  readings?: string[];
  currentStage: number;
  imageUrl?: string | null;
  mnemonic?: string;
  readingMnemonic?: string;
}

export interface SrsBreakdown {
  apprentice: number;
  guru: number;
  master: number;
  shodan: number;
  satori: number;
}

export interface ReviewSessionItem extends ReviewItem {
  meaningAnswered: boolean;
  meaningCorrect: boolean | null;
  readingAnswered: boolean;
  readingCorrect: boolean | null;
}

export interface ReviewSummary {
  totalItems: number;
  correctItems: number;
  incorrectItems: number;
  accuracy: number;
  xpEarned: number;
  stageChanges: {
    type: ItemType;
    character: string | null;
    from: number;
    to: number;
  }[];
}

export interface GamificationStats {
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  weeklyXp: number;
  totalReviewsDone: number;
  totalLessonsDone: number;
  perfectDays: number;
  todayAccuracy: number;
  todayReviews: number;
  todayLessons: number;
  levelProgress: number; // 0-100 percentage to next level
  activeLearners: number; // Social proof - simulated or real
  // Tanuki pet data
  tanukiSkin?: string;
  tanukiName?: string | null;
  lastStudyDate?: Date | null;
}

export interface UserProgress {
  currentLevel: number;
  totalRadicals: number;
  totalKanji: number;
  totalVocabulary: number;
  learnedRadicals: number;
  learnedKanji: number;
  learnedVocabulary: number;
  srsBreakdown: SrsBreakdown;
  pendingLessons: number;
  pendingReviews: number;
  upcomingReviews: { time: Date; count: number }[];
  gamification: GamificationStats;
}

export interface AnswerResult {
  correct: boolean;
  expectedAnswers: string[];
  srsStageFrom: number;
  srsStageTo: number;
}

// Subscription types
export type SubscriptionStatus = "free" | "active" | "canceled" | "past_due" | "lifetime";
export type SubscriptionPlan = "monthly" | "yearly" | "lifetime" | null;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      emailVerified: Date | null;
      onboardingCompleted: boolean;
      isAdmin: boolean;
      subscriptionStatus: SubscriptionStatus;
      hasFullAccess: boolean;
    };
  }

  interface User {
    id: string;
    emailVerified: Date | null;
    onboardingCompleted: boolean;
    isAdmin: boolean;
    subscriptionStatus: SubscriptionStatus;
    subscriptionCurrentPeriodEnd: Date | null;
  }
}
