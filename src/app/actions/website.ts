import { Metadata } from "next";
import { getUserWebsiteData } from "./pictures";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: { userName: string } }): Promise<Metadata> {
    const hdrs = await headers();
    const host = hdrs.get("host");
    const data = await getUserWebsiteData(params.userName);
    if (!data) return {};
    return {
        title: `${data.user.displayName} | Portfolio`,
        description: `Photography portfolio for ${data.user.displayName}`,
        openGraph: {
            title: `${data.user.displayName} | Portfolio`,
            description: `Photography portfolio for ${data.user.displayName}`,
            url: `https://${host}/website/${params.userName}`,
            images: data.featuredPictures.length > 0 ? [{ url: data.featuredPictures[0].lowResUrl }] : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${data.user.displayName} | Portfolio`,
            description: `Photography portfolio for ${data.user.displayName}`,
            images: data.featuredPictures.length > 0 ? [data.featuredPictures[0].lowResUrl] : [],
        },
    };
}
