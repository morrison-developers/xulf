import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow requests to login or public files
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico' || pathname.includes('/login')) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to login
  const isLoggedIn = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  if (!isLoggedIn) {
    const loginUrl = new URL('/client/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};