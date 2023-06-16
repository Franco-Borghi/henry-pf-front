import React from "react";
import styles from "./Dashboard.module.scss"
import NavBar from "../../NavBar/NavBar";
import FilterBar from "../../FilterBar/FilterBar";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import ItemsTable from "../ItemsTable/ItemsTable";
import Footer from "../../Footer/Footer";
import Graphs from "../Graphs/Graphs";
import ReturnToHomeButton from "../../ReturnToHomeButton/ReturnToHomeButton";
import './Dashboard.scss'
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function Dashboard() {
  const reduxUser = useSelector(state => state.user);

  if (!reduxUser || reduxUser.role !== "admin") {
    console.log(reduxUser);
    return (
      <Navigate replace to={"/not-found"} />
    )
  }

  return (
    <>
      <NavBar />
      <div className={styles['list-container']}>
        <FilterBar status={true}>
          {/* <ReturnToHomeButton/> */}
          {/* <h3 style={{ paddingTop: '40px'}}>Admin Bar</h3> */}
          <NavLink to="/admin" end >Overview</NavLink>
          <NavLink to="/admin/motorcycles">Motorcyles</NavLink>
          <NavLink to="/admin/items">Stock</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/create">Create Model / Item</NavLink>
        </FilterBar>
        <Outlet></Outlet>
      </div>
    </>
  );
}
