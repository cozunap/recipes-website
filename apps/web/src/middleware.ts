import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // E.g., if custom domain is "my-recipes.com"
  // We rewrite the URL internally to /_sites/my-recipes.com/path
  // The Next.js App Router will catch this in app/_sites/[domain]/page.tsx
  
  // NOTE: This prevents Next.js from breaking when hosting multiple domains on a single project.
  
  if (hostname !== 'localhost:3000' && !hostname.includes('vercel.app') && !hostname.includes('pages.dev')) {
    return NextResponse.rewrite(new URL(`/_sites/${hostname}${url.pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
