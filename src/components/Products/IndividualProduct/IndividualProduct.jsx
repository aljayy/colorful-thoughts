import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../../lib/commerce";
import { useSwipeable } from "react-swipeable";
import styles from "./IndividualProduct.module.scss";
import arrow from "../../../images/accordianarrow.svg";
import SkeletonIndividualProducts from "../../SkeletonLoading/SkeletonIndividualProducts";

function IndividualProduct() {
  const [productDetails, setProductDetails] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [allProductVariants, setAllProductVariants] = useState();
  const [activeVariant, setActiveVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAccordian, setShowAccordian] = useState(false);
  const params = useParams();

  const [spinner, setSpinner] = useState(false);

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = allProductVariants[activeVariant].images.length - 1;
    } else if (newIndex >= allProductVariants[activeVariant].images.length) {
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

    const variantResponse = await commerce.products.getVariants(
      params.productId
    );

    let productResponse = [];

    setAllProductVariants(
      Object.values(variantResponse)[0].map((variant) => {
        return {
          images: variant.assets,
          description: variant.description,
          price: variant.price.formatted_with_symbol,
        };
      })
    );

    for (const property in response) {
      if (property === "name") {
        productResponse.push({
          title: response["name"],
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
    }

    setProductDetails(productResponse);
  }, []);

  function setSize(index) {
    setSelectedSize(index);
  }

  function setColor(index) {
    setSelectedColor(index);
    setActiveVariant(index);
  }

  function quantityHandler(quantity) {
    if (quantity < 1) {
      quantity = 1;
    }
    setQuantity(quantity);
  }

  async function addProductToBag() {
    setSpinner(true);
    const productId = params.productId;
    const sizesVariantId = productDetails[1].sizes_variant_id;
    const size = productDetails[1].sizes[selectedSize].id;
    const colorwayVariantId = productDetails[2].colorway_variant_id;
    const color = productDetails[2].colorway[selectedColor].id;

    const response = await commerce.cart.add(productId, quantity, {
      [sizesVariantId]: size,
      [colorwayVariantId]: color,
    });
    setSpinner(false);
  }
  return (
    <section>
      {productDetails.length === 0 && <SkeletonIndividualProducts />}
      {productDetails.length > 0 && (
        <div className={styles.container} {...handlers}>
          <div
            className={`${styles.slidecontainer}`}
            style={{ transform: `translateX(-${activeImage * 100}%)` }}
          >
            {allProductVariants[activeVariant].images.map((image) => {
              return <img src={image.url} className={styles.slide} />;
            })}
          </div>
          <div className={styles.productdetailscontainer}>
            <div className={styles.section}>
              <h2 className={styles.producttitle}>{productDetails[0].title}</h2>
              <p className={styles.productprice}>
                {allProductVariants[activeVariant].price}
              </p>
            </div>
            <div className={styles.section}>
              <h2>Size</h2>
              <div className={styles.sizelayout}>
                {productDetails[1].sizes.map((size, index) => {
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
                {productDetails[2].colorway.map((color, index) => {
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
          </div>
          <div className={styles.addtobagcontainer}>
            <button
              className={`${styles.addtobag} ${spinner ? styles.loading : ""}`}
              onClick={addProductToBag}
            >
              <span>Add to Bag</span>
            </button>
            <div className={styles.quantity}>
              <div className={styles.finalquantity}>
                <p>{quantity}</p>
              </div>
              <div className={styles.quantitycontrols}>
                <button
                  onClick={() => {
                    quantityHandler(quantity + 1);
                  }}
                >
                  <img src={arrow} className={styles.increase} />
                </button>
                <button
                  onClick={() => {
                    quantityHandler(quantity - 1);
                  }}
                >
                  <img src={arrow} className={styles.decrease} />
                </button>
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
                  __html: allProductVariants[activeVariant].description,
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
