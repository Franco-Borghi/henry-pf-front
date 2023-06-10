import axios from "axios"
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styles from "./MotorcyclesTable.module.scss"
import CloudinaryUploadWidget from "../../CloudinaryUploadWidget/CloudinaryUploadWidget"
import { fetchData } from "../../../redux/actions"
import AdminSearchBar from "../AdminSearchBar/AdminSearchBar"
import Pagination from "../../Pagination/Pagination"
import swal from "sweetalert2"

export default function MotorcyclesTable() {
  const [filteredData, setFilteredData] = useState([])
  const [filter, setFilter] = useState("all")
  const [newMotorcycle, setNewMotorcycle] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(5)
  const allMotorcycles = useSelector(state => state.allMotorcycles)
  const dispatch = useDispatch()
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  useEffect(() => {
    setFilteredData(allMotorcycles)
  }, [allMotorcycles])

  useEffect(() => {
    let auxMotorcycles = [...allMotorcycles]

    if (filter !== "all") {
      auxMotorcycles = auxMotorcycles.filter(
        moto => moto.active === (filter === "active")
      )
    }

    if (searchQuery !== "") {
      const searchQueryArray = searchQuery.split(" ")
      const motorcyclesToFilterCopy = []

      for (let index = 0; index < searchQueryArray.length; index++) {
        auxMotorcycles.forEach(motorcycle => {
          if (
            (motorcycle.brand &&
              motorcycle.brand
                .toLowerCase()
                .includes(searchQueryArray[index].toLowerCase())) ||
            (motorcycle.model &&
              motorcycle.model
                .toLowerCase()
                .includes(searchQueryArray[index].toLowerCase()))
          ) {
            motorcyclesToFilterCopy.push(motorcycle)
          }
        })
      }
      auxMotorcycles = [...new Set(motorcyclesToFilterCopy)]
    }

    setFilteredData(auxMotorcycles)
    setCurrentPage(1)
  }, [allMotorcycles, filter, searchQuery])

  const handleFilter = e => {
    const { value } = e.target
    setFilter(value)
  }

  const changeInputFields = e => {
    const { name, value } = e.target
    const newValue = name === "active" ? value === "active" : value
    setNewMotorcycle({ ...newMotorcycle, [name]: newValue })
  }

  const startEditing = moto => {
    setNewMotorcycle(moto)
  }

  const cancelEdit = () => {
    setNewMotorcycle({})
  }

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const submitUpdatedMotorcycle = motoId => {
    axios
      .put(
        `${process.env.REACT_APP_HOST_NAME}/motorcycles/${motoId}`,
        newMotorcycle
      )
      .then(res => {
        return new swal({
          title: "Success",
          text: "The motorcycle was successfully edited",
          icon: "success",
          buttons: true,
        })
      })
      .then(response => {
        fetchData(dispatch)
        setFilteredData(
          filteredData.map(moto => (moto.id === motoId ? response.data : moto))
        )
        setNewMotorcycle({})
      })
      .catch(error => {
        console.error("Error retrieving data:", error)
      })
  }

  const searchSubmit = e => {
    let auxMotorcycles = [...allMotorcycles]
    if (filter !== "all")
      setFilteredData(
        auxMotorcycles.filter(moto => moto.active === (filter === "active"))
      )
    setFilteredData(
      auxMotorcycles.filter(
        moto =>
          moto.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          moto.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }

  const reset = e => {
    e.preventDefault()
    setFilteredData(allMotorcycles)
    setSearchQuery("")
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Motorcycle List </h2>

      <section className={styles["filters-section"]}>
        <div className={styles["filters-section-first-child"]}>
          <div>
            <p>Status:</p>
            <select onChange={handleFilter}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <AdminSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchSubmit={searchSubmit}
          handleReset={reset}
        />
      </section>

      {/* Table */}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Brand</th>
            <th className={styles.th}>Model</th>
            <th className={styles.th}>Year</th>
            <th className={styles.th}>CC</th>
            <th className={styles.th}>Transmission</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Category</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Image</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {filteredData?.length === 0 ? (
            <tr className={styles.tr}>
              <td style={{width: '100%', height: '150px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', justifyContent: 'center'}}>
                <h3 style={{ textAlign: 'center', color: '#fff', fontWeight: '700' }}>No motorcycles found</h3>
                <p style={{ textAlign: 'center', color: '#fff', fontWeight: '500' }}>No motorcycles were found for the search performed. Please try another search.</p>
              </td>
            </tr>
          ) : (
            filteredData
            ?.slice(indexOfFirstItem, indexOfLastItem)
            ?.map(moto => (
              <tr
                key={moto?.id}
                className={newMotorcycle?.id === moto?.id ? styles["tr-true"] : styles.tr }>
                {newMotorcycle?.id === moto?.id ? (
                  <>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="brand"
                        value={newMotorcycle.brand}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="model"
                        value={newMotorcycle.model}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="year"
                        value={newMotorcycle.year}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="cc"
                        value={newMotorcycle.cc}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="transmission"
                        value={newMotorcycle.transmission}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="price"
                        value={newMotorcycle.price}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="category"
                        value={newMotorcycle.category}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <input
                        type="text"
                        name="description"
                        value={newMotorcycle.description}
                        onChange={changeInputFields}
                      />
                    </td>
                    <td className={styles.td}>
                      <CloudinaryUploadWidget
                        imageUrl={setNewMotorcycle}
                        inputs={newMotorcycle}
                        // className={styles.save}
                      />
                    </td>
                    <td className={styles.td}>
                      <select
                        name="active"
                        value={newMotorcycle.active ? "active" : "inactive"}
                        onChange={changeInputFields}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </td>
                    <td
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                      className={styles.td}>
                      <button
                        className={styles.save}
                        onClick={() => submitUpdatedMotorcycle(moto.id)}
                        type="button">
                        Save
                      </button>
                      <button
                        className={styles.cancel}
                        onClick={cancelEdit}
                        type="button">
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className={styles.td}>{moto.brand}</td>
                    <td className={styles.td}>{moto.model}</td>
                    <td className={styles.td}>{moto.year}</td>
                    <td className={styles.td}>{moto.cc}</td>
                    <td className={styles.td}>{moto.transmission}</td>
                    <td className={styles.td}>{moto.price}</td>
                    <td className={styles.td}>{moto.category}</td>
                    <td className={styles.td}>{moto.description}</td>
                    <td className={styles.td}>{moto.image}</td>
                    <td className={styles.td}>
                      {moto.active ? "active" : "inactive"}
                    </td>
                    <td
                      className={styles.td}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        justifyContent: "center"
                      }}>
                      <button
                        className={styles.edit}
                        onClick={() => startEditing(moto)}
                        type="button">
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

      {/* Pagination */}
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
            onChange={e => {setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1)}}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  )
}
