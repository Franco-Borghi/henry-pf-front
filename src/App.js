import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addItemToCart, fetchData, getUserById, addItemToFavs } from "./redux/actions";
import { CreateMotorcycle } from "./containers/CreateMotorcycle/CreateMotorcycle";
import { ItemDetail } from "./containers/ItemDetail/ItemDetail";
import { Layout } from "./components/Layout/Layout";
import { ShoppingCart } from "./containers/ShoppingCart/ShoppingCart";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./components/UserDashboard/ProfileForm/ProfileForm";
import Dashboard from "./components/AdminDashboard/Dashboard/Dashboard";
import MotorcyclesTable from "./components/AdminDashboard/MotorcyclesTable/MotorcyclesTable";
import Graphs from "./components/AdminDashboard/Graphs/Graphs";
import Form from "./components/AdminDashboard/Form/Form";
import Users from "./components/AdminDashboard/Users/Users";
import { User } from "./components/AdminDashboard/User/User";
import Orders from "./components/AdminDashboard/Orders/Orders";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/Footer/AboutUs/AboutUs"
import OurTime from "./components/Footer/OurTeam/OurTeam"
import Items from "./components/AdminDashboard/Items/Items";
import { Order } from "./components/AdminDashboard/Order/Order";
import { Favourites } from "./containers/Favourites/Favourites";
import CreateImageForm from "./components/CreateImageForm/CreateImageForm";
import swal from "sweetalert2";
import { NotFoundPage } from "./containers/NotFoundPage/NotFoundPage";

function App() {

  const dispatch = useDispatch();
  const { user, isAuthenticated, logout } = useAuth0();
  const reduxUser = useSelector(state => state.user);

  useEffect(() => {

    if (isAuthenticated && user && user.email && localStorage.getItem(`shoppingCart${user.email}`)) {
      const storedShoppingCart = JSON.parse(localStorage.getItem(`shoppingCart${user.email}`));
      if (storedShoppingCart.length) {
        dispatch(addItemToCart(storedShoppingCart));
      }
    } else {
      dispatch(addItemToCart([]));
    }

    if (isAuthenticated && user && user.email && localStorage.getItem(`favourites${user.email}`)) {
      const storedFavourites = JSON.parse(localStorage.getItem(`favourites${user.email}`));
      if (storedFavourites.length) {
        dispatch(addItemToFavs(storedFavourites));
      }
    } else {
      dispatch(addItemToFavs([]));
    }

    if (isAuthenticated && user && user.email) {
      setTimeout(() => {
      dispatch(getUserById(user.sub));
      }, 1250)
    } else {
      dispatch(getUserById(null));
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    fetchData(dispatch)
  }, [])

  

  useEffect(() => {
    if (isAuthenticated && user && reduxUser && !reduxUser.active) {
      return new swal({
        title: "Error",
        text: "We regret to inform you that your account has been deactivated. To reactivate it, please contact our support team through the contact form on our website.",
        icon: "error",
        buttons: true,
      }).then(() => logout({ logoutParams: { returnTo: window.location.origin } }))
    }
  }, [reduxUser])




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<ItemDetail />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/profile" element={< ProfileForm />} />
            <Route path='/contact-us' element={<ContactUs />}></Route>
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/our-team" element={<OurTime />} />
            <Route path="/create-image" element={<CreateImageForm />} />

            <Route path="admin" element={<Dashboard />} >
              <Route index element={<Graphs />} />
              <Route path="items" element={<Items />} />
              <Route path="motorcycles" element={<MotorcyclesTable />} /> 
              <Route path="create" element={<Form />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:id" element={<Order />} />
              <Route path="*" element={<NotFoundPage />}/>
            </Route>

            <Route path="/not-found" element={<NotFoundPage />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
