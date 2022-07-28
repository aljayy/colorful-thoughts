import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../../Auth/commerce";
import styles from "./Checkout.module.scss";
import creditcards from "../../Assets/Images/creditcards.svg";
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
      <div className={styles["checkout-status"]}>
        <div className={styles["checkout-status__complete"]}>
          <h3>Cart</h3>
        </div>
        <span></span>
        <div className={styles["checkout-status__complete"]}>
          <h3>Checkout</h3>
        </div>
        <div>
          <h3>Complete</h3>
        </div>
      </div>
      <form className={styles["checkout-form"]}>
        <div className={styles["customer-details"]}>
          <div>
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" />
          </div>
          <div>
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" />
          </div>
          <div>
            <label for="companyname">Company Name (optional)</label>
            <input type="text" id="companyname" />
          </div>
          <div className={styles.address}>
            <label for="staddress">Street Address</label>
            <input
              placeholder="House number and street name"
              type="text"
              id="staddress"
            />
            <input
              placeholder="Apartment, suite, unit, etc (optional)"
              type="text"
              id="staddress"
            />
          </div>
          <div>
            <label for="city">Town/City</label>
            <input type="text" id="city" />
          </div>
          <div>
            <label for="state">State</label>
            <input type="text" id="state" />
          </div>
          <div>
            <label for="zip">Zipcode</label>
            <input type="number" id="zip" />
          </div>
          <div>
            <label for="country">Country</label>
            <input type="text" id="country" />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" />
          </div>
        </div>
        <div className={styles["order-details"]}>
          <h2>Your Order</h2>
          <div>
            <p>Bold Geometric Sunglasses x 1</p>
            <p>Size: XS</p>
            <p>Color: Black</p>
            <p>$310</p>
          </div>
          <div>
            <p>Gulls Pocket Tee x 2</p>
            <p>Size: XS</p>
            <p>Color: Serenity</p>
            <p>$45</p>
          </div>
        </div>
        <div className={styles["shipping-options"]}>
          <h2>Shipping</h2>
          <input type="radio" id="Shipping Option 1" name="shipping" />
          <label for="Shipping Option 1">
            Free Shipping: <span>$0.00</span>
          </label>
          <br />
          <input type="radio" id="Shipping Option 2" name="shipping" />
          <label for="Shipping Option 2">
            USPS 2 day shipping: <span>$35.50</span>
          </label>
          <br />
          <input type="radio" id="Shipping Option 3" name="shipping" />
          <label for="Shipping Option 3">
            Overnight Shipping: <span>$60.99</span>
          </label>
        </div>
        <div className={styles["purchase-totals"]}>
          <p>
            Subtotal: <span>$355</span>
          </p>
          <p>
            Shipping & Handling: <span>$0.00</span>
          </p>
          <p>
            Taxes: <span>$35.50</span>
          </p>
          <p>
            Total: <span>$390.50</span>
          </p>
        </div>
        <div className={styles["payment"]}>
          <div className={styles["payment-title"]}>
            <h2>Payment</h2>
            <img src={creditcards} />
          </div>
          <div className={styles["payment-input"]}>
            <h2>Card Number</h2>
            <input />
          </div>
          <div className={styles["payment-input"]}>
            <h2>Expiration Date</h2>
            <input />
          </div>
          <div className={styles["payment-input"]}>
            <h2>CVC</h2>
            <input />
          </div>
          <button className={styles["submit-order"]}>Place Order</button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
