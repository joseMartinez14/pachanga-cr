"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";

export default function CoupleGamesPage() {
  const searchParams = useSearchParams();
  const intensity = searchParams?.get("intensity") || "light";

  const games = [
    {
      id: "random",
      title: "Random Game",
      description: "Let us pick a surprise game for you",
      emoji: "🎲",
      href: `/couple/play?intensity=${intensity}&game=random`
    },
    {
      id: "truth_dare",
      title: "Truth or Dare",
      description: "Classic truth or dare with romantic twists",
      emoji: "🤔",
      href: `/couple/play?intensity=${intensity}&game=truth_dare`
    },
    {
      id: "couple_quiz",
      title: "Couple Quiz",
      description: "Test how well you know each other",
      emoji: "❓",
      href: `/couple/play?intensity=${intensity}&game=quiz`
    },
    {
      id: "would_rather",
      title: "Would You Rather",
      description: "Romantic and spicy choices",
      emoji: "🤷",
      href: `/couple/play?intensity=${intensity}&game=would_rather`
    },
    {
      id: "story_builder",
      title: "Story Builder",
      description: "Create romantic stories together",
      emoji: "📖",
      href: `/couple/play?intensity=${intensity}&game=story`
    }
  ];

  const intensityColors = {
    "light": "bg-green-50 text-green-700 border-green-200",
    "medium": "bg-blue-50 text-blue-700 border-blue-200",
    "heavy": "bg-rose-50 text-rose-700 border-rose-200",
    "explicit": "bg-red-50 text-red-700 border-red-200"
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
            💕
          </motion.div>

          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            Choose Your Game
          </h1>

          <p className="text-secondary text-lg mb-4">
            Pick how you want to play together
          </p>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
            intensityColors[intensity as keyof typeof intensityColors] || "bg-gray-50 text-gray-700 border-gray-200"
          }`}>
            {intensity}
          </span>
        </motion.div>

        {/* Game Options */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Link href={game.href}>
                <motion.div
                  className="card card-interactive p-6"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{game.emoji}</div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-primary mb-2">
                        {game.title}
                      </h2>
                      <p className="text-secondary">{game.description}</p>
                    </div>
                    <motion.div
                      className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BackButton href="/couple/intensity" label="Back to intensity" />
        </motion.div>
      </div>
    </div>
  );
}