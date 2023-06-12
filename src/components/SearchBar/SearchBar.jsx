import styles from "./SearchBar.module.scss";
import { useDispatch } from "react-redux";
import { fetchDataByName} from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeFilterBrand, changeFilterCategory } from "../../redux/actions";


export default function SearchBar(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)

    function searchMoto(value){
        fetchDataByName(dispatch, value);
        navigate('/');
        categoriesFilter.forEach(c => dispatch(changeFilterCategory(c)))
        brandsFilter.forEach(b => dispatch(changeFilterBrand(b)))

        if (props.setDropdownActive) {
          props.setDropdownActive(false);
        }
    }

    return (
      <form onSubmit={(e) => e.preventDefault()} className={styles.ctnInput}>
        <input
          id="searchbar-input"
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