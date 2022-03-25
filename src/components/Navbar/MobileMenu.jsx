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
          >
            About
          </Link>
        </li>
        <li>
          <a className={styles.links}>Account</a>
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
