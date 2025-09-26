"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PriceListForm({ onSubmit, initial }: {
    onSubmit: (data: { title: string; description: string; price: number }) => void | Promise<void>;
    initial?: { title?: string; description?: string; price?: number };
}) {
    const [form, setForm] = useState({
        title: initial?.title || "",
        description: initial?.description || "",
        price: initial?.price?.toString() || ""
    });
    const [isPending, setPending] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setPending(true);
        await onSubmit({
            title: form.title,
            description: form.description,
            price: parseInt(form.price, 10)
        });
        setPending(false);
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
            <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
            <Input name="price" value={form.price} onChange={handleChange} placeholder="Price (ZAR)" type="number" min="0" required />
            <Button type="submit" disabled={isPending} className="w-full">{isPending ? "Saving..." : "Save"}</Button>
        </form>
    );
}
