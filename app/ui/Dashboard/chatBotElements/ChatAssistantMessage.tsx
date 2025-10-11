import styles from "./css/ChatAssistantMessage.module.css";
import Markdown from "react-markdown";
import ChatAIPicture from "./ChatAIPicture";
import remarkGfm from "remark-gfm";

/**
 * Props for the `ChatAssistantMessage` component.
 */
interface ChatAssistantMessageProps {
  /**
   * The content of the assistant's message, which can include Markdown.
   */
  content: string;
}

/**
 * `ChatAssistantMessage` is a React functional component that displays a message
 * from the AI assistant within the chat interface. It supports Markdown formatting
 * using `react-markdown` and `remark-gfm` for GitHub Flavored Markdown.
 * @param {ChatAssistantMessageProps} props - The properties for the component.
 */
export default function ChatAssistantMessage({
  content,
}: ChatAssistantMessageProps) {
  return (
    <div className={styles.messageContainer}>
      <ChatAIPicture />

      <div className={styles.messageColumn}>
        {/* Displays the name of the AI assistant */}
        <div className={styles.coach}>Coach IA</div>

        {/* Renders the assistant's message content, parsing Markdown. */}
        {/* `remarkGfm` is used to enable GitHub Flavored Markdown features. */}
        <div className={`${styles.message} ${styles.assistantMessage}`}>
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
