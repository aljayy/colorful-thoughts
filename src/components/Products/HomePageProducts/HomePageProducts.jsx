import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonCategoryProducts from "../../Loaders/SkeletonLoader/SkeletonCategoryProducts";
import DesignerGridLayout from "../DesignerGridLayout/DesignerGridLayout";
import { commerce } from "../../../Auth/commerce";
import styles from "./HomePageProducts.module.scss";

function HomePageProducts() {
  const [designerProducts, setDesignerProducts] = useState([]);
  const [categorySlugs, setCategorySlugs] = useState([]);

  async function getCategories() {
    let designerIds = [];
    let products = [];

    const categoryResponse = await commerce.categories.retrieve("designers", {
      type: "slug",
    });

    for (let i = 0; i < categoryResponse.children.length; i++) {
      const productResponse = await commerce.products.list({
        category_id: categoryResponse.children[i].id,
        limit: 6,
      });

      const productData = [];

      productData.push([
        [categoryResponse.children[i].assets[0].url],
        productResponse.data.map((product) => {
          return {
            name: product.name,
            image: product.image.url,
            price: product.price.raw,
            id: product.id,
          };
        }),
      ]);

      designerIds.push(categoryResponse.children[i].slug);
      products.push(...productData);
    }
    setDesignerProducts(products);
    setCategorySlugs(designerIds);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section>
      {designerProducts.length === 0 && <SkeletonCategoryProducts />}
      {designerProducts.map((designerProducts, index) => {
        return (
          <>
            <DesignerGridLayout products={designerProducts} />
            <Link
              to={`/designers/${categorySlugs[index]}`}
              style={{ textDecoration: "none" }}
            >
              <button className={styles.view}>View More</button>
            </Link>
          </>
        );
      })}
    </section>
  );
}

export default HomePageProducts;
