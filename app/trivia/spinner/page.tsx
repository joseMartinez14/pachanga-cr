"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Timer } from "@/components/Timer";

export default function TriviaSpinnerPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "general";

  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleTimeUp = () => {
    setGameStarted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Get Ready!
          </h1>
          <p className="text-white/80">
            Category: {category.replace("_", " ").toUpperCase()}
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          {!gameStarted ? (
            <>
              <div className="mb-6">
                <Timer
                  duration={10}
                  onTimeUp={handleTimeUp}
                  size="lg"
                />
              </div>
              <p className="text-white/80 text-center">
                Game starts when timer reaches zero!
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">💥</div>
              <h2 className="text-2xl font-bold text-white mb-4">Let's Play!</h2>
              <Link href={`/trivia/play?category=${category}`}>
                <button className="bg-white text-gray-800 py-4 px-8 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
                  Start Quiz →
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-3">How to Play:</h2>
          <ul className="space-y-2 text-white/90">
            <li>• Read each question carefully</li>
            <li>• Select your answer before time runs out</li>
            <li>• Faster answers get bonus points</li>
            <li>• Build streaks for extra points</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/trivia/intensity`}
            className="text-white/80 hover:text-white underline"
          >
            ← Back to categories
          </Link>
        </div>
      </div>
    </div>
  );
}