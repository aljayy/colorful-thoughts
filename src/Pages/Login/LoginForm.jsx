import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import view from "../../Assets/Images/view.svg";
import hide from "../../Assets/Images/hide.svg";
import AuthContext from "../../store/auth-context";

function LoginForm() {
  const loginCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [viewPassword, setViewPassword] = useState(true);

  function toggleViewPassword(e) {
    e.preventDefault();
    setViewPassword((viewPassword) => !viewPassword);
  }

  async function login(e) {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    try {
      if (email.length === 0 || password.length === 0) {
        throw Error("No input");
      }

      setInvalidLogin(false);

      loginCtx.loginUser(email, password);

      navigate("/dashboard");
    } catch (e) {
      setInvalidLogin(true);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.registration}>
          <div
            className={`${styles["registration__buttons"]} ${styles["registration__login"]}`}
          >
            Login
          </div>
          <Link
            to="/signup"
            className={`${styles["registration__buttons"]} ${styles["registration__signup"]}`}
            style={{ textDecoration: "none" }}
          >
            <div>Sign Up</div>
          </Link>
        </div>
        <div className={styles.input}>
          <div className={styles["input__email"]}>
            <h2>Email</h2>
            <input ref={emailRef}></input>
          </div>
          <div className={styles["input__password"]}>
            <h2>Password</h2>
            <div className={styles["input__password--view"]}>
              <input
                ref={passwordRef}
                type={viewPassword ? "text" : "password"}
              ></input>
              <button>
                <img
                  src={viewPassword ? view : hide}
                  onClick={toggleViewPassword}
                />
              </button>
            </div>
          </div>
          <p className={`${styles.fail} ${invalidLogin ? styles.display : ""}`}>
            Failed to login. Retry.
          </p>
          <p className={styles.reset}>Forgot your password?</p>
          <button className={styles.login} onClick={login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
