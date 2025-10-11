import ChatAIPicture from "./ChatAIPicture";
import styles from "./css/ChatLoader.module.css";

export default function ChatLoader() {
  /**
   * `ChatLoader` is a React functional component that displays a loading animation
   * within the chat interface, typically indicating that the AI assistant is typing or processing.
   * It includes the `ChatAIPicture` component and a series of animated balls.
   *
   * @component
   * @returns {JSX.Element} A loading animation with the AI's picture.
   */
  return (
    <div className={styles.container}>
      <ChatAIPicture />
      <div className={styles.animationContainer}>
        {/* Four animated balls create a typing indicator effect.
            Each ball has a base style (`styles.ball`) and a specific animation delay (`styles.ball1` to `styles.ball4`). */}
        <div className={`${styles.ball} ${styles.ball1}`}></div>
        <div className={`${styles.ball} ${styles.ball2}`}></div>
        <div className={`${styles.ball} ${styles.ball3}`}></div>
        <div className={`${styles.ball} ${styles.ball4}`}></div>
      </div>
    </div>
  );
}
