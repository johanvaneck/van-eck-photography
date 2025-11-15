import { generateInvoiceSVG } from '@/app/[tenant]/actions/invoice-svg';

export default async function PublicInvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const svg = await generateInvoiceSVG(id);
    if (!svg) {
        return <div className="text-center py-16 text-red-500">Invoice not found.</div>;
    }
    return (
        <div className="flex items-center justify-center p-4">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
    );
}
