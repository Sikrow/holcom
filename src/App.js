import React, { useState, useEffect } from "react";

import { commerce } from "./lib/commerce"; //this does all the backend stuff

import { Products, Navbar, Cart } from "./components";
// the above is the same as below, but you need to have an index.js file in the components folder.
//import Products  from './components/Products/Products';
//import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

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

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(products);
  console.log(cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      <Products products={products} onAddToCart={handleAddToCart} />
      {/* <Cart cart={cart}/> */}
    </div>
  );
};

export default App;
