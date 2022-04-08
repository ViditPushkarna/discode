import styles from '../../styles/popup/CreateServer.module.css'

export default function createServer(props) {
    const {setView} = props

    return (
        <div className={styles.container}>
            <div className={styles.popUp}>
                <img src="/cancelButton.svg" onClick={() => setView(false)}/>

            </div>
        </div>
    )
}
