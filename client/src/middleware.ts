import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuth = !!refreshToken;

  // if user is logged in and tries to go to login page
  if (pathname === "/" && isAuth) {
    return NextResponse.redirect(new URL("/resume", request.url));
  }

  const protectedRoutes = ["/resume", "/aiResume", "/templates", "/allTemp"];

  // check if the requested path is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // if user is not logged in and tries to access protected route
  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/resume/:path*", "/aiResume", "/templates", "/allTemp"],
};
