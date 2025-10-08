import styles from "./css/ChatAssistantMessage.module.css";
import Markdown from "react-markdown";
import ChatAIPicture from "./ChatAIPicture";

interface ChatAssistantMessageProps {
  key: number;
  content: string;
}

export default function ChatAssistantMessage({
  content,
}: ChatAssistantMessageProps) {
  return (
    <div className={styles.messageContainer}>
      <ChatAIPicture />

      <div className={styles.messageColumn}>
        <div className={styles.coach}>Coach IA</div>

        <div className={`${styles.message} ${styles.assistantMessage}`}>
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
