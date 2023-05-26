import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "./redux/actions";
import { CreateMotorcycle } from "./containers/CreateMotorcycle/CreateMotorcycle";
import { ItemDetail } from "./containers/ItemDetail/ItemDetail";
import { CheckoutPage } from "./components/CheckoutPage/CheckoutPage";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchData(dispatch)
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/create" element={<CreateMotorcycle/>}/>
          <Route path="/:id" element={<ItemDetail/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
