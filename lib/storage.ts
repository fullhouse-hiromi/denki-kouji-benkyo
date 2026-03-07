import { Progress, GameData } from "./types";
import { DEFAULT_GAME_DATA } from "./game-logic";

const PROGRESS_KEY = "denki-progress";
const GAME_DATA_KEY = "denki-game-data";
const SETTINGS_KEY = "denki-settings";

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

const DEFAULT_PROGRESS: Progress = {
  byCategory: {},
  examHistory: [],
  totalQuestions: 0,
};

export function loadProgress(): Progress {
  return getItem(PROGRESS_KEY, DEFAULT_PROGRESS);
}

export function saveProgress(progress: Progress): void {
  setItem(PROGRESS_KEY, progress);
}

export function loadGameData(): GameData {
  return getItem(GAME_DATA_KEY, DEFAULT_GAME_DATA);
}

export function saveGameData(data: GameData): void {
  setItem(GAME_DATA_KEY, data);
}

export type Settings = {
  defaultGrade: 1 | 2;
};

const DEFAULT_SETTINGS: Settings = { defaultGrade: 2 };

export function loadSettings(): Settings {
  return getItem(SETTINGS_KEY, DEFAULT_SETTINGS);
}

export function saveSettings(settings: Settings): void {
  setItem(SETTINGS_KEY, settings);
}

export function recordAnswer(
  progress: Progress,
  category: string,
  correct: boolean
): Progress {
  const prev = progress.byCategory[category] ?? { total: 0, correct: 0 };
  return {
    ...progress,
    byCategory: {
      ...progress.byCategory,
      [category]: {
        total: prev.total + 1,
        correct: prev.correct + (correct ? 1 : 0),
      },
    },
    totalQuestions: progress.totalQuestions + 1,
  };
}
