"use client";
import { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/actions/shoots";
import { toast } from "sonner";

function formatLocalDateTime(dateString: string): string {
    const date = new Date(dateString);
    // Convert to local time and strip seconds/milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function EditShootDialog({
    shoot,
    updateShootAction,
}: {
    shoot: Shoot;
    updateShootAction: typeof updateShoot;
}) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const name = (formData.get("name") ?? "") as string;
        const time = (formData.get("time") ?? "") as string;
        const location = (formData.get("location") ?? "") as string;
        const depositRaw = formData.get("deposit");
        const priceChargedRaw = formData.get("price_charged");
        const status = (formData.get("status") ?? "") as string;
        const notes = (formData.get("notes") ?? "") as string;

        const deposit =
            depositRaw && depositRaw.toString().trim() !== ""
                ? parseFloat(depositRaw.toString())
                : undefined;
        const price_charged =
            priceChargedRaw && priceChargedRaw.toString().trim() !== ""
                ? parseFloat(priceChargedRaw.toString())
                : undefined;

        const data = {
            ...shoot,
            name,
            time,
            location,
            deposit,
            price_charged,
            status,
            notes,
        };

        const { error } = await updateShootAction(data);

        if (error) {
            toast.error("Failed to update shoot");
        } else {
            toast.success("Shoot updated");
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Shoot</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label htmlFor="name">Name</Label>
                    <Input name="name" defaultValue={shoot.name || ""} />
                    <Label htmlFor="time">Time</Label>
                    <Input
                        name="time"
                        type="datetime-local"
                        color="primary"
                        defaultValue={shoot.time ? formatLocalDateTime(shoot.time) : ""}
                    />
                    <Label htmlFor="location">Location</Label>
                    <Input name="location" defaultValue={shoot.location || ""} />
                    <Label htmlFor="price_charged">Price Charged</Label>
                    <Input
                        name="price_charged"
                        type="number"
                        defaultValue={shoot.price_charged?.toString() || ""}
                    />
                    <Label htmlFor="status">Status</Label>
                    <Input name="status" defaultValue={shoot.status || ""} />
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea name="notes" defaultValue={shoot.notes || ""} />
                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
