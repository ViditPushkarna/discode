import styles from '../styles/Home.module.css'
import Channel from '../components/tiles/channel'
import Server from '../components/tiles/server'

export default function Home() {
  return (
    <div className="page">
      <div className="row1">
        <div className="channel">
            <Channel/>
            <Channel/>
            <Channel/>
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
          <Server/>
          <Server/>
          <Server/>
          <Server/>
          <Server/>
          <Server/>
        </div>
      </div>
    </div>
  )
}
