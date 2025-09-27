import { NextRequest, NextResponse } from 'next/server';

// Example: tenant.pici.sh
function getTenantFromHost(host: string): string | null {
    const parts = host.split('.');
    // Only handle subdomains (e.g. tenant.pici.sh)
    if (parts.length >= 3) {
        return parts[0];
    }
    return null;
}

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') || '';
    const tenant = getTenantFromHost(host);

    console.log("tenant from middleware:", tenant);

    if (tenant) {
        // Attach tenant info to request (can be used in app via headers/cookies)
        request.headers.set('x-tenant', tenant);
        // Use absolute URL for rewrite
        const url = request.nextUrl.clone();
        url.pathname = `/${tenant}${url.pathname}`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|static|favicon.ico).*)'],
};
