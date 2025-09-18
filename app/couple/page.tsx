import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/profiles";
import CouplePageClient from "./CouplePageClient";

export default async function CouplePage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await ensureProfile();

  return <CouplePageClient />;
}