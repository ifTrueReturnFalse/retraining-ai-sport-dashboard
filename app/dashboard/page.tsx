import { Button } from "@/app/ui/Buttons/Buttons";
import Image from "next/image";
import styles from "./dashboard.module.css";

export default function Page() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.chatbotHint}>
        <Image src="/stars.svg" alt="Nice little stars to feel the IA magic !" width={19} height={20.46} className="mr-5" />
        <p className="mr-15">
          Posez vos questions sur votre programme, vos performances ou vos
          objectifs.
        </p>
        <Button isSubmitButton={false} buttonText="Lancer une conversation" />
      </div>
    </div>
  );
}
