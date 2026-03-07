"use client";

import { Badge } from "@/lib/types";
import { useEffect, useState } from "react";

type Props = {
  badge: Badge | null;
  onClose: () => void;
};

export default function BadgeNotification({ badge, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <div className="bg-yellow-900/90 border-2 border-yellow-500 rounded-xl p-4 shadow-xl max-w-xs">
        <div className="text-yellow-400 text-sm font-bold mb-1">
          バッジ獲得！
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{badge.icon}</span>
          <span className="text-white font-semibold">{badge.name}</span>
        </div>
      </div>
    </div>
  );
}
