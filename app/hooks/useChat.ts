import { useCallback, useEffect, useState } from "react";
import { useConversationManager } from "./useConversationManager";
import { useMistralAPI } from "./useMistralAPI";
import { useTokenManager } from "./useTokenManager";
import { Message } from "../lib/definitions";

// Defines the maximum number of messages to keep in the conversation context for the AI.
const CONVERSATION_CONTEXT_LIMIT = 6;
// Defines the maximum number of tokens allowed for API calls within a given reset period.
const TOKEN_LIMIT = 10000;
// Defines the duration (in hours) after which the token usage count will be reset.
const TOKEN_RESET_HOURS = 6;

/**
 * A custom hook for managing a chat conversation with an AI assistant,
 * integrating conversation history, API calls, and token usage management.
 *
 * @param systemPrompt The initial system message that defines the AI's role and behavior.
 * @returns An object containing:
 * - `allMessages`: An array of all messages in the conversation (user and assistant).
 * - `isLoading`: A boolean indicating if an API call is currently in progress.
 * - `errorMessage`: A string containing an error message if an API call fails, otherwise `null`.
 * - `areAllTokensUsed`: A boolean indicating if the token limit has been reached.
 * - `sendMessageToAPI`: A function to send a new user message to the AI.
 * - `retrySendMessage`: A function to retry sending the last message to the AI in case of an error.
 */
export function useChat(systemPrompt: string) {
  // Manages the conversation history, including adding messages and retrieving context.
  const { allMessages, addUserMessage, addAssistantMessage, getContext } =
    useConversationManager(systemPrompt, CONVERSATION_CONTEXT_LIMIT);
  // Handles communication with the Mistral API, including sending messages and managing loading state.
  const { sendMessage, isLoading } = useMistralAPI();
  // Manages API token usage, tracking tokens consumed and checking against a limit.
  const { addTokens, allTokensUsed } = useTokenManager(TOKEN_LIMIT);

  // State to store any error messages from API calls.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // State to track if the token limit has been reached.
  const [areAllTokensUsed, setAreAllTokensUsed] = useState(allTokensUsed());

  /**
   * Effect hook to update `areAllTokensUsed` whenever `allTokensUsed` or `allMessages` changes.
   * This ensures the UI reflects the current token status.
   */
  useEffect(() => {
    setAreAllTokensUsed(allTokensUsed());
  }, [allTokensUsed, allMessages]);

  /**
   * Sends a user message to the AI, updates the conversation, and handles the API response.
   * @param message The user's message to send.
   */
  const sendMessageToAPI = useCallback(
    async (message: string) => {
      setErrorMessage(null);
      addUserMessage(message);

      const recentMessages: Message[] = [
        ...getContext(),
        { role: "user", content: message }, // Add the current user message to the context for the API call.
      ];

      // Send the context to the Mistral API.
      const response = await sendMessage(recentMessages);
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        addAssistantMessage(response.message); // Add the AI's response to the conversation.
        addTokens(response.tokensUsed, TOKEN_RESET_HOURS); // Update token usage.
      }
    },
    [addUserMessage, addAssistantMessage, addTokens, sendMessage, getContext]
  );

  /**
   * Retries sending the last message context to the AI in case of a previous API error.
   * This function does not add a new user message but re-sends the existing context
   * (which includes the last user message).
   */
  const retrySendMessage = useCallback(async () => {
    setErrorMessage(null); // Clears any existing error message before retrying.
    const response = await sendMessage(getContext());

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      addAssistantMessage(response.message); // Add the AI's response to the conversation.
      addTokens(response.tokensUsed, TOKEN_RESET_HOURS); // Update token usage.
    }
  }, [addAssistantMessage, addTokens, getContext, sendMessage]);

  return {
    allMessages,
    isLoading,
    errorMessage,
    areAllTokensUsed,
    sendMessageToAPI,
    retrySendMessage,
  };
}
