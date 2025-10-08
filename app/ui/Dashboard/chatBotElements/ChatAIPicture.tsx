import Image from "next/image";
import styles from "./css/ChatAIPicture.module.css";

export default function ChatAIPicture() {
  return (
    <div className={styles.AIPictureContainer}>
      <Image
        src="/red_stars.svg"
        alt="Your AI assistant"
        height={17.19}
        width={15.96}
      />
    </div>
  );
}
