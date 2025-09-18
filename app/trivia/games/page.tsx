"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function TriviaGamesPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || "general";

  const modes = [
    {
      id: "ffa",
      title: "Free-for-All",
      description: "Individual competition - every player for themselves",
      emoji: "🏆",
      href: `/trivia/play?category=${category}&mode=ffa`
    },
    {
      id: "teams",
      title: "Team vs Team",
      description: "Split into teams and compete together",
      emoji: "👥",
      href: `/trivia/play?category=${category}&mode=teams`
    },
    {
      id: "rapid",
      title: "Rapid Fire",
      description: "Quick questions with short time limits",
      emoji: "⚡",
      href: `/trivia/play?category=${category}&mode=rapid`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Choose Game Mode
          </h1>
          <p className="text-white/80">
            Category: {category.replace("_", " ").toUpperCase()}
          </p>
        </div>

        <div className="space-y-4">
          {modes.map((mode) => (
            <Link key={mode.id} href={mode.href}>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105">
                <div className="text-3xl mb-2">{mode.emoji}</div>
                <h2 className="text-xl font-bold mb-2">{mode.title}</h2>
                <p className="text-white/90">{mode.description}</p>
              </div>
            </Link>
          ))}
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