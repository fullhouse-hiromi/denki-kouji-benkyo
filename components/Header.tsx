"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadExamMode } from "@/lib/storage";
import type { ExamMode } from "@/lib/types";

export default function Header() {
  const [examMode, setExamMode] = useState<ExamMode>("denki");

  useEffect(() => {
    setExamMode(loadExamMode());

    // Listen for storage changes (mode switch on the front page)
    function handleStorage(e: StorageEvent) {
      if (e.key === "exam-mode") {
        setExamMode((e.newValue as ExamMode) ?? "denki");
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isDenki = examMode === "denki";

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">{isDenki ? "⚡" : "📋"}</span>
          <span className={`font-bold text-lg ${isDenki ? "text-blue-400" : "text-emerald-400"}`}>
            {isDenki ? "電工マスター" : "社労士マスター"}
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/progress" className="text-gray-400 hover:text-white transition-colors">
            進捗
          </Link>
          <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
            プロフィール
          </Link>
        </nav>
      </div>
    </header>
  );
}
