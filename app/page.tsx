"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadGameData, loadExamMode, saveExamMode } from "@/lib/storage";
import { getLevelFromExp, formatTitle } from "@/lib/game-logic";
import { GameData, ExamMode } from "@/lib/types";

const DENKI_MODES = [
  {
    href: "/practice",
    icon: "📝",
    title: "練習モード",
    desc: "分野を選んでじっくり学習",
    color: "from-blue-600 to-blue-800",
  },
  {
    href: "/exam",
    icon: "📋",
    title: "模擬試験",
    desc: "本番と同じ50問に挑戦",
    color: "from-green-600 to-green-800",
  },
  {
    href: "/weakness",
    icon: "🎯",
    title: "弱点克服",
    desc: "苦手分野を集中的に学習",
    color: "from-yellow-600 to-yellow-800",
  },
  {
    href: "/survival",
    icon: "💀",
    title: "サバイバル",
    desc: "ライフ制で限界に挑戦",
    color: "from-red-600 to-red-800",
  },
  {
    href: "/story",
    icon: "📖",
    title: "ストーリー",
    desc: "新人工事士として現場を体験",
    color: "from-purple-600 to-purple-800",
  },
  {
    href: "/reference",
    icon: "📚",
    title: "公式・解説",
    desc: "重要公式と法規のまとめ",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    href: "/skill-tree",
    icon: "🌳",
    title: "スキルツリー",
    desc: "成長マップを確認",
    color: "from-teal-600 to-teal-800",
  },
  {
    href: "/collection",
    icon: "🎰",
    title: "ガチャ・図鑑",
    desc: "工具カードを集めよう",
    color: "from-pink-600 to-pink-800",
  },
];

const SHAROSHI_MODES = [
  {
    href: "/practice",
    icon: "📝",
    title: "練習モード",
    desc: "科目を選んでじっくり学習",
    color: "from-blue-600 to-blue-800",
  },
  {
    href: "/exam",
    icon: "📋",
    title: "模擬試験",
    desc: "本番形式で実力チェック",
    color: "from-green-600 to-green-800",
  },
  {
    href: "/weakness",
    icon: "🎯",
    title: "弱点克服",
    desc: "苦手科目を集中的に学習",
    color: "from-yellow-600 to-yellow-800",
  },
  {
    href: "/survival",
    icon: "💀",
    title: "サバイバル",
    desc: "ライフ制で限界に挑戦",
    color: "from-red-600 to-red-800",
  },
  {
    href: "/progress",
    icon: "📊",
    title: "進捗ダッシュボード",
    desc: "学習の進み具合を確認",
    color: "from-purple-600 to-purple-800",
  },
  {
    href: "/skill-tree",
    icon: "🌳",
    title: "スキルツリー",
    desc: "成長マップを確認",
    color: "from-teal-600 to-teal-800",
  },
];

export default function TopPage() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [examMode, setExamMode] = useState<ExamMode>("denki");

  useEffect(() => {
    setGameData(loadGameData());
    setExamMode(loadExamMode());
  }, []);

  const levelInfo = gameData ? getLevelFromExp(gameData.exp) : null;

  function handleModeChange(mode: ExamMode) {
    setExamMode(mode);
    saveExamMode(mode);
  }

  const modes = examMode === "sharoshi" ? SHAROSHI_MODES : DENKI_MODES;
  const isDenki = examMode === "denki";

  return (
    <div className="animate-fade-in">
      {/* 試験モード切替 */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleModeChange("denki")}
            className={`relative rounded-xl p-4 text-center font-bold transition-all border-2 ${
              isDenki
                ? "border-yellow-400 bg-yellow-900/30 text-yellow-300 shadow-lg shadow-yellow-900/20"
                : "border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500 hover:bg-gray-750"
            }`}
          >
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-sm">電気工事士</div>
            {isDenki && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full" />
            )}
          </button>
          <button
            onClick={() => handleModeChange("sharoshi")}
            className={`relative rounded-xl p-4 text-center font-bold transition-all border-2 ${
              !isDenki
                ? "border-emerald-400 bg-emerald-900/30 text-emerald-300 shadow-lg shadow-emerald-900/20"
                : "border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500 hover:bg-gray-750"
            }`}
          >
            <div className="text-2xl mb-1">📋</div>
            <div className="text-sm">社労士</div>
            {!isDenki && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {gameData && levelInfo && (
        <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-yellow-400 font-bold">
                Lv.{levelInfo.level}
              </span>
              <span className="text-gray-400 ml-2">{levelInfo.title}</span>
            </div>
            <div className="text-sm text-gray-400">
              {formatTitle(gameData.customTitle)}
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${levelInfo.progress * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>EXP: {gameData.exp}</span>
            <span>
              次のレベルまで: {levelInfo.nextLevelExp - gameData.exp} EXP
            </span>
          </div>
          {gameData.currentStreak > 0 && (
            <div className="mt-2 text-orange-400 text-sm">
              🔥 {gameData.currentStreak} 連続正解中
            </div>
          )}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">
        {isDenki ? "⚡ モードを選択 ⚡" : "📋 モードを選択 📋"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modes.map((mode) => (
          <Link
            key={mode.href}
            href={mode.href}
            className={`bg-gradient-to-br ${mode.color} rounded-xl p-5 shadow-lg hover:scale-[1.02] transition-transform border border-white/10`}
          >
            <div className="text-3xl mb-2">{mode.icon}</div>
            <h2 className="text-lg font-bold text-white">{mode.title}</h2>
            <p className="text-sm text-white/70">{mode.desc}</p>
          </Link>
        ))}
      </div>

      {isDenki && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Link
            href="/progress"
            className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-750 transition-colors border border-gray-700"
          >
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-semibold">進捗ダッシュボード</div>
          </Link>
          <Link
            href="/profile"
            className="bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-750 transition-colors border border-gray-700"
          >
            <div className="text-2xl mb-1">👤</div>
            <div className="text-sm font-semibold">プロフィール</div>
          </Link>
        </div>
      )}

      {!isDenki && (
        <div className="mt-6">
          <Link
            href="/profile"
            className="block bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-750 transition-colors border border-gray-700"
          >
            <div className="text-2xl mb-1">👤</div>
            <div className="text-sm font-semibold">プロフィール</div>
          </Link>
        </div>
      )}
    </div>
  );
}
