import { useState } from "react";
import styles from "./css/ChatInput.module.css";
import Image from "next/image";
import { SendButton } from "../../Buttons/Buttons";

interface ChatInputProps {
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
 * `ChatInput` is a React functional component that provides the input field
 * and send button for the chatbot interface.
 * It handles user input, message submission, and manages the input state.
 * @param {ChatInputProps} props - The properties for the component.
 */
export default function ChatInput({
  sendMessageToAPI,
  isLoading,
  allTokensUsed,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  /**
   * Handles the form submission event.
   * Prevents default form submission, sends the message if not empty, and clears the input.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission.
    if (message.trim()) {
      sendMessageToAPI(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If Enter is pressed without Shift, prevent default and send the message.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line in textarea.
      // Send message if it's not empty after trimming whitespace.
      // Then clear the input field.
      if (message.trim()) {
        sendMessageToAPI(message);
        setMessage("");
      }
    }
  };

  return (
    <form className={styles.textInputContainer} onSubmit={handleFormValidation}>
      <Image
        src="/red_stars.svg"
        alt="Red shining stars of AI"
        width={20}
        height={20}
        className={styles.starsImg}
      />
      <textarea
        placeholder="Comment puis-je vous aider ?"
        className={styles.textInput}
        autoFocus={true}
        disabled={isLoading || allTokensUsed} // Disable input if loading or tokens are used.
        value={message} // Controlled component: input value is `message` state.
        onChange={(e) => setMessage(e.target.value)} // Update state on input change.
        onKeyDown={handleKeyDown}
      />
      <SendButton
        className={styles.sendButton}
        disabled={isLoading || !message.trim() || allTokensUsed}
      />
    </form>
  );
}
