import { useCallback, useState } from "react";
import { Message } from "@/app/lib/definitions";

export function useConversationManager(systemPrompt: string, maxContext = 5) {
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const addUserMessage = useCallback((content: string) => {
    setAllMessages((previousMessages) => [
      ...previousMessages,
      { role: "user", content },
    ]);
  }, []);

  const addAssistantMessage = useCallback((content: string) => {
    setAllMessages((previousMessages) => [
      ...previousMessages,
      { role: "assistant", content },
    ]);
  }, []);

  const getContext = useCallback((): Message[] => {
    const system: Message[] = [{ role: "system", content: systemPrompt }];
    const recentMessages = allMessages.slice(-maxContext);
    return [...system, ...recentMessages];
  }, [systemPrompt, allMessages, maxContext]);

  return { allMessages, addUserMessage, addAssistantMessage, getContext };
}
