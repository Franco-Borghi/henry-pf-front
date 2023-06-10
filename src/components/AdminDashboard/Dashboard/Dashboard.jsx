import React from "react";
import styles from "./Dashboard.module.scss"
import NavBar from "../../NavBar/NavBar";
import FilterBar from "../../FilterBar/FilterBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ItemsTable from "../ItemsTable/ItemsTable";
import Footer from "../../Footer/Footer";
import Graphs from "../Graphs/Graphs";
import ReturnToHomeButton from "../../ReturnToHomeButton/ReturnToHomeButton";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className={styles['list-container']}>
      <FilterBar>
        <ReturnToHomeButton/>
        <h3 style={{ paddingTop: '40px'}}>Admin Bar</h3>
        <Link to="/admin"><h4 style={{ paddingTop: '20px'}}>Dashboard</h4></Link>
        <Link to="/admin/motorcyclesTable"><h4 style={{ paddingTop: '20px'}}>Motorcycles List</h4></Link>
        <Link to="/admin/items"><h4 style={{ paddingTop: '20px'}}>Items List</h4></Link>
        <Link to="/admin/users"><h4 style={{ paddingTop: '20px'}}>Users List</h4></Link>
        <Link to="/admin/orders"><h4 style={{ paddingTop: '20px'}}>Orders List</h4></Link>
        <Link to="/admin/create"><h4 style={{ paddingTop: '20px'}}>Form to Create Model/Item</h4></Link>
      </FilterBar>
      <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
