import { getInvoices, deleteInvoice } from "@/app/actions/invoices";
import { CopyPublicLinkButton } from "./copy-public-link-button";
import { ConfirmDeleteDialog } from "./confirm-delete-dialog";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CreateInvoiceDialog from "./create-invoice-dialog";

export default async function InvoicePage() {
    const { data: invoices, error } = await getInvoices();

    return (
        <div className="w-full min-h-screen">
            <div className="flex items-center justify-between mb-6 px-8 pt-8">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">Invoices</h1>
                    <Badge variant="outline" className="ml-2">Pro</Badge>
                </div>
                <CreateInvoiceDialog />
            </div>
            {error && <div className="text-red-500 mb-4 px-8">Error loading invoices: {error.message}</div>}
            {!invoices || invoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground w-full">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-4 text-gray-300 dark:text-gray-700"><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>No invoices found.</span>
                </div>
            ) : (
                <div className="w-full px-8 pb-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Invoice #</TableHead>
                                <TableHead className="text-left">Date</TableHead>
                                <TableHead className="text-left">Client</TableHead>
                                <TableHead className="text-left">Description</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Download</TableHead>
                                <TableHead className="text-right">Public Link</TableHead>
                                <TableHead className="text-right">Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id} className="min-h-16">
                                    <TableCell className="text-left">{invoice.invoiceNumber}</TableCell>
                                    <TableCell className="text-left">{invoice.date}</TableCell>
                                    <TableCell className="text-left">{invoice.clientName}</TableCell>
                                    <TableCell className="text-left">{invoice.description}</TableCell>
                                    <TableCell className="text-right">R {invoice.amount}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end items-center">
                                        <a
                                            href={`/api/invoice-svg?id=${invoice.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={`invoice-${invoice.invoiceNumber}.svg`}
                                        >
                                            <Button variant="outline" size="sm">SVG</Button>
                                        </a>
                                        <a
                                            href={`/api/invoice-png?id=${invoice.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={`invoice-${invoice.invoiceNumber}.png`}
                                        >
                                            <Button variant="outline" size="sm">PNG</Button>
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <CopyPublicLinkButton invoiceId={invoice.id} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ConfirmDeleteDialog onConfirmAction={async () => {
                                            "use server";
                                            await deleteInvoice(invoice.id);
                                        }}>
                                            <Button variant="destructive" size="sm">Delete</Button>
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
