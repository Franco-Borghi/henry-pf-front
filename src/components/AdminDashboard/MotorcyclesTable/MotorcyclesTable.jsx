import axios from "axios"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./MotorcyclesTable.module.scss"
import CloudinaryUploadWidget from "../../CloudinaryUploadWidget/CloudinaryUploadWidget"
import { fetchData } from "../../../redux/actions"
import SearchBarAdmin from "../SearchBarAdmin/SearchBarAdmin"

export default function MotorcyclesTable() {
  const [filteredData, setFilteredData] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [newMotorcycle, setNewMotorcycle] = useState({})
  const allMotorcycles = useSelector(state => state.allMotorcycles)
  const dispatch = useDispatch()

  useEffect(() => {
    setFilteredData(allMotorcycles)
  }, [allMotorcycles])

  const handleFilter = (e) => {
    const { value } = e.target
    setFilter(value)
    let auxMotorcycles = [...allMotorcycles]
    if (searchQuery !== "")
      auxMotorcycles = allMotorcycles.filter(
        moto =>
          moto.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          moto.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    if (value === "all") return setFilteredData(auxMotorcycles)
    setFilteredData(
      auxMotorcycles.filter(moto => moto.active === (value === "active"))
    )
  }

  const changeInputFields = e => {
    const { name, value } = e.target
    const newValue = name === "active" ? value === "active" : value
    setNewMotorcycle({ ...newMotorcycle, [name]: newValue })
  }

  const startEditing = (moto) => {
    setNewMotorcycle(moto)
  }

  const cancelEdit = () => {
    setNewMotorcycle({})
  }

  const submitUpdatedMotorcycle = motoId => {
    axios
      .put(
        `${process.env.REACT_APP_HOST_NAME}/motorcycles/${motoId}`,
        newMotorcycle
      )
      .then(response => {

        fetchData(dispatch)
        setFilteredData(filteredData.map(moto => (moto.id === motoId ? response.data : moto)))
        setNewMotorcycle({})
      })
      .catch(error => {
        console.error("Error retrieving data:", error)
      })
  }

  return (
    <div>
      <h1 className={styles.title}>Motorcycle List </h1>

      <SearchBarAdmin data={allMotorcycles} setFilteredData={setFilteredData} setFilter={setFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filters */}
      <select onChange={handleFilter}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Table */}
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
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className={styles.font}>
          {filteredData?.length === 0 ? (
            <tr>
              <td>No motorcycles found</td>
            </tr>
          ) : (
            filteredData?.map(moto => (
              <tr key={moto.id}>
                {newMotorcycle.id === moto.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="brand"
                        value={newMotorcycle.brand}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="model"
                        value={newMotorcycle.model}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="year"
                        value={newMotorcycle.year}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="cc"
                        value={newMotorcycle.cc}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="transmission"
                        value={newMotorcycle.transmission}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="price"
                        value={newMotorcycle.price}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="category"
                        value={newMotorcycle.category}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="description"
                        value={newMotorcycle.description}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td>
                      <CloudinaryUploadWidget
                        imageUrl={setNewMotorcycle}
                        inputs={newMotorcycle}
                      />
                    </td>
                    <td>
                      <select
                        name="active"
                        value={newMotorcycle.active ? "active" : "inactive"}
                        onChange={changeInputFields}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </td>
                    <td className={styles.actionsHeader}>
                      <button
                        className={styles.button}
                        onClick={() => submitUpdatedMotorcycle(moto.id)}>
                        Save
                      </button>
                      <button className={styles.button} onClick={cancelEdit}>
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
                    <td>{moto.image}</td>
                    <td>{moto.active ? "active" : "inactive"}</td>
                    <td className={styles.actionsHeader}>
                      <button
                        className={styles.button}
                        onClick={() => startEditing(moto)}>
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
  )
}
