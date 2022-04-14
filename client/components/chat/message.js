import styles from "../../styles/chat/Message.module.css";

export default function message(props) {
  const {
    id,
    text = "text",
    sender ="sender"
  } = props

  return (
    <div className={styles.message_box}>
      <div className={styles.profile}>
        <img className={styles.profile_picture} src="/me.jpeg"></img>
      </div>
      <div className={styles.username}>
        <h3>{sender}</h3>
      </div>
      <div className={styles.message_div}>
        <p className={styles.message}>{text}</p>
      </div>
      <div className={styles.del} onClick={() => {
        const event = new CustomEvent('deleteMsg', {detail: id})
        document.dispatchEvent(event)
      }}>
        <p>X</p>
      </div>
    </div>
  );
}
