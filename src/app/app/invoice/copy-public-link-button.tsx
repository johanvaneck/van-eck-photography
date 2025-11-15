"use client";
import { Button } from "@/components/ui/button";
import { Link2Icon } from "lucide-react";
import { useState } from "react";

export function CopyPublicLinkButton({ invoiceId }: { invoiceId: string }) {
    const [copied, setCopied] = useState(false);
    const publicUrl = typeof window !== "undefined"
        ? `${window.location.origin}/public/invoice/${invoiceId}`
        : `/public/invoice/${invoiceId}`;

    async function handleCopy() {
        await navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <Button variant="secondary" size="sm" className="gap-2" onClick={handleCopy}>
            <Link2Icon className="w-4 h-4" />
            {copied ? "Copied!" : "Copy Link"}
        </Button>
    );
}
