import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "../Hero";
import HomePageProducts from "../Products/HomePageProducts/HomePageProducts";
import DesignerCategory from "../DesignerCategory/DesignerCategory";
import UserDashboard from "../Account/UserDashboard";
import IndividialProduct from "../Products/IndividualProduct/IndividualProduct";
import Bag from "../Bag/Bag";
import About from "../About/About";
import LoginForm from "../Account/LoginForm";
import SignUpForm from "../Account/SignUpForm";

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
    </Routes>
  );
}

export default RoutesProvider;
