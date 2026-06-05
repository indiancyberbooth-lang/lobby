// lobby/src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Get the raw hostname from the request (e.g., megacasino.local:3001)
  let hostname = request.headers.get('host') || '';
  
  // 2. Remove the port so we only match the pure domain name (megacasino.local)
  hostname = hostname.split(':')[0];

  // 3. Clone the request headers and inject our custom domain tracker
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-domain', hostname);

  // 4. Pass the modified headers to the next response
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// 5. Matcher config to prevent the middleware from running on static files (images, css)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};