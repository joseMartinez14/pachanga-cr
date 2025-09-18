export type GameMode = "couple" | "party" | "trivia";

export interface ScoreData {
  userId: string;
  points: number;
  mode: GameMode;
}

export function calculateCoupleScore(completed: boolean, streak: number): number {
  const basePoints = completed ? 10 : -5;
  const streakBonus = Math.min(streak, 5) * 2;
  return basePoints + streakBonus;
}

export function calculatePartyScore(participation: boolean, mvp: boolean): number {
  let points = 0;
  if (participation) points += 5;
  if (mvp) points += 10;
  return points;
}

export function calculateTriviaScore(
  correct: boolean,
  timeBonus: number,
  streak: number
): number {
  let points = 0;
  if (correct) {
    points += 10;
    points += Math.floor(timeBonus * 5);
    points += Math.min(streak, 10) * 2;
  }
  return points;
}