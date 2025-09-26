"use server";
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { priceListTable } from '@/lib/db/schema';
import { PriceListItem, CreatePriceListItem } from '@/lib/db/types';
import { tryCatch, Result } from '@/lib/types/result';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/dist/server/request/headers';

export async function getPriceList(): Promise<Result<PriceListItem[]>> {
    return await tryCatch(
        db.select().from(priceListTable)
    );
}

export async function getPriceListItemById(id: string): Promise<Result<PriceListItem>> {
    const { error, data } = await tryCatch(
        db.select().from(priceListTable).where(eq(priceListTable.id, id)).limit(1)
    );
    if (error) {
        return { data: null, error };
    }
    if (!data[0]) {
        return { data: null, error: new Error('Item not found') };
    }
    return { data: data[0], error: null };
}

export async function createPriceListItem(data: Omit<CreatePriceListItem, 'userId'>): Promise<Result<PriceListItem>> {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user.id;
    if (!userId) {
        return { data: null, error: new Error('User not found') };
    }
    const itemData = { ...data, userId };
    const { error, data: resultData } = await tryCatch(
        db.insert(priceListTable).values(itemData).returning()
    );
    if (error) {
        return { data: null, error };
    }
    if (!resultData[0]) {
        return { data: null, error: new Error('Creation failed') };
    }
    revalidatePath('/price-list');
    return { data: resultData[0], error: null };
}

export async function updatePriceListItem(id: string, data: Partial<CreatePriceListItem>): Promise<Result<PriceListItem>> {
    const { error, data: resultData } = await tryCatch(
        db.update(priceListTable).set(data).where(eq(priceListTable.id, id)).returning()
    );
    if (error) {
        return { data: null, error };
    }
    if (!resultData[0]) {
        return { data: null, error: new Error('Update failed') };
    }
    revalidatePath('/price-list');
    return { data: resultData[0], error: null };
}

export async function deletePriceListItem(id: string): Promise<Result<null>> {
    const { error } = await tryCatch(
        db.delete(priceListTable).where(eq(priceListTable.id, id))
    );
    if (error) {
        return { data: null, error };
    }
    revalidatePath('/price-list');
    return { data: null, error: null };
}
