"use client";

import { useState, useEffect, useCallback } from "react";
import { Grade, Category, Question, ExamMode, getCategoriesForMode } from "@/lib/types";
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
import type { Badge } from "@/lib/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "select" | "quiz" | "result";

export default function PracticePage() {
  // --- Selection state ---
  const [grade, setGrade] = useState<Grade>(2);
  const [examMode, setExamMode] = useState<ExamMode>("denki");
  const [categories, setCategories] = useState(getCategoriesForMode("denki"));
  const [category, setCategory] = useState<Category>("theory");

  // --- Quiz state ---
  const [phase, setPhase] = useState<Phase>("select");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  // --- Gamification state ---
  const [levelUpInfo, setLevelUpInfo] = useState<{
    level: number;
    title: string;
  } | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [pendingBadges, setPendingBadges] = useState<Badge[]>([]);
  const [currentBadge, setCurrentBadge] = useState<Badge | null>(null);

  // Load exam mode on mount
  useEffect(() => {
    const mode = loadExamMode();
    setExamMode(mode);
    const cats = getCategoriesForMode(mode);
    setCategories(cats);
    setCategory(cats[0].id);
  }, []);

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

  // --- Start quiz ---
  function handleStart() {
    const loaded = getQuestionsByMode(examMode, grade, category);
    if (loaded.length === 0) return;
    const shuffled = shuffle(loaded);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setStreak(0);
    setPhase("quiz");
  }

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
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    // Update progress
    let progress = loadProgress();
    progress = recordAnswer(progress, question.category, isCorrect);
    saveProgress(progress);

    // Update game data
    const gameData = loadGameData();
    const prevLevel = getLevelFromExp(gameData.exp);

    const expGain = calculateExpGain({
      correct: isCorrect,
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
  }

  // --- Next question ---
  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setPhase("result");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  }

  // --- Restart ---
  function handleRestart() {
    setPhase("select");
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setStreak(0);
  }

  const isSharoshi = examMode === "sharoshi";
  const modeLabel = isSharoshi ? "社労士" : "電気工事士";

  // =========================================================================
  // RENDER
  // =========================================================================

  // --- Selection screen ---
  if (phase === "select") {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2 text-center">練習モード</h1>
          <p className="text-center text-sm text-gray-400 mb-8">{modeLabel}</p>

          {/* Grade selection - only for denki */}
          {!isSharoshi && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-300">
                試験種別を選択
              </h2>
              <div className="flex gap-4">
                {([2, 1] as Grade[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGrade(g)}
                    className={`flex-1 p-4 rounded-xl border-2 text-center font-bold transition-all ${
                      grade === g
                        ? "border-blue-500 bg-blue-900/30 text-blue-300"
                        : "border-gray-600 hover:border-blue-400 hover:bg-blue-900/10 text-gray-300"
                    }`}
                  >
                    第{g === 1 ? "一" : "二"}種
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Category selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              {isSharoshi ? "科目を選択" : "カテゴリを選択"}
            </h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition-all ${
                    category === cat.id
                      ? "border-blue-500 bg-blue-900/30 text-blue-300"
                      : "border-gray-600 hover:border-blue-400 hover:bg-blue-900/10 text-gray-300"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors"
          >
            練習を開始する
          </button>

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
      </div>
    );
  }

  // --- Quiz screen ---
  if (phase === "quiz") {
    const question = questions[currentIndex];
    const isCorrect = selectedAnswer === question.answer;

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold text-gray-300">練習モード</h1>
            <StreakCounter streak={streak} />
          </div>

          {/* Question */}
          <QuestionCard
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
            showResult={showResult}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
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
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors"
                >
                  {currentIndex + 1 >= questions.length
                    ? "結果を見る"
                    : "次の問題"}
                </button>
              </div>
            </>
          )}
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

  // --- Result screen ---
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">練習結果</h1>

        <div className="bg-gray-800 rounded-xl p-8 text-center mb-8">
          <div className="text-6xl font-bold mb-4">
            <span className="text-blue-400">{correctCount}</span>
            <span className="text-gray-500 text-4xl"> / {questions.length}</span>
          </div>
          <div className="text-gray-400 text-lg">
            正答率{" "}
            <span className="text-white font-bold">
              {questions.length > 0
                ? Math.round((correctCount / questions.length) * 100)
                : 0}
              %
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRestart}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors"
          >
            もう一度練習する
          </button>
          <a
            href="/"
            className="block w-full py-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg text-center transition-colors"
          >
            ホームに戻る
          </a>
        </div>
      </div>

      {/* Badge notification (may still be showing) */}
      <BadgeNotification badge={currentBadge} onClose={handleBadgeClose} />
    </div>
  );
}
