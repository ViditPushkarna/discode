import styles from "../../styles/popup/CreateServer.module.css";
import { useState } from "react";
import axios from "axios";

export default function createServer(props) {
  const { setView } = props;
  const [name, setName] = useState("");

  const click = () => {
    // axios.
  };

  return (
    <div className={styles.container}>
      <div className={styles.popUp}>
        <img
          className={styles.cancel}
          src="/cancelButton.svg"
          onClick={() => setView(false)}
        />
        <input
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
