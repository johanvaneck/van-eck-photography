import { authClient } from "@/lib/auth/client";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function Page() {
  await authClient.signOut();
  return redirect(routes.signIn);
}
