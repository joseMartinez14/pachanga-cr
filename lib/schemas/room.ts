import { z } from "zod";

export const RoomSchema = z.object({
  id: z.string().uuid(),
  mode: z.enum(["couple", "party", "trivia"]),
  status: z.string().default("active"),
  created_at: z.string().datetime(),
});

export const RoomPlayerSchema = z.object({
  id: z.string().uuid(),
  room_id: z.string().uuid(),
  user_id: z.string(),
  display_name: z.string(),
  is_host: z.boolean().default(false),
  joined_at: z.string().datetime(),
});

export const RoundSchema = z.object({
  id: z.string().uuid(),
  room_id: z.string().uuid(),
  number: z.number(),
  payload: z.record(z.any()),
  created_at: z.string().datetime(),
});

export const ScoreSchema = z.object({
  id: z.string().uuid(),
  room_id: z.string().uuid(),
  user_id: z.string(),
  points: z.number().default(0),
  updated_at: z.string().datetime(),
});

export type Room = z.infer<typeof RoomSchema>;
export type RoomPlayer = z.infer<typeof RoomPlayerSchema>;
export type Round = z.infer<typeof RoundSchema>;
export type Score = z.infer<typeof ScoreSchema>;