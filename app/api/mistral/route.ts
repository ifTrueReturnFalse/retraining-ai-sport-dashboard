import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/app/lib/definitions";
import { Mistral } from "@mistralai/mistralai";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      console.error("MISTRAL_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const mistralClient = new Mistral({ apiKey });

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const apiResponse = await mistralClient.chat.complete({
      model: "mistral-large-latest",
      messages,
      maxTokens: 1000,
    });

    const content = apiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in Mistral response");
    }

    return NextResponse.json({
      message: content,
    });
  } catch (error) {
    console.error("Chat API error :", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
