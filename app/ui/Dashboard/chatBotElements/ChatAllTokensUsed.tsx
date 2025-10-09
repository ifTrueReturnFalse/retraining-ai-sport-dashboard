import { useEffect, useState } from "react";
import styles from "./css/ChatAllTokensUsed.module.css";

const TOKEN_STORAGE = "sportsee-token-management";

export default function ChatAllTokensUsed() {
  const [isMounted, setIsMounted] = useState(false);
  const [dateToDisplay, setDateToDisplay] = useState("");

  useEffect(() => {
    setIsMounted(true);
    const tokenData = window.localStorage.getItem(TOKEN_STORAGE);
    if (tokenData !== null) {
      const parsedData = JSON.parse(tokenData);
      if (parsedData.resetDate) {
        setDateToDisplay(
          new Date(parsedData.resetDate).toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      Votre limite d&apos;utilisation du coach IA sera débloqué le{" "}
      <span className={styles.date}>{dateToDisplay}</span>
    </div>
  );
}
