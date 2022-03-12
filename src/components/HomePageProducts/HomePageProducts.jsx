import React from "react";
import styles from "./HomePageProducts.module.scss";

function HomePageProducts(props) {
  const products = props.products;

  return (
    <section>
      {products.map((productItem) => {
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
                    <p className={styles["product-name"]}>
                      {individualProduct.productName}
                    </p>
                    <div>
                      <img src={individualProduct.productImage} />
                    </div>

                    <p
                      className={styles["product-price"]}
                    >{`$${individualProduct.productPrice}`}</p>
                  </div>
                );
              })}
            </div>
            <button>View More</button>
          </div>
        );
      })}
    </section>
  );
}

export default HomePageProducts;
