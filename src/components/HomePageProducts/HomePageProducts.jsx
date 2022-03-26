import React from "react";
import { Link } from "react-router-dom";
import SkeletonCategoryProducts from "../SkeletonLoading/SkeletonCategoryProducts";
import styles from "./HomePageProducts.module.scss";

function HomePageProducts(props) {
  const products = props.products;

  return (
    <section>
      {products.length === 0 && <SkeletonCategoryProducts />}
      {products.length > 0 &&
        products.map((productItem) => {
          return (
            <div>
              <div className={styles["category-hero-container"]}>
                <img
                  src={productItem.heroImg}
                  className={styles["category-hero"]}
                />
              </div>
              <div className={styles["category-container"]}>
                {productItem.products[0].map((individualProduct) => {
                  return (
                    <div className={styles["product-container"]}>
                      <div>
                        <img src={individualProduct.productImage} />
                      </div>
                      <div className={styles["product-details"]}>
                        <p className={styles["product-name"]}>
                          {individualProduct.productName}
                        </p>
                        <p className={styles["product-price"]}>
                          {`$${individualProduct.productPrice}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                to={`/designers/${productItem.categorySlug}`}
                style={{ textDecoration: "none" }}
              >
                <button className={styles.view}>View More</button>
              </Link>
            </div>
          );
        })}
    </section>
  );
}

export default HomePageProducts;
