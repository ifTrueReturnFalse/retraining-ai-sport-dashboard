import { Message } from "@/app/lib/definitions";
import { useState } from "react";

export function useMistralAPI(getContext: () => Message[]) {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
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
