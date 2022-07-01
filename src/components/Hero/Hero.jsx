import React from "react";
import styles from "./Hero.module.scss";
import heroimg from "../../Assets/Images/smgaiaplatforms.jpg";

function Hero() {
  return (
    <section>
      <div className={styles["hero-card"]}>
        <div className={styles.top}></div>
        <div className={styles["top-left"]}></div>
        <div className={styles.bottom}></div>
        <div className={styles["bottom-right"]}></div>
        <h2>Creation of the Month</h2>
        <p>
          It comes to no surpise that Stella McCartney’s Gaia Platform’s makes
          our pick of the month.
          <br />
          <br />
          A rugged and jagged silhouette perfectly balanced by a mango-orange
          color palette.
          <br />
          <br />
          100% organic cotton for <i>our</i> planet.
        </p>
        <button>Shop</button>
      </div>
      <div className={styles["img-container"]}>
        <img src={heroimg} />
      </div>
    </section>
  );
}

export default Hero;
