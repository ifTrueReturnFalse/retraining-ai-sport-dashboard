import React, { RefObject } from "react";
import styles from "./ChatModal.module.css";
import { useConversationManager } from "@/app/hooks/useConversationManager";
import { useMistralAPI } from "@/app/hooks/useMistralAPI";
import ChatCloseButton from "./chatBotElements/ChatCloseButton";
import ChatHint from "./chatBotElements/ChatHint";
import ChatInput from "./chatBotElements/ChatInput";
import ChatAssistantMessage from "./chatBotElements/ChatAssistantMessage";
import ChatUserMessage from "./chatBotElements/ChatUserMessage";

export default function ChatbotModal({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const { allMessages, addUserMessage, addAssistantMessage, getContext } =
    useConversationManager(
      "Tu es un coach sportif, ton objectif est de guider au mieux l'utilisateur\
      afin qu'il puisse accomplir ses objectifs personnels.\
      Tu peux guider s'il y a un problème médical, mais tu dois obligatoirement rediriger vers une personnne compétente\
      comme un médecin. Ne fais cette proposition uniquement si un conseil médical est demandé.\
      Soit relativement bref dans les explications.\
      En cas de question en dehors du domaine du sport, redirige l'utilisateur vers d'autres services.\
      Tu dois répondre de manière positive et bienveillante.",
      5
    );
  const { sendMessage } = useMistralAPI();

  const sendMessageToAPI = async (message: string) => {
    addUserMessage(message);
    const response = await sendMessage(getContext);
    if (response?.error) {
      console.error(response.error);
    } else {
      addAssistantMessage(response.message);
    }
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <ChatCloseButton dialogRef={dialogRef} />

        {allMessages.length === 0 && <ChatHint />}

        {allMessages.length !== 0 && (
          <div className={styles.conversation}>
            {allMessages.map((message, index) =>
              message.role === "assistant" ? (
                <ChatAssistantMessage key={index} content={message.content} />
              ) : (
                <ChatUserMessage key={index} content={message.content} />
              )
            )}
          </div>
        )}

        <ChatInput sendMessageToAPI={sendMessageToAPI} />
      </div>
    </dialog>
  );
}
