import styles from "../../styles/popup/CreateServer.module.css";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function createServer(props) {
  const { setView } = props;
  const [name, setName] = useState("");

  const click = e => {
    if (e.type === "keyup" && e.key !== "Enter") return;

    const user = JSON.parse(localStorage.getItem("user"));

    const req = {
      user_email: user.email,
      server_name: name,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/server/createServer", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          let s = JSON.parse(localStorage.getItem("serverList"));
          console.log(s)

          if (s && Array.isArray(s)) {
            s.push(res.data.server)
            localStorage.setItem("serverList", JSON.stringify(s))
          } else {
            localStorage.setItem("serverList", JSON.stringify([res.data.server]))
          }

          Router.push("/server/" + res.data.server.server_id);
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
