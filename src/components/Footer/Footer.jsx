import React from "react";

// Style Imports
import styles from "./Footer.module.scss";

// Image Imports
import footerlogo from "../../images/footerlogo.svg";
import instagram from "../../images/instasocial.svg";
import twitter from "../../images/twittersocial.svg";
import tiktok from "../../images/tiktoksocial.svg";

function Footer() {
  function preventReload(e) {
    e.preventDefault();
  }
  return (
    <footer>
      <img
        src={footerlogo}
        alt="Footer logo"
        className={styles["footer-logo"]}
      />
      <div className={styles["links-container"]}>
        <ul>
          <h2>About</h2>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>FAQ</a>
          </li>
          <li>
            <a>Return Policy</a>
          </li>
          <li>
            <a>Privacy Policy</a>
          </li>
        </ul>
        <ul>
          <h2>Contact</h2>
          <li>Address: 5849 California Ave NW, Seattle, WA 98967</li>
          <li>Email: contact@colorfulthoughts.com</li>
          <li>Phone Number: (206) 944-9898</li>
        </ul>
        <div className={styles["socials-container"]}>
          <h2>Social Media</h2>
          <div className={styles["socials-images"]}>
            <img src={instagram} alt="Link to our Instagram" />
            <img src={twitter} alt="Link to our Twitter" />
            <img src={tiktok} alt="Link to our TikTok" />
          </div>
        </div>
      </div>
      <p>Be among the first to get the word on new drops.</p>
      <form onClick={preventReload}>
        <input />
        <button>Subscribe</button>
      </form>
      <p className={styles["copyright"]}>
        © 2022 Colorful Thoughts. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
