import styles from "./css/ChatHint.module.css"

export default function ChatHint() {
  return (
    <div className={styles.hint}>
      Posez vos questions sur votre programme,
      <br />
      vos performances ou vos objectifs
    </div>
  );
}
