import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addItemToCart, fetchData } from "./redux/actions";
import { CreateMotorcycle } from "./containers/CreateMotorcycle/CreateMotorcycle";
import { ItemDetail } from "./containers/ItemDetail/ItemDetail";
import { Layout } from "./components/Layout/Layout";
import { ShoppingCart } from "./containers/ShoppingCart/ShoppingCart";
import { useAuth0 } from "@auth0/auth0-react";
import { CheckoutPage } from "./components/CheckoutPage/CheckoutPage";

function App() {

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user && user.email && localStorage.getItem(`shoppingCart${user.email}`)) {
      const storedShoppingCart = JSON.parse(localStorage.getItem(`shoppingCart${user.email}`));
      if (storedShoppingCart.length) {
        dispatch(addItemToCart(storedShoppingCart));
      }
      console.log(storedShoppingCart);
    } else {
      dispatch(addItemToCart([]));
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    fetchData(dispatch)
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/create" element={<CreateMotorcycle/>}/>
            <Route path="/:id" element={<ItemDetail/>}/>
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<CheckoutPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
