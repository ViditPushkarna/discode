import styles from "../../../styles/Server.module.css";
import Channel from "../../../components/tiles/channel";
import Server from "../../../components/tiles/server";
import Message from "../../../components/chat/message";

export default function Home() {
  return (
    <div className="page">
      <div className="row1">
        <div className="channel">
          <div className={styles.servername}>
            <h4>Server Name</h4>
          </div>

          <Channel />
          <Channel />
          <Channel />
        </div>
        <div className="controller"></div>
      </div>

      <div className="row2">
        <div className="free"></div>
        <div className="maindiv">
          <Message />
          <Message />
          <Message />
          <Message/>
          
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
          <Server />
          <Server />
          <Server />
          <Server />
          <Server />
          <Server />
        </div>
      </div>
    </div>
  );
}
