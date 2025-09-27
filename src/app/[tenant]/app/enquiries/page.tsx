import { getEnquiries, deleteEnquiry } from "../../actions/enquiries";
import { ConfirmDeleteEnquiryButton } from "./confirm-delete-enquiry-button";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { headers } from "next/dist/server/request/headers";
import { auth } from "@/lib/auth";

export default async function EnquiriesPage({ params }: { params: { tenant: string } }) {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
        return <div>Please sign in</div>;
    }
    const { data: enquiries = [], error } = await getEnquiries(userId);

    return (
        <div className="w-full min-h-screen">
            <div className="flex items-center justify-between mb-6 px-8 pt-8">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">Enquiries</h1>
                    <Badge variant="outline" className="ml-2">Admin</Badge>
                </div>
            </div>
            {error ? (
                <div className="text-red-500 mb-4 px-8">Error loading enquiries: {error.message}</div>
            ) : (!enquiries || enquiries.length === 0) ? (
                <div className="flex flex-col items-center justify-center py-12 text-muted-foreground w-full">
                    <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="mb-4 text-gray-300 dark:text-gray-700"><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>No enquiries found.</span>
                </div>
            ) : (
                <div className="w-full px-8 pb-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Name</TableHead>
                                <TableHead className="text-left">Email</TableHead>
                                <TableHead className="text-left">Message</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {enquiries.map((enquiry) => (
                                <TableRow key={enquiry.id} className="min-h-16">
                                    <TableCell className="text-left">{enquiry.name}</TableCell>
                                    <TableCell className="text-left">{enquiry.email}</TableCell>
                                    <TableCell className="text-left">{enquiry.message}</TableCell>
                                    <TableCell className="text-right">
                                        <ConfirmDeleteEnquiryButton onConfirm={async () => {
                                            "use server";
                                            await deleteEnquiry(enquiry.id, userId);
                                        }} />
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
