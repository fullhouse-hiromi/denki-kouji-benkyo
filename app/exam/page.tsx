"use client";

import { useState, useCallback } from "react";
import {
  Grade,
  Question,
  CATEGORIES,
  getCategoryName,
  ExamRecord,
  Category,
  CategoryProgress,
} from "@/lib/types";
import { getRandomQuestions } from "@/lib/questions";
import {
  loadProgress,
  saveProgress,
  loadGameData,
  saveGameData,
} from "@/lib/storage";
import { calculateExpGain, getLevelFromExp, checkBadges } from "@/lib/game-logic";
import QuestionCard from "@/components/QuestionCard";
import ExamTimer from "@/components/ExamTimer";

type AnswerEntry = {
  questionIndex: number;
  answer: number | boolean;
};

type Phase = "start" | "exam" | "results";

export default function ExamPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [grade, setGrade] = useState<Grade>(2);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerEntry[]>([]);
  const [timerRunning, setTimerRunning] = useState(false);

  // Results state
  const [score, setScore] = useState(0);
  const [earnedExp, setEarnedExp] = useState(0);
  const [categoryScores, setCategoryScores] = useState<
    Record<string, CategoryProgress>
  >({});

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  function getAnswerForQuestion(qIndex: number): number | boolean | null {
    const entry = answers.find((a) => a.questionIndex === qIndex);
    return entry ? entry.answer : null;
  }

  function isQuestionAnswered(qIndex: number): boolean {
    return answers.some((a) => a.questionIndex === qIndex);
  }

  const answeredCount = answers.length;
  const totalSeconds = grade === 2 ? 120 * 60 : 140 * 60;

  // ---------------------------------------------------------------------------
  // Start exam
  // ---------------------------------------------------------------------------

  function handleStart() {
    const examQuestions = getRandomQuestions(grade, 50);
    setQuestions(examQuestions);
    setAnswers([]);
    setCurrentIndex(0);
    setTimerRunning(true);
    setPhase("exam");
  }

  // ---------------------------------------------------------------------------
  // Answer a question
  // ---------------------------------------------------------------------------

  function handleAnswer(answer: number | boolean) {
    setAnswers((prev) => {
      const filtered = prev.filter((a) => a.questionIndex !== currentIndex);
      return [...filtered, { questionIndex: currentIndex, answer }];
    });
  }

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  function goToQuestion(index: number) {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  }

  // ---------------------------------------------------------------------------
  // Finish exam (timer or manual)
  // ---------------------------------------------------------------------------

  const finishExam = useCallback(() => {
    setTimerRunning(false);

    // Calculate results
    const qs = questions;
    let correct = 0;
    const catScores: Record<string, CategoryProgress> = {};

    // Initialize all categories
    for (const cat of CATEGORIES) {
      catScores[cat.id] = { total: 0, correct: 0 };
    }

    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      const entry = answers.find((a) => a.questionIndex === i);
      const isCorrect = entry ? entry.answer === q.answer : false;

      if (isCorrect) correct++;

      if (!catScores[q.category]) {
        catScores[q.category] = { total: 0, correct: 0 };
      }
      catScores[q.category].total++;
      if (isCorrect) catScores[q.category].correct++;
    }

    setScore(correct);
    setCategoryScores(catScores);

    // Save exam to progress
    const progress = loadProgress();
    const examRecord: ExamRecord = {
      date: new Date().toISOString(),
      grade,
      score: correct,
      total: qs.length,
      byCategory: catScores,
    };
    const updatedProgress = {
      ...progress,
      examHistory: [...progress.examHistory, examRecord],
    };
    saveProgress(updatedProgress);

    // Calculate EXP
    const scorePercent = (correct / qs.length) * 100;
    const isPerfect = correct === qs.length;
    const expGain = calculateExpGain({
      examCompleted: true,
      examScorePercent: scorePercent,
      examPerfect: isPerfect,
    });
    setEarnedExp(expGain);

    // Update game data
    const gameData = loadGameData();
    const updatedGameData = {
      ...gameData,
      exp: gameData.exp + expGain,
      level: getLevelFromExp(gameData.exp + expGain).level,
    };

    // Check badges
    const newBadges = checkBadges(updatedGameData, updatedProgress);
    if (newBadges.length > 0) {
      updatedGameData.badges = [...updatedGameData.badges, ...newBadges];
    }

    saveGameData(updatedGameData);

    setPhase("results");
  }, [questions, answers, grade]);

  const handleTimeUp = useCallback(() => {
    finishExam();
  }, [finishExam]);

  // ===========================================================================
  // RENDER - Start screen
  // ===========================================================================

  if (phase === "start") {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2 text-center">模擬試験モード</h1>
          <p className="text-gray-400 text-center mb-8">
            本番と同じ形式で実力を確認しましょう
          </p>

          {/* Grade selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">
              試験種別を選択
            </h2>
            <div className="flex gap-4">
              {([2, 1] as Grade[]).map((g) => (
                <button
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`flex-1 p-6 rounded-xl border-2 text-center transition-all ${
                    grade === g
                      ? "border-blue-500 bg-blue-900/30 text-blue-300"
                      : "border-gray-600 hover:border-blue-400 hover:bg-blue-900/10 text-gray-300"
                  }`}
                >
                  <div className="text-xl font-bold mb-1">
                    第{g === 1 ? "一" : "二"}種
                  </div>
                  <div className="text-sm text-gray-400">
                    {g === 2 ? "120分 / 50問" : "140分 / 50問"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exam info */}
          <div className="bg-gray-800 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-3 text-gray-300">試験概要</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>- 問題数: 50問</li>
              <li>- 制限時間: {grade === 2 ? "120" : "140"}分</li>
              <li>- 合格ライン: 60%（30問以上正解）</li>
              <li>- 問題間の移動は自由にできます</li>
              <li>- 試験中に解説は表示されません</li>
            </ul>
          </div>

          {/* Start button */}
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors"
          >
            試験を開始する
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

  // ===========================================================================
  // RENDER - Exam screen
  // ===========================================================================

  if (phase === "exam") {
    const question = questions[currentIndex];

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Header with timer */}
          <div className="flex items-center justify-between mb-4 bg-gray-800 rounded-xl px-4 py-3">
            <div className="text-sm text-gray-400">
              模擬試験 - 第{grade === 1 ? "一" : "二"}種
            </div>
            <ExamTimer
              totalSeconds={totalSeconds}
              onTimeUp={handleTimeUp}
              running={timerRunning}
            />
            <div className="text-sm text-gray-400">
              回答済: {answeredCount}/{questions.length}
            </div>
          </div>

          {/* Question card - no result shown during exam */}
          <QuestionCard
            question={question}
            selectedAnswer={getAnswerForQuestion(currentIndex)}
            onAnswer={handleAnswer}
            showResult={false}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
          />

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                currentIndex === 0
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              前の問題
            </button>
            <button
              onClick={() => goToQuestion(currentIndex + 1)}
              disabled={currentIndex === questions.length - 1}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                currentIndex === questions.length - 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              次の問題
            </button>
          </div>

          {/* Finish button */}
          <button
            onClick={() => {
              if (
                window.confirm(
                  `未回答の問題が${questions.length - answeredCount}問あります。試験を終了しますか？`
                )
              ) {
                finishExam();
              }
            }}
            className="w-full mt-4 py-3 rounded-xl bg-red-700 hover:bg-red-600 text-white font-bold transition-colors"
          >
            終了
          </button>

          {/* Question grid */}
          <div className="mt-6 bg-gray-800 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">
              問題一覧
            </h3>
            <div className="grid grid-cols-10 gap-2">
              {questions.map((_, i) => {
                const answered = isQuestionAnswered(i);
                const isCurrent = i === currentIndex;
                return (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={`w-full aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? "bg-blue-600 text-white ring-2 ring-blue-400"
                        : answered
                          ? "bg-green-800/60 text-green-300 hover:bg-green-700/60"
                          : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded bg-green-800/60" />
                回答済
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded bg-gray-700" />
                未回答
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded bg-blue-600 ring-2 ring-blue-400" />
                現在
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // RENDER - Results screen
  // ===========================================================================

  const passed = score >= 30;
  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8 text-center">模擬試験結果</h1>

        {/* Score display */}
        <div
          className={`rounded-xl p-8 text-center mb-6 ${
            passed ? "bg-green-900/30 border-2 border-green-600" : "bg-red-900/30 border-2 border-red-600"
          }`}
        >
          <div className="text-6xl font-bold mb-2">
            <span className={passed ? "text-green-400" : "text-red-400"}>
              {score}
            </span>
            <span className="text-gray-500 text-3xl"> / {questions.length}</span>
          </div>
          <div className="text-2xl font-bold mb-2">
            {passed ? (
              <span className="text-green-400">合格</span>
            ) : (
              <span className="text-red-400">不合格</span>
            )}
          </div>
          <div className="text-gray-400">
            正答率 {scorePercent}%（合格ライン: 60%）
          </div>
        </div>

        {/* EXP earned */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 text-center">
          <span className="text-yellow-400 font-bold text-lg">
            +{earnedExp} EXP
          </span>
          <span className="text-gray-400 ml-2 text-sm">獲得</span>
        </div>

        {/* Category scores */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">分野別正答率</h2>
          <div className="space-y-4">
            {CATEGORIES.map((cat) => {
              const cs = categoryScores[cat.id];
              if (!cs || cs.total === 0) return null;
              const rate = Math.round((cs.correct / cs.total) * 100);
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{cat.name}</span>
                    <span className="text-gray-400">
                      {cs.correct}/{cs.total}（{rate}%）
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        rate >= 60 ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Individual question results */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">問題別結果</h2>
          <div className="space-y-4">
            {questions.map((q, i) => {
              const entry = answers.find((a) => a.questionIndex === i);
              const userAnswer = entry ? entry.answer : null;
              const isCorrect = userAnswer === q.answer;
              const unanswered = userAnswer === null;

              return (
                <div
                  key={i}
                  className={`rounded-lg p-4 border ${
                    unanswered
                      ? "border-gray-600 bg-gray-700/30"
                      : isCorrect
                        ? "border-green-700 bg-green-900/20"
                        : "border-red-700 bg-red-900/20"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ${
                        unanswered
                          ? "bg-gray-600 text-gray-300"
                          : isCorrect
                            ? "bg-green-700 text-green-200"
                            : "bg-red-700 text-red-200"
                      }`}
                    >
                      {unanswered ? "-" : isCorrect ? "O" : "X"}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm text-gray-400 mb-1">
                        問{i + 1} [{getCategoryName(q.category as Category)}]
                      </div>
                      <div className="text-sm leading-relaxed mb-2">
                        {q.question}
                      </div>
                      {/* Show user's answer and correct answer */}
                      <div className="text-xs text-gray-400 space-y-1">
                        {q.type === "choice" && q.choices && (
                          <>
                            {!unanswered && (
                              <div>
                                あなたの答え:{" "}
                                <span
                                  className={
                                    isCorrect ? "text-green-400" : "text-red-400"
                                  }
                                >
                                  {["ア", "イ", "ウ", "エ"][userAnswer as number]}.{" "}
                                  {q.choices[userAnswer as number]}
                                </span>
                              </div>
                            )}
                            {(unanswered || !isCorrect) && (
                              <div>
                                正解:{" "}
                                <span className="text-green-400">
                                  {["ア", "イ", "ウ", "エ"][q.answer as number]}.{" "}
                                  {q.choices[q.answer as number]}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                        {q.type === "truefalse" && (
                          <>
                            {!unanswered && (
                              <div>
                                あなたの答え:{" "}
                                <span
                                  className={
                                    isCorrect ? "text-green-400" : "text-red-400"
                                  }
                                >
                                  {userAnswer === true ? "○" : "X"}
                                </span>
                              </div>
                            )}
                            {(unanswered || !isCorrect) && (
                              <div>
                                正解:{" "}
                                <span className="text-green-400">
                                  {q.answer === true ? "○" : "X"}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      {/* Explanation */}
                      <div className="mt-2 text-sm text-gray-300 bg-gray-800 rounded p-3">
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => {
              setPhase("start");
              setQuestions([]);
              setAnswers([]);
              setCurrentIndex(0);
              setScore(0);
              setEarnedExp(0);
              setCategoryScores({});
            }}
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-colors"
          >
            もう一度受験する
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
  );
}
