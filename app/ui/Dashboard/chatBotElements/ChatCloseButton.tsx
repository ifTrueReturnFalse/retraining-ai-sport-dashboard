import { RefObject } from "react";
import styles from "./css/chatCloseButton.module.css";

interface ChatCloseButtonProps {
  /**
   * A React ref object pointing to the HTML `<dialog>` element that this button will close.
   * This allows direct manipulation of the dialog's state (e.g., calling `dialogRef.current?.close()`).
   */
  dialogRef: RefObject<HTMLDialogElement | null>; // Ref to the dialog element.
}

/**
 * `ChatCloseButton` is a React functional component that renders a button
 * to close a dialog element. It uses a `RefObject` to interact directly
 * with the native HTML `<dialog>` element's `close()` method.
 *
 * @component
 * @param {ChatCloseButtonProps} { dialogRef } - The properties for the component.
 * @returns {JSX.Element} A button element that closes the associated dialog.
 */
export default function ChatCloseButton({ dialogRef }: ChatCloseButtonProps) {
  return (
    <button onClick={() => dialogRef.current?.close()} className={styles.close}>
      {" "}
      {/* Calls the `close()` method on the dialog element referenced by `dialogRef`. */}
      Fermer X
    </button>
  );
}
