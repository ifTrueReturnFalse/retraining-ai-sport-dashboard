import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginResponse } from "@/app/lib/definitions";

async function login(
  username: string,
  password: string
): Promise<LoginResponse | undefined> {
  try {
    const api_url = process.env.API_URL;
    const requestBody = { username, password };

    const response = await fetch(`${api_url}/login`, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return undefined;

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: { username?: string; password?: string } | undefined
      ) {
        if (!credentials?.username || !credentials?.password) return null;

        const loginResponseData = await login(
          credentials.username,
          credentials.password
        );

        if (loginResponseData?.userId && loginResponseData?.token) {
          return {
            id: loginResponseData.userId,
            accessToken: loginResponseData.token,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
