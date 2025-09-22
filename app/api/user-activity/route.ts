import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { fetchActivities } from "@/app/lib/actions";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const startWeek = searchParams.get("startWeek");
    const endWeek = searchParams.get("endWeek");

    if (!startWeek || !endWeek) {
      return NextResponse.json(
        { error: "Missing start or end date" },
        { status: 400 }
      );
    }

    const activities = await fetchActivities(
      session.accessToken,
      startWeek,
      endWeek
    );

    if (!activities) throw new Error("Activities not found or API down");

    return NextResponse.json(activities);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
