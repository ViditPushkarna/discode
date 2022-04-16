import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Channel from "../components/tiles/channel";
import CreateServerPopup from "../components/popUp/createServer";
import Member from "../components/tiles/member";
import Server from "../components/tiles/server";
import axios from "axios";
import Router from "next/router";

export default function Home() {
  const [createServer, setCreateServerPopup] = useState(false);
  const [serverlist, setserverlist] = useState([]);
  const [newserver, setnewserver] = useState("");

  const getServers = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const req = {
      user_id: user._id,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/user/userInfo", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("serverList", JSON.stringify(res.data.servers));
          setserverlist(res.data.servers);
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

  const click = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const req = {
      user_id: user._id,
      server_id: newserver,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/server/addMember", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          const s = JSON.parse(localStorage.getItem("serverList"));

          localStorage.setItem(
            "serverList",
            JSON.stringify([...s, res.data.server])
          );
          setserverlist(JSON.parse(localStorage.getItem("serverList")));
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

  useEffect(() => {
    getServers();
  }, []);

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
          </div>
          <div className="controller">
            <div></div>
          </div>
        </div>

        <div className="row2">
          <div className="free"></div>
          <div className="maindiv">
            <div className="invite_div">
              <input
                type="text"
                placeholder="Paste server ID"
                className="server_id"
                value={newserver}
                onChange={(e) => setnewserver(e.target.value)}
              ></input>
              <button className="join" onClick={click}>
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="row3">
          <div className="sidestick">
            {serverlist.map((s) => {
              return (
                <Server
                  key={s.server_id}
                  id={s.server_id}
                  name={s.server_name}
                />
              );
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
