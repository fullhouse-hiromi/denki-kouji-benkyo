import { Mission, Category, CATEGORIES } from "./types";

type MissionTemplate = {
  id: string;
  description: string;
  target: number;
};

const CATEGORY_MISSION_TEMPLATES: MissionTemplate[] = CATEGORIES.map(
  (cat) => ({
    id: `master-${cat.id}`,
    description: `${cat.name}マスター`,
    target: 5,
  })
);

const MISSION_TEMPLATES: MissionTemplate[] = [
  { id: "daily-5", description: "今日の5問", target: 5 },
  { id: "daily-20", description: "今日の20問", target: 20 },
  { id: "perfect-5", description: "パーフェクト5", target: 5 },
  ...CATEGORY_MISSION_TEMPLATES,
  { id: "mock-exam", description: "模擬試験に挑戦", target: 1 },
  { id: "weakness", description: "弱点克服", target: 10 },
  { id: "all-categories", description: "全分野チャレンジ", target: 5 },
];

function hashDateString(dateString: string): number {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export function generateDailyMissions(dateString: string): Mission[] {
  const seed = hashDateString(dateString);
  const count = 3;
  const missions: Mission[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < count; i++) {
    // Use different multipliers for each pick to avoid collisions
    let idx =
      ((seed * (i + 1) * 2654435761) >>> 0) % MISSION_TEMPLATES.length;

    // Linear probe if index already used
    while (usedIndices.has(idx)) {
      idx = (idx + 1) % MISSION_TEMPLATES.length;
    }
    usedIndices.add(idx);

    const template = MISSION_TEMPLATES[idx];
    missions.push({
      id: template.id,
      description: template.description,
      target: template.target,
      current: 0,
      completed: false,
    });
  }

  return missions;
}
