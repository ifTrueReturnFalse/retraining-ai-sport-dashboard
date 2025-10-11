import { useEffect, useState } from "react";
import styles from "./css/ChatAllTokensUsed.module.css";

const TOKEN_STORAGE = "sportsee-token-management";

/**
 * `ChatAllTokensUsed` is a React functional component that informs the user
 * that they have exhausted their AI token limit and displays the reset date and time.
 *
 * It retrieves the token reset information from `localStorage`.
 *
 * @component
 * @returns {JSX.Element | null} A message indicating token limit reached and reset time, or `null` if not mounted.
 */
export default function ChatAllTokensUsed() {
  const [isMounted, setIsMounted] = useState(false); // State to track if the component is mounted on the client side.
  const [dateToDisplay, setDateToDisplay] = useState(""); // State to store the formatted reset date and time.

  useEffect(() => {
    setIsMounted(true); // Set `isMounted` to true once the component mounts.

    // Retrieve token management data from `localStorage`.
    // The `TOKEN_STORAGE` key is used to store an object containing `resetDate`.
    const tokenData = window.localStorage.getItem(TOKEN_STORAGE);
    if (tokenData !== null) {
      const parsedData = JSON.parse(tokenData);
      if (parsedData.resetDate) {
        setDateToDisplay(
          new Date(parsedData.resetDate).toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
            // Format the date to display day, month, hour, and minute.
            // Example: "01/01 12:30"
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
    // Render nothing on the server side or before the component mounts on the client.
    return null;
  }

  return (
    <div className={styles.container}>
      Votre limite d&apos;utilisation du coach IA sera débloqué le{" "}
      <span className={styles.date}>{dateToDisplay}</span>
    </div>
  );
}
