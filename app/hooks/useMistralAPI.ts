import { Message } from "@/app/lib/definitions";
import { useState } from "react";
// Defines the maximum time (in milliseconds) to wait for an API response.
const API_TIMEOUT = 30000;

/**
 * A custom hook to interact with the Mistral API.
 * It manages the loading state and sends messages to the API endpoint.
 * @returns An object containing the loading state and a function to send messages.
 */
export function useMistralAPI() {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Sends a list of messages as context to the Mistral API.
   * @param context An array of Message objects to be sent to the API.
   * @returns A Promise that resolves to the API response or an error object.
   *          The response object is expected to contain a `json` method.
   */
  const sendMessage = async (context: Message[]) => {
    setIsLoading(true);
    // Creates an AbortController to allow for request cancellation, e.g., on timeout.
    const controller = new AbortController();
    // Sets a timeout to automatically abort the request if it takes too long.
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      // Sends a POST request to the Mistral API endpoint with the messages as JSON.
      const response = await fetch("/api/mistral", {
        method: "POST",
        body: JSON.stringify({ messages: context }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.error || `Erreur HTTP: ${response.status}` };
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return { error: "La requête a expiré (timeout)." };
      }
      return { error: "Une erreur réseau est survenue." };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, sendMessage };
}
