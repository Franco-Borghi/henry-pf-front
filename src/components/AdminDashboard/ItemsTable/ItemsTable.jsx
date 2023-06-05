import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./ItemsTable.module.css";

export default function ItemsTable() {
  const [motorcyclesData, setMotorcyclesData] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_NAME}/motorcycles`)
      .then((response) => {
        setMotorcyclesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }, []);

  const handleEdit = (chassisId, color) => {
    const motorcycleData = {
      chassisId: chassisId,
      color: color,
    };
    setEditData((prevEditData) => ({
      ...prevEditData,
      [chassisId]: {
        ...motorcycleData
      }
    }));
  };

  const handleSave = (chassisId) => {
    const editedMotorcycle = editData[chassisId];

    const { color, chassisId: editedChassisId } = editedMotorcycle;

    axios
      .put(`${process.env.REACT_APP_HOST_NAME}/motorcycles/item/${chassisId}`, { color, chassisId:editedChassisId })
      .then(() => {
        setEditData((prevEditData) => {
          const updatedEditData = { ...prevEditData };
          delete updatedEditData[chassisId];
          return updatedEditData;
        });
      })
      .catch((error) => {
        console.log("Error updating item", error);
      });
  };

  const handleCancel = (chassisId) => {
    setEditData((prevEditData) => {
      const updatedEditData = { ...prevEditData };
      delete updatedEditData[chassisId];
      return updatedEditData;
    });
  };

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
                <tr key={item.chassisId} data-id={item.chassisId}>
                  <td>
                    {editData[item.chassisId] ? (
                      <input
                        type="text"
                        value={editData[item.chassisId].chassisId}
                        onChange={(e) =>
                          setEditData((prevEditData) => ({
                            ...prevEditData,
                            [item.chassisId]: {
                              ...prevEditData[item.chassisId],
                              chassisId: e.target.value
                            }
                          }))
                        }
                      />
                    ) : (
                      item.chassisId
                    )}
                  </td>
                  <td>{moto.brand}</td>
                  <td>{moto.model}</td>
                  <td>{moto.year}</td>
                  <td>{moto.cc}</td>
                  <td>
                    {editData[item.chassisId] ? (
                      <input
                        type="text"
                        value={editData[item.chassisId].color}
                        onChange={(e) =>
                          setEditData((prevEditData) => ({
                            ...prevEditData,
                            [item.chassisId]: {
                              ...prevEditData[item.chassisId],
                              color: e.target.value
                            }
                          }))
                        }
                        className={styles.inputColor}
                      />
                    ) : (
                      item.color
                    )}
                  </td>
                  <td>{moto.transmission}</td>
                  <td>{moto.price}</td>
                  <td>{moto.category}</td>
                  <td className={styles.actionsHeader}>
                    {editData[item.chassisId] ? (
                      <>
                        <button onClick={() => handleSave(item.chassisId)} className={styles.button}>
                          Save
                        </button>
                        <button onClick={() => handleCancel(item.chassisId)} className={styles.button}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(item.chassisId, item.color)} className={styles.button}>
                          Edit
                        </button>
                        <button className={styles.button}>Delete</button>
                      </>
                    )}
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
