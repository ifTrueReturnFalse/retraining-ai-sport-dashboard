import styles from "./css/ChatErrorMessage.module.css";
import Image from "next/image";

interface ChatErrorMessageProps {
  /**
   * The error message string to be displayed to the user.
   */
  errorMessage: string;
  /**
   * A callback function to be executed when the user clicks the "Renvoyer votre message" button,
   * typically to retry sending the last message.
   */
  retryFunction: () => void;
}

/**
 * `ChatErrorMessage` is a React functional component that displays an error message
 * within the chat interface and provides a button to retry the last action.
 * @param {ChatErrorMessageProps} props - The properties for the component.
 */
export default function ChatErrorMessage({
  errorMessage,
  retryFunction,
}: ChatErrorMessageProps) {
  return (
    <div className={styles.container}>
      Une erreur s&apos;est produite: {errorMessage}
      <button onClick={retryFunction} className={styles.retryButton}>
        Renvoyer votre message
        <Image src="/retry.svg" alt="Retry button" height={20} width={20} />
      </button>
    </div>
  );
}
