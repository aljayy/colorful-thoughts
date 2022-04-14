import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUpForm.module.scss";
// Image imports
import view from "../../images/view.svg";
import hide from "../../images/hide.svg";
import valid from "../../images/valid.svg";
import invalid from "../../images/invalid.svg";

function SignUpForm() {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  // Toggle the eye slash to view password or not
  const [viewPassword, setViewPassword] = useState(true);
  // Password Validating
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    passwordsMatch: false,
    passwordLength: false,
    passwordLowerCase: false,
    passwordUpperCase: false,
    passwordSymbol: false,
  });

  function toggleViewPassword(e) {
    e.preventDefault();
    setViewPassword((viewPassword) => !viewPassword);
  }

  useEffect(() => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const symbol = /[!@$#%&]/g;

    const timer = setTimeout(() => {
      if (password === confirmPassword && password.length > 0) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordsMatch: true };
        });
      } else if (password !== confirmPassword) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordsMatch: false };
        });
      }

      if (password.length >= 8) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordLength: true };
        });
      } else if (password.length < 8) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordLength: false };
        });
      }

      if (password.match(upperCaseLetters)) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordUpperCase: true };
        });
      } else if (!password.match(upperCaseLetters)) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordUpperCase: false };
        });
      }

      if (password.match(lowerCaseLetters)) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordLowerCase: true };
        });
      } else if (!password.match(lowerCaseLetters)) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordLowerCase: false };
        });
      }

      if (password.match(symbol)) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordSymbol: true };
        });
      } else if (!password.match(symbol)) {
        setPasswordRequirements((prevState) => {
          return { ...prevState, passwordSymbol: false };
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [password, confirmPassword]);

  return (
    <div className={styles.wrapper}>
      <form>
        {/* Client Account Creation Options */}
        <div>
          <Link to="/login">
            <button className={`${styles["sign-up"]} ${styles.inactive}`}>
              Login
            </button>
          </Link>
          <button className={styles["sign-up"]}>Sign Up</button>
        </div>
        {/* Customer Input */}
        <div className={styles["customer-info"]}>
          <div className={styles["error-styling"]}>
            <h2 className={styles.titles}>First Name</h2>
            <p>A name is required.</p>
          </div>
          <input type="text"></input>
          <div className={styles["error-styling"]}>
            <h2 className={styles.titles}>Email</h2>
            <p>An email is required.</p>
          </div>
          <input type="email"></input>
          <h2 className={styles.titles}>Password</h2>
          <div className={styles.password}>
            <input
              onChange={() => {
                setPassword(passwordRef.current.value);
              }}
              ref={passwordRef}
              type={viewPassword ? "text" : "password"}
            ></input>
            <button onClick={toggleViewPassword}>
              <img
                src={viewPassword ? view : hide}
                alt={"View your password"}
              />
            </button>
          </div>
          <h2 className={styles.titles}>Confirm Password</h2>
          <input
            onChange={() => {
              setConfirmPassword(confirmPasswordRef.current.value);
            }}
            ref={confirmPasswordRef}
            type={viewPassword ? "text" : "password"}
          ></input>
          <h3>Password must have a minimum of:</h3>
          <div className={styles.requirements}>
            <img
              src={passwordRequirements.passwordLength ? valid : invalid}
              alt={"Shows if requirements are met"}
            />
            <p
              className={
                passwordRequirements.passwordLength ? styles.valid : ""
              }
            >
              A length of 8 characters
            </p>
          </div>
          <div className={styles.requirements}>
            <img
              src={passwordRequirements.passwordUpperCase ? valid : invalid}
              alt={"Shows if requirements are met"}
            />
            <p
              className={
                passwordRequirements.passwordUpperCase ? styles.valid : ""
              }
            >
              1 uppercase letter
            </p>
          </div>
          <div className={styles.requirements}>
            <img
              src={passwordRequirements.passwordLowerCase ? valid : invalid}
              alt={"Shows if requirements are met"}
            />
            <p
              className={
                passwordRequirements.passwordLowerCase ? styles.valid : ""
              }
            >
              1 lowercase letter
            </p>
          </div>
          <div className={styles.requirements}>
            <img
              src={passwordRequirements.passwordSymbol ? valid : invalid}
              alt={"Shows if requirements are met"}
            />
            <p
              className={
                passwordRequirements.passwordSymbol ? styles.valid : ""
              }
            >
              1 symbol, symbols allowed: !, @, #, $, %, &
            </p>
          </div>
          <div className={styles.requirements}>
            <img
              src={passwordRequirements.passwordsMatch ? valid : invalid}
              alt={"Shows if requirements are met"}
            />
            <p
              className={
                passwordRequirements.passwordsMatch ? styles.valid : ""
              }
            >
              Both passwords must match
            </p>
          </div>
          <button className={styles.submit}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
