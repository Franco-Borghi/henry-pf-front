import React from "react"
import styles from "./SearchBarAdmin.module.scss"

export default function SearchBarAdmin(props) {
  const { setFilteredData, data, filter, searchQuery, setSearchQuery } = props

  console.log(props)

  const handleSearch = e => {
    const { value } = e.target
    setSearchQuery(value)
  }

  const searchSubmit = e => {
    e.preventDefault()
    let auxMotorcycles = [...data]
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
    setFilteredData(data)
    setSearchQuery("")
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} className={styles.ctnInput}>
        <input
          value={searchQuery}
          className={styles.inputSearch}
          placeholder="Search"
          onChange={handleSearch}
        />
        <button
          type="submit"
          className={styles.btnIconSearch}
          onClick={searchSubmit}>
          <ion-icon
            style={{ color: "#fff" }}
            size="small"
            name="search-outline"></ion-icon>
        </button>
        <button type="submit" onClick={reset}>
          View all
        </button>
      </form>
    </div>
  )
}
