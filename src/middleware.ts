import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Simple session tracking cookie to avoid spamming the DB on every page view
  const sessionCookie = req.cookies.get('geo_session');
  
  if (!sessionCookie) {
    // Collect Vercel headers
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const state = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown';
    
    // Only fire API request if we have actual geo data, to prevent local noise 
    // unless you want to track unknown locations too. We will track everything.
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    
    // Fire and forget fetch request
    // using keepalive so it completes even if the request finishes
    fetch(`${apiUrl}/analytics/geolocation/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        state,
        city
      }),
      keepalive: true
    }).catch(err => console.error('Failed to track geolocation', err));

    // Set cookie for session (expires when browser closes)
    res.cookies.set('geo_session', 'true', { path: '/' });
  }

  return res;
}

// Ensure the middleware is only run on relevant paths, e.g., pages
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
