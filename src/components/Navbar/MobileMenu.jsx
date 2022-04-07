import React from "react";
import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.scss";

function MobileMenu(props) {
  return (
    <menu className={`${styles.menu} ${props.open ? styles.open : ""}`}>
      <ul>
        <li>
          <Link
            to="/about"
            style={{ textDecoration: "none" }}
            className={styles.links}
            onClick={props.viewMenuHandler}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            style={{ textDecoration: "none" }}
            className={styles.links}
            onClick={props.viewMenuHandler}
          >
            Account
          </Link>
        </li>
        <li>
          <a className={styles.links}>Categories</a>
        </li>
        <li>
          <a className={styles.links}>Designers</a>
        </li>
      </ul>
    </menu>
  );
}

export default MobileMenu;
