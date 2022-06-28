import React from "react";
import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.scss";

function MobileMenu({ open, viewMenuHandler }) {
  if (open) {
    document.body.style.overflow = "hidden";
  } else if (!open) {
    document.body.style.overflow = "visible";
  }

  return (
    <>
      <div
        className={`${open ? styles.overlay : styles.hide}`}
        onClick={viewMenuHandler}
      >
        <menu className={open ? styles.open : ""}>
          <ul>
            <li>
              <Link
                to="/about"
                className={styles.links}
                style={{ textDecoration: "none" }}
                onClick={!open}
              >
                About
              </Link>
            </li>
            <div className={styles.border} />
            <li>
              <Link
                to="/login"
                className={styles.links}
                style={{ textDecoration: "none" }}
                onClick={!open}
              >
                Account
              </Link>
            </li>
            <div className={styles.border} />
            <li>
              <Link
                to="/mybag"
                className={styles.links}
                style={{ textDecoration: "none" }}
                onClick={!open}
              >
                My Bag
              </Link>
            </li>
            <div className={styles.border} />
            <li>
              <Link
                to="/categories"
                className={styles.links}
                style={{ textDecoration: "none" }}
                onClick={!open}
              >
                Categories
              </Link>
            </li>
            <div className={styles.border} />
            <li>
              <a onClick={viewMenuHandler}>Designers</a>
            </li>
            <div className={styles.border} />
            <li>
              <a onClick={viewMenuHandler}>Contact</a>
            </li>
          </ul>
        </menu>
      </div>
    </>
  );
}

export default MobileMenu;
