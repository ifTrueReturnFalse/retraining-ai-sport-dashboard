import Image from "next/image";
import { Button } from "@/app/ui/Buttons/Buttons";
import styles from "./ChatbotHint.module.css";

export default function ChatbotHint({
  onClick, // Callback function to be executed when the button is clicked.
}: {
  /**
   * Optional click handler for the "Lancer une conversation" button.
   * This function is typically used to open the chatbot modal.
   * @param {React.MouseEvent<HTMLButtonElement>} e - The mouse event object.
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  /**
   * `ChatbotHint` is a React functional component that displays a hint message
   * to the user, encouraging them to interact with the AI chatbot.
   * It includes an image, a descriptive text, and a button to launch the conversation.
   *
   * @component
   * @param {Object} props - The properties for the component.
   * @param {function} [props.onClick] - Optional click handler for the "Lancer une conversation" button.
   * @returns {JSX.Element} A div element containing the chatbot hint and a button.
   */
  return (
    <div className={styles.chatbotHint}>
      <Image
        src="/stars.svg"
        alt="Nice little stars to feel the AI magic !"
        width={19}
        height={20.46}
        className="mr-5"
      />
      <p className="mr-15">
        Posez vos questions sur votre programme, vos performances ou vos
        objectifs.
      </p>
      <Button
        onClick={onClick}
        isSubmitButton={false}
        buttonText="Lancer une conversation"
      />
    </div>
  );
}
