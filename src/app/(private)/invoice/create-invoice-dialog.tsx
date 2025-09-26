import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import CreateInvoiceForm from "./create-invoice-form";
import { createInvoice } from "@/app/actions/invoices";

export default function CreateInvoiceDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">Create Invoice</Button>
            </DialogTrigger>
            <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                <DialogHeader>
                    <DialogTitle>
                        Create Invoice
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill out the form to create a new invoice.
                    </DialogDescription>
                </DialogHeader>
                <CreateInvoiceForm createInvoiceAction={createInvoice} />
            </DialogContent>
        </Dialog>
    );
}
