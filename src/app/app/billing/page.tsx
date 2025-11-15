// Card imports removed
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  return (
    <main className="flex flex-col items-center min-h-[60vh] w-full max-w-lg mx-auto py-8">
      <div className="mb-6 w-full">
        <h1 className="text-xl font-bold">Billing</h1>
        <Badge variant="outline" className="mt-2">
          Active Subscription
        </Badge>
      </div>
      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
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
        </TabsContent>
        <TabsContent value="subscription">
          <div className="space-y-2">
            <div className="font-medium">Pro Plan</div>
            <div className="text-muted-foreground">
              $19/month, next renewal: Oct 1, 2025
            </div>
            <Badge variant="secondary">Manage subscription</Badge>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
