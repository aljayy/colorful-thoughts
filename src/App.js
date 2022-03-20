import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomePageProducts from "./components/HomePageProducts/HomePageProducts";
import styles from "./App.module.scss";
import { commerce } from "./lib/commerce";
import Footer from "./components/Footer/Footer";
import DesignerCategory from "./components/DesignerCategory/DesignerCategory";

function App() {
  const [homeProducts, setHomeProducts] = useState([]);

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
  }
  console.log(homeProducts);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={[<Hero />, <HomePageProducts products={homeProducts} />]}
        />
        <Route path="/designers/:categorySlug" element={<DesignerCategory />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
