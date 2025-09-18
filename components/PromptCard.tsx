"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PromptCardProps {
  title: string;
  content: string;
  type?: "truth" | "dare" | "question" | "prompt";
  intensity?: string;
  onComplete?: () => void;
  onSkip?: () => void;
  showActions?: boolean;
  className?: string;
}

export function PromptCard({
  title,
  content,
  type = "prompt",
  intensity,
  onComplete,
  onSkip,
  showActions = true,
  className
}: PromptCardProps) {
  const typeEmojis = {
    truth: "🤔",
    dare: "😈",
    question: "❓",
    prompt: "🎮"
  };

  const intensityColors = {
    "PG": "bg-green-50 text-green-700 border-green-200",
    "Romantic": "bg-rose-50 text-rose-700 border-rose-200",
    "Spicy": "bg-red-50 text-red-700 border-red-200",
    "18+": "bg-orange-50 text-orange-700 border-orange-200",
    "Custom": "bg-purple-50 text-purple-700 border-purple-200"
  };

  return (
    <motion.div
      className={cn("max-w-md mx-auto", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card text-center">
        {/* Header Section */}
        <div className="mb-6">
          <motion.div
            className="text-5xl mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {typeEmojis[type]}
          </motion.div>

          <h2 className="text-2xl font-bold text-primary mb-3">
            {title}
          </h2>

          {intensity && (
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-medium border",
                intensityColors[intensity as keyof typeof intensityColors] || "bg-gray-50 text-gray-700 border-gray-200"
              )}
            >
              {intensity}
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 rounded-xl border border-gray-100 mb-8 bg-gray-50/50">
          <p className="text-lg leading-relaxed text-primary font-medium">
            {content}
          </p>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-3">
            {onComplete && (
              <motion.button
                onClick={onComplete}
                className="flex-1 btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>✅</span>
                  Complete
                </span>
              </motion.button>
            )}

            {onSkip && (
              <motion.button
                onClick={onSkip}
                className="flex-1 btn-secondary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>⏭️</span>
                  Skip
                </span>
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}