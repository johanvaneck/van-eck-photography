"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PriceListForm } from "./price-list-form";

export function CreatePriceListDialog({ onCreate }: { onCreate: (data: { title: string; description: string; price: number }) => void | Promise<void> }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Add Item
                </Button>
            </DialogTrigger>
            <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle>Add Price List Item</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill out the form to add a new price list item.
                    </DialogDescription>
                </DialogHeader>
                <PriceListForm onSubmit={async (data) => {
                    await onCreate(data);
                    setOpen(false);
                }} />
            </DialogContent>
        </Dialog>
    );
}
