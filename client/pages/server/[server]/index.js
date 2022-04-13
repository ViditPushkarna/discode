import { useState, useEffect } from "react";
import styles from "../../../styles/Server.module.css";
import Channel from "../../../components/tiles/channel";
import Server from "../../../components/tiles/server";
import Message from "../../../components/chat/message";
import CreateChannel from "../../../components/popup/createChannel";
import axios from "axios";
import Router, { useRouter } from "next/router";


export default function Func() {
  const router = useRouter()
  const ids = router.query
  
  const [createChannelPopup, setCreateChannelPopup] = useState(false);
  const [channellist, setchannellist] = useState([]);
  const [serverlist, setserverlist] = useState([]);

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
          console.log(res.data.servers);
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

  const getChannels = () => {
    const req = {
      server_id: ids.server,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/server/serverInfo", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          localStorage.setItem(
            "channelList",
            JSON.stringify({
              server: ids.server,
              channelList: res.data.channels,
            })
          );

          setchannellist(res.data.channels);
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("serverList"));

    if (s) setserverlist(s);
    else getServers();
  }, []);

  useEffect(() => {
    if (ids.server === undefined) return;

    const c = localStorage.getItem("channelList");
    if (c && c.server === ids.server && c.channelList)
      setchannellist(c.channelList);
    else getChannels();
  }, [ids]);

  return (
    <>
      {createChannelPopup ? (
        <CreateChannel id={ids.server} setView={setCreateChannelPopup} />
      ) : null}

      <div className="page">
        <div className="row1">
          <div className="channel">
            {channellist.map((ch) => {
              return (
                <Channel
                  key={ch.channel_id}
                  id={ch.channel_id}
                  name={ch.channel_name}
                  server={ids.server}
                />
              );
            })}
            <p className={styles.addChannel} onClick={() => setCreateChannelPopup(true)}>Add+</p>
          </div>
          <div className="controller"></div>
        </div>

        <div className="row2">
          <div className="free"></div>
          <div className="maindiv">
            <Message />

            <div className="chatBox">
              <div className="inputBox">
                <input spellCheck="false" />
                <button>Send</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row3">
          <div className="sidestick">
            {serverlist.map((s) => {
              return <Server id={s.server_id} name={s.server_name} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
