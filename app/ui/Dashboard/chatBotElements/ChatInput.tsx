import { useState } from "react";
import styles from "./css/ChatInput.module.css";
import Image from "next/image";
import { SendButton } from "../../Buttons/Buttons";

interface ChatInputProps {
  sendMessageToAPI: (message: string) => void;
  isLoading: boolean
}

export default function ChatInput({ sendMessageToAPI, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleFormValidation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessageToAPI(message);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageToAPI(message);
      setMessage("");
    }
  };

  return (
    <form
      className={styles.textInputContainer}
      onSubmit={(e) => handleFormValidation(e)}
    >
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
        disabled={isLoading}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <SendButton className={styles.sendButton} disabled={isLoading} />
    </form>
  );
}
