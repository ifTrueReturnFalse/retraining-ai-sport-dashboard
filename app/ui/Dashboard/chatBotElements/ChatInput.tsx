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

  message: string;
  setMessage: (value: string) => void;
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
  message,
  setMessage,
}: ChatInputProps) {
  /**
   * Handles the form submission event.
   * Prevents default form submission, sends the message if not empty, and clears the input.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload on form submission.
    if (message.trim()) {
      // Check if the message is not empty or just whitespace.
      sendMessageToAPI(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If Enter is pressed without Shift, prevent default and send the message.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent a new line from being added in the textarea.
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

      <textarea // The main input field for the user's message.
        placeholder="Comment puis-je vous aider ?"
        className={styles.textInput}
        autoFocus={true}
        disabled={isLoading || allTokensUsed} // Disable input if loading or tokens are used.
        value={message} // The current value of the textarea, controlled by the `message` prop.
        onChange={(e) => setMessage(e.target.value)} // Updates the `message` state in the parent component.
        onKeyDown={handleKeyDown}
      />
      
      <SendButton
        className={styles.sendButton}
        disabled={isLoading || !message.trim() || allTokensUsed}
      />
    </form>
  );
}
