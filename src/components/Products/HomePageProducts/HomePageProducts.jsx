import React from "react";
import { Link } from "react-router-dom";
import SkeletonCategoryProducts from "../../Loaders/SkeletonLoader/SkeletonCategoryProducts";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./HomePageProducts.module.scss";

function HomePageProducts({ products }) {
  return (
    <section>
      {products.length === 0 && <SkeletonCategoryProducts />}
      {products.length > 0 &&
        products.map((category) => {
          return (
            <div>
              <div className={styles["category-hero-container"]}>
                <img
                  src={category.heroImg}
                  className={styles["category-hero"]}
                />
              </div>
              <div className={styles["category-container"]}>
                {category.products[0].map((product) => {
                  return (
                    <ProductCard
                      image={product.productImage}
                      name={product.productName}
                      price={product.productPrice}
                      key={product.productId}
                      id={product.productId}
                    />
                  );
                })}
              </div>
              <Link
                to={`/designers/${category.categorySlug}`}
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
