import LoginForm from "@/app/ui/login-form";
import Image from "next/image";
import styles from "./SignIn.module.css";

export default function Page() {
  return (
    <div className={styles.signInPage}>
      <div className={styles.form}>
        <LoginForm />
      </div>

      <div className={styles.imageContainer}>
        <Image
          src="/sign-in-running-people.png"
          alt="Running people"
          width={808}
          height={1024}
        />
        <p className={styles.hint}>
          Analysez vos performances en un clin d&apos;œil,
          <br /> suivez vos progrès et atteignez vos objectifs.
        </p>
      </div>
    </div>
  );
}
