import { useCallback, useState } from "react";
import { Message } from "@/app/lib/definitions";

export function useConversationManager(systemPrompt: string, maxContext = 5) {
  // State to store all messages in the conversation, including system, user, and assistant messages.
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  /**
   * Adds a new user message to the conversation.
   * The message is appended to the `allMessages` state.
   * @param content The text content of the user's message.
   */
  const addUserMessage = useCallback((content: string) => {
    setAllMessages((previousMessages) => [
      ...previousMessages,
      { role: "user", content },
    ]);
  }, []);

  /**
   * Adds a new assistant message to the conversation.
   * The message is appended to the `allMessages` state.
   * @param content The text content of the assistant's message.
   */
  const addAssistantMessage = useCallback((content: string) => {
    setAllMessages((previousMessages) => [
      ...previousMessages,
      { role: "assistant", content },
    ]);
  }, []);

  /**
   * Generates the context for the AI model based on the system prompt and a subset of recent messages.
   * This function ensures that the conversation context sent to the AI does not exceed `maxContext` messages,
   * plus the initial system prompt.
   * @returns An array of `Message` objects representing the conversation context.
   */
  const getContext = useCallback((): Message[] => {
    // The system message is always included at the beginning of the context.
    const system: Message[] = [{ role: "system", content: systemPrompt }];

    // `allMessages.slice(-maxContext)` extracts the last `maxContext` messages from the `allMessages` array.
    // This ensures that only the most recent interactions are considered for the AI's context,
    // preventing the context from becoming too long and costly.
    const recentMessages = allMessages.slice(-maxContext);

    // Combines the system message with the recent conversation messages to form the complete context.
    return [...system, ...recentMessages];
  }, [systemPrompt, allMessages, maxContext]);

  return {
    // All messages in the current conversation.
    allMessages,
    // Function to add a user message.
    addUserMessage,
    // Function to add an assistant message.
    addAssistantMessage,
    // Function to get the current conversation context for the AI.
    getContext,
  };
}
