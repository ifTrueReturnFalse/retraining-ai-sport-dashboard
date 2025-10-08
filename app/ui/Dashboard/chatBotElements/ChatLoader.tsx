import ChatAIPicture from "./ChatAIPicture";
import styles from "./css/ChatLoader.module.css"

export default function ChatLoader() {
  return (
    <div className={styles.container}>
      <ChatAIPicture />
      <div className={styles.animationContainer}>
        <div className={`${styles.ball} ${styles.ball1}`}></div>
        <div className={`${styles.ball} ${styles.ball2}`}></div>
        <div className={`${styles.ball} ${styles.ball3}`}></div>
        <div className={`${styles.ball} ${styles.ball4}`}></div>
      </div>
    </div>
  )
}
