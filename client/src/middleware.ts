import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/register']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;

    if (!token) {
        if (publicRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }   
    } else {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/resume', request.url));
        } else {
            return NextResponse.next();
        }
    }

}

export const config = {
    matcher: ['/', "/login", "/register", "/aiResume","/resume/:path*", "/templates", "/allTemp"],
  };
