import styles from "../../styles/chat/Message.module.css";

export default function message() {
  return (
    <div className={styles.message_box}>
      <div className={styles.profile}>
        <img className={styles.profile_picture} src="/me.jpeg"></img>
      </div>
      <div className={styles.username}>
        <h3>Oliv</h3>
      </div>
      <div className={styles.message_div}>
        <p className={styles.message}>Hey, There </p>
      </div>
    </div>
  );
}
