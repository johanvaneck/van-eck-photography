"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { PriceListForm } from "./price-list-form";

export function EditPriceListDialog({ item, onEdit }: {
    item: { id: string; title: string; description: string; price: number };
    onEdit: (data: { title: string; description: string; price: number }) => void | Promise<void>;
}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <EditIcon className="w-4 h-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle>Edit Price List Item</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Update the details for this price list item.
                    </DialogDescription>
                </DialogHeader>
                <PriceListForm initial={item} onSubmit={async (data) => {
                    await onEdit(data);
                    setOpen(false);
                }} />
            </DialogContent>
        </Dialog>
    );
}
