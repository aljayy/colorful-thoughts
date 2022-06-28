import React, { useEffect, useState } from "react";
import { commerce } from "./Auth/commerce";
import styles from "./App.module.scss";
import Navbar from "./Components/Navbar/Navbar";
import RoutesProvider from "./Pages/RoutesProvider";
import Footer from "./Components/Footer/Footer";

function App() {
  const [homeProducts, setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let categoryArr = [];

  async function getCategories() {
    const categoryResponse = await commerce.categories.retrieve("designers", {
      type: "slug",
    });

    for (let i = 0; i < categoryResponse.children.length; i++) {
      const productResponse = await commerce.products.list({
        category_id: categoryResponse.children[i].id,
        limit: 6,
      });

      const productData = [];

      productData.push(
        productResponse.data.map((product) => {
          return {
            productName: product.name,
            productImage: product.image.url,
            productPrice: product.price.raw,
            productId: product.id,
          };
        })
      );

      categoryArr.push({
        categorySlug: categoryResponse.children[i].slug,
        id: categoryResponse.children[i].id,
        heroImg: categoryResponse.children[i].assets[0].url,
        products: productData,
      });
    }
    setHomeProducts(categoryArr);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <RoutesProvider loading={loading} homeProducts={homeProducts} />
      <Footer />
    </div>
  );
}

export default App;
