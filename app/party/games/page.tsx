"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PartyGamesPage() {
  const searchParams = useSearchParams();
  const intensity = searchParams?.get("intensity") || "PG";

  const games = [
    {
      id: "drinking",
      title: "Drinking Challenges",
      description: "Never Have I Ever, Most Likely To, Waterfall",
      emoji: "🍺",
      href: `/party/spinner?intensity=${intensity}&game=drinking`
    },
    {
      id: "charades",
      title: "Charades",
      description: "Act it out and guess",
      emoji: "🎭",
      href: `/party/play?intensity=${intensity}&game=charades`
    },
    {
      id: "spin_bottle",
      title: "Spin the Bottle",
      description: "Classic party game with twists",
      emoji: "🔄",
      href: `/party/spinner?intensity=${intensity}&game=bottle`
    },
    {
      id: "kings_cup",
      title: "King's Cup",
      description: "Card-based drinking rules",
      emoji: "👑",
      href: `/party/play?intensity=${intensity}&game=kings`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Choose Your Game
          </h1>
          <p className="text-white/80">
            Pick your party game
          </p>
          <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mt-2">
            Intensity: {intensity}
          </span>
        </div>

        <div className="space-y-4">
          {games.map((game) => (
            <Link key={game.id} href={game.href}>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105">
                <div className="text-3xl mb-2">{game.emoji}</div>
                <h2 className="text-xl font-bold mb-2">{game.title}</h2>
                <p className="text-white/90">{game.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/party/intensity`}
            className="text-white/80 hover:text-white underline"
          >
            ← Back to intensity
          </Link>
        </div>
      </div>
    </div>
  );
}