import styles from "../../styles/tiles/Member.module.css";

export default function Member(props) {
  return (
    <div className={styles.container}>
      <div className={styles.profile_picture}> </div>
      <div className={styles.user_name}>Oliv</div>
    </div>
  );
}
