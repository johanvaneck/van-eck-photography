"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WebsiteGalleryClient({ categories, featuredPictures }: {
    categories: { id: string; name: string }[];
    featuredPictures: { id: string; lowResUrl: string; categoryName: string }[];
}) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredPictures = selectedCategory
        ? featuredPictures.filter(pic => pic.categoryName === categories.find(cat => cat.id === selectedCategory)?.name)
        : featuredPictures;

    return (
        <section className="w-full max-w-5xl mx-auto px-4">
            <div className="flex gap-3 mb-10 justify-center flex-wrap">
                <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    className=""
                    onClick={() => setSelectedCategory(null)}
                >
                    All
                </Button>
                {categories.map((cat) => (
                    <Button
                        key={cat.id}
                        variant={selectedCategory === cat.id ? "default" : "outline"}
                        className=""
                        onClick={() => setSelectedCategory(cat.id)}
                    >
                        {cat.name}
                    </Button>
                ))}
            </div>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
                {filteredPictures.map((pic) => (
                    <img
                        className="mb-2 hover:animate-pulse rounded-xs cursor-pointer"
                        key={pic.id}
                        src={pic.lowResUrl}
                        alt={pic.id}
                    />
                ))}
            </div>
        </section>
    );
}
