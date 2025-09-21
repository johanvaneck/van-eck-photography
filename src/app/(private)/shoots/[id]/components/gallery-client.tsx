"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type PhotoType = { id: string; lowResUrl: string; highResUrl: string };

function CustomModal({ children, onClose, previewPhoto }: { children: React.ReactNode; onClose: () => void; previewPhoto: PhotoType }) {
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
          href={previewPhoto.highResUrl}
          download
          className="p-2 rounded-md bg-white/70 text-gray-800 hover:bg-white/90 transition cursor-pointer border border-gray-200 shadow-sm flex items-center justify-center"
          aria-label="Download"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4m-8 8h8" />
          </svg>
        </a>
        <button
          className="p-2 rounded-md bg-white/70 text-gray-800 hover:bg-white/90 transition cursor-pointer border border-gray-200 shadow-sm flex items-center justify-center"
          onClick={onClose}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}

export function GalleryClient({ photos }: { photos: PhotoType[] }) {
  const [previewPhoto, setPreviewPhoto] = useState<PhotoType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handlePreview(photo: PhotoType) {
    setPreviewPhoto(photo);
    setDialogOpen(true);
  }

  function handleClose() {
    setDialogOpen(false);
    setPreviewPhoto(null);
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="mb-1 break-inside-avoid rounded bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group"
            onClick={() => handlePreview(photo)}
          >
            <Image
              src={photo.lowResUrl}
              alt={photo.id}
              className="w-full h-auto object-cover rounded"
              width={300}
              height={200}
              unoptimized
            />
          </div>
        ))}
      </div>
      {dialogOpen && previewPhoto && (
        <CustomModal onClose={handleClose} previewPhoto={previewPhoto}>
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
              src={previewPhoto.highResUrl}
              alt={previewPhoto.id}
              fill
              className="object-contain w-full h-full"
              unoptimized
              priority
            />
          </div>
        </CustomModal>
      )}
    </>
  );
}