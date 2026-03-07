"use client";

import { Question } from "@/lib/types";

type Props = {
  question: Question;
  selectedAnswer: number | boolean | null;
  onAnswer: (answer: number | boolean) => void;
  showResult: boolean;
  questionNumber?: number;
  totalQuestions?: number;
};

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  showResult,
  questionNumber,
  totalQuestions,
}: Props) {
  const isChoice = question.type === "choice";

  function getChoiceClass(index: number) {
    if (!showResult) {
      return selectedAnswer === index
        ? "border-blue-500 bg-blue-900/30"
        : "border-gray-600 hover:border-blue-400 hover:bg-blue-900/10";
    }
    if (index === question.answer) {
      return "border-green-500 bg-green-900/30";
    }
    if (selectedAnswer === index && index !== question.answer) {
      return "border-red-500 bg-red-900/30";
    }
    return "border-gray-700 opacity-50";
  }

  function getTFClass(value: boolean) {
    if (!showResult) {
      return selectedAnswer === value
        ? "border-blue-500 bg-blue-900/30"
        : "border-gray-600 hover:border-blue-400 hover:bg-blue-900/10";
    }
    if (value === question.answer) {
      return "border-green-500 bg-green-900/30";
    }
    if (selectedAnswer === value && value !== question.answer) {
      return "border-red-500 bg-red-900/30";
    }
    return "border-gray-700 opacity-50";
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
      {questionNumber != null && totalQuestions != null && (
        <div className="text-sm text-gray-400 mb-2">
          問題 {questionNumber} / {totalQuestions}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-6 leading-relaxed">
        {question.question}
      </h3>
      {question.imageUrl && (
        <div className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={question.imageUrl}
            alt="問題画像"
            className="max-w-full rounded-lg"
          />
        </div>
      )}
      <div className="space-y-3">
        {isChoice && question.choices
          ? question.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => !showResult && onAnswer(i)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${getChoiceClass(i)}`}
              >
                <span className="font-bold mr-3 text-blue-400">
                  {["ア", "イ", "ウ", "エ"][i]}.
                </span>
                {choice}
                {showResult && i === question.answer && (
                  <span className="ml-2 text-green-400">✓</span>
                )}
                {showResult &&
                  selectedAnswer === i &&
                  i !== question.answer && (
                    <span className="ml-2 text-red-400">✗</span>
                  )}
              </button>
            ))
          : !isChoice && (
              <div className="flex gap-4">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => !showResult && onAnswer(val)}
                    disabled={showResult}
                    className={`flex-1 p-4 rounded-lg border-2 text-center text-xl font-bold transition-all ${getTFClass(val)}`}
                  >
                    {val ? "○" : "✗"}
                    {showResult && val === question.answer && (
                      <span className="ml-2 text-green-400 text-base">
                        正解
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
      </div>
    </div>
  );
}
