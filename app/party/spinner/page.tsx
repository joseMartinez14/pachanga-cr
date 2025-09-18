"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SpinnerWheel } from "@/components/SpinnerWheel";
import { BackButton } from "@/components/BackButton";
import { generateSeed } from "@/lib/rng";

export default function PartySpinnerPage() {
  const searchParams = useSearchParams();
  const intensity = searchParams?.get("intensity") || "PG";

  const [spinning, setSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [seed] = useState(() => generateSeed());

  // TODO: Get actual players from room state
  const players = ["Player 1", "Player 2", "Player 3", "Player 4"];

  const handleSpinComplete = (selectedItem: string) => {
    setSelectedPlayer(selectedItem);
  };

  const intensityColors = {
    "PG": "bg-green-50 text-green-700 border-green-200",
    "18+": "bg-orange-50 text-orange-700 border-orange-200",
    "Custom": "bg-purple-50 text-purple-700 border-purple-200"
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
            Spin for Player
          </h1>

          <p className="text-secondary text-lg mb-4">
            Who's turn is it?
          </p>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
            intensityColors[intensity as keyof typeof intensityColors] || "bg-gray-50 text-gray-700 border-gray-200"
          }`}>
            {intensity}
          </span>
        </motion.div>

        <div className="mb-8">
          <SpinnerWheel
            items={players}
            seed={seed}
            spinning={spinning}
            onSpinComplete={handleSpinComplete}
          />
        </div>

        <div className="space-y-4">
          {!spinning && !selectedPlayer && (
            <button
              onClick={() => setSpinning(true)}
              className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              🎲 Spin the Wheel!
            </button>
          )}

          {selectedPlayer && (
            <Link href={`/party/play?intensity=${intensity}&player=${encodeURIComponent(selectedPlayer)}`}>
              <button className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
                Continue with {selectedPlayer} →
              </button>
            </Link>
          )}

          <Link
            href={`/party/intensity`}
            className="block text-center text-white/80 hover:text-white underline"
          >
            ← Back to intensity
          </Link>
        </div>
      </div>
    </div>
  );
}