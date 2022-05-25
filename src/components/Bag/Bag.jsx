import React from "react";
import styles from "./Bag.module.scss";
import glasses from "../../images/scboldsg.png";
import trash from "../../images/trash.svg";
import arrow from "../../images/accordianarrow.svg";
function Bag() {
  return (
    <section>
      <div className={styles.product}>
        <div className={styles.firsthalf}>
          <div className={styles.productimagecontainer}>
            <img src={glasses} />
          </div>
          <img src={trash} />
        </div>
        <div className={styles.secondhalf}>
          <h2>Bold Geometric Sunglasses</h2>
          <div className={styles.quantity}>
            <p>Quantity: </p>
            <div className={styles.quantityamount}>1</div>
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
            <div>OS</div>
          </div>
          <div className={styles.color}>
            <p>Color: </p>
            <div>Black</div>
          </div>

          <p className={styles.price}>$310</p>
        </div>
      </div>
      <div className={styles.product}>
        <div className={styles.firsthalf}>
          <div className={styles.productimagecontainer}>
            <img src={glasses} />
          </div>
          <img src={trash} />
        </div>
        <div className={styles.secondhalf}>
          <h2>Bold Geometric Sunglasses</h2>
          <div className={styles.quantity}>
            <p>Quantity: </p>
            <div className={styles.quantityamount}>1</div>
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
            <div>OS</div>
          </div>
          <div className={styles.color}>
            <p>Color: </p>
            <div>Black</div>
          </div>

          <p className={styles.price}>$310</p>
        </div>
      </div>
    </section>
  );
}

export default Bag;
