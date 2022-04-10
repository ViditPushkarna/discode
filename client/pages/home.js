import {useState, useEffect} from 'react'
import styles from '../styles/Home.module.css'
import Channel from '../components/tiles/channel'
import Server from '../components/tiles/server'
import CreateServerPopup from '../components/popUp/createServer'

export default function Home() {
  const [createServer, setCreateServerPopup] = useState(false)

  return (
    <>
    {createServer ? <CreateServerPopup setView={setCreateServerPopup}/> : null}

      <div className="page">
        <div className="row1">
          <div className="channel">
            <Channel />
            <Channel />
            <Channel />
          </div>
          <div className="controller">

          </div>
        </div>


        <div className="row2">
          <div className="free"></div>
          <div className="maindiv">

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
            <div className={styles.createServer} onClick={() => setCreateServerPopup(true)}>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
