import { useState, useRef, useEffect } from "react";
import styles from "../../../../styles/Editor.module.css";
import Channel from "../../../../components/tiles/channel";
import Server from "../../../../components/tiles/server";
import Editor from "../../../../components/tiles/editor";
import CreateChannel from "../../../../components/popup/createChannel";
import CreateEditor from "../../../../components/popup/createEditor";
import axios from "axios";
import io from "socket.io-client";
import Router, { useRouter } from "next/router";

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const ids = router.query;

  const [createChannelPopup, setCreateChannelPopup] = useState(false);
  const [createEditorPopup, setCreateEditorPopup] = useState(false);

  const [channellist, setchannellist] = useState([]);
  const [editorlist, seteditorlist] = useState([]);
  const [serverlist, setserverlist] = useState([]);

  const [lang, setlang] = useState('javascript')
  const [mount, setMounted] = useState(false)
  const monacoRef = useRef(null)


  const getServers = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) return Router.push("/signup");

    const req = {
      user_id: user._id,
    };

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

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = editor;
    setMounted(true)
  }

  useEffect(() => {
    if (!mount || ids.server === undefined) return

    const c = localStorage.getItem("channelList");
    const e = localStorage.getItem("editorList");
    if (c && c.server === ids.server && c.channelList && e && e.server === ids.server && e.editorList) {
      setchannellist(c.channelList)
      seteditorlist(e.editorList)
    } else getInfo();

    const socket = io("http://localhost:5000/");

    document.getElementById('saveEditor').addEventListener('click', () => {
      socket.emit('saveData', {
        editor_id: ids.editor,
        text: monacoRef.current.getValue(),
        lang
      })
    }) 

    socket.emit("joinEditor", ids.editor);
    socket.on("joinData", data => {
      setlang(data.lang)
      monacoRef.current.getModel().setValue(data.text)
    })

    socket.on("requestingData", () => {
      socket.emit('editorChangesSend', monacoRef.current.getValue())
    })

    socket.on('editorChanges', data => {
      monacoRef.current.getModel().setValue(data)
    })

    document.addEventListener('keyup', e => {
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Tab' || e.key === 'Delete') {
        socket.emit('editorChangesSend', monacoRef.current.getValue())
      }
    })

    document.getElementById('selectlang').addEventListener('change', e => {
      setlang(e.target.value)
      socket.emit('changeLangSend', e.target.value)
    })

    socket.on('changeLang', data => {
      setlang(data)
    })

    return () => {
      socket.disconnect();
    };
  }, [mount, ids])

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

            <div className={styles.headEditor}>
              <select id="selectlang" value={lang}>
                <option value="html">html</option>
                <option value="css">css</option>
                <option value="javascript">javascript</option>
                <option value="json">json</option>
              </select>

              <button id="saveEditor">save</button>
            </div>
            <MonacoEditor
              height="70vh"
              language={lang}
              defaultValue="// code goes here"
              theme="vs-dark"
              onMount={handleEditorDidMount}
            />


          </div>
        </div>
        <div className="row3">
          <div className="sidestick">
            {serverlist.map((s) => {
              return <Server key={s.server_id} id={s.server_id} name={s.server_name} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
