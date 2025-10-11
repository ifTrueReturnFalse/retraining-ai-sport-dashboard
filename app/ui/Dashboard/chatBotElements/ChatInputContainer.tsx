import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessagePreset from "./ChatMessagePreset";
import styles from "./css/ChatInputContainer.module.css";

interface ChatInputContainerProps {
  /**
   * Function to send the user's message to the AI API.
   * @param {string} message - The user's message content.
   */
  sendMessageToAPI: (message: string) => void;
  /**
   * Indicates whether the AI is currently processing a request.
   */
  isLoading: boolean;
  /**
   * Indicates whether the user has exhausted their AI token limit.
   */
  allTokensUsed: boolean;
}

/**
 * `ChatInputContainer` is a React functional component that encapsulates the chat input field
 * and a set of predefined message presets. It manages the state of the message being typed
 * and provides a way to send messages to the AI API.
 *
 * @component
 * @param {ChatInputContainerProps} props - The properties for the component.
 * @returns {JSX.Element} A container with the chat input and message presets.
 */
export default function ChatInputContainer({
  sendMessageToAPI,
  isLoading,
  allTokensUsed,
}: ChatInputContainerProps) {
  // State to hold the current message typed by the user in the input field.
  const [messageToSend, setMessageToSend] = useState("");

  return (
    <>
      <ChatInput
        sendMessageToAPI={sendMessageToAPI}
        isLoading={isLoading}
        allTokensUsed={allTokensUsed}
        message={messageToSend}
        setMessage={setMessageToSend}
      />

      {/* Container for predefined message presets */}
      <div className={styles.presetContainer}>
        <ChatMessagePreset
          content="Comment améliorer mon endurance ?"
          setMessage={setMessageToSend}
        />
        <ChatMessagePreset
          content="Que signifie mon score de récupération ?"
          setMessage={setMessageToSend}
        />
        <ChatMessagePreset
          content="Quel sport faire en plus pour gagner en explosivité ?"
          setMessage={setMessageToSend}
        />
      </div>
    </>
  );
}
