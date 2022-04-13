import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import Router from "next/router";

export default function Dashboard() {
  const [susername, setsusername] = useState("");
  const [semail, setsemail] = useState("");
  const [spassword, setspassword] = useState("");

  const [lemail, setlemail] = useState("");
  const [lpassword, setlpassword] = useState("");

  const signup = (e) => {
    e.preventDefault();

    const req = {
      user_name: susername,
      user_email: semail,
      user_password: spassword,
    };

    axios
      .post("http://localhost:5000/user/createUser", req)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          Router.push("/home");
        } else throw res.data.message;
      })
      .catch((err) => {
        setsemail("");
        setspassword("");
        setsusername("");
        console.log(err);
      });
  };

  const login = (e) => {
    e.preventDefault();

    const req = {
      user_email: lemail,
      user_password: lpassword,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/user/login", req)
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);

          Router.push("/home");
        } else throw res.data.message;
      })
      .catch((err) => {
        setlemail("");
        setlpassword("");
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <link
        href={`https://fonts.googleapis.com/css2?family=Jost:wght@500&display=swap`}
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
              <label className={styles.label} htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <div className={styles.input_fields}>
                <label htmlFor="username" className={styles.icons}>
                  <i className={`zmdi zmdi-account zmdi-hc-2x`}></i>
                </label>
                <input
                  value={susername}
                  onChange={(e) => setsusername(e.target.value)}
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
                  value={semail}
                  onChange={(e) => setsemail(e.target.value)}
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
                  value={spassword}
                  onChange={(e) => setspassword(e.target.value)}
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                  className={styles.input}
                ></input>
              </div>
              <button className={styles.button} onClick={signup}>
                Sign up
              </button>
            </form>
          </div>

          <div className={styles.login}>
            <form>
              <label className={styles.label} htmlFor="chk" aria-hidden="true">
                Login
              </label>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-email zmdi-hc-2x`}></i>
                </label>
                <input
                  value={lemail}
                  onChange={(e) => setlemail(e.target.value)}
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  spellCheck="false"
                  required=""
                ></input>
              </div>
              <div className={styles.input_fields}>
                <label htmlFor="password" className={styles.icons}>
                  <i className={`zmdi zmdi-key zmdi-hc-2x`}></i>
                </label>
                <input
                  value={lpassword}
                  onChange={(e) => setlpassword(e.target.value)}
                  className={styles.input}
                  type="password"
                  name="pswd"
                  placeholder="Password"
                  required=""
                ></input>
              </div>
              <button className={styles.button} onClick={login}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
