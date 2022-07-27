import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../Auth/commerce";
import styles from "./Checkout.module.scss";
function Checkout() {
  // const params = useParams();

  // async function cartInfo() {
  //   const response = await commerce.checkout.generateToken(params.cartID, {
  //     type: "cart",
  //   });

  //   console.log(response);

  //   const liveResponse = await commerce.checkout.getLive(response.id);

  //   console.log(liveResponse);
  // }

  // useEffect(() => {
  //   cartInfo();
  // }, []);

  return (
    <section className={styles.checkout}>
      <div className={styles["checkout__status"]}>
        <div className={styles["checkout__status--complete"]}>
          <h3>Cart</h3>
        </div>
        <span></span>
        <div className={styles["checkout__status--complete"]}>
          <h3>Checkout</h3>
        </div>
        <div>
          <h3>Complete</h3>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
