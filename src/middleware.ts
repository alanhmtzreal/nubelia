import { NextRequest, NextResponse } from "next/server";

const ADMIN_SESSION_COOKIE = "nubelia_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (session !== process.env.ADMIN_PASSWORD) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
