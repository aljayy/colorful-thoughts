import React, { useState } from "react";

// Image Imports
import logo from "../images/mobilelogo.svg";
import hamburger from "../images/hamburger.svg";
import mobilemenucard from "../images/mobilemenu.svg";
import close from "../images/close.svg";

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
      <img src={hamburger} onClick={viewMenu} />
      {menu && (
        <menu>
          <img src={mobilemenucard} />
          <img src={close} className={styles.close} onClick={viewMenu} />
          <ul>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Account</a>
            </li>
            <li>
              <a>Categories</a>
            </li>
            <li>
              <a>Designers</a>
            </li>
          </ul>
        </menu>
      )}
    </nav>
  );
}

export default Navbar;
