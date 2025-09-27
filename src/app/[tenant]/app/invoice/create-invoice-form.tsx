"use client";
import React, { useState, useTransition } from "react";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { createInvoice } from "@/app/[tenant]/actions/invoices";

export default function CreateInvoiceForm({
    onCreated,
    createInvoiceAction
}: {
    onCreated?: () => void,
    createInvoiceAction: typeof createInvoice
}) {
    const today = new Date().toISOString().slice(0, 10);
    const [form, setForm] = useState({
        date: today,
        clientName: "",
        description: "",
        amount: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
            try {
                const result = await createInvoiceAction({
                    id: "inv_" + nanoid(),
                    date: form.date,
                    clientName: form.clientName,
                    description: form.description,
                    amount: parseInt(form.amount, 10),
                });
                if (result.error) setError(result.error.message);
                else {
                    setForm({ date: today, clientName: "", description: "", amount: "" });
                    if (onCreated) onCreated();
                }
            } catch (err) {
                setError((err as Error).message);
            }
        });
    };

    return (
        <form className="mb-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input name="date" id="date" value={form.date} onChange={handleChange} type="date" required autoComplete="off" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input name="clientName" id="clientName" value={form.clientName} onChange={handleChange} placeholder="Client Name" required autoComplete="off" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea name="description" id="description" value={form.description} onChange={handleChange} placeholder="Description" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input name="amount" id="amount" value={form.amount} onChange={handleChange} placeholder="Amount" required type="number" min="0" autoComplete="off" />
                </div>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
                {isPending ? <Spinner className="w-4 h-4 mr-2 inline-block align-middle" /> : "Create Invoice"}
            </Button>
        </form>
    );
}
