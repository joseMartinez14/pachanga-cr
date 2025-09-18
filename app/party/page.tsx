import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/profiles";
import PartyPageClient from "./PartyPageClient";

export default async function PartyPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await ensureProfile();

  return <PartyPageClient />;
}