import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * NextAuth Middleware to protect routes based on authentication.
 *
 * Purpose:
 * - Checks if a user has a valid session (JWT token).
 * - Redirects unauthenticated users to the sign-in page.
 * - Allows public access to `/auth` routes (sign-in, sign-up, etc.).
 *
 * Details:
 * - The `middleware` function is only called if the `authorized` callback returns `true`.
 * - `NextResponse.next()` continues the request for authorized users.
 * - `authorized` callback checks:
 *    - If no token AND the request is not for an `/auth` page → return false (unauthorized).
 *    - Otherwise → return true (authorized).
 * - `pages.signIn` defines the custom sign-in page for redirects.
 *
 * Routes protected:
 * - Specified in `config.matcher` (here `/` and `/dashboard`).
 *
 * Example usage:
 * - Any access to `/dashboard` without a valid session will redirect to `/auth/signin`.
 * - Access to `/auth/signin` is always allowed.
 * Notes for devs:
 * `withAuth` = gatekeeper for protected routes.
 * `authorized callback` = main logic for access control.
 * `config.matcher` = choose exactly which routes need auth.
 * `NextResponse.next()` = continue request for authorized users, otherwise NextAuth redirects automatically.
 */
export default withAuth(
  function middleware(req) {
    // Cette fonction n'est appelée QUE si authorized retourne true
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Si pas de token ET pas sur la page de signin -> redirection
        if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
          return false;
        }
        return true;
      },
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

export const config = {
  matcher: ["/", "/dashboard", "/profile"],
};
