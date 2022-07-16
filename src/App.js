import React from "react";
import styles from "./App.module.scss";
import Navbar from "./Components/Navbar/Navbar";
import RoutesProvider from "./Pages/RoutesProvider";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <RoutesProvider />
      <Footer />
    </>
  );
}

export default App;
