import React, { useEffect, useState } from "react";
import styles from "./Bag.module.scss";
import trash from "../../images/trash.svg";
import arrow from "../../images/accordianarrow.svg";
import bubble from "../../images/bubble.svg";
import bubble2 from "../../images/bubble2.svg";
import { commerce } from "../../lib/commerce";
function Bag() {
  const [cartProducts, setCartProducts] = useState([]);

  let total = 0;
  useEffect(async function getCart() {
    let products;
    const response = await commerce.cart.contents();

    products = response.map((product) => {
      return {
        image: product.image.url,
        title: product.product_name,
        quantity: product.quantity,
        size: product.selected_options[0].option_name,
        color: product.selected_options[1].option_name,
        price: product.line_total.formatted_with_symbol,
        id: product.id,
      };
    });

    setCartProducts(products);

    for (let i = 0; i < products.length; i++) {
      total += Number(products[i].price);
    }
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
      {cartProducts.length === 0 && (
        <div className={styles["empty-wrapper"]}>
          <h2 className={styles["empty-message"]}>
            It’s looking pretty gray and empty in here. Add some items and let’s
            add some color.
          </h2>
          <img src={bubble} className={styles.bubble} />
          <img src={bubble2} className={styles.bubble2} />
        </div>
      )}
      {cartProducts.length > 0 && (
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
                  <p className={styles.price}>{product.price}</p>
                </div>
              </div>
            );
          })}
          <h3>Subtotal: $620</h3>
          <button className={styles.checkout}>Checkout</button>
        </>
      )}
    </section>
  );
}

export default Bag;
