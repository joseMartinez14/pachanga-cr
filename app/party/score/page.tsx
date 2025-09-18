"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ScoreBoard } from "@/components/ScoreBoard";

export default function PartyScorePage() {
  const searchParams = useSearchParams();
  const finalScore = parseInt(searchParams?.get("score") || "0");
  const rounds = parseInt(searchParams?.get("rounds") || "1");

  // TODO: Get actual players from room state
  const players = [
    { id: "player1", name: "Player 1", score: finalScore },
    { id: "player2", name: "Player 2", score: Math.floor(finalScore * 0.8) },
    { id: "player3", name: "Player 3", score: Math.floor(finalScore * 0.6) },
    { id: "player4", name: "Player 4", score: Math.floor(finalScore * 0.4) }
  ];

  const getPartyMessage = (score: number) => {
    if (score >= 100) return "🎉 Epic party legend!";
    if (score >= 70) return "🍺 Fantastic party vibes!";
    if (score >= 40) return "😄 Good party energy!";
    return "👍 Keep the party going!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Party Complete! 🎉
          </h1>
          <p className="text-white/80">
            {getPartyMessage(finalScore)}
          </p>
        </div>

        <div className="mb-6">
          <ScoreBoard players={players} title="Party Leaderboard" />
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-3">Party Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Rounds Played:</span>
              <span className="font-semibold">{rounds}</span>
            </div>
            <div className="flex justify-between">
              <span>Your Score:</span>
              <span className="font-semibold">{finalScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Party MVP:</span>
              <span className="font-semibold">{players[0].name}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/party">
            <button className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
              🎉 Party Again
            </button>
          </Link>

          <Link href="/">
            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl hover:bg-white/30 transition-colors">
              🏠 Main Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}