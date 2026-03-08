"use client";

import { useState, useEffect, useCallback } from "react";
import { Question, ExamMode, getCategoriesForMode } from "@/lib/types";
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
import LifeBar from "@/components/LifeBar";
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

const MAX_HP = 5;
const INITIAL_HP = 3;
const HP_RECOVERY_INTERVAL = 5; // Recover 1 HP every 5 correct answers

type Phase = "start" | "playing" | "gameover";

export default function SurvivalPage() {
  // --- Game state ---
  const [phase, setPhase] = useState<Phase>("start");
  const [hp, setHp] = useState(INITIAL_HP);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [comboBonus, setComboBonus] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

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

  // Load high score on mount
  useEffect(() => {
    const gameData = loadGameData();
    setHighScore(gameData.survivalHighScore);
  }, []);

  // --- Start game ---
  function handleStart() {
    // Load all questions from all categories
    const mode = loadExamMode();
    const cats = getCategoriesForMode(mode);
    const allQuestions: Question[] = [];
    for (const cat of cats) {
      const loaded = getQuestionsByMode(mode, 2, cat.id);
      allQuestions.push(...loaded);
    }

    if (allQuestions.length === 0) return;

    setQuestions(shuffle(allQuestions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setHp(INITIAL_HP);
    setStreak(0);
    setMaxStreak(0);
    setQuestionsAnswered(0);
    setCorrectCount(0);
    setComboBonus(0);
    setConsecutiveCorrect(0);
    setIsNewHighScore(false);
    setPhase("playing");
  }

  // --- Calculate score ---
  function calculateScore(correct: number, combo: number): number {
    return correct * 100 + combo;
  }

  // --- Handle answer ---
  function handleAnswer(answer: number | boolean) {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const question = questions[currentIndex];
    const isCorrect = answer === question.answer;

    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);

    // Update streak
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    const newMaxStreak = Math.max(maxStreak, newStreak);
    setMaxStreak(newMaxStreak);

    let newCorrectCount = correctCount;
    let newComboBonus = comboBonus;
    let newConsecutiveCorrect = consecutiveCorrect;
    let newHp = hp;

    if (isCorrect) {
      newCorrectCount = correctCount + 1;
      newConsecutiveCorrect = consecutiveCorrect + 1;

      // Combo bonus: extra points for streaks
      if (newStreak >= 10) {
        newComboBonus += 50;
      } else if (newStreak >= 5) {
        newComboBonus += 20;
      } else if (newStreak >= 3) {
        newComboBonus += 10;
      }

      // HP recovery every 5 correct in a row
      if (newConsecutiveCorrect % HP_RECOVERY_INTERVAL === 0) {
        newHp = Math.min(hp + 1, MAX_HP);
      }

      setCorrectCount(newCorrectCount);
      setComboBonus(newComboBonus);
      setConsecutiveCorrect(newConsecutiveCorrect);
      setHp(newHp);
    } else {
      // Incorrect: lose HP
      newHp = hp - 1;
      newConsecutiveCorrect = 0;
      setHp(newHp);
      setConsecutiveCorrect(0);
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

    // Check game over
    if (newHp <= 0) {
      const finalScore = calculateScore(newCorrectCount, newComboBonus);

      // Save high score
      const latestGameData = loadGameData();
      const prevHighScore = latestGameData.survivalHighScore;
      if (finalScore > prevHighScore) {
        setIsNewHighScore(true);
        saveGameData({
          ...latestGameData,
          survivalHighScore: finalScore,
        });
        setHighScore(finalScore);
      } else {
        setHighScore(prevHighScore);
      }
    }
  }

  // --- Next question ---
  function handleNext() {
    // Check if game over after showing result
    if (hp <= 0) {
      setPhase("gameover");
      return;
    }

    // If we've exhausted all questions, reshuffle
    if (currentIndex + 1 >= questions.length) {
      setQuestions(shuffle(questions));
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    setSelectedAnswer(null);
    setShowResult(false);
  }

  // =========================================================================
  // RENDER
  // =========================================================================

  // --- Start screen ---
  if (phase === "start") {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-red-400">
            サバイバルモード
          </h1>

          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">ルール</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg mt-0.5">&#9829;</span>
                <span>
                  HPは<span className="text-white font-bold">{INITIAL_HP}</span>
                  からスタート（最大{MAX_HP}）
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-lg mt-0.5">&#10007;</span>
                <span>
                  不正解でHP <span className="text-red-400 font-bold">-1</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg mt-0.5">&#10003;</span>
                <span>
                  {HP_RECOVERY_INTERVAL}問連続正解でHP{" "}
                  <span className="text-green-400 font-bold">+1</span> 回復
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 text-lg mt-0.5">&#9760;</span>
                <span>HPが0になったらゲームオーバー</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 text-lg mt-0.5">&#9733;</span>
                <span>
                  スコア = 正解数 x 100 + コンボボーナス
                </span>
              </li>
            </ul>
          </div>

          {highScore > 0 && (
            <div className="bg-gray-800 rounded-xl p-4 mb-8 text-center">
              <span className="text-gray-400 text-sm">ハイスコア</span>
              <div className="text-2xl font-bold text-yellow-400">
                {highScore.toLocaleString()}
              </div>
            </div>
          )}

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xl transition-colors"
          >
            開始
          </button>

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

  // --- Game Over screen ---
  if (phase === "gameover") {
    const finalScore = calculateScore(correctCount, comboBonus);

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-red-400">
            GAME OVER
          </h1>

          <div className="bg-gray-800 rounded-xl p-8 text-center mb-8">
            {isNewHighScore && (
              <div className="text-yellow-400 font-bold text-lg mb-4 animate-pulse">
                NEW HIGH SCORE!
              </div>
            )}

            <div className="text-gray-400 text-sm mb-1">スコア</div>
            <div className="text-5xl font-bold text-white mb-6">
              {finalScore.toLocaleString()}
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-xs mb-1">回答数</div>
                <div className="text-xl font-bold">{questionsAnswered}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-xs mb-1">正解数</div>
                <div className="text-xl font-bold text-green-400">
                  {correctCount}
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-xs mb-1">最大連続正解</div>
                <div className="text-xl font-bold text-orange-400">
                  {maxStreak}
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-xs mb-1">コンボボーナス</div>
                <div className="text-xl font-bold text-purple-400">
                  +{comboBonus}
                </div>
              </div>
            </div>

            {highScore > 0 && !isNewHighScore && (
              <div className="mt-4 text-gray-400 text-sm">
                ハイスコア: {highScore.toLocaleString()}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <button
              onClick={handleStart}
              className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg transition-colors"
            >
              もう一度
            </button>
            <a
              href="/"
              className="block w-full py-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-bold text-lg text-center transition-colors"
            >
              ホームに戻る
            </a>
          </div>
        </div>

        <BadgeNotification badge={currentBadge} onClose={handleBadgeClose} />
      </div>
    );
  }

  // --- Playing screen ---
  const question = questions[currentIndex];

  if (!question) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">問題を読み込んでいます...</div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header with LifeBar and streak */}
        <div className="flex items-center justify-between mb-4">
          <LifeBar current={hp} max={MAX_HP} />
          <StreakCounter streak={streak} />
        </div>

        {/* Score and question count */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="text-gray-400">
            問題{" "}
            <span className="text-white font-bold">{questionsAnswered + (showResult ? 0 : 1)}</span>
          </div>
          <div className="text-gray-400">
            スコア{" "}
            <span className="text-yellow-400 font-bold">
              {calculateScore(correctCount, comboBonus).toLocaleString()}
            </span>
          </div>
        </div>

        {/* HP recovery indicator */}
        {consecutiveCorrect > 0 && consecutiveCorrect < HP_RECOVERY_INTERVAL && (
          <div className="text-center text-xs text-gray-500 mb-2">
            HP回復まであと{HP_RECOVERY_INTERVAL - consecutiveCorrect}問連続正解
          </div>
        )}

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
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg transition-colors"
              >
                {hp <= 0 ? "結果を見る" : "次の問題"}
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
