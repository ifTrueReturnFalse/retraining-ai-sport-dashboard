import { Button } from "@/app/ui/Buttons/Buttons";
import styles from "./dashboard.module.css";

export default function Page() {
  return (
    <div>
      <div className={styles.chatbotHint}>
        <p>
          Posez vos questions sur votre programme, vos performances ou vos
          objectifs.
        </p>
        <Button isSubmitButton={false} buttonText="Lancer une conversation" />
      </div>
    </div>
  );
}
