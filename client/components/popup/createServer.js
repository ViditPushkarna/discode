import styles from "../../styles/popup/CreateServer.module.css";
import { useState } from "react";

export default function createServer(props) {
  const { setView } = props;
  const [name, setName] = useState("");

  const click = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.popUp}>
        <img
          className={styles.cancel}
          src="/cancelButton.svg"
          onClick={() => setView(false)}
        />
        <input
          placeholder="Paste server link"
          className={styles.input}
          value={name}
          spellCheck="false"
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.button} onClick={click}>
          Create
        </button>
      </div>
    </div>
  );
}
