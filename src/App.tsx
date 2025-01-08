import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { analyticsInstance } from "./lib/analytics";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";

const App = () => {
  // useEffect(() => {
  //   analyticsInstance.initialize({ trackingID: "test121124" });
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
