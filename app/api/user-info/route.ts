import { fetchUser } from "@/app/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

/**
 * GET handler for retrieving the currently authenticated user's data.
 *
 * Steps:
 * 1. Retrieve the current session using `getServerSession` with NextAuth options.
 * 2. Check if the session has a valid `accessToken`.
 *    - If not → return `{ profile: null, statistics: null }`.
 * 3. If `accessToken` exists → call `fetchUser` to get user data from external API.
 * 4. Return the user data as JSON, or a fallback `{ profile: null, statistics: null }`.
 *
 * @async
 * @function GET
 * @returns {Promise<NextResponse>} JSON response containing the user profile and statistics.
 */
export async function GET() {
  // Retrieve session from NextAuth
  const session = await getServerSession(authOptions);

  // If no access token, return empty user data
  if (!session?.accessToken) {
    return NextResponse.json({ profile: null, statistics: null });
  }

  // Fetch user data from external API using the access token
  const userData = await fetchUser(session.accessToken);

  // Return the fetched data, or fallback to null values
  return NextResponse.json(userData || { profile: null, statistics: null });
}
