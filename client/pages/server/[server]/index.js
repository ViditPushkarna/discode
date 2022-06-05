import { useState, useEffect } from "react";
import styles from "../../../styles/Server.module.css";
import Channel from "../../../components/tiles/channel";
import Editor from "../../../components/tiles/editor";
import Voice from "../../../components/tiles/voice";
import Server from "../../../components/tiles/server";
import CreateChannel from "../../../components/popup/createChannel";
import CreateEditor from "../../../components/popup/createEditor";
import CreateVoice from "../../../components/popup/createVoice";
import axios from "axios";
import Router, { useRouter } from "next/router";

export default function Func(props) {
  const {config} = props

  const router = useRouter();
  const ids = router.query;

  const [createChannelPopup, setCreateChannelPopup] = useState(false);
  const [createEditorPopup, setCreateEditorPopup] = useState(false);
  const [createVoicePopup, setCreateVoicePopup] = useState(false);
  const [channellist, setchannellist] = useState([]);
  const [editorlist, seteditorlist] = useState([]);
  const [voicelist, setvoicelist] = useState([]);
  const [serverlist, setserverlist] = useState([]);

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

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("serverList"));

    if (s) setserverlist(s);
    else getServers();
  }, []);

  useEffect(() => {
    if (ids.server === undefined) return;

    getInfo()
  }, [ids]);

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
                />
              );
            })}

            <p
              className={styles.addChannel}
              onClick={() => setCreateVoicePopup(true)}
            >
              Add+ Voice
            </p>
          </div>
          <div className="controller"></div>
        </div>

        <div className="row2">
          <div className="free"></div>
          <div className="maindiv"></div>
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
