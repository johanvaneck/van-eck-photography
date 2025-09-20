
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function BillingPage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-lg shadow-lg">
                <CardHeader>
                    <h1 className="text-xl font-bold">Billing</h1>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>2025-09-01</TableCell>
                                <TableCell>Pro Subscription</TableCell>
                                <TableCell>$19.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2025-08-01</TableCell>
                                <TableCell>Pro Subscription</TableCell>
                                <TableCell>$19.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </main>
    )
}
