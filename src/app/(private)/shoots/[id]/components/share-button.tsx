"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ShareButton({ shootId }: { shootId: string }) {
    async function handleShare() {
        const url = `${window.location.origin}/public/${shootId}`;
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
    }

    return (
        <Button
            type="button"
            variant="outline"
            onClick={handleShare}
            aria-label="Share public preview"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 00-6 0v8a3 3 0 006 0V8zm6 4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Share
        </Button>
    );
}
