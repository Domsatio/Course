import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    if (req.nextUrl.pathname.startsWith('/admin' && !req.nextauth?.token?.role === 'admin')) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }else if(!req.nextUrl.pathname.includes('/admin') && req.nextauth?.token?.role == 'admin'){
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        } else{
          return token?.role === 'user' || token?.role === undefined;
        } 

        return false;
      },
      redirect: ({ baseUrl, req }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return '/sign-in';
        }
        return baseUrl;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|register|admin/sign-in|img|$).*)',
  ],
};