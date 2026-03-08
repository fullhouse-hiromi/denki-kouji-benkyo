"use client";

import { useState, useEffect, useCallback } from "react";
import { Category, Question, ExamMode, getCategoriesForMode, getCategoryName } from "@/lib/types";
import { getQuestionsByMode } from "@/lib/questions";
import {
  loadProgress,
  saveProgress,
  loadGameData,
  saveGameData,
  loadExamMode,
  recordAnswer,
} from "@/lib/storage";
import { calculateExpGain, getLevelFromExp, checkBadges } from "@/lib/game-logic";
import QuestionCard from "@/components/QuestionCard";
import ExplanationCard from "@/components/ExplanationCard";
import StreakCounter from "@/components/StreakCounter";
import BadgeNotification from "@/components/BadgeNotification";
import LevelUpAnimation from "@/components/LevelUpAnimation";
import type { Badge, CategoryProgress } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type WeakCategory = {
  id: Category;
  name: string;
  total: number;
  correct: number;
  rate: number;
};

function findWeakCategories(
  byCategory: Record<string, CategoryProgress>,
  mode: ExamMode
): WeakCategory[] {
  const weak: WeakCategory[] = [];
  const cats = getCategoriesForMode(mode);
  for (const cat of cats) {
    const cp = byCategory[cat.id];
    if (cp && cp.total >= 10) {
      const rate = cp.correct / cp.total;
      weak.push({
        id: cat.id,
        name: cat.name,
        total: cp.total,
        correct: cp.correct,
        rate,
      });
    }
  }
  // Sort by lowest rate first
  weak.sort((a, b) => a.rate - b.rate);
  return weak;
}

export default function WeaknessPage() {
  // --- ExamMode ---
  const [examMode, setExamMode] = useState<ExamMode>("denki");

  // --- State ---
  const [loading, setLoading] = useState(true);
  const [weakCategories, setWeakCategories] = useState<WeakCategory[]>([]);
  const [currentWeakIndex, setCurrentWeakIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [currentRate, setCurrentRate] = useState(0);
  const [categoryCleared, setCategoryCleared] = useState(false);
  const [noWeakCategories, setNoWeakCategories] = useState(false);

  // --- Gamification state ---
  const [levelUpInfo, setLevelUpInfo] = useState<{
    level: number;
    title: string;
  } | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [pendingBadges, setPendingBadges] = useState<Badge[]>([]);
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null);

  // Show pending badges one at a time
  useEffect(() => {
    if (!currentBadge && pendingBadges.length > 0) {
      setCurrentBadge(pendingBadges[0]);
      setPendingBadges((prev) => prev.slice(1));
    }
  }, [currentBadge, pendingBadges]);

  const handleBadgeClose = useCallback(() => {
    setCurrentBadge(null);
  }, []);

  const handleLevelUpClose = useCallback(() => {
    setShowLevelUp(false);
    setLevelUpInfo(null);
  }, []);

  // Load questions for a weak category
  const loadCategoryQuestions = useCallback((cat: WeakCategory, mode: ExamMode) => {
    const loaded = getQuestionsByMode(mode, 2, cat.id);
    if (loaded.length === 0) return;
    setQuestions(shuffle(loaded));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCategoryCleared(false);

    // Refresh current rate from storage
    const progress = loadProgress();
    const cp = progress.byCategory[cat.id];
    if (cp && cp.total > 0) {
      setCurrentRate(cp.correct / cp.total);
    }
  }, []);

  // On mount: determine weak categories
  useEffect(() => {
    const mode = loadExamMode();
    setExamMode(mode);
    const progress = loadProgress();
    const weak = findWeakCategories(progress.byCategory, mode);

    if (weak.length === 0) {
      setNoWeakCategories(true);
      setLoading(false);
      return;
    }

    setWeakCategories(weak);
    setCurrentWeakIndex(0);
    setCurrentRate(weak[0].rate);
    loadCategoryQuestions(weak[0], mode);
    setLoading(false);
  }, [loadCategoryQuestions]);

  // --- Handle answer ---
  function handleAnswer(answer: number | boolean) {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const question = questions[currentIndex];
    const isCorrect = answer === question.answer;

    // Update streak
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);

    // Update progress
    let progress = loadProgress();
    progress = recordAnswer(progress, question.category, isCorrect);
    saveProgress(progress);

    // Refresh the current rate for this category
    const cp = progress.byCategory[question.category];
    const newRate = cp && cp.total > 0 ? cp.correct / cp.total : 0;
    setCurrentRate(newRate);

    // Update game data with weakness bonus
    const gameData = loadGameData();
    const prevLevel = getLevelFromExp(gameData.exp);

    const expGain = calculateExpGain({
      correct: isCorrect,
      isWeakness: true,
      currentStreak: isCorrect ? newStreak : 0,
    });

    const updatedGameData = {
      ...gameData,
      exp: gameData.exp + expGain,
      currentStreak: newStreak,
      maxStreak: Math.max(gameData.maxStreak, newStreak),
    };

    const newLevelInfo = getLevelFromExp(updatedGameData.exp);
    updatedGameData.level = newLevelInfo.level;

    // Check for level up
    if (newLevelInfo.level > prevLevel.level) {
      setLevelUpInfo({ level: newLevelInfo.level, title: newLevelInfo.title });
      setShowLevelUp(true);
    }

    // Check for new badges
    const newBadges = checkBadges(updatedGameData, progress);
    if (newBadges.length > 0) {
      updatedGameData.badges = [...updatedGameData.badges, ...newBadges];
      setPendingBadges((prev) => [...prev, ...newBadges]);
    }

    saveGameData(updatedGameData);

    // Check if category reached 80%
    if (newRate >= 0.8) {
      setCategoryCleared(true);
    }
  }

  // --- Next question ---
  function handleNext() {
    if (categoryCleared) return; // Use the "next category" button instead
    if (currentIndex + 1 >= questions.length) {
      // Reshuffle and start again if we ran out of questions
      const currentCat = weakCategories[currentWeakIndex];
      if (currentCat) {
        loadCategoryQuestions(currentCat, examMode);
      }
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  }

  // --- Move to next weak category ---
  function handleNextCategory() {
    // Refresh weak categories from current progress
    const progress = loadProgress();
    const weak = findWeakCategories(progress.byCategory, examMode).filter(
      (w) => w.rate < 0.8
    );

    if (weak.length === 0) {
      setNoWeakCategories(true);
      return;
    }

    setWeakCategories(weak);
    setCurrentWeakIndex(0);
    setCurrentRate(weak[0].rate);
    loadCategoryQuestions(weak[0], examMode);
    setStreak(0);
  }

  // =========================================================================
  // RENDER
  // =========================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">読み込み中...</div>
      </div>
    );
  }

  // --- No weak categories ---
  if (noWeakCategories) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8 text-center">弱点克服モード</h1>

          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">&#127775;</div>
            <h2 className="text-xl font-bold mb-4 text-yellow-400">
              弱点カテゴリが見つかりません
            </h2>
            <p className="text-gray-400 mb-2">
              各カテゴリで10問以上回答すると、正答率の低いカテゴリが弱点として表示されます。
            </p>
            <p className="text-gray-400 mb-6">
              まずは練習モードで問題を解いてみましょう！
            </p>
            <div className="space-y-4">
              <a
                href="/practice"
                className="block w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg text-center transition-colors"
              >
                練習モードへ
              </a>
              <a
                href="/"
                className="block w-full py-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg text-center transition-colors"
              >
                ホームに戻る
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Category cleared congratulation ---
  if (categoryCleared) {
    const currentCat = weakCategories[currentWeakIndex];
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8 text-center">弱点克服モード</h1>

          <div className="bg-gray-800 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">&#127881;</div>
            <h2 className="text-xl font-bold mb-2 text-green-400">
              おめでとうございます！
            </h2>
            <p className="text-lg text-white mb-2">
              <span className="text-yellow-400 font-bold">
                {currentCat?.name}
              </span>{" "}
              の正答率が
            </p>
            <div className="text-4xl font-bold text-green-400 mb-4">
              {Math.round(currentRate * 100)}%
            </div>
            <p className="text-gray-400 mb-6">
              80%の目標を達成しました！
            </p>

            <div className="space-y-4">
              <button
                onClick={handleNextCategory}
                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors"
              >
                次の弱点カテゴリへ
              </button>
              <a
                href="/"
                className="block w-full py-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg text-center transition-colors"
              >
                ホームに戻る
              </a>
            </div>
          </div>
        </div>

        <BadgeNotification badge={currentBadge} onClose={handleBadgeClose} />
      </div>
    );
  }

  // --- Quiz screen ---
  const currentCat = weakCategories[currentWeakIndex];
  const question = questions[currentIndex];

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">問題を読み込んでいます...</div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.answer;
  const progressPercent = Math.min(Math.round(currentRate * 100), 100);
  const goalPercent = 80;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold text-purple-400">弱点克服モード</h1>
          <StreakCounter streak={streak} />
        </div>

        {/* Current category info */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">弱点カテゴリ</span>
            <span className="text-sm font-bold text-yellow-400">
              {currentCat?.name}
            </span>
          </div>

          {/* Progress bar toward 80% goal */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-12">正答率</span>
            <div className="flex-1 relative">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    progressPercent >= goalPercent
                      ? "bg-green-500"
                      : progressPercent >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {/* 80% goal marker */}
              <div
                className="absolute top-0 h-3 border-r-2 border-white/50"
                style={{ left: `${goalPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-white w-14 text-right">
              {progressPercent}%
            </span>
          </div>
          <div className="text-xs text-gray-500 text-right mt-1">
            目標: {goalPercent}%
          </div>
        </div>

        {/* EXP bonus indicator */}
        <div className="text-center text-sm text-purple-400 mb-4">
          +15 EXP（弱点ボーナス）
        </div>

        {/* Question */}
        <QuestionCard
          question={question}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          showResult={showResult}
        />

        {/* Explanation */}
        {showResult && (
          <>
            <ExplanationCard
              explanation={question.explanation}
              isCorrect={isCorrect}
            />
            <div className="mt-6">
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors"
              >
                次の問題
              </button>
            </div>
          </>
        )}

        {/* Home link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ホームに戻る
          </a>
        </div>
      </div>

      {/* Level up animation */}
      {levelUpInfo && (
        <LevelUpAnimation
          level={levelUpInfo.level}
          title={levelUpInfo.title}
          show={showLevelUp}
          onClose={handleLevelUpClose}
        />
      )}

      {/* Badge notification */}
      <BadgeNotification badge={currentBadge} onClose={handleBadgeClose} />
    </div>
  );
}
