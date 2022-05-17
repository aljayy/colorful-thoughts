import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import { useSwipeable } from "react-swipeable";
import styles from "./IndividualProduct.module.scss";

function IndividualProduct() {
  const [productDetails, setProductDetails] = useState([{}, {}, {}, []]);
  const [activeImage, setActiveImage] = useState(0);
  const params = useParams();

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = productDetails[3].length - 1;
    } else if (newIndex >= productDetails[3].length) {
      newIndex = 0;
    }

    setActiveImage(newIndex);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeImage + 1),
    onSwipedRight: () => updateIndex(activeImage - 1),
  });

  useEffect(async function productDetails() {
    const response = await commerce.products.retrieve(params.productId);

    let productResponse = [];

    for (const property in response) {
      if (property === "name") {
        productResponse.push({
          title: response["name"],
        });
      }

      if (property === "assets") {
        productResponse.push(response["assets"]);
      }

      if (property === "price") {
        productResponse.push({
          price: response["price"].formatted_with_symbol,
        });
      }

      if (property === "description") {
        productResponse.push({
          description: response["description"],
        });
      }
    }

    setProductDetails(productResponse);
  }, []);

  return (
    <div className={styles.container} {...handlers}>
      <div
        className={`${styles.slidecontainer}`}
        style={{ transform: `translateX(-${activeImage * 100}%)` }}
      >
        {productDetails.length === 0 && <p>No image</p>}
        {productDetails.length > 0 &&
          productDetails[3].map((image) => {
            return <img src={image.url} className={styles.slide} />;
          })}
      </div>
      <div className={styles.indicators}>
        <button onClick={() => updateIndex(activeImage - 1)}>Prev</button>
        {productDetails.length > 0 &&
          productDetails[3].map((image, index) => {
            return (
              <button onClick={() => updateIndex(index)}>{index + 1}</button>
            );
          })}
        <button onClick={() => updateIndex(activeImage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default IndividualProduct;
