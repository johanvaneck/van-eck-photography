import { authClient } from "@/lib/auth/client";
import { redirect } from "next/navigation";

export default async function Page() {
  await authClient.signOut();
  return redirect("/auth/sign-in");
}
