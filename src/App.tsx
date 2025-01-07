import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { analyticsInstance } from "./lib/analytics";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";

const App = () => {
  useEffect(() => {
    analyticsInstance.initialize({ trackingID: "test121124" });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/signup" component={SignUpPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
