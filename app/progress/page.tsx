"use client";

import { useEffect, useState } from "react";
import { loadProgress, loadGameData } from "@/lib/storage";
import { CATEGORIES, Progress, GameData } from "@/lib/types";
import { getLevelFromExp } from "@/lib/game-logic";

export default function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    setGameData(loadGameData());
  }, []);

  if (!progress || !gameData) return null;

  const levelInfo = getLevelFromExp(gameData.exp);
  const overallCorrect = Object.values(progress.byCategory).reduce(
    (s, c) => s + c.correct,
    0
  );
  const overallTotal = Object.values(progress.byCategory).reduce(
    (s, c) => s + c.total,
    0
  );
  const overallRate = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0;

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">📊 進捗ダッシュボード</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{overallRate}%</div>
          <div className="text-xs text-gray-400">総合正答率</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-green-400">
            {progress.totalQuestions}
          </div>
          <div className="text-xs text-gray-400">累計学習問題数</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">
            Lv.{levelInfo.level}
          </div>
          <div className="text-xs text-gray-400">{levelInfo.title}</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 text-center border border-gray-700">
          <div className="text-2xl font-bold text-orange-400">
            {gameData.maxStreak}
          </div>
          <div className="text-xs text-gray-400">最大連続正解</div>
        </div>
      </div>

      {/* Category Progress */}
      <h2 className="text-lg font-bold mb-3">分野別正答率</h2>
      <div className="space-y-3 mb-6">
        {CATEGORIES.map((cat) => {
          const data = progress.byCategory[cat.id];
          const rate = data && data.total > 0
            ? Math.round((data.correct / data.total) * 100)
            : 0;
          const total = data?.total ?? 0;
          return (
            <div key={cat.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{cat.name}</span>
                <span className="text-sm text-gray-400">
                  {total > 0 ? `${rate}% (${data?.correct}/${total})` : "未学習"}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    rate >= 80
                      ? "bg-green-500"
                      : rate >= 60
                        ? "bg-yellow-500"
                        : rate > 0
                          ? "bg-red-500"
                          : "bg-gray-600"
                  }`}
                  style={{ width: `${rate}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam History */}
      <h2 className="text-lg font-bold mb-3">模擬試験履歴</h2>
      {progress.examHistory.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-400 border border-gray-700">
          まだ模擬試験を受けていません
        </div>
      ) : (
        <div className="space-y-3">
          {progress.examHistory
            .slice()
            .reverse()
            .map((exam, i) => {
              const rate = Math.round((exam.score / exam.total) * 100);
              const passed = rate >= 60;
              return (
                <div
                  key={i}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      {new Date(exam.date).toLocaleDateString("ja-JP")} - 第
                      {exam.grade}種
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        passed
                          ? "bg-green-900 text-green-400"
                          : "bg-red-900 text-red-400"
                      }`}
                    >
                      {passed ? "合格" : "不合格"}
                    </span>
                  </div>
                  <div className="text-xl font-bold">
                    {exam.score}/{exam.total}（{rate}%）
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Weekly History */}
      {gameData.weeklyHistory.length > 0 && (
        <>
          <h2 className="text-lg font-bold mb-3 mt-6">週間推移</h2>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="space-y-2">
              {gameData.weeklyHistory
                .slice(-4)
                .reverse()
                .map((week, i) => {
                  const rate =
                    week.totalQuestions > 0
                      ? Math.round(
                          (week.correctAnswers / week.totalQuestions) * 100
                        )
                      : 0;
                  return (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        {week.weekStart}〜
                      </span>
                      <span>
                        {week.totalQuestions}問 / {rate}% / +{week.expEarned}EXP
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
