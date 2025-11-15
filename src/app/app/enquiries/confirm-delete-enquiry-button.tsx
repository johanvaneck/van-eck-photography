"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon, Loader2 } from "lucide-react";

export function ConfirmDeleteEnquiryButton({ onConfirm }: { onConfirm: () => Promise<void> }) {
    const [loading, setLoading] = useState(false);

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await onConfirm();
        setLoading(false);
    }

    return (
        <form onSubmit={handleDelete}>
            <Button variant="destructive" size="sm" className="gap-2" type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrashIcon className="w-4 h-4" />}
                Delete
            </Button>
        </form>
    );
}
