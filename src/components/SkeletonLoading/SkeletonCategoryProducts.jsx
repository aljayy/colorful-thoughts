import React from "react";
import styles from "./SkeletonCategoryProducts.module.scss";

function SkeletonCategoryProducts() {
  return (
    <div>
      <div className={`${styles.hero} ${styles.skeleton}`}></div>
      <div className={styles["category-wrapper"]}>
        <div className={styles["product-wrapper"]}>
          <div className={`${styles.image} ${styles.skeleton}`}>
            {/* Image */}
          </div>
          <div className={styles["product-details"]}>
            <div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
            </div>
            <div
              className={`${styles["product-price"]} ${styles.skeleton} `}
            ></div>
          </div>
        </div>
        <div className={styles["product-wrapper"]}>
          <div className={`${styles.image} ${styles.skeleton}`}>
            {/* Image */}
          </div>
          <div className={styles["product-details"]}>
            <div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
            </div>
            <div
              className={`${styles["product-price"]} ${styles.skeleton} `}
            ></div>
          </div>
        </div>
        <div className={styles["product-wrapper"]}>
          <div className={`${styles.image} ${styles.skeleton}`}>
            {/* Image */}
          </div>
          <div className={styles["product-details"]}>
            <div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
            </div>
            <div
              className={`${styles["product-price"]} ${styles.skeleton} `}
            ></div>
          </div>
        </div>
        <div className={styles["product-wrapper"]}>
          <div className={`${styles.image} ${styles.skeleton}`}>
            {/* Image */}
          </div>
          <div className={styles["product-details"]}>
            <div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
            </div>
            <div
              className={`${styles["product-price"]} ${styles.skeleton} `}
            ></div>
          </div>
        </div>
        <div className={styles["product-wrapper"]}>
          <div className={`${styles.image} ${styles.skeleton}`}>
            {/* Image */}
          </div>
          <div className={styles["product-details"]}>
            <div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
            </div>
            <div
              className={`${styles["product-price"]} ${styles.skeleton} `}
            ></div>
          </div>
        </div>
        <div className={styles["product-wrapper"]}>
          <div className={`${styles.image} ${styles.skeleton}`}>
            {/* Image */}
          </div>
          <div className={styles["product-details"]}>
            <div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
              <div
                className={`${styles["product-name"]} ${styles.skeleton}`}
              ></div>
            </div>
            <div
              className={`${styles["product-price"]} ${styles.skeleton} `}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCategoryProducts;
