import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";

// Image Imports
import logo from "../../Assets/Images/mobilelogo.svg";
import search from "../../Assets/Images/searchicon.svg";

// Style Import
import styles from "./Navbar.module.scss";

function Navbar() {
  const [menu, setMenu] = useState(false);

  function viewMenu() {
    setMenu((menu) => !menu);
  }

  return (
    <nav>
      <button
        onClick={viewMenu}
        className={`${styles["mobile-menu"]} ${menu ? styles["open"] : ""}`}
      >
        <div className={styles["bar-one"]} />
        <div className={styles["bar-two"]} />
        <div className={styles["bar-three"]} />
      </button>
      <Link to="/home">
        <img src={logo} />
      </Link>
      <img src={search} />
      <MobileMenu open={menu} viewMenuHandler={viewMenu} />
    </nav>
  );
}

export default Navbar;
