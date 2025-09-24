"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PromptCard } from "@/components/PromptCard";
import { BackButton } from "@/components/BackButton";
import { CoupleIntensity } from "@/lib/game-logic/couple";
import { useUser } from "@clerk/nextjs";

interface GameContent {
  id: string;
  type: string;
  prompt?: string;
  text?: string;
  option_a?: string;
  option_b?: string;
  choices?: string[];
  category?: string;
  theme?: string;
  spice_level?: string;
  spice?: string;
}

interface ApiResponse {
  items: GameContent[];
  meta: {
    source: string;
    locale: string;
    seed: string | null;
  };
}

export default function CouplePlayPage() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const intensity = (searchParams?.get("intensity") || "light") as CoupleIntensity;
  const game = searchParams?.get("game") || "truth_dare";

  const [currentContent, setCurrentContent] = useState<GameContent | null>(null);
  const [gameItems, setGameItems] = useState<GameContent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => `couple_session_${Date.now()}`);

  useEffect(() => {
    fetchGameContent();
  }, [intensity, game]);

  const getGameConfig = (gameType: string) => {
    switch (gameType) {
      case "truth_dare":
        return {
          game_name: "CoupleMode_TruthOrDare",
          specific_params: {
            spice_level: intensity,
            count: 10,
            truth_or_dare: "both",
            avoid: []
          }
        };
      case "quiz":
      case "couple_quiz":
        return {
          game_name: "CoupleMode_CoupleQuiz",
          specific_params: {
            spice_level: intensity,
            count: 10,
            relationship_stage: "dating",
            avoid: []
          }
        };
      case "would_rather":
        return {
          game_name: "CoupleMode_WouldYouRather",
          specific_params: {
            spice_level: intensity,
            count: 10,
            avoid: []
          }
        };
      case "story":
      case "story_builder":
        return {
          game_name: "CoupleMode_StoryBuilder",
          specific_params: {
            theme: "romantic",
            count: 10,
            avoid: []
          }
        };
      default:
        return {
          game_name: "CoupleMode_TruthOrDare",
          specific_params: {
            spice_level: intensity,
            count: 10,
            truth_or_dare: "both",
            avoid: []
          }
        };
    }
  };

  const fetchGameContent = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const config = getGameConfig(game);

      const response = await fetch('/api/game-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          session_id: sessionId,
          game_name: config.game_name,
          locale: "en-US",
          specific_params: config.specific_params
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      setGameItems(data.items);
      setCurrentIndex(0);
      if (data.items.length > 0) {
        setCurrentContent(data.items[0]);
      }
    } catch (err) {
      console.error('Error fetching game content:', err);
      setError('Failed to load game content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const drawNewCard = () => {
    if (currentIndex < gameItems.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentContent(gameItems[nextIndex]);
    } else {
      // Fetch more content when we run out
      fetchGameContent();
    }
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

  const getGameTitle = (gameType: string) => {
    switch (gameType) {
      case "truth_dare":
        return "Truth or Dare";
      case "quiz":
      case "couple_quiz":
        return "Couple Quiz";
      case "would_rather":
        return "Would You Rather";
      case "story":
      case "story_builder":
        return "Story Builder";
      default:
        return "Couple Game";
    }
  };

  const renderContent = (content: GameContent) => {
    switch (content.type) {
      case "truth":
      case "dare":
        return (
          <PromptCard
            title={content.type === "truth" ? "Truth" : "Dare"}
            content={content.prompt || content.text || ""}
            type={content.type as "truth" | "dare"}
            intensity={intensity}
            onComplete={handleComplete}
            onSkip={handleSkip}
          />
        );

      case "would_you_rather":
        return (
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Would You Rather?</h3>
            <div className="space-y-4">
              <div className="card bg-blue-50 p-4 border-2 border-blue-200">
                <strong className="text-blue-700">Option A:</strong> {content.option_a}
              </div>
              <div className="text-2xl font-bold text-secondary">OR</div>
              <div className="card bg-green-50 p-4 border-2 border-green-200">
                <strong className="text-green-700">Option B:</strong> {content.option_b}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <motion.button
                onClick={handleComplete}
                className="flex-1 btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ✅ Discussed
              </motion.button>
              <motion.button
                onClick={handleSkip}
                className="flex-1 btn-secondary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ⏭️ Skip
              </motion.button>
            </div>
          </div>
        );

      case "quiz":
        return (
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Quiz Question</h3>
            <p className="text-lg text-secondary mb-6">{content.prompt}</p>
            {content.choices && (
              <div className="space-y-2 mb-6">
                {content.choices.map((choice, index) => (
                  <div key={index} className="card bg-gray-50 p-3 text-left">
                    <strong className="text-primary">{String.fromCharCode(65 + index)}:</strong> {choice}
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4">
              <motion.button
                onClick={handleComplete}
                className="flex-1 btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ✅ Answered
              </motion.button>
              <motion.button
                onClick={handleSkip}
                className="flex-1 btn-secondary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ⏭️ Skip
              </motion.button>
            </div>
          </div>
        );

      case "story_starter":
        return (
          <div className="card p-6 text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Story Starter</h3>
            <div className="card bg-purple-50 p-4 border-2 border-purple-200 mb-6">
              <p className="text-lg text-secondary italic">{content.prompt}</p>
            </div>
            <p className="text-sm text-secondary mb-6">Take turns adding to this story together!</p>
            <div className="flex gap-4">
              <motion.button
                onClick={handleComplete}
                className="flex-1 btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ✅ Story Told
              </motion.button>
              <motion.button
                onClick={handleSkip}
                className="flex-1 btn-secondary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ⏭️ Skip
              </motion.button>
            </div>
          </div>
        );

      default:
        return (
          <div className="card p-6 text-center">
            <p className="text-lg text-secondary">{content.prompt || content.text || "No content available"}</p>
            <div className="flex gap-4 mt-6">
              <motion.button
                onClick={handleComplete}
                className="flex-1 btn-primary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ✅ Done
              </motion.button>
              <motion.button
                onClick={handleSkip}
                className="flex-1 btn-secondary"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                ⏭️ Skip
              </motion.button>
            </div>
          </div>
        );
    }
  };

  if (loading) {
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
          <p className="text-secondary">Loading your game...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-primary mb-4">Oops!</h2>
          <p className="text-secondary mb-6">{error}</p>
          <motion.button
            onClick={() => fetchGameContent()}
            className="btn-primary"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        </div>
      </div>
    );
  }

  if (!currentContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">💕</div>
          <p className="text-secondary">No content available</p>
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
          <h1 className="text-3xl font-bold text-primary mb-2">
            {getGameTitle(game)}
          </h1>
          <p className="text-secondary mb-4">Round {round}</p>
          <div className="flex justify-center gap-6">
            <div className="card p-3 text-center">
              <div className="text-sm text-secondary">Score</div>
              <div className="text-lg font-semibold text-primary">{score.player1}</div>
            </div>
            <div className="card p-3 text-center">
              <div className="text-sm text-secondary">Streak</div>
              <div className="text-lg font-semibold text-primary">{streak}</div>
            </div>
            <div className="card p-3 text-center">
              <div className="text-sm text-secondary">Intensity</div>
              <div className="text-lg font-semibold text-primary capitalize">{intensity}</div>
            </div>
          </div>
        </motion.div>

        {/* Game Content */}
        <motion.div
          key={currentContent.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {renderContent(currentContent)}
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
          <BackButton href={`/couple`} label="Back to home" />
        </motion.div>
      </div>
    </div>
  );
}