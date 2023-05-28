import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Table.module.css";

export default function Table() {
  const [motorcyclesData, setMotorcyclesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/motorcycles")
      .then((response) => {
        setMotorcyclesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }, []);

  return (
    <div>
      <h1 className={styles.title}>MOTORCYCLE LIST</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Chassis Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>CC</th>
            <th>Color</th>
            <th>Transmission</th>
            
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.font}>
          {motorcyclesData.length === 0 ? (
            <tr>
              <td>No motorcycles found</td>
            </tr>
          ) : (
            motorcyclesData.map((moto) =>
              moto.items.map((item) => (
                <tr key={item.chassisId}>
                  <td>{item.chassisId}</td>
                  <td>{moto.brand}</td>
                  <td>{moto.model}</td>
                  <td>{moto.year}</td>
                  <td>{moto.cc}</td>
                  <td>{item.color}</td>
                  <td>{moto.transmission}</td>
  
                  <td>{moto.price}</td>
                  <td>{moto.category}</td>
                  <td className={styles.actionsHeader}>
                    <button className={styles.button}>Edit</button>
                    <button className={styles.button}>Delete</button>
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
