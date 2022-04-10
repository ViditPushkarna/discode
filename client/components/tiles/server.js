import styles from '../../styles/tiles/Server.module.css'
import router from 'next/router'

export default function channelTab(props) {
  const { id, name } = props

  return (
    <div key={id} className={styles.container} onClick={() => {
      router.push('/server/' + id)
    }}>
      {name}
    </div>
  )
}
