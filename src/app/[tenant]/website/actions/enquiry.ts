"use server";
import { db } from "@/lib/db";
import { enquiriesTable } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export async function submitEnquiry(
    form: {
        name: string;
        email: string;
        categoryId?: string;
        dateOfInterest?: string;
        message: string;
        userId: string;
    }
) {
    if (!form.name || !form.email || !form.message || !form.userId) {
        throw new Error("Missing fields");
    }
    await db.insert(enquiriesTable).values({
        id: "enquiry_" + nanoid(),
        name: form.name,
        email: form.email,
        categoryId: form.categoryId ?? null,
        dateOfInterest: form.dateOfInterest ?? "",
        message: form.message,
        userId: form.userId,
    });
    return { success: true };
}
