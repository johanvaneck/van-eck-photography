import { getPriceList, createPriceListItem, deletePriceListItem, updatePriceListItem } from "@/app/actions/price-list";
import { nanoid } from "nanoid";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CreatePriceListDialog from "@/app/(private)/price-list/create-price-list-dialog";
import EditPriceListDialog from "@/app/(private)/price-list/edit-price-list-dialog";

import { ConfirmDeleteDialog } from "@/app/(private)/invoice/confirm-delete-dialog";
import { TrashIcon } from "lucide-react";

export default async function PriceListPage() {
    const { data: items, error } = await getPriceList();

    return (
        <div className="w-full min-h-screen">
            <div className="flex items-center justify-between mb-6 px-8 pt-8">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">Price List</h1>
                    <Badge variant="outline" className="ml-2">Pro</Badge>
                </div>
                <CreatePriceListDialog onCreate={async (data: { title: string; description: string; price: number }) => {
                    "use server";
                    await createPriceListItem({ ...data, id: "pl_" + nanoid() });
                }} />
            </div>
            {error && <div className="text-red-500 mb-4 px-8">Error loading price list: {error.message}</div>}
            {!items || items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground w-full">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-4 text-gray-300 dark:text-gray-700"><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>No price list items found.</span>
                </div>
            ) : (
                <div className="w-full px-8 pb-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left font-medium">Title</TableHead>
                                <TableHead className="text-left font-medium">Description</TableHead>
                                <TableHead className="text-right font-medium">Price</TableHead>
                                <TableHead className="text-right font-medium"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id} className="min-h-16">
                                    <TableCell className="text-left font-semibold text-base">{item.title}</TableCell>
                                    <TableCell className="text-left text-muted-foreground text-sm">{item.description}</TableCell>
                                    <TableCell className="text-right font-bold text-base">R {item.price / 100}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end items-center">
                                        <EditPriceListDialog
                                            item={{
                                                id: item.id,
                                                title: item.title,
                                                description: item.description ?? "",
                                                price: item.price
                                            }}
                                            onEdit={async (data) => {
                                                "use server";
                                                await updatePriceListItem(item.id, data);
                                            }}
                                        />
                                        <ConfirmDeleteDialog onConfirmAction={async () => {
                                            "use server";
                                            await deletePriceListItem(item.id);
                                        }}>
                                            <Button variant="destructive" size="sm" className="gap-2">
                                                <TrashIcon className="w-4 h-4" /> Delete
                                            </Button>
                                        </ConfirmDeleteDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
