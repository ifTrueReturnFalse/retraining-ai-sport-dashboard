import { RefObject, useEffect, useMemo, useRef } from "react";
import styles from "./ChatModal.module.css";
import ChatCloseButton from "./chatBotElements/ChatCloseButton";
import ChatHint from "./chatBotElements/ChatHint";
import ChatInputContainer from "./chatBotElements/ChatInputContainer";
import ChatAssistantMessage from "./chatBotElements/ChatAssistantMessage";
import ChatUserMessage from "./chatBotElements/ChatUserMessage";
import ChatLoader from "./chatBotElements/ChatLoader";
import { useUser } from "@/app/context/UserContext";
import { useActivities } from "@/app/context/ActivitiesContext";
import ChatAllTokensUsed from "./chatBotElements/ChatAllTokensUsed";
import ChatErrorMessage from "./chatBotElements/ChatErrorMessage";
import { getSystemPrompt } from "@/app/lib/prompt";
import { useChat } from "@/app/hooks/useChat";

/**
 * `ChatbotModal` is a React functional component that renders a modal dialog for the AI chatbot.
 * It manages the conversation flow, displays messages, handles user input, and interacts with the Mistral API.
 * @param {Object} props - The properties for the component.
 * @param {RefObject<HTMLDialogElement | null>} props.dialogRef - A ref to the HTML `<dialog>` element for controlling its visibility.
 */
export default function ChatbotModal({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const { profile } = useUser();
  // Memoizes user's personal information (`age`, `weight`, `height`) to be sent to the AI.
  const userProfileForPrompt = useMemo(
    () => ({
      age: profile?.age,
      weight: profile?.weight,
      height: profile?.height,
    }),
    [profile?.age, profile?.weight, profile?.height]
  );

  // Retrieves user activities from context.
  const { activities } = useActivities();
  // Memoizes the most recent user activities to be sent to the AI.
  const activitiesForPrompt = useMemo(() => {
    // Defines the maximum number of recent activities to send to the AI.
    const maxActivitiesToSend = 10;
    return activities.slice(-maxActivitiesToSend); // Gets the `maxActivitiesToSend` most recent activities.
  }, [activities]);

  const systemPrompt = useMemo(
    () =>
      getSystemPrompt({
        userProfile: userProfileForPrompt,
        activities: activitiesForPrompt,
      }),
    [activitiesForPrompt, userProfileForPrompt] // Dependencies for memoization.
  );

  const bottomRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling to the bottom of the chat conversation.

  const {
    allMessages,
    isLoading,
    errorMessage,
    areAllTokensUsed,
    sendMessageToAPI,
    retrySendMessage,
  } = useChat(systemPrompt);

  useEffect(() => {
    // Scrolls to the bottom of the conversation whenever `allMessages` or `isLoading` state changes.
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, isLoading]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <ChatCloseButton dialogRef={dialogRef} />
        
        <div className={styles.conversation}>
          {/* Container for displaying chat messages. */}
          {allMessages.length === 0 && <ChatHint />}
          
          {allMessages.length > 0 && // Renders messages if there are any.
            allMessages.map((message, index) =>
              message.role === "assistant" ? (
                <ChatAssistantMessage key={index} content={message.content} />
              ) : (
                <ChatUserMessage key={index} content={message.content} />
              )
            )}
          
          {isLoading && <ChatLoader />}
          {/* Displays a loader when the AI is processing. */}
          
          <div ref={bottomRef} />
          {/* Invisible div used for auto-scrolling to the bottom. */}
        </div>
        {/* Conditionally renders an error message if `errorMessage` is not null. */}
        
        {errorMessage !== null && (
          <ChatErrorMessage
            errorMessage={errorMessage}
            retryFunction={() => retrySendMessage()}
          />
        )}
        
        {/* Conditionally renders a message when all tokens are used. */}
        {areAllTokensUsed && <ChatAllTokensUsed />}
        
        {/* Input container for user messages and message presets. */}
        <ChatInputContainer
          sendMessageToAPI={sendMessageToAPI}
          isLoading={isLoading}
          allTokensUsed={areAllTokensUsed}
        />
      </div>
    </dialog>
  );
}
