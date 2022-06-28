import React, { useEffect, useState } from "react";
import styles from "./Bag.module.scss";
import trash from "../../Assets/Images/trash.svg";
import arrow from "../../Assets/Images/accordianarrow.svg";
import bubble from "../../Assets/Images/bubble.svg";
import bubble2 from "../../Assets/Images/bubble2.svg";
import orangebubble from "../../Assets/Images/orangebubble.svg";
import orangebubble2 from "../../Assets/Images/orangebubble2.svg";
import { commerce } from "../../Auth/commerce";
function Bag() {
  const [cartProducts, setCartProducts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [productTotals, setProductTotals] = useState(0);

  let total = 0;
  useEffect(async function getCart() {
    setInitialLoading(true);
    let products;
    const response = await commerce.cart.contents();

    console.log(response);
    products = response.map((product) => {
      return {
        image: product.image.url,
        title: product.product_name,
        quantity: product.quantity,
        size: product.selected_options[0].option_name,
        color: product.selected_options[1].option_name,
        price: {
          raw: product.line_total.raw,
          formatted: product.line_total.formatted_with_symbol,
        },
        id: product.id,
      };
    });

    setCartProducts(products);

    for (let i = 0; i < products.length; i++) {
      total += products[i].price.raw;
    }

    setProductTotals(total);
    setInitialLoading(false);
  }, []);

  async function deleteItem(productId) {
    let bagClone = cartProducts;

    setCartProducts(
      bagClone.filter((product) => {
        if (product.id === productId) {
          return false;
        } else return true;
      })
    );

    const response = await commerce.cart.remove(productId);
  }

  return (
    <section className={styles.section}>
      {initialLoading && <div className={styles.loader}></div>}
      {cartProducts.length === 0 && !initialLoading && (
        <>
          <h2 className={styles["empty-message"]}>
            It’s looking pretty gray and empty in here. Add some items and let’s
            add some color.
          </h2>
          <img src={bubble} className={styles.bubble} />
          <img src={bubble2} className={styles.bubble2} />
        </>
      )}
      {cartProducts.length > 0 && !initialLoading && (
        <>
          {cartProducts.map((product) => {
            return (
              <div className={styles.product}>
                <div className={styles.firsthalf}>
                  <div className={styles.productimagecontainer}>
                    <img src={product.image} />
                  </div>
                  <button onClick={() => deleteItem(product.id)}>
                    <img src={trash} />
                  </button>
                </div>
                <div className={styles.secondhalf}>
                  <h2>{product.title}</h2>
                  <div className={styles.quantity}>
                    <p>Quantity: </p>
                    <div className={styles.quantityamount}>
                      {product.quantity}
                    </div>
                    <div className={styles.quantitycontrols}>
                      <button>
                        <img src={arrow} className={styles.increase} />
                      </button>
                      <button>
                        <img src={arrow} className={styles.decrease} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.size}>
                    <p>Size: </p>
                    <div>{product.size}</div>
                  </div>
                  <div className={styles.color}>
                    <p>Color: </p>
                    <div>{product.color}</div>
                  </div>
                  <p className={styles.price}>{product.price.formatted}</p>
                </div>
              </div>
            );
          })}
          <img src={orangebubble} className={styles.bubble} />
          <img src={orangebubble2} className={styles.bubble2} />
          <h3>Subtotal: ${productTotals}</h3>
          <button className={styles.checkout}>Checkout</button>
        </>
      )}
    </section>
  );
}

export default Bag;
