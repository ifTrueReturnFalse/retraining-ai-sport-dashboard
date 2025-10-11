import styles from "./css/ChatMessagePreset.module.css";

interface ChatMessagePresetProps {
  /**
   * The predefined message content to be displayed and sent.
   */
  content: string;
  /**
   * A callback function to update the chat input field with the preset message.
   * @param {string} value - The message content to set in the input.
   */
  setMessage: (value: string) => void;
}

/**
 * `ChatMessagePreset` is a React functional component that displays a predefined
 * message. When clicked, it populates the chat input field with its content.
 *
 * @component
 * @param {ChatMessagePresetProps} props - The properties for the component.
 * @returns {JSX.Element} A clickable div element containing the preset message.
 */
export default function ChatMessagePreset({
  content,
  setMessage,
}: ChatMessagePresetProps) {
  return (
    <div className={styles.preset} onClick={() => setMessage(content)}>
      {/* When clicked, sets the chat input message to the preset content. */}
      {content}
    </div>
  );
}
