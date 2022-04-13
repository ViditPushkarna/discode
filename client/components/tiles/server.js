import styles from '../../styles/tiles/Server.module.css'
import router from 'next/router'

export default function channelTab(props) {
  const { id, name } = props

  return (
    <div className={styles.container} onClick={() => {
      router.push('/server/' + id)
    }}>
      <p>{name[0]}</p>
    </div>
  )
}
