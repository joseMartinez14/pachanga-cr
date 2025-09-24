"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "./supabaseAdmin";

export async function ensureProfile() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await currentUser();
  const username =
    user?.username ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "player";

  const { data } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (!data) {
    await supabaseAdmin
      .from("profiles")
      .insert({ id: userId, username });
  }
}

export async function getProfile(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}