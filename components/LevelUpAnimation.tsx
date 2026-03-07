"use client";

import { useEffect, useState } from "react";

type Props = {
  level: number;
  title: string;
  show: boolean;
  onClose: () => void;
};

export default function LevelUpAnimation({
  level,
  title,
  show,
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">⚡</div>
        <div className="text-yellow-400 text-2xl font-bold mb-2">
          LEVEL UP!
        </div>
        <div className="text-white text-4xl font-bold mb-2">Lv.{level}</div>
        <div className="text-yellow-300 text-xl">{title}</div>
      </div>
    </div>
  );
}
