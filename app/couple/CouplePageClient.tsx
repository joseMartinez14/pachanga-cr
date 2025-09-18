"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";

export default function CouplePageClient() {
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
            Romantic games for two hearts
          </p>
        </motion.div>

        {/* Start Game Card */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/couple/intensity">
            <motion.div
              className="card card-interactive group text-center"
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                🎮
              </motion.div>
              <h2 className="text-2xl font-bold text-primary mb-3 group-hover:accent-couple transition-colors">
                Start Your Journey
              </h2>
              <p className="text-secondary">
                Choose your intensity and begin playing together
              </p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Available Games */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-primary mb-6 text-center">Available Games</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: "🤔", title: "Truth or Dare", desc: "Classic with romantic twists" },
              { emoji: "❓", title: "Couple Quiz", desc: "Test your knowledge" },
              { emoji: "🤷", title: "Would You Rather", desc: "Romantic choices" },
              { emoji: "📖", title: "Story Builder", desc: "Create stories together" }
            ].map((game, index) => (
              <motion.div
                key={game.title}
                className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl mb-2">{game.emoji}</div>
                <h3 className="font-medium mb-1 text-sm text-primary">{game.title}</h3>
                <p className="text-xs text-secondary">{game.desc}</p>
              </motion.div>
            ))}
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