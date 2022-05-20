import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import { useSwipeable } from "react-swipeable";
import styles from "./IndividualProduct.module.scss";
import arrow from "../../../images/accordianarrow.svg";

function IndividualProduct() {
  const [productDetails, setProductDetails] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [showAccordian, setShowAccordian] = useState(false);
  const params = useParams();

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = productDetails[5].length - 1;
    } else if (newIndex >= productDetails[5].length) {
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

      if (property === "variant_groups") {
        productResponse.push(
          {
            sizes: response.variant_groups[0].options,
          },
          { colorway: response.variant_groups[1].options }
        );
      }
    }

    setProductDetails(productResponse);
  }, []);

  function setSize(index) {
    console.log("Size changed");
    setSelectedSize(index);
  }

  return (
    <section>
      {productDetails.length > 0 && (
        <div className={styles.container} {...handlers}>
          <div
            className={`${styles.slidecontainer}`}
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {productDetails[5].map((image) => {
              return <img src={image.url} className={styles.slide} />;
            })}
          </div>
          <div className={styles.productdetailscontainer}>
            <div className={styles.section}>
              <h2 className={styles.producttitle}>{productDetails[0].title}</h2>
              <p className={styles.productprice}>{productDetails[2].price}</p>
            </div>
            <div className={styles.section}>
              <h2>Size</h2>
              <div className={styles.sizelayout}>
                {productDetails[3].sizes.map((size, index) => {
                  if (index === selectedSize) {
                    return (
                      <div
                        className={styles.sizebox}
                        onClick={() => setSize(index)}
                      >
                        <p>{size.name}</p>
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`${styles.sizebox} ${styles.nonselected}`}
                      onClick={() => setSize(index)}
                    >
                      <p>{size.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.section}>
              <h2>Colorway</h2>
              <div className={styles.colorway}>
                {productDetails[4].colorway.map((color) => {
                  return (
                    <div className={styles.colorbox}>
                      <p>{color.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button className={styles.addtobag}>Add to Bag</button>
          <div className={styles.accordian}>
            <div
              className={styles.accordiancard}
              onClick={() => setShowAccordian((show) => !show)}
            >
              <div className={styles.accordianquestion}>
                <img
                  src={arrow}
                  className={!showAccordian ? "" : styles.rotate}
                />
                <p>Product Details</p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: productDetails[1].description,
                }}
                className={`${styles.answer} ${
                  showAccordian ? "" : styles.hide
                }`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

{
  /* <div className={styles.description}>
  <p
    dangerouslySetInnerHTML={{ __html: productDetails[1].description }}
  ></p>
</div> */
}
{
  /* <div className={styles.indicators}>
  <button onClick={() => updateIndex(activeImage - 1)}>Prev</button>
  {productDetails.length > 0 &&
    productDetails[5].map((image, index) => {
      return (
        <button onClick={() => updateIndex(index)}>{index + 1}</button>
      );
    })}
  <button onClick={() => updateIndex(activeImage + 1)}>Next</button>
</div> */
}
export default IndividualProduct;
