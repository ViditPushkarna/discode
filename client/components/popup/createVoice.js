import styles from "../../styles/popup/CreateVoice.module.css";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function createVoice(props) {
  const { setView, id, config } = props;

  const [name, setName] = useState("");

  const click = (e) => {
    if (e.type === "keyup" && e.key !== "Enter") return;
    const req = {
      voice_name: name,
      server_id: id,
    };

    const token = localStorage.getItem("token");

    axios
      .post(`${config.SERVER}/voice/createVoice`, req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const v = JSON.parse(localStorage.getItem("voiceList"));
          v.voiceList.push({
            voice_id: res.data.voice._id,
            voice_name: res.data.voice.name,
          })

          localStorage.setItem('voiceList', JSON.stringify(v))
          setView(false)
          Router.reload()
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
