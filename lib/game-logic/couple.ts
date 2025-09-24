import { z } from "zod";

export const CoupleIntensitySchema = z.enum(["light", "medium", "heavy", "explicit"]);
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
  if (intensity === "explicit") {
    return cards;
  }
  if (intensity === "heavy") {
    return cards.filter(c => c.intensity !== "explicit");
  }
  if (intensity === "medium") {
    return cards.filter(c => c.intensity !== "explicit" && c.intensity !== "heavy");
  }
  return cards.filter(c => c.intensity === "light");
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
    light: 1,
    medium: 1.5,
    heavy: 2,
    explicit: 2.5
  };

  const streakBonus = Math.min(streak, 5) * 2;

  return Math.floor((basePoints * intensityMultiplier[intensity]) + streakBonus);
}