import React, { useState, useEffect } from "react";

import { commerce } from "./lib/commerce"; //this does all the backend stuff

import {
  Products,
  Navbar,
  Cart,
  Checkout,
  Login,
  AuthService,
} from "./components";
// the above is the same as below, but you need to have an index.js file in the components folder.
//import Products  from './components/Products/Products';
//import Navbar from './components/Navbar/Navbar';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const API_URL = process.env.REACT_APP_API;
  const authService = new AuthService(`${API_URL}/users/authenticate`);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.errorMessage);
    }
  };

  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      setUser(resp.Message);
      console.log(user);
      console.log("Authentication:", resp);
      console.log("Authentication:", resp.Token);
    } catch (e) {
      console.log("Login:", e);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(products);
  console.log(cart);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          >
            {" "}
          </Route>

          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          ></Route>

          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                products={products}
                cart={cart}
                onAddToCart={handleAddToCart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          ></Route>
          <Route
            exact
            path="/login"
            element={<Login login={login} user={user} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
