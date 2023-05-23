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

    return (
      <form onSubmit={(e) => e.preventDefault()} className={styles.ctnInput}>
        <input
          className={styles.inputSearch}
          placeholder="Search"
          ref={searchInput}
        />
        <button type="submit" className={styles.btnIconSearch} onClick={() => searchMoto(searchInput.current.value)}>
          <ion-icon style={{ color: '#fff' }} size="small" name="search-outline"></ion-icon>
        </button>
      </form>
    )
}