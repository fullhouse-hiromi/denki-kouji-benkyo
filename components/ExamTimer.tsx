"use client";

import { useEffect, useState } from "react";

type Props = {
  totalSeconds: number;
  onTimeUp: () => void;
  running: boolean;
};

export default function ExamTimer({ totalSeconds, onTimeUp, running }: Props) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, remaining, onTimeUp]);

  const hours = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  const urgency =
    remaining < 300
      ? "text-red-400 animate-pulse"
      : remaining < 600
        ? "text-yellow-400"
        : "text-blue-400";

  return (
    <div className={`font-mono text-2xl font-bold ${urgency}`}>
      {hours > 0 && `${hours}:`}
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
