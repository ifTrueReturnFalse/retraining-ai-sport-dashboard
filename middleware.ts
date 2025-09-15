import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Cette fonction n'est appelée QUE si authorized retourne true
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Si pas de token ET pas sur la page de signin -> redirection
        if (!token && !req.nextUrl.pathname.startsWith('/auth')) {
          return false; 
        }
        return true;
      },
    },
    pages: {
      signIn: '/auth/signin',
    }
  }
);

export const config = {
  matcher: ['/'],
};