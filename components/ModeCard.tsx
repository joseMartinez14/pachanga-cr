"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ModeCardProps {
  title: string;
  description: string;
  accent: "couple" | "party" | "trivia";
  emoji: string;
  className?: string;
  index?: number;
}

export function ModeCard({ title, description, accent, emoji, className, index = 0 }: ModeCardProps) {
  const accentClasses = {
    couple: "accent-couple",
    party: "accent-party",
    trivia: "accent-trivia"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={cn(
        "card card-interactive group pb-4",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Emoji Icon */}
        <motion.div
          className="text-4xl flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {emoji}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h2 className={cn(
            "text-xl font-semibold mb-2 group-hover:text-current transition-colors duration-200",
            accentClasses[accent]
          )}>
            {title}
          </h2>

          <p className="text-secondary text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Arrow indicator */}
        <motion.div
          className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ x: -5 }}
          whileHover={{ x: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-0">
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
  );
}