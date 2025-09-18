"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";

export default function TriviaPageClient() {
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
            🧠
          </motion.div>

          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            Trivia Mode
          </h1>

          <p className="text-secondary text-lg">
            Test your knowledge
          </p>
        </motion.div>

        {/* Start Game Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/trivia/intensity">
            <motion.div
              className="card card-interactive group text-center"
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                🏆
              </motion.div>
              <h2 className="text-2xl font-bold text-primary mb-3 group-hover:accent-trivia transition-colors">
                Start Quiz
              </h2>
              <p className="text-secondary">
                Choose category and difficulty
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Game Info */}
        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Game Modes</h2>
            <div className="grid grid-cols-1 gap-3">
              {[
                { name: "Free-for-All", desc: "Everyone for themselves" },
                { name: "Team vs Team", desc: "Collaborate to win" },
                { name: "Rapid Fire", desc: "Quick-fire questions" }
              ].map((mode, index) => (
                <div key={mode.name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <span className="font-medium text-primary">{mode.name}</span>
                    <span className="text-secondary text-sm ml-2">{mode.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-primary mb-4">Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                "General Knowledge",
                "Movies & TV",
                "Music",
                "Sports",
                "Science & History"
              ].map((category) => (
                <div key={category} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                  <span className="text-sm text-secondary">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

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