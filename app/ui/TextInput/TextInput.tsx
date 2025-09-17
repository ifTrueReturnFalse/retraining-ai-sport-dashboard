import styles from "./TextInput.module.css";

interface TextInputProps {
  type?: string;
  id: string;
  labelText: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}


/**
 * `TextInput` is a reusable input component with an associated label.  
 * It supports customization of type, value, state (enabled/disabled), 
 * styling, and change handling.
 *
 * Props:
 * - `type?: string` — Defines the input type (default: `"text"`).
 * - `id: string` — Unique identifier for the input, linked to the label.
 * - `labelText: string` — The text displayed in the label associated with the input.
 * - `value?: string` — Controlled value of the input field.
 * - `disabled?: boolean` — Whether the input should be disabled (default: `false`).
 * - `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void` — Callback triggered when the value changes.
 * - `className?: string` — Optional extra CSS class(es) for custom styling.
 *
 * Example usage:
 * ```tsx
 * <TextInput
 *   id="username"
 *   labelText="Username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 * ```
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
    <>
      <label htmlFor={id} className={styles.label}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        disabled={disabled}
        onChange={onChange}
        value={value}
        className={`${className} ${styles.input}`}
      />
    </>
  );
}
