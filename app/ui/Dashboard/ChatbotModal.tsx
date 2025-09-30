import { RefObject } from "react";
import Image from "next/image";
import styles from "./ChatModal.module.css";
import { SendButton } from "@/app/ui/Buttons/Buttons";

export default function ChatbotModal({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <button
          onClick={() => dialogRef.current?.close()}
          className={styles.close}
        >
          Fermer X
        </button>

        <div className={styles.hint}>
          Posez vos questions sur votre programme,
          <br />
          vos performances ou vos objectifs
        </div>

        <form className={styles.textInputContainer}>
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
          ></textarea>
          <SendButton className={styles.sendButton} />
        </form>
      </div>
    </dialog>
  );
}
