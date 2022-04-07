import React from "react";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.scss";
import view from "../../images/view.svg";

function SignUpForm() {
  return (
    <div className={styles.wrapper}>
      <form>
        <div>
          <Link to="/login">
            <button className={`${styles.register} ${styles.inactive}`}>
              Login
            </button>
          </Link>
          <button className={styles.register}>Sign Up</button>
        </div>
        <div className={styles.input}>
          <div>
            <h2>First Name</h2>
            <input></input>
            <h2>Email</h2>
            <input></input>
            <h2>Password</h2>
            <div className={styles.password}>
              <input></input>
              <button>
                <img src={view} />
              </button>
            </div>
            <h2>Confirm Password</h2>
            <input></input>
          </div>
          <p>
            Must have a minimum length of 8 characters. 1 lowercase, 1
            uppercase, and 1 symbol.
          </p>
          <button className={styles.signup}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
