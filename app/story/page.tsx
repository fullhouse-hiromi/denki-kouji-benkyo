"use client";

import { useState, useEffect, useCallback } from "react";
import type { GameData, Question } from "@/lib/types";
import {
  STAGES,
  CHARACTERS,
  getStage,
  getCharacter,
  isStageUnlocked,
  isStageClear,
} from "@/lib/story-data";
import type { Stage } from "@/lib/story-data";
import { getQuestions, hardcodedQuestions } from "@/lib/questions";
import { loadGameData, saveGameData } from "@/lib/storage";
import { calculateExpGain, getLevelFromExp } from "@/lib/game-logic";
import QuestionCard from "@/components/QuestionCard";
import ExplanationCard from "@/components/ExplanationCard";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "select" | "intro" | "quiz" | "result" | "outro" | "ending";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StoryPage() {
  // --- Core state ---
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [phase, setPhase] = useState<Phase>("select");

  // --- Stage select ---
  const [playerName, setPlayerName] = useState("");

  // --- Active stage ---
  const [activeStage, setActiveStage] = useState<Stage | null>(null);

  // --- Dialogue ---
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // --- Quiz ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | boolean | null>(
    null
  );
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // --- Load game data on mount ---
  useEffect(() => {
    const data = loadGameData();
    setGameData(data);
    setPlayerName(data.story.playerName || "");
  }, []);

  // --- Derived values ---
  const clearedStageIds = (gameData?.story.clearedStages ?? []).map(
    (s) => s.stageId
  );

  // =========================================================================
  // Actions
  // =========================================================================

  const savePlayerName = useCallback(
    (name: string) => {
      setPlayerName(name);
      if (gameData) {
        const updated = {
          ...gameData,
          story: { ...gameData.story, playerName: name },
        };
        setGameData(updated);
        saveGameData(updated);
      }
    },
    [gameData]
  );

  function handleSelectStage(stage: Stage) {
    if (!isStageUnlocked(stage.id, clearedStageIds)) return;
    setActiveStage(stage);
    setDialogueIndex(0);
    setPhase("intro");
  }

  function handleAdvanceDialogue(
    lines: string[],
    nextPhase: Phase
  ) {
    if (dialogueIndex + 1 < lines.length) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      if (nextPhase === "quiz") {
        startQuiz();
      } else {
        setPhase(nextPhase);
      }
    }
  }

  function startQuiz() {
    if (!activeStage) return;

    // Collect questions matching stage categories and grade
    let pool: Question[] = [];
    for (const cat of activeStage.categories) {
      const catQuestions = getQuestions(activeStage.grade, cat);
      pool = [...pool, ...catQuestions];
    }

    // If not enough from getQuestions, also pull from hardcodedQuestions
    if (pool.length < activeStage.questionCount) {
      const extra = hardcodedQuestions.filter(
        (q) =>
          q.grade === activeStage.grade &&
          activeStage.categories.includes(q.category)
      );
      const extraIds = new Set(pool.map((q) => q.id));
      for (const q of extra) {
        if (!extraIds.has(q.id)) {
          pool.push(q);
        }
      }
    }

    // Deduplicate
    const seen = new Set<string>();
    pool = pool.filter((q) => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });

    // Shuffle and pick questionCount
    const selected = shuffle(pool).slice(0, activeStage.questionCount);
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectCount(0);
    setPhase("quiz");
  }

  function handleAnswer(answer: number | boolean) {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);

    const question = questions[currentIndex];
    const isCorrect = answer === question.answer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    // Award EXP per answer
    if (gameData) {
      const expGain = calculateExpGain({ correct: isCorrect });
      const updated = {
        ...gameData,
        exp: gameData.exp + expGain,
      };
      const levelInfo = getLevelFromExp(updated.exp);
      updated.level = levelInfo.level;
      setGameData(updated);
      saveGameData(updated);
    }
  }

  function handleNextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      setPhase("result");
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  }

  function handleResultContinue() {
    if (!activeStage || !gameData) return;

    const passed = isStageClear(correctCount, activeStage.id);

    if (passed) {
      // Save cleared stage
      const alreadyCleared = gameData.story.clearedStages.some(
        (s) => s.stageId === activeStage.id
      );

      const newRecord = {
        stageId: activeStage.id,
        score: correctCount,
        total: questions.length,
        clearedAt: new Date().toISOString(),
      };

      let updatedCleared = [...gameData.story.clearedStages];
      if (alreadyCleared) {
        // Update existing record if new score is better
        updatedCleared = updatedCleared.map((s) =>
          s.stageId === activeStage.id && correctCount > s.score
            ? newRecord
            : s
        );
      } else {
        updatedCleared.push(newRecord);
      }

      const nextStageNum = Math.min(activeStage.id + 1, STAGES.length);
      const updated: GameData = {
        ...gameData,
        story: {
          ...gameData.story,
          currentStage: nextStageNum,
          clearedStages: updatedCleared,
        },
      };
      setGameData(updated);
      saveGameData(updated);

      // Check if all stages cleared
      if (activeStage.id === STAGES.length) {
        setPhase("ending");
      } else {
        setDialogueIndex(0);
        setPhase("outro");
      }
    }
  }

  function handleRetry() {
    if (activeStage) {
      setDialogueIndex(0);
      setPhase("intro");
    }
  }

  function handleOutroDone() {
    // Check if the stage we just cleared was the last one
    if (activeStage && activeStage.id === STAGES.length) {
      setPhase("ending");
    } else {
      setPhase("select");
      setActiveStage(null);
    }
  }

  function handleBackToSelect() {
    setPhase("select");
    setActiveStage(null);
  }

  // =========================================================================
  // Render helpers
  // =========================================================================

  function renderDialogue(
    characterId: string,
    lines: string[],
    nextPhase: Phase
  ) {
    const character = getCharacter(characterId);
    const charName = character?.name ?? characterId;

    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 py-8">
          {/* Character name plate */}
          <div className="mb-4">
            <span className="inline-block bg-purple-700 text-purple-100 px-4 py-1 rounded-full text-sm font-bold">
              {charName}
            </span>
            {character && (
              <span className="ml-3 text-xs text-gray-500">
                {character.role}
              </span>
            )}
          </div>

          {/* Dialogue box */}
          <div className="bg-gray-900 border-2 border-purple-600 rounded-xl p-6 min-h-[160px] flex flex-col justify-between shadow-lg shadow-purple-900/20">
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {lines[dialogueIndex]}
            </p>

            <div className="flex justify-between items-center mt-6">
              <span className="text-xs text-gray-600">
                {dialogueIndex + 1} / {lines.length}
              </span>
              <button
                onClick={() => handleAdvanceDialogue(lines, nextPhase)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors"
              >
                {dialogueIndex + 1 < lines.length ? "次へ" : "進む"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // Loading
  // =========================================================================

  if (!gameData) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-gray-400 text-lg">読み込み中...</div>
      </div>
    );
  }

  // =========================================================================
  // Phase: select
  // =========================================================================

  if (phase === "select") {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <h1 className="text-2xl font-bold mb-2 text-center text-purple-300">
            ストーリーモード
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            現場で学ぶ電気工事士への道
          </p>

          {/* Player name */}
          <div className="mb-8 bg-gray-900 border border-purple-800/50 rounded-xl p-4">
            <label className="block text-sm text-gray-400 mb-2">
              あなたの名前
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => savePlayerName(e.target.value)}
              placeholder="名前を入力..."
              maxLength={20}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          {/* Stage list */}
          <div className="space-y-3">
            {STAGES.map((stage) => {
              const unlocked = isStageUnlocked(stage.id, clearedStageIds);
              const clearedRecord = gameData.story.clearedStages.find(
                (s) => s.stageId === stage.id
              );
              const isCleared = !!clearedRecord;
              const isCurrent =
                unlocked && !isCleared && stage.id === gameData.story.currentStage;

              return (
                <button
                  key={stage.id}
                  onClick={() => handleSelectStage(stage)}
                  disabled={!unlocked}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    !unlocked
                      ? "border-gray-800 bg-gray-900/50 opacity-40 cursor-not-allowed"
                      : isCurrent
                        ? "border-purple-500 bg-purple-900/30 shadow-lg shadow-purple-900/20"
                        : isCleared
                          ? "border-green-700/60 bg-gray-900 hover:bg-gray-800"
                          : "border-gray-700 bg-gray-900 hover:border-purple-500 hover:bg-gray-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Stage number badge */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          !unlocked
                            ? "bg-gray-800 text-gray-600"
                            : isCleared
                              ? "bg-green-800 text-green-300"
                              : isCurrent
                                ? "bg-purple-700 text-purple-200"
                                : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {!unlocked ? "?" : stage.id}
                      </div>

                      <div>
                        <div
                          className={`font-bold ${
                            !unlocked
                              ? "text-gray-600"
                              : isCurrent
                                ? "text-purple-300"
                                : isCleared
                                  ? "text-green-300"
                                  : "text-gray-300"
                          }`}
                        >
                          {unlocked ? stage.name : "???"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {unlocked
                            ? `${stage.theme} | ${stage.grade === 1 ? "一種" : "二種"}`
                            : "前のステージをクリアで解放"}
                        </div>
                      </div>
                    </div>

                    {/* Right side indicators */}
                    <div className="text-right">
                      {isCleared && clearedRecord && (
                        <div className="text-sm">
                          <span className="text-green-400 font-bold">
                            {clearedRecord.score}/{clearedRecord.total}
                          </span>
                          <span className="text-green-600 text-xs ml-1">
                            CLEAR
                          </span>
                        </div>
                      )}
                      {isCurrent && (
                        <span className="text-purple-400 text-xs font-bold">
                          NOW
                        </span>
                      )}
                      {!unlocked && (
                        <span className="text-gray-600 text-lg">🔒</span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar for clear condition */}
                  {unlocked && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <span>
                        合格ライン: {stage.clearCondition}/{stage.questionCount}問
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Home link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              ホームに戻る
            </a>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // Phase: intro
  // =========================================================================

  if (phase === "intro" && activeStage) {
    return renderDialogue(
      activeStage.intro.character,
      activeStage.intro.lines,
      "quiz"
    );
  }

  // =========================================================================
  // Phase: quiz
  // =========================================================================

  if (phase === "quiz" && activeStage) {
    if (questions.length === 0) {
      return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">
              このステージの問題が見つかりませんでした。
            </p>
            <button
              onClick={handleBackToSelect}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors"
            >
              ステージ選択に戻る
            </button>
          </div>
        </div>
      );
    }

    const question = questions[currentIndex];
    const isCorrect = selectedAnswer === question.answer;

    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-sm font-bold text-purple-400">
                {activeStage.name}
              </h1>
              <span className="text-xs text-gray-500">{activeStage.theme}</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">
                正解: <span className="text-purple-300 font-bold">{correctCount}</span>
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Card */}
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
                  onClick={handleNextQuestion}
                  className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors"
                >
                  {currentIndex + 1 >= questions.length
                    ? "結果を見る"
                    : "次の問題"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // Phase: result
  // =========================================================================

  if (phase === "result" && activeStage) {
    const passed = isStageClear(correctCount, activeStage.id);
    const scorePercent =
      questions.length > 0
        ? Math.round((correctCount / questions.length) * 100)
        : 0;

    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-4 py-8">
          {/* Report card */}
          <div className="bg-gray-900 border-2 border-purple-600 rounded-xl p-8 shadow-lg shadow-purple-900/20">
            <h2 className="text-center text-xl font-bold text-purple-300 mb-6 border-b border-purple-800 pb-4">
              現場完了報告書
            </h2>

            <div className="text-center mb-2 text-sm text-gray-500">
              {activeStage.name} - {activeStage.theme}
            </div>

            {/* Score */}
            <div className="text-center my-6">
              <div className="text-5xl font-bold">
                <span className={passed ? "text-green-400" : "text-red-400"}>
                  {correctCount}
                </span>
                <span className="text-gray-600 text-3xl">
                  {" "}
                  / {questions.length}
                </span>
              </div>
              <div className="text-gray-400 mt-2">
                正答率{" "}
                <span className="text-white font-bold">{scorePercent}%</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                合格ライン: {activeStage.clearCondition}問正解
              </div>
            </div>

            {/* Pass / Fail indicator */}
            <div className="text-center my-6">
              {passed ? (
                <div className="inline-block bg-green-900/40 border border-green-600 rounded-xl px-8 py-3">
                  <span className="text-2xl font-bold text-green-400">
                    合格
                  </span>
                </div>
              ) : (
                <div className="inline-block bg-red-900/40 border border-red-600 rounded-xl px-8 py-3">
                  <span className="text-2xl font-bold text-red-400">
                    不合格
                  </span>
                  <p className="text-xs text-red-300 mt-1">
                    あと{activeStage.clearCondition - correctCount}問正解が必要です
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-8">
              {passed ? (
                <button
                  onClick={handleResultContinue}
                  className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors"
                >
                  次へ進む
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors"
                >
                  もう一度挑戦
                </button>
              )}
              <button
                onClick={handleBackToSelect}
                className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold transition-colors"
              >
                ステージ選択に戻る
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // Phase: outro
  // =========================================================================

  if (phase === "outro" && activeStage) {
    return (
      <div>
        {renderDialogue(
          activeStage.outro.character,
          activeStage.outro.lines,
          "select"
        )}
        {/* Override the default "進む" button action on last line */}
        {dialogueIndex + 1 >= activeStage.outro.lines.length && (
          <div className="fixed inset-0 flex items-end justify-center pb-8 pointer-events-none">
            {/* The renderDialogue button already handles advancing;
                handleAdvanceDialogue will call handleOutroDone logic via setPhase("select") */}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // Phase: ending
  // =========================================================================

  if (phase === "ending") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="max-w-lg w-full mx-auto px-4 py-8 text-center">
          <div className="bg-gray-900 border-2 border-yellow-500 rounded-xl p-8 shadow-lg shadow-yellow-900/20">
            {/* Crown */}
            <div className="text-6xl mb-4">&#9889;</div>

            <h2 className="text-2xl font-bold text-yellow-300 mb-4">
              一人前の電気工事士
            </h2>

            <p className="text-gray-300 leading-relaxed mb-2">
              {playerName ? `${playerName}さん、` : ""}全12ステージをクリアしました！
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              第二種から第一種まで、あらゆる現場を経験し、
              <br />
              あなたは一人前の電気工事士として認められました。
            </p>

            {/* Sato's final words */}
            <div className="bg-gray-800 border border-purple-700 rounded-lg p-4 mb-6 text-left">
              <span className="text-xs text-purple-400 font-bold">
                佐藤所長
              </span>
              <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                立派になったな。もうお前は一人で現場を任せられる。
                これからも安全第一で、良い仕事をしていけ。
                ...俺は鼻が高いよ。
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBackToSelect}
                className="w-full py-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg transition-colors"
              >
                ステージ選択に戻る
              </button>
              <a
                href="/"
                className="block w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-center transition-colors"
              >
                ホームに戻る
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // Fallback
  // =========================================================================

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <button
        onClick={handleBackToSelect}
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors"
      >
        ステージ選択に戻る
      </button>
    </div>
  );
}
