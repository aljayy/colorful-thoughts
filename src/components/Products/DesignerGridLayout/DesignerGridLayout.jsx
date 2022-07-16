import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import SkeletonCategoryProducts from "../../../Components/Loaders/SkeletonLoader/SkeletonCategoryProducts";
import styles from "./DesignerGridLayout.module.scss";

function DesignerGridLayout({ products }) {
  console.log(products);
  return (
    <>
      {products.length < 1 && <SkeletonCategoryProducts />}
      {products.length > 0 && (
        <>
          <div className={styles["company-logo__container"]}>
            <img src={products[0]} alt="Company Logo" />
          </div>
          <div className={styles["company-products__container"]}>
            {products[1].map((product) => {
              return (
                <ProductCard
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  id={product.id}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default DesignerGridLayout;
