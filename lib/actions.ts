"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "./supabaseAdmin";
import { GameMode } from "./schemas/intensity";

export async function createRoom(mode: GameMode) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const { data, error } = await supabaseAdmin
    .from("rooms")
    .insert({ mode, status: "active" })
    .select()
    .single();

  if (error) throw error;

  await supabaseAdmin.from("room_players").insert({
    room_id: data.id,
    user_id: userId,
    display_name: "Host",
    is_host: true
  });

  return data;
}

export async function joinRoom(roomId: string, displayName: string) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const { data, error } = await supabaseAdmin
    .from("room_players")
    .insert({
      room_id: roomId,
      user_id: userId,
      display_name: displayName,
      is_host: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function startRound(roomId: string, payload: any) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  // Verify user is in the room
  const { data: player } = await supabaseAdmin
    .from("room_players")
    .select("is_host")
    .eq("room_id", roomId)
    .eq("user_id", userId)
    .single();

  if (!player?.is_host) throw new Error("Only host can start rounds");

  const { data, error } = await supabaseAdmin
    .from("rounds")
    .insert({
      room_id: roomId,
      number: Date.now(),
      payload
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateScore(roomId: string, points: number) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const { data, error } = await supabaseAdmin
    .from("scores")
    .upsert({
      room_id: roomId,
      user_id: userId,
      points
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}