"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import { CoupleIntensity } from "@/lib/game-logic/couple";

export default function CouplePageClient() {
  const [selectedIntensity, setSelectedIntensity] = useState<CoupleIntensity | null>(null);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const intensities = [
    {
      value: "light" as CoupleIntensity,
      label: "Light",
      description: "Fun and lighthearted questions and dares",
      emoji: "😊"
    },
    {
      value: "medium" as CoupleIntensity,
      label: "Medium",
      description: "Sweet and loving activities for couples",
      emoji: "💕"
    },
    {
      value: "heavy" as CoupleIntensity,
      label: "Heavy",
      description: "More intimate and passionate challenges",
      emoji: "🔥"
    },
    {
      value: "explicit" as CoupleIntensity,
      label: "Explicit",
      description: "Intense and very intimate experiences",
      emoji: "🌶️"
    }
  ];

  const games = [
    {
      id: "random",
      title: "Random Game",
      description: "Let us pick a surprise game for you",
      emoji: "🎲"
    },
    {
      id: "truth_dare",
      title: "Truth or Dare",
      description: "Classic truth or dare with romantic twists",
      emoji: "🤔"
    },
    {
      id: "couple_quiz",
      title: "Couple Quiz",
      description: "Test how well you know each other",
      emoji: "❓"
    },
    {
      id: "would_rather",
      title: "Would You Rather",
      description: "Romantic and spicy choices",
      emoji: "🤷"
    },
    {
      id: "story_builder",
      title: "Story Builder",
      description: "Create romantic stories together",
      emoji: "📖"
    }
  ];

  const getGameUrl = (gameId: string, intensity: CoupleIntensity) => {
    if (gameId === "truth_dare") {
      return `/couple/play?intensity=${intensity}&game=truth_dare`;
    }
    if (gameId === "random") {
      const availableGames = ["quiz", "would_rather", "story", "truth_dare"];
      const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
      return `/couple/play?intensity=${intensity}&game=${randomGame}`;
    }
    return `/couple/play?intensity=${intensity}&game=${gameId.replace("couple_", "")}`;
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
            Couple Mode
          </h1>

          <p className="text-secondary text-lg">
            Choose your intensity and game
          </p>
        </motion.div>

        {/* Intensity Selection */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-primary mb-6 text-center">Choose Your Intensity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {intensities.map((intensity, index) => (
              <motion.button
                key={intensity.value}
                onClick={() => setSelectedIntensity(intensity.value)}
                className={`card card-interactive p-4 text-left transition-all duration-200 ${
                  selectedIntensity === intensity.value
                    ? "ring-2 ring-primary border-primary"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{intensity.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-1">
                      {intensity.label}
                    </h3>
                    <p className="text-xs text-secondary">{intensity.description}</p>
                  </div>
                  {selectedIntensity === intensity.value && (
                    <motion.div
                      className="text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="10" fill="currentColor"/>
                        <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Game Selection - only show when intensity is selected */}
        {selectedIntensity && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-primary mb-6 text-center">Choose Your Game</h2>
            <div className="space-y-4">
              {games.map((game, index) => (
                <motion.button
                  key={game.id}
                  onClick={() => setSelectedGame(game.id)}
                  className={`w-full card card-interactive p-4 text-left transition-all duration-200 ${
                    selectedGame === game.id
                      ? "ring-2 ring-primary border-primary"
                      : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{game.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-1">
                        {game.title}
                      </h3>
                      <p className="text-sm text-secondary">{game.description}</p>
                    </div>
                    {selectedGame === game.id && (
                      <motion.div
                        className="text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="10" fill="currentColor"/>
                          <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Start Game Button */}
        {selectedIntensity && selectedGame && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={getGameUrl(selectedGame, selectedIntensity)}>
              <motion.button
                className="w-full btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Playing
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <BackButton href="/" label="Back to main menu" />
        </motion.div>
      </div>
    </div>
  );
}