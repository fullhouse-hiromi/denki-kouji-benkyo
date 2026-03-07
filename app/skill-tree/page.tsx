"use client";

import { useEffect, useState } from "react";
import { loadGameData } from "@/lib/storage";
import { loadProgress } from "@/lib/storage";
import { SKILL_TREE_NODES } from "@/lib/skill-tree-data";
import { CATEGORIES } from "@/lib/types";
import { GameData, Progress } from "@/lib/types";

export default function SkillTreePage() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof SKILL_TREE_NODES>("theory");

  useEffect(() => {
    setGameData(loadGameData());
    setProgress(loadProgress());
  }, []);

  if (!gameData || !progress) return null;

  const nodes = SKILL_TREE_NODES[activeCategory] ?? [];

  function getNodeInfo(nodeId: string) {
    const skillData = gameData?.skillTree?.[activeCategory]?.[nodeId];
    return {
      status: skillData?.status ?? "locked",
      correctRate: skillData?.correctRate ?? 0,
      totalAnswered: skillData?.totalAnswered ?? 0,
    };
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "mastered": return "⭐";
      case "unlocked": return "🔓";
      default: return "🔒";
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "mastered": return "border-yellow-500 bg-yellow-900/20";
      case "unlocked": return "border-blue-500 bg-blue-900/20";
      default: return "border-gray-700 bg-gray-900/50 opacity-60";
    }
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">🌳 スキルツリー</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as keyof typeof SKILL_TREE_NODES)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-teal-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {nodes.map((node, i) => {
          const info = getNodeInfo(node.id);
          const isMaster = node.id.endsWith("-master");
          return (
            <div key={node.id} className="flex items-start gap-3">
              {/* Connector line */}
              <div className="flex flex-col items-center w-8 shrink-0">
                <div className="text-xl">{getStatusIcon(info.status)}</div>
                {i < nodes.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-700 mt-1" />
                )}
              </div>

              {/* Node card */}
              <div
                className={`flex-1 rounded-lg p-4 border-2 ${getStatusColor(info.status)} ${
                  isMaster ? "border-dashed" : ""
                }`}
              >
                <div className="font-bold mb-1">
                  {isMaster ? "★ " : ""}
                  {node.name}
                </div>
                {node.description && (
                  <div className="text-sm text-gray-400 mb-2">
                    {node.description}
                  </div>
                )}
                {info.totalAnswered > 0 && (
                  <div className="text-xs text-gray-500">
                    正答率: {Math.round(info.correctRate)}% ({info.totalAnswered}問)
                  </div>
                )}
                {info.status === "unlocked" && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(info.correctRate / 90 * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      マスターまで: 正答率90%以上
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall category progress */}
      <div className="mt-8 bg-gray-800 rounded-xl p-4 border border-gray-700">
        <h3 className="font-bold mb-2">カテゴリ進捗</h3>
        <div className="text-sm text-gray-400">
          {progress.byCategory[activeCategory]
            ? `${progress.byCategory[activeCategory].correct}/${progress.byCategory[activeCategory].total} 正解（${Math.round(
                (progress.byCategory[activeCategory].correct /
                  progress.byCategory[activeCategory].total) *
                  100
              )}%）`
            : "まだ回答データがありません"}
        </div>
      </div>
    </div>
  );
}
