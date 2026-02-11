export const SRS_STAGES = {
  LOCKED: 0,
  APPRENTICE_1: 1, // 4 hours
  APPRENTICE_2: 2, // 8 hours
  APPRENTICE_3: 3, // 1 day
  APPRENTICE_4: 4, // 2 days
  GURU_1: 5, // 1 week
  GURU_2: 6, // 2 weeks
  MASTER: 7, // 1 month
  ENLIGHTENED: 8, // 4 months
  BURNED: 9, // complete
} as const;

export type SrsStage = (typeof SRS_STAGES)[keyof typeof SRS_STAGES];

export const SRS_INTERVALS_HOURS: Record<number, number> = {
  1: 4,
  2: 8,
  3: 24,
  4: 48,
  5: 168, // 1 week
  6: 336, // 2 weeks
  7: 720, // ~1 month
  8: 2880, // ~4 months
};

export const SRS_STAGE_NAMES: Record<number, string> = {
  0: "Verrouillé",
  1: "Apprenti 1",
  2: "Apprenti 2",
  3: "Apprenti 3",
  4: "Apprenti 4",
  5: "Guru 1",
  6: "Guru 2",
  7: "Maître",
  8: "Shodan",
  9: "Satori",
};

export const SRS_STAGE_COLORS: Record<number, string> = {
  0: "bg-gray-400",
  1: "bg-pink-400",
  2: "bg-pink-500",
  3: "bg-pink-600",
  4: "bg-pink-700",
  5: "bg-purple-500",
  6: "bg-purple-600",
  7: "bg-blue-500",
  8: "bg-yellow-500",
  9: "bg-gray-800",
};

export function calculateNextReview(stage: number): Date {
  const hours = SRS_INTERVALS_HOURS[stage] || 4;
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function calculateNewStage(
  currentStage: number,
  correct: boolean
): number {
  if (correct) {
    return Math.min(currentStage + 1, SRS_STAGES.BURNED);
  }
  // Wrong answer: drop back based on current stage
  if (currentStage <= 4) return Math.max(1, currentStage - 1);
  if (currentStage <= 6) return Math.max(1, currentStage - 2);
  return Math.max(1, currentStage - 2);
}

export function getSrsCategory(
  stage: number
): "locked" | "apprentice" | "guru" | "master" | "shodan" | "satori" {
  if (stage === 0) return "locked";
  if (stage <= 4) return "apprentice";
  if (stage <= 6) return "guru";
  if (stage === 7) return "master";
  if (stage === 8) return "shodan";
  return "satori";
}

export function formatNextReview(nextReviewAt: Date | null): string {
  if (!nextReviewAt) return "Non disponible";

  const now = new Date();
  const diff = nextReviewAt.getTime() - now.getTime();

  if (diff <= 0) return "Maintenant";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days} jour${days > 1 ? "s" : ""}`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}
