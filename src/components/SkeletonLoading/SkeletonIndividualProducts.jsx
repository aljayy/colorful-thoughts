import React from "react";
import styles from "./SkeletonIndividualProducts.module.scss";
function SkeletonIndividualProducts() {
  return (
    <div>
      <div className={`${styles.slides} ${styles.skeleton}`}></div>
      <div className={styles.details}>
        <div className={styles.section}>
          <div className={`${styles.large} ${styles.skeleton}`}></div>
          <div className={`${styles.medium} ${styles.skeleton}`}></div>
        </div>
        <div className={styles.section}>
          <div className={`${styles.medium} ${styles.skeleton}`}></div>
          <div className={`${styles.options} ${styles.skeleton}`}></div>
        </div>
        <div className={styles.section}>
          <div className={`${styles.medium} ${styles.skeleton}`}></div>
          <div className={`${styles.options} ${styles.skeleton}`}></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonIndividualProducts;
