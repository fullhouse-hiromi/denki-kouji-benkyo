export type Grade = 1 | 2;

export type ExamMode = "denki" | "sharoshi";

// --- 電気工事士カテゴリ ---
export type DenkiCategory = "theory" | "wiring" | "construction" | "regulation" | "identification";

// --- 社労士カテゴリ ---
export type SharoshiCategory =
  | "labor-law"
  | "safety"
  | "workers-comp"
  | "employment-ins"
  | "health-ins"
  | "pension"
  | "general-labor"
  | "general-social";

export type Category = DenkiCategory | SharoshiCategory;

export const DENKI_CATEGORIES: { id: DenkiCategory; name: string }[] = [
  { id: "theory", name: "電気理論" },
  { id: "wiring", name: "配線設計・図記号" },
  { id: "construction", name: "施工方法・工具" },
  { id: "regulation", name: "法規" },
  { id: "identification", name: "鑑別" },
];

export const SHAROSHI_CATEGORIES: { id: SharoshiCategory; name: string }[] = [
  { id: "labor-law", name: "労働基準法" },
  { id: "safety", name: "労働安全衛生法" },
  { id: "workers-comp", name: "労災保険法" },
  { id: "employment-ins", name: "雇用保険法" },
  { id: "health-ins", name: "健康保険法" },
  { id: "pension", name: "年金法" },
  { id: "general-labor", name: "労務管理その他の労働に関する一般常識" },
  { id: "general-social", name: "社会保険に関する一般常識" },
];

/** 旧互換: 電気工事士カテゴリをデフォルトとして返す */
export const CATEGORIES = DENKI_CATEGORIES as { id: Category; name: string }[];

export function getCategoriesForMode(mode: ExamMode): { id: Category; name: string }[] {
  return mode === "sharoshi"
    ? (SHAROSHI_CATEGORIES as { id: Category; name: string }[])
    : (DENKI_CATEGORIES as { id: Category; name: string }[]);
}

export function getCategoryName(id: Category, mode?: ExamMode): string {
  const cats = mode ? getCategoriesForMode(mode) : [...DENKI_CATEGORIES, ...SHAROSHI_CATEGORIES];
  return (cats as { id: Category; name: string }[]).find((c) => c.id === id)?.name ?? id;
}

export type QuestionType = "choice" | "truefalse";

export type Question = {
  id: string;
  type: QuestionType;
  grade: Grade;
  category: Category;
  question: string;
  choices?: string[];
  answer: number | boolean;
  explanation: string;
  imageUrl?: string;
  source: "hardcoded" | "api";
};

export type CategoryProgress = {
  total: number;
  correct: number;
};

export type ExamRecord = {
  date: string;
  grade: Grade;
  score: number;
  total: number;
  byCategory: Record<string, CategoryProgress>;
};

export type Progress = {
  byCategory: Record<string, CategoryProgress>;
  examHistory: ExamRecord[];
  totalQuestions: number;
};

export type Mission = {
  id: string;
  description: string;
  target: number;
  current: number;
  completed: boolean;
};

export type DailyProgress = {
  date: string;
  missions: Mission[];
  questionsToday: number;
  correctToday: number;
};

export type Badge = {
  id: string;
  name: string;
  icon: string;
  unlockedAt: string;
};

export type CollectionCard = {
  id: string;
  name: string;
  rarity: 1 | 2 | 3 | 4 | 5;
  description: string;
  obtainedAt: string;
};

export type CustomTitle = {
  prefix: string;
  main: string;
  suffix: string;
};

export type SkillNodeStatus = "locked" | "unlocked" | "mastered";

export type SkillNode = {
  status: SkillNodeStatus;
  correctRate: number;
  totalAnswered: number;
};

export type WeeklyRecord = {
  weekStart: string;
  totalQuestions: number;
  correctAnswers: number;
  expEarned: number;
  maxStreak: number;
};

export type StageRecord = {
  stageId: number;
  score: number;
  total: number;
  clearedAt: string;
};

export type StoryData = {
  playerName: string;
  currentStage: number;
  clearedStages: StageRecord[];
};

export type GameData = {
  exp: number;
  level: number;
  customTitle: CustomTitle;
  currentStreak: number;
  maxStreak: number;
  dailyProgress: DailyProgress;
  loginStreak: number;
  lastLoginDate: string;
  badges: Badge[];
  unlockedTitleParts: {
    prefixes: string[];
    mains: string[];
    suffixes: string[];
  };
  skillTree: Record<string, Record<string, SkillNode>>;
  gachaPoints: number;
  collection: CollectionCard[];
  survivalHighScore: number;
  weeklyHistory: WeeklyRecord[];
  story: StoryData;
};
