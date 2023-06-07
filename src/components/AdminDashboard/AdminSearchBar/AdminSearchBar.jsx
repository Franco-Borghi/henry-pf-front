import React from 'react';
import styles from "./AdminSearchBar.module.scss";

export default function AdminSearchBar({searchQuery, setSearchQuery, searchSubmit, handleReset}) {


    function handleSubmit(e) {
        e.preventDefault()
        searchSubmit()
    }

  return (
    <div>
    <form onSubmit={handleSubmit} className={styles.ctnInput}>
      <input
        value={searchQuery}
        className={styles.inputSearch}
        placeholder="Search by Brand or Model"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className={styles.btnIconSearch}
        >
        <ion-icon
          style={{ color: "#fff" }}
          size="small"
          name="search-outline"></ion-icon>
      </button>
      <button className={styles['view-all-button']} type="button" onClick={handleReset}>
        View all
      </button>
    </form>
  </div>
  )
}

