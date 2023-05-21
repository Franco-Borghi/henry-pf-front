import { useRef } from "react";
import styles from "./SearchBar.module.scss";
import { useDispatch } from "react-redux";
import { fetchDataByName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){
    const searchInput = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function searchMoto(value){
        fetchDataByName(dispatch, value);
        navigate('/');
    }

    return <div className={styles.ctnInput}>
    <input
      className={styles.inputSearch}
      placeholder="Search"
      ref={searchInput}
    />
    <button className={styles.btnIconSearch} onClick={() => searchMoto(searchInput.current.value)}>
      <ion-icon style={{ color: '#fff' }} size="small" name="search-outline"></ion-icon>
    </button>
  </div>
}