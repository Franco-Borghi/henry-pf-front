import { useRef } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { fetchDataByName } from "../../redux/actions";

export default function SearchBar(){
    const searchInput = useRef(null)
    const dispatch = useDispatch()

    function searchMoto(value){
        fetchDataByName(dispatch, value)
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