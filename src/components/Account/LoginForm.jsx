import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginForm.module.scss";
import view from "../../images/view.svg";
import hide from "../../images/hide.svg";

function LoginForm() {
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
            <input></input>
            <h2>Password</h2>
            <div className={styles.password}>
              <input></input>
              <button>
                <img src={view} />
              </button>
            </div>
          </div>
          <p>Forgot your password?</p>
          <button className={styles.login}>Log In</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
