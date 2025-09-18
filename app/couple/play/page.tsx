"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PromptCard } from "@/components/PromptCard";
import { BackButton } from "@/components/BackButton";
import { TruthDareCard, CoupleIntensity, filterCardsByIntensity, getRandomCard } from "@/lib/game-logic/couple";
import truthDareData from "@/data/truth_dare.json";

export default function CouplePlayPage() {
  const searchParams = useSearchParams();
  const intensity = (searchParams?.get("intensity") || "PG") as CoupleIntensity;
  const type = searchParams?.get("type") as "truth" | "dare" | null;

  const [currentCard, setCurrentCard] = useState<TruthDareCard | null>(null);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);

  useEffect(() => {
    drawNewCard();
  }, [intensity, type]);

  const drawNewCard = () => {
    const allCards = truthDareData as TruthDareCard[];
    const filteredCards = filterCardsByIntensity(allCards, intensity);
    const newCard = getRandomCard(filteredCards, type || undefined);
    setCurrentCard(newCard);
  };

  const handleComplete = () => {
    setScore(prev => ({ ...prev, player1: prev.player1 + 10 + (streak * 2) }));
    setStreak(prev => prev + 1);
    nextRound();
  };

  const handleSkip = () => {
    setScore(prev => ({ ...prev, player1: Math.max(0, prev.player1 - 5) }));
    setStreak(0);
    nextRound();
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    drawNewCard();
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="text-4xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            💕
          </motion.div>
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-game safe-area-top safe-area-bottom">
        {/* Game Stats */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-primary mb-4">
            Round {round}
          </h1>
          <div className="flex justify-center gap-6">
            <div className="card p-3 text-center">
              <div className="text-sm text-secondary">Score</div>
              <div className="text-lg font-semibold text-primary">{score.player1}</div>
            </div>
            <div className="card p-3 text-center">
              <div className="text-sm text-secondary">Streak</div>
              <div className="text-lg font-semibold text-primary">{streak}</div>
            </div>
          </div>
        </motion.div>

        {/* Prompt Card */}
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <PromptCard
            title={currentCard.type === "truth" ? "Truth" : "Dare"}
            content={currentCard.text}
            type={currentCard.type}
            intensity={currentCard.intensity}
            onComplete={handleComplete}
            onSkip={handleSkip}
          />
        </motion.div>

        {/* Game Actions */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            onClick={drawNewCard}
            className="w-full btn-secondary"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <span>🎲</span>
              Draw New Card
            </span>
          </motion.button>

          <Link href={`/couple/score?score=${score.player1}&rounds=${round}`}>
            <motion.button
              className="w-full btn-primary"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                <span>🏆</span>
                End Game & See Score
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BackButton href={`/couple/spinner?intensity=${intensity}`} label="Back to spinner" />
        </motion.div>
      </div>
    </div>
  );
}