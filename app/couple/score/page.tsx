"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScoreBoard } from "@/components/ScoreBoard";

export default function CoupleScorePage() {
  const searchParams = useSearchParams();
  const finalScore = parseInt(searchParams?.get("score") || "0");
  const rounds = parseInt(searchParams?.get("rounds") || "1");

  const players = [
    {
      id: "player1",
      name: "You",
      score: finalScore
    }
  ];

  const getScoreMessage = (score: number) => {
    if (score >= 100) return "Incredible chemistry!";
    if (score >= 70) return "Great connection!";
    if (score >= 40) return "Nice effort!";
    return "Keep practicing!";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 100) return "🔥";
    if (score >= 70) return "💕";
    if (score >= 40) return "😊";
    return "💪";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container-game safe-area-top safe-area-bottom">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-6xl mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            🎉
          </motion.div>

          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            Game Complete!
          </h1>

          <div className="flex items-center justify-center gap-2 text-lg text-secondary">
            <span>{getScoreEmoji(finalScore)}</span>
            <span>{getScoreMessage(finalScore)}</span>
          </div>
        </motion.div>

        {/* Score Display */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ScoreBoard players={players} title="Final Score" />
        </motion.div>

        {/* Game Stats */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-primary mb-4">Game Stats</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-secondary">Rounds Played:</span>
              <span className="font-semibold text-primary">{rounds}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Final Score:</span>
              <span className="font-semibold text-primary">{finalScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary">Average per Round:</span>
              <span className="font-semibold text-primary">
                {rounds > 0 ? Math.round(finalScore / rounds) : 0}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/couple">
            <motion.button
              className="w-full btn-primary"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🎮</span>
                Play Again
              </span>
            </motion.button>
          </Link>

          <Link href="/">
            <motion.button
              className="w-full btn-secondary"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🏠</span>
                Main Menu
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}