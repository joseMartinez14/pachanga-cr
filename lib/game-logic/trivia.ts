import { z } from "zod";

export const TriviaMode = z.enum(["ffa", "teams", "rapid"]);
export type TriviaMode = z.infer<typeof TriviaMode>;

export const TriviaCategory = z.enum([
  "general",
  "movies_tv",
  "music",
  "sports",
  "science_history"
]);
export type TriviaCategory = z.infer<typeof TriviaCategory>;

export interface TriviaQuestion {
  id: string;
  category: TriviaCategory;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  choices: string[];
  answer_index: number;
}

export interface TriviaPlayer {
  id: string;
  name: string;
  team?: string;
}

export interface TriviaAnswer {
  playerId: string;
  choiceIndex: number;
  timestamp: number;
}

export interface TriviaGameState {
  mode: "trivia";
  gameMode: TriviaMode;
  category: TriviaCategory;
  players: TriviaPlayer[];
  currentQuestion?: TriviaQuestion;
  questionStartTime?: number;
  answers: TriviaAnswer[];
  scores: Record<string, number>;
  round: number;
  timeLimit: number; // seconds
}

export function calculateTriviaPoints(
  correct: boolean,
  answerTime: number, // milliseconds
  timeLimit: number, // seconds
  streak: number,
  difficulty: TriviaQuestion["difficulty"]
): number {
  if (!correct) return 0;

  let basePoints = 10;

  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2
  };

  basePoints *= difficultyMultiplier[difficulty];

  const timeBonus = Math.max(0, 1 - (answerTime / (timeLimit * 1000))) * 5;

  const streakBonus = Math.min(streak, 10) * 2;

  return Math.floor(basePoints + timeBonus + streakBonus);
}

export function getTimeRemaining(
  startTime: number,
  timeLimit: number
): number {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, timeLimit * 1000 - elapsed);
  return Math.ceil(remaining / 1000);
}

export function isAnswerCorrect(
  question: TriviaQuestion,
  choiceIndex: number
): boolean {
  return question.answer_index === choiceIndex;
}

export function calculateTeamScore(
  teamPlayers: TriviaPlayer[],
  scores: Record<string, number>
): number {
  return teamPlayers.reduce((total, player) => {
    return total + (scores[player.id] || 0);
  }, 0);
}

export function getLeaderboard(
  players: TriviaPlayer[],
  scores: Record<string, number>,
  gameMode: TriviaMode
): Array<{ player: TriviaPlayer; score: number; rank: number }> {
  const leaderboard = players
    .map(player => ({
      player,
      score: scores[player.id] || 0,
      rank: 0
    }))
    .sort((a, b) => b.score - a.score);

  let currentRank = 1;
  for (let i = 0; i < leaderboard.length; i++) {
    if (i > 0 && leaderboard[i].score < leaderboard[i - 1].score) {
      currentRank = i + 1;
    }
    leaderboard[i].rank = currentRank;
  }

  return leaderboard;
}