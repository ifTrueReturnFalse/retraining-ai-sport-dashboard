import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginResponse } from "@/app/lib/definitions";

/**
 * Sends a login request to the backend API and returns the response.
 *
 * @param {string} username - User identifier (email or username).
 * @param {string} password - User password.
 * @returns {Promise<LoginResponse | undefined>} - Returns login data if successful, undefined otherwise.
 */
async function login(
  username: string,
  password: string
): Promise<LoginResponse | undefined> {
  try {
    // Get the backend API URL from environment variables
    const api_url = process.env.API_URL;
    // Prepare request body
    const requestBody = { username, password };

    // Send POST request to backend login endpoint
    const response = await fetch(`${api_url}/login`, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // If response is not OK, return undefined
    if (!response.ok) return undefined;

    // Parse and return JSON data from backend
    const data = await response.json();

    return data;
  } catch {
    return undefined;
  }
}

// NextAuth configuration options
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Called when a user attempts to login
      async authorize(
        credentials: { email?: string; password?: string } | undefined
      ) {
        // Reject if email or password is missing
        if (!credentials?.email || !credentials?.password) return null;

        // Call backend login function
        const loginResponseData = await login(
          credentials.email,
          credentials.password
        );

        // If login succeeded and token is returned, return user object
        if (loginResponseData?.userId && loginResponseData?.token) {
          return {
            id: loginResponseData.userId,
            accessToken: loginResponseData.token,
          };
        }

        // Otherwise, return null → authentication fails
        return null;
      },
    }),
  ],
  // Use JWT for session storage
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    // Called whenever a JWT is created or updated
    async jwt({ token, user }) {
      // Attach access token to JWT if present
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // Called whenever a session object is checked/accessed client-side
    async session({ session, token }) {
      // Attach access token from JWT to session
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  // Define custom pages
  pages: {
    signIn: "/auth/signin", // Redirect here for sign-in
  },
  // Secret for encrypting tokens
  secret: process.env.NEXTAUTH_SECRET,
};

// Export NextAuth handler for GET and POST requests
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
