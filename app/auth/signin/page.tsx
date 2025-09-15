import LoginForm from "@/app/ui/login-form";
import Image from "next/image";
import styles from "./SignIn.module.css";

export default function Page() {
  return (
    <div className={styles.signInPage}>
      <div className="flex-1 flex items-center">
        <LoginForm />
      </div>

      <Image
        src="/sign-in-running-people.png"
        alt="Running people"
        width={808}
        height={1024}
      />
    </div>
  );
}
