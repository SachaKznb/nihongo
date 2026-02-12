// XP Rewards System Configuration

export interface Theme {
  id: string;
  name: string;
  description: string;
  price: number; // XP cost
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  preview: string; // CSS gradient for preview
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "milestone" | "streak" | "mastery" | "dedication";
  condition: string; // Human-readable condition
}

// Available themes for purchase
export const THEMES: Theme[] = [
  {
    id: "default",
    name: "Classique",
    description: "Le thème par défaut, clair et épuré",
    price: 0,
    colors: {
      primary: "teal-600",
      secondary: "stone-600",
      accent: "indigo-600",
      background: "stone-50",
      surface: "white",
      text: "stone-900",
      muted: "stone-500",
    },
    preview: "linear-gradient(135deg, #f5f5f4 0%, #0d9488 100%)",
  },
  {
    id: "dark",
    name: "Mode Sombre",
    description: "Un thème sombre élégant pour étudier la nuit",
    price: 1000,
    colors: {
      primary: "teal-400",
      secondary: "slate-400",
      accent: "indigo-400",
      background: "slate-900",
      surface: "slate-800",
      text: "slate-100",
      muted: "slate-400",
    },
    preview: "linear-gradient(135deg, #1e293b 0%, #2dd4bf 100%)",
  },
  {
    id: "sakura",
    name: "Sakura",
    description: "Inspiré des fleurs de cerisier japonaises",
    price: 2000,
    colors: {
      primary: "pink-500",
      secondary: "pink-700",
      accent: "rose-600",
      background: "pink-50",
      surface: "white",
      text: "pink-900",
      muted: "pink-400",
    },
    preview: "linear-gradient(135deg, #fdf2f8 0%, #ec4899 100%)",
  },
  {
    id: "ocean",
    name: "Océan",
    description: "Les profondeurs bleues de l'océan pacifique",
    price: 2000,
    colors: {
      primary: "blue-500",
      secondary: "cyan-600",
      accent: "blue-700",
      background: "blue-50",
      surface: "white",
      text: "blue-900",
      muted: "blue-400",
    },
    preview: "linear-gradient(135deg, #eff6ff 0%, #3b82f6 100%)",
  },
  {
    id: "gold",
    name: "Or Impérial",
    description: "L'élégance dorée de l'ère Edo",
    price: 3000,
    colors: {
      primary: "amber-500",
      secondary: "yellow-600",
      accent: "orange-600",
      background: "amber-50",
      surface: "white",
      text: "amber-900",
      muted: "amber-500",
    },
    preview: "linear-gradient(135deg, #fffbeb 0%, #f59e0b 100%)",
  },
];

// Available badges (auto-unlocked based on achievements)
export const BADGES: Badge[] = [
  // Milestone badges
  {
    id: "first-lesson",
    name: "Premier Pas",
    description: "Compléter ta première leçon",
    icon: "🎓",
    category: "milestone",
    condition: "Compléter 1 leçon",
  },
  {
    id: "hundred-reviews",
    name: "Centurion",
    description: "Compléter 100 révisions",
    icon: "💯",
    category: "milestone",
    condition: "Compléter 100 révisions",
  },
  {
    id: "thousand-reviews",
    name: "Marathonien",
    description: "Compléter 1000 révisions",
    icon: "🏃",
    category: "milestone",
    condition: "Compléter 1000 révisions",
  },

  // Streak badges
  {
    id: "streak-7",
    name: "Semaine Parfaite",
    description: "Maintenir une série de 7 jours",
    icon: "📅",
    category: "streak",
    condition: "Série de 7 jours",
  },
  {
    id: "streak-30",
    name: "Mois Dédié",
    description: "Maintenir une série de 30 jours",
    icon: "🗓️",
    category: "streak",
    condition: "Série de 30 jours",
  },
  {
    id: "streak-100",
    name: "Centenaire",
    description: "Maintenir une série de 100 jours",
    icon: "🔥",
    category: "streak",
    condition: "Série de 100 jours",
  },

  // Mastery badges (SRS stage achievements)
  {
    id: "first-guru",
    name: "Premier Guru",
    description: "Atteindre Guru avec un élément",
    icon: "🧘",
    category: "mastery",
    condition: "1 élément au stage Guru",
  },
  {
    id: "first-master",
    name: "Premier Maître",
    description: "Atteindre Maître avec un élément",
    icon: "👨‍🏫",
    category: "mastery",
    condition: "1 élément au stage Maître",
  },
  {
    id: "first-satori",
    name: "Illumination",
    description: "Atteindre Satori avec un élément",
    icon: "✨",
    category: "mastery",
    condition: "1 élément au stage Satori",
  },

  // Level badges
  {
    id: "level-5",
    name: "Niveau 5",
    description: "Atteindre le niveau 5",
    icon: "⭐",
    category: "dedication",
    condition: "Atteindre niveau 5",
  },
  {
    id: "level-10",
    name: "Niveau 10",
    description: "Atteindre le niveau 10",
    icon: "🌟",
    category: "dedication",
    condition: "Atteindre niveau 10",
  },
];

// XP to credits conversion rate
export const XP_PER_CREDIT = 200;

// Helper functions
export function getThemeById(id: string): Theme | undefined {
  return THEMES.find((t) => t.id === id);
}

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export function canAffordTheme(userXp: number, themeId: string): boolean {
  const theme = getThemeById(themeId);
  if (!theme) return false;
  return userXp >= theme.price;
}

export function calculateCreditsFromXp(xp: number): number {
  return Math.floor(xp / XP_PER_CREDIT);
}
