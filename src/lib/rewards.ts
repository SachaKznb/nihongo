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
    description: "Le theme par defaut, clair et epure",
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
    description: "Un theme sombre elegant pour etudier la nuit",
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
    description: "Inspire des fleurs de cerisier japonaises",
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
    name: "Ocean",
    description: "Les profondeurs bleues de l'ocean pacifique",
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
    name: "Or Imperial",
    description: "L'elegance doree de l'ere Edo",
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
    description: "Completer ta premiere lecon",
    icon: "🎓",
    category: "milestone",
    condition: "Completer 1 lecon",
  },
  {
    id: "hundred-reviews",
    name: "Centurion",
    description: "Completer 100 revisions",
    icon: "💯",
    category: "milestone",
    condition: "Completer 100 revisions",
  },
  {
    id: "thousand-reviews",
    name: "Marathonien",
    description: "Completer 1000 revisions",
    icon: "🏃",
    category: "milestone",
    condition: "Completer 1000 revisions",
  },

  // Streak badges
  {
    id: "streak-7",
    name: "Semaine Parfaite",
    description: "Maintenir une serie de 7 jours",
    icon: "📅",
    category: "streak",
    condition: "Serie de 7 jours",
  },
  {
    id: "streak-30",
    name: "Mois Dedié",
    description: "Maintenir une serie de 30 jours",
    icon: "🗓️",
    category: "streak",
    condition: "Serie de 30 jours",
  },
  {
    id: "streak-100",
    name: "Centenaire",
    description: "Maintenir une serie de 100 jours",
    icon: "🔥",
    category: "streak",
    condition: "Serie de 100 jours",
  },

  // Mastery badges (SRS stage achievements)
  {
    id: "first-guru",
    name: "Premier Guru",
    description: "Atteindre Guru avec un element",
    icon: "🧘",
    category: "mastery",
    condition: "1 element au stage Guru",
  },
  {
    id: "first-master",
    name: "Premier Maitre",
    description: "Atteindre Maitre avec un element",
    icon: "👨‍🏫",
    category: "mastery",
    condition: "1 element au stage Maitre",
  },
  {
    id: "first-satori",
    name: "Illumination",
    description: "Atteindre Satori avec un element",
    icon: "✨",
    category: "mastery",
    condition: "1 element au stage Satori",
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
