import type {
  Badge,
  CustomTitle,
  GameData,
  Progress,
} from "./types";

// ---------------------------------------------------------------------------
// 1. LEVEL_TABLE
// ---------------------------------------------------------------------------

export type LevelEntry = {
  level: number;
  requiredExp: number;
  title: string;
};

export const LEVEL_TABLE: LevelEntry[] = [
  { level: 1, requiredExp: 0, title: "見習い工事士" },
  { level: 2, requiredExp: 100, title: "電気入門者" },
  { level: 3, requiredExp: 300, title: "回路の読み手" },
  { level: 4, requiredExp: 600, title: "配線の学徒" },
  { level: 5, requiredExp: 1000, title: "半人前工事士" },
  { level: 6, requiredExp: 1500, title: "テスターの使い手" },
  { level: 7, requiredExp: 2200, title: "現場の見習い" },
  { level: 8, requiredExp: 3000, title: "法規の理解者" },
  { level: 9, requiredExp: 4000, title: "一端の工事士" },
  { level: 10, requiredExp: 5500, title: "配線のプロ" },
  { level: 11, requiredExp: 7000, title: "回路マスター" },
  { level: 12, requiredExp: 9000, title: "現場の熟練工" },
  { level: 13, requiredExp: 11500, title: "電気の求道者" },
  { level: 14, requiredExp: 14500, title: "合格請負人" },
  { level: 15, requiredExp: 18000, title: "伝説の電気工事士" },
];

// ---------------------------------------------------------------------------
// 2. getLevelFromExp
// ---------------------------------------------------------------------------

export type LevelInfo = {
  level: number;
  title: string;
  currentLevelExp: number;
  nextLevelExp: number;
  progress: number;
};

export function getLevelFromExp(exp: number): LevelInfo {
  let matched = LEVEL_TABLE[0];

  for (const entry of LEVEL_TABLE) {
    if (exp >= entry.requiredExp) {
      matched = entry;
    } else {
      break;
    }
  }

  const currentLevelExp = matched.requiredExp;
  const nextEntry = LEVEL_TABLE.find((e) => e.level === matched.level + 1);
  const nextLevelExp = nextEntry ? nextEntry.requiredExp : currentLevelExp;

  const range = nextLevelExp - currentLevelExp;
  const progress = range > 0 ? (exp - currentLevelExp) / range : 1;

  return {
    level: matched.level,
    title: matched.title,
    currentLevelExp,
    nextLevelExp,
    progress: Math.min(progress, 1),
  };
}

// ---------------------------------------------------------------------------
// 3. calculateExpGain
// ---------------------------------------------------------------------------

export type ExpGainContext = {
  /** Whether the answer was correct */
  correct?: boolean;
  /** Whether this was a weakness-mode question */
  isWeakness?: boolean;
  /** The player's current streak AFTER this answer */
  currentStreak?: number;
  /** Whether an exam was just completed */
  examCompleted?: boolean;
  /** Exam score percentage (0-100) */
  examScorePercent?: number;
  /** Whether the exam was perfect (100%) */
  examPerfect?: boolean;
  /** Whether the daily challenge was completed */
  dailyChallengeComplete?: boolean;
};

export function calculateExpGain(context: ExpGainContext): number {
  let exp = 0;

  // --- Answer-based EXP ---
  if (context.correct !== undefined) {
    if (context.correct) {
      exp += context.isWeakness ? 15 : 10;
    } else {
      exp += 2;
    }
  }

  // --- Streak bonuses ---
  if (context.currentStreak !== undefined) {
    if (context.currentStreak === 5) exp += 20;
    if (context.currentStreak === 10) exp += 50;
    if (context.currentStreak === 20) exp += 100;
  }

  // --- Exam bonuses ---
  if (context.examCompleted) {
    exp += 50;

    if (context.examScorePercent !== undefined) {
      if (context.examPerfect) {
        exp += 500;
      } else if (context.examScorePercent >= 80) {
        exp += 200;
      } else if (context.examScorePercent >= 60) {
        exp += 100;
      }
    }
  }

  // --- Daily challenge ---
  if (context.dailyChallengeComplete) {
    exp += 30;
  }

  return exp;
}

// ---------------------------------------------------------------------------
// 4. BADGE_DEFINITIONS
// ---------------------------------------------------------------------------

export type BadgeDefinition = {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: "learning" | "accuracy" | "streak" | "daily" | "exam" | "hidden";
  check: (gameData: GameData, progress: Progress) => boolean;
};

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // --- Learning badges ---
  {
    id: "first_answer",
    name: "はじめの一歩",
    icon: "👣",
    description: "初めて問題に回答した",
    category: "learning",
    check: (_g, p) => p.totalQuestions >= 1,
  },
  {
    id: "questions_10",
    name: "練習の始まり",
    icon: "📖",
    description: "10問に回答した",
    category: "learning",
    check: (_g, p) => p.totalQuestions >= 10,
  },
  {
    id: "questions_50",
    name: "勉強熱心",
    icon: "📚",
    description: "50問に回答した",
    category: "learning",
    check: (_g, p) => p.totalQuestions >= 50,
  },
  {
    id: "questions_100",
    name: "百問の修行",
    icon: "💯",
    description: "100問に回答した",
    category: "learning",
    check: (_g, p) => p.totalQuestions >= 100,
  },
  {
    id: "questions_500",
    name: "問題マスター",
    icon: "🏅",
    description: "500問に回答した",
    category: "learning",
    check: (_g, p) => p.totalQuestions >= 500,
  },
  {
    id: "questions_1000",
    name: "千問の達人",
    icon: "👑",
    description: "1000問に回答した",
    category: "learning",
    check: (_g, p) => p.totalQuestions >= 1000,
  },
  {
    id: "all_categories",
    name: "全分野制覇",
    icon: "🌐",
    description: "全カテゴリで1問以上正解した",
    category: "learning",
    check: (_g, p) => {
      const cats = ["theory", "wiring", "construction", "regulation", "identification"];
      return cats.every((c) => {
        const cp = p.byCategory[c];
        return cp && cp.correct >= 1;
      });
    },
  },

  // --- Accuracy badges ---
  {
    id: "accuracy_80",
    name: "安定の実力",
    icon: "🎯",
    description: "通算正答率80%以上（50問以上）",
    category: "accuracy",
    check: (_g, p) => {
      if (p.totalQuestions < 50) return false;
      const total = Object.values(p.byCategory).reduce((s, c) => s + c.total, 0);
      const correct = Object.values(p.byCategory).reduce((s, c) => s + c.correct, 0);
      return total > 0 && correct / total >= 0.8;
    },
  },
  {
    id: "accuracy_90",
    name: "精密な頭脳",
    icon: "🧠",
    description: "通算正答率90%以上（100問以上）",
    category: "accuracy",
    check: (_g, p) => {
      if (p.totalQuestions < 100) return false;
      const total = Object.values(p.byCategory).reduce((s, c) => s + c.total, 0);
      const correct = Object.values(p.byCategory).reduce((s, c) => s + c.correct, 0);
      return total > 0 && correct / total >= 0.9;
    },
  },
  {
    id: "category_master",
    name: "分野の達人",
    icon: "⭐",
    description: "いずれかのカテゴリで正答率90%以上（20問以上）",
    category: "accuracy",
    check: (_g, p) => {
      return Object.values(p.byCategory).some(
        (c) => c.total >= 20 && c.correct / c.total >= 0.9,
      );
    },
  },

  // --- Streak badges ---
  {
    id: "streak_5",
    name: "5問連続正解",
    icon: "🔥",
    description: "5問連続で正解した",
    category: "streak",
    check: (g) => g.maxStreak >= 5,
  },
  {
    id: "streak_10",
    name: "10問連続正解",
    icon: "🔥🔥",
    description: "10問連続で正解した",
    category: "streak",
    check: (g) => g.maxStreak >= 10,
  },
  {
    id: "streak_20",
    name: "20問連続正解",
    icon: "💥",
    description: "20問連続で正解した",
    category: "streak",
    check: (g) => g.maxStreak >= 20,
  },
  {
    id: "streak_50",
    name: "連続正解の鬼",
    icon: "👹",
    description: "50問連続で正解した",
    category: "streak",
    check: (g) => g.maxStreak >= 50,
  },

  // --- Daily badges ---
  {
    id: "daily_first",
    name: "デイリー初クリア",
    icon: "📅",
    description: "初めてデイリーチャレンジを達成した",
    category: "daily",
    check: (g) => g.dailyProgress.missions.some((m) => m.completed),
  },
  {
    id: "login_3",
    name: "3日連続ログイン",
    icon: "📆",
    description: "3日連続でログインした",
    category: "daily",
    check: (g) => g.loginStreak >= 3,
  },
  {
    id: "login_7",
    name: "一週間の継続",
    icon: "🗓️",
    description: "7日連続でログインした",
    category: "daily",
    check: (g) => g.loginStreak >= 7,
  },
  {
    id: "login_30",
    name: "一ヶ月の努力",
    icon: "🏆",
    description: "30日連続でログインした",
    category: "daily",
    check: (g) => g.loginStreak >= 30,
  },

  // --- Exam badges ---
  {
    id: "exam_first",
    name: "初めての模試",
    icon: "📝",
    description: "模擬試験を初めて受験した",
    category: "exam",
    check: (_g, p) => p.examHistory.length >= 1,
  },
  {
    id: "exam_pass",
    name: "合格ライン突破",
    icon: "✅",
    description: "模擬試験で60%以上を取得した",
    category: "exam",
    check: (_g, p) =>
      p.examHistory.some((e) => e.total > 0 && e.score / e.total >= 0.6),
  },
  {
    id: "exam_high",
    name: "優秀な成績",
    icon: "🌟",
    description: "模擬試験で80%以上を取得した",
    category: "exam",
    check: (_g, p) =>
      p.examHistory.some((e) => e.total > 0 && e.score / e.total >= 0.8),
  },
  {
    id: "exam_perfect",
    name: "満点合格",
    icon: "💎",
    description: "模擬試験で満点を取得した",
    category: "exam",
    check: (_g, p) =>
      p.examHistory.some((e) => e.total > 0 && e.score === e.total),
  },
  {
    id: "exam_10",
    name: "模試の常連",
    icon: "🔄",
    description: "模擬試験を10回受験した",
    category: "exam",
    check: (_g, p) => p.examHistory.length >= 10,
  },

  // --- Hidden badges ---
  {
    id: "night_owl",
    name: "夜のオーム",
    icon: "🦉",
    description: "深夜2時〜4時に勉強した",
    category: "hidden",
    check: () => {
      const hour = new Date().getHours();
      return hour >= 2 && hour < 4;
    },
  },
  {
    id: "early_bird",
    name: "朝の電流",
    icon: "🐦",
    description: "早朝5時〜6時に勉強した",
    category: "hidden",
    check: () => {
      const hour = new Date().getHours();
      return hour >= 5 && hour < 6;
    },
  },
  {
    id: "level_max",
    name: "伝説の到達者",
    icon: "⚡",
    description: "最大レベルに到達した",
    category: "hidden",
    check: (g) => g.level >= 15,
  },
  {
    id: "survival_30",
    name: "サバイバルの覇者",
    icon: "🛡️",
    description: "サバイバルモードで30問突破した",
    category: "hidden",
    check: (g) => g.survivalHighScore >= 30,
  },
];

// ---------------------------------------------------------------------------
// 5. checkBadges
// ---------------------------------------------------------------------------

export function checkBadges(gameData: GameData, progress: Progress): Badge[] {
  const alreadyUnlocked = new Set(gameData.badges.map((b) => b.id));
  const newBadges: Badge[] = [];

  for (const def of BADGE_DEFINITIONS) {
    if (alreadyUnlocked.has(def.id)) continue;

    try {
      if (def.check(gameData, progress)) {
        newBadges.push({
          id: def.id,
          name: def.name,
          icon: def.icon,
          unlockedAt: new Date().toISOString(),
        });
      }
    } catch {
      // If a check throws (e.g. missing data), skip it silently
    }
  }

  return newBadges;
}

// ---------------------------------------------------------------------------
// 6. formatTitle
// ---------------------------------------------------------------------------

export function formatTitle(customTitle: CustomTitle): string {
  const { prefix, main, suffix } = customTitle;

  if (!prefix && !main && !suffix) return "";

  let result = "";

  if (prefix) {
    result += prefix + "の";
  }

  result += main || "";

  if (suffix) {
    result += "（" + suffix + "）";
  }

  return result;
}

// ---------------------------------------------------------------------------
// 7. DEFAULT_GAME_DATA
// ---------------------------------------------------------------------------

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

export const DEFAULT_GAME_DATA: GameData = {
  exp: 0,
  level: 1,
  customTitle: {
    prefix: "",
    main: "見習い工事士",
    suffix: "",
  },
  currentStreak: 0,
  maxStreak: 0,
  dailyProgress: {
    date: todayString(),
    missions: [],
    questionsToday: 0,
    correctToday: 0,
  },
  loginStreak: 1,
  lastLoginDate: todayString(),
  badges: [],
  unlockedTitleParts: {
    prefixes: [],
    mains: ["見習い工事士"],
    suffixes: [],
  },
  skillTree: {},
  gachaPoints: 0,
  collection: [],
  survivalHighScore: 0,
  weeklyHistory: [],
  story: {
    playerName: "",
    currentStage: 1,
    clearedStages: [],
  },
};
