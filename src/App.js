import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addItemToChart, fetchData } from "./redux/actions";
import { CreateMotorcycle } from "./containers/CreateMotorcycle/CreateMotorcycle";
import { ItemDetail } from "./containers/ItemDetail/ItemDetail";
import { Layout } from "./components/Layout/Layout";
import { ShoppingChart } from "./containers/ShoppingChart/ShoppingChart";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user && user.email && localStorage.getItem(`shoppingChart${user.email}`)) {
      const storedShoppingChart = JSON.parse(localStorage.getItem(`shoppingChart${user.email}`));
      if (storedShoppingChart.length) {
        dispatch(addItemToChart(storedShoppingChart));
      }
      console.log(storedShoppingChart);
    } else {
      dispatch(addItemToChart([]));
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
            <Route path="/shopping-chart" element={<ShoppingChart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
