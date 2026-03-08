import { DenkiCategory, SkillNodeStatus } from "./types";

export type SkillTreeNodeDef = {
  id: string;
  name: string;
  category: DenkiCategory;
  description: string;
  parentId?: string;
};

type CategoryNodes = SkillTreeNodeDef[];

export const SKILL_TREE_NODES: Record<DenkiCategory, CategoryNodes> = {
  theory: [
    {
      id: "ohms-law",
      name: "オームの法則（入門）",
      category: "theory",
      description: "電圧・電流・抵抗の基本関係を学ぶ",
    },
    {
      id: "kirchhoff",
      name: "キルヒホッフの法則",
      category: "theory",
      description: "回路網における電流則・電圧則を理解する",
      parentId: "ohms-law",
    },
    {
      id: "ac-theory",
      name: "交流理論",
      category: "theory",
      description: "交流回路の基礎とインピーダンスを学ぶ",
      parentId: "kirchhoff",
    },
    {
      id: "power-calc",
      name: "電力・力率計算",
      category: "theory",
      description: "電力量・力率・効率の計算をマスターする",
      parentId: "ac-theory",
    },
    {
      id: "theory-master",
      name: "★ 電気理論マスター",
      category: "theory",
      description: "電気理論の全分野を制覇した証",
      parentId: "power-calc",
    },
  ],
  wiring: [
    {
      id: "single-line",
      name: "単線図の読み方（入門）",
      category: "wiring",
      description: "単線図の基本的な読み方を学ぶ",
    },
    {
      id: "multi-line",
      name: "複線図への変換",
      category: "wiring",
      description: "単線図から複線図への変換手順を理解する",
      parentId: "single-line",
    },
    {
      id: "jis-symbols",
      name: "図記号（JIS）",
      category: "wiring",
      description: "JIS規格の図記号を覚える",
      parentId: "multi-line",
    },
    {
      id: "main-branch",
      name: "幹線・分岐回路設計",
      category: "wiring",
      description: "幹線と分岐回路の設計方法を学ぶ",
      parentId: "jis-symbols",
    },
    {
      id: "wiring-master",
      name: "★ 配線設計マスター",
      category: "wiring",
      description: "配線設計の全分野を制覇した証",
      parentId: "main-branch",
    },
  ],
  construction: [
    {
      id: "basic-tools",
      name: "基本工具（入門）",
      category: "construction",
      description: "電気工事に使う基本的な工具を学ぶ",
    },
    {
      id: "cable-work",
      name: "ケーブル工事",
      category: "construction",
      description: "ケーブルの種類と施工方法を理解する",
      parentId: "basic-tools",
    },
    {
      id: "conduit-work",
      name: "金属管・合成樹脂管工事",
      category: "construction",
      description: "各種電線管工事の施工方法を学ぶ",
      parentId: "cable-work",
    },
    {
      id: "grounding",
      name: "接地工事",
      category: "construction",
      description: "接地工事の種類と施工基準を理解する",
      parentId: "conduit-work",
    },
    {
      id: "construction-master",
      name: "★ 施工マスター",
      category: "construction",
      description: "施工方法の全分野を制覇した証",
      parentId: "grounding",
    },
  ],
  regulation: [
    {
      id: "elec-business-law",
      name: "電気事業法の基礎（入門）",
      category: "regulation",
      description: "電気事業法の目的と概要を学ぶ",
    },
    {
      id: "electrician-law",
      name: "電気工事士法",
      category: "regulation",
      description: "電気工事士の資格と義務を理解する",
      parentId: "elec-business-law",
    },
    {
      id: "tech-standards",
      name: "電気設備技術基準",
      category: "regulation",
      description: "電気設備の技術基準を学ぶ",
      parentId: "electrician-law",
    },
    {
      id: "wiring-regs",
      name: "内線規程",
      category: "regulation",
      description: "内線規程の主要な規定を理解する",
      parentId: "tech-standards",
    },
    {
      id: "regulation-master",
      name: "★ 法規マスター",
      category: "regulation",
      description: "法規の全分野を制覇した証",
      parentId: "wiring-regs",
    },
  ],
  identification: [
    {
      id: "basic-equipment",
      name: "基本器具の識別（入門）",
      category: "identification",
      description: "基本的な電気器具を見分ける力を養う",
    },
    {
      id: "wiring-devices",
      name: "配線器具",
      category: "identification",
      description: "スイッチ・コンセントなどの配線器具を識別する",
      parentId: "basic-equipment",
    },
    {
      id: "tool-id",
      name: "工具の識別",
      category: "identification",
      description: "電気工事に使う工具を識別する",
      parentId: "wiring-devices",
    },
    {
      id: "measuring",
      name: "測定器",
      category: "identification",
      description: "各種測定器の用途と使い方を理解する",
      parentId: "tool-id",
    },
    {
      id: "identification-master",
      name: "★ 鑑別マスター",
      category: "identification",
      description: "鑑別の全分野を制覇した証",
      parentId: "measuring",
    },
  ],
};

/**
 * Determine a skill tree node's status based on the user's performance.
 *
 * - "mastered": correctRate >= 80% and totalAnswered >= 10
 * - "unlocked": the node has no parent, or the parent is mastered
 * - "locked": otherwise
 */
export function getNodeStatus(
  nodeId: string,
  category: DenkiCategory,
  skillTreeState: Record<string, Record<string, { correctRate: number; totalAnswered: number }>>
): SkillNodeStatus {
  const nodes = SKILL_TREE_NODES[category];
  const nodeDef = nodes.find((n) => n.id === nodeId);
  if (!nodeDef) return "locked";

  const nodeState = skillTreeState[category]?.[nodeId];

  // Check if this node is already mastered
  if (
    nodeState &&
    nodeState.totalAnswered >= 10 &&
    nodeState.correctRate >= 80
  ) {
    return "mastered";
  }

  // Master nodes require all other nodes in the category to be mastered
  const isMasterNode = nodeDef.id.endsWith("-master");
  if (isMasterNode) {
    const nonMasterNodes = nodes.filter((n) => !n.id.endsWith("-master"));
    const allMastered = nonMasterNodes.every((n) => {
      const s = skillTreeState[category]?.[n.id];
      return s && s.totalAnswered >= 10 && s.correctRate >= 80;
    });
    return allMastered ? "unlocked" : "locked";
  }

  // Entry nodes (no parent) are always unlocked
  if (!nodeDef.parentId) {
    return "unlocked";
  }

  // Check if parent is mastered
  const parentState = skillTreeState[category]?.[nodeDef.parentId];
  if (
    parentState &&
    parentState.totalAnswered >= 10 &&
    parentState.correctRate >= 80
  ) {
    return "unlocked";
  }

  return "locked";
}
