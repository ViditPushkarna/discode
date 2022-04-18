import Router from "next/router"
import styles from "../../styles/tiles/Channel.module.css";

export default function channelTab(props) {
  const {
    id, 
    name,
    server,
  } = props

  return (
    <div key={id} className={styles.container} onClick={() => {
      Router.push('/server/' + server + '/channel/' + id)
    }}>
      <h5>👉🏿😎👈 {name}</h5>
    </div>
  );
}
