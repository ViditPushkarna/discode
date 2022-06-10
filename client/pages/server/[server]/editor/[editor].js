import { useState, useRef, useEffect } from "react";
import styles from "../../../../styles/Editor.module.css";
import Channel from "../../../../components/tiles/channel";
import Server from "../../../../components/tiles/server";
import Voice from "../../../../components/tiles/voice";
import Editor from "../../../../components/tiles/editor";
import CreateChannel from "../../../../components/popup/createChannel";
import CreateVoice from "../../../../components/popup/createVoice";
import CreateEditor from "../../../../components/popup/createEditor";
import axios from "axios";
import io from "socket.io-client";
import Router, { useRouter } from "next/router";

import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

export default function Home(props) {
  const {config} = props

  const router = useRouter();
  const ids = router.query;

  const [createChannelPopup, setCreateChannelPopup] = useState(false);
  const [createEditorPopup, setCreateEditorPopup] = useState(false);
  const [createVoicePopup, setCreateVoicePopup] = useState(false);
  const [terminalPopup, setterminalPopup] = useState(false);

  const [channellist, setchannellist] = useState([]);
  const [editorlist, seteditorlist] = useState([]);
  const [voicelist, setvoicelist] = useState([]);
  const [serverlist, setserverlist] = useState([]);

  const [subscriberArr, setSubscriberArr] = useState([true, false, false, false, false])
  const [publisher, setPublisher] = useState()
  const [session, setSession] = useState()
  const [joiningVoice, setjoiningVoice] = useState(false)
  const [mic, setMic] = useState(false)
  const [cam, setCam] = useState(false)

  const [lang, setlang] = useState('javascript')
  const [mount, setMounted] = useState(false)
  const monacoRef = useRef(null)

  const [input, setinput] = useState('')
  const [output, setoutput] = useState('')
  const [err, seterr] = useState('')

  const getServers = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!user || !token) return Router.push("/signup");

    const req = {
      user_id: user._id,
    };

    axios
      .post(`${config.SERVER}/user/userInfo`, req, {
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
      .post(`${config.SERVER}/server/serverInfo`, req, {
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

          localStorage.setItem(
            "voiceList",
            JSON.stringify({
              server: ids.server,
              voiceList: res.data.voices,
            })
          );

          setvoicelist(res.data.voices);
        } else throw res.data.message;
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data === "Unauthorized")
          Router.push("/signup");
      });
  };

  const joinVoice = async (id) => {
    if (session !== undefined || joiningVoice) return
    setjoiningVoice(true)

    const OT = await import('@opentok/client')

    axios.get(`${config.SERVER}/data?room=${id}`).then(res => {
      const creds = {
        sessionId: res.data.session,
        token: res.data.token,
        key: res.data.key,
      }

      const s = OT.initSession(creds.key, creds.sessionId)
      setSession(s)
      const p = OT.initPublisher('voiceBox1', {
        publishAudio: true,
        publishVideo: false,
        name: JSON.parse(localStorage.getItem('user')).name,
        style: { nameDisplayMode: "on" },
        insertMode: 'append',
        showControls: true,
        width: '100%',
        height: '100%'
      })

      setjoiningVoice(false)

      s.on('streamCreated', function (event) {
        const arr = subscriberArr
        const index = arr.findIndex(val => val === false)
        if (index === -1) return
        arr[index] = event.stream

        console.log(index)

        console.log('stream created at : ', index+1)

        setSubscriberArr(arr)
        s.subscribe(event.stream, `voiceBox${index + 1}`, {
          insertMode: 'append',
          style: { nameDisplayMode: "on" },
          showControls: true,
          width: '100%',
          height: '100%'
        })
      })
      s.on('streamDestroyed', function (event) {
        const id = event.stream.streamId
        const arr = subscriberArr
        const index = arr.findIndex(val => val.streamId === id)
        arr[index] = false

        console.log('stream destroyed at : ', index+1)

        setSubscriberArr(arr)
      })
      setPublisher(p)
      s.connect(creds.token, function (err) {
        if (err) {
          console.log(err)
        } else {
          s.publish(p)
        }
      })
    })
  }

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("serverList"));

    if (s) setserverlist(s);
    else getServers();
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = editor;
    setMounted(true);
  };

  useEffect(() => {
    if (!mount || ids.server === undefined) return;

    const c = JSON.parse(localStorage.getItem("channelList"));
    const e = JSON.parse(localStorage.getItem("editorList"));
    const v = JSON.parse(localStorage.getItem("voiceList"));

    if (
      c &&
      c.server === ids.server &&
      c.channelList &&
      e &&
      e.server === ids.server &&
      e.editorList &&
      v &&
      v.server === ids.server &&
      v.editorList
    ) {
      setchannellist(c.channelList);
      seteditorlist(e.editorList);
      setvoicelist(e.voiceList);
    } else getInfo();

    const socket = io(`${config.SERVER}/`);

    document.getElementById("saveEditor").addEventListener("click", () => {
      socket.emit("saveData", {
        id: ids.editor,
        text: monacoRef.current.getValue(),
        lang: document.getElementById("selectlang").value,
      });
    });

    socket.emit("joinEditor", ids.editor);

    socket.on("joinData", (data) => {
      setlang(data.lang);
      monacoRef.current.getModel().setValue(data.text);
    });

    socket.on("requestingData", (ed) => {
      let data = {
        id: ids.editor,
        text: monacoRef.current.getValue(),
        lang: document.getElementById("selectlang").value,
      };
      socket.emit("sendingDataForNewUser", data);
    });

    socket.on("forNewUser", (data) => {
      monacoRef.current.getModel().setValue(data.text);
      setlang(data.lang);
    });

    document.addEventListener("keyup", (e) => {
      if (
        e.key.length === 1 ||
        e.key === "Enter" ||
        e.key === "Backspace" ||
        e.key === "Tab" ||
        e.key === "Delete"
      ) {
        socket.emit("editorTextChange", {
          id: ids.editor,
          text: monacoRef.current.getValue(),
        });
      }
    });

    socket.on("editorTextChanged", (data) => {
      monacoRef.current.getModel().setValue(data);
    });

    document.getElementById("selectlang").addEventListener("change", (e) => {
      setlang(e.target.value);
      socket.emit("changeLangSend", {
        id: ids.editor,
        lang: document.getElementById("selectlang").value,
      });
    });

    socket.on("changeLang", (data) => {
      setlang(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [mount, ids]);

  const getoutput = id => {
    axios.post(`${config.SERVER_EDITOR}/status`, {id}).then(res => {
      const data = res.data

      if (data) {
        if (data.status === "running") return getoutput(id)

        if (data.result === "sucess") {
          setoutput(data.stdout)
        } else {
          seterr((data.build_stderr ? data.build_stderr + '\n' : "") + (data.stderr ? data.stderr : ""))
          setoutput(data.stdout)
        }
      }
    }).catch(err => {
      console.log(err)
    })
  }

  const run = () => {
    if (!mount) return

    const req = {
      source_code: monacoRef.current.getValue(),
      input: input,
      language: lang,
      api_key: "guest"
    }

    axios.post(`${config.SERVER_EDITOR}/`, req).then(res => {
      const codeid = res.data.id
      if (codeid) getoutput(codeid)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      {createChannelPopup ? (
        <CreateChannel id={ids.server} setView={setCreateChannelPopup} config={config} />
      ) : null}

      {createEditorPopup ? (
        <CreateEditor id={ids.server} setView={setCreateEditorPopup} config={config} />
      ) : null}

      {createVoicePopup ? (
        <CreateVoice id={ids.server} setView={setCreateVoicePopup} config={config} />
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

            <br />

            {voicelist.map((ch) => {
              return (
                <Voice
                  key={ch.voice_id}
                  id={ch.voice_id}
                  name={ch.voice_name}
                  server={ids.server}
                  join={joinVoice}
                />
              );
            })}

            <p
              className={styles.addChannel}
              onClick={() => setCreateVoicePopup(true)}
            >
              Add+ Voice
            </p>

            <div className="voiceMembers">
              <div className="voiceBox" id="voiceBox1"></div>
              <div className="voiceBox" id="voiceBox2"></div>
              <div className="voiceBox" id="voiceBox3"></div>
              <div className="voiceBox" id="voiceBox4"></div>
              <div className="voiceBox" id="voiceBox5"></div>
            </div>
          </div>

          <div className="controller">
            <button onClick={() => {
              if (session === undefined) return

              publisher.destroy();
              session.disconnect();
              
              setSession(undefined)
              setPublisher(undefined)
              setSubscriberArr([true, false, false, false, false])
            }}>Stop</button>

            <button onClick={() => {
              document.getElementById('log').innerHTML = JSON.stringify(subscriberArr.map(e => e === false ? e : true))
            }}>show</button>
            
            <p style={{color: "wheat"}} id="log"></p>
          </div>
        </div>

        <div className="row2">
          <div className={styles.maindiv}>

            <div className={styles.headEditor}>
              <select id="selectlang" value={lang} onChange={e => setlang(e.target.value)}>
                <option value="html">html</option>
                <option value="css">css</option>
                <option value="javascript">javascript</option>
                <option value="json">json</option>
                <option value="typescript">TypeScript</option>

                <option value="xml">XML</option>
                <option value="php">PHP</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="ruby">Ruby</option>
                <option value="objective-c">Objective-C</option>
                <option value="r">R</option>
                <option value="coffeescript">CoffeeScript</option>
              </select>

              <button onClick={() => setterminalPopup(f => !f)}>Terminal</button>
              <button id="saveEditor">save</button>
            </div>
            <MonacoEditor
              height="90vh"
              language={lang}
              defaultValue="// code goes here"
              theme="vs-dark"
              onMount={handleEditorDidMount}
            />

            {
              terminalPopup ?
                <div className={styles.terminal}>
                  <div className={styles.input}>
                    <div className={styles.inputRow}>
                      <h1>input</h1> <button onClick={run}>Run</button>
                    </div>
                    <textarea className={styles.inputArea} value={input} spellCheck="false" onChange={e => setinput(e.target.value)} />
                  </div>

                  <div className={styles.output}>
                    <div className={styles.outputRow}>
                      <h1>output</h1>
                    </div>
                    <div className={styles.outputArea}>
                      {err ? <p className={styles.stderr}>{err}</p> : null}
                      {output ? <p className={styles.stdout}>{output}</p> : null}
                    </div>
                  </div>

                </div> : null
            }

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
