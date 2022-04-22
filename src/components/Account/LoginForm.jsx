import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import view from "../../images/view.svg";
import hide from "../../images/hide.svg";
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
        <div>
          <button className={styles.register}>Login</button>
          <Link to="/signup">
            <button className={`${styles.inactive} ${styles.register}`}>
              Sign Up
            </button>
          </Link>
        </div>
        <div className={styles.input}>
          <div>
            <h2>Email</h2>
            <input ref={emailRef}></input>
            <h2>Password</h2>
            <div className={styles.password}>
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
          <p>Forgot your password?</p>
          <button className={styles.login} onClick={login}>
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
