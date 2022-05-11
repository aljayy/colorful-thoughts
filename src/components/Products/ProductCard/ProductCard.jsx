import React from "react";
import styles from "./ProductCard.module.scss";

function ProductCard({ image, name, price }) {
  return (
    <div className={styles.container}>
      <div className={styles.imgcontainer}>
        <img src={image} />
      </div>
      <div className={styles.productdetails}>
        <p>{name}</p>
        <p className={styles.productprice}>{`$${price}`}</p>
      </div>
    </div>
  );
}

export default ProductCard;
