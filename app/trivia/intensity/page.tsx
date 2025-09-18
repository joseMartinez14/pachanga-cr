"use client";

import { useState } from "react";
import Link from "next/link";
import { TriviaCategory } from "@/lib/game-logic/trivia";

export default function TriviaIntensityPage() {
  const [selectedCategory, setSelectedCategory] = useState<TriviaCategory | null>(null);

  const categories: Array<{
    value: TriviaCategory;
    label: string;
    description: string;
    emoji: string;
    color: string;
  }> = [
    {
      value: "general",
      label: "General Knowledge",
      description: "Mix of everything you should know",
      emoji: "🌎",
      color: "bg-gradient-to-br from-blue-400 to-blue-500"
    },
    {
      value: "movies_tv",
      label: "Movies & TV",
      description: "Film and television trivia",
      emoji: "🎥",
      color: "bg-gradient-to-br from-purple-400 to-purple-500"
    },
    {
      value: "music",
      label: "Music",
      description: "Songs, artists, and musical knowledge",
      emoji: "🎵",
      color: "bg-gradient-to-br from-pink-400 to-pink-500"
    },
    {
      value: "sports",
      label: "Sports",
      description: "Athletic achievements and records",
      emoji: "⚽",
      color: "bg-gradient-to-br from-green-400 to-green-500"
    },
    {
      value: "science_history",
      label: "Science & History",
      description: "Facts about our world and past",
      emoji: "🔬",
      color: "bg-gradient-to-br from-orange-400 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Choose Category
          </h1>
          <p className="text-white/80">
            Pick your trivia specialty
          </p>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`w-full p-6 rounded-2xl text-white transition-all duration-200 hover:scale-105 ${
                selectedCategory === category.value
                  ? "ring-4 ring-white scale-105"
                  : ""
              } ${category.color}`}
            >
              <div className="text-4xl mb-2">{category.emoji}</div>
              <h2 className="text-xl font-bold mb-2">{category.label}</h2>
              <p className="text-white/90">{category.description}</p>
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {selectedCategory && (
            <Link href={`/trivia/spinner?category=${selectedCategory}`}>
              <button className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
                Continue →
              </button>
            </Link>
          )}

          <Link
            href="/trivia"
            className="block text-center text-white/80 hover:text-white underline"
          >
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}