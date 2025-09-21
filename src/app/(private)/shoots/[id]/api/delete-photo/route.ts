import { deletePhoto } from "@/app/actions/photos-delete";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    const { user } = await auth.api.getSession(req);
    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    const { photoId } = await req.json();
    await deletePhoto({ photoId });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
