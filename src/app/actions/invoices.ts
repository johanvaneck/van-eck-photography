"use server";
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { invoicesTable } from '@/lib/db/schema';
import { Invoice, CreateInvoice } from '@/lib/db/types';
import { tryCatch, Result } from '@/lib/types/result';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/dist/server/request/headers';


export async function getInvoices(): Promise<Result<Invoice[]>> {
    return await tryCatch(
        db.select().from(invoicesTable)
    );
}

export async function getInvoiceById(id: string): Promise<Result<Invoice>> {
    const { error, data } = await tryCatch(
        db.select().from(invoicesTable).where(eq(invoicesTable.id, id)).limit(1)
    );
    if (error) {
        return {
            data: null,
            error,
        };
    }
    if (!data[0]) {
        return {
            data: null,
            error: new Error('Invoice not found'),
        };
    }
    return {
        data: data[0],
        error: null,
    };
}

export async function createInvoice(data: Omit<CreateInvoice, 'userId' | 'invoiceNumber'>): Promise<Result<Invoice>> {
    const session = await auth.api.getSession({ headers: await headers() });

    const userId = session?.user.id;
    if (!userId) {
        return {
            data: null,
            error: new Error('User not found'),
        };
    }
    // Find the max invoice number for the user
    const { data: userInvoices, error: fetchError } = await tryCatch(
        db
            .select()
            .from(invoicesTable)
            .where(
                eq(invoicesTable.userId, userId)
            )
    );

    if (fetchError) {
        return {
            data: null,
            error: fetchError,
        };
    }
    // Parse invoice numbers and find max
    let nextInvoiceNumber = 1;
    if (userInvoices && userInvoices.length > 0) {
        const numbers = userInvoices
            .map(inv => parseInt(inv.invoiceNumber, 10))
            .filter(n => !isNaN(n));
        if (numbers.length > 0) {
            nextInvoiceNumber = Math.max(...numbers) + 1;
        }
    }
    // Set the invoice number
    const invoiceData = {
        ...data,
        invoiceNumber: String(nextInvoiceNumber),
        userId,
    };
    const { error, data: resultData } = await tryCatch(
        db.insert(invoicesTable).values(invoiceData).returning()
    );
    if (error) {
        return {
            data: null,
            error,
        };
    }
    if (!resultData[0]) {
        return {
            data: null,
            error: new Error('Invoice creation failed'),
        };
    }
    revalidatePath('/invoice');
    return {
        data: resultData[0],
        error: null,
    };
}
