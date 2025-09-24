"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeCard } from "@/components/ModeCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-game safe-area-top safe-area-bottom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            🎮
          </motion.div>

          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            Party & Couple Games
          </h1>

          <p className="text-secondary text-lg">
            Choose your adventure
          </p>
        </motion.div>

        {/* Game Mode Cards */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/couple" className="block">
            <ModeCard
              title="Couple Mode"
              description="Truth or Dare, quizzes, and romantic games for two"
              accent="couple"
              emoji="💕"
              index={0}
            />
          </Link>

          <Link href="/party" className="block">
            <ModeCard
              title="Party Mode"
              description="Drinking games, charades, and group challenges"
              accent="party"
              emoji="🍻"
              index={1}
            />
          </Link>

          <Link href="/trivia" className="block">
            <ModeCard
              title="Trivia Mode"
              description="Test your knowledge with various categories"
              accent="trivia"
              emoji="🧠"
              index={2}
            />
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors duration-200 text-sm font-medium focus-outline"
          >
            <span>👤</span>
            Sign in for saved progress
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
