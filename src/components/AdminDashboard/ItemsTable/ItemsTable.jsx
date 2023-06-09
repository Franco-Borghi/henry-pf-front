import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./ItemsTable.module.scss";
import AdminSearchBar from "../AdminSearchBar/AdminSearchBar";
import Pagination from "../../Pagination/Pagination";

export default function ItemsTable() {
  const [motorcyclesData, setMotorcyclesData] = useState([]);
  const [editData, setEditData] = useState({});
  const [filter, setFilter] = useState("all");
  const allMotorcycles = useSelector((state) => state.allMotorcycles);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setFilteredData(allMotorcycles);
  }, [allMotorcycles]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HOST_NAME}/motorcycles`)
      .then((response) => {
        setMotorcyclesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
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
        ...motorcycleData,
      },
    }));
  };

  const handleSave = (chassisId) => {
    const editedMotorcycle = editData[chassisId];
    const { color, chassisId: editedChassisId } = editedMotorcycle;

    axios
      .put(`${process.env.REACT_APP_HOST_NAME}/motorcycles/item/${chassisId}`, {
        color,
        chassisId: editedChassisId,
      })
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const searchSubmit = (e) => {
    let auxMotorcycles = [...allMotorcycles];
    if (filter !== "all") {
      auxMotorcycles = auxMotorcycles.filter(
        (moto) => moto.active === (filter === "active")
      );
    }
    const filteredMotorcycles = auxMotorcycles.filter(
      (moto) =>
        moto.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        moto.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredMotorcycles);
    setCurrentPage(1);
  };

  const reset = (e) => {
    e.preventDefault();
    setFilteredData(allMotorcycles);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Motorcycle Items</h1>
      <AdminSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchSubmit={searchSubmit}
        handleReset={reset}
      />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Chassis Number</th>
            <th className={styles.th}>Brand</th>
            <th className={styles.th}>Model</th>
            <th className={styles.th}>Year</th>
            <th className={styles.th}>CC</th>
            <th className={styles.th}>Color</th>
            <th className={styles.th}>Transmission</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {currentItems.length === 0 ? (
            <tr tr className={styles.tr}>
              <td className={styles.td}>No motorcycles found</td>
            </tr>
          ) : (
            currentItems.map((moto) =>
              moto.items.map((item) => (
                <tr key={item.chassisId} data-id={item.chassisId}
                tr className={styles.tr}>
                  <td className={styles.td}>
                    {editData[item.chassisId] ? (
                      <input
                        type="text"
                        value={editData[item.chassisId].chassisId}
                        onChange={(e) =>
                          setEditData((prevEditData) => ({
                            ...prevEditData,
                            [item.chassisId]: {
                              ...prevEditData[item.chassisId],
                              chassisId: e.target.value,
                            },
                          }))
                        }
                      />
                    ) : (
                      item.chassisId
                    )}
                  </td>
                  <td className={styles.td}>{moto.brand}</td>
                  <td className={styles.td}>{moto.model}</td>
                  <td className={styles.td}>{moto.year}</td>
                  <td className={styles.td}>{moto.cc}</td>
                  <td className={styles.td}>
                    {editData[item.chassisId] ? (
                      <input
                        type="text"
                        value={editData[item.chassisId].color}
                        onChange={(e) =>
                          setEditData((prevEditData) => ({
                            ...prevEditData,
                            [item.chassisId]: {
                              ...prevEditData[item.chassisId],
                              color: e.target.value,
                            },
                          }))
                        }
                        className={styles.inputColor}
                      />
                    ) : (
                      item.color
                    )}
                  </td>
                  <td className={styles.td}>{moto.transmission}</td>
                  <td className={styles.td}>{moto.price}</td>
                  <td className={styles.td}>{moto.category}</td>
                  <td className={styles.td}>
                    {editData[item.chassisId] ? (
                      <>
                        <button
                          onClick={() => handleSave(item.chassisId)}
                          className={styles.edit}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleCancel(item.chassisId)}
                          className={styles.edit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item.chassisId, item.color)}
                          className={styles.edit}
                        >
                          Edit
                        </button>
                        {/* <button className={styles.edit}>Delete</button> */}
                      </>
                    )}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
      <div className={styles["pagination-container"]}>
        <div>
          {filteredData &&
          filteredData.length &&
          filteredData.length > itemsPerPage ? (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              onPageChange={handlePageChange}
              onPreviousPage={() => setCurrentPage(prevState => prevState - 1)}
              onNextPage={() => setCurrentPage(prevState => prevState + 1)}
            />
          ) : null}
        </div>

        <div className={styles["pagination-container__selector"]}>
          <p>Items per page:</p>
          <select
            value={itemsPerPage}
            onChange={e => setItemsPerPage(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

    </div>
  );
}
