import styles from "../../styles/popup/CreateVoice.module.css";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function createVoice(props) {
  const { setView, id } = props;

  const [name, setName] = useState("");

  const click = (e) => {
    if (e.type === "keyup" && e.key !== "Enter") return;
    const req = {
      channel_name: name,
      server_id: id,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/voice/createVoice", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
            setView(false)
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.popUp}>
        <img
          className={styles.cancel}
          src="/cancelButton.svg"
          onClick={() => setView(false)}
          />

        <h1>Create Voice</h1>

        <input
          className={styles.input}
          value={name}
          spellCheck="false"
          onChange={(e) => setName(e.target.value)}
          onKeyUp={click}
        />
        <button className={styles.button} onClick={click}>
          Create
        </button>
      </div>
    </div>
  );
}
