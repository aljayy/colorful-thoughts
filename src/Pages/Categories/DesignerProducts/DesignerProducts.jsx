import React, { useEffect, useState } from "react";
import { commerce } from "../../../Auth/commerce";
import { useParams } from "react-router-dom";
import styles from "./DesignerProducts.module.scss";
import DesignerGridLayout from "../../../Components/Products/DesignerGridLayout/DesignerGridLayout";

function DesignerProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [viewableProducts, setViewableProducts] = useState([]);
  const [newProductIndexes, setNewProductIndexes] = useState([0, 4]);
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
          id: product.id,
        };
      })
    );

    console.log(productArr);
    setAllProducts(productArr);
    setViewableProducts([
      productArr[0],
      productArr[1].slice(newProductIndexes[0], newProductIndexes[1]),
    ]);
  }

  useEffect(() => {
    getCategoryProducts();
  }, []);

  useEffect(() => {
    if (newProductIndexes[0] > 0) {
      setViewableProducts((prevState) => {
        return [
          prevState[0],
          [
            ...prevState[1],
            ...allProducts[1].slice(newProductIndexes[0], newProductIndexes[1]),
          ],
        ];
      });
    }
  }, [newProductIndexes]);

  function increaseIndexes() {
    setNewProductIndexes((prevState) => {
      return [prevState[0] + 4, prevState[1] + 4];
    });
  }

  return (
    <section className={styles["designer-products__section"]}>
      <DesignerGridLayout products={viewableProducts} />
      <button onClick={increaseIndexes}>View More</button>
    </section>
  );
}

export default DesignerProducts;
