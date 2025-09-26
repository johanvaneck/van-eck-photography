import { generateInvoiceSVG } from '@/app/actions/invoice-svg';

export default async function PublicInvoicePage({ params }: { params: { id: string } }) {
    const svg = await generateInvoiceSVG(params.id);
    if (!svg) {
        return <div className="text-center py-16 text-red-500">Invoice not found.</div>;
    }
    return (
        <div className="flex items-center justify-center p-4">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
    );
}
