import { z } from "zod";

export const CoupleIntensitySchema = z.enum(["PG", "Romantic", "Spicy"]);
export type CoupleIntensity = z.infer<typeof CoupleIntensitySchema>;

export interface TruthDareCard {
  id: string;
  type: "truth" | "dare";
  intensity: CoupleIntensity;
  text: string;
}

export interface CoupleGameState {
  mode: "couple";
  intensity: CoupleIntensity;
  currentCard?: TruthDareCard;
  score: {
    player1: number;
    player2: number;
  };
  streak: number;
  round: number;
}

export function filterCardsByIntensity(
  cards: TruthDareCard[],
  intensity: CoupleIntensity
): TruthDareCard[] {
  if (intensity === "Spicy") {
    return cards;
  }
  if (intensity === "Romantic") {
    return cards.filter(c => c.intensity !== "Spicy");
  }
  return cards.filter(c => c.intensity === "PG");
}

export function getRandomCard(
  cards: TruthDareCard[],
  type?: "truth" | "dare"
): TruthDareCard | null {
  const filteredCards = type ? cards.filter(c => c.type === type) : cards;
  if (filteredCards.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filteredCards.length);
  return filteredCards[randomIndex];
}

export function calculateCouplePoints(
  completed: boolean,
  streak: number,
  intensity: CoupleIntensity
): number {
  let basePoints = completed ? 10 : -5;

  const intensityMultiplier = {
    PG: 1,
    Romantic: 1.5,
    Spicy: 2
  };

  const streakBonus = Math.min(streak, 5) * 2;

  return Math.floor((basePoints * intensityMultiplier[intensity]) + streakBonus);
}