import styles from "./Buttons.module.css";
import Image from "next/image";

interface ButtonsProps {
  buttonText: string;
  /**
   * Determines if the button acts as a form submit (`true`) or standard button (`false`).
   */
  isSubmitButton: boolean;
  /**
   * Optional click handler for non-submit buttons.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Whether the button is disabled (default: `false`).
   */
  disabled?: boolean;
  /**
   * Optional additional CSS classes for custom styling.
   */
  className?: string;
}

/**
 * `Button` is a reusable button component with optional submit behavior,
 * click handler, disabled state, and custom styling.
 *
 * When `isSubmitButton` is `true`, `onClick` is typically not needed,
 * as form submission is handled via the form's `onSubmit`.
 * The `className` prop allows you to pass extra styling on top of the default styles from `Buttons.module.css`.
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
  /**
   * The direction of the arrow, either "left" or "right".
   */
  direction: "left" | "right";
  /**
   * Optional click handler for the button.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Optional additional CSS classes for custom styling.
   */
  className?: string;
}

/**
 * `ArrowButton` is a reusable component for displaying a directional arrow button.
 * It can be used for navigation or to cycle through content.
 * @param {ArrowButtonProps} props - The properties for the component.
 */

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
  /**
   * Optional click handler for the button.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Optional additional CSS classes for custom styling.
   */
  className?: string;
  /**
   * Whether the button is disabled (default: `false`).
   */
  disabled?: boolean;
}

/**
 * `SendButton` is a specialized button component typically used for submitting messages or input.
 * It displays an upward-pointing arrow icon.
 * @param {SendButtonProps} props - The properties for the component.
 */
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
