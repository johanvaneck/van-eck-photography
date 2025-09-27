"use server";
import { db } from "@/lib/db";
import { enquiriesTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { AsyncResult, tryCatch } from "@/lib/types/result";

export async function getEnquiries(userId: string) {
    const { error, data } = await tryCatch(
        db.select().from(enquiriesTable).where(eq(enquiriesTable.userId, userId))
    );
    if (error) {
        console.error("Error fetching enquiries:", error);
        return {
            data: null,
            error,
        };
    }
    return {
        data,
        error: null,
    };
}

export async function deleteEnquiry(id: string, userId: string): AsyncResult<boolean> {
    const { error } = await tryCatch(
        db.delete(enquiriesTable).where(eq(enquiriesTable.id, id))
    )

    if (error) {
        console.error("Error deleting enquiry:", error);
        return {
            data: null,
            error,
        };
    }

    return {
        data: true,
        error: null,
    };
}
