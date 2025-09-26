import { getInvoiceById } from "./invoices";

export async function generateInvoiceSVG(id: string): Promise<string | null> {
  const { data: invoice, error } = await getInvoiceById(id);
  if (error || !invoice) return null;

  // SVG for A4 aspect ratio, modern minimalist style
  return `
      <svg width="1240" height="1754" viewBox="0 0 1240 1754" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f9f9fb" />
        <rect x="80" y="80" width="1080" height="1594" rx="32" fill="#fff" />
        <text x="120" y="180" font-size="48" font-weight="bold" fill="#222" font-family="'Segoe UI', 'Inter', Arial, sans-serif">INVOICE</text>
        <line x1="120" y1="200" x2="1160" y2="200" stroke="#eee" stroke-width="2" />
        <text x="120" y="260" font-size="20" fill="#555" font-family="'Segoe UI', 'Inter', Arial, sans-serif">Invoice #: <tspan font-weight="bold">${invoice.invoiceNumber}</tspan></text>
        <text x="120" y="300" font-size="20" fill="#555" font-family="'Segoe UI', 'Inter', Arial, sans-serif">Date: <tspan font-weight="bold">${invoice.date}</tspan></text>
        <text x="120" y="340" font-size="20" fill="#555" font-family="'Segoe UI', 'Inter', Arial, sans-serif">Client: <tspan font-weight="bold">${invoice.clientName}</tspan></text>
        <rect x="120" y="380" width="1020" height="2" fill="#eee" />
        <text x="120" y="440" font-size="18" fill="#888" font-family="'Segoe UI', 'Inter', Arial, sans-serif">Description</text>
        <text x="120" y="470" font-size="22" fill="#222" font-family="'Segoe UI', 'Inter', Arial, sans-serif">${invoice.description}</text>
        <rect x="120" y="520" width="1020" height="2" fill="#eee" />
        <text x="120" y="580" font-size="18" fill="#888" font-family="'Segoe UI', 'Inter', Arial, sans-serif">Amount Due</text>
        <text x="120" y="620" font-size="40" font-weight="bold" fill="#1a7f37" font-family="'Segoe UI', 'Inter', Arial, sans-serif">R ${invoice.amount}</text>
        <rect x="120" y="680" width="1020" height="2" fill="#eee" />
        <text x="120" y="1720" font-size="16" fill="#aaa" font-family="'Segoe UI', 'Inter', Arial, sans-serif">Thank you for your business!</text>
      </svg>
    `;
}

