import React, { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import styles from "./App.module.scss";
import Navbar from "./components/Navbar/Navbar";
import RoutesProvider from "./components/Routes/RoutesProvider";
import Footer from "./components/Footer/Footer";

function App() {
  const [homeProducts, setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  let categoryArr = [];

  async function getCategories() {
    const categoryResponse = await commerce.categories.list();

    const categoryData = categoryResponse.data[0].children;

    for (let i = 0; i < categoryData.length; i++) {
      const productResponse = await commerce.products.list({
        category_id: categoryData[i].id,
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
        categorySlug: categoryData[i].slug,
        id: categoryData[i].id,
        heroImg: categoryData[i].assets[0].url,
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
