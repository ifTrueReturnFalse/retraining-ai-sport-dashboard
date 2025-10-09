import Image from "next/image";
import Markdown from "react-markdown";

import styles from "./css/ChatUserMessage.module.css";
import { useUser } from "@/app/context/UserContext";

interface ChatUserMessageProps {
  key: number;
  content: string;
}

export default function ChatUserMessage({
  content,
}: ChatUserMessageProps) {
  const { profile } = useUser();
  return (
    <div className={styles.messageContainer}>
      <div className={`${styles.message} ${styles.userMessage}`}>
        <Markdown>{content}</Markdown>
      </div>

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
