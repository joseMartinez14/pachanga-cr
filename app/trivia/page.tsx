import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/profiles";
import TriviaPageClient from "./TriviaPageClient";

export default async function TriviaPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await ensureProfile();

  return <TriviaPageClient />;
}