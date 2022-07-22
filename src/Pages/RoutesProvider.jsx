import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Hero from "../Components/Hero/Hero";
import HomePageProducts from "../Components/Products/HomePageProducts/HomePageProducts";
import UserDashboard from "./UserDashboard/UserDashboard";
import Bag from "./Bag/Bag";
import About from "./About/About";
import LoginForm from "./Login/LoginForm";
import SignUpForm from "./SignUp/SignUpForm";
import Categories from "./Categories/Categories";
import IndividualProduct from "../Components/Products/IndividualProduct/IndividualProduct";
import CategoryProducts from "./Categories/CategoryProducts/CategoryProducts";
import DesignerProducts from "./Categories/DesignerProducts/DesignerProducts";

function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={[<Hero />, <HomePageProducts />]} />
      <Route path="/about/" element={<About />} />
      <Route path="/categories/" element={<Categories />} />
      <Route path="/categories/:categorySlug" element={<CategoryProducts />} />
      <Route path="/dashboard/" element={<UserDashboard />} />
      <Route path="/designers" element={<Categories />} />
      <Route path="/designers/:categorySlug" element={<DesignerProducts />} />
      <Route path="/login/" element={<LoginForm />} />
      <Route path="/mybag/" element={<Bag />} />
      <Route path="/product/:productId" element={<IndividualProduct />} />
      <Route path="/signup/" element={<SignUpForm />} />
    </Routes>
  );
}

export default RoutesProvider;
