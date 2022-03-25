import React, { useState } from "react";
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
      <img src={logo} />
      <button
        onClick={viewMenu}
        className={`${styles["mobile-menu"]} ${menu ? styles["open"] : ""}`}
      >
        <div className={styles["bar-one"]} />
        <div className={styles["bar-two"]} />
        <div className={styles["bar-three"]} />
      </button>
      <MobileMenu open={menu} />
    </nav>
  );
}

export default Navbar;
