"use client";

type Props = {
  current: number;
  max: number;
};

export default function LifeBar({ current, max }: Props) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-gray-400 mr-1">HP</span>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`text-xl transition-all ${
            i < current ? "text-red-500 scale-100" : "text-gray-700 scale-75"
          }`}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
