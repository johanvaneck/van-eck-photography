"use server";
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

export async function createYocoCheckout({ amount, successUrl, cancelUrl, failureUrl }: {
    amount: number;
    successUrl: string;
    cancelUrl?: string;
    failureUrl?: string;
}) {
    const res = await fetch("https://payments.yoco.com/api/checkouts", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${YOCO_SECRET_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount,
            currency: "ZAR", // Yoco only supports ZAR
            successUrl,
            cancelUrl,
            failureUrl,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to create Yoco checkout session");
    }

    return await res.json();
}
