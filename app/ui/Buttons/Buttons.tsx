import styles from "./Buttons.module.css";

interface ButtonsProps {
  buttonText: string;
  isSubmitButton: boolean;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  buttonText,
  isSubmitButton,
  handleClick,
  disabled = false,
  className,
}: ButtonsProps) {
  return (
    <button
      type={isSubmitButton ? "submit" : "button"}
      onClick={handleClick}
      disabled={disabled}
      className={`${className} ${styles.button}`}
    >
      {buttonText}
    </button>
  );
}
