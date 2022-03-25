import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

// Image Imports
import logo from "../../images/mobilelogo.svg";

// Style Import
import styles from "./Navbar.module.scss";

function Navbar() {
  const [menu, setMenu] = useState(false);

  function viewMenu() {
    setMenu(!menu);
  }

  return (
    <nav>
      <Link to="/home">
        <img src={logo} />
      </Link>
      <button
        onClick={viewMenu}
        className={`${styles["mobile-menu"]} ${menu ? styles["open"] : ""}`}
      >
        <div className={styles["bar-one"]} />
        <div className={styles["bar-two"]} />
        <div className={styles["bar-three"]} />
      </button>
      <MobileMenu open={menu} viewMenuHandler={viewMenu} />
    </nav>
  );
}

export default Navbar;
