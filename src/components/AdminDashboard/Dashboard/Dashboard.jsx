import React from "react";
import styles from "./Dashboard.module.scss"
import NavBar from "../../NavBar/NavBar";
import FilterBar from "../../FilterBar/FilterBar";
import { useNavigate } from "react-router-dom";
import ItemsTable from "../ItemsTable/ItemsTable";
import Footer from "../../Footer/Footer";

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
        
      </FilterBar>
      <ItemsTable />
      </div>
      <Footer />
    </>
  );
}
