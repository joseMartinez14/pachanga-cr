"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PromptCard } from "@/components/PromptCard";
import { DrinkingPrompt, PartyIntensity, filterPromptsByIntensity, getRandomPrompt } from "@/lib/game-logic/party";
import drinkingData from "@/data/drinking_prompts.json";

export default function PartyPlayPage() {
  const searchParams = useSearchParams();
  const intensity = (searchParams?.get("intensity") || "PG") as PartyIntensity;
  const selectedPlayer = searchParams?.get("player") || "Player";

  const [currentPrompt, setCurrentPrompt] = useState<DrinkingPrompt | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  useEffect(() => {
    drawNewPrompt();
  }, [intensity]);

  const drawNewPrompt = () => {
    const allPrompts = drinkingData as DrinkingPrompt[];
    const filteredPrompts = filterPromptsByIntensity(allPrompts, intensity);
    const newPrompt = getRandomPrompt(filteredPrompts);
    setCurrentPrompt(newPrompt);
  };

  const handleComplete = () => {
    setScore(prev => prev + 10);
    nextRound();
  };

  const handleSkip = () => {
    nextRound();
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    drawNewPrompt();
  };

  if (!currentPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-4 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Round {round} - {selectedPlayer}
          </h1>
          <div className="text-white">
            <span>Party Score: {score}</span>
          </div>
        </div>

        <PromptCard
          title={currentPrompt.category.replace(/_/g, " ").toUpperCase()}
          content={currentPrompt.text}
          type="prompt"
          intensity={currentPrompt.intensity}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />

        <div className="mt-8 space-y-4">
          <button
            onClick={drawNewPrompt}
            className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-xl hover:bg-white/30 transition-colors"
          >
            🎲 Draw New Prompt
          </button>

          <Link href={`/party/score?score=${score}&rounds=${round}`}>
            <button className="w-full bg-white text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              🏆 End Game & See Score
            </button>
          </Link>

          <Link
            href={`/party/spinner?intensity=${intensity}`}
            className="block text-center text-white/80 hover:text-white underline"
          >
            ← Back to spinner
          </Link>
        </div>
      </div>
    </div>
  );
}