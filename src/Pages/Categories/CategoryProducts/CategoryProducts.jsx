import React, { useEffect, useState } from "react";
import { commerce } from "../../../Auth/commerce";
import { useParams } from "react-router-dom";
import ProductCard from "../../../Components/Products/ProductCard/ProductCard";
import styles from "./CategoryProducts.module.scss";
import PageLoader from "../../../Components/Loaders/PageLoader/PageLoader";

function CategoryProducts() {
  const params = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await commerce.products.list({
        category_slug: [params.categorySlug],
      });

      setProducts(
        response.data.map((product) => {
          return {
            name: product.name,
            image: product.image.url,
            price: product.price.raw,
            id: product.id,
          };
        })
      );
    }
    fetchData();
  }, [params.categorySlug]);

  return (
    <div className={styles["individual-category"]}>
      {products.length === 0 && <PageLoader />}
      {products.length > 0 && (
        <div className={styles["individual-category__grid"]}>
          {products.map((product) => {
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
      )}
    </div>
  );
}

export default CategoryProducts;
