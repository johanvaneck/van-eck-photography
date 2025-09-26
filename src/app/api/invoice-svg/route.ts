import { NextRequest, NextResponse } from "next/server";
import { generateInvoiceSVG } from "@/app/actions/invoice-svg";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ error: "Missing invoice id" }, { status: 400 });
    }
    const svg = await generateInvoiceSVG(id);
    if (!svg) {
        return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    return new NextResponse(svg, {
        status: 200,
        headers: {
            "Content-Type": "image/svg+xml",
            "Content-Disposition": `attachment; filename=invoice-${id}.svg`,
        },
    });
}
