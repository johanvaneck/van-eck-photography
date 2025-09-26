import { getUserWebsiteData } from "@/app/actions/website";
import WebsitePriceListSection from "@/app/website/[userName]/price-list-section";
import { notFound } from "next/navigation";
import WebsiteGalleryClient from "./website-gallery-client";


export default async function WebsitePage({
    params
}: {
    params: Promise<{ userName: string }>
}) {
    const { userName } = await params;
    const data = await getUserWebsiteData(userName);
    if (!data) return notFound();
    const { user, categories, featuredPictures, priceList } = data;

    return (
        <main className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-300 text-neutral-900 flex flex-col">
            <header className="w-full py-14 px-4 flex flex-col items-center justify-center bg-neutral-50 border-b border-neutral-300 mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-2 text-neutral-800 text-center">
                    {user.displayName}
                </h1>
            </header>
            <div className="flex-1 pb-16">
                <WebsiteGalleryClient categories={categories} featuredPictures={featuredPictures} />
                <WebsitePriceListSection priceList={priceList} />
            </div>
        </main>
    );
}
