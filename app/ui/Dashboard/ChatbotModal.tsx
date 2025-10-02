import React, { RefObject, useState } from "react";
import Image from "next/image";
import styles from "./ChatModal.module.css";
import { SendButton } from "@/app/ui/Buttons/Buttons";
import { useConversationManager } from "@/app/hooks/useConversationManager";
import { useMistralAPI } from "@/app/hooks/useMistralAPI";

export default function ChatbotModal({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const { allMessages, addUserMessage, addAssistantMessage, getContext } =
    useConversationManager(
      "Tu es un champion de l'humour, soit créatif",
      5
    );
  const { isLoading, sendMessage } = useMistralAPI(getContext);
  const [message, setMessage] = useState("");

  const handleSendMessageToAPI = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addUserMessage(message);
    setMessage("");
    const response = await sendMessage();
    if (response?.error) {
      console.error(response.error);
    } else {
      addAssistantMessage(response.message);
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <button
          onClick={() => dialogRef.current?.close()}
          className={styles.close}
        >
          Fermer X
        </button>

        {allMessages.length === 0 && (
          <div className={styles.hint}>
            Posez vos questions sur votre programme,
            <br />
            vos performances ou vos objectifs
          </div>
        )}

        {allMessages.length !== 0 && (
          <div className={styles.conversation}>
            {allMessages.map((message) => (
              <div key={message.content}>{message.content}</div>
            ))}
          </div>
        )}

        <form
          className={styles.textInputContainer}
          onSubmit={(e) => handleSendMessageToAPI(e)}
        >
          <Image
            src="/red_stars.svg"
            alt="Red shining stars of AI"
            width={20}
            height={20}
            className={styles.starsImg}
          />
          <input
            placeholder="Comment puis-je vous aider ?"
            className={styles.textInput}
            autoFocus={true}
            disabled={isLoading}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton className={styles.sendButton} disabled={isLoading} />
        </form>
      </div>
    </dialog>
  );
}
