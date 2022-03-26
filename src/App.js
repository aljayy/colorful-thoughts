import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import HomePageProducts from "./components/HomePageProducts/HomePageProducts";
import styles from "./App.module.scss";
import { commerce } from "./lib/commerce";
import Footer from "./components/Footer/Footer";
import DesignerCategory from "./components/DesignerCategory/DesignerCategory";
import About from "./components/About/About";

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

      console.log(productResponse);
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
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/home"
          element={[
            <Hero />,
            <HomePageProducts products={homeProducts} loading={loading} />,
          ]}
        />
        <Route path="/designers/:categorySlug" element={<DesignerCategory />} />
        <Route path="/about/" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
