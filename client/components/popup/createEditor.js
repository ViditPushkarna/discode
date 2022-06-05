import styles from "../../styles/popup/CreateEditor.module.css";
import { useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function createEditor(props) {
    const { setView, id, config } = props;
    const [name, setName] = useState("");

    const click = (e) => {
        if (e.type === "keyup" && e.key !== "Enter") return;
        const req = {
            editor_name: name,
            server_id: id,
        };

        const token = localStorage.getItem("token");

        axios
            .post(`${config.SERVER}/editor/createEditor`, req, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                if (res.data.success) {
                    setView(false)                    
                    Router.push("/server/" + id + "/editor/" + res.data.editor._id);
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

                <h1>Create Editor</h1>

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
