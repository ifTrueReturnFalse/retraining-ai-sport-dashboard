import { fetchUser } from "@/app/lib/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ profile: null, statistics: null });
  }

  const userData = await fetchUser(session.accessToken);

  return NextResponse.json(userData || { profile: null, statistics: null });
}
