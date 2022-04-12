import styles from "../../styles/popup/CreateChannel.module.css"
import { useState } from "react"
import axios from "axios"
import Router from 'next/router'

export default function createChannel(props) {
    const {
        setView,
        id
    } = props

    const [name, setName] = useState("");

    const click = () => {
        const req = {
            channel_name: name,
            server_id: id
        }

        const token = localStorage.getItem('token')

        axios.post("http://192.168.1.40:5000/channel/createChannel", req, {
            headers: {
                "Authorization": token
            }
        }).then(res => {
            if (res.data.success) {
                Router.push('/server/' + id + '/' + res.data.channel._id)
            } else throw res.data.message
        }).catch(err => {
            console.log(err)
            if (err.response && err.response.data === "Unauthorized") Router.push('/signup')
        })
    }

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
