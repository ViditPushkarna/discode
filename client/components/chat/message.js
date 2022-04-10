import styles from "../../styles/chat/Message.module.css";

export default function message() {
  return (
    <div className={styles.message_box}>
      <div className={styles.profile}>
        {/* <img src="/vercel.svg"></img> */}
      </div>
      <div className={styles.username}>
        <h3>Redskull</h3>
      </div>
    </div>
  );
}
