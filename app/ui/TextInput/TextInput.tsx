import styles from "./TextInput.module.css";

interface TextInputProps {
  type?: string;
  id: string;
  labelText: string;
  value?: string;
  disabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function TextInput({
  type = "text",
  id,
  labelText,
  value,
  disabled = false,
  handleChange,
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
        onChange={handleChange}
        value={value}
        className={`${className} ${styles.input}`}
      />
    </>
  );
}
