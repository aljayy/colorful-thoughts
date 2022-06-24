import React from "react";
import aboutus from "../../Assets/Images/aboutus.svg";
import styles from "./About.module.scss";

function About() {
  return (
    <section className={styles.section}>
      <div className={styles["image-container"]}>
        <img src={aboutus} />
      </div>
      <h2>Our Mission</h2>
      <p>
        We’re an online community dedicated to keeping our thoughts, style, and
        world <em>colorful</em>.
        <br />
        <br />
        73 percent of the world’s clothing eventually ends up in landfills.
        Every second, a whole garbage truck full of textiles is thrown out. More
        than $200 billion of unsold stock is sitting on shop floors and in
        warehouses around the world.
        <br />
        <br />
        Global apparel and footwear projections show a possible 81% increase by
        2030. In order to keep up with this demand coupled with the speed at
        which consumers expect their products, fast fashion companies resort to
        wasting natural resources all while exploiting factory workers and
        emitting huge carbon emissions.
        <br />
        <br />
        We’re here to tackle this issue head on. Strictly promoting those who
        see eye to eye with our vision. Yes, some drastic measurements must be
        taken in order for visible change to be seen, but that doesn’t mean we
        have to sacrifice creativity.
        <br />
        <br />
        If anything this allows more room for creativity. To look for new and
        innovative ways to source our textiles and material.
        <br />
        <br />
        We’re here to support those with great, caring ideas. Those who choose
        to be a part of the change and show that through their products and
        actions. Those who choose to create fairer and safer working conditions
        of those who bring our pieces to life.
        <br />
        <br />
        We’re here to bring a new meaning to streetwear and high end fashion
        because we are the new meaning.
        <br />
        <br />
        We are the change.
      </p>
      <h2>Return Policy</h2>
      <p>
        We offer a 30 day return window for all unopened items in their original
        packaging.
        <br />
        <br />
        There is a 14 day return window for worn items.
        <br />
        <br />
        Return windows are based off delivery date.
      </p>
      <h2>Contact</h2>
      <p>Email Support: contact@colorfulthoughts.com</p>
      <p>Phone Support: (206) 944-9898</p>
    </section>
  );
}

export default About;
