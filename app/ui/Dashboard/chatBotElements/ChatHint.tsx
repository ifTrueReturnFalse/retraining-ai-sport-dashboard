import styles from "./css/ChatHint.module.css";

export default function ChatHint() {
  /**
   * `ChatHint` is a React functional component that displays a guiding message
   * to the user within the chat interface, suggesting types of questions they can ask.
   * @component
   * @returns {JSX.Element} A div element containing the hint text.
   */
  return (
    <div className={styles.hint}>
      Posez vos questions sur votre programme,
      <br />
      vos performances ou vos objectifs
    </div>
  );
}
