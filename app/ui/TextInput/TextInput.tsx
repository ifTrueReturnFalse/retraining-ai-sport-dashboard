import styles from "./TextInput.module.css";

/**
 * Props for the `TextInput` component.
 */
interface TextInputProps {
  /**
   * The type of the input element (e.g., "text", "password", "email").
   * @default "text"
   */
  type?: string;
  /**
   * The unique identifier for the input element.
   * This `id` is also used to link the label to the input.
   */
  id: string;
  /**
   * The text content for the label associated with the input.
   */
  labelText: string;
  /**
   * The current value of the input field.
   * This makes the component a controlled component.
   */
  value?: string;
  /**
   * If `true`, the input field will be disabled and uneditable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback function to be invoked when the input's value changes.
   * It receives a `React.ChangeEvent<HTMLInputElement>` as an argument.
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optional additional CSS class names to apply to the input element for custom styling.
   */
  className?: string;
}

/**
 * `TextInput` is a React functional component that renders a labeled input field.
 * It provides controlled input functionality, allowing for various types,
 * disabled states, and custom styling.
 *
 * @component
 * @param {TextInputProps} props - The properties for the component.
 * @returns {JSX.Element} A `label` element associated with an `input` element.
 */
export default function TextInput({
  type = "text",
  id,
  labelText,
  value,
  disabled = false,
  onChange,
  className,
}: TextInputProps) {
  return (
    <div className={styles.textInputContainer}>
      {/* Label for the input field, linked by the `htmlFor` attribute to the input's `id`. */}
      <label htmlFor={id} className={styles.label}>
        {labelText} {/* Displays the provided `labelText`. */}
      </label>
      {/* Input element with dynamic attributes based on props. */}
      <input
        type={type} // Sets the input type (e.g., "text", "password").
        id={id} // Unique identifier for the input.
        disabled={disabled} // Controls whether the input is editable.
        onChange={onChange} // Event handler for input value changes.
        value={value} // Controlled value of the input.
        className={`${className} ${styles.input}`} // Applies base and optional custom CSS classes.
      />
    </div>
  );
}
