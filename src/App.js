import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addItemToCart, fetchData, getUserById } from "./redux/actions";
import { CreateMotorcycle } from "./containers/CreateMotorcycle/CreateMotorcycle";
import { ItemDetail } from "./containers/ItemDetail/ItemDetail";
import { Layout } from "./components/Layout/Layout";
import { ShoppingCart } from "./containers/ShoppingCart/ShoppingCart";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import Dashboard from "./components/AdminDashboard/Dashboard/Dashboard";
import MotorcyclesTable from "./components/AdminDashboard/MotorcyclesTable/MotorcyclesTable";
import ItemsTable from "./components/AdminDashboard/ItemsTable/ItemsTable";
import Graphs from "./components/AdminDashboard/Graphs/Graphs";
import Form from "./components/AdminDashboard/Form/Form";
import User from "./components/AdminDashboard/Users/Users";
import Orders from "./components/AdminDashboard/Orders/Orders";
import ContactUs from "./components/ContactUs/ContactUs";


function App() {

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const reduxUser = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated && user && user.email && localStorage.getItem(`shoppingCart${user.email}`)) {
      const storedShoppingCart = JSON.parse(localStorage.getItem(`shoppingCart${user.email}`));
      dispatch(getUserById(user.sub));
      if (storedShoppingCart.length) {
        dispatch(addItemToCart(storedShoppingCart));
      }
      console.log(storedShoppingCart);
    } else {
      dispatch(getUserById(null));
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
            <Route path="/:id" element={<ItemDetail/>}/>
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/profile" element={< ProfileForm/>} />
            <Route path='/contact-us' element={<ContactUs/>}></Route>
          </Route>
          {/* //ruta dashAdmin */}
          {
            isAuthenticated && reduxUser && reduxUser.role === 'admin' &&
            <Route path="/admin" element={<Dashboard />} >
                <Route index element={<Graphs />}/>
                <Route path="/admin/itemsTable" element={<ItemsTable />} />
                <Route path="/admin/motorcyclesTable" element={<MotorcyclesTable />} /> {/* A cambiar luego */}
                <Route path="/admin/create" element={<Form/>}/>
                <Route path="/admin/users" element={<User/>}/>
                <Route path="/admin/orders" element={<Orders/>}/>
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
