import styles from "./Buttons.module.css";
import Image from "next/image";

interface ButtonsProps {
  buttonText: string;
  isSubmitButton: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * `Button` is a reusable button component with optional submit behavior,
 * click handler, disabled state, and custom styling.
 *
 * Props:
 * - `buttonText: string` — The text displayed inside the button.
 * - `isSubmitButton: boolean` — Determines if the button acts as a form submit (`true`) or standard button (`false`).
 * - `handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void` — Optional click handler for non-submit buttons.
 * - `disabled?: boolean` — Whether the button is disabled (default: `false`).
 * - `className?: string` — Optional additional CSS classes for custom styling.
 *
 * Example usage:
 * ```tsx
 * // Standard button
 * <Button
 *   buttonText="Click me"
 *   isSubmitButton={false}
 *   handleClick={(e) => console.log("Button clicked")}
 * />
 *
 * // Submit button inside a form
 * <form onSubmit={handleFormSubmit}>
 *   <Button
 *     buttonText="Submit"
 *     isSubmitButton={true}
 *     disabled={isSubmitting}
 *     className="my-custom-class"
 *   />
 * </form>
 * ```
 *
 * Notes:
 * - When `isSubmitButton` is true, `handleClick` is typically not needed,
 *   as form submission is handled via the form's `onSubmit`.
 * - The `className` prop allows you to pass extra styling on top of the default styles from `Buttons.module.css`.
 */
export function Button({
  buttonText,
  isSubmitButton,
  onClick,
  disabled = false,
  className,
}: ButtonsProps) {
  return (
    <button
      type={isSubmitButton ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${styles.button}`}
    >
      {buttonText}
    </button>
  );
}

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export function ArrowButton({
  direction,
  onClick,
  className,
}: ArrowButtonProps) {
  return (
    <button onClick={onClick} className={`${styles.arrowButton} ${className}`}>
      {direction === "left" ? "<" : ">"}
    </button>
  );
}

interface SendButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
}

export function SendButton({ onClick, className, disabled }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${styles.sendButton} ${className}`}
      disabled={disabled}
    >
      <Image
        src="/up_arrow.svg"
        alt="Send your prompt"
        height={16}
        width={11}
      />
    </button>
  );
}
