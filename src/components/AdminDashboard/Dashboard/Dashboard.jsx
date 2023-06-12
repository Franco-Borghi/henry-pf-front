import React from "react";
import styles from "./Dashboard.module.scss"
import NavBar from "../../NavBar/NavBar";
import FilterBar from "../../FilterBar/FilterBar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ItemsTable from "../ItemsTable/ItemsTable";
import Footer from "../../Footer/Footer";
import Graphs from "../Graphs/Graphs";
import ReturnToHomeButton from "../../ReturnToHomeButton/ReturnToHomeButton";
import './Dashboard.scss'

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className={styles['list-container']}>
        <FilterBar status={true}>
          {/* <ReturnToHomeButton/> */}
          {/* <h3 style={{ paddingTop: '40px'}}>Admin Bar</h3> */}
          <NavLink to="/admin" end >Dashboard</NavLink>
          <NavLink to="/admin/motorcycles">Motorcycles List</NavLink>
          <NavLink to="/admin/items">Items List</NavLink>
          <NavLink to="/admin/users">Users List</NavLink>
          <NavLink to="/admin/orders">Orders List</NavLink>
          <NavLink to="/admin/create">Create Model / Item</NavLink>
        </FilterBar>
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
