import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const hostname = req.headers.get('host');

    const parts = hostname?.split('.');
    if (parts && parts.length < 3) {
        // No subdomain present, proceed as normal
        return NextResponse.next();
    }

    const subdomain = parts?.[0];

    console.log("Subdomain:", subdomain);

    // Rewrite to /website/[subdomain]/*
    url.pathname = `/website/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
}
