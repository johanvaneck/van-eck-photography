import { NextResponse } from 'next/server';
import { svgToPng } from '@/app/actions/invoice-export';
import { generateInvoiceSVG } from '@/app/actions/invoice-svg';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const invoiceId = searchParams.get('id');
    if (!invoiceId) {
        return NextResponse.json({ error: 'Missing invoice id' }, { status: 400 });
    }

    // Generate SVG for the invoice
    const svg = await generateInvoiceSVG(invoiceId);
    if (!svg) {
        return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Convert SVG to PNG
    const pngBuffer = await svgToPng(svg);

    return new NextResponse(new Uint8Array(pngBuffer), {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
            'Content-Disposition': `attachment; filename=invoice-${invoiceId}.png`,
        },
    });
}
