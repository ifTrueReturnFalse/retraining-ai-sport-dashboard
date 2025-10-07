import { Message } from "@/app/lib/definitions";
import { useState } from "react";

export function useMistralAPI() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (getContext: () => Message[]) => {
    setIsLoading(true);

    const response = await fetch("/api/mistral", {
      method: "POST",
      body: JSON.stringify({ messages: getContext() }),
      headers: { "Content-Type": "application/json" },
    });

    setIsLoading(false);
    return await response.json();
  };

  return { isLoading, sendMessage };
}
