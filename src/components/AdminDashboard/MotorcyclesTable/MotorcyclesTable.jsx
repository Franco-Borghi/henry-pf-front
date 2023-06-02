import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./MotorcyclesTable.module.scss";

export default function MotorcyclesTable() {
  const [motorcyclesData, setMotorcyclesData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingMotorcycle, setEditingMotorcycle] = useState(null);
  const [newMotorcycle, setNewMotorcycle] = useState({})

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_NAME}/motorcycles`)
      .then((response) => {
        setMotorcyclesData(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);

  function handleFilter(e) {
    const { value } = e.target;
    setFilter(value);
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    const newValue = name === "active" ? value === "active" : value;
    setNewMotorcycle(previousData => ({...previousData, [name]: newValue}))
  };

  function handleEdit(moto) {
    setEditingMotorcycle(moto.id);
    setNewMotorcycle(moto)
  }

  function handleCancel() {
    setEditingMotorcycle(null);
  }

  const handleSubmit = (motoId) => {
    axios
      .put(
        `${process.env.REACT_APP_HOST_NAME}/motorcycles/${motoId}`,newMotorcycle
      )
      .then((response) => {
        setMotorcyclesData(motorcyclesData.map(moto => moto.id === motoId ? response.data : moto)); 
        setEditingMotorcycle(null);
        setNewMotorcycle({});
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  let filteredData = motorcyclesData;
  if (filter !== "all") {
    filteredData = motorcyclesData.filter(moto => moto.active === (filter === "active"));
  }

  return (
    <div>
      <h1 className={styles.title}>Motorcycle List </h1>

    <select onChange={handleFilter}>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>CC</th>
            <th>Transmission</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.font}>
          {filteredData.length === 0 ? (
            <tr>
              <td>No motorcycles found</td>
            </tr>
          ) : (
            filteredData.map(moto => (
              <tr key={moto.id}>
                {editingMotorcycle === moto.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="brand"
                        value={newMotorcycle.brand}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="model"
                        value={newMotorcycle.model}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="year"
                        value={newMotorcycle.year}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="cc"
                        value={newMotorcycle.cc}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="transmission"
                        value={newMotorcycle.transmission}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="price"
                        value={newMotorcycle.price}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        value={newMotorcycle.category}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={newMotorcycle.description}
                        onChange={onChangeInput}
                      />
                    </td>
                    <td>
                      <select
                        name="active"
                        value={newMotorcycle.active ? "active" : "inactive"}
                        onChange={onChangeInput}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                        </select>
                    </td>
                    <td className={styles.actionsHeader}>
                      <button
                        className={styles.button}
                        onClick={() => handleSubmit(moto.id)}
                      >
                        Save
                      </button>
                      <button className={styles.button} onClick={handleCancel}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{moto.brand}</td>
                    <td>{moto.model}</td>
                    <td>{moto.year}</td>
                    <td>{moto.cc}</td>
                    <td>{moto.transmission}</td>
                    <td>{moto.price}</td>
                    <td>{moto.category}</td>
                    <td>{moto.description}</td>
                    <td>{moto.active ? "active" : "inactive"}</td>
                    <td className={styles.actionsHeader}>
                      <button
                        className={styles.button}
                        onClick={() => handleEdit(moto)}
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
