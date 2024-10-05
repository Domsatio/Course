import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const {
    nextUrl: { pathname },
    nextauth: { token },
  } = req;

  // const res = NextResponse.next();
  // res.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins (change to specific domain in production)
  // res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');


  if (pathname.startsWith("/admin")) {
    if (!token || token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (pathname.startsWith("/account")) {
    if (!token || token?.role !== "USER") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (pathname.startsWith("/cart")) {
    if (!token || token?.role !== "USER") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = { matcher: ["/admin/:path*", "/account/:path*", "/cart/:path*"] };
