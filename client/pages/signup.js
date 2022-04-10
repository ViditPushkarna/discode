import styles from "../styles/Login.module.css";
export default function Dashboard() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
      />
      <div className={styles.main_container}>
        <div className={styles.main}>
          <input
            type="checkbox"
            id="chk"
            className={`${styles.chk}`}
            aria-hidden="true"
          ></input>

          <div className={styles.signup}>
            <form>
              <label className={styles.label} for="chk" aria-hidden="true">
                Sign up
              </label>
              <div className={styles.input_fields}>
                <label htmlFor="username" className={styles.icons}>
                  <i className={`zmdi zmdi-account zmdi-hc-2x`}></i>
                </label>
                <input
                  type="text"
                  name="txt"
                  placeholder="User name"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <div className={styles.input_fields}>
                <label htmlFor="username" className={styles.icons}>
                  <i className={`zmdi zmdi-email zmdi-hc-2x`}></i>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-key zmdi-hc-2x`}></i>
                </label>
                <input
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <button className={styles.button}>Sign up</button>
            </form>
          </div>

          <div className={styles.login}>
            <form>
              <label className={styles.label} for="chk" aria-hidden="true">
                Login
              </label>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-email zmdi-hc-2x`}></i>
                </label>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                ></input>
              </div>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-key zmdi-hc-2x`}></i>
                </label>
                <input
                  className={styles.input}
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                ></input>
              </div>
              <button className={styles.button}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
