"use client";

import { useEffect, useState } from "react";
import { loadGameData, saveGameData } from "@/lib/storage";
import { getLevelFromExp, formatTitle, LEVEL_TABLE } from "@/lib/game-logic";
import { GameData } from "@/lib/types";

const TITLE_PREFIXES = [
  { value: "", label: "（なし）" },
  { value: "伝説の", label: "伝説の" },
  { value: "深夜の", label: "深夜の" },
  { value: "不屈の", label: "不屈の" },
  { value: "疾風の", label: "疾風の" },
  { value: "鉄壁の", label: "鉄壁の" },
  { value: "孤高の", label: "孤高の" },
];

const TITLE_MAINS = [
  { value: "電気工事士", label: "電気工事士" },
  { value: "回路マスター", label: "回路マスター" },
  { value: "配線の達人", label: "配線の達人" },
  { value: "法規の番人", label: "法規の番人" },
  { value: "現場の職人", label: "現場の職人" },
  { value: "鑑別の鬼", label: "鑑別の鬼" },
];

const TITLE_SUFFIXES = [
  { value: "（見習い）", label: "（見習い）" },
  { value: "（二種持ち）", label: "（二種持ち）" },
  { value: "（一種持ち）", label: "（一種持ち）" },
  { value: "（フルコンプ）", label: "（フルコンプ）" },
  { value: "（皆勤賞）", label: "（皆勤賞）" },
  { value: "（サバイバー）", label: "（サバイバー）" },
];

export default function ProfilePage() {
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    setGameData(loadGameData());
  }, []);

  if (!gameData) return null;

  const levelInfo = getLevelFromExp(gameData.exp);

  function updateTitle(field: "prefix" | "main" | "suffix", value: string) {
    if (!gameData) return;
    const updated = {
      ...gameData,
      customTitle: { ...gameData.customTitle, [field]: value },
    };
    setGameData(updated);
    saveGameData(updated);
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">👤 プロフィール</h1>

      {/* Level Card */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
        <div className="text-center mb-4">
          <div className="text-5xl mb-2">⚡</div>
          <div className="text-yellow-400 text-2xl font-bold">
            Lv.{levelInfo.level}
          </div>
          <div className="text-lg text-gray-300">{levelInfo.title}</div>
          <div className="text-blue-400 mt-1">
            {formatTitle(gameData.customTitle)}
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="bg-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${levelInfo.progress * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>EXP: {gameData.exp}</span>
          <span>次: {levelInfo.nextLevelExp} EXP</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
          <div className="text-orange-400 font-bold text-xl">
            {gameData.maxStreak}
          </div>
          <div className="text-xs text-gray-400">最大連続正解</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
          <div className="text-green-400 font-bold text-xl">
            {gameData.loginStreak}
          </div>
          <div className="text-xs text-gray-400">連続ログイン</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
          <div className="text-purple-400 font-bold text-xl">
            {gameData.survivalHighScore}
          </div>
          <div className="text-xs text-gray-400">サバイバル最高</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
          <div className="text-pink-400 font-bold text-xl">
            {gameData.collection.length}
          </div>
          <div className="text-xs text-gray-400">コレクション</div>
        </div>
      </div>

      {/* Title Customizer */}
      <h2 className="text-lg font-bold mb-3">称号カスタマイズ</h2>
      <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
        <div className="text-center text-blue-400 font-bold text-lg mb-4">
          {formatTitle(gameData.customTitle)}
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400 block mb-1">前置き</label>
            <select
              value={gameData.customTitle.prefix}
              onChange={(e) => updateTitle("prefix", e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white"
            >
              {TITLE_PREFIXES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">メイン称号</label>
            <select
              value={gameData.customTitle.main}
              onChange={(e) => updateTitle("main", e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white"
            >
              {TITLE_MAINS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">サフィックス</label>
            <select
              value={gameData.customTitle.suffix}
              onChange={(e) => updateTitle("suffix", e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 text-white"
            >
              {TITLE_SUFFIXES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Badges */}
      <h2 className="text-lg font-bold mb-3">バッジ一覧</h2>
      {gameData.badges.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-400 border border-gray-700">
          まだバッジを獲得していません
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gameData.badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-gray-800 rounded-lg p-3 border border-yellow-700/50 text-center"
            >
              <div className="text-2xl mb-1">{badge.icon}</div>
              <div className="text-sm font-semibold">{badge.name}</div>
              <div className="text-xs text-gray-500">
                {new Date(badge.unlockedAt).toLocaleDateString("ja-JP")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
