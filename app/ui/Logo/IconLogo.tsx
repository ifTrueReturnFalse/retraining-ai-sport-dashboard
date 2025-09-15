import styles from "./IconLogo.module.css";

export default function IconLogo() {
  return (
    <div className="h-[20.66px] w-[19px] pt-[2px]">
      <div>
        <div className={`${styles.redbar} ${styles.bar1} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar1} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar2} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar2} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar3} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar3} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar4} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar4} ${styles.bar}`}></div>
      </div>
      <div>
        <div className={`${styles.redbar} ${styles.bar5} ${styles.bar}`}></div>
        <div className={`${styles.bluebar} ${styles.bar5} ${styles.bar}`}></div>
      </div>
    </div>
  );
}
