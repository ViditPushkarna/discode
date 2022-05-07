import Router from "next/router"
import styles from "../../styles/tiles/Voice.module.css";

export default function voiceTab(props) {
  const {
    id, 
    name,
    server,
    join
  } = props

  return (
    <div key={id} className={styles.container} onClick={() => {
      join(id)
      // Router.push('/server/' + server + '/editor/' + id)
    }}>
      <h5>🎤{name}</h5>
    </div>
  );
}
