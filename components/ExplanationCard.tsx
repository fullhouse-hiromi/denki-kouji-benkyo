"use client";

type Props = {
  explanation: string;
  isCorrect: boolean;
};

export default function ExplanationCard({ explanation, isCorrect }: Props) {
  return (
    <div
      className={`rounded-xl p-6 mt-4 border-2 ${
        isCorrect
          ? "bg-green-900/20 border-green-700"
          : "bg-red-900/20 border-red-700"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-2xl ${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? "○" : "✗"}
        </span>
        <span className={`font-bold text-lg ${isCorrect ? "text-green-400" : "text-red-400"}`}>
          {isCorrect ? "正解！" : "不正解"}
        </span>
      </div>
      <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
        {explanation}
      </div>
    </div>
  );
}
