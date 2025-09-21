
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getFeaturedPicturesWithPresignedLowResUrls, markPictureFeatured } from "@/app/actions/pictures";
import { Gallery } from "./gallery-client";

export default async function FeaturedPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
        return <div className="p-8 text-center">Please sign in</div>;
    }
    const pictures = await getFeaturedPicturesWithPresignedLowResUrls(userId);
    if (!pictures.length) {
        return <div className="p-8 text-center">No featured pictures found.</div>;
    }
    const galleryPictures = pictures.map((pic) => ({
        id: pic.id,
        lowResUrl: pic.lowResUrl,
        highResUrl: pic.s3Path, // or pic.highResUrl if available
        featured: pic.featured,
    }));

    return (
        <Gallery
            pictures={galleryPictures}
            markPictureFeaturedAction={markPictureFeatured}
        />
    );
}
