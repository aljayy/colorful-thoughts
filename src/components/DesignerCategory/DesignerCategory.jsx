import React, { useEffect, useState } from "react";
import { commerce } from "../../lib/commerce";
import { useParams } from "react-router-dom";
import styles from "./DesignerCategory.module.scss";
import SkeletonCategoryProducts from "../SkeletonLoading/SkeletonCategoryProducts";

function DesignerCategory() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const params = useParams();

  let productArr = [];

  async function getCategoryProducts() {
    const categoryResponse = await commerce.products.list({
      category_slug: params.categorySlug,
    });

    const categoryDetails = await commerce.categories.retrieve(
      params.categorySlug,
      {
        type: "slug",
      }
    );

    productArr.push([categoryDetails.assets[0].url]);

    productArr.push(
      categoryResponse.data.map((product) => {
        return {
          name: product.name,
          image: product.image.url,
          price: product.price.raw,
        };
      })
    );
    setCategoryProducts(productArr);
  }

  useEffect(() => {
    getCategoryProducts();
  }, []);

  return (
    <section className={styles.section}>
      {categoryProducts.length === 0 && <SkeletonCategoryProducts />}
      {categoryProducts.length > 0 && (
        <div className={styles["hero-container"]}>
          <img src={categoryProducts[0]} />
        </div>
      )}
      {categoryProducts.length > 0 && (
        <div className={styles["product-page-container"]}>
          {categoryProducts[1].map((product) => {
            return (
              <div className={styles["product-container"]}>
                <div className={styles["image-container"]}>
                  <img src={product.image} />
                </div>
                <div className={styles["product-details"]}>
                  <p>{product.name}</p>
                  <p
                    className={styles["product-price"]}
                  >{`$${product.price}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default DesignerCategory;
