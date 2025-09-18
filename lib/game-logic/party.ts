import { z } from "zod";
import { pickIndex } from "../rng";

export const PartyIntensitySchema = z.enum(["PG", "18+", "Custom"]);
export type PartyIntensity = z.infer<typeof PartyIntensitySchema>;

export interface DrinkingPrompt {
  id: string;
  category: "never_have_i_ever" | "most_likely_to" | "waterfall" | "king_cup";
  intensity: PartyIntensity;
  text: string;
}

export interface PartyPlayer {
  id: string;
  name: string;
  isHost: boolean;
}

export interface PartyGameState {
  mode: "party";
  intensity: PartyIntensity;
  players: PartyPlayer[];
  currentRound: {
    number: number;
    selectedPlayer?: PartyPlayer;
    prompt?: DrinkingPrompt;
    seed: number;
  };
  scores: Record<string, number>;
}

export function selectPlayer(
  players: PartyPlayer[],
  seed: number
): PartyPlayer | null {
  if (players.length === 0) return null;
  const index = pickIndex(players.length, seed);
  return players[index];
}

export function filterPromptsByIntensity(
  prompts: DrinkingPrompt[],
  intensity: PartyIntensity
): DrinkingPrompt[] {
  if (intensity === "Custom") return prompts;
  return prompts.filter(p => p.intensity === intensity || p.intensity === "PG");
}

export function getRandomPrompt(
  prompts: DrinkingPrompt[],
  category?: DrinkingPrompt["category"]
): DrinkingPrompt | null {
  const filteredPrompts = category
    ? prompts.filter(p => p.category === category)
    : prompts;

  if (filteredPrompts.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
  return filteredPrompts[randomIndex];
}

export function calculatePartyPoints(
  participation: boolean,
  isMVP: boolean,
  category: DrinkingPrompt["category"]
): number {
  let points = 0;

  if (participation) {
    points += 5;

    const categoryBonus = {
      never_have_i_ever: 2,
      most_likely_to: 3,
      waterfall: 4,
      king_cup: 5
    };

    points += categoryBonus[category];
  }

  if (isMVP) points += 10;

  return points;
}