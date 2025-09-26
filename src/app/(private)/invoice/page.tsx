import { getInvoices } from "@/app/actions/invoices";
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id} className="border-b last:border-0 h-10">
                                    <TableCell className="text-left h-10">{invoice.invoiceNumber}</TableCell>
                                    <TableCell className="text-left h-10">{invoice.date}</TableCell>
                                    <TableCell className="text-left h-10">{invoice.clientName}</TableCell>
                                    <TableCell className="text-left h-10">{invoice.description}</TableCell>
                                    <TableCell className="text-right h-10">R {invoice.amount}</TableCell>
                                    <TableCell className="text-right h-10">
                                        <a
                                            href={`/api/invoice-svg?id=${invoice.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={`invoice-${invoice.invoiceNumber}.svg`}
                                        >
                                            <Button variant="outline" size="sm">Download</Button>
                                        </a>
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
