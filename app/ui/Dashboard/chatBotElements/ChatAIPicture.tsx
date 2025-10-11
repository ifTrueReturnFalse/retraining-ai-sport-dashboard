import Image from "next/image";
import styles from "./css/ChatAIPicture.module.css";

export default function ChatAIPicture() {
  /**
   * `ChatAIPicture` is a React functional component that displays an image
   * representing the AI assistant in the chat interface.
   * @component
   * @returns {JSX.Element} An image element wrapped in a div, representing the AI.
   */
  return (
    <div className={styles.AIPictureContainer}>
      <Image
        src="/red_stars.svg"
        alt="Your AI assistant"
        height={17.19} // Fixed height for the image.
        width={15.96} // Fixed width for the image.
      />
    </div>
  );
}
