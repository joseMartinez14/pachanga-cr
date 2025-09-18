import { z } from "zod";

export const IntensitySchema = z.enum(["PG", "18+", "Custom"]);
export type Intensity = z.infer<typeof IntensitySchema>;

export const CoupleIntensitySchema = z.enum(["PG", "Romantic", "Spicy"]);
export type CoupleIntensity = z.infer<typeof CoupleIntensitySchema>;

export const GameModeSchema = z.enum(["couple", "party", "trivia"]);
export type GameMode = z.infer<typeof GameModeSchema>;