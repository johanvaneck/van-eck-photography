import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { routes } from "@/lib/routes";
import { headers } from "next/headers";

export default async function SuccessPage() {
    const hdrs = await headers();
    const session = await auth.api.getSession({ headers: hdrs });
    const userName = session?.user?.name;
    if (!userName) {
        redirect(routes.signIn);
    }
    redirect(routes.dashboard);
    return null;
}
