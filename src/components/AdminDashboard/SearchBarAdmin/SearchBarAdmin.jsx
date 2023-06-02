import React, { useState } from "react";
import styles from "./SearchBarAdmin.module.scss";
import { useDispatch } from "react-redux";

export default function SearchBarAdmin({ searchQuery, setSearchQuery }) {
  

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value)
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className={styles.ctnInput}>
        <input
          value={searchQuery}
          className={styles.inputSearch}
          placeholder="Search"
          onChange={handleChange}
        />
        <button
          type="submit"
          className={styles.btnIconSearch}
        //   onClick={searchMoto}
        >
          <ion-icon
            style={{ color: "#fff" }}
            size="small"
            name="search-outline"
          ></ion-icon>
        </button>
      </form>
    </div>
  );
  
}
