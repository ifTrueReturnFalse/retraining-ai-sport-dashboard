import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { fetchActivities } from "@/app/lib/actions";

/**
 * API route handler to fetch user activities for a given week range.
 *
 * - Validates the user's authentication session using NextAuth.
 * - Extracts `startWeek` and `endWeek` from query parameters.
 * - Fetches activities from the backend API using the session's access token.
 * - Returns JSON response with activities or an error message.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - A NextResponse with:
 *  - `200`: JSON array of activities if successful.
 *  - `401`: If the user is not authenticated.
 *  - `400`: If required query parameters are missing.
 *  - `500`: If fetching activities fails.
 *
 * @example
 * // GET /api/activities?startWeek=2025-09-01&endWeek=2025-09-07
 * const response = await fetch("/api/activities?startWeek=2025-09-01&endWeek=2025-09-07");
 * const data = await response.json();
 */
export async function GET(req: NextRequest) {
  try {
    // Get the current user's session from NextAuth
    const session = await getServerSession(authOptions);

    // If no valid session or accessToken, return 401 Unauthorized
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const startWeek = searchParams.get("startWeek");
    const endWeek = searchParams.get("endWeek");

    // Validate that both startWeek and endWeek are provided
    if (!startWeek || !endWeek) {
      return NextResponse.json(
        { error: "Missing start or end date" },
        { status: 400 }
      );
    }

    // Fetch activities from backend API
    const activities = await fetchActivities(
      session.accessToken,
      startWeek,
      endWeek
    );

    // If fetchActivities failed or returned null
    if (!activities) throw new Error("Activities not found or API down");

    // Return the activities as JSON
    return NextResponse.json(activities);
  } catch (error) {
    // Log any unexpected errors and return 500 Internal Server Error
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
