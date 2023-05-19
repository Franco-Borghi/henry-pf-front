import { useRef } from "react";
import styles from "./SearchBar.module.css";
import axios from "axios"

export default function SearchBar(){
    const searchInput = useRef(null)

    function searchMoto(value){
        axios.get(`http://localhost:3001/motorcycles?name=${value}`)
        .then(r => console.log(r.data))
        .catch(err => console.log(err.message))
    }

    return <div className={styles.ctnInput}>
    <input
      className={styles.inputSearch}
      size="small"
      fullWidth
      placeholder="Search"
      ref={searchInput}
    />
    <button className={styles.btnIconSearch} onClick={() => searchMoto(searchInput.current.value)}>
      <ion-icon size="small" name="search-outline"></ion-icon>
    </button>
  </div>
}