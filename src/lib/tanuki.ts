// Tanuki Pet System Configuration

export interface TanukiStage {
  id: number;
  name: string;
  description: string;
  xpRequired: number;
  emoji: string;
  mood: string;
  message: string;
}

export interface TanukiSkin {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Evolution stages based on total XP
export const TANUKI_STAGES: TanukiStage[] = [
  {
    id: 1,
    name: "Œuf Mystérieux",
    description: "Un œuf qui brille doucement...",
    xpRequired: 0,
    emoji: "🥚",
    mood: "dormant",
    message: "Continue à étudier pour me faire éclore !",
  },
  {
    id: 2,
    name: "Bébé Tanuki",
    description: "Un petit tanuki vient de naître !",
    xpRequired: 500,
    emoji: "🦝",
    mood: "sleepy",
    message: "Miam, j'ai faim d'XP !",
  },
  {
    id: 3,
    name: "Tanuki Curieux",
    description: "Il commence à explorer le monde",
    xpRequired: 2000,
    emoji: "🦝",
    mood: "curious",
    message: "Oh, qu'est-ce que c'est, ce kanji ?",
  },
  {
    id: 4,
    name: "Tanuki Étudiant",
    description: "Il a trouvé sa vocation : apprendre !",
    xpRequired: 5000,
    emoji: "🦝",
    mood: "studious",
    message: "Révisons ensemble !",
  },
  {
    id: 5,
    name: "Tanuki Sage",
    description: "La sagesse se lit dans ses yeux",
    xpRequired: 15000,
    emoji: "🦝",
    mood: "wise",
    message: "La persévérance est la clé.",
  },
  {
    id: 6,
    name: "Tanuki Sensei",
    description: "Un maître respecté de tous",
    xpRequired: 50000,
    emoji: "🦝",
    mood: "master",
    message: "Tu es devenu mon égal, mon ami.",
  },
];

// Available skins for purchase
export const TANUKI_SKINS: TanukiSkin[] = [
  {
    id: "classic",
    name: "Classique",
    description: "Le tanuki traditionnel",
    price: 0,
    colors: {
      primary: "#8B7355",
      secondary: "#D4C4B0",
      accent: "#2D2D2D",
    },
  },
  {
    id: "ninja",
    name: "Ninja",
    description: "Un tanuki des ombres",
    price: 1500,
    colors: {
      primary: "#1a1a2e",
      secondary: "#4a4a6a",
      accent: "#e94560",
    },
  },
  {
    id: "sakura",
    name: "Sakura",
    description: "Paré de fleurs de cerisier",
    price: 2000,
    colors: {
      primary: "#ffb7c5",
      secondary: "#ffd1dc",
      accent: "#ff69b4",
    },
  },
  {
    id: "golden",
    name: "Doré",
    description: "Un tanuki légendaire",
    price: 3500,
    colors: {
      primary: "#ffd700",
      secondary: "#fff8dc",
      accent: "#ff8c00",
    },
  },
  {
    id: "spirit",
    name: "Esprit",
    description: "Un tanuki éthéré",
    price: 5000,
    colors: {
      primary: "#e0e7ff",
      secondary: "#c7d2fe",
      accent: "#818cf8",
    },
  },
];

// Helper functions
export function getTanukiStage(totalXp: number): TanukiStage {
  // Find the highest stage the user has reached
  for (let i = TANUKI_STAGES.length - 1; i >= 0; i--) {
    if (totalXp >= TANUKI_STAGES[i].xpRequired) {
      return TANUKI_STAGES[i];
    }
  }
  return TANUKI_STAGES[0];
}

export function getNextTanukiStage(totalXp: number): TanukiStage | null {
  const currentStage = getTanukiStage(totalXp);
  const nextIndex = TANUKI_STAGES.findIndex((s) => s.id === currentStage.id) + 1;
  if (nextIndex < TANUKI_STAGES.length) {
    return TANUKI_STAGES[nextIndex];
  }
  return null;
}

export function getProgressToNextStage(totalXp: number): number {
  const currentStage = getTanukiStage(totalXp);
  const nextStage = getNextTanukiStage(totalXp);

  if (!nextStage) return 100; // Max level

  const xpIntoCurrentStage = totalXp - currentStage.xpRequired;
  const xpNeededForNext = nextStage.xpRequired - currentStage.xpRequired;

  return Math.min(100, Math.round((xpIntoCurrentStage / xpNeededForNext) * 100));
}

export function getTanukiSkinById(id: string): TanukiSkin | undefined {
  return TANUKI_SKINS.find((s) => s.id === id);
}

// Get mood message based on activity
// Note: timezone parameter allows for timezone-aware "studied today" calculation
export function getTanukiMoodMessage(
  stage: TanukiStage,
  lastStudyDate: Date | null,
  currentStreak: number,
  pendingReviews: number,
  timezone: string = "UTC"
): { mood: "happy" | "neutral" | "sleepy" | "excited"; message: string } {
  const now = new Date();

  // Calculate today's start in user's timezone
  let today: Date;
  try {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const todayStr = formatter.format(now);
    const [year, month, day] = todayStr.split("-").map(Number);
    today = new Date(year, month - 1, day);
  } catch {
    // Fallback to local time if timezone is invalid
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // Check if studied today (in user's timezone)
  const studiedToday = lastStudyDate && new Date(lastStudyDate) >= today;

  // Stage 1 (egg) has special messages
  if (stage.id === 1) {
    if (pendingReviews > 0) {
      return { mood: "excited", message: "L'œuf frémit... il veut des révisions !" };
    }
    return { mood: "neutral", message: stage.message };
  }

  // High streak celebration
  if (currentStreak >= 7 && studiedToday) {
    return { mood: "excited", message: `${currentStreak} jours ! On est inarrêtables !` };
  }

  // Pending reviews
  if (pendingReviews > 50) {
    return { mood: "neutral", message: `${pendingReviews} révisions... on s'y met ?` };
  }

  if (pendingReviews > 0 && pendingReviews <= 10) {
    return { mood: "happy", message: "Juste quelques révisions, allez !" };
  }

  // No activity recently
  if (!studiedToday && lastStudyDate) {
    const daysSinceStudy = Math.floor(
      (now.getTime() - new Date(lastStudyDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceStudy >= 3) {
      return { mood: "sleepy", message: "Zzz... tu m'as manqué..." };
    }
    if (daysSinceStudy >= 1) {
      return { mood: "neutral", message: "On étudie aujourd'hui ?" };
    }
  }

  // Studied today, all caught up
  if (studiedToday && pendingReviews === 0) {
    return { mood: "happy", message: "Super travail aujourd'hui !" };
  }

  // Default
  return { mood: "neutral", message: stage.message };
}
