import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;

    console.log('Middleware running for:', pathname);
    console.log('Token:', token);

    if (!token) {
        if (publicRoutes.includes(pathname)) {
            console.log('Public route, allowing access');
            return NextResponse.next();
        } else {
            console.log('No token, redirecting to login');
            return NextResponse.redirect(new URL('/login', request.url));
        }   
    } else {
        if (pathname === '/login' || pathname === '/register') {
            console.log('Authenticated user, redirecting to resume');       //if later make home page 
            return NextResponse.redirect(new URL('/resume', request.url));
        } else {
            console.log('Authenticated user, allowing access');
            return NextResponse.next();
        }
    }

}

export const config = {
    matcher: ['/', "/login", "/register", "/aiResume","/resume/:path*", "/templates"],
  };
