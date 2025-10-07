import { RefObject } from "react";
import styles from "./css/chatCloseButton.module.css";

interface ChatCloseButtonProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
}

export default function ChatCloseButton({ dialogRef }: ChatCloseButtonProps) {
  return (
    <button onClick={() => dialogRef.current?.close()} className={styles.close}>
      Fermer X
    </button>
  );
}
