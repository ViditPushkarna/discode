import { useState, useEffect } from "react";
import styles from "../../../../styles/Server.module.css";
import Channel from "../../../../components/tiles/channel";
import Server from "../../../../components/tiles/server";
import Editor from "../../../../components/tiles/editor";
import Message from "../../../../components/chat/message";
import CreateChannel from "../../../../components/popup/createChannel";
import CreateEditor from "../../../../components/popup/createEditor";
import axios from "axios";
import io from "socket.io-client";
import Router, { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const ids = router.query;

  const [createChannelPopup, setCreateChannelPopup] = useState(false);
  const [createEditorPopup, setCreateEditorPopup] = useState(false);

  const [channellist, setchannellist] = useState([]);
  const [editorlist, seteditorlist] = useState([]);
  const [serverlist, setserverlist] = useState([]);
  const [messages, setmessages] = useState([]);

  const getMessages = () => {
    const token = localStorage.getItem("token");
    if (!token) return Router.push("/signup");

    const req = {
      channel_id: ids.channel,
    };

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
    if (!user) return Router.push("/signup");

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

  const getInfo = () => {
    const token = localStorage.getItem("token");
    if (!token) return Router.push("/signup");

    const req = {
      server_id: ids.server,
    };

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

          localStorage.setItem(
            "editorList",
            JSON.stringify({
              server: ids.server,
              editorList: res.data.editors,
            })
          );

          seteditorlist(res.data.editors);
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

    const socket = io.connect("http://localhost:5000/");
    const user = JSON.parse(localStorage.getItem("user"));

    socket.emit("joinChat", {
      channel_id: ids.channel,
      user_id: user._id,
    });
    socket.on("entered_chat", (data) => {
      // console.log(data);
    });

    document.addEventListener("deleteMsg", (data) => {
      // console.log(socket);
      socket.emit("delete_message", data.detail);
    });

    const btn = document.getElementById("btn");
    const inp = document.getElementById("text");

    const callbackClick = (_e) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const input = document.getElementById("text");
      if (input.value === "") return;

      socket.emit("create_message", {
        sender_id: user._id,
        message_data: input.value,
        channel_id: ids.channel,
      });
      input.value = "";
    };

    const callbackKeyup = (e) => {
      if (e.key !== "Enter") return;

      const user = JSON.parse(localStorage.getItem("user"));
      const input = document.getElementById("text");
      if (input.value === "") return;

      // console.log(socket);

      // socket.emit("pohcha?", "yes");
      socket.emit("create_message", {
        sender_id: user._id,
        message_data: input.value,
        channel_id: ids.channel,
      });
      input.value = "";
    };

    btn.addEventListener("click", callbackClick);

    inp.addEventListener("keyup", callbackKeyup);

    const c = localStorage.getItem("channelList");
    const e = localStorage.getItem("editorList");
    if (
      c &&
      c.server === ids.server &&
      c.channelList &&
      e &&
      e.server === ids.server &&
      e.editorList
    ) {
      setchannellist(c.channelList);
      seteditorlist(e.editorList);
    } else getInfo();

    socket.on("new_message_created", (data) => {
      setmessages((arr) => {
        return [...arr, data];
      });
    });

    socket.on("message_deleted", (id) => {
      // console.log(id);
      setmessages((arr) => {
        return arr.filter((m) => m.message_id !== id);
      });
    });

    getMessages();

    return () => {
      const tfield = document.getElementById("text");
      if (tfield) tfield.removeEventListener("keyup", callbackKeyup);
      const btninp = document.getElementById("btn");
      if (btninp) btninp.removeEventListener("click", callbackClick);
      socket.disconnect();
    };
  }, [ids]);

  useEffect(() => {
    const chatDiv = document.getElementById("scrollChat");
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }, [messages]);

  return (
    <>
      {createChannelPopup ? (
        <CreateChannel id={ids.server} setView={setCreateChannelPopup} />
      ) : null}

      {createEditorPopup ? (
        <CreateEditor id={ids.server} setView={setCreateEditorPopup} />
      ) : null}
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
            <p
              className={styles.addChannel}
              onClick={() => setCreateChannelPopup(true)}
            >
              Add+ Channel
            </p>

            <br />

            {editorlist.map((ch) => {
              return (
                <Editor
                  key={ch.editor_id}
                  id={ch.editor_id}
                  name={ch.editor_name}
                  server={ids.server}
                />
              );
            })}

            <p
              className={styles.addChannel}
              onClick={() => setCreateEditorPopup(true)}
            >
              Add+ Editor
            </p>
          </div>
          <div className="controller"></div>
        </div>

        <div className="row2">
          <div className="free"></div>
          <div className="maindiv">
            <div id="scrollChat" className="messages_container">
              {messages.map((m) => (
                <Message
                  key={m.message_id}
                  id={m.message_id}
                  text={m.text}
                  sender={m.sender}
                />
              ))}
            </div>

            <div className="chatBox">
              <div className="inputBox">
                <input spellCheck="false" autoComplete="off" id="text" />
                <button id="btn">Send</button>
              </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
