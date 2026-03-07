"use client";

import { useState, useEffect, useCallback } from "react";
import { loadGameData, saveGameData } from "@/lib/storage";
import { rollGacha, GACHA_CARDS, getRarityLabel, getRarityColor } from "@/lib/gacha";
import { GameData, CollectionCard } from "@/lib/types";

export default function CollectionPage() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [phase, setPhase] = useState<"menu" | "rolling" | "result" | "gallery">("menu");
  const [drawnCard, setDrawnCard] = useState<CollectionCard | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setGameData(loadGameData());
  }, []);

  const handleGacha = useCallback(() => {
    if (!gameData || gameData.gachaPoints < 10) return;
    setPhase("rolling");

    setTimeout(() => {
      const card = rollGacha();
      const existing = gameData.collection.find((c) => c.id === card.id);
      const newCard: CollectionCard = {
        id: card.id,
        name: card.name,
        rarity: card.rarity as 1 | 2 | 3 | 4 | 5,
        description: card.description,
        obtainedAt: new Date().toISOString(),
      };

      const updated = {
        ...gameData,
        gachaPoints: gameData.gachaPoints - 10,
        collection: existing
          ? gameData.collection
          : [...gameData.collection, newCard],
      };

      setIsNew(!existing);
      setDrawnCard(newCard);
      setGameData(updated);
      saveGameData(updated);
      setPhase("result");
    }, 1500);
  }, [gameData]);

  if (!gameData) return null;

  const collectionRate = Math.round(
    (gameData.collection.length / GACHA_CARDS.length) * 100
  );

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">🎰 ガチャ・コレクション</h1>

      {phase === "menu" && (
        <div>
          <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700 text-center">
            <div className="text-4xl mb-2">🎰</div>
            <div className="text-lg mb-2">
              ガチャポイント:{" "}
              <span className="text-yellow-400 font-bold">
                {gameData.gachaPoints}
              </span>{" "}
              pt
            </div>
            <div className="text-sm text-gray-400 mb-4">
              10ポイントで1回引けます
            </div>
            <button
              onClick={handleGacha}
              disabled={gameData.gachaPoints < 10}
              className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                gameData.gachaPoints >= 10
                  ? "bg-yellow-600 hover:bg-yellow-500 text-white"
                  : "bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
            >
              ガチャを引く！（10pt）
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">コレクション図鑑</h2>
            <span className="text-sm text-gray-400">
              {gameData.collection.length}/{GACHA_CARDS.length}（{collectionRate}%）
            </span>
          </div>

          <button
            onClick={() => setPhase("gallery")}
            className="w-full bg-gray-800 rounded-xl p-4 border border-gray-700 hover:bg-gray-750 transition-colors text-center mb-4"
          >
            📖 図鑑を見る
          </button>
        </div>
      )}

      {phase === "rolling" && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl animate-bounce mb-4">🎰</div>
          <div className="text-xl text-yellow-400 animate-pulse">
            ガチャ中...
          </div>
        </div>
      )}

      {phase === "result" && drawnCard && (
        <div className="flex flex-col items-center py-10">
          <div
            className={`rounded-xl p-8 border-4 mb-4 text-center max-w-sm w-full ${
              drawnCard.rarity >= 4
                ? "border-yellow-400 bg-yellow-900/20"
                : drawnCard.rarity === 3
                  ? "border-yellow-600 bg-yellow-900/10"
                  : drawnCard.rarity === 2
                    ? "border-blue-500 bg-blue-900/10"
                    : "border-gray-500 bg-gray-800"
            }`}
          >
            {isNew && (
              <div className="text-yellow-400 text-sm font-bold mb-2">
                ✨ NEW! ✨
              </div>
            )}
            {!isNew && (
              <div className="text-gray-400 text-sm mb-2">（所持済み）</div>
            )}
            <div className="text-4xl mb-3">🔧</div>
            <div className={`text-sm mb-1 ${getRarityColor(drawnCard.rarity)}`}>
              {getRarityLabel(drawnCard.rarity)}
            </div>
            <div className="text-xl font-bold mb-2">{drawnCard.name}</div>
            <div className="text-sm text-gray-400">{drawnCard.description}</div>
          </div>
          <button
            onClick={() => setPhase("menu")}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            戻る
          </button>
        </div>
      )}

      {phase === "gallery" && (
        <div>
          <button
            onClick={() => setPhase("menu")}
            className="mb-4 text-blue-400 hover:text-blue-300"
          >
            ← 戻る
          </button>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GACHA_CARDS.map((card) => {
              const owned = gameData.collection.find((c) => c.id === card.id);
              return (
                <div
                  key={card.id}
                  className={`rounded-lg p-3 border text-center text-sm ${
                    owned
                      ? "bg-gray-800 border-gray-600"
                      : "bg-gray-900 border-gray-800 opacity-40"
                  }`}
                >
                  <div className="text-2xl mb-1">{owned ? "🔧" : "❓"}</div>
                  <div className={`text-xs mb-1 ${getRarityColor(card.rarity)}`}>
                    {getRarityLabel(card.rarity)}
                  </div>
                  <div className="font-semibold">
                    {owned ? card.name : "？？？"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
