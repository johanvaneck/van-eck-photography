"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { deletePicture, markPictureFeatured } from "@/app/actions/pictures";
import { toast } from "sonner";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { DeletePictureIcon } from "./delete-picture-icon";
import { Button } from "@/components/ui/button";

type PictureType = { id: string; lowResUrl: string; highResUrl: string; featured: boolean };

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

export function GalleryClient({
  pictures,
  markPictureFeaturedAction,
  deletePictureAction,
}: {
  pictures: PictureType[]
  markPictureFeaturedAction: typeof markPictureFeatured
  deletePictureAction: typeof deletePicture
}) {
  const [pictureList, setPictureList] = useState<PictureType[]>(pictures);

  async function handleToggleFeatured(picture: PictureType) {
    const newFeatured = !picture.featured;
    const { success } = await markPictureFeaturedAction({ pictureId: picture.id, featured: newFeatured });
    if (success) {
      setPictureList(prev => prev.map(p => p.id === picture.id ? { ...p, featured: newFeatured } : p));
      toast.success(newFeatured ? "Picture marked as featured" : "Picture unmarked as featured");
    } else {
      toast.error("Failed to update featured status");
    }
  }
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);

  async function handleDeletePicture(picture: PictureType) {
    const { success } = await deletePictureAction({ pictureId: picture.id });
    if (success) {
      setPictureList(prev => prev.filter(p => p.id !== picture.id));
      toast.success("Picture deleted");
    } else {
      toast.error("Failed to delete picture");
    }
    setDeleteDialogOpen(null);
  }

  const [previewPicture, setPreviewPicture] = useState<PictureType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-1">
        {pictureList.map((picture) => (
          <div
            key={picture.id}
            className="mb-1 break-inside-avoid rounded bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group relative"
          >
            <div onClick={() => handlePreview(picture)}>
              <Image
                src={picture.lowResUrl}
                alt={picture.id}
                className="w-full h-auto object-cover rounded"
                width={300}
                height={200}
                unoptimized
              />
            </div>
            <div className="absolute top-2 right-2 flex gap-2" style={{ zIndex: 2 }}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="p-1 rounded-full bg-white/80 shadow transition-colors hover:bg-blue-100"
                    onClick={() => handleToggleFeatured(picture)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={picture.featured ? "#3b82f6" : "none"} stroke="#3b82f6" strokeWidth={2} className="w-5 h-5 cursor-pointer">
                      <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-7-4-7 4V4z" />
                    </svg>
                  </button>
                </TooltipTrigger>
                <TooltipContent sideOffset={6}>
                  {picture.featured ? "Unmark as featured" : "Mark as featured"}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog open={deleteDialogOpen === picture.id} onOpenChange={open => setDeleteDialogOpen(open ? picture.id : null)}>
                    <DialogTrigger asChild>
                      <button
                        className="p-1 rounded-full bg-white/80 shadow transition-colors hover:bg-red-100"
                      >
                        <DeletePictureIcon />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle>Delete this picture?</DialogTitle>
                      <div className="flex flex-col gap-4 items-center justify-center">
                        <DeletePictureIcon className="w-8 h-8 mb-2" />
                        <div className="text-sm text-muted-foreground text-center mb-2">This action cannot be undone.</div>
                        <div className="flex gap-4 justify-center mt-2">
                          <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeletePicture(picture)}
                          >Delete</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent sideOffset={6}>
                  Delete picture
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      {dialogOpen && previewPicture && (
        <CustomModal onClose={handleClose} previewPicture={previewPicture}>
          <div className="relative w-full h-[80vh] flex items-center justify-center">
            <Image
              src={previewPicture.highResUrl}
              alt={previewPicture.id}
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