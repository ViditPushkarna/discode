import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Channel from "../components/tiles/channel";
import CreateServerPopup from "../components/popUp/createServer";
import Member from "../components/tiles/member";
import Server from "../components/tiles/server";
import axios from 'axios'

export default function Home() {
  const [createServer, setCreateServerPopup] = useState(false)
  const [serverlist, setserverlist] = useState([])

  const getServers = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const req = {
      user_id: user._id
    }

    const token = localStorage.getItem('token')

    axios.post("http://192.168.1.40:5000/user/userInfo", req, {
      headers: {
        "Authorization": token
      }
    }).then(res => {
      if (res.data.success) {
        localStorage.setItem('serverList', JSON.stringify(res.data.servers))
        setserverlist(res.data.servers)
        console.log(res.data.servers)
      } else throw res.data.message
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getServers()
  }, [])

  return (
    <>
      {createServer ? (
        <CreateServerPopup setView={setCreateServerPopup} />
      ) : null}
      <div className="page">
        <div className="row1">
          <div className="activenow channel">
            <div className="active-head">
              <h4>Active Now</h4>
            </div>
            <Channel></Channel>
            <Channel></Channel>
          </div>
          <div className="controller">
            <div></div>
          </div>
        </div>

        <div className="row2">
          <div className="free"></div>
          <div className="maindiv"></div>
        </div>
        <div className="row3">
          <div className="sidestick">
            {serverlist.map(s => {
              return <Server id={s.server_id} name={s.server_name}/>
            })}

            <div
              className={styles.createServer}
              onClick={() => setCreateServerPopup(true)}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
