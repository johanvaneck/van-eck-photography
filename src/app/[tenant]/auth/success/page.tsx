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
    // Get current host and protocol
    const host = hdrs.get("host") || "";
    let protocol = "https";
    const forwardedProto = hdrs.get("x-forwarded-proto");
    if (forwardedProto) {
        protocol = forwardedProto;
    }
    // Replace subdomain with username
    const parts = host.split(".");
    if (parts.length > 2) {
        parts[0] = userName;
    } else {
        parts.unshift(userName);
    }
    const tenantHost = parts.join(".");
    redirect(`${protocol}://${tenantHost}${routes.dashboard}`);
    return null;
}
