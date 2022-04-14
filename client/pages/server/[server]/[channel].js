import { useState, useEffect } from "react";
import styles from "../../../styles/Server.module.css";
import Channel from "../../../components/tiles/channel";
import Server from "../../../components/tiles/server";
import Message from "../../../components/chat/message";
import axios from "axios";
import io from "socket.io-client";
import Router, { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const ids = router.query;

  const [channellist, setchannellist] = useState([]);
  const [serverlist, setserverlist] = useState([]);
  const [messages, setmessages] = useState([]);

  const getMessages = () => {
    const req = {
      channel_id: ids.channel,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/message/fetchAll", req, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setmessages(res.data.messages);
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

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

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (ids.server === undefined) return;

    const socket = io("http://localhost:5000/");
    const user = JSON.parse(localStorage.getItem("user"));

    socket.emit("joinChat", {
      channel_id: ids.channel,
      user_id: user._id,
    });

    document.addEventListener("deleteMsg", data => {
      socket.emit('delete_message', data.detail)
    })

    const btn = document.getElementById("btn");

    btn.addEventListener("click", (e) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const input = document.getElementById("text");

      socket.emit("create_message", {
        sender_id: user._id,
        message_data: input.value,
        channel_id: ids.channel,
      });
    });

    const c = localStorage.getItem("channelList");
    if (c && c.server === ids.server && c.channelList)
      setchannellist(c.channelList);
    else getChannels();

    socket.on("new_message_created", (data) => {
      console.log(data);
      setmessages((arr) => {
        return [...arr, data]
      })
    })

    socket.on("message_deleted", id => {
      console.log(id)
      setmessages(arr => {
        return arr.filter(m => m.message_id !== id)
      })
    })

    getMessages();

    return () => {
      socket.disconnect();
    };
  }, [ids]);

  return (
    <div className="page">
      <div className="row1">
        <div className="channel">
          <div className={styles.servername}>
            <h4>Server Name</h4>
          </div>

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
        </div>
        <div className="controller"></div>
      </div>

      <div className="row2">
        <div className="free"></div>
        <div className="maindiv">
          {messages.map((m) => (
            <Message
              key={m.message_id}
              id={m.message_id}
              text={m.text}
              sender={m.sender}
            />
          ))}

          <div className="chatBox">
            <div className="inputBox">
              <input spellCheck="false" id="text" />
              <button id="btn">Send</button>
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
  );
}
