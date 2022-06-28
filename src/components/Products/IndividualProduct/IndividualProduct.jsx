import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../../Auth/commerce";
import { useSwipeable } from "react-swipeable";
import styles from "./IndividualProduct.module.scss";
import arrow from "../../../Assets/Images/accordianarrow.svg";
import SkeletonIndividualProducts from "../../Loaders/SkeletonLoader/SkeletonIndividualProducts";

function IndividualProduct() {
  const [productDetails, setProductDetails] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAccordian, setShowAccordian] = useState(false);
  const [images, setImages] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const params = useParams();

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeImage + 1),
    onSwipedRight: () => updateIndex(activeImage - 1),
  });

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setActiveImage(newIndex);
  }

  function imageHandler(productData, index) {
    let imageData = productData[4].colorway[index].assets;

    setImages(
      productData[5].images.filter((image) => {
        for (let i = 0; i < imageData.length; i++) {
          if (imageData[i] === image.id) {
            return true;
          }
        }
      })
    );
  }

  function setSize(index) {
    setSelectedSize(index);
  }

  function setColor(index) {
    setSelectedColor(index);
    imageHandler(productDetails, index);
  }

  function quantityHandler(quantity) {
    if (quantity < 1) {
      quantity = 1;
    }
    setQuantity(quantity);
  }

  useEffect(async function productDetails() {
    const response = await commerce.products.retrieve(params.productId);

    const variantResponse = await commerce.products.getVariants(
      params.productId
    );

    let productResponse = [];

    for (const property in response) {
      if (property === "assets") {
        productResponse.push({
          images: response[property],
        });
      }

      if (property === "description") {
        productResponse.push({
          description: response[property],
        });
      }

      if (property === "name") {
        productResponse.push({
          title: response[property],
        });
      }

      if (property === "variant_groups") {
        productResponse.push(
          {
            sizes_variant_id: response.variant_groups[0].id,
            sizes: response.variant_groups[0].options,
          },
          {
            colorway_variant_id: response.variant_groups[1].id,
            colorway: response.variant_groups[1].options,
          }
        );
      }

      if (property === "price") {
        productResponse.push({
          price: response[property].formatted_with_symbol,
        });
      }
    }

    imageHandler(productResponse, 0);
    setProductDetails(productResponse);
  }, []);

  async function addProductToBag() {
    setSpinner(true);
    const productId = params.productId;
    const sizesVariantId = productDetails[3].sizes_variant_id;
    const size = productDetails[3].sizes[selectedSize].id;
    const colorwayVariantId = productDetails[4].colorway_variant_id;
    const color = productDetails[4].colorway[selectedColor].id;

    const response = await commerce.cart.add(productId, quantity, {
      [sizesVariantId]: size,
      [colorwayVariantId]: color,
    });
    setSpinner(false);
  }

  return (
    <section className={styles.wrapper}>
      {productDetails.length === 0 && <SkeletonIndividualProducts />}
      {productDetails.length > 0 && (
        <div className={styles.container} {...handlers}>
          <div
            className={`${styles.slidecontainer}`}
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {images.map((image) => {
              return <img src={image.url} className={styles.slide} />;
            })}
          </div>
          <div className={styles.productdetailscontainer}>
            <div className={styles.section}>
              <h2 className={styles.producttitle}>{productDetails[0].title}</h2>
              <p className={styles.productprice}>{productDetails[2].price}</p>
            </div>
            <div className={styles.section}>
              <h2>Colorway</h2>
              <div className={styles.colorway}>
                {productDetails[4].colorway.map((color, index) => {
                  if (index === selectedColor) {
                    return (
                      <div
                        className={styles.colorbox}
                        onClick={() => setColor(index)}
                      >
                        <p>{color.name}</p>
                      </div>
                    );
                  }
                  return (
                    <div
                      className={`${styles.colorbox} ${styles.nonselected}`}
                      onClick={() => setColor(index)}
                    >
                      <p>{color.name}</p>
                    </div>
                  );
                })}
              </div>
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
          </div>
          <div className={styles.addtobagcontainer}>
            <button
              className={`${styles.addtobag} ${spinner ? styles.loading : ""}`}
              onClick={addProductToBag}
            >
              <span>Add to Bag</span>
            </button>
            <div className={styles["quantity-wrapper"]}>
              <div className={styles["selected-quantity"]}>
                <p>{quantity}</p>
              </div>
              <div className={styles.quantitycontrols}>
                <div
                  className={styles["arrow-up"]}
                  onClick={() => {
                    quantityHandler(quantity + 1);
                  }}
                />
                <div
                  className={styles["arrow-down"]}
                  onClick={() => {
                    quantityHandler(quantity - 1);
                  }}
                />
              </div>
            </div>
          </div>
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
