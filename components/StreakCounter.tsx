"use client";

type Props = {
  streak: number;
};

export default function StreakCounter({ streak }: Props) {
  if (streak < 2) return null;

  const size =
    streak >= 20 ? "text-3xl" : streak >= 10 ? "text-2xl" : "text-xl";
  const intensity =
    streak >= 20
      ? "text-orange-400"
      : streak >= 10
        ? "text-orange-500"
        : "text-yellow-500";

  return (
    <div className={`flex items-center gap-1 ${size} ${intensity} font-bold`}>
      <span className={streak >= 10 ? "animate-pulse" : ""}>🔥</span>
      <span>{streak}</span>
      <span className="text-sm text-gray-400 font-normal">連続正解</span>
    </div>
  );
}
