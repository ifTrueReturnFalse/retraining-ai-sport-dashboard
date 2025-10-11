import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/app/lib/definitions";
import { Mistral } from "@mistralai/mistralai";

/**
 * Handles POST requests to the Mistral API endpoint.
 * This function acts as a proxy, forwarding chat messages to the Mistral AI model
 * and returning its response. It includes authentication and error handling.
 * @param req The NextRequest object containing the request details.
 * @returns A NextResponse object with the AI's message or an error.
 */
export async function POST(req: NextRequest) {
  try {
    // Retrieve the Mistral API key from environment variables.
    const apiKey = process.env.MISTRAL_API_KEY;

    // If the API key is not configured, log an error and return a 500 server error response.
    // This is a critical configuration issue that prevents the AI service from functioning.
    if (!apiKey) {
      console.error("MISTRAL_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Initialize the Mistral client with the retrieved API key.
    const mistralClient = new Mistral({ apiKey });

    // Get the server session to check for user authentication.
    const session = await getServerSession(authOptions);

    // If no session or access token is found, return a 401 Unauthorized response.
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Parse the request body to extract the messages array.
    const body = await req.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Call the Mistral chat completion API with the provided messages.
    // The model used is "mistral-large-latest" and `maxTokens` is set to 1000.
    const apiResponse = await mistralClient.chat.complete({
      model: "mistral-large-latest",
      messages,
      maxTokens: 1000,
    });

    // Extract the content of the AI's response message.
    const content = apiResponse.choices?.[0]?.message?.content;
    // Extract the total number of tokens used for the request.
    const tokensUsed = apiResponse.usage?.totalTokens;

    // If no content is returned by Mistral, throw an error.
    if (!content) {
      throw new Error("No content in Mistral response");
    }

    // Return the AI's message content and the number of tokens used as a JSON response.
    return NextResponse.json({
      message: content,
      tokensUsed,
    });
  } catch (error) {
    console.error("Chat API error :", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
