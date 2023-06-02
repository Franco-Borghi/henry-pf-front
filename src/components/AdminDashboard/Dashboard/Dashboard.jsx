import React from "react";
import styles from "./Dashboard.module.scss"
import NavBar from "../../NavBar/NavBar";
import FilterBar from "../../FilterBar/FilterBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ItemsTable from "../ItemsTable/ItemsTable";
import Footer from "../../Footer/Footer";
import Graphs from "../Graphs/Graphs";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <div className={styles['list-container']}>
      <FilterBar>
        <div className={styles['return-to-home-button']} onClick={() => navigate("/")}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.92388 0.444458L0 5.8889L5.92388 11.3333L7.39161 9.9844L2.93547 5.8889L7.39161 1.79341L5.92388 0.444458Z" fill="#000"/>
            </svg>
          <p>Return to Home</p>
        </div>
        <h3 style={{ paddingTop: '40px'}}>Admin Bar</h3>
        <Link to="/admin"><h4 style={{ paddingTop: '20px'}}>Dashboard</h4></Link>
        <Link to="/admin/motorcyclesTable"><h4 style={{ paddingTop: '20px'}}>Motorcycles List</h4></Link>
        <Link to="/admin/itemsTable"><h4 style={{ paddingTop: '20px'}}>Items List</h4></Link>
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
