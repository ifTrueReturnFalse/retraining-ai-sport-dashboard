import Image from "next/image";
import Markdown from "react-markdown";

import styles from "./css/ChatUserMessage.module.css";
import { useUser } from "@/app/context/UserContext";

/**
 * Props for the `ChatUserMessage` component.
 */
interface ChatUserMessageProps {
  /**
   * The content of the user's message, which can include Markdown.
   */
  content: string;
}

/**
 * `ChatUserMessage` is a React functional component that displays a message from the user within the chat interface.
 * It supports Markdown formatting using `react-markdown` and displays the user's profile picture if available.
 * @param {ChatUserMessageProps} props - The properties for the component.
 */
export default function ChatUserMessage({ content }: ChatUserMessageProps) {
  const { profile } = useUser();
  return (
    <div className={styles.messageContainer}>
      <div className={`${styles.message} ${styles.userMessage}`}>
        {/* Renders the user's message content, parsing Markdown. */}
        <Markdown>{content}</Markdown>
      </div>

      {/* Displays the user's profile picture if available. */}
      {profile?.profilePicture && (
        <Image
          src={profile?.profilePicture}
          alt="Your profile picture"
          height={32}
          width={32}
          className={styles.picture}
        />
      )}
    </div>
  );
}
