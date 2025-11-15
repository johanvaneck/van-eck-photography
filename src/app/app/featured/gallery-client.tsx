/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { markPictureFeatured } from "@/app/[tenant]/actions/pictures";

type PictureType = {
    id: string;
    lowResUrl: string;
    highResUrl: string;
    featured: boolean;
};

function CustomModal({ children, onClose, previewPicture }: { children: React.ReactNode; onClose: () => void; previewPicture: PictureType }) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center">
                {children}
            </div>
            <div className="absolute top-0 right-0 m-6 flex items-center gap-10 z-10">
                <a
                    href={previewPicture.highResUrl}
                    download
                    className="p-2 rounded-md bg-white/70 text-gray-800 hover:bg-white/90 transition cursor-pointer border border-gray-200 shadow-sm flex items-center justify-center"
                    aria-label="Download"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
                    </svg>
                </a>
                <button
                    className="p-2 rounded-md bg-white/70 text-gray-800 hover:bg-white/90 transition cursor-pointer border border-gray-200 shadow-sm flex items-center justify-center"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>,
        document.body,
    );
}

export function Gallery({ pictures, markPictureFeaturedAction }: {
    pictures: PictureType[];
    markPictureFeaturedAction: typeof markPictureFeatured;
}) {
    const [pictureList, setPictureList] = useState<PictureType[]>(pictures);
    const [previewPicture, setPreviewPicture] = useState<PictureType | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    async function handleToggleFeatured(picture: PictureType) {
        const newFeatured = !picture.featured;
        const { success } = await markPictureFeaturedAction({
            pictureId: picture.id,
            featured: newFeatured,
        });
        if (success) {
            setPictureList((prev) =>
                prev.map((p) =>
                    p.id === picture.id ? { ...p, featured: newFeatured } : p,
                ),
            );
        }
    }

    function handlePreview(picture: PictureType) {
        setPreviewPicture(picture);
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
        setPreviewPicture(null);
    }

    return (
        <>
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2">
                {pictureList.map((picture) => (
                    <div
                        key={picture.id}
                        className="mb-2 break-inside-avoid rounded-xs bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group relative"
                    >
                        <div onClick={() => handlePreview(picture)}>
                            <img
                                src={picture.lowResUrl}
                                alt={picture.id}
                                className="w-full h-auto object-cover rounded-xs"
                                width={300}
                                height={200}
                            />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2" style={{ zIndex: 2 }}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="p-1 rounded-full bg-white/80 shadow transition-colors hover:bg-blue-100"
                                        onClick={e => { e.stopPropagation(); handleToggleFeatured(picture); }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill={picture.featured ? "#3b82f6" : "none"}
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            className="w-5 h-5 cursor-pointer"
                                        >
                                            <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-7-4-7 4V4z" />
                                        </svg>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent sideOffset={6}>
                                    {picture.featured ? "Unmark as featured" : "Mark as featured"}
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>
            {dialogOpen && previewPicture && (
                <CustomModal onClose={handleClose} previewPicture={previewPicture}>
                    <div className="relative w-full h-[80vh] flex items-center justify-center">
                        <img
                            src={previewPicture.lowResUrl}
                            alt={previewPicture.id}
                            className="object-contain w-full h-full"
                        />
                    </div>
                </CustomModal>
            )}
        </>
    );
}
