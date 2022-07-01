import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "../Components/Hero/Hero";
import HomePageProducts from "../Components/Products/HomePageProducts/HomePageProducts";
import DesignerCategory from "./DesignerCategory/DesignerCategory";
import UserDashboard from "./UserDashboard/UserDashboard";
import IndividialProduct from "../Components/Products/IndividualProduct/IndividualProduct";
import Bag from "./Bag/Bag";
import About from "./About/About";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./SignUp/SignUpForm";
import Categories from "./Categories/Categories";

function RoutesProvider({ loading, homeProducts }) {
  return (
    <Routes>
      <Route
        path="/home"
        element={[
          <Hero />,
          <HomePageProducts products={homeProducts} loading={loading} />,
        ]}
      />
      <Route path="/designers/:categorySlug" element={<DesignerCategory />} />
      <Route path="/product/:productId" element={<IndividialProduct />} />
      <Route path="/dashboard/" element={<UserDashboard />} />
      <Route path="/about/" element={<About />} />
      <Route path="/mybag/" element={<Bag />} />
      <Route path="/login/" element={<LoginForm />} />
      <Route path="/signup/" element={<SignUpForm />} />
      <Route path="/categories/" element={<Categories />} />
    </Routes>
  );
}

export default RoutesProvider;
