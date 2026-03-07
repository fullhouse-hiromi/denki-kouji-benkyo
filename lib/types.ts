export type Grade = 1 | 2;

export type Category = "theory" | "wiring" | "construction" | "regulation" | "identification";

export const CATEGORIES: { id: Category; name: string }[] = [
  { id: "theory", name: "電気理論" },
  { id: "wiring", name: "配線設計・図記号" },
  { id: "construction", name: "施工方法・工具" },
  { id: "regulation", name: "法規" },
  { id: "identification", name: "鑑別" },
];

export function getCategoryName(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
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
