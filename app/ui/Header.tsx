import Logo from "@/app/ui/Logo/Logo";
import NavBar from "@/app/ui/NavBar";
import styles from "./Common.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <Logo />
      <NavBar />
    </div>
  );
}
