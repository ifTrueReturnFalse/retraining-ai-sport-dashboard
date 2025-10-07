import styles from "./css/ChatAssistantMessage.module.css";
import Image from "next/image";
import Markdown from "react-markdown";

interface ChatAssistantMessageProps {
  key: number;
  content: string;
}

export default function ChatAssistantMessage({
  content,
}: ChatAssistantMessageProps) {
  return (
    <div className={styles.messageContainer}>
      <div className={styles.AIPictureContainer}>
        <Image
          src="/red_stars.svg"
          alt="Your AI assistant"
          height={17.19}
          width={15.96}
        />
      </div>

      <div className={styles.messageColumn}>
        <div className={styles.coach}>Coach IA</div>

        <div className={`${styles.message} ${styles.assistantMessage}`}>
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </div>
  );
}
