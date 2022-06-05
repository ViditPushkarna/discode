import "../styles/globals.css"
import config from '../config.json'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} config={config} />
}
export default MyApp
