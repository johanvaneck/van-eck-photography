"use client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { createYocoCheckout } from "@/app/[tenant]/actions/checkout";

export function YocoCheckoutButton({
    amount,
    color,
    createYocoCheckoutAction,
}: {
    amount: number;
    color?: "primary" | "business";
    createYocoCheckoutAction: typeof createYocoCheckout;
}) {
    const [loading, setLoading] = useState(false);

    const [isPending, startTransition] = useTransition();

    async function handleCheckout() {
        setLoading(true);
        startTransition(async () => {
            try {
                const checkout = await createYocoCheckoutAction({
                    amount,
                    successUrl: window.location.origin + "/upgrade/success",
                    cancelUrl: window.location.origin + "/upgrade/cancelled",
                    failureUrl: window.location.origin + "/upgrade/failed",
                });
                if (checkout?.redirectUrl) {
                    window.location.href = checkout.redirectUrl;
                }
            } finally {
                setLoading(false);
            }
        });
    }

    return (
        <Button
            className={`w-full ${color === "business" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
            onClick={handleCheckout}
            disabled={loading || isPending}
            size="lg"
            variant={color === "business" ? "outline" : "default"}
        >
            {(loading || isPending) ? <Spinner className="mx-auto" /> : "Pay with Yoco"}
        </Button>
    );
}
