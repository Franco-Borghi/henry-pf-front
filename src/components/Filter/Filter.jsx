import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilterBrand, changeFilterCategory, fetchDataByName } from "../../redux/actions";
import styles from './Filter.module.scss';


export default function Filter(){
    const allMotorcycles = useSelector(state => state.allMotorcycles)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const dispatch = useDispatch();
    const categoriesFilter = useSelector(state => state.filterCategory)
    const brandsFilter = useSelector(state => state.filterBrand)
    const ascendingState = useSelector(state => state.orderAsc);
    const descendingState = useSelector(state => state.orderDesc);
    const activeSearch = useSelector(state => state.activeSearch);
    
    allMotorcycles.forEach(m => {if(!brands.includes(m.brand)) setBrands(brands.concat(m.brand))})
    allMotorcycles.forEach(m => {if(!categories.includes(m.category)) setCategories(categories.concat(m.category))})


    function handleFilterCat(e){
        dispatch(changeFilterCategory(e.target.value))
    }

    function handleFilterBrand(e){
        dispatch(changeFilterBrand(e.target.value))
    }

    function resetFilters(){
        categoriesFilter.forEach(c => dispatch(changeFilterCategory(c)));
        brandsFilter.forEach(b => dispatch(changeFilterBrand(b)));
        fetchDataByName(dispatch,'');

        document.getElementById('searchbar-input').value = '';

        if (ascendingState && document.getElementById('ascending')) {
          document.getElementById('ascending').click();
        }

        if (descendingState && document.getElementById('descending')) {
          document.getElementById('descending').click();
        }
    }

    const areFiltersSelected = categoriesFilter.length > 0 || brandsFilter.length > 0;

    return (
        <div className={styles['filters']}>
        <h1 style={{ marginBottom: '10px'}}>Filters</h1>
        {
        areFiltersSelected || ascendingState || descendingState || activeSearch
        ? <button className={styles.buttonReset} onClick={resetFilters}>Reset</button>
        : <button className={styles.buttonResetFalse}>Reset</button>
        }
        <div className={styles['filterSection']}>
            <h3>Category</h3>
            {categories.map(c => 
              <div key={c}>
                <input type="checkbox" onClick={handleFilterCat} value={c} checked={categoriesFilter.includes(c)}/><label>{c}</label><br/>
              </div>
            )}
        </div>
        <div className={styles['filterSection']}>
            <h3>Brand</h3>
            {brands.map(c => 
              <div key={c}>
                <input type="checkbox" onClick={handleFilterBrand} value={c} checked={brandsFilter.includes(c)} /><label>{c}</label><br/>
              </div>
            )}
        </div>
    </div>
    )
}
