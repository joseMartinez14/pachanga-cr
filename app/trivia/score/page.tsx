"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ScoreBoard } from "@/components/ScoreBoard";

export default function TriviaScorePage() {
  const searchParams = useSearchParams();
  const finalScore = parseInt(searchParams?.get("score") || "0");
  const totalQuestions = parseInt(searchParams?.get("questions") || "10");
  const category = searchParams?.get("category") || "general";
  const mode = searchParams?.get("mode") || "ffa";

  const accuracy = Math.round((finalScore / (totalQuestions * 10)) * 100);

  // TODO: Get actual players from game state
  const players = [
    { id: "player1", name: "You", score: finalScore },
    { id: "player2", name: "Player 2", score: Math.floor(finalScore * 0.85) },
    { id: "player3", name: "Player 3", score: Math.floor(finalScore * 0.70) },
    { id: "player4", name: "Player 4", score: Math.floor(finalScore * 0.55) }
  ];

  const getTriviaMesg = (accuracy: number) => {
    if (accuracy >= 90) return "🤓 Trivia Master!";
    if (accuracy >= 70) return "🧠 Knowledge Expert!";
    if (accuracy >= 50) return "📚 Good effort!";
    return "💪 Keep learning!";
  };

  const getRank = () => {
    const position = players.findIndex(p => p.id === "player1") + 1;
    const suffix = position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th";
    return `${position}${suffix}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Quiz Complete! 🏆
          </h1>
          <p className="text-white/80">
            {getTriviaMesg(accuracy)}
          </p>
          <p className="text-white/60 text-sm mt-1">
            You finished {getRank()} place!
          </p>
        </div>

        <div className="mb-6">
          <ScoreBoard players={players} title="Final Leaderboard" />
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white mb-6">
          <h2 className="text-xl font-bold mb-3">Quiz Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Category:</span>
              <span className="font-semibold">{category.replace("_", " ").toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Mode:</span>
              <span className="font-semibold">{mode.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Questions:</span>
              <span className="font-semibold">{totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span>Your Score:</span>
              <span className="font-semibold">{finalScore}</span>
            </div>
            <div className="flex justify-between">
              <span>Accuracy:</span>
              <span className="font-semibold">{accuracy}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/trivia">
            <button className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
              🧠 Play Again
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