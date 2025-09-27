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
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ShootStatus } from "@/lib/enums";
import { Suspense } from "react";
import { CategorySelect } from "../../create/category-select";
import { Category, Shoot } from "@/lib/db/types";
import { updateShoot } from "@/app/[tenant]/actions/shoots";
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
    categories,
    updateShootAction,
}: {
    shoot: Shoot;
    categories: Array<Category>;
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
        const price_charged = formData.get("price_charged") ? parseFloat(formData.get("price_charged") as string) : undefined;
        const status = (formData.get("status") ?? "") as string;
        const notes = (formData.get("notes") ?? "") as string;
        const categoryId = formData.get("category_id")?.toString() || undefined;

        const data = {
            ...shoot,
            name,
            time,
            location,
            price_charged,
            status,
            notes,
            categoryId,
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4 rounded-lg bg-card w-full max-w-md mx-auto">
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

                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={shoot.status || ShootStatus.Booked}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ShootStatus.Booked}>{ShootStatus.Booked}</SelectItem>
                            <SelectItem value={ShootStatus.DepositPaid}>{ShootStatus.DepositPaid}</SelectItem>
                            <SelectItem value={ShootStatus.FullyPaid}>{ShootStatus.FullyPaid}</SelectItem>
                            <SelectItem value={ShootStatus.GalleryDelivered}>{ShootStatus.GalleryDelivered}</SelectItem>
                        </SelectContent>
                    </Select>

                    <Label htmlFor="price_charged">Price Charged</Label>
                    <Input
                        name="price_charged"
                        type="number"
                        defaultValue={shoot.price_charged?.toString() || ""}
                    />

                    <Label htmlFor="notes">Notes</Label>
                    <Input name="notes" defaultValue={shoot.notes || ""} />

                    <Label htmlFor="category_id">Category</Label>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CategorySelect
                            defaultValue={shoot.categoryId || ""}
                            categories={categories}
                        />
                    </Suspense>

                    <DialogFooter>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
