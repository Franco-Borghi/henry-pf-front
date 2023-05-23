import styles from "./SearchBar.module.scss";
import { useDispatch } from "react-redux";
import { fetchDataByName } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function SearchBar(props){
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
          ref={props.searchInput}
        />
        <button type="submit" className={styles.btnIconSearch} onClick={() => searchMoto(props.searchInput.current.value)}>
          <ion-icon style={{ color: '#fff' }} size="small" name="search-outline"></ion-icon>
        </button>
      </form>
    )
}