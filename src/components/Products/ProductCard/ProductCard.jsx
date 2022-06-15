import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

function ProductCard({ image, name, price, id }) {
  return (
    <Link
      to={`/product/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={styles.container}>
        <div className={styles.imgcontainer}>
          <img src={image} />
        </div>
        <div className={styles.productdetails}>
          <p>{name}</p>
          <p className={styles.productprice}>{`$${price}`}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
