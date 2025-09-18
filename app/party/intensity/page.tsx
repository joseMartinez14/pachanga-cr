"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PartyIntensity } from "@/lib/game-logic/party";
import { BackButton } from "@/components/BackButton";

export default function PartyIntensityPage() {
  const [selectedIntensity, setSelectedIntensity] = useState<PartyIntensity | null>(null);

  const intensities: Array<{
    value: PartyIntensity;
    label: string;
    description: string;
    emoji: string;
  }> = [
    {
      value: "PG",
      label: "PG - Family Friendly",
      description: "Clean fun for all ages",
      emoji: "😄"
    },
    {
      value: "18+",
      label: "18+ - Adults Only",
      description: "Drinking games and adult humor",
      emoji: "🍺"
    },
    {
      value: "Custom",
      label: "Custom - Anything Goes",
      description: "Mix of all content levels",
      emoji: "🎭"
    }
  ];

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
            🍻
          </motion.div>

          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            Choose Party Intensity
          </h1>

          <p className="text-secondary text-lg">
            Set the mood for your party
          </p>
        </motion.div>

        {/* Intensity Options */}
        <motion.div
          className="space-y-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {intensities.map((intensity, index) => (
            <motion.button
              key={intensity.value}
              onClick={() => setSelectedIntensity(intensity.value)}
              className={`w-full card card-interactive p-6 text-left transition-all duration-200 ${
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
              <div className="flex items-center gap-4">
                <div className="text-4xl">{intensity.emoji}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-primary mb-2">
                    {intensity.label}
                  </h2>
                  <p className="text-secondary">{intensity.description}</p>
                </div>
                {selectedIntensity === intensity.value && (
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
        </motion.div>

        {/* Continue Button */}
        {selectedIntensity && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`/party/spinner?intensity=${selectedIntensity}`}>
              <motion.button
                className="w-full btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Back Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BackButton href="/party" label="Back to party mode" />
        </motion.div>
      </div>
    </div>
  );
}