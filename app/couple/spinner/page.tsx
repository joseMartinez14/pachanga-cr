"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SpinnerWheel } from "@/components/SpinnerWheel";
import { BackButton } from "@/components/BackButton";
import { generateSeed } from "@/lib/rng";

export default function CoupleSpinnerPage() {
  const searchParams = useSearchParams();
  const intensity = searchParams?.get("intensity") || "PG";

  const [spinning, setSpinning] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [seed] = useState(() => generateSeed());

  const gameTypes = ["Truth", "Dare"];

  const handleSpinComplete = (selectedItem: string) => {
    setSelectedType(selectedItem);
  };

  const intensityColors = {
    "PG": "bg-green-50 text-green-700 border-green-200",
    "Romantic": "bg-rose-50 text-rose-700 border-rose-200",
    "Spicy": "bg-red-50 text-red-700 border-red-200"
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
            🎲
          </motion.div>

          <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
            Truth or Dare?
          </h1>

          <p className="text-secondary text-lg mb-4">
            Spin to decide your fate!
          </p>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
            intensityColors[intensity as keyof typeof intensityColors] || "bg-gray-50 text-gray-700 border-gray-200"
          }`}>
            {intensity}
          </span>
        </motion.div>

        {/* Spinner Wheel */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SpinnerWheel
            items={gameTypes}
            seed={seed}
            spinning={spinning}
            onSpinComplete={handleSpinComplete}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {!spinning && !selectedType && (
            <motion.button
              onClick={() => setSpinning(true)}
              className="w-full btn-primary"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🎲</span>
                Spin the Wheel!
              </span>
            </motion.button>
          )}

          {selectedType && (
            <Link href={`/couple/play?intensity=${intensity}&type=${selectedType.toLowerCase()}`}>
              <motion.button
                className="w-full btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Play {selectedType}
              </motion.button>
            </Link>
          )}
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