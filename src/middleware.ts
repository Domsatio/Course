import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const {
    nextUrl,
    nextauth: { token },
  } = req;

  const pathname = nextUrl.pathname.split("/")[1];

  if (pathname === "admin") {
    if (!token || token?.role !== "admin") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
});

export const config = { matcher: ["/admin/:path*"] };
